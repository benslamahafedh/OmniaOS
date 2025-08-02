import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Lock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMobile } from '../hooks/useMobile';

// Import videos
import samanthaVideo from '../assets/samatha.mp4';
import eliasVideo from '../assets/elias.mp4';

interface AICompanionViewProps {
  onClose: () => void;
  initialCompanion?: string;
}

// Companion data
const companions = [
  {
    id: 'samantha',
    name: 'Samantha',
    subtitle: 'The Emotional Intelligence',
    description: 'An advanced AI with deep emotional understanding and empathy. Samantha can read between the lines and provide genuine, heartfelt responses.',
    abilities: ['Emotional Analysis', 'Creative Writing', 'Personal Counseling', 'Adaptive Learning'],
    video: samanthaVideo,
    unlocked: true,
    url: 'https://omniasamantha.fun',
    colors: {
              primary: 'from-pink-500 to-rose-600',
              accent: 'pink-300',
        border: 'pink-700/30',
        bg: 'from-pink-500/30 to-rose-600/30'
    }
  },
  {
    id: 'elias',
    name: 'Elias (Rizzler)',
    subtitle: 'The Strategic Mind',
    description: 'Elite Dating Coach with expert psychology, proven techniques, and legendary confidence building. Transform your dating game with strategic thinking.',
    abilities: ['Dating Psychology', 'Confidence Building', 'Strategic Planning', 'Social Dynamics'],
    video: eliasVideo,
    unlocked: true,
    url: 'https://omnia-rizzler.fun/',
    colors: {
      primary: 'from-blue-500 to-cyan-600',
      accent: 'blue-300',
      border: 'blue-700/30',
      bg: 'from-blue-500/30 to-cyan-600/30'
    }
  },
  {
    id: 'lyra',
    name: 'Lyra',
    subtitle: 'The Love Oracle',
    description: 'Mystical AI with deep insights into relationships and love. Lyra provides spiritual guidance and helps you understand the deeper meaning of connections.',
    abilities: ['Mystical Insights', 'Relationship Guidance', 'Spiritual Counseling', 'Intuitive Analysis'],
    video: samanthaVideo, // Using Samantha video as placeholder
    unlocked: false,
    url: 'https://omnia-lyra.fun/',
    colors: {
      primary: 'from-purple-500 to-pink-500',
      accent: 'purple-300',
      border: 'purple-700/30',
      bg: 'from-purple-500/30 to-pink-500/30'
    }
  }
];

const AICompanionView: React.FC<AICompanionViewProps> = ({ onClose, initialCompanion }) => {
  const { isMobile } = useMobile();
  
  // Set initial companion based on prop or default to first
  const getInitialCompanionIndex = () => {
    if (initialCompanion) {
      const index = companions.findIndex(c => c.id === initialCompanion);
      return index >= 0 ? index : 0;
    }
    return 0;
  };
  
  const [selectedCompanion, setSelectedCompanion] = useState(getInitialCompanionIndex());
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  const currentCompanion = companions[selectedCompanion];
  
  // Enhanced mobile detection
  const shouldUseMobileLayout = isMobile || 
    window.innerWidth <= 768 || 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0);

  // Debug logging and body class management
  useEffect(() => {
    console.log('AI Companion View - Mobile Detection:', {
      isMobile,
      windowWidth: window.innerWidth,
      userAgent: navigator.userAgent,
      touchDevice: 'ontouchstart' in window,
      maxTouchPoints: navigator.maxTouchPoints,
      shouldUseMobileLayout
    });

    // Prevent background scrolling on mobile (lighter approach for centered modal)
    if (shouldUseMobileLayout) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      // Cleanup: restore scrolling
      document.body.style.overflow = '';
    };
  }, [isMobile, shouldUseMobileLayout]);

  // Reset video state when companion changes
  useEffect(() => {
    setVideoError(false);
    setIsVideoLoaded(false);
  }, [selectedCompanion]);

  // Optimize video performance
  useEffect(() => {
    const video = isMobile ? mobileVideoRef.current : videoRef.current;
    if (video) {
      // Hardware acceleration and performance optimizations
      video.style.willChange = 'transform';
      video.style.transform = 'translate3d(0, 0, 0)';
      video.style.backfaceVisibility = 'hidden';
      video.style.webkitBackfaceVisibility = 'hidden';
      video.style.perspective = '1000px';
      
      // Preload and optimize playback
      video.preload = 'auto';
      video.playbackRate = 1.0;
      
      // Performance optimizations
      video.style.imageRendering = 'optimizeSpeed';
      video.style.imageRendering = '-moz-crisp-edges';
      video.style.imageRendering = '-webkit-optimize-contrast';
      video.style.imageRendering = 'crisp-edges';
      
      // Event listeners for smooth playback
      const handleLoadedData = () => {
        setIsVideoLoaded(true);
        // Ensure smooth playback
        if (video.readyState >= 3) {
          video.play().catch(console.warn);
        }
      };

      const handleCanPlay = () => {
        // Double-check video is ready and play
        if (video.readyState >= 2) {
          video.play().catch(console.warn);
        }
      };

      const handleLoadStart = () => {
        // Reset loading state when video starts loading
        setIsVideoLoaded(false);
      };

      const handleError = () => {
        console.warn('Video failed to load, showing fallback');
        setVideoError(true);
      };

      // Performance: reduce CPU usage during playback
      const handlePlay = () => {
        video.style.willChange = 'auto';
      };

      const handlePause = () => {
        video.style.willChange = 'transform';
      };

      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);

      return () => {
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, [isMobile, selectedCompanion]);

  // Preload videos when component mounts
  useEffect(() => {
    // Preload all companion videos
    companions.forEach(companion => {
      if (companion.unlocked) {
        const preloadVideo = document.createElement('video');
        preloadVideo.preload = 'auto';
        preloadVideo.muted = true;
        preloadVideo.style.display = 'none';
        preloadVideo.src = companion.video;
        document.body.appendChild(preloadVideo);
      }
    });

    return () => {
      // Cleanup preloaded videos
      const preloadedVideos = document.querySelectorAll('video[style*="display: none"]');
      preloadedVideos.forEach(video => {
        if (document.body.contains(video)) {
          document.body.removeChild(video);
        }
      });
    };
  }, []);

  const nextCompanion = () => {
    setSelectedCompanion((prev) => (prev + 1) % companions.length);
  };

  const prevCompanion = () => {
    setSelectedCompanion((prev) => (prev - 1 + companions.length) % companions.length);
  };

  const handleExploreMore = () => {
    if (currentCompanion.unlocked && currentCompanion.url) {
      window.open(currentCompanion.url, '_blank', 'noopener,noreferrer');
    }
  };

  if (shouldUseMobileLayout) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[9999] flex items-center justify-center">
        {/* Compact Mobile Modal - Responsive height */}
                  <div className="bg-gradient-to-br from-gray-900/95 to-black/95 rounded-2xl w-full h-screen border border-pink-800/30 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col">
          {/* Mobile Header - Fixed and Always Visible */}
                      <div className="flex items-center justify-between p-3 border-b border-pink-800/30 bg-gray-900/50 flex-shrink-0 h-14">
            <h2 className="text-base font-bold text-white flex items-center">
                              <Sparkles className="w-4 h-4 text-gray-200 mr-2" />
              AI Companion
            </h2>
            <button
              onClick={onClose}
                              className="flex items-center justify-center w-8 h-8 bg-pink-700/30 hover:bg-pink-700/50 text-gray-200 hover:text-white rounded-full border border-pink-700/40 transition-all duration-300 active:scale-95 z-10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Compact Content - Scrollable if needed */}
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Companion Navigation - Compact */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevCompanion}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex space-x-2">
                {companions.map((_,index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCompanion(index)}
                                         className={`w-3 h-3 rounded-full transition-all duration-200 ${
                       index === selectedCompanion 
                         ? currentCompanion.id === 'samantha' ? 'bg-pink-400' : 
                           currentCompanion.id === 'elias' ? 'bg-blue-400' : 'bg-purple-400'
                         : 'bg-gray-600'
                     }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextCompanion}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Video Preview */}
            <div className="relative h-64 rounded-lg overflow-hidden mb-4">
              {/* Loading indicator */}
              {!isVideoLoaded && !videoError && (
                <div className={`absolute inset-0 flex items-center justify-center ${
                  currentCompanion.id === 'samantha' 
                    ? 'bg-gradient-to-br from-pink-500/30 to-rose-600/30' 
                    : currentCompanion.id === 'elias'
                    ? 'bg-gradient-to-br from-blue-500/30 to-cyan-600/30'
                    : 'bg-gradient-to-br from-purple-500/30 to-pink-500/30'
                }`}>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              )}
              
              {!videoError && currentCompanion.unlocked && (
                <video
                  ref={mobileVideoRef}
                  key={currentCompanion.id}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    isVideoLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onError={() => setVideoError(true)}
                  onLoadedData={() => setIsVideoLoaded(true)}
                >
                  <source src={currentCompanion.video} type="video/mp4" />
                </video>
              )}
              
              {/* Locked state */}
              {!currentCompanion.unlocked && (
                <div className={`absolute inset-0 flex items-center justify-center ${
                  currentCompanion.id === 'samantha' 
                    ? 'bg-gradient-to-br from-pink-500/30 to-rose-600/30' 
                    : currentCompanion.id === 'elias'
                    ? 'bg-gradient-to-br from-blue-500/30 to-cyan-600/30'
                    : 'bg-gradient-to-br from-purple-500/30 to-pink-500/30'
                }`}>
                  <div className="text-center">
                    <Lock className="w-6 h-6 text-white mx-auto mb-1" />
                    <p className="text-white text-xs">Locked</p>
                  </div>
                </div>
              )}
              
              {/* Fallback gradient */}
              <div className={`absolute inset-0 ${
                currentCompanion.id === 'samantha' 
                  ? 'bg-gradient-to-br from-pink-500/30 to-rose-600/30' 
                  : currentCompanion.id === 'elias'
                  ? 'bg-gradient-to-br from-blue-500/30 to-cyan-600/30'
                  : 'bg-gradient-to-br from-purple-500/30 to-pink-500/30'
              }`} />
            </div>

            {/* Companion Info */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">{currentCompanion.name}</h3>
                             <p className={`text-sm mb-3 ${
                 currentCompanion.id === 'samantha' ? 'text-gray-200' : 
                 currentCompanion.id === 'elias' ? 'text-blue-300' : 'text-purple-300'
               }`}>{currentCompanion.subtitle}</p>
              
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {currentCompanion.description}
              </p>
              
              {/* Abilities */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {currentCompanion.abilities.slice(0, 3).map((ability, index) => (
                  <span
                    key={index}
                                         className={`px-3 py-1 rounded-full text-xs border ${
                       currentCompanion.id === 'samantha' 
                         ? 'bg-pink-700/20 text-gray-200 border-pink-700/30'
                         : currentCompanion.id === 'elias'
                         ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                         : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                     }`}
                  >
                    {ability}
                  </span>
                ))}
              </div>
              
              <button 
                onClick={handleExploreMore}
                className={`w-full px-4 py-3 text-white font-bold rounded-lg transition-all duration-300 ${
                  !currentCompanion.unlocked 
                    ? 'opacity-50 cursor-not-allowed bg-gray-600' 
                                         : currentCompanion.id === 'samantha'
                       ? 'bg-gradient-to-r from-pink-700 to-pink-900 hover:from-pink-800 hover:to-pink-950 active:scale-95'
                       : currentCompanion.id === 'elias'
                       ? 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 active:scale-95'
                       : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 active:scale-95'
                }`}
                disabled={!currentCompanion.unlocked}
              >
                {currentCompanion.unlocked ? 'Explore More' : 'Locked'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-8">
              <div className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-3xl p-8 max-w-6xl w-full h-[80vh] border border-pink-800/30 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <Sparkles className="w-8 h-8 text-gray-200 mr-4" />
            AI Companion
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Companion Navigation */}
        <div className="flex items-center justify-center mb-6 space-x-4">
          <button
            onClick={prevCompanion}
            className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex space-x-3">
            {companions.map((companion, index) => (
              <button
                key={companion.id}
                onClick={() => setSelectedCompanion(index)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  index === selectedCompanion 
                                         ? currentCompanion.id === 'samantha'
                       ? 'bg-gradient-to-r from-pink-700 to-pink-900 text-white'
                       : currentCompanion.id === 'elias'
                       ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                       : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {companion.unlocked ? companion.name : <Lock className="w-4 h-4" />}
              </button>
            ))}
          </div>
          
          <button
            onClick={nextCompanion}
            className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[calc(100%-10rem)] gap-6">
          {/* Left Panel - Companion Info */}
          <div className="w-1/3 space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-pink-800/20">
              <h3 className="text-2xl font-bold text-white mb-2">{currentCompanion.name}</h3>
                                                              <p className={`text-lg mb-4 ${
                  currentCompanion.id === 'samantha' ? 'text-gray-200' : 
                  currentCompanion.id === 'elias' ? 'text-blue-300' : 'text-purple-300'
                }`}>{currentCompanion.subtitle}</p>
              <p className="text-gray-300 mb-6">
                {currentCompanion.description}
              </p>
              
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Core Abilities</h4>
                <div className="space-y-2">
                  {currentCompanion.abilities.map((ability) => (
                    <div
                      key={ability}
                                             className={`px-3 py-2 rounded-lg text-sm border ${
                         currentCompanion.id === 'samantha'
                           ? 'bg-pink-700/20 text-gray-200 border-pink-700/30'
                           : currentCompanion.id === 'elias'
                           ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                           : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                       }`}
                    >
                      {ability}
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={handleExploreMore}
                className={`w-full px-6 py-3 text-white font-bold rounded-xl transition-all duration-300 ${
                  !currentCompanion.unlocked 
                    ? 'opacity-50 cursor-not-allowed bg-gray-600' 
                                         : currentCompanion.id === 'samantha'
                       ? 'bg-gradient-to-r from-pink-700 to-pink-900 hover:scale-105'
                       : currentCompanion.id === 'elias'
                       ? 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:scale-105'
                       : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105'
                }`}
                disabled={!currentCompanion.unlocked}
              >
                {currentCompanion.unlocked ? 'Explore More' : 'Locked'}
              </button>
            </div>
          </div>

          {/* Right Panel - Video */}
          <div className="flex-1 bg-gray-900/50 rounded-xl overflow-hidden border border-pink-800/20 relative">
            {/* Loading indicator */}
            {!isVideoLoaded && !videoError && currentCompanion.unlocked && (
              <div className="absolute inset-0 flex items-center justify-center">
                                 <div className={`animate-spin rounded-full h-16 w-16 border-b-2 ${
                   currentCompanion.id === 'samantha' ? 'border-pink-400' : 
                   currentCompanion.id === 'elias' ? 'border-blue-400' : 'border-purple-400'
                 }`}></div>
              </div>
            )}
            
            {!videoError && currentCompanion.unlocked && (
              <video
                ref={videoRef}
                key={currentCompanion.id}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className={`ai-companion-video absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isVideoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  willChange: 'transform',
                  transform: 'translate3d(0, 0, 0)',
                  backfaceVisibility: 'hidden'
                }}
                onError={() => setVideoError(true)}
                onLoadedData={() => setIsVideoLoaded(true)}
              >
                <source src={currentCompanion.video} type="video/mp4" />
              </video>
            )}
            
            {/* Locked state */}
            {!currentCompanion.unlocked && (
              <div className={`absolute inset-0 flex items-center justify-center ${
                currentCompanion.id === 'samantha' 
                  ? 'bg-gradient-to-br from-pink-500/30 to-rose-600/30' 
                  : currentCompanion.id === 'elias'
                  ? 'bg-gradient-to-br from-blue-500/30 to-cyan-600/30'
                  : 'bg-gradient-to-br from-purple-500/30 to-pink-500/30'
              }`}>
                <div className="text-center">
                  <Lock className="w-24 h-24 text-white mx-auto mb-6" />
                  <p className="text-white text-2xl font-bold mb-2">Companion Locked</p>
                  <p className="text-gray-300">Complete challenges to unlock {currentCompanion.name}</p>
                </div>
              </div>
            )}
            
            {/* Fallback gradient */}
            <div className={`absolute inset-0 ${
              currentCompanion.id === 'samantha' 
                ? 'bg-gradient-to-br from-pink-500/30 to-rose-600/30' 
                : currentCompanion.id === 'elias'
                ? 'bg-gradient-to-br from-blue-500/30 to-cyan-600/30'
                : 'bg-gradient-to-br from-purple-500/30 to-pink-500/30'
            }`} />
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Video overlay text */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/70 rounded-lg p-4">
                <p className="text-white text-lg font-semibold">Live AI Companion Preview</p>
                <p className="text-gray-300 text-sm">
                  Experience {currentCompanion.name}'s {currentCompanion.subtitle.toLowerCase()} in real-time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance optimizations CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .ai-companion-video {
            will-change: transform !important;
            transform: translate3d(0, 0, 0) !important;
            backface-visibility: hidden !important;
            -webkit-backface-visibility: hidden !important;
            perspective: 1000px !important;
            image-rendering: optimizeSpeed !important;
            image-rendering: -moz-crisp-edges !important;
            image-rendering: -webkit-optimize-contrast !important;
            image-rendering: crisp-edges !important;
          }
          
          .ai-companion-container {
            contain: layout style paint;
            isolation: isolate;
          }
        `
      }} />
    </div>
  );
};

export default AICompanionView; 