const ChatbotDemo = ({ title, src }) => {
  return (
    <div
      style={{
        marginBottom: 36,
        background: "white",
        borderRadius: 16,
        padding: "32px 32px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
      }}
    >
      <h2
        style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontSize: 17,
          fontWeight: 700,
          color: "#5B8C7E",
          marginBottom: 18,
          paddingBottom: 12,
          borderBottom: "2px solid rgba(91, 140, 126, 0.12)",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          minHeight: 700,
          height: "80vh",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid #E8E8E0",
        }}
      >
        <iframe
          src={src}
          title={title}
          allow="microphone"
          style={{ width: "100%", height: "100%", border: 0 }}
        />
      </div>
    </div>
  );
};

export default ChatbotDemo;
