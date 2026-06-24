import { useState } from "react";
import { streamMessage } from "./api";
import "./App.css";

export default function StreamingChat() {
  // Chat messages
  const [messages, setMessages] = useState([]);

  // Input
  const [input, setInput] = useState("");

  // Template
  const [selectedTemplate, setSelectedTemplate] = useState("");

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastPrompt, setLastPrompt] = useState("");

  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("short");

  /**
   * Prompt Templates
   */
  const templates = [
    {
      label: "Explain Simply",
      value: "Explain {topic} in simple terms with examples",
    },
    {
      label: "Blog Post",
      value: "Write a blog post about {topic} with headings",
    },
    {
      label: "Interview Prep",
      value: "Give interview questions about {topic}",
    },
  ];

  /**
   * Build Final Prompt
   */
  const buildPrompt = () => {
    if (!selectedTemplate) return input;
    return selectedTemplate.replace("{topic}", input);
  };
const handleSend = async (overrideInput = null) => {
  const text = typeof overrideInput === "string" 
    ? overrideInput 
    : typeof input === "string" ? input : "";

  if (!text.trim() || text.trim().length < 3) {
    setError("Please enter at least 3 characters.");
    return;
  }

  setError(null);
  setLoading(true);

  const finalPrompt = selectedTemplate
    ? selectedTemplate.replace("{topic}", text)
    : text;

  setLastPrompt(finalPrompt);

  // ✅ Give unique IDs
  const userMsg = { 
    id: Date.now().toString(), 
    role: "user", 
    content: text 
  };

  const aiMsg = { 
    id: (Date.now() + 1).toString(), 
    role: "assistant", 
    content: "" 
  };

  // Add both messages
  let updatedMessages = [...messages, userMsg, aiMsg];

  // Keep last 10 messages
  if (updatedMessages.length > 10) {
    updatedMessages = updatedMessages.slice(-10);
  }

  setMessages(updatedMessages);
  setInput("");

  try {
    await streamMessage(updatedMessages, (chunk) => {
      if (chunk === "[DONE]") return;

      console.log("Received chunk:", JSON.stringify(chunk)); // ← keep for debugging

      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id !== aiMsg.id) return msg;

          // Simple append - best for LangChain deltas
          return {
            ...msg,
            content: (msg.content || "") + chunk,
          };
        })
      );
    });
  } catch (err) {
    console.error(err);
    setError("⚠️ Failed to generate response.");
  } finally {
    setLoading(false);
  }
};
  /**
   * SEND MESSAGE
   */
  // const handleSend = async (overrideInput = null) => {
  //   const text =
  //     typeof overrideInput === "string"
  //       ? overrideInput
  //       : typeof input === "string"
  //         ? input
  //         : "";

  //   if (!text.trim() || text.trim().length < 3) {
  //     setError("Please enter at least 3 characters.");
  //     return;
  //   }

  //   setError(null);
  //   setLoading(true);

  //   const finalPrompt = selectedTemplate
  //     ? selectedTemplate.replace("{topic}", text)
  //     : text;

  //   setLastPrompt(finalPrompt);

  //   const userMsg = { role: "user", content: text };
  //   const aiMsg = { role: "assistant", content: "" };

  //   let aiIndex;

  //   setMessages((prev) => {
  //     const updated = [...prev, userMsg, aiMsg];
  //     aiIndex = updated.length - 1;
  //     return updated;
  //   });

  //   setInput("");

  //   try {
  //     await streamMessage(finalPrompt, (chunk) => {
  //       setMessages((prev) => {
  //         const updated = [...prev];
  //         const current = updated[aiIndex].content;

  //         if (chunk.startsWith(current)) {
  //           updated[aiIndex].content = chunk;
  //         } else if (!current.includes(chunk)) {
  //           updated[aiIndex].content += chunk;
  //         }

  //         return updated;
  //       });
  //     });
  //   } catch (err) {
  //     setError("⚠️ Failed to generate response.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  /**
   * RETRY
   */
  // const handleRetry = async () => {
  //   if (!lastPrompt) return;

  //   setError(null);
  //   setLoading(true);

  //   const aiMsg = { role: "assistant", content: "" };

  //   let aiIndex;

  //   setMessages((prev) => {
  //     const updated = [...prev, aiMsg];
  //     aiIndex = updated.length - 1;
  //     return updated;
  //   });

  //   try {
  //     await streamMessage(lastPrompt, (chunk) => {
  //       setMessages((prev) => {
  //         const updated = [...prev];
  //         updated[aiIndex].content += chunk;
  //         return updated;
  //       });
  //     });
  //   } catch {
  //     setError("⚠️ Retry failed.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleRetry = async () => {
    if (!lastPrompt) return;

    setError(null);
    setLoading(true);

    const aiMsg = {
      id: Date.now().toString(),
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [...prev, aiMsg]);

    try {
      await streamMessage(lastPrompt, (chunk) => {
        // Note: you're still passing string here
        if (chunk === "[DONE]") return;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMsg.id
              ? { ...msg, content: (msg.content || "") + chunk }
              : msg,
          ),
        );
      });
    } catch {
      setError("⚠️ Retry failed.");
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
  const buildStructuredPrompt = () => {
    return `
      Write content about "${topic}" 
      Tone: ${tone}
      Length: ${length}
      `;
  };
  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Topic is required");
      return;
    }

    const prompt = buildStructuredPrompt();

    await handleSend(prompt); // ✅ directly pass prompt
  };
  return (
    <div className="page-container">
      <div className="chat-wrapper">
        {/* HEADER */}
        <div className="header">
          <div className="logo">✨</div>
          <h1>AI Assistant</h1>
          <p>Guided AI Prompt Experience</p>
        </div>
        <div className="form-box">
          <h3>AI Generator</h3>

          <input
            type="text"
            placeholder="Enter topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <select value={tone} onChange={(e) => setTone(e.target.value)}>
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="funny">Funny</option>
          </select>

          <select value={length} onChange={(e) => setLength(e.target.value)}>
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>

          <button onClick={handleGenerate}>Generate</button>
        </div>
        <div className="chat-card">
          {/* CHAT AREA */}
          <div className="chat-area">
            {messages.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">👋</div>
                <h3>Start a conversation</h3>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble ${msg.role}`}>
                {msg.content}
              </div>
            ))}

            {error && <div className="chat-bubble error">{error}</div>}
          </div>

          {/* INPUT SECTION */}
          <div className="input-section">
            {/* TEMPLATE SELECTOR */}
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="template-select"
            >
              <option value="">-- Select Template --</option>
              {templates.map((t, i) => (
                <option key={i} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>

            {/* PREVIEW */}
            {selectedTemplate && (
              <div className="preview-box">{buildPrompt()}</div>
            )}

            <div className="input-row">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter topic..."
                disabled={loading}
                className="message-input"
              />

              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="send-button"
              >
                {loading ? "..." : "Send"}
              </button>

              {/* Retry only on error */}
              {error && lastPrompt && (
                <button onClick={handleRetry} className="retry-button">
                  Retry
                </button>
              )}
            </div>

            <p className="hint">Enter = Send • Shift+Enter = New line</p>
          </div>
        </div>
      </div>
    </div>
  );
}
