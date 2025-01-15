import { useState, useEffect } from "react";

const FlashMessage = ({ message, type = "success", onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true); // Reset visibility when a new message appears

    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose(); // Callback to clear the message
    }, 5000); // Auto-hide after 5 seconds

    return () => clearTimeout(timer); // Cleanup function
  }, [message]); // Run effect when `message` changes

  if (!visible) return null;

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white transition-opacity duration-500 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};

export default FlashMessage;
