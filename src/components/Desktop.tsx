import React, { useState } from 'react';
import { 
  Plus,
  Settings,
  Terminal as TerminalIcon,
  MessageSquare,
  X
} from 'lucide-react';
import WidgetManager from './WidgetManager';
import SystemSettings from './SystemSettings';
import Terminal from './Terminal';
import SamanthaChat from './SamanthaChat';

interface QuickAction {
  id: string;
  name: string;
  icon: React.ReactNode;
  action: () => void;
}

const Desktop: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showSamantha, setShowSamantha] = useState(false);
  const [widgets, setWidgets] = useState<any[]>([]);

  const quickActions: QuickAction[] = [
    {
      id: 'add-widget',
      name: 'Add Widget',
      icon: <Plus className="w-5 h-5" />,
      action: () => addWidget()
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      action: () => setShowSettings(true)
    },
    {
      id: 'terminal',
      name: 'Terminal',
      icon: <TerminalIcon className="w-5 h-5" />,
      action: () => setShowTerminal(true)
    },
    {
      id: 'samantha',
      name: 'Samantha',
      icon: <MessageSquare className="w-5 h-5" />,
      action: () => setShowSamantha(true)
    }
  ];

  const addWidget = () => {
    const newWidget = {
      id: `widget-${Date.now()}`,
      type: 'system-monitor',
      name: 'System Monitor',
      x: Math.random() * (window.innerWidth - 300),
      y: Math.random() * (window.innerHeight - 200),
      width: 300,
      height: 200,
      minimized: false
    };
    setWidgets([...widgets, newWidget]);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
  };

  const minimizeWidget = (id: string) => {
    setWidgets(widgets.map(widget => 
      widget.id === id ? { ...widget, minimized: true } : widget
    ));
  };

  const maximizeWidget = (id: string) => {
    setWidgets(widgets.map(widget => 
      widget.id === id ? { ...widget, minimized: false } : widget
    ));
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      {/* Quick Actions */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/50 backdrop-blur-xl border border-red-700/30 hover:bg-red-500/20 transition-all duration-300"
          >
            {action.icon}
            <span>{action.name}</span>
          </button>
        ))}
      </div>

      {/* Widget Manager */}
      <WidgetManager
        widgets={widgets}
        onAddWidget={addWidget}
        onRemoveWidget={removeWidget}
        onMinimizeWidget={minimizeWidget}
        onMaximizeWidget={maximizeWidget}
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

export default Desktop; 