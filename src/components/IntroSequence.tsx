import React, { useState, useEffect, useRef } from 'react';

interface IntroSequenceProps {
  onComplete: () => void;
}

const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [bootPhase, setBootPhase] = useState(0);
  const [debugInfo, setDebugInfo] = useState('Starting...');
  const [isCompleted, setIsCompleted] = useState(false);
  const isCompletedRef = useRef(false);

  // Handle completion in a separate useEffect
  useEffect(() => {
    if (isCompleted && !isCompletedRef.current) {
      console.log('IntroSequence: Completion detected, calling onComplete');
      isCompletedRef.current = true;
      setDebugInfo('Calling onComplete via useEffect');
      
      setTimeout(() => {
        try {
          console.log('IntroSequence: Executing onComplete callback');
          onComplete();
          console.log('IntroSequence: onComplete executed successfully');
          setDebugInfo('onComplete executed successfully');
        } catch (error) {
          console.error('IntroSequence: Error in onComplete:', error);
          setDebugInfo('ERROR: onComplete failed');
        }
      }, 100);
    }
  }, [isCompleted, onComplete]);

  useEffect(() => {
    console.log('IntroSequence: Component mounted, starting boot sequence');
    setDebugInfo('Component mounted');
    
    const totalDuration = 6000; // 6 seconds
    let startTime: number;
    let animationFrameId: number;
    let frameCount = 0;
    
    // Progress animation function
    const updateProgress = (timestamp: number) => {
      frameCount++;
      
      if (!startTime) {
        startTime = timestamp;
        console.log('IntroSequence: Progress animation started at timestamp:', timestamp);
        setDebugInfo('Animation started');
      }
      
      const elapsed = timestamp - startTime;
      const progress = Math.min((elapsed / totalDuration) * 100, 100);
      
      // Log every 10 frames to avoid spam
      if (frameCount % 10 === 0) {
        console.log(`IntroSequence: Frame ${frameCount}, Elapsed: ${elapsed}ms, Progress: ${progress.toFixed(1)}%`);
        setDebugInfo(`Frame ${frameCount}, Progress: ${progress.toFixed(1)}%`);
      }
      
      setCurrentProgress(progress);

      // Update boot phase based on progress
      if (progress >= 80) setBootPhase(3);
      else if (progress >= 60) setBootPhase(2);
      else if (progress >= 30) setBootPhase(1);
      else setBootPhase(0);

      if (progress >= 100) {
        console.log('IntroSequence: Progress reached 100%, setting completion flag');
        setDebugInfo('Progress 100% - setting completion flag');
        setIsCompleted(true);
        return; // Stop the animation loop
      } else {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    // Start the progress animation
    console.log('IntroSequence: Starting requestAnimationFrame');
    animationFrameId = requestAnimationFrame(updateProgress);

    // Cleanup function
    return () => {
      console.log('IntroSequence: Cleanup called');
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const getPhaseText = () => {
    switch (bootPhase) {
      case 0: return 'INITIALIZING CORE SYSTEMS';
      case 1: return 'LOADING ESSENTIAL SERVICES';
      case 2: return 'ESTABLISHING CONNECTIONS';
      case 3: return 'SYSTEM READY';
      default: return 'STARTING SYSTEM';
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-red-950/10 to-black z-50 overflow-hidden">
      {/* Subtle red ambient glow */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(ellipse at center, rgba(220, 38, 38, 0.3) 0%, transparent 70%)`
        }}
      />

      {/* Portrait Sinusoidal Wave Animation - Vertical */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          {/* Multiple flowing sine waves for continuous effect */}
          {[...Array(3)].map((_, i) => (
            <g key={`wave-group-${i}`}>
              {/* Primary flowing wave */}
              <path
                d="M50,0 Q30,12.5 50,25 Q70,37.5 50,50 Q30,62.5 50,75 Q70,87.5 50,100"
                fill="none"
                stroke={`rgba(239, 68, 68, ${0.6 - i * 0.1})`}
                strokeWidth={0.4 - i * 0.1}
                className="animate-flowing-wave-1"
                style={{
                  filter: `drop-shadow(0 0 ${3 - i}px rgba(239, 68, 68, ${0.8 - i * 0.1}))`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
              
              {/* Secondary flowing wave (inverse) */}
              <path
                d="M50,0 Q70,12.5 50,25 Q30,37.5 50,50 Q70,62.5 50,75 Q30,87.5 50,100"
                fill="none"
                stroke={`rgba(239, 68, 68, ${0.4 - i * 0.08})`}
                strokeWidth={0.3 - i * 0.08}
                className="animate-flowing-wave-2"
                style={{
                  filter: `drop-shadow(0 0 ${2 - i}px rgba(239, 68, 68, ${0.6 - i * 0.1}))`,
                  animationDelay: `${i * 0.7}s`
                }}
              />
            </g>
          ))}
          
          {/* Flowing energy particles along the wave */}
          {[...Array(5)].map((_, i) => (
            <circle
              key={`particle-${i}`}
              cx="50"
              cy={20 + i * 20}
              r="0.5"
              fill="rgba(255, 255, 255, 0.8)"
              className="animate-wave-particle"
              style={{
                animationDelay: `${i * 0.4}s`,
                filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.9))'
              }}
            />
          ))}
        </svg>
      </div>

      <div className="h-full flex items-center justify-center">
        {/* Simplified Terminal Display */}
        <div className="w-full max-w-2xl mx-8">
          <div className="bg-black/60 backdrop-blur-sm border border-red-900/30 rounded-lg p-8">
            
            {/* Terminal Header */}
            <div className="flex items-center mb-6 pb-3 border-b border-red-900/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-red-400/60"></div>
                <div className="w-3 h-3 rounded-full bg-red-300/40"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-red-200/80 text-sm font-mono">OMNIA System Boot</span>
              </div>
            </div>

            {/* Boot Messages - Simple static display */}
            <div className="space-y-2 font-mono text-sm mb-6">
              <div className="text-red-300/70">
                <span className="text-red-400/60 mr-2">&gt;</span>
                OMNIA OS v2.0 - Initializing Core Systems...
              </div>
              <div className="text-red-300/70">
                <span className="text-red-400/60 mr-2">&gt;</span>
                Loading neural pathways...
              </div>
              <div className="text-red-300/70">
                <span className="text-red-400/60 mr-2">&gt;</span>
                Establishing network protocols...
              </div>
              <div className="text-red-200 animate-pulse">
                <span className="text-red-400/60 mr-2">&gt;</span>
                System initializing...
              </div>
            </div>

            {/* Progress Bar with Live Updates - LARGE AND VISIBLE */}
            <div className="border-t border-red-900/20 pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-red-200/80 text-base font-mono">Boot Progress</span>
                <span className="text-red-200/80 text-base font-mono bg-red-500/20 px-2 py-1 rounded">
                  {Math.round(currentProgress)}%
                </span>
              </div>
              
              {/* Large, highly visible progress bar */}
              <div className="w-full h-4 bg-red-950/60 rounded-full overflow-hidden border border-red-700/30">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 via-red-400 to-red-300 transition-all duration-100 rounded-full relative overflow-hidden"
                  style={{ width: `${currentProgress}%` }}
                >
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              </div>
              
              {/* Additional visual progress indicator */}
              <div className="mt-2 text-center">
                <div className="inline-flex space-x-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        i < Math.floor(currentProgress / 10) 
                          ? 'bg-red-400 animate-pulse' 
                          : 'bg-red-900/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* OMNIA Branding */}
          <div className="mt-8 text-center">
            <div className="text-white text-3xl font-light tracking-[0.4em] mb-2">
              OMNIA
            </div>
            <div className="text-red-200/60 text-sm font-light tracking-widest">
              OPERATING SYSTEM v2.0
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <div className={`text-lg font-light tracking-wider transition-all duration-300 ${
          bootPhase === 0 ? 'text-red-400/60' :
          bootPhase === 1 ? 'text-red-300/70' :
          bootPhase === 2 ? 'text-red-200/80' :
          'text-white animate-pulse'
        }`}>
          {getPhaseText()}
        </div>
      </div>
    </div>
  );
};

export default IntroSequence; 