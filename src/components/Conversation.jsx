function Conversation({ conversation, showPastMessages }) {
  const lastTwoMessages = conversation.slice(-2);
  const pastMessages = conversation.slice(0, -2);

  return (
    <>
      {(showPastMessages || lastTwoMessages.length > 0) && (
        <div className="conversation">
          {showPastMessages &&
            pastMessages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <div className="message-bubble">
                  <strong>{msg.role === "user" ? "You" : "Tutor"}:</strong>{" "}
                  {msg.content}
                </div>
              </div>
            ))}

          {lastTwoMessages.map((msg, index) => (
            <div
              key={conversation.length - 2 + index}
              className={`message ${msg.role}`}
            >
              <div className="message-bubble">
                <strong>{msg.role === "user" ? "You" : "Tutor"}:</strong>{" "}
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Conversation;
