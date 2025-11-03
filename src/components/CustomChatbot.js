"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
// styles imported globally in app/globals.css

function CustomChatbot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: 'Thank you! I’ll get back to you soon.' },
        ]);
      }, 1000); // Simulate bot response
    }
  };

  return (
    <div className="chatbot-container">
      <motion.button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        Chat
      </motion.button>

      {isOpen && (
        <motion.div
          className="chatbot"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="chatbot-header">Chat with my Assistant</div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${msg.sender === 'user' ? 'user' : 'bot'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default CustomChatbot;
