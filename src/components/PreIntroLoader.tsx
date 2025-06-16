import React, { useState, useEffect } from 'react';
import ImageLoader from './ImageLoader';

// Import the GIF
import loadingGif from '../assets/bcf67b6246b68b1f43a98b219fabe105.gif';

interface PreIntroLoaderProps {
  onComplete: () => void;
}

const PreIntroLoader: React.FC<PreIntroLoaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show loader for 6 seconds (3 images * 0.4s = 1.2s per cycle, so 5 complete cycles)
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 6000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100]">
      {/* Main loading content container */}
      <div className="flex flex-row items-center justify-center space-y-8">
        
        {/* Image sequence loader */}
        

        {/* GIF Section - Simple, no effects */}
        
        
                 <div className="w-96 h-96 flex items-center justify-center">
           <ImageLoader className="w-full h-full object-contain" style={{
           }} />
         </div>
        {/* <div className="w-96 h-96 flex items-center justify-center">
          <img 
            src={loadingGif} 
            alt="Loading animation"
            className="w-full h-full object-contain"
          />
        </div> */}
        
        
      </div>

      {/* Enhanced ambient background effects with darker red tones */}
      <div className="absolute inset-0 bg-gradient-radial from-red-900/15 via-red-950/5 to-transparent"></div>
      <div className="absolute top-1/3 left-1/5 w-40 h-40 bg-red-800/8 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/5 w-32 h-32 bg-red-900/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-red-700/5 rounded-full blur-xl animate-pulse delay-500"></div>
    </div>
  );
};

export default PreIntroLoader; 