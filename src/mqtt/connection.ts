import mqtt from "mqtt";

export interface MQTTClientOptions extends mqtt.IClientOptions {
    debug?: boolean; // Allow users to enable/disable logs
}

// MQTT client and state tracking
let mqttClient: mqtt.MqttClient | null = null;
let isClientInitialized = false;
const subscribedTopics: Set<string> = new Set();
const topicHandlers: Map<string, (topic: string, message: Buffer) => void> = new Map();

/**
 * Define and validate MQTT client options.
 * The user must provide this function's output to `getClient`.
 */
export function defineMQTTClientConnection(options: MQTTClientOptions): MQTTClientOptions {
    return { ...options, debug: options.debug ?? false }; // Default debug to false
}

/**
 * Creates an MQTT client using user-provided options.
 */
export function getClient(config: MQTTClientOptions): mqtt.MqttClient {
    if (!mqttClient) {
        if (config.debug) console.log("Instantiating MQTT connection...");

        mqttClient = mqtt.connect(config);

        if (!isClientInitialized) {
            mqttClient.once("connect", () => config.debug && console.log("Connected to MQTT broker."));
            mqttClient.on("error", (err) => config.debug && console.error("MQTT error:", err));
            mqttClient.on("close", () => {
                if (config.debug) console.log("MQTT connection closed.");
                mqttClient = null;
                isClientInitialized = false;
            });

            isClientInitialized = true;
        }
    }

    return mqttClient;
}

/**
 * Subscribe to an MQTT topic and register a message handler.
 */
export const subscribeToMQTTTopic = (
    topic: string,
    handler: (topic: string, message: Buffer) => void,
    debug?: boolean
) => {
    const client = getClient({} as MQTTClientOptions); // Ensure client is available

    if (!subscribedTopics.has(topic)) {
        client.subscribe(topic, (err) => {
            if (err) {
                if (debug) console.error(`Error subscribing to topic ${topic}:`, err);
            } else {
                if (debug) console.log(`Subscribed to topic: ${topic}`);
                subscribedTopics.add(topic);
            }
        });
    }

    // Ensure the message handler is registered once per topic
    if (!topicHandlers.has(topic)) {
        const messageHandler = (receivedTopic: string, payload: Buffer) => {
            if (receivedTopic === topic) handler(receivedTopic, payload);
        };

        topicHandlers.set(topic, messageHandler);
        client.on("message", messageHandler);
    }
};

/**
 * Unsubscribe from an MQTT topic and clean up handlers.
 */
export const unsubscribeFromTopic = (topic: string, disconnect?: boolean, debug?: boolean) => {
    const client = mqttClient;
    if (!client) return;

    if (subscribedTopics.has(topic)) {
        client.unsubscribe(topic, (err) => {
            if (err) {
                if (debug) console.error(`Error unsubscribing from topic ${topic}:`, err);
            } else {
                if (debug) console.log(`Unsubscribed from topic: ${topic}`);
                subscribedTopics.delete(topic);
            }
        });
    }

    if (topicHandlers.has(topic)) {
        const handler = topicHandlers.get(topic);
        if (handler) client.off("message", handler);
        topicHandlers.delete(topic);
    }

    if (disconnect) {
        client.end();
        mqttClient = null;
        isClientInitialized = false;
    }
};
