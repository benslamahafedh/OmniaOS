import React from 'react';
import { 
  Monitor,
  X, 
  Minimize2, 
  Maximize2, 
  Plus
} from 'lucide-react';

interface Widget {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  data?: any;
}

interface WidgetManagerProps {
  widgets: Widget[];
  onAddWidget: (type: string) => void;
  onRemoveWidget: (id: string) => void;
  onMinimizeWidget: (id: string) => void;
  onMaximizeWidget: (id: string) => void;
}

const WidgetManager: React.FC<WidgetManagerProps> = ({
  widgets,
  onAddWidget,
  onRemoveWidget,
  onMinimizeWidget,
  onMaximizeWidget
}) => {
  return (
    <div className="fixed bottom-20 right-4 bg-black/50 backdrop-blur-xl rounded-2xl border border-red-700/30 p-4">
      <div className="flex flex-col space-y-4">
        {widgets.map((widget) => (
          <div
            key={widget.id}
            className="flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-700 to-red-800 flex items-center justify-center">
                <Monitor className="w-4 h-4 text-white" />
              </div>
              <div className="text-white font-medium">{widget.name}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onMinimizeWidget(widget.id)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onMaximizeWidget(widget.id)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onRemoveWidget(widget.id)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={() => onAddWidget('system-monitor')}
          className="flex items-center justify-center gap-2 p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          Add Widget
        </button>
      </div>
    </div>
  );
};

export default WidgetManager; 