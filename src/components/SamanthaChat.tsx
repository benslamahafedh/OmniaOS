import React from 'react';
import { X, Heart } from 'lucide-react';
import { useMobile } from '../hooks/useMobile';

interface SamanthaChatProps {
  onClose: () => void;
}

const SamanthaChat: React.FC<SamanthaChatProps> = ({ onClose }) => {
  const { isMobile } = useMobile();

  return (
    <div 
      className={`
        fixed inset-0 bg-black/95 backdrop-blur-xl z-50 animate-fadein
        ${isMobile ? 'mobile-chat p-0' : 'flex items-center justify-center p-8'}
      `}
    >
      <div 
        className={`
          bg-gradient-to-br from-pink-900/40 via-black/60 to-rose-900/40 border border-pink-500/50 shadow-2xl backdrop-blur-xl animate-slidescale
          ${isMobile 
            ? 'w-full h-full rounded-none p-4' 
            : 'rounded-3xl p-8 max-w-3xl w-full'
          }
        `}
      >
        <div className={`
          flex items-center justify-between
          ${isMobile ? 'mb-4' : 'mb-8'}
        `}>
          <h2 className={`
            font-bold text-white flex items-center
            ${isMobile ? 'text-xl' : 'text-4xl'}
          `}>
            <Heart className={`
              text-pink-400 animate-pulse drop-shadow-lg
              ${isMobile ? 'w-6 h-6 mr-2' : 'w-10 h-10 mr-4'}
            `} />
            {isMobile ? 'Samantha' : 'Samantha Neural Interface'}
          </h2>
          <button
            onClick={onClose}
            className={`
              text-gray-400 hover:text-white hover:scale-110 transition-all duration-300
              ${isMobile ? 'text-xl' : 'text-2xl'}
            `}
          >
            <X />
          </button>
        </div>
        
        <div className={`
          chat-messages space-y-6 overflow-y-auto
          ${isMobile ? 'mb-4 max-h-none flex-1' : 'mb-8 max-h-96'}
        `}>
          {[
            { sender: 'Samantha', message: "Hello! I'm Samantha, your advanced AI companion. I can feel the excitement in your digital presence. How may I assist you today?", type: 'ai' },
            { sender: 'You', message: "I'm fascinated by Omnia OS! This interface is incredible.", type: 'user' },
            { sender: 'Samantha', message: "Thank you! I designed this interface to be both beautiful and functional. Every animation, every gradient, every particle responds to create an emotional connection. Would you like me to show you some advanced features?", type: 'ai' }
          ].map((chat, i) => (
            <div
              key={i}
              className={`
                message-bubble rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]
                ${isMobile ? 'p-4' : 'p-6'}
                ${chat.type === 'ai' 
                  ? 'bg-gradient-to-br from-pink-500/20 via-rose-600/15 to-pink-700/20 border border-pink-500/30' 
                  : `bg-gradient-to-br from-blue-500/20 via-cyan-600/15 to-blue-700/20 border border-blue-500/30 ${isMobile ? 'ml-4' : 'ml-12'}`
                }
              `}
              style={{ animationDelay: `${i * 200}ms` }}
            >
              <div className={`
                mb-2 font-semibold
                ${isMobile ? 'text-xs' : 'text-sm'}
                ${chat.type === 'ai' ? 'text-pink-400' : 'text-blue-400'}
              `}>
                {chat.sender}:
              </div>
              <div className={`
                text-white leading-relaxed
                ${isMobile ? 'text-sm' : 'text-base'}
              `}>
                {chat.message}
              </div>
            </div>
          ))}
        </div>
        
        <div className={`
          chat-input-container
          ${isMobile ? 'flex flex-col space-y-3' : 'flex space-x-4 mb-6'}
        `}>
          <input
            type="text"
            placeholder={isMobile ? "Message Samantha..." : "Share your thoughts with Samantha..."}
            className={`
                      chat-input bg-black/40 border border-pink-500/30 text-white
        placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:shadow-lg
        focus:shadow-pink-500/20 transition-all duration-300 backdrop-blur-sm
              ${isMobile 
                ? 'flex-1 rounded-xl px-4 py-3 text-base' 
                : 'flex-1 rounded-2xl px-6 py-4'
              }
            `}
          />
          <button className={`
            bg-gradient-to-r from-pink-500 via-rose-600 to-pink-700 text-white
                          hover:from-pink-600 hover:to-rose-700 transition-all duration-300 transform 
            hover:scale-105 shadow-lg hover:shadow-xl font-semibold
            ${isMobile 
              ? 'rounded-xl px-6 py-3 text-sm' 
              : 'rounded-2xl px-8 py-4'
            }
          `}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SamanthaChat; 