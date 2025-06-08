import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Desktop from './components/Desktop';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Desktop />
    </ThemeProvider>
  );
};

export default App; 