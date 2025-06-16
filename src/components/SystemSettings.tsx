import React, { useState } from 'react';
import { Moon, Sun, Palette, Sliders, Monitor, Layout, Sparkles, Zap } from 'lucide-react';
import { useTheme, themes } from '../contexts/ThemeContext';

interface SystemSettingsProps {
  onClose: () => void;
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

const SystemSettings: React.FC<SystemSettingsProps> = ({ onClose }) => {
  const { theme, setTheme, uiSettings, setUiSettings } = useTheme();
  const [activeTab, setActiveTab] = useState('appearance');

  const tabs = [
    { id: 'appearance', name: 'Appearance', icon: <Palette className="w-5 h-5" /> },
    { id: 'performance', name: 'Performance', icon: <Zap className="w-5 h-5" /> },
    { id: 'display', name: 'Display', icon: <Monitor className="w-5 h-5" /> },
    { id: 'effects', name: 'Effects', icon: <Sparkles className="w-5 h-5" /> }
  ];

  const handleThemeChange = (themeId: string) => {
    const newTheme = themes.find(t => t.id === themeId);
    if (newTheme) {
      setTheme(newTheme);
    }
  };

  const handleSettingToggle = (setting: keyof UISettings) => {
    setUiSettings({
      ...uiSettings,
      [setting]: !uiSettings[setting]
    });
  };

  const handleSliderChange = (setting: keyof UISettings, value: number) => {
    setUiSettings({
      ...uiSettings,
      [setting]: value
    });
  };

  const handleSaveLayout = () => {
    // Save current settings to localStorage
    localStorage.setItem('omniaos-theme', JSON.stringify(theme));
    localStorage.setItem('omniaos-settings', JSON.stringify(uiSettings));
  };

  return (
    <div className="bg-gray-900/95 backdrop-blur-xl rounded-3xl border border-red-500/30 p-8 w-full max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <Sliders className="w-8 h-8 text-red-400" />
          System Settings
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={handleSaveLayout}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-xl
              transition-all duration-300 flex items-center gap-2"
          >
            <Layout className="w-4 h-4" />
            Save Layout
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300
              ${activeTab === tab.id 
                ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }
            `}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Theme Selection */}
        <div className={activeTab === 'appearance' ? 'block' : 'hidden'}>
          <h3 className="text-xl font-semibold text-white mb-4">Theme Selection</h3>
          <div className="grid grid-cols-2 gap-4">
            {themes.map(t => (
              <div
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                className={`
                  relative p-4 rounded-xl cursor-pointer transition-all duration-300
                  bg-gradient-to-br ${t.background}
                  ${theme.id === t.id 
                    ? 'border-2 border-red-500 shadow-lg shadow-red-500/20' 
                    : 'border border-white/10 hover:border-white/30'
                  }
                `}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.primary}`} />
                  <div className="text-white font-medium">{t.name}</div>
                </div>
                <div className="flex gap-2">
                  <div className={`flex-1 h-2 rounded-full bg-gradient-to-r ${t.primary}`} />
                  <div className={`flex-1 h-2 rounded-full bg-gradient-to-r ${t.secondary}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Settings */}
        <div className={activeTab === 'performance' ? 'block' : 'hidden'}>
          <h3 className="text-xl font-semibold text-white mb-4">Performance Settings</h3>
          <div className="space-y-4">
            {Object.entries(uiSettings)
              .filter(([key]) => typeof uiSettings[key as keyof typeof uiSettings] === 'boolean')
              .map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div>
                    <div className="text-white font-medium">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {`Enable or disable ${key.toLowerCase()} for better performance`}
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingToggle(key as keyof typeof uiSettings)}
                    className={`
                      w-12 h-6 rounded-full transition-all duration-300 relative
                      ${value ? 'bg-red-500' : 'bg-gray-700'}
                    `}
                  >
                    <div
                      className={`
                        absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300
                        ${value ? 'left-7' : 'left-1'}
                      `}
                    />
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Display Settings */}
        <div className={activeTab === 'display' ? 'block' : 'hidden'}>
          <h3 className="text-xl font-semibold text-white mb-4">Display Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Sun className="w-6 h-6 text-yellow-400" />
                <div className="text-white font-medium">Light Mode</div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={uiSettings.lightMode}
                onChange={(e) => handleSliderChange('lightMode', parseInt(e.target.value))}
                className="w-full accent-red-500 bg-gray-700 rounded-lg"
              />
            </div>
            <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Moon className="w-6 h-6 text-blue-400" />
                <div className="text-white font-medium">Dark Mode</div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={uiSettings.darkMode}
                onChange={(e) => handleSliderChange('darkMode', parseInt(e.target.value))}
                className="w-full accent-red-500 bg-gray-700 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Effects Settings */}
        <div className={activeTab === 'effects' ? 'block' : 'hidden'}>
          <h3 className="text-xl font-semibold text-white mb-4">Visual Effects</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5">
              <h4 className="text-white font-medium mb-2">Particle Density</h4>
              <input
                type="range"
                min="0"
                max="100"
                value={uiSettings.particleDensity}
                onChange={(e) => handleSliderChange('particleDensity', parseInt(e.target.value))}
                className="w-full accent-red-500 bg-gray-700 rounded-lg"
              />
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <h4 className="text-white font-medium mb-2">Animation Speed</h4>
              <input
                type="range"
                min="0"
                max="100"
                value={uiSettings.animationSpeed}
                onChange={(e) => handleSliderChange('animationSpeed', parseInt(e.target.value))}
                className="w-full accent-red-500 bg-gray-700 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings; 