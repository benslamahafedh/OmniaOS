import React, { createContext, useContext, useState, useEffect } from 'react';

interface Theme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

interface UISettings {
  particleEffects: boolean;
  animations: boolean;
  blurEffects: boolean;
  performanceMode: boolean;
  particleDensity: number;
  animationSpeed: number;
  lightMode: number;
  darkMode: number;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  uiSettings: UISettings;
  setUiSettings: (settings: UISettings) => void;
}

const defaultTheme: Theme = {
  id: 'default',
  name: 'Samantha Red',
  primary: 'from-red-700 to-red-900',
  secondary: 'from-red-800 to-red-950',
  accent: 'text-red-300',
  background: 'from-gray-900 to-black'
};

const defaultSettings: UISettings = {
  particleEffects: true,
  animations: true,
  blurEffects: true,
  performanceMode: false,
  particleDensity: 50,
  animationSpeed: 50,
  lightMode: 50,
  darkMode: 50
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
  uiSettings: defaultSettings,
  setUiSettings: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [uiSettings, setUiSettings] = useState<UISettings>(defaultSettings);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved settings
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('omniaos-theme');
      const savedSettings = localStorage.getItem('omniaos-settings');

      if (savedTheme) {
        setTheme(JSON.parse(savedTheme));
      }
      if (savedSettings) {
        setUiSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading saved settings:', error);
    }
    setIsInitialized(true);
  }, []);

  // Apply theme and settings changes
  useEffect(() => {
    if (!isInitialized) return;

    const root = document.documentElement;
    const body = document.body;
    
    // Apply theme colors
    root.style.setProperty('--tw-gradient-from', `rgb(185 28 28)`); // red-700
    root.style.setProperty('--tw-gradient-to', `rgb(127 29 29)`); // red-900
    root.style.setProperty('--accent-color', 'rgb(252 165 165)'); // red-300
    
    // Apply UI settings
    root.style.setProperty('--animation-speed', `${uiSettings.animationSpeed}%`);
    root.style.setProperty('--particle-density', `${uiSettings.particleDensity}`);
    root.style.setProperty('--blur-amount', uiSettings.blurEffects ? '1' : '0');
    
    // Apply light/dark mode
    const brightness = ((uiSettings.lightMode + (100 - uiSettings.darkMode)) / 100) + 0.3;
    root.style.setProperty('--brightness', brightness.toString());
    
    // Toggle classes based on settings
    body.classList.toggle('reduce-animations', !uiSettings.animations);
    body.classList.toggle('performance-mode', uiSettings.performanceMode);
    body.classList.toggle('no-particles', !uiSettings.particleEffects);

    // Save settings
    localStorage.setItem('omniaos-theme', JSON.stringify(theme));
    localStorage.setItem('omniaos-settings', JSON.stringify(uiSettings));
  }, [theme, uiSettings, isInitialized]);

  if (!isInitialized) {
    return null; // Or a loading spinner
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, uiSettings, setUiSettings }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const themes: Theme[] = [
  defaultTheme,
  {
    id: 'cyberpunk',
    name: 'Neon Future',
    primary: 'from-cyan-500 to-blue-700',
    secondary: 'from-purple-500 to-blue-700',
    accent: 'text-cyan-400',
    background: 'from-slate-900 to-black'
  },
  {
    id: 'matrix',
    name: 'Digital Matrix',
    primary: 'from-green-500 to-emerald-700',
    secondary: 'from-lime-500 to-green-700',
    accent: 'text-green-400',
    background: 'from-gray-900 to-black'
  },
  {
    id: 'sunset',
    name: 'Sunset Vibes',
    primary: 'from-orange-500 to-red-700',
    secondary: 'from-yellow-500 to-orange-700',
    accent: 'text-orange-400',
    background: 'from-slate-900 to-black'
  }
]; 