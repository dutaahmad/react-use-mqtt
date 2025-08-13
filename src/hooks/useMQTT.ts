/* eslint-disable react-hooks/exhaustive-deps */
import { getClient, MQTTClientOptions, subscribeToMQTTTopic, unsubscribeFromTopic } from "../mqtt/connection";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";

export function useMQTT<T>(
    topic: string, 
    mqttConfig: MQTTClientOptions,
    onMessage: (data: T) => void
) {
    const [error, setError] = useState<string | Error | null>(null);
    const isSubscribed = useRef(false);

    // Memoize mqttConfig to avoid unnecessary re-instantiations
    const memoizedConfig = useMemo(() => mqttConfig, [JSON.stringify(mqttConfig)]);

    // Memoize the message callback for efficiency
    const memoizedOnMessage = useCallback(onMessage, []);

    const handleMessage = useCallback((receivedTopic: string, message: Buffer<ArrayBufferLike>) => {
        if (receivedTopic !== topic) return; // Ensure messages are only processed for the correct topic

        try {
            const parsedData = JSON.parse(message.toString()) as T;
            memoizedOnMessage(parsedData);
        } catch (err) {
            console.error("Error parsing MQTT topic message:", err);
            setError(new Error("Failed to parse MQTT topic message"));
        }
    }, [topic, memoizedOnMessage]);

    const subscribe = useCallback(() => {
        if (!isSubscribed.current) {

            const client = getClient(memoizedConfig);

            if (!isSubscribed.current) {
                client.on("message", handleMessage); // Add the listener only once
                subscribeToMQTTTopic(topic, (topic, message) => handleMessage(topic, message), memoizedConfig.debug);
                isSubscribed.current = true;
            }
            isSubscribed.current = true;
        }
    }, [topic, memoizedOnMessage]);

    // Function to retry the subscription
    const retrySubscribe = useCallback(() => {
        if (memoizedConfig.debug) console.log(`Retrying MQTT topic subscription for ${topic} topic...`);
        setError(null);
        unsubscribeFromTopic(topic, true, memoizedConfig.debug); // Unsubscribe first to avoid duplicates
        isSubscribed.current = false;
        subscribe();
    }, [topic, subscribe]);

    useEffect(() => {
        subscribe(); // Initial subscription

        return () => {
            unsubscribeFromTopic(topic, false, memoizedConfig.debug); // Do not disconnect the client here as it's a singleton
            isSubscribed.current = false;
            setError(null);
        };
    }, [subscribe]);

    const client = useMemo(() => getClient(memoizedConfig), [memoizedConfig]);

    return { client, error, retrySubscribe };
}

