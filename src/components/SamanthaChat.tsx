import React from 'react';
import { X, Heart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SamanthaChatProps {
  onClose: () => void;
}

const SamanthaChat: React.FC<SamanthaChatProps> = ({ onClose }) => {
  const { theme } = useTheme();

  return (
    <div 
      className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-8 animate-fadein"
    >
      <div 
        className="bg-gradient-to-br from-red-900/40 via-black/60 to-pink-900/40 rounded-3xl p-8 max-w-3xl w-full 
          border border-red-500/50 shadow-2xl backdrop-blur-xl animate-slidescale"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-white flex items-center">
            <Heart className="w-10 h-10 text-red-400 mr-4 animate-pulse drop-shadow-lg" />
            Samantha Neural Interface
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 text-2xl"
          >
            <X />
          </button>
        </div>
        
        <div className="space-y-6 mb-8 max-h-96 overflow-y-auto">
          {[
            { sender: 'Samantha', message: "Hello! I'm Samantha, your advanced AI companion. I can feel the excitement in your digital presence. How may I assist you today?", type: 'ai' },
            { sender: 'You', message: "I'm fascinated by Omnia OS! This interface is incredible.", type: 'user' },
            { sender: 'Samantha', message: "Thank you! I designed this interface to be both beautiful and functional. Every animation, every gradient, every particle responds to create an emotional connection. Would you like me to show you some advanced features?", type: 'ai' }
          ].map((chat, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                chat.type === 'ai' 
                  ? 'bg-gradient-to-br from-red-500/20 via-pink-600/15 to-red-700/20 border border-red-500/30' 
                  : 'bg-gradient-to-br from-blue-500/20 via-cyan-600/15 to-blue-700/20 border border-blue-500/30 ml-12'
              }`}
              style={{ animationDelay: `${i * 200}ms` }}
            >
              <div className={`text-sm mb-2 font-semibold ${chat.type === 'ai' ? 'text-red-400' : 'text-blue-400'}`}>
                {chat.sender}:
              </div>
              <div className="text-white leading-relaxed">{chat.message}</div>
            </div>
          ))}
        </div>
        
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            placeholder="Share your thoughts with Samantha..."
            className="flex-1 bg-black/40 border border-red-500/30 rounded-2xl px-6 py-4 text-white 
              placeholder-gray-400 focus:outline-none focus:border-red-400 focus:shadow-lg 
              focus:shadow-red-500/20 transition-all duration-300 backdrop-blur-sm"
          />
          <button className="bg-gradient-to-r from-red-500 via-pink-600 to-red-700 text-white px-8 py-4 
            rounded-2xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform 
            hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SamanthaChat; 