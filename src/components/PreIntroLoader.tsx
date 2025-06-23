import React, { useState, useEffect, useRef } from 'react';

interface PreIntroLoaderProps {
  onComplete: () => void;
}

const PreIntroLoader: React.FC<PreIntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const isAnimatingRef = useRef(false);
  const isPressedRef = useRef(false);

  // Handle press and hold animation
  useEffect(() => {
    if (!isPressed) {
      // Stop animation and reset if not pressed
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
      startTimeRef.current = undefined;
      isAnimatingRef.current = false;
      
      // Reset progress slowly when released (unless completed)
      if (progress < 100 && progress > 0) {
        const resetInterval = setInterval(() => {
          setProgress(prev => {
            const newProgress = Math.max(0, prev - 8);
            if (newProgress <= 0) {
              clearInterval(resetInterval);
              setPhase(0);
              setShowInstructions(true); // Show instructions again when reset
            } else {
              // Update phase based on progress with more granular transitions
              if (newProgress >= 90) setPhase(5);      // Final white phase
              else if (newProgress >= 75) setPhase(4); // Bright red-white transition
              else if (newProgress >= 60) setPhase(3); // Intense red
              else if (newProgress >= 40) setPhase(2); // Medium red
              else if (newProgress >= 20) setPhase(1); // Light red
              else setPhase(0);                        // Initial dark red
            }
            return newProgress;
          });
        }, 30);
        
        return () => clearInterval(resetInterval);
      }
      return;
    }

    // Hide instructions when user starts pressing
    if (showInstructions) {
      setShowInstructions(false);
    }

    // Start animation when pressed
    if (!isAnimatingRef.current) {
      console.log('PreIntroLoader: Starting press-and-hold animation');
      isAnimatingRef.current = true;
      
      const duration = 3000; // 3 seconds to complete when held
      
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp;
          console.log('PreIntroLoader: Animation started at timestamp:', timestamp);
        }
        
        // Check if still pressed using ref to avoid stale closure
        if (!isPressedRef.current) {
          console.log('PreIntroLoader: User released, stopping animation');
          isAnimatingRef.current = false;
          return;
        }
        
        const elapsed = timestamp - startTimeRef.current;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        
        console.log(`PreIntroLoader: Progress ${newProgress.toFixed(1)}%, elapsed: ${elapsed}ms`);
        setProgress(newProgress);

        // Update phase based on progress with more granular transitions
        if (newProgress >= 90) setPhase(5);      // Final white phase
        else if (newProgress >= 75) setPhase(4); // Bright red-white transition
        else if (newProgress >= 60) setPhase(3); // Intense red
        else if (newProgress >= 40) setPhase(2); // Medium red
        else if (newProgress >= 20) setPhase(1); // Light red
        else setPhase(0);                        // Initial dark red

        if (newProgress >= 100) {
          console.log('PreIntroLoader: Completed via press-and-hold');
          isAnimatingRef.current = false;
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
              onComplete();
            }, 150);
          }, 200);
        } else {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPressed, onComplete]);

  // Handle mouse events
  const handleMouseDown = () => {
    console.log('PreIntroLoader: Mouse down detected');
    setIsPressed(true);
    isPressedRef.current = true;
  };

  const handleMouseUp = () => {
    console.log('PreIntroLoader: Mouse up detected');
    setIsPressed(false);
    isPressedRef.current = false;
  };

  const handleMouseLeave = () => {
    console.log('PreIntroLoader: Mouse leave detected');
    setIsPressed(false);
    isPressedRef.current = false;
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    console.log('PreIntroLoader: Touch start detected');
    setIsPressed(true);
    isPressedRef.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    console.log('PreIntroLoader: Touch end detected');
    setIsPressed(false);
    isPressedRef.current = false;
  };

  // Add global mouse up listener to handle mouse up outside component
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      console.log('PreIntroLoader: Global mouse up detected');
      setIsPressed(false);
      isPressedRef.current = false;
    };

    const handleGlobalTouchEnd = () => {
      console.log('PreIntroLoader: Global touch end detected');
      setIsPressed(false);
      isPressedRef.current = false;
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchend', handleGlobalTouchEnd);
    document.addEventListener('touchcancel', handleGlobalTouchEnd);

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
      document.removeEventListener('touchcancel', handleGlobalTouchEnd);
    };
  }, []);

  const getPhaseText = () => {
    switch (phase) {
      case 0: return 'INITIALIZING CORE';
      case 1: return 'ESTABLISHING NETWORK';
      case 2: return 'SYNCHRONIZING DATA';
      case 3: return 'ACTIVATING SYSTEMS';
      case 4: return 'NEURAL PATHWAYS ONLINE';
      case 5: return 'LAUNCHING OMNIA';
      default: return 'STARTING SYSTEM';
    }
  };

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} cursor-pointer select-none`}
         onMouseDown={handleMouseDown}
         onMouseUp={handleMouseUp}
         onMouseLeave={handleMouseLeave}
         onTouchStart={handleTouchStart}
         onTouchEnd={handleTouchEnd}>
      {/* Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/20 to-black">
        {/* Dynamic glow overlay that transitions with phases */}
        <div 
          className="absolute inset-0 transition-all duration-500"
          style={{
            opacity: phase === 0 ? 0.15 : phase === 1 ? 0.2 : phase === 2 ? 0.25 : phase === 3 ? 0.3 : phase === 4 ? 0.4 : 0.5,
            background: `radial-gradient(circle at 50% 50%, ${
              phase === 0 ? 'rgba(220, 38, 38, 0.3)' :
              phase === 1 ? 'rgba(239, 68, 68, 0.4)' :
              phase === 2 ? 'rgba(248, 113, 113, 0.5)' :
              phase === 3 ? 'rgba(252, 165, 165, 0.6)' :
              phase === 4 ? 'rgba(255, 200, 200, 0.7)' :
              'rgba(255, 255, 255, 0.8)'
            } 0%, transparent 60%)`
          }}
        />
      </div>

      {/* Portrait Sinusoidal Wave Animation - Vertical */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          {/* First vertical sinusoidal wave with gradual color transition */}
          <path
            d="M50,0 Q30,12.5 50,25 Q70,37.5 50,50 Q30,62.5 50,75 Q70,87.5 50,100"
            fill="none"
            stroke={
              phase === 0 ? "rgba(220, 38, 38, 0.7)" :      // Dark red
              phase === 1 ? "rgba(239, 68, 68, 0.8)" :      // Medium red
              phase === 2 ? "rgba(248, 113, 113, 0.9)" :    // Light red
              phase === 3 ? "rgba(252, 165, 165, 1)" :      // Very light red
              phase === 4 ? "rgba(255, 200, 200, 1)" :      // Pink-white transition
              "rgba(255, 255, 255, 0.95)"                   // Pure white
            }
            strokeWidth="0.4"
            className="animate-portrait-sine-1"
            style={{
              filter: `drop-shadow(0 0 ${3 + phase}px ${
                phase === 0 ? 'rgba(220, 38, 38, 0.8)' :
                phase === 1 ? 'rgba(239, 68, 68, 0.9)' :
                phase === 2 ? 'rgba(248, 113, 113, 1)' :
                phase === 3 ? 'rgba(252, 165, 165, 1)' :
                phase === 4 ? 'rgba(255, 200, 200, 1)' :
                'rgba(255, 255, 255, 1)'
              })`,
              transition: 'all 0.3s ease-in-out'
            }}
          />
          
          {/* Second vertical sinusoidal wave (inverse) with gradual color transition */}
          <path
            d="M50,0 Q70,12.5 50,25 Q30,37.5 50,50 Q70,62.5 50,75 Q30,87.5 50,100"
            fill="none"
            stroke={
              phase === 0 ? "rgba(220, 38, 38, 0.5)" :      // Dark red
              phase === 1 ? "rgba(239, 68, 68, 0.6)" :      // Medium red
              phase === 2 ? "rgba(248, 113, 113, 0.7)" :    // Light red
              phase === 3 ? "rgba(252, 165, 165, 0.8)" :    // Very light red
              phase === 4 ? "rgba(255, 200, 200, 0.9)" :    // Pink-white transition
              "rgba(255, 255, 255, 0.75)"                   // Pure white
            }
            strokeWidth="0.3"
            className="animate-portrait-sine-2"
            style={{
              filter: `drop-shadow(0 0 ${2 + phase}px ${
                phase === 0 ? 'rgba(220, 38, 38, 0.6)' :
                phase === 1 ? 'rgba(239, 68, 68, 0.7)' :
                phase === 2 ? 'rgba(248, 113, 113, 0.8)' :
                phase === 3 ? 'rgba(252, 165, 165, 0.9)' :
                phase === 4 ? 'rgba(255, 200, 200, 1)' :
                'rgba(255, 255, 255, 0.9)'
              })`,
              transition: 'all 0.3s ease-in-out'
            }}
          />
          
          {/* Progress indicator line - vertical with dynamic color */}
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            stroke={
              phase === 0 ? "rgba(220, 38, 38, 0.3)" :
              phase === 1 ? "rgba(239, 68, 68, 0.4)" :
              phase === 2 ? "rgba(248, 113, 113, 0.5)" :
              phase === 3 ? "rgba(252, 165, 165, 0.6)" :
              phase === 4 ? "rgba(255, 200, 200, 0.8)" :
              "rgba(255, 255, 255, 0.9)"
            }
            strokeWidth="0.15"
            strokeDasharray="100"
            strokeDashoffset={100 - progress}
            className="transition-all duration-300"
            style={{
              filter: `drop-shadow(0 0 1px ${
                phase === 0 ? 'rgba(220, 38, 38, 0.5)' :
                phase === 1 ? 'rgba(239, 68, 68, 0.6)' :
                phase === 2 ? 'rgba(248, 113, 113, 0.7)' :
                phase === 3 ? 'rgba(252, 165, 165, 0.8)' :
                phase === 4 ? 'rgba(255, 200, 200, 0.9)' :
                'rgba(255, 255, 255, 1)'
              })`
            }}
          />
        </svg>
         </div>

      {/* Enhanced particle effect with phase-based colors */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-0.5 h-0.5 rounded-full animate-float-minimal transition-all duration-500 ${isPressed ? 'opacity-90' : 'opacity-30'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
              backgroundColor: 
                phase === 0 ? 'rgba(220, 38, 38, 0.8)' :
                phase === 1 ? 'rgba(239, 68, 68, 0.8)' :
                phase === 2 ? 'rgba(248, 113, 113, 0.9)' :
                phase === 3 ? 'rgba(252, 165, 165, 0.9)' :
                phase === 4 ? 'rgba(255, 200, 200, 1)' :
                'rgba(255, 255, 255, 0.9)',
              boxShadow: `0 0 ${2 + phase}px ${
                phase === 0 ? 'rgba(220, 38, 38, 0.6)' :
                phase === 1 ? 'rgba(239, 68, 68, 0.7)' :
                phase === 2 ? 'rgba(248, 113, 113, 0.8)' :
                phase === 3 ? 'rgba(252, 165, 165, 0.9)' :
                phase === 4 ? 'rgba(255, 200, 200, 1)' :
                'rgba(255, 255, 255, 1)'
              }`
            }}
          />
        ))}
      </div>

      {/* Instructions - at bottom */}
      {showInstructions && (
        <div className="absolute bottom-16 left-0 right-0 text-center">
          <div className="animate-pulse">
            <div className="text-white text-lg font-light tracking-wider mb-2">
              Press and Hold to Initialize
            </div>
            <div className="text-red-300/70 text-sm font-light tracking-wide">
              Hold down to activate OMNIA OS
            </div>
          </div>
        </div>
      )}

      {/* Phase Text - only show when pressed */}
      {!showInstructions && (
        <div className="absolute bottom-28 left-0 right-0 text-center">
          <div className={`text-red-200 text-sm font-light tracking-wider transition-all duration-300 ${isPressed ? 'opacity-100' : 'opacity-50'}`}>
            {getPhaseText()}
          </div>
        </div>
      )}

      {/* Progress Bar - only show when pressed */}
      {!showInstructions && (
        <div className="absolute bottom-16 left-0 right-0 px-20">
          <div className="w-full h-px bg-red-900/40 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-100 rounded-full bg-gradient-to-r from-red-500 to-red-300 ${isPressed ? 'opacity-100' : 'opacity-50'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center mt-4">
            <span className={`text-red-300/60 text-xs font-light transition-opacity duration-300 ${isPressed ? 'opacity-100' : 'opacity-50'}`}>
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      )}

      {/* OMNIA Logo */}
      <div className="absolute top-20 left-0 right-0 text-center">
        <div className={`text-white text-3xl font-light tracking-[0.3em] animate-fade-in-slow transition-all duration-300 ${isPressed ? 'scale-105' : 'scale-100'}`}>
          OMNIA
        </div>
        <div className="text-red-200/60 text-xs font-light mt-2 tracking-widest">
          OPERATING SYSTEM
        </div>
      </div>

      {/* Press feedback overlay */}
      {isPressed && (
        <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />
      )}
    </div>
  );
};

export default PreIntroLoader; 