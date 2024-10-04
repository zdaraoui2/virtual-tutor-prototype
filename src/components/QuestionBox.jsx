import React, { useState } from 'react';
import { getAnswer } from '../services/openai';

function QuestionBox() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content:
        'You are a helpful virtual tutor that assists students with their course modules. Provide clear and concise answers.',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (question.trim() === '' || loading) return;

    setLoading(true);
    setError('');

    const newMessages = [...messages, { role: 'user', content: question }];

    try {
      const assistantResponse = await getAnswer(newMessages);
      const updatedMessages = [
        ...newMessages,
        { role: 'assistant', content: assistantResponse },
      ];

      setMessages(updatedMessages);
      setQuestion('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const apiErrorMessage = error.response.data.error.message;
        setError(apiErrorMessage);
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="question-box">
      <h2>Ask a Question</h2>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Generating...' : 'Submit'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="conversation">
        {messages
          .filter((msg) => msg.role !== 'system')
          .map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <strong>{msg.role === 'user' ? 'You' : 'Tutor'}:</strong> {msg.content}
            </div>
          ))}
      </div>
    </div>
  );
}

export default QuestionBox;
