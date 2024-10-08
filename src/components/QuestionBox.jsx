import { useState, useEffect } from "react";
import { getAnswer } from "../services/openai";
import Conversation from "./Conversation";

function QuestionBox({ moduleData }) {
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPastMessages, setShowPastMessages] = useState(false);

  useEffect(() => {
    setConversation([]);
  }, [moduleData]);

  const handleSubmit = async () => {
    if (question.trim() === "" || loading) return;

    setLoading(true);
    setError("");

    const userMessage = { role: "user", content: question };
    const newConversation = [...conversation, userMessage];

    try {
      const assistantResponse = await getAnswer(
        [...newConversation],
        moduleData
      );
      const assistantMessage = {
        role: "assistant",
        content: assistantResponse,
      };

      setConversation([...newConversation, assistantMessage]);
      setQuestion("");
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to get response from assistant.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMessages = () => {
    setShowPastMessages(!showPastMessages);
  };

  return (
    <div className="question-box">
      <h2>Ask a Question</h2>

      <textarea
        className="question-input"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
        rows="4"
      />

      <div className="button-row">
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Generating..." : "Submit"}
        </button>

        {conversation.length > 2 ? (
          <button className="toggle-messages-btn" onClick={toggleMessages}>
            {showPastMessages ? "Hide Past Messages" : "View Past Messages"}
          </button>
        ) : (
          <div style={{ width: "140px" }}></div>
        )}
      </div>

      {error && <p className="error">{error}</p>}

      <Conversation
        conversation={conversation}
        showPastMessages={showPastMessages}
        toggleMessages={toggleMessages}
      />
    </div>
  );
}

export default QuestionBox;
