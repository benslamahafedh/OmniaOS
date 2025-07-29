import React from 'react';
import { Settings, Terminal as TerminalIcon, Folder } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useMobile } from '../hooks/useMobile';

interface TaskbarProps {
  onSettingsClick: () => void;
  onTerminalClick: () => void;
  onFolderClick: (folderId: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
  onSettingsClick,
  onTerminalClick,
  onFolderClick
}) => {
  const { theme } = useTheme();
  const { isMobile } = useMobile();

  const folders = [
    { id: 'system', name: 'System' },
    { id: 'docs', name: 'Docs' },
    { id: 'neural', name: 'Neural' },
    { id: 'apps', name: 'Apps' }
  ];

  if (isMobile) {
    return (
      <div className={`
        mobile-taskbar fixed bottom-0 left-0 right-0 h-16
        bg-gradient-to-r ${theme.primary} bg-opacity-95
        border-t border-white/10 backdrop-blur-xl
        flex flex-col items-center justify-center px-4
        theme-blur
      `}>
        {/* Top row - Main actions */}
        <div className="taskbar-section">
          <button
            onClick={onSettingsClick}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300
              flex items-center gap-1 text-white show-text"
          >
            <Settings className="w-4 h-4" />
            <span className="text-xs">Settings</span>
          </button>

          <button
            onClick={onTerminalClick}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300
              flex items-center gap-1 text-white"
          >
            <TerminalIcon className="w-4 h-4" />
          </button>

          {/* Most important folders only on mobile */}
          <button
            onClick={() => onFolderClick('system')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300
              flex items-center gap-1 text-white"
          >
            <Folder className="w-4 h-4" />
          </button>


        </div>
      </div>
    );
  }

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


    </div>
  );
};

export default Taskbar; 