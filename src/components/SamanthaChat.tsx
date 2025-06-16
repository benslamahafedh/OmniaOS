import React, { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';

interface SamanthaChatProps {
  onClose: () => void;
}

const SamanthaChat: React.FC<SamanthaChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hello! I'm Samantha, your AI assistant. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I'm here to help! What would you like to know?",
        isUser: false
      }]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xl z-50 flex items-center justify-center">
      <div className="bg-gray-900/95 rounded-3xl border border-red-500/30 p-8 w-full max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Chat with Samantha</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[60vh] overflow-y-auto mb-8 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.isUser
                    ? 'bg-red-500/20 text-white'
                    : 'bg-gray-800/50 text-white'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800/50 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500/50"
          />
          <button
            onClick={handleSend}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-6 py-3 rounded-xl
              transition-all duration-300 flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SamanthaChat; 