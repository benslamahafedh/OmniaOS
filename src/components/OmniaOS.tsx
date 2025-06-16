import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Desktop from './Desktop';
import Taskbar from './Taskbar';
import SamanthaChat from './SamanthaChat';

const OmniaOS: React.FC = () => {
  // Core state management
  const [isBooting, setIsBooting] = useState(true);
  const [bootPhase, setBootPhase] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showSamantha, setShowSamantha] = useState(false);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);

  // Boot sequence animation
  useEffect(() => {
    const bootSequence = [
      { delay: 1000, phase: 1 },
      { delay: 2000, phase: 2 },
      { delay: 3500, phase: 3 },
      { delay: 5000, phase: 4 }
    ];

    bootSequence.forEach(({ delay, phase }) => {
      setTimeout(() => setBootPhase(phase), delay);
    });

    setTimeout(() => setIsBooting(false), 6000);
  }, []);

  // Time update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Render background particles
  const renderParticles = useMemo(() => (
    <div className="fixed inset-0 pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => {
        const size = Math.random() * 3 + 1;
        const animationDuration = Math.random() * 10 + 5;
        return (
          <div
            key={i}
            className="absolute bg-red-500/30 rounded-full animate-float"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${animationDuration}s`,
              animationDelay: `${Math.random() * -20}s`
            }}
          />
        );
      })}
    </div>
  ), []);

  // Render dynamic background
  const renderBackground = useCallback(() => (
    <div 
      className="fixed inset-0 transition-all duration-1000 ease-out"
      style={{
        background: `
          radial-gradient(
            circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(239, 68, 68, 0.15) 0%,
            rgba(236, 72, 153, 0.1) 25%,
            transparent 50%
          ),
          linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.95) 0%,
            rgba(20, 20, 20, 0.95) 50%,
            rgba(0, 0, 0, 0.95) 100%
          )
        `
      }}
    />
  ), [mousePosition]);

  // Boot screen component
  const BootScreen = () => (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <h1 
            className={`text-8xl font-black bg-gradient-to-r from-red-500 via-red-600 to-red-700 
              bg-clip-text text-transparent animate-pulse tracking-wider transition-all duration-1000
              ${bootPhase >= 2 ? 'scale-110' : 'scale-90 opacity-50'}`}
          >
            OMNIA OS
          </h1>
          <div className="mt-4 text-red-500 text-xl font-light">
            {bootPhase >= 1 && "Initializing core systems..."}
            {bootPhase >= 2 && <div className="mt-2">Loading neural interface...</div>}
            {bootPhase >= 3 && <div className="mt-2">Connecting to Samantha...</div>}
          </div>
        </div>
        <div className="flex justify-center space-x-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-500
                ${i + 1 <= bootPhase 
                  ? 'bg-red-500 scale-100' 
                  : 'bg-red-900 scale-75'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (isBooting) {
    return <BootScreen />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden text-white">
      {renderBackground()}
      {renderParticles}
      
      <Taskbar currentTime={currentTime} />
      <Desktop 
        onSamanthaClick={() => setShowSamantha(true)}
      />

      {showSamantha && (
        <SamanthaChat onClose={() => setShowSamantha(false)} />
      )}

      {/* Global animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(5deg); }
          75% { transform: translate(-10px, 10px) rotate(-5deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OmniaOS; 