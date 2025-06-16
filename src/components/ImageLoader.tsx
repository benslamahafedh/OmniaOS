import React, { useState, useEffect } from 'react';

// Import the images
import image1 from '../assets/1.png';
import image2 from '../assets/2.png';
import image3 from '../assets/3.png';

interface ImageLoaderProps {
  className?: string;
  style?: React.CSSProperties;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ className = '', style }) => {
  const images = [image1, image2, image3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 400); // Change image every 0.4 seconds

    return () => {
      clearInterval(imageInterval);
    };
  }, [images.length]);

  return (
    <div className={`image-loader ${className}`} style={style}>
      <img 
        src={images[currentImageIndex]} 
        alt={`Loading image ${currentImageIndex + 1}`}
        className="w-full h-full object-contain transition-opacity duration-100"
        key={currentImageIndex} // Force re-render for smooth transitions
      />
    </div>
  );
};

export default ImageLoader; 