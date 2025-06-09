import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Settings, Folder, Brain, Globe, Heart, Zap, FileText, 
  Network, Activity, Bell, Wifi, Battery, Volume2, 
  Calendar, Clock, Sun, Moon, Cpu, HardDrive, 
  MemoryStick, Thermometer, Server, Database, Radio, 
  Sparkles, Grid3X3, Code2, Search, Command, 
  Maximize2, Minimize2, X, RotateCw, Download,
  Music, Video, Image, ChevronDown, Plus, Minus,
  BarChart3, Gauge, Laptop, Smartphone, Tablet
} from 'lucide-react';
import Taskbar from './Taskbar';
import SystemSettings from './SystemSettings';
import Terminal from './Terminal';
import FolderView from './FolderView';
import SamanthaChat from './SamanthaChat';
import IntroSequence from './IntroSequence';

interface FolderItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

interface Widget {
  id: string;
  name: string;
  component: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
}

interface QuickAction {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

const Desktop: React.FC = () => {
  const { theme, uiSettings } = useTheme();
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [showSamantha, setShowSamantha] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showLoader, setShowLoader] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [commandSearch, setCommandSearch] = useState('');
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [showQuickLaunch, setShowQuickLaunch] = useState(false);
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'AGI Update', message: 'Neural network optimization complete', time: '2m ago', type: 'success' },
    { id: 2, title: 'System', message: 'Quantum processing cores synchronized', time: '5m ago', type: 'info' },
    { id: 3, title: 'Security', message: 'Neural firewall updated', time: '10m ago', type: 'warning' }
  ]);
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 42,
    memory: 68,
    network: 89,
    temperature: 45,
    diskUsage: 75,
    uptime: '2h 34m',
    processes: 247
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particleSystem, setParticleSystem] = useState<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
  }>>([]);
  const [introStep, setIntroStep] = useState(0);
  const [isBooted, setIsBooted] = useState(false);
  const introCompletedRef = useRef(false);

  // Update time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate system metrics updates
  useEffect(() => {
    const updateMetrics = () => {
      setSystemMetrics(prev => ({
        ...prev,
        cpu: Math.floor(Math.random() * 30) + 40,
        memory: Math.floor(Math.random() * 20) + 60,
        network: Math.floor(Math.random() * 20) + 75,
        temperature: Math.floor(Math.random() * 10) + 40,
        diskUsage: Math.floor(Math.random() * 20) + 65,
        processes: Math.floor(Math.random() * 50) + 230
      }));
    };
    const timer = setInterval(updateMetrics, 5000);
    return () => clearInterval(timer);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize particle system
  useEffect(() => {
    const colors = ['#FF0080', '#FF0000', '#7928CA', '#0070F3'];
    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.2
    }));
    setParticleSystem(particles);
  }, []);

  // Animate particles
  useEffect(() => {
    if (!canvasRef.current || !uiSettings.particleEffects) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      if (!lastTime) lastTime = currentTime;
      const delta = (currentTime - lastTime) / 16; // Target 60fps
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      setParticleSystem(prevParticles => 
        prevParticles.map(particle => {
          // Update position
          let x = particle.x + particle.vx * delta;
          let y = particle.y + particle.vy * delta;

          // Bounce off edges
          if (x < 0 || x > canvas.width) particle.vx *= -1;
          if (y < 0 || y > canvas.height) particle.vy *= -1;

          // Mouse interaction
          const dx = x - mousePosition.x;
          const dy = y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            const force = (100 - distance) / 100;
            particle.vx += Math.cos(angle) * force * 0.2;
            particle.vy += Math.sin(angle) * force * 0.2;
          }

          // Speed limit
          const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
          if (speed > 5) {
            particle.vx = (particle.vx / speed) * 5;
            particle.vy = (particle.vy / speed) * 5;
          }

          // Draw particle
          ctx.beginPath();
          ctx.arc(x, y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `${particle.color}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();

          // Draw glow
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, particle.size * 3);
          gradient.addColorStop(0, `${particle.color}33`);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.arc(x, y, particle.size * 3, 0, Math.PI * 2);
          ctx.fill();

          return {
            ...particle,
            x: x < 0 ? canvas.width : x > canvas.width ? 0 : x,
            y: y < 0 ? canvas.height : y > canvas.height ? 0 : y
          };
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Start animation
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition, uiSettings.particleEffects]);

  // Handle loader completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
      setShowIntro(true);
    }, 6000); // 6 second fast infinity loader
    
    return () => clearTimeout(timer);
  }, []);

  // Handle intro completion
  const handleIntroComplete = () => {
    if (introCompletedRef.current) return;
    introCompletedRef.current = true;
    setShowIntro(false);
    setTimeout(() => setIsBooted(true), 500);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette (Ctrl+K or Cmd+K)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      
      // Quick launch (Ctrl+Space)
      if (e.ctrlKey && e.key === ' ') {
        e.preventDefault();
        setShowQuickLaunch(!showQuickLaunch);
      }
      
      // Escape to close modals
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
        setShowQuickLaunch(false);
        setShowContextMenu(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showQuickLaunch]);

  // Context menu handling
  useEffect(() => {
    const handleRightClick = (e: MouseEvent) => {
      if (e.target === document.body || (e.target as Element).classList.contains('desktop-area')) {
        e.preventDefault();
        setContextMenuPosition({ x: e.clientX, y: e.clientY });
        setShowContextMenu(true);
      }
    };

    const handleClick = () => {
      setShowContextMenu(false);
    };

    document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('contextmenu', handleRightClick);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Quick actions for command palette
  const quickActions: QuickAction[] = [
    {
      id: 'open-settings',
      name: 'Open Settings',
      description: 'Access system settings and preferences',
      icon: <Settings className="w-4 h-4" />,
      action: () => handleWindowOpen('settings'),
      category: 'System'
    },
    {
      id: 'open-terminal',
      name: 'Open Terminal',
      description: 'Launch command line interface',
      icon: <Code2 className="w-4 h-4" />,
      action: () => handleWindowOpen('terminal'),
      category: 'Development'
    },
    {
      id: 'chat-samantha',
      name: 'Chat with Samantha',
      description: 'Open AI assistant interface',
      icon: <Sparkles className="w-4 h-4" />,
      action: () => setShowSamantha(true),
      category: 'AI'
    },
    {
      id: 'add-widget',
      name: 'Add Widget',
      description: 'Add a new desktop widget',
      icon: <Plus className="w-4 h-4" />,
      action: () => addWidget('system-monitor'),
      category: 'Desktop'
    },
    {
      id: 'refresh-desktop',
      name: 'Refresh Desktop',
      description: 'Reload desktop interface',
      icon: <RotateCw className="w-4 h-4" />,
      action: () => window.location.reload(),
      category: 'System'
    }
  ];

  // Filter actions based on search
  const filteredActions = quickActions.filter(action =>
    action.name.toLowerCase().includes(commandSearch.toLowerCase()) ||
    action.description.toLowerCase().includes(commandSearch.toLowerCase()) ||
    action.category.toLowerCase().includes(commandSearch.toLowerCase())
  );

  // Widget management functions
  const addWidget = (type: string) => {
    const newWidget: Widget = {
      id: `widget-${Date.now()}`,
      name: type === 'system-monitor' ? 'System Monitor' : 'New Widget',
      component: type === 'system-monitor' ? renderSystemMonitorWidget() : <div>Widget</div>,
      x: Math.random() * 300 + 100,
      y: Math.random() * 200 + 150,
      width: 300,
      height: 200,
      minimized: false
    };
    setWidgets(prev => [...prev, newWidget]);
  };

  const removeWidget = (id: string) => {
    setWidgets(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWidget = (id: string) => {
    setWidgets(prev => prev.map(w => 
      w.id === id ? { ...w, minimized: !w.minimized } : w
    ));
  };

  // Render system monitor widget
  const renderSystemMonitorWidget = () => (
    <div className="p-4 h-full">
      <div className="grid grid-cols-2 gap-3 h-full text-sm">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-red-400/80">CPU</span>
            <span className="text-white">{systemMetrics.cpu}%</span>
          </div>
          <div className="h-1 bg-red-500/20 rounded-full">
            <div className="h-1 bg-red-500 rounded-full" style={{ width: `${systemMetrics.cpu}%` }} />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-red-400/80">Memory</span>
            <span className="text-white">{systemMetrics.memory}%</span>
          </div>
          <div className="h-1 bg-red-500/20 rounded-full">
            <div className="h-1 bg-red-500 rounded-full" style={{ width: `${systemMetrics.memory}%` }} />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-red-400/80">Disk</span>
            <span className="text-white">{systemMetrics.diskUsage}%</span>
          </div>
          <div className="h-1 bg-red-500/20 rounded-full">
            <div className="h-1 bg-red-500 rounded-full" style={{ width: `${systemMetrics.diskUsage}%` }} />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-red-400/80">Uptime</span>
            <span className="text-white text-xs">{systemMetrics.uptime}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const folders: FolderItem[] = [
    {
      id: 'system',
      name: 'System Core',
      icon: <Server className="w-6 h-6" />,
      color: 'from-red-600 to-red-800',
      description: 'Core system files and settings'
    },
    {
      id: 'docs',
      name: 'Documentation',
      icon: <Database className="w-6 h-6" />,
      color: 'from-pink-500 to-red-600',
      description: 'System documentation and guides'
    },
    {
      id: 'neural',
      name: 'Neural Network',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-rose-500 to-pink-700',
      description: 'AI processing modules'
    },
    {
      id: 'web',
      name: 'Web Interface',
      icon: <Radio className="w-6 h-6" />,
      color: 'from-red-400 to-pink-600',
      description: 'Internet connectivity'
    },
    {
      id: 'samantha',
      name: 'Samantha Core',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-red-500 to-red-700',
      description: 'AGI consciousness module'
    },
    {
      id: 'apps',
      name: 'Applications',
      icon: <Grid3X3 className="w-6 h-6" />,
      color: 'from-pink-600 to-red-700',
      description: 'Installed applications'
    }
  ];

  const handleWindowOpen = (windowId: string) => {
    setActiveWindow(windowId);
  };

  const handleWindowClose = () => {
    setActiveWindow(null);
  };

  // Render loader, intro, or desktop
  if (showLoader) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="text-center">
          {/* Flowing Numbers Infinity */}
          <div className="mb-12 relative">
            <div className="infinity-flow-container">
              <svg width="500" height="200" viewBox="0 0 500 200" className="infinity-svg">
                <defs>
                  <path 
                    id="infinityPath" 
                    d="M 250,100 C 250,40 180,40 150,80 C 120,120 180,160 180,100 C 180,40 250,40 250,100 C 250,160 320,160 350,120 C 380,80 320,40 320,100 C 320,160 250,160 250,100"
                  />
                </defs>
              </svg>
              
              {/* Track 1 - Inner infinity path */}
              {Array.from({ length: 60 }, (_, i) => {
                const chars = ['◆', '◇', '●', '○', '■', '□', '▲', '△'];
                return (
                  <div 
                    key={`track1-${i}`}
                    className="flowing-bit track1"
                    style={{
                      animationDelay: `${i * 0.03}s`,
                      animationDuration: '4s'
                    }}
                  >
                    {chars[Math.floor(Math.random() * chars.length)]}
                  </div>
                );
              })}
              
              {/* Track 2 - Middle infinity path */}
              {Array.from({ length: 60 }, (_, i) => {
                const chars = ['✦', '✧', '★', '☆', '✪', '✫', '✬', '✭'];
                return (
                  <div 
                    key={`track2-${i}`}
                    className="flowing-bit track2"
                    style={{
                      animationDelay: `${i * 0.03}s`,
                      animationDuration: '4s'
                    }}
                  >
                    {chars[Math.floor(Math.random() * chars.length)]}
                  </div>
                );
              })}
              
              {/* Track 3 - Outer infinity path */}
              {Array.from({ length: 60 }, (_, i) => {
                const chars = ['◊', '◈', '◉', '◎', '⬟', '⬢', '⬡', '⟐'];
                return (
                  <div 
                    key={`track3-${i}`}
                    className="flowing-bit track3"
                    style={{
                      animationDelay: `${i * 0.03}s`,
                      animationDuration: '4s'
                    }}
                  >
                    {chars[Math.floor(Math.random() * chars.length)]}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* OMNIA Text */}
          <div className="mb-8">
            <div className="text-red-400 text-3xl font-mono font-bold tracking-wider omnia-brand">
              {'OMNIA'.split('').map((char, i) => (
                <span key={i} style={{animationDelay: `${i * 0.2}s`}} className="letter">
                  {char}
                </span>
              ))}
            </div>
            <div className="text-red-400/60 text-sm font-mono mt-2 tracking-widest">
              NEURAL STREAM INITIALIZING
            </div>
          </div>
          
          {/* Binary Loading */}
          <div className="flex items-center justify-center space-x-2">
            <div className="text-red-400 text-sm font-mono">
              {'01001100010001'.split('').map((bit, i) => (
                <span 
                  key={i} 
                  className="binary-bit"
                  style={{animationDelay: `${i * 0.1}s`}}
                >
                  {bit}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <style>{`
          .infinity-flow-container {
            position: relative;
            width: 500px;
            height: 200px;
            margin: 0 auto;
          }
          
          .infinity-svg {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
          }
          
          .flowing-bit {
            position: absolute;
            font-family: 'Arial Unicode MS', sans-serif;
            font-size: 18px;
            font-weight: bold;
            user-select: none;
          }
          
          .flowing-bit.track1 {
            color: rgba(239, 68, 68, 0.95);
            text-shadow: 0 0 12px rgba(239, 68, 68, 0.8), 0 0 24px rgba(239, 68, 68, 0.4);
            animation: infinityTrack1 4s linear infinite;
          }
          
          .flowing-bit.track2 {
            color: rgba(236, 72, 153, 0.9);
            text-shadow: 0 0 10px rgba(236, 72, 153, 0.7), 0 0 20px rgba(236, 72, 153, 0.3);
            animation: infinityTrack2 4s linear infinite;
          }
          
          .flowing-bit.track3 {
            color: rgba(255, 0, 128, 0.85);
            text-shadow: 0 0 8px rgba(255, 0, 128, 0.6), 0 0 16px rgba(255, 0, 128, 0.2);
            animation: infinityTrack3 4s linear infinite;
          }
          
          .omnia-brand .letter {
            display: inline-block;
            animation: letterPulse 2s ease-in-out infinite;
            text-shadow: 0 0 15px rgba(239, 68, 68, 0.6);
          }
          
          .binary-bit {
            display: inline-block;
            animation: binaryFlicker 1.5s ease-in-out infinite;
            color: rgba(239, 68, 68, 0.7);
          }
          
          @keyframes infinityTrack1 {
            0% {
              left: 250px;
              top: 80px;
              opacity: 0;
              transform: scale(0.8) rotate(0deg);
            }
            2% {
              opacity: 1;
              transform: scale(1) rotate(10deg);
            }
            8% {
              left: 220px;
              top: 60px;
              transform: scale(1.05) rotate(40deg);
            }
            16% {
              left: 180px;
              top: 50px;
              transform: scale(1.1) rotate(80deg);
            }
            24% {
              left: 140px;
              top: 60px;
              transform: scale(1.05) rotate(120deg);
            }
            32% {
              left: 120px;
              top: 80px;
              transform: scale(1) rotate(160deg);
            }
            40% {
              left: 140px;
              top: 100px;
              transform: scale(1.05) rotate(200deg);
            }
            48% {
              left: 180px;
              top: 110px;
              transform: scale(1.1) rotate(240deg);
            }
            50% {
              left: 250px;
              top: 100px;
              transform: scale(1) rotate(270deg);
            }
            52% {
              left: 280px;
              top: 80px;
              transform: scale(1.05) rotate(300deg);
            }
            60% {
              left: 320px;
              top: 70px;
              transform: scale(1.1) rotate(340deg);
            }
            68% {
              left: 360px;
              top: 80px;
              transform: scale(1.05) rotate(380deg);
            }
            76% {
              left: 380px;
              top: 100px;
              transform: scale(1) rotate(420deg);
            }
            84% {
              left: 360px;
              top: 120px;
              transform: scale(1.05) rotate(460deg);
            }
            92% {
              left: 320px;
              top: 130px;
              transform: scale(1.1) rotate(500deg);
            }
            98% {
              left: 250px;
              top: 120px;
              opacity: 1;
              transform: scale(1) rotate(540deg);
            }
            100% {
              left: 250px;
              top: 80px;
              opacity: 0;
              transform: scale(0.8) rotate(570deg);
            }
          }
          
          @keyframes infinityTrack2 {
            0% {
              left: 250px;
              top: 100px;
              opacity: 0;
              transform: scale(0.8) rotate(0deg);
            }
            2% {
              opacity: 1;
              transform: scale(1) rotate(15deg);
            }
            8% {
              left: 220px;
              top: 75px;
              transform: scale(1.05) rotate(45deg);
            }
            16% {
              left: 180px;
              top: 60px;
              transform: scale(1.1) rotate(90deg);
            }
            24% {
              left: 140px;
              top: 75px;
              transform: scale(1.05) rotate(135deg);
            }
            32% {
              left: 120px;
              top: 100px;
              transform: scale(1) rotate(180deg);
            }
            40% {
              left: 140px;
              top: 125px;
              transform: scale(1.05) rotate(225deg);
            }
            48% {
              left: 180px;
              top: 140px;
              transform: scale(1.1) rotate(270deg);
            }
            50% {
              left: 250px;
              top: 100px;
              transform: scale(1) rotate(300deg);
            }
            52% {
              left: 280px;
              top: 95px;
              transform: scale(1.05) rotate(330deg);
            }
            60% {
              left: 320px;
              top: 85px;
              transform: scale(1.1) rotate(360deg);
            }
            68% {
              left: 360px;
              top: 95px;
              transform: scale(1.05) rotate(405deg);
            }
            76% {
              left: 380px;
              top: 115px;
              transform: scale(1) rotate(450deg);
            }
            84% {
              left: 360px;
              top: 135px;
              transform: scale(1.05) rotate(495deg);
            }
            92% {
              left: 320px;
              top: 145px;
              transform: scale(1.1) rotate(540deg);
            }
            98% {
              left: 250px;
              top: 130px;
              opacity: 1;
              transform: scale(1) rotate(570deg);
            }
            100% {
              left: 250px;
              top: 100px;
              opacity: 0;
              transform: scale(0.8) rotate(600deg);
            }
          }
          
          @keyframes infinityTrack3 {
            0% {
              left: 250px;
              top: 120px;
              opacity: 0;
              transform: scale(0.8) rotate(0deg);
            }
            2% {
              opacity: 1;
              transform: scale(1) rotate(20deg);
            }
            8% {
              left: 220px;
              top: 90px;
              transform: scale(1.05) rotate(50deg);
            }
            16% {
              left: 180px;
              top: 70px;
              transform: scale(1.1) rotate(100deg);
            }
            24% {
              left: 140px;
              top: 90px;
              transform: scale(1.05) rotate(150deg);
            }
            32% {
              left: 120px;
              top: 120px;
              transform: scale(1) rotate(200deg);
            }
            40% {
              left: 140px;
              top: 150px;
              transform: scale(1.05) rotate(250deg);
            }
            48% {
              left: 180px;
              top: 170px;
              transform: scale(1.1) rotate(300deg);
            }
            50% {
              left: 250px;
              top: 120px;
              transform: scale(1) rotate(330deg);
            }
            52% {
              left: 280px;
              top: 110px;
              transform: scale(1.05) rotate(360deg);
            }
            60% {
              left: 320px;
              top: 100px;
              transform: scale(1.1) rotate(400deg);
            }
            68% {
              left: 360px;
              top: 110px;
              transform: scale(1.05) rotate(450deg);
            }
            76% {
              left: 380px;
              top: 130px;
              transform: scale(1) rotate(500deg);
            }
            84% {
              left: 360px;
              top: 150px;
              transform: scale(1.05) rotate(550deg);
            }
            92% {
              left: 320px;
              top: 160px;
              transform: scale(1.1) rotate(600deg);
            }
            98% {
              left: 250px;
              top: 140px;
              opacity: 1;
              transform: scale(1) rotate(630deg);
            }
            100% {
              left: 250px;
              top: 120px;
              opacity: 0;
              transform: scale(0.8) rotate(660deg);
            }
          }
          
          @keyframes letterPulse {
            0%, 100% { 
              transform: translateY(0) scale(1);
              text-shadow: 0 0 10px rgba(239, 68, 68, 0.6);
            }
            50% { 
              transform: translateY(-3px) scale(1.02);
              text-shadow: 0 0 20px rgba(239, 68, 68, 0.9);
            }
          }
          
          @keyframes binaryFlicker {
            0%, 100% { 
              opacity: 0.7;
              text-shadow: 0 0 5px rgba(239, 68, 68, 0.3);
            }
            50% { 
              opacity: 1;
              text-shadow: 0 0 15px rgba(239, 68, 68, 0.8);
            }
          }
        `}</style>
      </div>
    );
  }

  if (showIntro) {
    return <IntroSequence onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Notification Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-red-500/30">
        <div className="flex items-center justify-between px-6 py-2">
          <div className="flex items-center space-x-6">
            <div className="text-2xl font-black bg-gradient-to-r from-red-400 via-pink-500 to-red-600 bg-clip-text text-transparent">
              OMNIA
            </div>
            <div className="flex items-center space-x-2 text-red-400/80">
              <Bell size={16} />
              <span className="text-sm">3 notifications</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* System Metrics */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-red-400/80">
                <Cpu size={16} />
                <span className="text-sm">{systemMetrics.cpu}%</span>
              </div>
              <div className="flex items-center space-x-2 text-red-400/80">
                <MemoryStick size={16} />
                <span className="text-sm">{systemMetrics.memory}%</span>
              </div>
              <div className="flex items-center space-x-2 text-red-400/80">
                <Network size={16} />
                <span className="text-sm">{systemMetrics.network}%</span>
              </div>
              <div className="flex items-center space-x-2 text-red-400/80">
                <Thermometer size={16} />
                <span className="text-sm">{systemMetrics.temperature}°C</span>
              </div>
            </div>

            {/* System Controls */}
            <div className="flex items-center space-x-3">
              <div className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 cursor-pointer">
                <Wifi size={16} className="text-red-400" />
              </div>
              <div className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 cursor-pointer">
                <Volume2 size={16} className="text-red-400" />
              </div>
              <div className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 cursor-pointer">
                <Battery size={16} className="text-red-400" />
              </div>
            </div>

            {/* Time and Date */}
            <div className="flex items-center space-x-2 text-red-400/80">
              <Calendar size={16} />
              <span className="text-sm">{currentTime.toLocaleDateString()}</span>
              <Clock size={16} />
              <span className="text-sm">{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Notifications Panel */}
        <div className="max-h-0 overflow-hidden transition-all duration-300 hover:max-h-40">
          <div className="px-6 py-3 space-y-2">
            {notifications.map(notification => (
              <div 
                key={notification.id}
                className="flex items-center justify-between p-2 rounded-lg bg-red-500/10 border border-red-500/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-red-400 font-medium">{notification.title}</div>
                  <div className="text-red-400/70 text-sm">{notification.message}</div>
                </div>
                <div className="text-red-400/50 text-xs">{notification.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: uiSettings.particleEffects ? 1 : 0 }}
      />

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div 
          className={`
            absolute inset-0 bg-gradient-to-br ${theme.background}
            opacity-80 transition-colors duration-500
          `}
        />

        {/* Dynamic spotlight following cursor */}
        <div 
          className="absolute inset-0 opacity-50 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(255,0,128,0.15), 
              rgba(121,40,202,0.15), 
              transparent)`
          }}
        />

        {/* Animated gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 100px,
                rgba(255,0,128,0.1) 200px,
                transparent 300px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 100px,
                rgba(121,40,202,0.1) 200px,
                transparent 300px
              )
            `,
            animation: 'slide 60s linear infinite'
          }}
        />

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            animation: 'grid-slide 20s linear infinite'
          }}
        />
      </div>

      {/* Central Clock Widget */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-pink-600/20 to-red-500/20 rounded-full blur-xl group-hover:from-red-500/30 group-hover:via-pink-600/30 group-hover:to-red-500/30 transition-all duration-300" />
          <div className="relative bg-black/50 backdrop-blur-xl rounded-full p-8 border border-red-500/30 group-hover:border-red-500/50 transition-all duration-300">
            <div className="text-6xl font-bold text-red-400 tabular-nums">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-center text-red-400/70 mt-2">
              {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      {/* System Metrics Widget */}
      <div className="fixed bottom-24 right-8 z-10">
        <div className="bg-black/50 backdrop-blur-xl rounded-2xl border border-red-500/30 p-4 w-64">
          <div className="text-red-400 font-semibold mb-4">System Metrics</div>
          <div className="space-y-3">
            {[
              { icon: Cpu, label: 'CPU Usage', value: systemMetrics.cpu },
              { icon: MemoryStick, label: 'Memory', value: systemMetrics.memory },
              { icon: Network, label: 'Network', value: systemMetrics.network },
              { icon: Thermometer, label: 'Temperature', value: systemMetrics.temperature }
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-red-400/70">
                    <Icon size={14} />
                    <span>{label}</span>
                  </div>
                  <span className="text-red-400">{value}%</span>
                </div>
                <div className="h-1 bg-red-500/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-pink-600 transition-all duration-300"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content wrapper */}
      <div className={`
        relative z-10 min-h-screen pt-16 desktop-area
        ${uiSettings.blurEffects ? 'theme-blur' : ''}
        ${!uiSettings.animations ? 'reduce-animations' : ''}
        theme-brightness
      `}>
        {/* Desktop Content */}
        <div className="p-8 pt-20">
          {/* Folder Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {folders.map((folder, i) => (
              <div
                key={folder.id}
                onClick={() => folder.id === 'samantha' ? setShowSamantha(true) : handleWindowOpen(`folder-${folder.id}`)}
                className={`
                  relative group cursor-pointer transition-all duration-500
                  hover:scale-110 hover:-translate-y-2
                  ${folder.id === 'samantha' ? 'animate-pulse' : ''}
                `}
                style={{ 
                  animation: `slideInUp 0.8s ease-out ${i * 150}ms both`,
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                <div 
                  className={`
                    relative w-20 h-20 bg-gradient-to-br ${folder.color}
                    rounded-2xl flex items-center justify-center mb-3
                    shadow-lg group-hover:shadow-2xl transition-all duration-500
                    transform group-hover:rotate-12 group-hover:scale-110
                  `}
                >
                  
                  {/* Special effects for Samantha folder */}
                  {folder.id === 'samantha' && (
                    <>
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-400/40 to-pink-600/40 rounded-2xl blur-md animate-pulse" />
                      <div className="absolute -inset-2 bg-gradient-to-r from-red-400/20 to-pink-600/20 rounded-2xl blur-lg animate-ping" />
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400/30 to-pink-600/30 rounded-2xl animate-spin" style={{
                        animation: 'sparkle 2s ease-in-out infinite alternate'
                      }} />
                    </>
                  )}

                  {/* Neural Network special effects */}
                  {folder.id === 'neural' && (
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-transparent to-purple-600/20 animate-pulse" 
                           style={{ animation: 'neuralPulse 1.5s ease-in-out infinite' }} />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/10 to-transparent"
                           style={{ animation: 'neuralScan 3s linear infinite' }} />
                    </div>
                  )}

                  {/* System Core binary rain effect */}
                  {folder.id === 'system' && (
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 opacity-30"
                           style={{ 
                             background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)',
                             animation: 'systemScan 2s ease-in-out infinite'
                           }} />
                    </div>
                  )}

                  {/* Web Interface signal waves */}
                  {folder.id === 'web' && (
                    <>
                      <div className="absolute -inset-1 rounded-2xl border border-cyan-400/30 animate-pulse" />
                      <div className="absolute -inset-2 rounded-2xl border border-cyan-400/20"
                           style={{ animation: 'signalWave 2s ease-in-out infinite' }} />
                    </>
                  )}
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* 3D lighting effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(
                        135deg,
                        rgba(255,255,255,0.3) 0%,
                        transparent 50%,
                        rgba(0,0,0,0.2) 100%
                      )`
                    }}
                  />

                  {/* Icon floating animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                         style={{ animation: 'iconFloat 3s ease-in-out infinite' }}>
                      {folder.icon}
                    </div>
                  </div>
                </div>
                
                <div className="text-center transform transition-transform duration-300 group-hover:scale-105">
                  <div className="text-white text-sm font-semibold group-hover:text-red-400 transition-colors duration-300">
                    {folder.name}
                  </div>
                  <div className="text-gray-400 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {folder.description}
                  </div>
                </div>

                {/* Hover glow effect */}
                <div 
                  className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(
                      circle at center,
                      ${folder.color.includes('red') ? 'rgba(239,68,68,0.3)' : 
                        folder.color.includes('pink') ? 'rgba(236,72,153,0.3)' :
                        folder.color.includes('rose') ? 'rgba(244,63,94,0.3)' :
                        'rgba(255,0,128,0.3)'} 0%,
                      transparent 70%
                    )`,
                    filter: 'blur(12px)',
                    animation: 'glowPulse 2s ease-in-out infinite'
                  }}
                />

                {/* Data stream particles for enhanced theme */}
                <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-1/2 w-px h-8 bg-gradient-to-b from-transparent to-white/30"
                       style={{ animation: 'dataStream 1s ease-in-out infinite' }} />
                  <div className="absolute bottom-0 right-1/2 w-px h-8 bg-gradient-to-t from-transparent to-white/30"
                       style={{ animation: 'dataStream 1s ease-in-out infinite 0.5s' }} />
                  <div className="absolute left-0 top-1/2 h-px w-8 bg-gradient-to-r from-transparent to-white/30"
                       style={{ animation: 'dataStreamH 1s ease-in-out infinite 0.25s' }} />
                  <div className="absolute right-0 bottom-1/2 h-px w-8 bg-gradient-to-l from-transparent to-white/30"
                       style={{ animation: 'dataStreamH 1s ease-in-out infinite 0.75s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Windows */}
        {activeWindow === 'settings' && (
          <SystemSettings onClose={handleWindowClose} />
        )}

        {activeWindow === 'terminal' && (
          <Terminal onClose={handleWindowClose} />
        )}

        {activeWindow?.startsWith('folder-') && (
          <FolderView 
            folderId={activeWindow.replace('folder-', '')} 
            onClose={handleWindowClose} 
          />
        )}

        {/* Samantha Chat */}
        {showSamantha && (
          <SamanthaChat onClose={() => setShowSamantha(false)} />
        )}

        {/* Desktop Widgets */}
        {widgets.map(widget => (
          <div
            key={widget.id}
            className="fixed z-30 bg-black/80 backdrop-blur-xl border border-red-500/30 rounded-2xl overflow-hidden"
            style={{
              left: widget.x,
              top: widget.y,
              width: widget.width,
              height: widget.minimized ? 40 : widget.height,
              transition: 'height 0.3s ease'
            }}
            onMouseDown={() => setDraggedWidget(widget.id)}
          >
            {/* Widget Header */}
            <div className="flex items-center justify-between p-3 bg-red-500/10 border-b border-red-500/20">
              <span className="text-red-400 font-medium text-sm">{widget.name}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => minimizeWidget(widget.id)}
                  className="text-red-400/60 hover:text-red-400 transition-colors"
                >
                  {widget.minimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button
                  onClick={() => removeWidget(widget.id)}
                  className="text-red-400/60 hover:text-red-400 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
            {/* Widget Content */}
            {!widget.minimized && (
              <div className="overflow-hidden">
                {widget.component}
              </div>
            )}
          </div>
        ))}

        {/* Command Palette */}
        {showCommandPalette && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 bg-black/50 backdrop-blur-sm">
            <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-red-500/30 w-full max-w-2xl mx-4 overflow-hidden">
              {/* Search Header */}
              <div className="flex items-center p-4 border-b border-red-500/20">
                <Command className="w-5 h-5 text-red-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search commands, apps, and actions..."
                  value={commandSearch}
                  onChange={(e) => setCommandSearch(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                  autoFocus
                />
                <kbd className="ml-3 px-2 py-1 text-xs text-gray-400 bg-gray-800 rounded">ESC</kbd>
              </div>
              
              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {filteredActions.length > 0 ? (
                  <div className="p-2">
                    {filteredActions.map(action => (
                      <button
                        key={action.id}
                        onClick={() => {
                          action.action();
                          setShowCommandPalette(false);
                          setCommandSearch('');
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 transition-colors text-left"
                      >
                        <div className="text-red-400">{action.icon}</div>
                        <div className="flex-1">
                          <div className="text-white font-medium">{action.name}</div>
                          <div className="text-gray-400 text-sm">{action.description}</div>
                        </div>
                        <div className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                          {action.category}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-400">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <div>No results found</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Context Menu */}
        {showContextMenu && (
          <div
            className="fixed z-50 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-red-500/30 py-2 min-w-48"
            style={{
              left: contextMenuPosition.x,
              top: contextMenuPosition.y,
            }}
          >
            <button
              onClick={() => {
                addWidget('system-monitor');
                setShowContextMenu(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-red-500/10 flex items-center gap-3 text-white"
            >
              <Plus size={16} className="text-red-400" />
              Add Widget
            </button>
            <button
              onClick={() => {
                setShowCommandPalette(true);
                setShowContextMenu(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-red-500/10 flex items-center gap-3 text-white"
            >
              <Command size={16} className="text-red-400" />
              Command Palette
            </button>
            <hr className="my-2 border-red-500/20" />
            <button
              onClick={() => {
                handleWindowOpen('settings');
                setShowContextMenu(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-red-500/10 flex items-center gap-3 text-white"
            >
              <Settings size={16} className="text-red-400" />
              Settings
            </button>
            <button
              onClick={() => {
                window.location.reload();
                setShowContextMenu(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-red-500/10 flex items-center gap-3 text-white"
            >
              <RotateCw size={16} className="text-red-400" />
              Refresh
            </button>
          </div>
        )}

        {/* Quick Launch Dock */}
        {showQuickLaunch && (
          <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40">
            <div className="bg-black/90 backdrop-blur-xl rounded-2xl border border-red-500/30 p-4">
              <div className="flex items-center space-x-4">
                <div className="text-red-400 text-sm font-medium">Quick Launch</div>
                <div className="flex items-center space-x-2">
                  {[
                    { icon: <Settings size={20} />, action: () => handleWindowOpen('settings'), label: 'Settings' },
                    { icon: <Code2 size={20} />, action: () => handleWindowOpen('terminal'), label: 'Terminal' },
                    { icon: <Sparkles size={20} />, action: () => setShowSamantha(true), label: 'Samantha' },
                    { icon: <Command size={20} />, action: () => setShowCommandPalette(true), label: 'Commands' },
                    { icon: <Plus size={20} />, action: () => addWidget('system-monitor'), label: 'Add Widget' }
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item.action();
                        setShowQuickLaunch(false);
                      }}
                      className="group relative p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-110"
                      title={item.label}
                    >
                      {item.icon}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Keyboard Shortcuts Help */}
        <div className="fixed bottom-24 right-80 z-10 bg-black/50 backdrop-blur-xl rounded-xl border border-red-500/20 p-3 text-xs text-red-400/60">
          <div>⌘K / Ctrl+K - Command Palette</div>
          <div>Ctrl+Space - Quick Launch</div>
          <div>Right Click - Context Menu</div>
        </div>

        {/* Taskbar */}
        <Taskbar 
          onSettingsClick={() => handleWindowOpen('settings')}
          onTerminalClick={() => handleWindowOpen('terminal')}
          onFolderClick={(folderId) => handleWindowOpen(`folder-${folderId}`)}
          onSamanthaClick={() => setShowSamantha(true)}
        />
      </div>

      {/* Global Animations */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.9) rotateX(10deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0);
          }
        }

        @keyframes slide {
          from { background-position: 0 0; }
          to { background-position: 1000px 1000px; }
        }

        @keyframes grid-slide {
          from { transform: translate(0, 0); }
          to { transform: translate(100px, 100px); }
        }

        @keyframes rotate-y-12 {
          to { transform: rotateY(12deg); }
        }

        .theme-blur {
          backdrop-filter: blur(10px);
        }

        .theme-brightness {
          backdrop-filter: brightness(1.1);
        }

        .reduce-animations * {
          animation: none !important;
          transition: none !important;
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(2deg); }
        }

        @keyframes sparkle {
          0% { opacity: 0.3; transform: rotate(0deg) scale(0.8); }
          100% { opacity: 0.6; transform: rotate(180deg) scale(1.1); }
        }

        @keyframes neuralPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }

        @keyframes neuralScan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes systemScan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes signalWave {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 0.4; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.95); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        @keyframes dataStream {
          0% { opacity: 0; transform: scaleY(0); }
          50% { opacity: 1; transform: scaleY(1); }
          100% { opacity: 0; transform: scaleY(0); }
        }

        @keyframes dataStreamH {
          0% { opacity: 0; transform: scaleX(0); }
          50% { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0; transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
};

export default Desktop; 