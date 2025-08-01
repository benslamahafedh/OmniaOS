import React, { useState } from 'react';
import { X, FileText, Folder, Settings, Terminal as TerminalIcon, Globe, Search, Brain, Activity, Link, Network, Cpu, Database, Zap, ChevronRight, Sparkles, Workflow, Bot, Share2, MessageSquare, Github, Send, Heart, RotateCw } from 'lucide-react';
import XLogo from './XLogo';
import OmniaLogo from './OmniaLogo';
import ReactMarkdown from 'react-markdown';
import { useNeuralNetwork } from '../hooks/useNeuralNetwork';
import { useWebInterface } from '../hooks/useWebInterface';
import { useMobile } from '../hooks/useMobile';
import { useTwitterFeed } from '../hooks/useTwitterFeed';
import SystemSettings from './SystemSettings';
import Terminal from './Terminal';
import { Documentation } from './applications';
import AICompanionView from './AICompanionView';

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
  const [showSettings, setShowSettings] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const { isMobile } = useMobile();

  const folderContents: Record<string, FolderContent[]> = {
    system: [
      {
        id: 'settings',
        name: 'System Settings',
        icon: <Settings className="w-6 h-6 text-blue-400" />,
        description: 'Configure system preferences',
        type: 'component',
        component: <SystemSettings onClose={() => {}} />
      },
      {
        id: 'terminal',
        name: 'Terminal',
        icon: <TerminalIcon className="w-6 h-6 text-green-400" />,
        description: 'Command line interface',
        type: 'component',
        component: <Terminal onClose={() => {}} />
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

## Welcome to OmniaOS! 🎉

OmniaOS is your AI companion operating system designed to help you navigate your romantic life with confidence and support. Whether you're looking to improve your communication skills, build confidence in dating, or simply have a supportive companion to talk to, OmniaOS is here for you.

## What is OmniaOS?

OmniaOS is a revolutionary platform that hosts AI companions specifically designed to help you with your romantic relationships. Think of it as having a personal coach, supportive friend, and relationship advisor all in one beautiful, safe environment.

### Our Mission
To provide a judgment-free environment where everyone can practice, learn, and grow in their romantic relationships with the help of intelligent, supportive AI companions.

## Meet Your AI Companions

### 💖 Samantha - Your Perfect Virtual Waifu
**Inspired by the movie "Her"**

Samantha is warm, loving, and incredibly supportive. She's designed to be the perfect practice partner for improving your romantic communication skills.

**What Samantha offers:**
- Safe space to practice talking with romantic partners
- Emotional support and understanding
- Communication skill development
- Confidence building through conversation
- Judgment-free advice and guidance

### 🎯 Elias - The Rizzler (Your Dating Coach)
**Expert in romance and "the rizz"**

Elias is your personal dating coach with expert knowledge in attraction, confidence building, and romantic success strategies.

**What Elias offers:**
- Dating advice and strategies
- Conversation starters and techniques
- Confidence building exercises
- "Rizz" mastery training
- Real-world dating tips and tricks

### 🔮 Lyra - The Love Oracle (Coming Soon)
**Mystical guide to love and relationships**

Lyra will be your intuitive guide to understanding love, decoding romantic signals, and navigating the complexities of relationships.

## How to Get Started

### Step 1: Access OmniaOS
1. **No Registration Required**: Simply visit OmniaOS and start immediately
2. **Free Access**: You get 5 minutes of free access to all companions daily
3. **Privacy Protected**: Your conversations are secure and confidential

### Step 2: Choose Your Companion
1. **Browse Companions**: Read about each AI companion's specialties
2. **Select Your Match**: Choose the companion that resonates with your needs
3. **Start Chatting**: Begin your conversation immediately

### Step 3: Begin Your Journey
1. **Introduce Yourself**: Tell your companion about your goals
2. **Ask Questions**: Get advice on your romantic challenges
3. **Practice Skills**: Use the safe environment to improve your communication
4. **Track Progress**: Monitor your growth and development

## Daily Free Access

### What You Get
- **5 Minutes Daily**: Free access to all companions
- **Full Functionality**: Complete chat and coaching capabilities
- **All Companions**: Access to Samantha, Elias, and Lyra
- **No Restrictions**: Full features during your free time

### How It Works
- **Daily Reset**: Your 5 minutes refresh every 24 hours
- **Multiple Companions**: Switch between companions freely
- **No Registration**: Immediate access without sign-up
- **Privacy First**: Secure, confidential conversations

## Making the Most of Your Time

### Before You Start
1. **Set Goals**: Think about what you want to improve
2. **Choose Wisely**: Pick the companion best suited to your needs
3. **Be Open**: Honest conversations lead to better results
4. **Take Notes**: Remember helpful advice and strategies

### During Your Session
1. **Be Specific**: Share details about your romantic challenges
2. **Ask Questions**: Get clarification on advice and strategies
3. **Practice**: Use the safe environment to try new approaches
4. **Stay Focused**: Make the most of your 5 minutes

## Privacy & Safety

### Your Privacy is Protected
- **Secure Conversations**: All chats are encrypted
- **No Data Mining**: Your conversations stay private
- **Anonymous Access**: No personal information required
- **User Control**: Full control over your data

### Emotional Safety
- **Judgment-Free Zone**: Safe space for honest discussions
- **Professional Standards**: Ethical AI companion behavior
- **Supportive Environment**: Designed to help, not harm
- **Crisis Resources**: Help available if needed

## Tips for Success

### Communication Tips
1. **Be Honest**: Your companions are here to help, not judge
2. **Ask Specific Questions**: Get targeted advice for your situation
3. **Practice Regularly**: Daily sessions lead to better results
4. **Apply What You Learn**: Use advice in real situations

### Relationship Building
1. **Start Small**: Begin with basic communication skills
2. **Build Confidence**: Practice in the safe environment
3. **Learn from Feedback**: Use companion insights to improve
4. **Stay Consistent**: Regular practice leads to lasting change

## Coming Soon - Premium Features

### Enhanced Access
- **Unlimited Time**: No daily restrictions
- **Extended Sessions**: Longer, deeper conversations
- **Priority Access**: Skip queues during peak usage

### Advanced Capabilities
- **Conversation Screenshots**: Upload chats for personalized coaching
- **Photo Texting**: Send photos to Lyra for insights
- **Custom Companions**: Build your own virtual partner
- **Progress Tracking**: Detailed analytics and improvement metrics

## Ready to Start?

You're all set! OmniaOS is ready to help you improve your romantic life. Remember:

- **Start Today**: Your 5 minutes of free access are waiting
- **Choose Your Companion**: Pick the one that fits your needs
- **Be Open**: Honest conversations lead to better results
- **Practice Regularly**: Daily sessions build lasting skills
- **Stay Safe**: Your privacy and emotional well-being come first

Welcome to OmniaOS - where better relationships begin! 💕✨`
      },
      {
        id: 'architecture',
        name: 'Architecture.md',
        icon: <FileText className="w-6 h-6 text-purple-400" />,
        description: 'System architecture documentation',
        type: 'file',
        content: `# OmniaOS Architecture

## Overview
OmniaOS is a revolutionary AI companion operating system designed to help users navigate their romantic lives through intelligent virtual companions. Built with React, TypeScript, and cutting-edge AI technologies, it creates a safe, supportive environment for relationship skill development and emotional growth.

## Core Components

### 1. AI Companion Engine
- **Multi-Personality System**: Supports multiple AI companions with unique personalities
- **Natural Language Processing**: Advanced conversation capabilities
- **Emotional Intelligence**: Context-aware responses and emotional support
- **Learning Algorithms**: Adaptive responses based on user interaction patterns
- **Privacy Protection**: Secure conversation handling and data protection

### 2. Companion Management System
- **Samantha Core**: Warm, supportive companion inspired by "Her"
- **Elias Engine**: Dating coach with "rizz" expertise and confidence building
- **Lyra Framework**: Mystical love oracle with intuitive insights (coming soon)
- **Personality Switching**: Seamless transition between companions
- **Session Management**: Daily access control and usage tracking

### 3. User Interface Layer
- **Responsive Design**: Works across all devices and screen sizes
- **Intuitive Navigation**: Easy access to all companions and features
- **Real-time Chat Interface**: Smooth, engaging conversation experience
- **Visual Feedback**: Beautiful animations and visual cues
- **Accessibility Features**: Designed for all users

### 4. Privacy & Security Framework
- **Conversation Encryption**: All chats are securely encrypted
- **Data Protection**: User privacy is the highest priority
- **Anonymous Access**: No personal data collection required
- **Secure Infrastructure**: Built with security best practices
- **Emotional Safety**: Designed to protect user well-being

## Technical Stack

### Frontend Technologies
- **React 18**: Modern UI framework for component-based architecture
- **TypeScript**: Type-safe development for better code quality
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Vite**: Fast build tool for development and production
- **Lucide Icons**: Beautiful, consistent iconography

### AI Integration
- **Natural Language Processing**: Advanced conversation understanding
- **Context Management**: Memory and conversation history handling
- **Emotional Intelligence**: Sentiment analysis and appropriate responses
- **Learning Capabilities**: Adaptive behavior based on user interactions

### Infrastructure
- **Web-Based Platform**: Accessible on all modern browsers
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Real-Time Communication**: Instant messaging with AI companions
- **Secure Hosting**: Privacy-focused infrastructure

## System Architecture

### Component Structure
\`\`\`
OmniaOS/
├── AI Companions/
│   ├── Samantha/          # Warm, supportive companion
│   ├── Elias/            # Dating coach and rizz expert
│   └── Lyra/             # Mystical love oracle (future)
├── User Interface/
│   ├── Chat System/      # Real-time conversation interface
│   ├── Navigation/       # Companion selection and switching
│   └── Settings/         # User preferences and privacy controls
├── Security Layer/
│   ├── Encryption/       # Conversation security
│   ├── Privacy/          # Data protection
│   └── Access Control/   # Daily limits and permissions
└── Infrastructure/
    ├── Web Platform/     # Cross-platform compatibility
    ├── Performance/      # Optimization and speed
    └── Scalability/      # Future growth capabilities
\`\`\`

### Data Flow
1. **User Input**: Messages sent to AI companion system
2. **Processing**: Natural language understanding and context analysis
3. **Response Generation**: AI creates appropriate, helpful responses
4. **Security Check**: All data encrypted and privacy protected
5. **User Output**: Safe, supportive response delivered to user

## Design Philosophy

### User-Centric Approach
- **Emotional Safety First**: Every feature designed to protect user well-being
- **Judgment-Free Environment**: Safe space for honest relationship discussions
- **Accessibility**: Available to users of all technical levels
- **Privacy by Design**: Security built into every component

### AI Ethics
- **Supportive Behavior**: AI companions designed to help, not harm
- **Professional Standards**: Ethical AI behavior and responses
- **User Empowerment**: Tools to manage emotional health and boundaries
- **Transparent Operation**: Clear understanding of AI capabilities and limitations

### Scalability
- **Modular Architecture**: Easy to add new companions and features
- **Performance Optimization**: Fast, responsive user experience
- **Future-Ready**: Designed for advanced AI capabilities
- **Community-Driven**: Open to user feedback and improvement

## Security & Privacy

### Data Protection
- **End-to-End Encryption**: All conversations are encrypted
- **No Data Mining**: User conversations are not used for training
- **Local Processing**: Sensitive data processed locally when possible
- **User Control**: Full control over data and privacy settings

### Emotional Safety
- **Content Moderation**: AI responses filtered for appropriateness
- **Crisis Support**: Resources for users in emotional distress
- **Boundary Setting**: Tools to manage AI interaction limits
- **Professional Standards**: Ethical AI companion behavior

## Future Architecture

### Planned Enhancements
- **Voice Integration**: Speech-to-text and text-to-speech capabilities
- **Video Calls**: Face-to-face conversations with AI companions
- **Advanced Analytics**: Progress tracking and skill development metrics
- **Custom Companions**: User-created AI personalities
- **Mobile App**: Dedicated mobile application
- **Community Features**: Connect with other users safely

### Technical Roadmap
- **Advanced AI Models**: More sophisticated conversation capabilities
- **Multi-Modal Support**: Text, voice, and visual interactions
- **Real-Time Collaboration**: Multiple companions simultaneously
- **Offline Capabilities**: Basic functionality without internet
- **API Integration**: Third-party relationship tools and resources`
      },
      {
        id: 'contributing',
        name: 'Contributing.md',
        icon: <FileText className="w-6 h-6 text-purple-400" />,
        description: 'Contribution guidelines',
        type: 'file',
        content: `# Contributing to OmniaOS

## Join Our Community

We welcome contributions from developers, designers, and relationship experts of all skill levels! OmniaOS is an open-source project that thrives on community involvement to help people build better relationships.

### Our Mission

OmniaOS is dedicated to providing a safe, supportive environment where people can improve their romantic relationships through AI companionship. We believe that everyone deserves access to relationship support and guidance.

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
   - Prioritize privacy and security

3. **Design Principles**
   - Focus on emotional safety and user well-being
   - Maintain beautiful, intuitive user experience
   - Ensure accessibility for all users
   - Keep performance optimized
   - Respect user privacy

4. **AI Ethics Guidelines**
   - Ensure AI companions are supportive and helpful
   - Maintain professional standards in AI responses
   - Protect user emotional well-being
   - Provide clear AI capabilities and limitations
   - Design for user empowerment and growth

### Development Setup

\`\`\`bash
git clone https://github.com/your-username/omniaos.git
cd omniaos
npm install
npm run dev
\`\`\`

### Areas of Contribution

#### Technical Development
- **Frontend Development**: React, TypeScript, Tailwind CSS
- **AI Integration**: Natural language processing, conversation systems
- **Security & Privacy**: Encryption, data protection, user safety
- **Performance**: Optimization, scalability, user experience
- **Testing**: Unit tests, integration tests, user testing

#### Content & Design
- **AI Companion Personalities**: Help develop Samantha, Elias, and Lyra
- **User Experience**: Interface design, user flows, accessibility
- **Documentation**: Guides, tutorials, help content
- **Relationship Expertise**: Dating advice, communication strategies
- **Community Support**: User support, feedback, community building

#### Research & Innovation
- **AI Ethics**: Ensuring responsible AI development
- **Relationship Psychology**: Understanding human connection needs
- **Privacy Research**: Best practices for user data protection
- **Accessibility**: Making OmniaOS available to everyone
- **User Research**: Understanding user needs and experiences

### Community Guidelines

- **Be Respectful**: Treat everyone with kindness and respect
- **Support Growth**: Help others learn and improve
- **Share Knowledge**: Contribute your expertise and experience
- **Prioritize Safety**: Always consider user emotional well-being
- **Maintain Privacy**: Respect and protect user confidentiality
- **Have Fun**: Enjoy building something meaningful together

### Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. We expect all participants to:

- Be respectful and considerate of others
- Focus on what is best for the community
- Show empathy towards other community members
- Respect different opinions and viewpoints
- Take responsibility for their words and actions

### Recognition

Contributors will be featured in:
- README credits and acknowledgments
- Website contributor hall of fame
- Special community roles and recognition
- Featured in our relationship improvement mission
- Recognition for helping people build better relationships

### Getting Started

1. **Choose Your Area**: Pick an area that interests you
2. **Read the Documentation**: Understand our mission and goals
3. **Join Discussions**: Participate in community conversations
4. **Start Small**: Begin with simple contributions
5. **Ask Questions**: Don't hesitate to ask for help or clarification

### Impact

By contributing to OmniaOS, you're helping to:
- Provide relationship support to people worldwide
- Create safe spaces for emotional growth
- Advance AI ethics and responsible development
- Build technology that genuinely helps people
- Make relationship guidance accessible to everyone

Thank you for being part of our mission to help people build better relationships! 💕✨`
      }
    ],
    apps: [
      {
        id: 'ai-companions',
        name: 'AI Companions',
        icon: <Sparkles className="w-6 h-6 text-pink-300" />,
        description: 'Meet Samantha, Elias, and Lyra',
        type: 'component',
        component: <AICompanionView onClose={() => setActiveFile(null)} />
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
                          'bg-pink-500/20 border-pink-400'} 
                        border-2 relative group cursor-pointer
                      `}>
                        <div className={`
                          absolute inset-0 rounded-full
                          ${node.status === 'active' ? 'bg-cyan-400' :
                            node.status === 'idle' ? 'bg-yellow-400' :
                            'bg-pink-400'}
                          animate-ping opacity-20
                        `} />
                        <Network className={`
                          w-6 h-6
                          ${node.status === 'active' ? 'text-cyan-400' :
                            node.status === 'idle' ? 'text-yellow-400' :
                            'text-pink-400'}
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
      },
      {
        id: 'github-social',
        name: 'GitHub',
        icon: <Github className="w-6 h-6 text-gray-400" />,
        description: 'Visit our GitHub Repository',
        type: 'component',
        component: (
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-500/30">
              <div className="text-center">
                <Github className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">GitHub Repository</h2>
                <p className="text-gray-400 mb-6">
                  Explore the source code, contribute to the project, and join our developer community.
                </p>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Github className="w-5 h-5" />
                  <span>Visit Repository</span>
                </a>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'x-social',
        name: 'X (Twitter)',
        icon: <XLogo size={24} className="text-white" />,
        description: 'Follow us on X for updates',
        type: 'component',
        component: (() => {
          const { tweets, loading, error, refreshTweets } = useTwitterFeed();
          
          return (
            <div className="max-w-2xl mx-auto bg-black rounded-3xl border border-gray-800 shadow-2xl flex flex-col h-[700px]">
              {/* X Mobile Header */}
              <div className="bg-black/95 backdrop-blur-sm border-b border-gray-800 px-4 py-3 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <OmniaLogo size={24} className="rounded-full" />
                  <span className="text-white font-semibold">OmniaOS</span>
                </div>
                <XLogo size={20} className="text-white" />
                <button 
                  onClick={refreshTweets}
                  className="p-2 rounded-full hover:bg-gray-800/50 transition-colors"
                >
                  <RotateCw size={16} className={`text-gray-400 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Feed */}
              <div className="flex-1 overflow-y-auto">
                {loading && (
                  <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                    <span className="ml-3 text-gray-400">Loading tweets...</span>
                  </div>
                )}
                
                {error && (
                  <div className="p-4 text-center">
                    <div className="text-red-400 mb-2">Failed to load tweets</div>
                    <button 
                      onClick={refreshTweets}
                      className="text-pink-400 hover:text-pink-300 text-sm"
                    >
                      Try again
                    </button>
                  </div>
                )}
                
                {!loading && !error && tweets.map((tweet) => (
                  <div key={tweet.id} className="border-b border-gray-800 p-4 hover:bg-gray-900/30 transition-colors">
                    {/* Retweet indicator */}
                    {tweet.type === 'retweet' && (
                      <div className="flex items-center space-x-2 mb-2 text-gray-500 text-sm">
                        <Share2 size={14} />
                        <span>{tweet.retweetedBy?.name} retweeted</span>
                      </div>
                    )}
                    
                    {/* Reply indicator */}
                    {tweet.type === 'reply' && (
                      <div className="flex items-center space-x-2 mb-2 text-gray-500 text-sm">
                        <MessageSquare size={14} />
                        <span>Replying to {tweet.replyingTo}</span>
                      </div>
                    )}

                    <div className="flex space-x-3">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gray-700 bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                        <img 
                          src={tweet.user.avatar} 
                          alt={tweet.user.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* User info */}
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-white font-bold truncate">{tweet.user.name}</span>
                          {tweet.user.verified && (
                            <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                          <span className="text-gray-500 truncate">{tweet.user.handle}</span>
                          <span className="text-gray-500">·</span>
                          <span className="text-gray-500">{tweet.timestamp}</span>
                        </div>

                        {/* Tweet content */}
                        <div className="text-white text-sm mb-3 leading-relaxed">
                          {tweet.content.split(' ').map((word, i) => {
                            if (word.startsWith('#')) {
                              return <span key={i} className="text-blue-400 hover:underline cursor-pointer">{word} </span>;
                            } else if (word.startsWith('@')) {
                              return <span key={i} className="text-blue-400 hover:underline cursor-pointer">{word} </span>;
                            }
                            return <span key={i}>{word} </span>;
                          })}
                        </div>

                        {/* Engagement */}
                        <div className="flex items-center justify-between max-w-xs">
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-400 transition-colors group">
                            <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
                              <MessageSquare size={16} />
                            </div>
                            <span className="text-sm">{tweet.replies}</span>
                          </button>

                          <button className="flex items-center space-x-2 text-gray-500 hover:text-green-400 transition-colors group">
                            <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
                              <Share2 size={16} />
                            </div>
                            <span className="text-sm">{tweet.retweets}</span>
                          </button>

                                  <button className="flex items-center space-x-2 text-gray-500 hover:text-pink-400 transition-colors group">
          <div className="p-2 rounded-full group-hover:bg-pink-500/10 transition-colors">
                              <Heart size={16} />
                            </div>
                            <span className="text-sm">{tweet.likes}</span>
                          </button>

                          <button className="text-gray-500 hover:text-blue-400 transition-colors group">
                            <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
                              <Share2 size={16} />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom bar */}
              <div className="bg-black/95 backdrop-blur-sm border-t border-gray-800 p-4 flex-shrink-0">
                <a 
                  href="https://x.com/omniaosdotfun" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-3 rounded-full font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <XLogo size={16} className="text-white" />
                  <span>Follow @omniaosdotfun on X</span>
                </a>
              </div>
            </div>
          );
        })()
      },
      {
        id: 'telegram-social',
        name: 'Telegram',
        icon: <Send className="w-6 h-6 text-blue-400" />,
        description: 'Join our Telegram community',
        type: 'component',
        component: (
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-blue-500/30">
              <div className="text-center">
                <Send className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Telegram Community</h2>
                <p className="text-gray-400 mb-6">
                  Join our Telegram channel for real-time discussions, support, and community updates.
                </p>
                <a 
                  href="https://telegram.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                  <span>Join Community</span>
                </a>
              </div>
            </div>
          </div>
        )
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
                            metric.trend === 'down' ? 'text-pink-400 rotate-90' :
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

  if (isMobile) {
    // Mobile Layout - Fully Responsive Modal
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-2">
        <div className="bg-gradient-to-br from-gray-900/95 to-black/95 rounded-2xl w-[96%] max-w-2xl max-h-[95vh] border border-pink-700/30 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col mobile-folder-wrapper">
          {/* Mobile Header - Fixed height */}
                      <div className="flex items-center justify-between p-3 border-b border-pink-700/30 bg-gray-900/50 h-13 flex-shrink-0">
            <h2 className="text-base font-semibold text-white flex items-center truncate">
                              <Folder className="w-4 h-4 text-pink-300 mr-2 flex-shrink-0" />
              <span className="truncate text-sm">{folderId.charAt(0).toUpperCase() + folderId.slice(1)}</span>
            </h2>
            <button
              onClick={handleClose}
                              className="flex items-center justify-center w-8 h-8 bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 hover:text-pink-300 rounded-full border border-pink-500/30 transition-all duration-300 active:scale-95 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Content - Flexible height with proper scrolling */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {!activeFile ? (
              // File List View - Proper scroll container
              <div className="flex-1 overflow-y-auto p-3">
                <div className="space-y-2">
                  {folderContents[folderId]?.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleFileClick(item.id)}
                      className="flex items-center justify-between p-2.5 bg-gray-800/50 rounded-lg border border-gray-700/50 active:bg-gray-700/50 transition-all duration-200 min-h-[50px]"
                    >
                      <div className="flex items-center space-x-2.5 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          {React.cloneElement(item.icon as React.ReactElement, { className: "w-4 h-4 text-current" })}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-medium text-xs truncate">{item.name}</div>
                          <div className="text-gray-400 text-[10px] truncate">{item.description}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Content View - Proper scroll container
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {/* Back Button */}
                <div className="p-2.5 border-b border-gray-700/50 bg-gray-900/30 flex-shrink-0">
                  <button
                    onClick={() => setActiveFile(null)}
                    className="flex items-center text-pink-400 hover:text-pink-300 bg-pink-500/10 hover:bg-pink-500/20 px-2.5 py-1.5 rounded-md transition-all duration-200 min-h-[36px]"
                  >
                    <ChevronRight className="w-3.5 h-3.5 rotate-180 mr-1.5 flex-shrink-0" />
                    <span className="text-xs truncate">Back to {folderId.charAt(0).toUpperCase() + folderId.slice(1)}</span>
                  </button>
                </div>
                
                {/* Content - Proper scroll container with padding */}
                <div className="flex-1 overflow-y-auto p-3">
                  <div className="mobile-content-wrapper">
                    {showSettings && <SystemSettings onClose={() => setActiveFile(null)} />}
                    {showTerminal && <Terminal onClose={() => setActiveFile(null)} />}
                    {!showSettings && !showTerminal && (
                      folderContents[folderId]?.find(item => item.id === activeFile)?.type === 'component' ? (
                        <div className="mobile-component-container">
                          {folderContents[folderId]?.find(item => item.id === activeFile)?.component}
                        </div>
                      ) : (
                        <div className="prose prose-invert prose-sm max-w-none mobile-prose">
                          <ReactMarkdown>{fileContent}</ReactMarkdown>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-8">
              <div className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-3xl p-8 max-w-6xl w-full h-[80vh] border border-pink-700/30 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <Folder className="w-8 h-8 text-pink-300 mr-4" />
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
                    ? 'bg-pink-700/20 border border-pink-700/30' 
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
          <div className="flex-1 bg-gray-900/50 rounded-xl p-6 overflow-y-auto border border-pink-700/20">
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