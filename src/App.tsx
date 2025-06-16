import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Desktop from './components/Desktop';
import PreIntroLoader from './components/PreIntroLoader';

const App: React.FC = () => {
  const [showPreLoader, setShowPreLoader] = useState(true);

  const handlePreLoaderComplete = () => {
    setShowPreLoader(false);
  };

  return (
    <ThemeProvider>
      {showPreLoader ? (
        <PreIntroLoader onComplete={handlePreLoaderComplete} />
      ) : (
        <Desktop />
      )}
    </ThemeProvider>
  );
};

export default App; 