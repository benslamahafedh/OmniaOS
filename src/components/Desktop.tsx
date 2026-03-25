import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useMobile } from "../hooks/useMobile";
import loadingGif from "../assets/bcf67b6246b68b1f43a98b219fabe105.gif";
import {
  Settings,
  Network,
  Activity,
  Wifi,
  Battery,
  Volume2,
  Calendar,
  Clock,
  Cpu,
  MemoryStick,
  Thermometer,
  Server,
  Database,
  Radio,
  Grid3X3,
  Code2,
  Search,
  Command,
  Maximize2,
  Minimize2,
  X,
  RotateCw,
  Plus,
  Send,
  Sparkles,
} from "lucide-react";
import Taskbar from "./Taskbar";
import SystemSettings from "./SystemSettings";
import Terminal from "./Terminal";
import FolderView from "./FolderView";
import XLogo from "./XLogo";
import OS1Logo from "./OmniaLogo";

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
  const { uiSettings } = useTheme();
  const { isMobile } = useMobile();
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [commandSearch, setCommandSearch] = useState("");
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [showQuickLaunch, setShowQuickLaunch] = useState(false);
  // @ts-ignore - Future feature variables
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 42,
    memory: 68,
    network: 89,
    temperature: 45,
    diskUsage: 75,
    uptime: "2h 34m",
    processes: 247,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // @ts-ignore - Future feature variables
  const [particleSystem, setParticleSystem] = useState<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }>
  >([]);

  // Update time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate system metrics updates
  useEffect(() => {
    const updateMetrics = () => {
      setSystemMetrics((prev) => ({
        ...prev,
        cpu: Math.floor(Math.random() * 30) + 40,
        memory: Math.floor(Math.random() * 20) + 60,
        network: Math.floor(Math.random() * 20) + 75,
        temperature: Math.floor(Math.random() * 10) + 40,
        diskUsage: Math.floor(Math.random() * 20) + 65,
        processes: Math.floor(Math.random() * 50) + 230,
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
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Initialize particle system
  useEffect(() => {
    const colors = ["#f74e28", "#FF0000", "#7928CA", "#0070F3"];
    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.2,
    }));
    setParticleSystem(particles);
  }, []);

  // Animate particles
  useEffect(() => {
    if (!canvasRef.current || !uiSettings.particleEffects) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      if (!lastTime) lastTime = currentTime;
      const delta = (currentTime - lastTime) / 16; // Target 60fps
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      setParticleSystem((prevParticles) =>
        prevParticles.map((particle) => {
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
          const speed = Math.sqrt(
            particle.vx * particle.vx + particle.vy * particle.vy,
          );
          if (speed > 5) {
            particle.vx = (particle.vx / speed) * 5;
            particle.vy = (particle.vy / speed) * 5;
          }

          // Draw particle
          ctx.beginPath();
          ctx.arc(x, y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `${particle.color}${Math.floor(particle.alpha * 255)
            .toString(16)
            .padStart(2, "0")}`;
          ctx.fill();

          // Draw glow
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            particle.size * 3,
          );
          gradient.addColorStop(0, `${particle.color}33`);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.arc(x, y, particle.size * 3, 0, Math.PI * 2);
          ctx.fill();

          return {
            ...particle,
            x: x < 0 ? canvas.width : x > canvas.width ? 0 : x,
            y: y < 0 ? canvas.height : y > canvas.height ? 0 : y,
          };
        }),
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Start animation
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition, uiSettings.particleEffects]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette (Ctrl+K or Cmd+K)
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowCommandPalette(true);
      }

      // Quick launch (Ctrl+Space)
      if (e.ctrlKey && e.key === " ") {
        e.preventDefault();
        setShowQuickLaunch(!showQuickLaunch);
      }

      // Escape to close modals
      if (e.key === "Escape") {
        setShowCommandPalette(false);
        setShowQuickLaunch(false);
        setShowContextMenu(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showQuickLaunch]);

  // Context menu handling
  useEffect(() => {
    const handleRightClick = (e: MouseEvent) => {
      if (
        e.target === document.body ||
        (e.target as Element).classList.contains("desktop-area")
      ) {
        e.preventDefault();
        setContextMenuPosition({ x: e.clientX, y: e.clientY });
        setShowContextMenu(true);
      }
    };

    const handleClick = () => {
      setShowContextMenu(false);
    };

    document.addEventListener("contextmenu", handleRightClick);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("contextmenu", handleRightClick);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  // Quick actions for command palette
  const quickActions: QuickAction[] = [
    {
      id: "open-settings",
      name: "Open Settings",
      description: "Access system settings and preferences",
      icon: <Settings className="w-4 h-4" />,
      action: () => handleWindowOpen("settings"),
      category: "System",
    },
    {
      id: "open-terminal",
      name: "Open Terminal",
      description: "Launch command line interface",
      icon: <Code2 className="w-4 h-4" />,
      action: () => handleWindowOpen("terminal"),
      category: "Development",
    },
    {
      id: "add-widget",
      name: "Add Widget",
      description: "Add a new desktop widget",
      icon: <Plus className="w-4 h-4" />,
      action: () => addWidget("system-monitor"),
      category: "Desktop",
    },
    {
      id: "refresh-desktop",
      name: "Refresh Desktop",
      description: "Reload desktop interface",
      icon: <RotateCw className="w-4 h-4" />,
      action: () => window.location.reload(),
      category: "System",
    },
  ];

  // Filter actions based on search
  const filteredActions = quickActions.filter(
    (action) =>
      action.name.toLowerCase().includes(commandSearch.toLowerCase()) ||
      action.description.toLowerCase().includes(commandSearch.toLowerCase()) ||
      action.category.toLowerCase().includes(commandSearch.toLowerCase()),
  );

  // Widget management functions
  const addWidget = (type: string) => {
    // Don't add system monitor widgets on mobile
    if (isMobile && type === "system-monitor") {
      return;
    }

    const newWidget: Widget = {
      id: `widget-${Date.now()}`,
      name: type === "system-monitor" ? "System Monitor" : "New Widget",
      component:
        type === "system-monitor" ? (
          renderSystemMonitorWidget()
        ) : (
          <div>Widget</div>
        ),
      x: Math.random() * 300 + 100,
      y: Math.random() * 200 + 150,
      width: 300,
      height: 200,
      minimized: false,
    };
    setWidgets((prev) => [...prev, newWidget]);
  };

  const removeWidget = (id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
  };

  const minimizeWidget = (id: string) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w)),
    );
  };

  // Render system monitor widget
  const renderSystemMonitorWidget = () => (
    <div className={`p-4 h-full ${isMobile ? "mobile-system-metrics" : ""}`}>
      <div
        className={`
        ${
          isMobile
            ? "mobile-system-metrics grid grid-cols-2 gap-3 h-full text-sm"
            : "grid grid-cols-2 gap-3 h-full text-sm"
        }
      `}
      >
        <div className={`space-y-2 ${isMobile ? "mobile-metric-item" : ""}`}>
          <div className="flex items-center justify-between">
            <span className="text-orange-500/80">CPU</span>
            <span
              className={`text-white ${isMobile ? "mobile-metric-value" : ""}`}
            >
              {systemMetrics.cpu}%
            </span>
          </div>
          <div className="h-1 bg-orange-500/20 rounded-full">
            <div
              className="h-1 bg-orange-500 rounded-full"
              style={{ width: `${systemMetrics.cpu}%` }}
            />
          </div>
        </div>
        <div className={`space-y-2 ${isMobile ? "mobile-metric-item" : ""}`}>
          <div className="flex items-center justify-between">
            <span className="text-orange-400/80">Memory</span>
            <span
              className={`text-white ${isMobile ? "mobile-metric-value" : ""}`}
            >
              {systemMetrics.memory}%
            </span>
          </div>
          <div className="h-1 bg-orange-500/20 rounded-full">
            <div
              className="h-1 bg-orange-500 rounded-full"
              style={{ width: `${systemMetrics.memory}%` }}
            />
          </div>
        </div>
        <div className={`space-y-2 ${isMobile ? "mobile-metric-item" : ""}`}>
          <div className="flex items-center justify-between">
            <span className="text-orange-400/80">Disk</span>
            <span
              className={`text-white ${isMobile ? "mobile-metric-value" : ""}`}
            >
              {systemMetrics.diskUsage}%
            </span>
          </div>
          <div className="h-1 bg-orange-500/20 rounded-full">
            <div
              className="h-1 bg-orange-500 rounded-full"
              style={{ width: `${systemMetrics.diskUsage}%` }}
            />
          </div>
        </div>
        <div className={`space-y-2 ${isMobile ? "mobile-metric-item" : ""}`}>
          <div className="flex items-center justify-between">
            <span
              className={`text-orange-400/80 ${isMobile ? "mobile-metric-label" : ""}`}
            >
              Uptime
            </span>
            <span
              className={`text-white text-xs ${isMobile ? "mobile-metric-value" : ""}`}
            >
              {systemMetrics.uptime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const folders: FolderItem[] = [
    {
      id: "system",
      name: "System Core",
      icon: <Server className="w-6 h-6" />,
      color: "from-orange-800 to-orange-950",
      description: "Core system files and settings",
    },
    {
      id: "docs",
      name: "Documentation",
      icon: <Database className="w-6 h-6" />,
      color: "from-orange-700 to-orange-900",
      description: "System documentation and guides",
    },
    {
      id: "neural",
      name: "Neural Network",
      icon: <Activity className="w-6 h-6" />,
      color: "from-orange-800 to-orange-950",
      description: "AI processing modules",
    },
    {
      id: "web",
      name: "Web Interface",
      icon: <Radio className="w-6 h-6" />,
      color: "from-orange-700 to-orange-900",
      description: "Internet connectivity",
    },
    {
      id: 'samantha',
      name: 'Samantha Core',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-700',
      description: 'AGI consciousness module'
    },
    {
      id: "apps",
      name: "Applications",
      icon: <Grid3X3 className="w-6 h-6" />,
      color: "from-orange-800 to-orange-950",
      description: "Installed applications",
    },
  ];

  const handleWindowOpen = (windowId: string) => {
    setActiveWindow(windowId);
  };

  const handleWindowClose = () => {
    setActiveWindow(null);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Notification Bar */}
      <div
        className={`
        fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-orange-700/20
        ${isMobile ? "h-14" : "h-auto"}
      `}
      >
        <div
          className={`
          flex items-center justify-between px-6 py-2
          ${isMobile ? "px-4 py-2" : "px-6 py-3"}
        `}
        >
          <div className="relative flex-1">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg width="250" height="250" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    
    <linearGradient id="g1" x1="125" y1="256" x2="205" y2="256" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="1"/>
    </linearGradient>

    <linearGradient id="g2" x1="205" y1="256" x2="285" y2="256" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.35"/>
    </linearGradient>

    <linearGradient id="g3" x1="285" y1="256" x2="365" y2="256" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.12"/>
    </linearGradient>

    <linearGradient id="g4" x1="365" y1="256" x2="285" y2="256" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.55"/>
    </linearGradient>

    <linearGradient id="g5" x1="285" y1="256" x2="205" y2="256" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.55"/>
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="1"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.75"/>
    </linearGradient>

    <linearGradient id="g6" x1="205" y1="256" x2="125" y2="256" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <path d="M 125 256 C 145 220, 185 220, 205 256"
        fill="none" stroke="url(#g1)" stroke-width="4"
        stroke-linecap="round" stroke-linejoin="round"/>

  <path d="M 205 256 C 225 292, 265 292, 285 256"
        fill="none" stroke="url(#g2)" stroke-width="4"
        stroke-linecap="round" stroke-linejoin="round"/>

  <path d="M 285 256 C 305 220, 345 220, 365 256"
        fill="none" stroke="url(#g3)" stroke-width="4"
        stroke-linecap="round" stroke-linejoin="round"/>

  <path d="M 365 256 C 345 292, 305 292, 285 256"
        fill="none" stroke="url(#g4)" stroke-width="4"
        stroke-linecap="round" stroke-linejoin="round"/>

  <path d="M 285 256 C 265 220, 225 220, 205 256"
        fill="none" stroke="url(#g5)" stroke-width="4"
        stroke-linecap="round" stroke-linejoin="round"/>

  <path d="M 205 256 C 185 292, 145 292, 125 256"
        fill="none" stroke="url(#g6)" stroke-width="4"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Social Media Links - Hide on mobile or show simplified */}
            {!isMobile && (
              <div className="flex items-center space-x-3">
                
                <a
                  href="https://x.com/0xOS1dotfun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-orange-800/10 hover:bg-orange-800/20 cursor-pointer transition-all duration-300 group border border-orange-700/20"
                  title="OS1 X (Alt)"
                >
                  <XLogo
                    size={16}
                    className="text-gray-200 group-hover:text-white"
                  />
                </a>
                <a
                  href="https://t.me/TheOS1Protocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-orange-800/10 hover:bg-orange-800/20 cursor-pointer transition-all duration-300 group border border-orange-700/20"
                  title="OS1 Telegram"
                >
                  <Send
                    size={16}
                    className="text-gray-200 group-hover:text-white"
                  />
                </a>
                <a
                  href="https://github.com/jesuscopado"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="OS1 GitHub"
                  className="p-2 rounded-lg bg-orange-800/10 hover:bg-orange-800/20 cursor-pointer transition-all duration-300 group border border-orange-700/20"
                >
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="text-gray-200 group-hover:text-white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.624-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-6">
            {/* System Metrics - Simplified on mobile */}
            {isMobile ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 text-orange-300/80">
                  <Cpu size={12} />
                  <span className="text-xs font-light">
                    {systemMetrics.cpu}%
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-orange-300/80">
                  <MemoryStick size={12} />
                  <span className="text-xs font-light">
                    {systemMetrics.memory}%
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-orange-300/80">
                  <Cpu size={16} className="text-orange-400/60" />
                  <span className="text-sm font-light tracking-wide">
                    {systemMetrics.cpu}%
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-orange-300/80">
                  <MemoryStick size={16} className="text-orange-400/60" />
                  <span className="text-sm font-light tracking-wide">
                    {systemMetrics.memory}%
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-orange-300/80">
                  <Network size={16} className="text-orange-400/60" />
                  <span className="text-sm font-light tracking-wide">
                    {systemMetrics.network}%
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-orange-300/80">
                  <Thermometer size={16} className="text-orange-400/60" />
                  <span className="text-sm font-light tracking-wide">
                    {systemMetrics.temperature}°C
                  </span>
                </div>
              </div>
            )}

            {/* System Controls - Simplified on mobile */}
            {!isMobile && (
              <div className="flex items-center space-x-3">
                <div className="p-1.5 rounded-lg bg-orange-700/10 hover:bg-orange-700/20 cursor-pointer border border-orange-500/20 transition-all duration-300">
                  <Wifi size={16} className="text-orange-300" />
                </div>
                <div className="p-1.5 rounded-lg bg-orange-700/10 hover:bg-orange-700/20 cursor-pointer border border-orange-500/20 transition-all duration-300">
                  <Volume2 size={16} className="text-orange-300" />
                </div>
                <div className="p-1.5 rounded-lg bg-orange-700/10 hover:bg-orange-700/20 cursor-pointer border border-orange-500/20 transition-all duration-300">
                  <Battery size={16} className="text-orange-300" />
                </div>
              </div>
            )}

            {/* Time and Date - Mobile friendly */}
            <div
              className={`
              flex items-center space-x-2 text-orange-200/80 font-light
              ${isMobile ? "space-x-1" : "space-x-2"}
            `}
            >
              {isMobile ? (
                <>
                  <Clock size={12} />
                  <span className="text-xs tracking-wide">
                    {currentTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </>
              ) : (
                <>
                  <Calendar size={16} className="text-orange-400/60" />
                  <span className="text-sm tracking-wide">
                    {currentTime.toLocaleDateString()}
                  </span>
                  <Clock size={16} className="text-orange-400/60" />
                  <span className="text-sm tracking-wide">
                    {currentTime.toLocaleTimeString()}
                  </span>
                </>
              )}
            </div>
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
        {/* Base gradient - enhanced orange theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-orange-950/20 to-black opacity-90 transition-colors duration-500" />

        {/* Dynamic spotlight following cursor - refined */}
        <div
          className="absolute inset-0 opacity-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(236,72,153,0.15), 
              rgba(190,24,93,0.12), 
              transparent)`,
          }}
        />

        {/* Subtle flowing gradient overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 120px,
                rgba(236,72,153,0.08) 240px,
                transparent 360px
              ),
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 120px,
                rgba(190,24,93,0.06) 240px,
                transparent 360px
              )
            `,
            animation: "slide 80s linear infinite",
          }}
        />

        {/* Refined grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(#562013 1px, transparent 1px),
              linear-gradient(90deg, #562013 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
            animation: "grid-slide 30s linear infinite",
          }}
        />
      </div>

      {/* Brand GIF Full Screen Background */}
      <div className="fixed inset-0 z-5">
        <div
          className="w-full h-full opacity-20"
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          <img
            src={loadingGif}
            alt="OS1 Brand"
            className="w-full h-full object-cover"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              transform: "translate3d(0, 0, 0)",
              imageRendering: "optimizeSpeed" as any,
              WebkitTransform: "translate3d(0, 0, 0)",
              WebkitBackfaceVisibility: "hidden",
              WebkitPerspective: "1000px",
            }}
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </div>
      </div>

      {/* Central Clock Widget - Desktop only */}
      {!isMobile && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative group">
            <div className="absolute -inset-6 bg-gradient-to-r from-orange-500/20 via-orange-400/20 to-orange-300/20 rounded-full blur-xl group-hover:from-orange-500/30 group-hover:via-orange-400/30 group-hover:to-orange-300/30 transition-all duration-500" />
            <div className="relative bg-black/60 backdrop-blur-xl rounded-full p-10 border border-orange-500/20 group-hover:border-orange-400/40 transition-all duration-500">
              <div className="text-7xl font-light text-orange-200 tabular-nums tracking-wider">
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="text-center text-orange-300/70 mt-3 font-light tracking-[0.2em] text-sm">
                {currentTime.toLocaleDateString([], {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Metrics Widget - Desktop only */}
      {!isMobile && (
        <div className="fixed bottom-24 right-8 z-10">
          <div className="bg-black/60 backdrop-blur-xl rounded-2xl border border-orange-500/20 p-6 w-72">
            <div className="text-orange-300 font-light text-lg mb-6 tracking-wide">
              System Metrics
            </div>
            <div className="space-y-4">
              {[
                { icon: Cpu, label: "CPU Usage", value: systemMetrics.cpu },
                {
                  icon: MemoryStick,
                  label: "Memory",
                  value: systemMetrics.memory,
                },
                {
                  icon: Network,
                  label: "Network",
                  value: systemMetrics.network,
                },
                {
                  icon: Thermometer,
                  label: "Temperature",
                  value: systemMetrics.temperature,
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3 text-orange-300/70">
                      <Icon size={16} className="text-orange-400/60" />
                      <span className="font-light tracking-wide">{label}</span>
                    </div>
                    <span className="text-orange-200 font-light">{value}%</span>
                  </div>
                  <div className="h-1.5 bg-orange-950/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-500 rounded-full"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content wrapper */}
      <div
        className={`
        relative z-10 min-h-screen desktop-area
        ${isMobile ? "pt-14" : "pt-16"}
        ${uiSettings.blurEffects ? "theme-blur" : ""}
        ${!uiSettings.animations ? "reduce-animations" : ""}
        theme-brightness
      `}
      >
        {/* Desktop Content */}
        <div
          className={`
          ${isMobile ? "p-2 pt-16 pb-16" : "p-8 pt-20"}
        `}
        >
          {/* Folder Grid */}
          <div
            className={`
            ${
              isMobile
                ? "mobile-widget-grid grid grid-cols-3 gap-2"
                : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
            }
          `}
          >
            {folders.map((folder, i) => (
              <div
                key={folder.id}
                onClick={() => {
                  if (folder.id === 'samantha') {
                    window.open('https://www.os1samantha.fun/', '_blank');
                  } else {
                    handleWindowOpen(`folder-${folder.id}`);
                  }
                }}
                className={`
                  relative group cursor-pointer transition-all duration-500
                  hover:scale-110 hover:-translate-y-2
                `}
                style={{
                  animation: `slideInUp 0.8s ease-out ${i * 150}ms both`,
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
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
                  {/* Neural Network special effects */}
                  {folder.id === "neural" && (
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-transparent to-purple-600/20 animate-pulse"
                        style={{
                          animation: "neuralPulse 1.5s ease-in-out infinite",
                        }}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/10 to-transparent"
                        style={{ animation: "neuralScan 3s linear infinite" }}
                      />
                    </div>
                  )}

                  {/* System Core binary rain effect */}
                  {folder.id === "system" && (
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)",
                          animation: "systemScan 2s ease-in-out infinite",
                        }}
                      />
                    </div>
                  )}

                  {/* Web Interface signal waves */}
                  {folder.id === "web" && (
                    <>
                      <div className="absolute -inset-1 rounded-2xl border border-cyan-400/30 animate-pulse" />
                      <div
                        className="absolute -inset-2 rounded-2xl border border-cyan-400/20"
                        style={{
                          animation: "signalWave 2s ease-in-out infinite",
                        }}
                      />
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
                      )`,
                    }}
                  />

                  {/* Icon floating animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                      style={{ animation: "iconFloat 3s ease-in-out infinite" }}
                    >
                      {folder.icon}
                    </div>
                  </div>
                </div>

                <div className="text-center transform transition-transform duration-300 group-hover:scale-105">
                  <div className="text-gray-200 text-sm font-semibold group-hover:text-orange-300 transition-colors duration-300">
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
                      ${
                        folder.color.includes("red")
                          ? "#f74e25"
                          : folder.color.includes("orange")
                            ? "#f74e25"
                            : folder.color.includes("rose")
                              ? "#f74e25"
                              : "#f74e25"
                      } 0%,
                      transparent 70%
                    )`,
                    filter: "blur(12px)",
                    animation: "glowPulse 2s ease-in-out infinite",
                  }}
                />

                {/* Data stream particles for enhanced theme */}
                <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div
                    className="absolute top-0 left-1/2 w-px h-8 bg-gradient-to-b from-transparent to-white/30"
                    style={{ animation: "dataStream 1s ease-in-out infinite" }}
                  />
                  <div
                    className="absolute bottom-0 right-1/2 w-px h-8 bg-gradient-to-t from-transparent to-white/30"
                    style={{
                      animation: "dataStream 1s ease-in-out infinite 0.5s",
                    }}
                  />
                  <div
                    className="absolute left-0 top-1/2 h-px w-8 bg-gradient-to-r from-transparent to-white/30"
                    style={{
                      animation: "dataStreamH 1s ease-in-out infinite 0.25s",
                    }}
                  />
                  <div
                    className="absolute right-0 bottom-1/2 h-px w-8 bg-gradient-to-l from-transparent to-white/30"
                    style={{
                      animation: "dataStreamH 1s ease-in-out infinite 0.75s",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Windows */}

        {activeWindow === "settings" && (
          <div className={isMobile ? "mobile-window" : ""}>
            <SystemSettings onClose={handleWindowClose} />
          </div>
        )}

        {activeWindow === "terminal" && (
          <div className={isMobile ? "mobile-window" : ""}>
            <Terminal onClose={handleWindowClose} />
          </div>
        )}

        {activeWindow?.startsWith("folder-") && (
          <div className={isMobile ? "mobile-window" : ""}>
            <FolderView
              folderId={activeWindow.replace("folder-", "")}
              onClose={handleWindowClose}
            />
          </div>
        )}

        {/* Desktop Widgets */}
        {isMobile ? (
          /* Mobile Widget Layout - Grid based */
          <div className="mobile-widget-grid">
            {widgets
              .filter((widget) => widget.name !== "System Monitor")
              .map((widget) => (
                <div
                  key={widget.id}
                  className="mobile-widget bg-black/80 backdrop-blur-xl border border-orange-700/30 rounded-2xl overflow-hidden"
                >
                  {/* Widget Header */}
                  <div className="flex items-center justify-between p-3 bg-orange-700/10 border-b border-orange-700/20">
                    <span className="text-gray-200 font-medium text-sm">
                      {widget.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => minimizeWidget(widget.id)}
                        className="text-gray-300/60 hover:text-gray-200 transition-colors"
                      >
                        {widget.minimized ? (
                          <Maximize2 size={16} />
                        ) : (
                          <Minimize2 size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => removeWidget(widget.id)}
                        className="text-gray-300/60 hover:text-gray-200 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  {/* Widget Content */}
                  {!widget.minimized && (
                    <div className="overflow-hidden">{widget.component}</div>
                  )}
                </div>
              ))}
          </div>
        ) : (
          /* Desktop Widget Layout - Fixed positioning */
          widgets.map((widget) => (
            <div
              key={widget.id}
              className="fixed z-30 bg-black/80 backdrop-blur-xl border border-orange-700/30 rounded-2xl overflow-hidden"
              style={{
                left: widget.x,
                top: widget.y,
                width: widget.width,
                height: widget.minimized ? 40 : widget.height,
                transition: "height 0.3s ease",
              }}
              onMouseDown={() => setDraggedWidget(widget.id)}
            >
              {/* Widget Header */}
              <div className="flex items-center justify-between p-3 bg-orange-700/10 border-b border-orange-700/20">
                <span className="text-gray-200 font-medium text-sm">
                  {widget.name}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => minimizeWidget(widget.id)}
                    className="text-gray-300/60 hover:text-gray-200 transition-colors"
                  >
                    {widget.minimized ? (
                      <Maximize2 size={14} />
                    ) : (
                      <Minimize2 size={14} />
                    )}
                  </button>
                  <button
                    onClick={() => removeWidget(widget.id)}
                    className="text-gray-300/60 hover:text-gray-200 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
              {/* Widget Content */}
              {!widget.minimized && (
                <div className="overflow-hidden">{widget.component}</div>
              )}
            </div>
          ))
        )}

        {/* Command Palette */}
        {showCommandPalette && (
          <div
            className={`
            fixed inset-0 z-50 bg-black/50 backdrop-blur-sm
            ${isMobile ? "mobile-command-palette" : "flex items-start justify-center pt-32"}
          `}
          >
            <div
              className={`
              bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-orange-500/30 overflow-hidden
              ${
                isMobile
                  ? "palette-content w-full h-full max-h-none m-0 rounded-none"
                  : "w-full max-w-2xl mx-4"
              }
            `}
            >
              {/* Search Header */}
              <div
                className={`
                flex items-center border-b border-orange-500/20
                ${isMobile ? "p-4 pt-6" : "p-4"}
              `}
              >
                <Command
                  className={`text-orange-400 mr-3 ${isMobile ? "w-6 h-6" : "w-5 h-5"}`}
                />
                <input
                  type="text"
                  placeholder={
                    isMobile
                      ? "Search..."
                      : "Search commands, apps, and actions..."
                  }
                  value={commandSearch}
                  onChange={(e) => setCommandSearch(e.target.value)}
                  className={`
                    flex-1 bg-transparent text-white placeholder-gray-400 outline-none
                    ${isMobile ? "search-input text-lg" : "text-base"}
                  `}
                  autoFocus
                />
                <kbd
                  className={`
                  ml-3 px-2 py-1 text-xs text-gray-400 bg-gray-800 rounded
                  ${isMobile ? "hidden" : "block"}
                `}
                >
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div
                className={`
                overflow-y-auto
                ${isMobile ? "max-h-none h-full pb-20" : "max-h-96"}
              `}
              >
                {filteredActions.length > 0 ? (
                  <div className={isMobile ? "p-2" : "p-2"}>
                    {filteredActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => {
                          action.action();
                          setShowCommandPalette(false);
                          setCommandSearch("");
                        }}
                        className={`
                          command-item w-full flex items-center gap-3 rounded-xl hover:bg-orange-500/10 transition-colors text-left
                          ${isMobile ? "p-4" : "p-3"}
                        `}
                      >
                        <div className="text-orange-400">{action.icon}</div>
                        <div className="flex-1">
                          <div
                            className={`text-white font-medium ${isMobile ? "text-base" : "text-sm"}`}
                          >
                            {action.name}
                          </div>
                          <div
                            className={`text-gray-400 ${isMobile ? "text-sm" : "text-xs"}`}
                          >
                            {action.description}
                          </div>
                        </div>
                        <div
                          className={`
                          text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded
                          ${isMobile ? "hidden" : "block"}
                        `}
                        >
                          {action.category}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div
                    className={`text-center text-gray-400 ${isMobile ? "p-12" : "p-8"}`}
                  >
                    <Search
                      className={`mx-auto mb-2 opacity-50 ${isMobile ? "w-12 h-12" : "w-8 h-8"}`}
                    />
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
            className={`
              fixed z-50 bg-gray-900/95 backdrop-blur-xl border border-orange-500/30 py-2
              ${
                isMobile
                  ? "mobile-context-menu rounded-2xl min-w-full"
                  : "rounded-xl min-w-48"
              }
            `}
            style={
              isMobile
                ? {}
                : {
                    left: contextMenuPosition.x,
                    top: contextMenuPosition.y,
                  }
            }
          >
            <button
              onClick={() => {
                addWidget("system-monitor");
                setShowContextMenu(false);
              }}
              className={`
                context-item w-full text-left hover:bg-orange-500/10 flex items-center gap-3 text-white
                ${isMobile ? "px-6 py-4" : "px-4 py-2"}
              `}
            >
              <Plus size={isMobile ? 20 : 16} className="text-orange-400" />
              Add Widget
            </button>
            <button
              onClick={() => {
                setShowCommandPalette(true);
                setShowContextMenu(false);
              }}
              className={`
                context-item w-full text-left hover:bg-orange-500/10 flex items-center gap-3 text-white
                ${isMobile ? "px-6 py-4" : "px-4 py-2"}
              `}
            >
              <Command size={isMobile ? 20 : 16} className="text-orange-400" />
              Command Palette
            </button>
            <hr className="my-2 border-orange-500/20" />
            <button
              onClick={() => {
                handleWindowOpen("settings");
                setShowContextMenu(false);
              }}
              className={`
                context-item w-full text-left hover:bg-orange-500/10 flex items-center gap-3 text-white
                ${isMobile ? "px-6 py-4" : "px-4 py-2"}
              `}
            >
              <Settings size={isMobile ? 20 : 16} className="text-orange-400" />
              Settings
            </button>
            <button
              onClick={() => {
                window.location.reload();
                setShowContextMenu(false);
              }}
              className={`
                context-item w-full text-left hover:bg-orange-500/10 flex items-center gap-3 text-white
                ${isMobile ? "px-6 py-4 border-b-0" : "px-4 py-2"}
              `}
            >
              <RotateCw size={isMobile ? 20 : 16} className="text-orange-400" />
              Refresh
            </button>
          </div>
        )}

        {/* Quick Launch Dock */}
        {showQuickLaunch && (
          <div
            className={`
            fixed z-40
            ${
              isMobile
                ? "bottom-20 left-4 right-4"
                : "bottom-20 left-1/2 transform -translate-x-1/2"
            }
          `}
          >
            <div className="bg-black/90 backdrop-blur-xl rounded-2xl border border-orange-500/30 p-4">
              <div
                className={`
                flex items-center
                ${isMobile ? "flex-col space-y-4" : "space-x-4"}
              `}
              >
                <div className="text-orange-400 text-sm font-medium">
                  Quick Launch
                </div>
                <div
                  className={`
                  flex items-center
                  ${isMobile ? "grid grid-cols-3 gap-3 w-full" : "space-x-2"}
                `}
                >
                  {[
                    {
                      icon: <Settings size={isMobile ? 24 : 20} />,
                      action: () => handleWindowOpen("settings"),
                      label: "Settings",
                    },
                    {
                      icon: <Code2 size={isMobile ? 24 : 20} />,
                      action: () => handleWindowOpen("terminal"),
                      label: "Terminal",
                    },
                    {
                      icon: <Command size={isMobile ? 24 : 20} />,
                      action: () => setShowCommandPalette(true),
                      label: "Commands",
                    },
                    {
                      icon: <Plus size={isMobile ? 24 : 20} />,
                      action: () => addWidget("system-monitor"),
                      label: "Add Widget",
                    },
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item.action();
                        setShowQuickLaunch(false);
                      }}
                      className={`
                        group relative rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 transition-all duration-300
                        ${
                          isMobile
                            ? "p-4 flex flex-col items-center justify-center"
                            : "p-3 hover:scale-110"
                        }
                      `}
                      title={item.label}
                    >
                      {item.icon}
                      {isMobile && (
                        <span className="text-xs mt-1">{item.label}</span>
                      )}
                      {!isMobile && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {item.label}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Keyboard Shortcuts Help - Desktop only */}
        {!isMobile && (
          <div className="fixed bottom-24 right-80 z-10 bg-black/50 backdrop-blur-xl rounded-xl border border-orange-500/20 p-3 text-xs text-orange-400/60">
            <div>⌘K / Ctrl+K - Command Palette</div>
            <div>Ctrl+Space - Quick Launch</div>
            <div>Right Click - Context Menu</div>
          </div>
        )}

        {/* Taskbar */}
        <Taskbar
          onSettingsClick={() => handleWindowOpen("settings")}
          onTerminalClick={() => handleWindowOpen("terminal")}
          onFolderClick={(folderId) => handleWindowOpen(`folder-${folderId}`)}
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
        
        @keyframes infinityDraw {
          0% {
            stroke-dashoffset: 800;
            opacity: 0.5;
            transform: scale(0.95);
          }
          50% {
            stroke-dashoffset: 0;
            opacity: 1;
            transform: scale(1);
          }
          100% {
            stroke-dashoffset: -800;
            opacity: 0.5;
            transform: scale(0.95);
          }
        }
        
        @keyframes particleFloat {
          0%, 100% {
            transform: translateY(0px) scale(0.8);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-15px) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-25px) scale(1.2);
            opacity: 1;
          }
          75% {
            transform: translateY(-15px) scale(1);
            opacity: 0.8;
          }
        }
        
        @keyframes subtleRotate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes gentleGlow {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(255, 107, 53, 0.4));
            opacity: 0.9;
          }
          50% {
            filter: drop-shadow(0 0 12px rgba(255, 107, 53, 0.7));
            opacity: 1;
          }
        }
        
        @keyframes dotGlow {
          0% {
            opacity: 0.6;
            transform: scale(1);
          }
          100% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes infinityMotion {
          0% {
            transform: scale(0.96) translateY(0px) rotate(0deg);
            opacity: 0.85;
          }
          50% {
            transform: scale(1.02) translateY(-2px) rotate(2deg);
            opacity: 1;
          }
          100% {
            transform: scale(0.96) translateY(0px) rotate(-2deg);
            opacity: 0.85;
          }
        }

        .infinity-icon {
          animation: infinityMotion 2.2s ease-in-out infinite;
          transform-origin: center;
        }

        .animate-pulse {
          animation: pulse 1.2s ease-in-out infinite;
        }

        .animation-delay-150 {
          animation-delay: 0.15s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.6;
          }
        }
        
        @keyframes subtlePulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.95);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.05);
            opacity: 0.5;
          }
        }

        /* GIF Performance Optimizations */
        img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
          image-rendering: optimize-speed;
        }

        /* Hardware acceleration for all animated elements */
        .hardware-accelerated {
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Reduce paint complexity during GIF playback */
        .desktop-area {
          contain: layout style paint;
        }

        /* Optimize particle system performance */
        canvas {
          will-change: contents;
          transform: translate3d(0, 0, 0);
        }

      `}</style>
    </div>
  );
};

export default Desktop;
