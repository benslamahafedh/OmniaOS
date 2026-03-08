import React from 'react';
import logo from '../assets/image.png';
interface OS1LogoProps {
  size?: number;
  className?: string;
}

const OS1Logo: React.FC<OS1LogoProps> = ({ size = 32, className = '' }) => {
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <img 
        src={logo} 
        alt="OS1 Logo" 
        className="w-full h-full object-contain"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default OS1Logo; 