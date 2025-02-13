<h1 align="center">Tatanation React useMQTT Hook</h1>

<p align="center">
  <img src="https://tatanation-small-assets.s3.ap-southeast-2.amazonaws.com/Elipse.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIARWPFIHDDD3LJ3ZSQ%2F20250213%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20250213T230621Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0yIkcwRQIhAIQRjJtGQ0uLFWeYcXKlb2wt96rAg%2Fn3CzgvL%2FuCUQ%2BjAiB4WqDQvjAtqL97RKchC0PRKKOm8%2FbYObpNC48Jcgu8QSqZAgggEAAaDDExNjk4MTc3NDUzNCIMYZis6cywykRopd%2FQKvYBW10kfXRfFd7quWBfpkq3U2Ni6FuwJotErGDnVweTRY2M1kWMtv4sfje6gZoAq1Tb7eXU%2BKNsF%2Fq%2BHpiX9Nb3nDDfipg8Qm7XhsUkb3C9z%2BnHdCEF9i3WSKzjz6F43C3idXKGtiMd4LoZ8JPAp2yrlcpEjOlIIIG%2FRkneBRbaZWiX863UJPelvbzV%2Fp6zbNXnOW2LuyV5rhhOr7b4x7MdXLjCp0mPDYHBDLXwA%2B5%2F9bGIwJQSK41siepmTLPYQwvAihRMi9LtKEseIwnwg7pwFn4Y5SuwIinYRZwBky9HEYIJdiTi46rCeqOeirZwuEtHVCUAqWdaMLPwub0GOt8B8vRpDxjKjD89WVbb23JWEeabhGF6TmHw9IeRmFXQfiOoXWob%2BdSLv6tp8obX2mjpQbBdEnKr%2Bee%2BnwJvVV4PQkD6SvL6E6SPV2jF0HwHgUwyTFNO3r4qN063LwoTgDWz0LxHJEUPEriKLVgu0M8ISqUMaFqwkHxJrxvrfSZTLYScUSxMrZC1vRz03TLxUeyIRyOv44bi0tTdoyNRBNvlK9RWez4ZVi6708HcGgepZSz72cnL%2BkhnE%2BZo8kSFrDI%2BWXOn8aaHjwL2i26yrSbM4RcHYr12HcgrY5cIf7QV1Q%3D%3D&X-Amz-Signature=ad4c9d05586f108d33158286d9856617efc30412e3597ad05be8057773f9727a&X-Amz-SignedHeaders=host&response-content-disposition=inline" alt="Tatanation Logo" width="200"/>
</p>

<p align="center">
  <strong>📦 NPM Package: <code>tatanation-react-use-mqtt</code></strong>
</p>

## 📌 Introduction

`tatanation-react-use-mqtt` is a lightweight, flexible React hook for managing MQTT subscriptions with ease. It allows you to efficiently subscribe to topics, handle messages, and manage connections.

## ✨ Features

- 📡 **Subscribe** to MQTT topics easily
- 🔄 **Automatic reconnection** handling
- 🎯 **Customizable connection setup**
- ⚡ **Optimized React state management**
- 🛠️ **Logging control** (disable logs when needed)

## 🚀 Installation

```sh
npm install tatanation-react-use-mqtt
# or
yarn add tatanation-react-use-mqtt
```

## 🛠️ Usage

```tsx
import { useMQTT, defineMQTTClientConnection } from "tatanation-react-use-mqtt";

const mqttConfig = defineMQTTClientConnection({
  host: "your-mqtt-broker.com",
  port: 9001,
  protocol: "ws",
  disableLogs: false,
});

const MyComponent = () => {
  const { error, retrySubscribe } = useMQTT("your/topic", (message) => {
    console.log("Received MQTT message:", message);
  });

  return (
    <div>
      {error ? <p>Error: {error.message}</p> : <p>Connected to MQTT!</p>}
      <button onClick={retrySubscribe}>Retry</button>
    </div>
  );
};
```

## 📝 Configuration Options

| Option        | Type    | Default | Description |
|--------------|--------|---------|-------------|
| `host`       | string | -       | MQTT broker URL |
| `port`       | number | -       | MQTT port number |
| `protocol`   | string | `"ws"`  | MQTT connection protocol |
| `disableLogs`| boolean | `false` | Disables all logs |

## 🤝 Contributing

Feel free to submit issues or pull requests to improve this package!

---

<center><b>🔥 Tatanation React useMQTT Hook</b> – Simple. Efficient. Reliable.</center>
