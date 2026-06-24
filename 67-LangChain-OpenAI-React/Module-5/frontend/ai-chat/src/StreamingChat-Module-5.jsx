import { useState } from "react";
import { streamMessage } from "./api";
import "./App.css";

export default function StreamingChat() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setResponse("");        // Clear previous response
    setLoading(true);

    try {
      await streamMessage(input, (chunk) => {
        setResponse((prev) => prev + chunk);   // This was causing the no-space issue
      });
    } catch (err) {
      console.error("Error streaming response:", err);
      setResponse("Sorry, an error occurred while generating the response.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="page-container">
      <div className="chat-wrapper">
        {/* Header */}
        <div className="header">
          <div className="logo">✨</div>
          <h1>AI Assistant</h1>
          <p>Real-time streaming responses</p>
        </div>

        {/* Chat Card */}
        <div className="chat-card">
          {/* Response Area */}
          <div className="response-area">
            {response ? (
              <div className="response-content">
                {response}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">👋</div>
                <h3>How can I help you today?</h3>
                <p>Type a question below and watch the response stream in real time.</p>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="input-section">
            <div className="input-row">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                rows={3}
                disabled={loading}
                className="message-input"
              />

              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="send-button"
              >
                {loading ? (
                  <span className="loading-spinner">
                    <span className="spinner"></span>
                    Sending
                  </span>
                ) : (
                  "Send"
                )}
              </button>
            </div>

            <p className="hint">
              Press <strong>Enter</strong> to send • <strong>Shift + Enter</strong> for new line
            </p>
          </div>
        </div>

        <div className="footer">
          Professional Streaming Chat Demo
        </div>
      </div>
    </div>
  );
}