import React from 'react';
import logo from '../assets/image.png';
interface OS1LogoProps {
  size?: number;
  className?: string;
}

const OS1Logo: React.FC<OS1LogoProps> = ({ size = 32, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src={logo}
        alt="OS1 Logo"
        style={{ width: size, height: size }}
      />
      <span className="leading-none">0xos1</span>
    </div>
  );
};

export default OS1Logo; 