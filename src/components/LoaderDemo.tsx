import React from 'react';
import ImageLoader from './ImageLoader';

const LoaderDemo: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Image Loader Demo
        </h2>
        <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
          <ImageLoader className="w-full h-full" />
        </div>
        <p className="text-sm text-gray-600 text-center mt-4">
          Each image shows for 0.5 seconds in a continuous loop
        </p>
        <div className="mt-4 text-xs text-gray-500 text-center">
          Images: 1.png, 2.png, 3.png from assets folder
        </div>
      </div>
    </div>
  );
};

export default LoaderDemo; 