import React, { useState } from 'react';
import Taskbar from './Taskbar';
import SystemSettings from './SystemSettings';
import Terminal from './Terminal';
import SamanthaChat from './SamanthaChat';
import { X } from 'lucide-react';

const OmniaOS: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showSamantha, setShowSamantha] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Taskbar */}
      <Taskbar
        onSettingsClick={() => setShowSettings(true)}
        onTerminalClick={() => setShowTerminal(true)}
        onFolderClick={() => {}}
        onSamanthaClick={() => setShowSamantha(true)}
      />

      {/* System Settings */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl border border-red-700/30 p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">System Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <SystemSettings onClose={() => setShowSettings(false)} />
          </div>
        </div>
      )}

      {/* Terminal */}
      {showTerminal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl border border-red-700/30 p-6 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Terminal</h2>
              <button
                onClick={() => setShowTerminal(false)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <Terminal onClose={() => setShowTerminal(false)} />
          </div>
        </div>
      )}

      {/* Samantha Chat */}
      {showSamantha && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl border border-red-700/30 p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Samantha</h2>
              <button
                onClick={() => setShowSamantha(false)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <SamanthaChat onClose={() => setShowSamantha(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OmniaOS; 