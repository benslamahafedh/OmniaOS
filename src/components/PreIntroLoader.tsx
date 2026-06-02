import React, { useState, useEffect, useRef } from "react";

interface PreIntroLoaderProps {
  onComplete: () => void;
}

// interface TypewriterTextProps {
//   text: string;
//   phase: number;
//   delay?: number;
// }

// const TypewriterText: React.FC<TypewriterTextProps> = ({
//   text,
//   phase,
//   delay = 0,
// }) => {
//   const [displayText, setDisplayText] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [startTyping, setStartTyping] = useState(false);

//   // Reset typewriter when text changes
//   useEffect(() => {
//     setDisplayText("");
//     setCurrentIndex(0);
//     setStartTyping(false);
//   }, [text]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setStartTyping(true);
//     }, delay);

//     return () => clearTimeout(timer);
//   }, [delay, text]);

//   useEffect(() => {
//     if (!startTyping) return;

//     if (currentIndex < text.length) {
//       const timer = setTimeout(
//         () => {
//           setDisplayText((prev) => prev + text[currentIndex]);
//           setCurrentIndex((prev) => prev + 1);
//         },
//         100 + Math.random() * 100,
//       );

//       return () => clearTimeout(timer);
//     }
//   }, [currentIndex, text, startTyping]);

//   const glitchedText = displayText;

//   return (
//     <span className="inline-block">
//       {glitchedText}
//       {currentIndex < text.length && startTyping && (
//         <span
//           className={`animate-pulse ${phase >= 4 ? "text-white" : "text-orange-400"}`}
//         >
//           |
//         </span>
//       )}
//     </span>
//   );
// };
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

  useEffect(() => {
    if (!isPressed) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
      startTimeRef.current = undefined;
      isAnimatingRef.current = false;

      if (progress < 100 && progress > 0) {
        const resetInterval = setInterval(() => {
          setProgress((prev) => {
            const newProgress = Math.max(0, prev - 8);
            if (newProgress <= 0) {
              clearInterval(resetInterval);
              setPhase(0);
              setShowInstructions(true);
            } else {
              if (newProgress >= 90) setPhase(5);
              else if (newProgress >= 75) setPhase(4);
              else if (newProgress >= 60) setPhase(3);
              else if (newProgress >= 40) setPhase(2);
              else if (newProgress >= 20) setPhase(1);
              else setPhase(0);
            }
            return newProgress;
          });
        }, 30);

        return () => clearInterval(resetInterval);
      }
      return;
    }

    if (showInstructions) {
      setShowInstructions(false);
    }

    if (!isAnimatingRef.current) {
      console.log("PreIntroLoader: Starting press-and-hold animation");
      isAnimatingRef.current = true;

      const duration = 3000;

      const animate = (timestamp: number) => {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp;
          console.log("PreIntroLoader: Animation started at timestamp:", timestamp);
        }

        if (!isPressedRef.current) {
          console.log("PreIntroLoader: User released, stopping animation");
          isAnimatingRef.current = false;
          return;
        }

        const elapsed = timestamp - startTimeRef.current;
        const newProgress = Math.min((elapsed / duration) * 100, 100);

        console.log(`PreIntroLoader: Progress ${newProgress.toFixed(1)}%, elapsed: ${elapsed}ms`);
        setProgress(newProgress);

        if (newProgress >= 90) setPhase(5);
        else if (newProgress >= 75) setPhase(4);
        else if (newProgress >= 60) setPhase(3);
        else if (newProgress >= 40) setPhase(2);
        else if (newProgress >= 20) setPhase(1);
        else setPhase(0);

        if (newProgress >= 100) {
          console.log("PreIntroLoader: Completed via press-and-hold");
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

  const handleMouseDown = () => {
    console.log("PreIntroLoader: Mouse down detected");
    setIsPressed(true);
    isPressedRef.current = true;
  };

  const handleMouseUp = () => {
    console.log("PreIntroLoader: Mouse up detected");
    setIsPressed(false);
    isPressedRef.current = false;
  };

  const handleMouseLeave = () => {
    console.log("PreIntroLoader: Mouse leave detected");
    setIsPressed(false);
    isPressedRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    console.log("PreIntroLoader: Touch start detected");
    setIsPressed(true);
    isPressedRef.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    console.log("PreIntroLoader: Touch end detected");
    setIsPressed(false);
    isPressedRef.current = false;
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      console.log("PreIntroLoader: Global mouse up detected");
      setIsPressed(false);
      isPressedRef.current = false;
    };

    const handleGlobalTouchEnd = () => {
      console.log("PreIntroLoader: Global touch end detected");
      setIsPressed(false);
      isPressedRef.current = false;
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("touchend", handleGlobalTouchEnd);
    document.addEventListener("touchcancel", handleGlobalTouchEnd);

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchend", handleGlobalTouchEnd);
      document.removeEventListener("touchcancel", handleGlobalTouchEnd);
    };
  }, []);

  // const getPhaseText = () => {
  //   switch (phase) {
  //     case 0:
  //       return "INITIALIZING CORE";
  //     case 1:
  //       return "ESTABLISHING NETWORK";
  //     case 2:
  //       return "SYNCHRONIZING DATA";
  //     case 3:
  //       return "ACTIVATING SYSTEMS";
  //     case 4:
  //       return "NEURAL PATHWAYS ONLINE";
  //     case 5:
  //       return "LAUNCHING OS1";
  //     default:
  //       return "STARTING SYSTEM";
  //   }
  // };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"} cursor-pointer select-none`}
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        WebkitTouchCallout: "none",
        WebkitTapHighlightColor: "transparent",
        touchAction: "none",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
      onDragStart={(e: React.DragEvent) => e.preventDefault()}
    >
      {/* Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-orange-950/20 to-black">
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: `#f74e25`,
          }}
        />
      </div>

      {/* Waves - Only show when pressed */}
      {isPressed && (
        <div className="absolute inset-0">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full origin-center"
            preserveAspectRatio="none"
          >
            {[...Array(3)].map((_, i) => (
              <g key={`wave-group-${i}`}>
                <path
                  d="M0,50 Q12.5,30 25,50 Q37.5,70 50,50 Q62.5,30 75,50 Q87.5,70 100,50"
                  fill="none"
                  stroke={`rgba(255, 255, 255, ${0.6 - i * 0.1})`}
                  strokeWidth={0.4 - i * 0.1}
                  className="animate-flowing-wave-1"
                  style={{
                    filter: `drop-shadow(0 0 ${3 - i}px rgba(255, 255, 255, ${0.8 - i * 0.1}))`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
                <path
                  d="M0,50 Q12.5,70 25,50 Q37.5,30 50,50 Q62.5,70 75,50 Q87.5,30 100,50"
                  fill="none"
                  stroke={`rgba(255, 255, 255, ${0.4 - i * 0.08})`}
                  strokeWidth={0.3 - i * 0.08}
                  className="animate-flowing-wave-2"
                  style={{
                    filter: `drop-shadow(0 0 ${2 - i}px rgba(255, 255, 255, ${0.6 - i * 0.1}))`,
                    animationDelay: `${i * 0.7}s`,
                  }}
                />
              </g>
            ))}

            {[...Array(5)].map((_, i) => (
              <circle
                key={`particle-${i}`}
                cx={20 + i * 20}
                cy="50"
                r="0.5"
                fill="rgba(255, 255, 255, 0.8)"
                className="animate-wave-particle"
                style={{
                  animationDelay: `${i * 0.4}s`,
                  filter: "drop-shadow(0 0 2px rgba(255, 255, 255, 0.9))",
                }}
              />
            ))}
          </svg>
        </div>
      )}

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(isPressed ? 12 : 6)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full transition-all duration-500 ${isPressed ? "animate-float-minimal opacity-90" : "animate-float-minimal opacity-30"}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: isPressed ? `${0.5 + phase * 0.1}px` : "0.5px",
              height: isPressed ? `${0.5 + phase * 0.1}px` : "0.5px",
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${isPressed ? 2 + Math.random() * 2 : 4 + Math.random() * 2}s`,
              backgroundColor:
                phase === 0
                  ? "rgba(220, 38, 38, 0.8)"
                  : phase === 1
                    ? "rgba(239, 68, 68, 0.8)"
                    : phase === 2
                      ? "rgba(248, 113, 113, 0.9)"
                      : phase === 3
                        ? "rgba(252, 165, 165, 0.9)"
                        : phase === 4
                          ? "rgba(255, 200, 200, 1)"
                          : "rgba(255, 255, 255, 0.9)",
              boxShadow: `0 0 ${isPressed ? 4 + phase * 2 : 2}px ${phase === 0 ? "rgba(220, 38, 38, 0.6)" : phase === 1 ? "rgba(239, 68, 68, 0.7)" : phase === 2 ? "rgba(248, 113, 113, 0.8)" : phase === 3 ? "rgba(252, 165, 165, 0.9)" : phase === 4 ? "rgba(255, 200, 200, 1)" : "rgba(255, 255, 255, 1)"}`,
            }}
          />
        ))}

        {isPressed &&
          phase >= 2 &&
          [...Array(4)].map((_, i) => (
            <div
              key={`trail-${i}`}
              className="absolute animate-pulse"
              style={{
                left: "50%",
                top: `${20 + i * 20}%`,
                width: "2px",
                height: `${10 + phase * 2}px`,
                background: `linear-gradient(to bottom, transparent, ${phase === 2 ? "rgba(248, 113, 113, 0.6)" : phase === 3 ? "rgba(252, 165, 165, 0.8)" : phase === 4 ? "rgba(255, 200, 200, 1)" : "rgba(255, 255, 255, 0.9)"}, transparent)`,
                transform: "translateX(-50%)",
                animationDelay: `${i * 0.2}s`,
                filter: `blur(${0.5 + phase * 0.2}px)`,
              }}
            />
          ))}
      </div>

      {/* Instructions */}
      {showInstructions && (
        <div
          className="absolute bottom-16 left-0 right-0 text-center select-none"
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            WebkitTouchCallout: "none",
          }}
        >
          <div className="animate-pulse">
            <div className="text-white text-lg font-light tracking-wider mb-2">
              Press and Hold to Initialize
            </div>
            <div className="text-orange-300/70 text-sm font-light tracking-wide">
              Hold down to activate OS1
            </div>
          </div>
        </div>
      )}

      {/* Phase Text */}
      {!showInstructions && (
        <div
          className="absolute bottom-28 left-0 right-0 text-center select-none"
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            WebkitTouchCallout: "none",
          }}
        >
          <div
            className={`text-orange-200 text-sm font-light tracking-wider transition-all duration-300 ${isPressed ? "opacity-100 animate-pulse-glow" : "opacity-50"}`}
            style={{
              textShadow: isPressed ? `0 0 ${5 + phase}px rgba(255, 255, 255, 1)` : "none",
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            {/* {isPressed ? (
              <TypewriterText text={getPhaseText()} phase={phase} delay={200} />
            ) : (
              getPhaseText()
            )} */}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {!showInstructions && (
        <div className="absolute bottom-16 left-0 right-0 px-20">
          <div className="w-full h-px bg-orange-900/40 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-100 rounded-full bg-gradient-to-r from-white to-white"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center mt-4">
            <span className="text-white text-xs font-light">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      )}

      {/* Press feedback overlay */}
      {isPressed && (
        <div className="absolute inset-0 bg-orange-500/5 animate-pulse pointer-events-none" />
      )}
    </div>
  );
};

export default PreIntroLoader;