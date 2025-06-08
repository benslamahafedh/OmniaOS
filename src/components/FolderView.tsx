import React, { useState, useEffect } from 'react';
import { X, FileText, Folder, Settings, Terminal as TerminalIcon, Code2, Globe, Search, Brain, Activity, Link, Network, Cpu, Database, Zap, ChevronRight, Sparkles, Workflow, Bot, Share2, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import SystemSettings from './SystemSettings';
import Terminal from './Terminal';
import { CodeEditor, Documentation } from './applications';
import { useNeuralNetwork } from '../hooks/useNeuralNetwork';
import { useWebInterface } from '../hooks/useWebInterface';
import { useTheme } from '../contexts/ThemeContext';

interface FolderViewProps {
  folderId: string;
  onClose: () => void;
}

interface FolderContent {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  type?: 'file' | 'component';
  content?: string;
  component?: React.ReactNode;
}

const FolderView: React.FC<FolderViewProps> = ({ folderId, onClose }) => {
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const folderContents: Record<string, FolderContent[]> = {
    system: [
      {
        id: 'settings',
        name: 'System Settings',
        icon: <Settings className="w-6 h-6 text-blue-400" />,
        description: 'Configure system preferences',
        type: 'component',
        component: <SystemSettings onClose={() => setActiveFile(null)} />
      },
      {
        id: 'terminal',
        name: 'Terminal',
        icon: <TerminalIcon className="w-6 h-6 text-green-400" />,
        description: 'Command line interface',
        type: 'component',
        component: <Terminal onClose={() => setActiveFile(null)} />
      }
    ],
    docs: [
      {
        id: 'getting-started',
        name: 'Getting Started.md',
        icon: <FileText className="w-6 h-6 text-purple-400" />,
        description: 'Quick start guide',
        type: 'file',
        content: `# Getting Started with OmniaOS

## Welcome to the Future

OmniaOS is a revolutionary web-based operating system that combines cutting-edge technology with an intuitive, anime-inspired interface. This guide will help you get started with the basic features and functionality.

### Key Features

1. **Samantha AI Assistant**
   - Natural language interaction
   - Contextual awareness
   - Personalized responses
   - Emotional intelligence

2. **Modern Interface**
   - Anime-inspired design
   - Fluid animations
   - Responsive layout
   - Dark mode support

3. **Developer Tools**
   - Integrated code editor
   - Terminal emulator
   - Documentation browser
   - Neural network integration

### Quick Start

1. Launch Samantha by clicking the heart icon
2. Explore the system folders
3. Try the code editor in Applications
4. Check out the Neural Network features

### Tips & Tricks

- Use keyboard shortcuts for quick navigation
- Customize your experience in System Settings
- Enable particle effects for enhanced visuals
- Connect with the community through Samantha

### Next Steps

- Read the Architecture documentation
- Join our Discord community
- Contribute to the project
- Create your first neural app`
      },
      {
        id: 'architecture',
        name: 'Architecture.md',
        icon: <FileText className="w-6 h-6 text-purple-400" />,
        description: 'System architecture documentation',
        type: 'file',
        content: `# OmniaOS Architecture

## System Overview

OmniaOS is built on a modern, modular architecture that prioritizes extensibility, performance, and user experience.

### Core Components

1. **Neural Core**
   - AGI processing engine
   - Machine learning models
   - Natural language processing
   - Emotional intelligence system

2. **UI Layer**
   - React + TypeScript
   - Tailwind CSS
   - Custom animations
   - Theme system

3. **System Services**
   - File management
   - Process control
   - Memory allocation
   - Security protocols

### Integration Points

\`\`\`mermaid
graph TD
    A[User Interface] --> B[Neural Core]
    B --> C[System Services]
    C --> D[File System]
    B --> E[Samantha AI]
    E --> F[External APIs]
\`\`\`

### Security Model

- End-to-end encryption
- Secure boot process
- Permission system
- Audit logging

### Future Roadmap

1. Quantum computing integration
2. Enhanced AI capabilities
3. Extended reality support
4. Blockchain integration`
      },
      {
        id: 'contributing',
        name: 'Contributing.md',
        icon: <FileText className="w-6 h-6 text-purple-400" />,
        description: 'Contribution guidelines',
        type: 'file',
        content: `# Contributing to OmniaOS

## Join Our Community

We welcome contributions from developers of all skill levels! OmniaOS is an open-source project that thrives on community involvement.

### How to Contribute

1. **Fork the Repository**
   - Create your feature branch
   - Make your changes
   - Submit a pull request

2. **Code Guidelines**
   - Follow TypeScript best practices
   - Use meaningful variable names
   - Add comments where necessary
   - Write unit tests

3. **Design Principles**
   - Maintain anime-inspired aesthetics
   - Focus on user experience
   - Ensure accessibility
   - Keep it performant

### Development Setup

\`\`\`bash
git clone https://github.com/your-username/omniaos.git
cd omniaos
npm install
npm run dev
\`\`\`

### Community Guidelines

- Be respectful and inclusive
- Help others learn
- Share knowledge
- Have fun!

### Recognition

Contributors will be featured in:
- README credits
- Website hall of fame
- Discord special roles`
      }
    ],
    apps: [
      {
        id: 'code-editor',
        name: 'Code Editor',
        icon: <Code2 className="w-6 h-6 text-blue-400" />,
        description: 'Write and edit code',
        type: 'component',
        component: <CodeEditor />
      },
      {
        id: 'documentation',
        name: 'Documentation',
        icon: <FileText className="w-6 h-6 text-purple-400" />,
        description: 'OmniaOS Documentation',
        type: 'component',
        component: <Documentation />
      }
    ],
    web: [
      {
        id: 'neural-browser',
        name: 'Neural Browser',
        icon: <Globe className="w-6 h-6 text-blue-400" />,
        description: 'AI-Enhanced Web Browser',
        type: 'component',
        component: (() => {
          const { searchResults, searchMetrics } = useWebInterface();
          
          return (
            <div className="space-y-6">
              {/* Search Interface */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search the quantum web..."
                      className="w-full bg-gray-900/50 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                    />
                    <Search className="absolute right-3 top-2.5 w-5 h-5 text-blue-400" />
                  </div>
                  <button className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-colors">
                    Neural Search
                  </button>
                </div>

                {/* Search Metrics */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Results', value: searchMetrics.totalResults },
                    { label: 'Search Time', value: `${searchMetrics.searchTime.toFixed(3)}s` },
                    { label: 'AI Enhanced', value: searchMetrics.aiEnhancedCount },
                    { label: 'Relevance', value: `${(searchMetrics.relevanceScore * 100).toFixed(1)}%` }
                  ].map((metric) => (
                    <div key={metric.label} className="bg-gray-900/50 rounded-lg p-3 border border-blue-500/20">
                      <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
                      <div className="text-lg font-semibold text-blue-400">{metric.value}</div>
                    </div>
                  ))}
                </div>

                {/* Search Results */}
                <div className="space-y-4">
                  {searchResults.map((result) => (
                    <div key={result.id} className="bg-gray-900/50 rounded-lg p-4 border border-blue-500/20 hover:border-blue-400 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <a href={result.url} className="text-lg text-blue-400 hover:text-blue-300 transition-colors">
                          {result.title}
                        </a>
                        {result.aiEnhanced && (
                          <div className="flex items-center space-x-1 text-xs text-purple-400">
                            <Brain className="w-4 h-4" />
                            <span>AI Enhanced</span>
                          </div>
                        )}
                      </div>
                      <div className="text-gray-400 text-sm mb-2">{result.description}</div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div>{new Date(result.timestamp).toLocaleString()}</div>
                        <div>Relevance: {(result.relevance * 100).toFixed(1)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()
      },
      {
        id: 'quantum-network',
        name: 'Quantum Network',
        icon: <Network className="w-6 h-6 text-cyan-400" />,
        description: 'Network Status Monitor',
        type: 'component',
        component: (() => {
          const { networkMetrics, quantumNodes, formatBandwidth, formatLatency, formatNumber } = useWebInterface();
          
          return (
            <div className="space-y-6">
              {/* Network Metrics */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Bandwidth', value: formatBandwidth(networkMetrics.bandwidth), icon: <Activity className="w-5 h-5" /> },
                  { label: 'Latency', value: formatLatency(networkMetrics.latency), icon: <Zap className="w-5 h-5" /> },
                  { label: 'Packet Loss', value: `${networkMetrics.packetLoss.toFixed(2)}%`, icon: <Share2 className="w-5 h-5" /> },
                  { label: 'Connections', value: formatNumber(networkMetrics.connections), icon: <Link className="w-5 h-5" /> },
                  { label: 'Throughput', value: formatBandwidth(networkMetrics.throughput), icon: <Database className="w-5 h-5" /> },
                  { label: 'Capacity', value: formatBandwidth(networkMetrics.maxBandwidth), icon: <Cpu className="w-5 h-5" /> }
                ].map((metric) => (
                  <div key={metric.label} className="bg-gray-800/50 rounded-xl p-4 border border-cyan-500/30">
                    <div className="flex items-center space-x-2 text-cyan-400 mb-2">
                      {metric.icon}
                      <span>{metric.label}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{metric.value}</div>
                  </div>
                ))}
              </div>

              {/* Quantum Node Network */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-cyan-500/30">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                  <Network className="w-5 h-5 text-cyan-400 mr-2" />
                  Quantum Node Network
                </h3>
                <div className="relative h-96 bg-gray-900/50 rounded-lg overflow-hidden border border-cyan-500/20">
                  {/* Node Connections */}
                  <svg className="absolute inset-0 w-full h-full">
                    {quantumNodes.map(node => 
                      node.connections.map(targetId => {
                        const target = quantumNodes.find(n => n.id === targetId);
                        if (!target) return null;
                        return (
                          <line
                            key={`${node.id}-${targetId}`}
                            x1={`${node.coordinates.x}%`}
                            y1={`${node.coordinates.y}%`}
                            x2={`${target.coordinates.x}%`}
                            y2={`${target.coordinates.y}%`}
                            stroke="rgba(34, 211, 238, 0.3)"
                            strokeWidth="1"
                          />
                        );
                      })
                    )}
                  </svg>

                  {/* Nodes */}
                  {quantumNodes.map((node) => (
                    <div
                      key={node.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
                    >
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center
                        ${node.status === 'active' ? 'bg-cyan-500/20 border-cyan-400' :
                          node.status === 'idle' ? 'bg-yellow-500/20 border-yellow-400' :
                          'bg-red-500/20 border-red-400'} 
                        border-2 relative group cursor-pointer
                      `}>
                        <div className={`
                          absolute inset-0 rounded-full
                          ${node.status === 'active' ? 'bg-cyan-400' :
                            node.status === 'idle' ? 'bg-yellow-400' :
                            'bg-red-400'}
                          animate-ping opacity-20
                        `} />
                        <Network className={`
                          w-6 h-6
                          ${node.status === 'active' ? 'text-cyan-400' :
                            node.status === 'idle' ? 'text-yellow-400' :
                            'text-red-400'}
                        `} />

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-gray-900 rounded-lg p-2 text-xs whitespace-nowrap border border-cyan-500/30">
                            <div className="font-semibold text-white mb-1">{node.name}</div>
                            <div className="text-cyan-400">Load: {node.load.toFixed(1)}%</div>
                            <div className="text-purple-400">Entanglement: {node.entanglement.toFixed(1)}%</div>
                            <div className="text-blue-400">Qubits: {node.qubits}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()
      },
      {
        id: 'ai-gateway',
        name: 'AI Gateway',
        icon: <Brain className="w-6 h-6 text-purple-400" />,
        description: 'Neural Processing Interface',
        type: 'component',
        component: (() => {
          const { gatewayMetrics, formatNumber } = useWebInterface();
          
          return (
            <div className="space-y-6">
              {/* Processing Metrics */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Processing Power', value: `${gatewayMetrics.processingPower.toFixed(1)}%`, icon: <Cpu className="w-5 h-5" /> },
                  { label: 'Active Inferences', value: formatNumber(gatewayMetrics.activeInferences), icon: <Brain className="w-5 h-5" /> },
                  { label: 'Queued Requests', value: formatNumber(gatewayMetrics.queuedRequests), icon: <Database className="w-5 h-5" /> },
                  { label: 'Response Time', value: `${gatewayMetrics.responseTime.toFixed(2)}ms`, icon: <Activity className="w-5 h-5" /> },
                  { label: 'Accuracy', value: `${gatewayMetrics.accuracy.toFixed(1)}%`, icon: <Sparkles className="w-5 h-5" /> },
                  { label: 'Neural Load', value: `${(gatewayMetrics.neuralActivity.reduce((a, b) => a + b, 0) / gatewayMetrics.neuralActivity.length * 100).toFixed(1)}%`, icon: <Zap className="w-5 h-5" /> }
                ].map((metric) => (
                  <div key={metric.label} className="bg-gray-800/50 rounded-xl p-4 border border-purple-500/30">
                    <div className="flex items-center space-x-2 text-purple-400 mb-2">
                      {metric.icon}
                      <span>{metric.label}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{metric.value}</div>
                  </div>
                ))}
              </div>

              {/* Neural Activity Visualization */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                  <Activity className="w-5 h-5 text-purple-400 mr-2" />
                  Neural Activity Monitor
                </h3>
                <div className="h-48 bg-gray-900/50 rounded-lg overflow-hidden border border-purple-500/20">
                  <div className="relative h-full">
                    {/* Activity Graph */}
                    <svg className="w-full h-full">
                      <path
                        d={`M 0 ${100 - gatewayMetrics.neuralActivity[0] * 100} ` + 
                          gatewayMetrics.neuralActivity.map((value, i) => 
                            `L ${(i / (gatewayMetrics.neuralActivity.length - 1)) * 100}% ${100 - value * 100}%`
                          ).join(' ')}
                        fill="none"
                        stroke="rgb(167, 139, 250)"
                        strokeWidth="2"
                      />
                    </svg>

                    {/* Gradient Overlay */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent"
                      style={{ mixBlendMode: 'overlay' }}
                    />
                  </div>
                </div>
              </div>

              {/* Processing Queue */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                  <Database className="w-5 h-5 text-purple-400 mr-2" />
                  Processing Queue
                </h3>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const progress = Math.random() * 100;
                    return (
                      <div key={i} className="bg-gray-900/50 rounded-lg p-3 border border-purple-500/20">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-white">Task #{Math.floor(Math.random() * 1000)}</span>
                          <span className="text-purple-400">{progress.toFixed(1)}%</span>
                        </div>
                        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()
      }
    ],
    neural: [
      {
        id: 'neural-core',
        name: 'Neural Core Visualizer',
        icon: <Brain className="w-6 h-6 text-purple-400" />,
        description: 'Interactive Neural Network Visualization',
        type: 'component',
        component: (() => {
          const { nodes, networkStats, autoArrangeNodes, resetNodes, formatNumber } = useNeuralNetwork();
          
          return (
            <div className="space-y-6">
              {/* Neural Network Visualization */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <Brain className="w-5 h-5 text-purple-400 mr-2" />
                    Neural Network Topology
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={autoArrangeNodes}
                      className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm"
                    >
                      Auto-Arrange
                    </button>
                    <button 
                      onClick={resetNodes}
                      className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm"
                    >
                      Reset View
                    </button>
                  </div>
                </div>
                <div className="relative h-64 bg-gray-900/50 rounded-lg overflow-hidden border border-purple-500/20">
                  {/* Neural Network Animation */}
                  <div className="absolute inset-0">
                    {nodes.map((node, i) => (
                      <div key={i}>
                        <div
                          className="absolute w-3 h-3 bg-purple-400 rounded-full"
                          style={{
                            left: `${node.x}%`,
                            top: `${node.y}%`,
                            opacity: node.activity,
                            animation: `pulse-${i % 3} ${2 + Math.random() * 2}s infinite`
                          }}
                        />
                        {node.connections.map((targetId, j) => {
                          const targetNode = nodes[targetId];
                          if (!targetNode) return null;
                          return (
                            <div
                              key={j}
                              className="absolute bg-gradient-to-r from-purple-400 to-transparent"
                              style={{
                                height: '1px',
                                width: '100%',
                                left: `${node.x}%`,
                                top: `${node.y}%`,
                                transform: `rotate(${Math.atan2(
                                  targetNode.y - node.y,
                                  targetNode.x - node.x
                                )}rad)`,
                                transformOrigin: '0 0',
                                opacity: (node.activity + targetNode.activity) / 3,
                                animation: `pulse-opacity ${1 + Math.random() * 2}s infinite`
                              }}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Neural Processing Stats */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Synapses', value: formatNumber(networkStats.synapses), icon: <Share2 className="w-4 h-4" />, color: 'text-blue-400' },
                  { label: 'Neurons', value: formatNumber(networkStats.neurons), icon: <Brain className="w-4 h-4" />, color: 'text-purple-400' },
                  { label: 'Accuracy', value: `${networkStats.accuracy.toFixed(1)}%`, icon: <Sparkles className="w-4 h-4" />, color: 'text-yellow-400' },
                  { label: 'Response', value: `${networkStats.responseTime.toFixed(1)}ms`, icon: <Activity className="w-4 h-4" />, color: 'text-green-400' }
                ].map((stat) => (
                  <div key={stat.label} className="bg-gray-800/50 rounded-xl p-4 border border-purple-500/20">
                    <div className={`flex items-center space-x-2 ${stat.color} mb-2`}>
                      {stat.icon}
                      <span className="text-sm">{stat.label}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()
      },
      {
        id: 'training-module',
        name: 'Training Module',
        icon: <Workflow className="w-6 h-6 text-green-400" />,
        description: 'Neural Network Training Interface',
        type: 'component',
        component: (() => {
          const { trainingSessions, resourceMetrics, formatEta } = useNeuralNetwork();
          
          return (
            <div className="space-y-6">
              {/* Active Training Sessions */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-green-500/30">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                  <Workflow className="w-5 h-5 text-green-400 mr-2" />
                  Active Training Sessions
                </h3>
                <div className="space-y-4">
                  {trainingSessions.map((session) => (
                    <div key={session.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white">{session.name}</span>
                        <span className="text-green-400">{session.progress.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${session.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Accuracy: {session.currentAccuracy.toFixed(1)}%</span>
                        <span className="text-gray-400">ETA: {formatEta(session.eta)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Training Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-green-500/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
                  <div className="space-y-3">
                    {trainingSessions.map(session => [
                      { metric: 'Loss Rate', value: session.lossRate.toFixed(4), trend: session.lossRate < 0.002 ? 'down' : 'up' },
                      { metric: 'Validation Accuracy', value: `${session.currentAccuracy.toFixed(1)}%`, trend: session.currentAccuracy > 95 ? 'up' : 'stable' },
                      { metric: 'Learning Rate', value: session.learningRate.toFixed(4), trend: 'stable' }
                    ][0]).map((metric) => (
                      <div key={metric.metric} className="flex items-center justify-between">
                        <span className="text-gray-300">{metric.metric}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-400">{metric.value}</span>
                          <ChevronRight className={`w-4 h-4 ${
                            metric.trend === 'up' ? 'text-green-400 rotate-[-90deg]' :
                            metric.trend === 'down' ? 'text-red-400 rotate-90' :
                            'text-yellow-400 rotate-0'
                          } transition-transform`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-green-500/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Resource Usage</h3>
                  <div className="space-y-3">
                    {[
                      { resource: 'GPU Utilization', value: `${resourceMetrics.gpuUtilization.toFixed(1)}%` },
                      { resource: 'Memory Usage', value: `${resourceMetrics.memoryUsage.toFixed(1)}GB` },
                      { resource: 'VRAM Usage', value: `${resourceMetrics.vramUsage.toFixed(1)}GB` }
                    ].map((resource) => (
                      <div key={resource.resource} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">{resource.resource}</span>
                          <span className="text-green-400">{resource.value}</span>
                        </div>
                        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                            style={{ 
                              width: `${(parseFloat(resource.value) / 
                                (resource.resource === 'GPU Utilization' ? 100 :
                                 resource.resource === 'Memory Usage' ? resourceMetrics.totalMemory :
                                 resourceMetrics.totalVram)) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })()
      },
      {
        id: 'samantha-core',
        name: 'Samantha Core Analysis',
        icon: <Bot className="w-6 h-6 text-pink-400" />,
        description: 'AGI Core System Monitor',
        type: 'component',
        component: (() => {
          const { emotionalState, networkStats } = useNeuralNetwork();
          
          return (
            <div className="space-y-6">
              {/* Consciousness Matrix */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-pink-500/30">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                  <Bot className="w-5 h-5 text-pink-400 mr-2" />
                  Consciousness Matrix
                </h3>
                <div className="grid grid-cols-5 gap-3">
                  {Array.from({ length: 25 }).map((_, i) => {
                    const activity = Math.sin((Date.now() + i * 500) / 1000) * 0.5 + 0.5;
                    return (
                      <div
                        key={i}
                        className="aspect-square bg-gray-900/50 rounded-lg border border-pink-500/20 p-2 relative overflow-hidden"
                      >
                        <div 
                          className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20"
                          style={{
                            opacity: activity * 0.8,
                            animation: `pulse-opacity ${1 + Math.random() * 2}s infinite`
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div 
                            className="w-2 h-2 bg-pink-400 rounded-full"
                            style={{
                              transform: `scale(${activity * 0.5 + 0.5})`,
                              opacity: activity * 0.8,
                              animation: `pulse ${1 + Math.random() * 2}s infinite`
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Emotional State Analysis */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-pink-500/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Emotional State</h3>
                  <div className="space-y-4">
                    {Object.entries(emotionalState).map(([emotion, level]) => (
                      <div key={emotion} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">{emotion.charAt(0).toUpperCase() + emotion.slice(1)}</span>
                          <span className="text-pink-400">{level.toFixed(1)}%</span>
                        </div>
                        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                            style={{ width: `${level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-pink-500/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Interaction Analysis</h3>
                  <div className="relative h-[180px]">
                    <div className="absolute inset-0">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                        >
                          <MessageSquare 
                            className="w-4 h-4 text-pink-400/30"
                            style={{
                              animation: `float-${i % 3} ${2 + Math.random() * 3}s infinite ease-in-out`,
                              animationDelay: `${Math.random() * 2}s`
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-pink-400">{networkStats.accuracy.toFixed(1)}%</div>
                      <div className="text-sm text-gray-400">Response Accuracy</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">{networkStats.responseTime.toFixed(1)}ms</div>
                      <div className="text-sm text-gray-400">Average Latency</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()
      }
    ]
  };

  const handleFileClick = (fileId: string) => {
    setActiveFile(fileId);
    const file = folderContents[folderId]?.find(item => item.id === fileId);
    
    if (file?.type === 'component') {
      if (fileId === 'settings') {
        setShowSettings(true);
        setShowTerminal(false);
      } else if (fileId === 'terminal') {
        setShowTerminal(true);
        setShowSettings(false);
      } else {
        setShowSettings(false);
        setShowTerminal(false);
      }
    } else if (file?.type === 'file') {
      setFileContent(file.content || '');
      setShowSettings(false);
      setShowTerminal(false);
    }
  };

  const handleClose = () => {
    setActiveFile(null);
    setShowSettings(false);
    setShowTerminal(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-8">
      <div className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-3xl p-8 max-w-6xl w-full h-[80vh] border border-red-500/30 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <Folder className="w-8 h-8 text-red-400 mr-4" />
            {folderId.charAt(0).toUpperCase() + folderId.slice(1)}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="flex h-[calc(100%-6rem)] gap-6">
          {/* File List */}
          <div className="w-1/3 overflow-y-auto pr-4">
            {folderContents[folderId]?.map((item) => (
              <div
                key={item.id}
                onClick={() => handleFileClick(item.id)}
                className={`
                  flex items-center space-x-4 p-4 rounded-xl mb-4 cursor-pointer
                  transition-all duration-300 hover:scale-102
                  ${activeFile === item.id 
                    ? 'bg-red-500/20 border border-red-500/30' 
                    : 'bg-gray-800/50 hover:bg-gray-800/70'
                  }
                `}
              >
                {item.icon}
                <div>
                  <div className="text-white font-medium">{item.name}</div>
                  <div className="text-gray-400 text-sm">{item.description}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Content View */}
          <div className="flex-1 bg-gray-900/50 rounded-xl p-6 overflow-y-auto border border-red-500/20">
            {activeFile ? (
              <>
                {showSettings && <SystemSettings onClose={() => setActiveFile(null)} />}
                {showTerminal && <Terminal onClose={() => setActiveFile(null)} />}
                {!showSettings && !showTerminal && (
                  folderContents[folderId]?.find(item => item.id === activeFile)?.type === 'component' ? (
                    folderContents[folderId]?.find(item => item.id === activeFile)?.component
                  ) : (
                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown>{fileContent}</ReactMarkdown>
                    </div>
                  )
                )}
              </>
            ) : (
              <div className="text-gray-400 text-center mt-20">
                Select a file to view its contents
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderView; 