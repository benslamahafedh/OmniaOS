import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Desktop from './components/Desktop';
import PreIntroLoader from './components/PreIntroLoader';
import IntroSequence from './components/IntroSequence';

const App: React.FC = () => {
  const [loadingStage, setLoadingStage] = useState<'preloader' | 'intro' | 'desktop'>('preloader');

  useEffect(() => {
    console.log('App: Current loading stage changed to:', loadingStage);
  }, [loadingStage]);

  const handlePreLoaderComplete = () => {
    console.log('App: PreIntroLoader completed, transitioning to intro');
    setLoadingStage('intro');
    console.log('App: Loading stage should now be intro');
  };

  const handleIntroComplete = () => {
    console.log('App: IntroSequence completed, transitioning to desktop');
    console.log('App: Current loading stage before change:', loadingStage);
    setLoadingStage('desktop');
    console.log('App: Loading stage should now be desktop');
  };

  console.log('App: Rendering with stage:', loadingStage);

  return (
    <ThemeProvider>
      {loadingStage === 'preloader' && (
        <PreIntroLoader onComplete={handlePreLoaderComplete} />
      )}
      {loadingStage === 'intro' && (
        <IntroSequence onComplete={handleIntroComplete} />
      )}
      {loadingStage === 'desktop' && (
        <Desktop />
      )}
    </ThemeProvider>
  );
};

export default App; 