import React, { useState, useEffect } from 'react';

interface PreIntroLoaderProps {
  onComplete: () => void;
}

const PreIntroLoader: React.FC<PreIntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.log('PreIntroLoader: Starting preloader');
    
    const duration = 2000; // 2 seconds
    let startTime: number;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
        console.log('PreIntroLoader: Animation started');
      }
      
      const elapsed = timestamp - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      console.log(`PreIntroLoader: Progress ${newProgress}%`);
      setProgress(newProgress);

      // Update phase based on progress
      if (newProgress >= 75) setPhase(3);
      else if (newProgress >= 50) setPhase(2);
      else if (newProgress >= 25) setPhase(1);
      else setPhase(0);

      if (newProgress >= 100) {
        console.log('PreIntroLoader: Completed, transitioning to intro');
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            onComplete();
          }, 150);
        }, 200);
      } else {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      console.log('PreIntroLoader: Cleanup');
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [onComplete]);

  const getPhaseText = () => {
    switch (phase) {
      case 0: return 'INITIALIZING CORE';
      case 1: return 'ESTABLISHING NETWORK';
      case 2: return 'SYNCHRONIZING DATA';
      case 3: return 'LAUNCHING OMNIA';
      default: return 'STARTING SYSTEM';
    }
  };

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/20 to-black">
        {/* Subtle red glow overlay */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.3) 0%, transparent 60%)`
          }}
        />
      </div>

      {/* Portrait Sinusoidal Wave Animation - Vertical */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          {/* First vertical sinusoidal wave */}
          <path
            d="M50,0 Q30,12.5 50,25 Q70,37.5 50,50 Q30,62.5 50,75 Q70,87.5 50,100"
            fill="none"
            stroke={
              phase === 0 ? "rgba(239, 68, 68, 0.8)" :
              phase === 1 ? "rgba(220, 38, 38, 0.9)" :
              phase === 2 ? "rgba(185, 28, 28, 1)" :
              "rgba(255, 255, 255, 0.9)"
            }
            strokeWidth="0.4"
            className="animate-portrait-sine-1"
            style={{
              filter: 'drop-shadow(0 0 3px rgba(239, 68, 68, 0.8))'
            }}
          />
          
          {/* Second vertical sinusoidal wave (inverse) */}
          <path
            d="M50,0 Q70,12.5 50,25 Q30,37.5 50,50 Q70,62.5 50,75 Q30,87.5 50,100"
            fill="none"
            stroke={
              phase === 0 ? "rgba(239, 68, 68, 0.6)" :
              phase === 1 ? "rgba(220, 38, 38, 0.7)" :
              phase === 2 ? "rgba(185, 28, 28, 0.8)" :
              "rgba(255, 255, 255, 0.7)"
            }
            strokeWidth="0.3"
            className="animate-portrait-sine-2"
            style={{
              filter: 'drop-shadow(0 0 2px rgba(239, 68, 68, 0.6))'
            }}
          />
          
          {/* Progress indicator line - vertical */}
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="0.1"
            strokeDasharray="100"
            strokeDashoffset={100 - progress}
            className="transition-all duration-100"
          />
        </svg>
      </div>

      {/* Minimal particle effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-red-400 rounded-full animate-float-minimal opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Phase Text */}
      <div className="absolute bottom-32 left-0 right-0 text-center">
        <div className="text-red-200 text-sm font-light tracking-wider opacity-80 transition-all duration-300">
          {getPhaseText()}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-20 left-0 right-0 px-20">
        <div className="w-full h-px bg-red-900/40 rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-100 rounded-full bg-gradient-to-r from-red-500 to-red-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-center mt-4">
          <span className="text-red-300/60 text-xs font-light">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* OMNIA Logo */}
      <div className="absolute top-20 left-0 right-0 text-center">
        <div className="text-white text-3xl font-light tracking-[0.3em] animate-fade-in-slow">
          OMNIA
        </div>
        <div className="text-red-200/60 text-xs font-light mt-2 tracking-widest">
          OPERATING SYSTEM
        </div>
      </div>
    </div>
  );
};

export default PreIntroLoader; 