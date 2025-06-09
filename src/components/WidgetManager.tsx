import React, { useState } from 'react';
import { 
  Monitor, Gauge, Calendar, Clock, Music, Image, 
  BarChart3, Activity, Cpu, MemoryStick, HardDrive,
  Wifi, Battery, Volume2, ThermometerSun, X, 
  Minimize2, Maximize2, Plus, Settings
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
  onUpdateWidget: (id: string, updates: Partial<Widget>) => void;
  systemMetrics: any;
}

const WidgetManager: React.FC<WidgetManagerProps> = ({
  widgets,
  onAddWidget,
  onRemoveWidget,
  onMinimizeWidget,
  onUpdateWidget,
  systemMetrics
}) => {
  const [selectedWidgetType, setSelectedWidgetType] = useState('');
  const [showWidgetPicker, setShowWidgetPicker] = useState(false);

  const widgetTypes = [
    {
      type: 'system-monitor',
      name: 'System Monitor',
      icon: <Monitor className="w-5 h-5" />,
      description: 'Real-time system performance metrics',
      defaultSize: { width: 300, height: 200 }
    },
    {
      type: 'clock',
      name: 'Digital Clock',
      icon: <Clock className="w-5 h-5" />,
      description: 'Current time and date display',
      defaultSize: { width: 250, height: 120 }
    },
    {
      type: 'calendar',
      name: 'Calendar',
      icon: <Calendar className="w-5 h-5" />,
      description: 'Monthly calendar view',
      defaultSize: { width: 280, height: 300 }
    },
    {
      type: 'performance-chart',
      name: 'Performance Chart',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'Live performance graphs',
      defaultSize: { width: 400, height: 250 }
    },
    {
      type: 'quick-stats',
      name: 'Quick Stats',
      icon: <Gauge className="w-5 h-5" />,
      description: 'Compact system overview',
      defaultSize: { width: 200, height: 150 }
    }
  ];

  const renderWidget = (widget: Widget) => {
    switch (widget.type) {
      case 'system-monitor':
        return <SystemMonitorWidget systemMetrics={systemMetrics} />;
      case 'clock':
        return <ClockWidget />;
      case 'calendar':
        return <CalendarWidget />;
      case 'performance-chart':
        return <PerformanceChartWidget systemMetrics={systemMetrics} />;
      case 'quick-stats':
        return <QuickStatsWidget systemMetrics={systemMetrics} />;
      default:
        return <div className="p-4 text-red-400">Unknown widget type</div>;
    }
  };

  return (
    <>
      {/* Widget Picker Modal */}
      {showWidgetPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-red-500/30 p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Add Widget</h3>
              <button
                onClick={() => setShowWidgetPicker(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {widgetTypes.map(widgetType => (
                <button
                  key={widgetType.type}
                  onClick={() => {
                    onAddWidget(widgetType.type);
                    setShowWidgetPicker(false);
                  }}
                  className="p-4 rounded-xl border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 transition-all text-left"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-red-400">{widgetType.icon}</div>
                    <div className="text-white font-medium">{widgetType.name}</div>
                  </div>
                  <div className="text-gray-400 text-sm">{widgetType.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Widget Button */}
      <button
        onClick={() => setShowWidgetPicker(true)}
        className="fixed top-20 right-8 z-20 bg-red-500/20 hover:bg-red-500/30 text-red-400 p-3 rounded-xl border border-red-500/30 transition-all duration-300 hover:scale-105"
        title="Add Widget"
      >
        <Plus size={20} />
      </button>

      {/* Render Widgets */}
      {widgets.map(widget => (
        <div
          key={widget.id}
          className="fixed z-30 bg-black/90 backdrop-blur-xl border border-red-500/30 rounded-2xl overflow-hidden shadow-xl"
          style={{
            left: widget.x,
            top: widget.y,
            width: widget.width,
            height: widget.minimized ? 40 : widget.height,
            transition: 'height 0.3s ease',
            resize: 'both'
          }}
        >
          {/* Widget Header */}
          <div className="flex items-center justify-between p-3 bg-red-500/10 border-b border-red-500/20 cursor-move">
            <span className="text-red-400 font-medium text-sm flex items-center gap-2">
              {widgetTypes.find(wt => wt.type === widget.type)?.icon}
              {widget.name}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onMinimizeWidget(widget.id)}
                className="text-red-400/60 hover:text-red-400 transition-colors p-1 rounded hover:bg-red-500/10"
                title={widget.minimized ? "Maximize" : "Minimize"}
              >
                {widget.minimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
              </button>
              <button
                onClick={() => onRemoveWidget(widget.id)}
                className="text-red-400/60 hover:text-red-400 transition-colors p-1 rounded hover:bg-red-500/10"
                title="Close"
              >
                <X size={14} />
              </button>
            </div>
          </div>
          
          {/* Widget Content */}
          {!widget.minimized && (
            <div className="h-full overflow-hidden">
              {renderWidget(widget)}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

// Individual Widget Components
const SystemMonitorWidget: React.FC<{ systemMetrics: any }> = ({ systemMetrics }) => (
  <div className="p-4 h-full">
    <div className="grid grid-cols-2 gap-3 h-full text-sm">
      {[
        { label: 'CPU', value: systemMetrics.cpu, icon: <Cpu size={16} /> },
        { label: 'Memory', value: systemMetrics.memory, icon: <MemoryStick size={16} /> },
        { label: 'Disk', value: systemMetrics.diskUsage, icon: <HardDrive size={16} /> },
        { label: 'Network', value: systemMetrics.network, icon: <Activity size={16} /> }
      ].map(metric => (
        <div key={metric.label} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-400/80">
              {metric.icon}
              <span>{metric.label}</span>
            </div>
            <span className="text-white">{metric.value}%</span>
          </div>
          <div className="h-2 bg-red-500/20 rounded-full">
            <div 
              className="h-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-full transition-all duration-500"
              style={{ width: `${metric.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ClockWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());
  
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 text-center h-full flex flex-col justify-center">
      <div className="text-3xl font-bold text-red-400 tabular-nums mb-2">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="text-red-400/70 text-sm">
        {time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
      </div>
    </div>
  );
};

const CalendarWidget: React.FC = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="p-4 h-full">
      <div className="text-center mb-4">
        <div className="text-red-400 font-semibold">{months[currentMonth]} {currentYear}</div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-xs">
        {days.map(day => (
          <div key={day} className="text-center text-red-400/60 font-medium p-1">
            {day[0]}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => (
          <div 
            key={i + 1}
            className={`text-center p-1 rounded ${
              i + 1 === today.getDate() 
                ? 'bg-red-500 text-white' 
                : 'text-red-400/80 hover:bg-red-500/10'
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

const PerformanceChartWidget: React.FC<{ systemMetrics: any }> = ({ systemMetrics }) => {
  const [history, setHistory] = useState<Array<{cpu: number, memory: number, timestamp: number}>>([]);

  React.useEffect(() => {
    setHistory(prev => {
      const newEntry = {
        cpu: systemMetrics.cpu,
        memory: systemMetrics.memory,
        timestamp: Date.now()
      };
      const updated = [...prev, newEntry].slice(-20); // Keep last 20 entries
      return updated;
    });
  }, [systemMetrics.cpu, systemMetrics.memory]);

  return (
    <div className="p-4 h-full">
      <div className="flex justify-between items-center mb-3">
        <div className="text-red-400 font-medium text-sm">Performance History</div>
        <div className="flex gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded"></div>
            <span className="text-red-400/80">CPU</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-pink-500 rounded"></div>
            <span className="text-red-400/80">Memory</span>
          </div>
        </div>
      </div>
      <div className="h-32 bg-red-500/5 rounded-lg relative overflow-hidden">
        <svg className="w-full h-full">
          {history.length > 1 && (
            <>
              <polyline
                fill="none"
                stroke="rgb(239 68 68)"
                strokeWidth="2"
                points={history.map((point, i) => 
                  `${(i / (history.length - 1)) * 100},${100 - point.cpu}`
                ).join(' ')}
                vectorEffect="non-scaling-stroke"
                style={{ transform: 'scale(1, 0.8) translate(0, 10%)' }}
              />
              <polyline
                fill="none"
                stroke="rgb(236 72 153)"
                strokeWidth="2"
                points={history.map((point, i) => 
                  `${(i / (history.length - 1)) * 100},${100 - point.memory}`
                ).join(' ')}
                vectorEffect="non-scaling-stroke"
                style={{ transform: 'scale(1, 0.8) translate(0, 10%)' }}
              />
            </>
          )}
        </svg>
      </div>
    </div>
  );
};

const QuickStatsWidget: React.FC<{ systemMetrics: any }> = ({ systemMetrics }) => (
  <div className="p-4 h-full">
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-red-400/80 text-sm">System Status</div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <div className="text-red-400/60">CPU</div>
          <div className="text-white font-medium">{systemMetrics.cpu}%</div>
        </div>
        <div>
          <div className="text-red-400/60">RAM</div>
          <div className="text-white font-medium">{systemMetrics.memory}%</div>
        </div>
        <div>
          <div className="text-red-400/60">Temp</div>
          <div className="text-white font-medium">{systemMetrics.temperature}°C</div>
        </div>
        <div>
          <div className="text-red-400/60">Uptime</div>
          <div className="text-white font-medium">{systemMetrics.uptime}</div>
        </div>
      </div>
    </div>
  </div>
);

export default WidgetManager; 