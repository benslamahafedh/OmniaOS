import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Settings, Folder, Brain, Globe, Heart, Zap, FileText, 
  Network, Activity, Bell, Wifi, Battery, Volume2, 
  Calendar, Clock, Sun, Moon, Cpu, HardDrive, 
  MemoryStick, Thermometer
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

const Desktop: React.FC = () => {
  const { theme, uiSettings } = useTheme();
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [showSamantha, setShowSamantha] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showIntro, setShowIntro] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'AGI Update', message: 'Neural network optimization complete', time: '2m ago', type: 'success' },
    { id: 2, title: 'System', message: 'Quantum processing cores synchronized', time: '5m ago', type: 'info' },
    { id: 3, title: 'Security', message: 'Neural firewall updated', time: '10m ago', type: 'warning' }
  ]);
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 42,
    memory: 68,
    network: 89,
    temperature: 45
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
        cpu: Math.floor(Math.random() * 30) + 40,
        memory: Math.floor(Math.random() * 20) + 60,
        network: Math.floor(Math.random() * 20) + 75,
        temperature: Math.floor(Math.random() * 10) + 40
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

  // Handle intro completion
  const handleIntroComplete = () => {
    if (introCompletedRef.current) return;
    introCompletedRef.current = true;
    setShowIntro(false);
    setTimeout(() => setIsBooted(true), 500);
  };

  const folders: FolderItem[] = [
    {
      id: 'system',
      name: 'System Core',
      icon: <Settings className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-700',
      description: 'Core system files and settings'
    },
    {
      id: 'docs',
      name: 'Documentation',
      icon: <FileText className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-700',
      description: 'System documentation and guides'
    },
    {
      id: 'neural',
      name: 'Neural Network',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-700',
      description: 'AI processing modules'
    },
    {
      id: 'web',
      name: 'Web Interface',
      icon: <Globe className="w-8 h-8" />,
      color: 'from-cyan-500 to-cyan-700',
      description: 'Internet connectivity'
    },
    {
      id: 'samantha',
      name: 'Samantha Core',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-red-500 to-red-700',
      description: 'AGI consciousness module'
    },
    {
      id: 'apps',
      name: 'Applications',
      icon: <Folder className="w-8 h-8" />,
      color: 'from-green-500 to-green-700',
      description: 'Installed applications'
    }
  ];

  const handleWindowOpen = (windowId: string) => {
    setActiveWindow(windowId);
  };

  const handleWindowClose = () => {
    setActiveWindow(null);
  };

  // Render intro or desktop
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
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
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
      <div className="fixed bottom-24 right-8 z-20">
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
        relative z-10 min-h-screen pt-16
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
                    relative w-24 h-24 bg-gradient-to-br ${folder.color}
                    rounded-3xl flex items-center justify-center mb-3
                    shadow-lg group-hover:shadow-2xl transition-all duration-500
                    transform group-hover:rotate-y-12
                  `}
                >
                  {folder.icon}
                  
                  {/* Special effects for Samantha folder */}
                  {folder.id === 'samantha' && (
                    <>
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-400/40 to-pink-600/40 rounded-3xl blur-md animate-pulse" />
                      <div className="absolute -inset-2 bg-gradient-to-r from-red-400/20 to-pink-600/20 rounded-3xl blur-lg animate-ping" />
                    </>
                  )}
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* 3D lighting effect */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(
                        135deg,
                        rgba(255,255,255,0.3) 0%,
                        transparent 50%,
                        rgba(0,0,0,0.2) 100%
                      )`
                    }}
                  />
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
                  className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(
                      circle at center,
                      ${folder.color.includes('red') ? 'rgba(255,0,128,0.2)' : 
                        folder.color.includes('blue') ? 'rgba(0,112,243,0.2)' :
                        folder.color.includes('purple') ? 'rgba(121,40,202,0.2)' :
                        folder.color.includes('green') ? 'rgba(0,255,128,0.2)' :
                        'rgba(255,255,255,0.2)'} 0%,
                      transparent 70%
                    )`,
                    filter: 'blur(8px)'
                  }}
                />
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
      `}</style>
    </div>
  );
};

export default Desktop; 