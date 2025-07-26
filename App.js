import React, { useState, useEffect } from "react";

const socket = new WebSocket("ws://localhost:3001");

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.send(input);
      setMessages((prev) => [...prev, "You: " + input]);
      setInput("");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>💬 Real-Time Chat App</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
          marginBottom: "10px",
          background: "#f9f9f9",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "5px" }}>
            {msg}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        placeholder="Type a message..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        style={{ width: "70%", padding: "8px" }}
      />
      <button onClick={sendMessage} style={{ padding: "8px 16px", marginLeft: "10px" }}>
        Send
      </button>
    </div>
  );
}

export default App;
