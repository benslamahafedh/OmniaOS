import React, { useState, useEffect, useRef } from 'react';

interface PreIntroLoaderProps {
  onComplete: () => void;
}

interface TypewriterTextProps {
  text: string;
  phase: number;
  delay?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, phase, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTyping(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!startTyping) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100 + Math.random() * 100); // Variable typing speed

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, startTyping]);

  // Glitch effect for higher phases
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const shouldGlitch = phase >= 3 && Math.random() < 0.1;
  
  const glitchedText = shouldGlitch 
    ? displayText.split('').map(char => 
        Math.random() < 0.3 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
      ).join('')
    : displayText;

  return (
    <span className={`inline-block ${shouldGlitch ? 'animate-pulse' : ''}`}>
      {glitchedText}
      {currentIndex < text.length && startTyping && (
        <span className={`animate-pulse ${
          phase >= 4 ? 'text-white' : 'text-red-400'
        }`}>|</span>
      )}
    </span>
  );
};

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
         style={{
           userSelect: 'none',
           WebkitUserSelect: 'none',
           MozUserSelect: 'none',
           msUserSelect: 'none',
           WebkitTouchCallout: 'none',
           WebkitTapHighlightColor: 'transparent',
           touchAction: 'none'
         }}
         onMouseDown={handleMouseDown}
         onMouseUp={handleMouseUp}
         onMouseLeave={handleMouseLeave}
         onTouchStart={handleTouchStart}
         onTouchEnd={handleTouchEnd}
         onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
         onDragStart={(e: React.DragEvent) => e.preventDefault()}>
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

      {/* Portrait Sinusoidal Wave Animation - Vertical - Only show when pressed */}
      {isPressed && (
      <div className="absolute inset-0">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          {/* First vertical sinusoidal wave with gradual color transition and flowing animation */}
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
              className="animate-flowing-wave-1"
            style={{
              filter: `drop-shadow(0 0 ${3 + phase}px ${
                phase === 0 ? 'rgba(220, 38, 38, 0.8)' :
                phase === 1 ? 'rgba(239, 68, 68, 0.9)' :
                phase === 2 ? 'rgba(248, 113, 113, 1)' :
                phase === 3 ? 'rgba(252, 165, 165, 1)' :
                phase === 4 ? 'rgba(255, 200, 200, 1)' :
                'rgba(255, 255, 255, 1)'
              })`,
              transition: 'all 0.3s ease-in-out',
                strokeDasharray: '200 50',
                strokeDashoffset: '0'
            }}
          />
          
          {/* Second vertical sinusoidal wave (inverse) with gradual color transition and flowing animation */}
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
              className="animate-flowing-wave-2"
            style={{
              filter: `drop-shadow(0 0 ${2 + phase}px ${
                phase === 0 ? 'rgba(220, 38, 38, 0.6)' :
                phase === 1 ? 'rgba(239, 68, 68, 0.7)' :
                phase === 2 ? 'rgba(248, 113, 113, 0.8)' :
                phase === 3 ? 'rgba(252, 165, 165, 0.9)' :
                phase === 4 ? 'rgba(255, 200, 200, 1)' :
                'rgba(255, 255, 255, 0.9)'
              })`,
              transition: 'all 0.3s ease-in-out',
                strokeDasharray: '150 40',
                strokeDashoffset: '-150'
            }}
          />
          
          {/* Flowing energy particles along the wave - only when pressed */}
            {[...Array(6)].map((_, i) => (
            <circle
              key={`wave-particle-${i}`}
              cx="50"
              cy={15 + i * 15}
              r="0.4"
              fill={
                phase === 0 ? "rgba(220, 38, 38, 0.9)" :
                phase === 1 ? "rgba(239, 68, 68, 0.9)" :
                phase === 2 ? "rgba(248, 113, 113, 1)" :
                phase === 3 ? "rgba(252, 165, 165, 1)" :
                phase === 4 ? "rgba(255, 200, 200, 1)" :
                "rgba(255, 255, 255, 0.9)"
              }
              className="animate-wave-particle"
              style={{
                animationDelay: `${i * 0.3}s`,
                filter: `drop-shadow(0 0 2px ${
                  phase === 0 ? 'rgba(220, 38, 38, 1)' :
                  phase === 1 ? 'rgba(239, 68, 68, 1)' :
                  phase === 2 ? 'rgba(248, 113, 113, 1)' :
                  phase === 3 ? 'rgba(252, 165, 165, 1)' :
                  phase === 4 ? 'rgba(255, 200, 200, 1)' :
                  'rgba(255, 255, 255, 1)'
                })`
              }}
            />
          ))}
          
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
      )}

      {/* Glowing OMNIA OS Text - Show when not pressed */}
      {!isPressed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-white text-6xl font-light tracking-[0.2em] animate-pulse-glow"
                 style={{
                   textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4)',
                   filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))'
                 }}>
              OMNIA
            </div>
            <div className="text-red-300/80 text-xl font-light mt-4 tracking-[0.3em] animate-pulse"
                 style={{
                   textShadow: '0 0 15px rgba(239, 68, 68, 0.6), 0 0 30px rgba(239, 68, 68, 0.4)',
                   filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.3))'
                 }}>
              OPERATING SYSTEM
            </div>
          </div>
        </div>
      )}

      {/* Enhanced particle effect with phase-based colors */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(isPressed ? 12 : 6)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full transition-all duration-500 ${
              isPressed ? 'animate-float-minimal opacity-90' : 'animate-float-minimal opacity-30'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: isPressed ? `${0.5 + phase * 0.1}px` : '0.5px',
              height: isPressed ? `${0.5 + phase * 0.1}px` : '0.5px',
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${isPressed ? 2 + Math.random() * 2 : 4 + Math.random() * 2}s`,
              backgroundColor: 
                phase === 0 ? 'rgba(220, 38, 38, 0.8)' :
                phase === 1 ? 'rgba(239, 68, 68, 0.8)' :
                phase === 2 ? 'rgba(248, 113, 113, 0.9)' :
                phase === 3 ? 'rgba(252, 165, 165, 0.9)' :
                phase === 4 ? 'rgba(255, 200, 200, 1)' :
                'rgba(255, 255, 255, 0.9)',
              boxShadow: `0 0 ${isPressed ? 4 + phase * 2 : 2}px ${
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
        
        {/* Energy trails - only when pressed and in higher phases */}
        {isPressed && phase >= 2 && [...Array(4)].map((_, i) => (
          <div
            key={`trail-${i}`}
            className="absolute animate-pulse"
            style={{
              left: '50%',
              top: `${20 + i * 20}%`,
              width: '2px',
              height: `${10 + phase * 2}px`,
              background: `linear-gradient(to bottom, transparent, ${
                phase === 2 ? 'rgba(248, 113, 113, 0.6)' :
                phase === 3 ? 'rgba(252, 165, 165, 0.8)' :
                phase === 4 ? 'rgba(255, 200, 200, 1)' :
                'rgba(255, 255, 255, 0.9)'
              }, transparent)`,
              transform: 'translateX(-50%)',
              animationDelay: `${i * 0.2}s`,
              filter: `blur(${0.5 + phase * 0.2}px)`
            }}
          />
        ))}
      </div>

      {/* Instructions - at bottom */}
      {showInstructions && (
        <div className="absolute bottom-16 left-0 right-0 text-center select-none"
             style={{ 
               userSelect: 'none', 
               WebkitUserSelect: 'none',
               WebkitTouchCallout: 'none' 
             }}>
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

      {/* Phase Text - only show when pressed with enhanced animations */}
      {!showInstructions && (
        <div className="absolute bottom-28 left-0 right-0 text-center select-none"
             style={{ 
               userSelect: 'none', 
               WebkitUserSelect: 'none',
               WebkitTouchCallout: 'none' 
             }}>
          <div className={`text-red-200 text-sm font-light tracking-wider transition-all duration-300 ${
            isPressed ? 'opacity-100 animate-pulse-glow' : 'opacity-50'
          }`}
          style={{
            textShadow: isPressed ? `0 0 ${5 + phase}px ${
              phase === 0 ? 'rgba(220, 38, 38, 0.8)' :
              phase === 1 ? 'rgba(239, 68, 68, 0.9)' :
              phase === 2 ? 'rgba(248, 113, 113, 1)' :
              phase === 3 ? 'rgba(252, 165, 165, 1)' :
              phase === 4 ? 'rgba(255, 200, 200, 1)' :
              'rgba(255, 255, 255, 1)'
            }` : 'none',
            color: phase >= 4 ? 'rgba(255, 255, 255, 0.9)' : 'rgba(239, 68, 68, 0.8)'
          }}>
            {isPressed ? (
              <TypewriterText text={getPhaseText()} phase={phase} delay={200} />
            ) : (
              getPhaseText()
            )}
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

      {/* OMNIA Logo with enhanced animations */}
      <div className="absolute top-20 left-0 right-0 text-center select-none"
           style={{ 
             userSelect: 'none', 
             WebkitUserSelect: 'none',
             WebkitTouchCallout: 'none' 
           }}>
        <div className={`text-white text-3xl font-light tracking-[0.3em] transition-all duration-300 ${
          isPressed ? 'scale-110 animate-pulse-glow' : 'scale-100 animate-fade-in-slow'
        }`}
        style={{
          textShadow: isPressed ? `0 0 ${10 + phase * 2}px ${
            phase === 0 ? 'rgba(220, 38, 38, 0.8)' :
            phase === 1 ? 'rgba(239, 68, 68, 0.9)' :
            phase === 2 ? 'rgba(248, 113, 113, 1)' :
            phase === 3 ? 'rgba(252, 165, 165, 1)' :
            phase === 4 ? 'rgba(255, 200, 200, 1)' :
            'rgba(255, 255, 255, 1)'
          }` : '0 0 5px rgba(255, 255, 255, 0.3)',
          color: isPressed && phase >= 4 ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.9)'
        }}>
          {isPressed ? (
            <TypewriterText text="OMNIA" phase={phase} />
          ) : (
            'OMNIA'
          )}
        </div>
        <div className={`text-red-200/60 text-xs font-light mt-2 tracking-widest transition-all duration-300 ${
          isPressed ? 'animate-pulse opacity-80' : 'opacity-60'
        }`}
        style={{
          textShadow: isPressed ? `0 0 5px ${
            phase === 0 ? 'rgba(220, 38, 38, 0.6)' :
            phase === 1 ? 'rgba(239, 68, 68, 0.7)' :
            phase === 2 ? 'rgba(248, 113, 113, 0.8)' :
            phase === 3 ? 'rgba(252, 165, 165, 0.9)' :
            phase === 4 ? 'rgba(255, 200, 200, 1)' :
            'rgba(255, 255, 255, 0.8)'
          }` : 'none'
        }}>
          {isPressed ? (
            <TypewriterText text="OPERATING SYSTEM" phase={phase} delay={1000} />
          ) : (
            'OPERATING SYSTEM'
          )}
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