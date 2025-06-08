import React from 'react';
import { Settings, Terminal as TerminalIcon, Folder, Heart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface TaskbarProps {
  onSettingsClick: () => void;
  onTerminalClick: () => void;
  onFolderClick: (folderId: string) => void;
  onSamanthaClick: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
  onSettingsClick,
  onTerminalClick,
  onFolderClick,
  onSamanthaClick
}) => {
  const { theme } = useTheme();

  const folders = [
    { id: 'system', name: 'System' },
    { id: 'docs', name: 'Docs' },
    { id: 'neural', name: 'Neural' },
    { id: 'apps', name: 'Apps' }
  ];

  return (
    <div className={`
      fixed bottom-0 left-0 right-0 h-16
      bg-gradient-to-r ${theme.primary} bg-opacity-95
      border-t border-white/10 backdrop-blur-xl
      flex items-center justify-between px-4
      theme-blur
    `}>
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <button
          onClick={onSettingsClick}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300
            flex items-center gap-2 text-white"
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </button>

        <button
          onClick={onTerminalClick}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300
            flex items-center gap-2 text-white"
        >
          <TerminalIcon className="w-5 h-5" />
          <span className="text-sm">Terminal</span>
        </button>
      </div>

      {/* Center Section - Folders */}
      <div className="flex items-center gap-2">
        {folders.map(folder => (
          <button
            key={folder.id}
            onClick={() => onFolderClick(folder.id)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300
              flex items-center gap-2 text-white"
          >
            <Folder className="w-5 h-5" />
            <span className="text-sm">{folder.name}</span>
          </button>
        ))}
      </div>

      {/* Right Section - Samantha */}
      <button
        onClick={onSamanthaClick}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300
          flex items-center gap-2 text-white group relative"
      >
        <Heart className="w-5 h-5 group-hover:text-red-400 transition-colors duration-300" />
        <span className="text-sm group-hover:text-red-400 transition-colors duration-300">
          Samantha
        </span>
        
        {/* Pulse effect */}
        <div className="absolute -inset-1 bg-red-500/20 rounded-lg blur animate-pulse" />
      </button>
    </div>
  );
};

export default Taskbar; 