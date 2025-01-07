"use client";
import React, { useState } from "react";

const ConversationPage: React.FC = () => {
  const [userInput, setUserInput] = useState<string>(""); // User input
  const [chatLog, setChatLog] = useState<{ user: string; bot: string }[]>([]); // Chat history

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    try {
      // Call Flask API
      const response = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: userInput }),
      });

      const data = await response.json();
      if (data.error) {
        console.error("Error:", data.error);
        setChatLog((prev) => [
          ...prev,
          { user: userInput, bot: "Error generating response." },
        ]);
      } else {
        const botResponse = data.bot_response || "Sorry, I couldn't understand that.";
        setChatLog((prev) => [...prev, { user: userInput, bot: botResponse }]);
      }
    } catch (error) {
      console.error("Error:", error);
      setChatLog((prev) => [
        ...prev,
        { user: userInput, bot: "Error connecting to the server." },
      ]);
    }

    setUserInput("");
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "40px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
        background: "#f9f9f9",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#000",
          fontSize: "40px",
          marginBottom: "20px",
        }}
      >
        AI Chatbot
      </h1>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "15px",
          background: "#fff",
          maxHeight: "400px",
          overflowY: "auto",
          marginBottom: "20px",
        }}
      >
        {chatLog.length === 0 ? (
          <p style={{ textAlign: "center", color: "#8b5cf6" }}>
            Start a conversation with the bot!
          </p>
        ) : (
          chatLog.map((chat, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <p>
                <strong style={{ color: "#8b5cf6" }}>You:</strong>{" "}
                <span style={{ color: "#333" }}>{chat.user}</span>
              </p>
              <p>
                <strong style={{ color: "#28A745" }}>Bot:</strong>{" "}
                <span style={{ color: "#555" }}>{chat.bot}</span>
              </p>
              <hr style={{ border: "0.5px solid #eee" }} />
            </div>
          ))
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            background: "Black",
            color: "white",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ConversationPage;