<h1 align="center">Tatanation React useMQTT Hook (｡🇯‌🇸‌)</h1>

<p align="center">
  <img src="https://i.imgur.com/NzFlweJ.png" alt="Tatanation Logo" width="200"/>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tatanation-react-use-mqtt"> <strong>📦 NPM Package: <code>tatanation-react-use-mqtt</code></strong> </a>
</p>

## 📌 Introduction

`tatanation-react-use-mqtt` is a lightweight, flexible React hook for managing MQTT subscriptions with ease. It allows you to efficiently subscribe to topics, handle messages, and manage connections.

## ✨ Features

- 📡 **Subscribe** to MQTT topics easily
- 🔄 **Automatic reconnection** handling
- 🎯 **Customizable connection setup**
- ⚡ **Optimized React state management** (almost stateless!)
- 🛠️ **Logging control** (that you can disable logs when needed)
- ⚛️ **Support React's Older Versions** (React 16.8.0 and above are supported!)
- **TS** **Typesafe Guarantee** (TypeScript is supported!)

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
