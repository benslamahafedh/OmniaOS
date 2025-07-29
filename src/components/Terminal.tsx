import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { useMobile } from '../hooks/useMobile';

interface TerminalProps {
  onClose: () => void;
}

interface Command {
  input: string;
  output: string;
  timestamp: Date;
}

const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useMobile();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCommand = async (input: string) => {
    const newCommand: Command = {
      input,
      output: '',
      timestamp: new Date()
    };

    // Basic command processing
    switch (input.toLowerCase().trim()) {
      case 'help':
        newCommand.output = `
Available commands:
  help          - Show this help message
  clear         - Clear the terminal
  echo [text]   - Display text
  date          - Show current date and time
  ls            - List files in current directory
  whoami        - Show current user
  system        - Show system information
  matrix        - Start Matrix animation
  exit          - Close terminal
`;
        break;

      case 'clear':
        setCommands([]);
        return;

      case 'date':
        newCommand.output = new Date().toLocaleString();
        break;

      case 'ls':
        newCommand.output = `
Documents/
Downloads/
Pictures/
Music/
system.config
neural.core
samantha.ai
`;
        break;

      case 'whoami':
        newCommand.output = 'samantha-user';
        break;

      case 'system':
        newCommand.output = `
OmniaOS 
Running on Neural Core 
Memory: 16GB / 32GB
CPU: Quantum Processor 9000
GPU: Neural Engine X
Storage: 1TB Quantum Drive
`;
        break;

      case 'matrix':
        newCommand.output = 'Starting Matrix animation...';
        // Here you would implement the actual Matrix animation
        break;

      case 'exit':
        onClose();
        return;

      default:
        if (input.startsWith('echo ')) {
          newCommand.output = input.slice(5);
        } else if (input.trim() !== '') {
          newCommand.output = `Command not found: ${input}. Type 'help' for available commands.`;
        }
    }

    setCommands(prev => [...prev, newCommand]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      handleCommand(currentInput);
      setCurrentInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setCommands([]);
    }
  };

  return (
    <div 
      className={`
        text-green-400 font-mono
        ${isFullscreen 
          ? 'fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-xl' 
          : isMobile 
            ? 'w-full min-h-0 flex flex-col mobile-terminal-container' 
            : 'bg-gray-900/95 backdrop-blur-xl w-full max-w-4xl rounded-3xl border border-green-500/30'
        }
      `}
    >
      {/* Terminal Header */}
      <div className={`
        flex items-center justify-between px-4 py-2 bg-black/50 border-b border-green-500/30
        ${isMobile ? 'min-h-[60px]' : ''}
      `}>
        <div className="flex items-center gap-2">
          <TerminalIcon className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} />
          <span className={`${isMobile ? 'text-base font-medium' : 'text-sm'}`}>OmniaOS Terminal</span>
        </div>
        <div className="flex items-center gap-2">
          {!isMobile && (
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 hover:bg-white/10 rounded transition-colors duration-300"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}
          <button
            onClick={onClose}
            className={`
              ${isMobile 
                ? 'flex items-center justify-center w-10 h-10 bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 hover:text-pink-300 rounded-full border border-pink-500/30 transition-all duration-300 active:scale-95'
                : 'p-1 hover:bg-white/10 rounded transition-colors duration-300'
              }
            `}
          >
            <X className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} />
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className={`
          p-4 overflow-y-auto space-y-2
          ${isMobile 
            ? 'flex-1 text-sm mobile-terminal' 
            : 'h-[500px]'
          }
        `}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Welcome Message */}
        <div className="text-green-400 mb-4">
          Welcome to OmniaOS Terminal
          <br />
          Type 'help' for available commands.
          <br />
        </div>

        {/* Command History */}
        {commands.map((cmd, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-green-400">samantha@omniaos</span>
              <span className="text-gray-400">~</span>
              <span className="text-green-400">$</span>
              <span className="text-white">{cmd.input}</span>
            </div>
            {cmd.output && (
              <div className="text-gray-300 whitespace-pre-wrap">{cmd.output}</div>
            )}
          </div>
        ))}

        {/* Current Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-green-400">samantha@omniaos</span>
          <span className="text-gray-400">~</span>
          <span className="text-green-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={e => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`
              flex-1 bg-transparent border-none outline-none text-white
              ${isMobile ? 'text-base' : ''}
            `}
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>

      {/* Terminal Footer */}
      <div className={`
        px-4 py-2 border-t border-green-500/30 bg-black/50 text-xs text-gray-400
        ${isMobile ? 'text-xs pb-4' : ''}
      `}>
        {isMobile 
          ? "Type 'help' for commands • Tap to focus" 
          : "Press Ctrl+L to clear terminal • Type 'help' for commands"
        }
      </div>
    </div>
  );
};

export default Terminal; 