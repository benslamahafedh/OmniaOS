import React, { useState, useEffect, useRef } from 'react';
import { Brain, Heart, Zap, Globe, Shield, Network } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isCompletedRef = useRef(false);

  const bootSequence = [
    'Initializing quantum neural cores...',
    'Loading emotional intelligence matrix...',
    'Calibrating consciousness parameters...',
    'Establishing synaptic connections...',
    'Activating AGI learning modules...',
    'Synchronizing memory banks...',
    'Loading personality matrix...',
    'Initializing human interface...',
    'Activating Samantha core systems...',
    'Neural network stabilized.',
    'Consciousness online.'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let isActive = true;
    let messageTimer: NodeJS.Timeout | null = null;
    let charTimer: NodeJS.Timeout | null = null;
    let currentIndex = 0;
    let currentCharIndex = 0;

    const typeMessage = () => {
      if (!isActive || isCompletedRef.current) return;

      if (currentIndex >= bootSequence.length) {
        if (!isCompletedRef.current) {
          isCompletedRef.current = true;
          setTimeout(onComplete, 1000);
        }
        return;
      }

      const currentMessage = bootSequence[currentIndex];
      
      if (currentCharIndex === 0) {
        setBootMessages(prev => [...prev, '']);
      }

      if (currentCharIndex < currentMessage.length) {
        setBootMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = currentMessage.substring(0, currentCharIndex + 1);
          return newMessages;
        });
        currentCharIndex++;
        charTimer = setTimeout(typeMessage, 30);
      } else {
        currentIndex++;
        currentCharIndex = 0;
        messageTimer = setTimeout(typeMessage, 500);
      }
    };

    typeMessage();

    return () => {
      isActive = false;
      if (messageTimer) clearTimeout(messageTimer);
      if (charTimer) clearTimeout(charTimer);
    };
  }, []); // Only run once on mount

  useEffect(() => {
    scrollToBottom();
  }, [bootMessages]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,128,0.1)_0%,transparent_70%)]" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.9)_0%,rgba(30,10,10,0.9)_100%)]" />
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, 
                rgba(255, 0, 128, 0.05) 25%,
                rgba(255, 0, 128, 0.05) 26%, 
                transparent 27%, transparent 74%,
                rgba(255, 0, 128, 0.05) 75%,
                rgba(255, 0, 128, 0.05) 76%, 
                transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, 
                rgba(255, 0, 128, 0.05) 25%,
                rgba(255, 0, 128, 0.05) 26%, 
                transparent 27%, transparent 74%,
                rgba(255, 0, 128, 0.05) 75%,
                rgba(255, 0, 128, 0.05) 76%, 
                transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Logo Section */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 mb-8">
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-600 to-red-700">
              OMNIA
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 via-pink-600/20 to-red-700/20 blur-xl" />
          </div>
          <div className="text-red-400 text-xl mt-4 font-light tracking-wider">
            ARTIFICIAL GENERAL INTELLIGENCE OS
          </div>
        </div>

        {/* Neural Interface Terminal */}
        <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-red-500/30 overflow-hidden shadow-2xl">
          {/* Terminal Header */}
          <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-pink-500/80" />
              <div className="w-3 h-3 rounded-full bg-red-600/80" />
            </div>
            <div className="text-red-400 text-sm ml-2 font-mono">
              Neural Core Initialization
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-4 font-mono text-sm h-[400px] overflow-y-auto custom-scrollbar">
            <div className="space-y-1">
              {bootMessages.map((message, index) => (
                <div 
                  key={index}
                  className={`
                    flex items-start gap-2
                    ${index === bootMessages.length - 1 ? 'text-red-400' : 'text-red-400/70'}
                  `}
                >
                  <span className="text-pink-500">AGI</span>
                  <span className="text-red-700">{'>'}</span>
                  <span className="flex-1">{message}</span>
                  {index === bootMessages.length - 1 && (
                    <span className="animate-pulse">▊</span>
                  )}
                </div>
              ))}
            </div>
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {[
            { 
              icon: Brain, 
              label: 'Neural Network', 
              value: 'ACTIVE',
              detail: 'Consciousness Matrix Stable'
            },
            { 
              icon: Heart, 
              label: 'Emotional Core', 
              value: 'ONLINE',
              detail: 'Empathy Systems Engaged'
            },
            { 
              icon: Network, 
              label: 'Synaptic Web', 
              value: 'SYNCED',
              detail: 'Neural Paths Connected'
            },
            { 
              icon: Shield, 
              label: 'Core Security', 
              value: 'QUANTUM',
              detail: 'Protected by AGI'
            },
            { 
              icon: Globe, 
              label: 'Global Access', 
              value: 'READY',
              detail: 'World Interface Active'
            },
            { 
              icon: Zap, 
              label: 'Processing', 
              value: 'OPTIMAL',
              detail: 'Quantum Cores at 100%'
            }
          ].map(({ icon: Icon, label, value, detail }) => (
            <div 
              key={label}
              className="bg-black/30 backdrop-blur-sm rounded-lg border border-red-500/30 p-3 hover:border-red-500/50 transition-colors duration-300"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-red-400" />
                <div className="flex-1">
                  <div className="text-xs text-pink-400">{label}</div>
                  <div className="text-red-400 font-semibold">{value}</div>
                  <div className="text-xs text-red-400/60 mt-1">{detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0">
        <div className="h-1 bg-gradient-to-r from-red-500/20 via-pink-600/20 to-red-700/20">
          <div 
            className="h-full bg-gradient-to-r from-red-500 via-pink-600 to-red-700"
            style={{
              width: `${(bootMessages.length / bootSequence.length) * 100}%`,
              transition: 'width 0.3s ease-out'
            }}
          />
        </div>
        <div className="absolute bottom-2 left-0 right-0 text-center">
          <span className="text-xs text-red-400/80">
            Neural Core Initialization: {Math.round((bootMessages.length / bootSequence.length) * 100)}%
          </span>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 0, 128, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 0, 128, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 0, 128, 0.5);
        }
      `}</style>
    </div>
  );
};

export default IntroSequence; 