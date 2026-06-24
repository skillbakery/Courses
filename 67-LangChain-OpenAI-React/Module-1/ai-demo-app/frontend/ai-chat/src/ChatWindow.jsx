import { useState } from "react";
import { sendMessage } from "./api";
import "./ChatWindow.css";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const { answer, inputTokens, outputTokens, totalTokens } =
        await sendMessage(input.trim());

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: answer, inputTokens, outputTokens, totalTokens },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <h2>AI Assistant</h2>
        </div>

        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="empty-state">
              Start a conversation by typing a message below
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.role === "user" ? "user" : "assistant"}`}
            >
              <div className="message-content">
                <strong>{msg.role === "user" ? "You" : "AI"}</strong>
                <p>{msg.content}</p>
                {msg.totalTokens && (
                  <span className="token-info">
                    {msg.totalTokens} tokens
                  </span>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="message assistant">
              <div className="message-content">
                <strong>AI</strong>
                <p>Thinking...</p>
              </div>
            </div>
          )}
        </div>

        <div className="chat-input-area">
          <div className="input-wrapper">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message here..."
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="send-button"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}