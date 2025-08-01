import React from 'react';

interface OmniaLogoProps {
  size?: number;
  className?: string;
}

const OmniaLogo: React.FC<OmniaLogoProps> = ({ size = 32, className = '' }) => {
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <img 
        src="/omnia-logo.png" 
        alt="Omnia Logo" 
        className="w-full h-full object-contain"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default OmniaLogo; 