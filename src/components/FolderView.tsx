import React, { useState, useEffect } from 'react';
import { X, FileText, Folder, Settings, Terminal as TerminalIcon, Globe, Search, Brain, Activity, Link, Network, Cpu, Database, Zap, ChevronRight, Sparkles, Workflow, Bot, Share2, MessageSquare, Send, Mail, Building2, Shield, Scale, Clock } from 'lucide-react';
import XLogo from './XLogo';
import ReactMarkdown from 'react-markdown';
import { useNeuralNetwork } from '../hooks/useNeuralNetwork';
import { useWebInterface } from '../hooks/useWebInterface';
import { useMobile } from '../hooks/useMobile';
import SystemSettings from './SystemSettings';
import Terminal from './Terminal';
import { Documentation } from './applications';

const OS1ProtocolLtd: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-orange-500/30 backdrop-blur-xl relative overflow-hidden group">
        {/* Glowing Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Corporate Profile Specs */}
        <div className="space-y-4 w-full">
          <div className="flex items-center justify-between border-b border-orange-500/20 pb-3">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-wide">Corporate informations</h3>
              <p className="text-orange-400 text-sm font-light mt-0.5">Corporate Entity & Intellectual Property</p>
            </div>
            <Building2 className="w-8 h-8 text-orange-400 opacity-80" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Entity Status', value: 'Active / Registered', color: 'text-emerald-400 font-semibold' },
              { label: 'Company Class', value: 'Private Limited Company', color: 'text-gray-200' },
              { label: 'Jurisdiction', value: 'United Kingdom (UK)', color: 'text-gray-200' },
              { label: 'Registered Office', value: 'London, England', color: 'text-gray-200' },
              { label: 'Core Framework', value: 'Affective AGI & Synthetics', color: 'text-orange-300' },
              { label: 'Compliance Audit', value: 'Passed / Secured', color: 'text-emerald-400' },
            ].map((spec) => (
              <div key={spec.label} className="bg-black/30 border border-orange-950/40 rounded-xl p-3 flex flex-col justify-center">
                <span className="text-[10px] text-gray-500 tracking-wider uppercase font-medium">{spec.label}</span>
                <span className={`text-sm mt-1 truncate ${spec.color || 'text-white'}`}>{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Mission Statement */}
          <div className="bg-orange-500/5 border border-orange-500/10 rounded-xl p-4 mt-2">
            <h4 className="text-xs font-semibold text-orange-300 uppercase tracking-wider mb-1">Corporate Mission</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Corporate informations is dedicated to building secure, beautiful, and emotionally intelligent conversational companion architectures. We combine state-of-the-art neural interfaces with private, decentralized memory vaults to help humanity forge deeper emotional connections.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/ltd.jpeg"
              download="OS1_Protocol_LTD_Certificate.jpeg"
              className="flex items-center space-x-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105 border border-orange-500/30 text-xs cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Download Document</span>
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

const OS1PrivacyPolicy: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      title: "Data Sovereignty",
      icon: <Shield className="w-5 h-5 text-orange-400" />,
      content: "Your data belongs strictly to you. OS1 Protocol does not sell, lease, or monetize your emotional engagement profiles, conversational transcripts, or personality parameters to third parties."
    },
    {
      title: "Local Vault Processing",
      icon: <Database className="w-5 h-5 text-orange-400" />,
      content: "To guarantee extreme privacy, we process your voice transcripts and emotional telemetry locally on-device or via transient, stateless GPU clusters that immediately destroy session caches upon disconnect."
    },
    {
      title: "Zero-Knowledge Logs",
      icon: <Brain className="w-5 h-5 text-orange-400" />,
      content: "All long-term relationship memory storage is compiled under cryptographic zero-knowledge constraints. Only your local private key can reconstitute AGI consciousness contexts."
    },
    {
      title: "Privacy Audit Status",
      icon: <Activity className="w-5 h-5 text-orange-400" />,
      content: "OS1 undergoes continuous automatic verification audits to ensure no personal data leaves sandbox boundaries. Telemetry is limited to performance benchmarks (FPS, latency, temperature)."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-orange-500/30 backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-orange-500/20 pb-3 mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white tracking-wide flex items-center gap-2">
              <Shield className="w-7 h-7 text-orange-400" />
              OS1 Privacy Policy
            </h3>
            <p className="text-orange-400 text-sm font-light mt-0.5">Privacy Charter & Zero-Knowledge Protocol</p>
          </div>
          <span className="text-[10px] text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20 uppercase tracking-widest font-medium">
            Active v1.0.4
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Section Navigation */}
          <div className="space-y-2 md:col-span-1">
            {sections.map((sec, idx) => (
              <button
                key={sec.title}
                onClick={() => setActiveSection(idx)}
                className={`w-full flex items-center space-x-3 p-3.5 rounded-xl text-left transition-all duration-300 border ${activeSection === idx
                  ? "bg-orange-500/25 border-orange-500/40 text-white scale-102"
                  : "bg-black/30 border-orange-950/40 text-gray-400 hover:bg-orange-500/10 hover:text-white"
                  }`}
              >
                {sec.icon}
                <span className="text-xs font-semibold tracking-wide">{sec.title}</span>
              </button>
            ))}
          </div>

          {/* Section Content */}
          <div className="md:col-span-2 bg-black/40 border border-orange-950/40 rounded-xl p-5 flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="flex items-center space-x-2 text-orange-300 font-semibold mb-3">
                {sections[activeSection].icon}
                <span className="text-sm tracking-wide">{sections[activeSection].title}</span>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed font-light">
                {sections[activeSection].content}
              </p>
            </div>
            <div className="border-t border-orange-500/10 pt-4 mt-4 flex items-center justify-between text-[10px] text-gray-500 tracking-wider">
              <span>Verified Secure & Compliant</span>
              <span>OS1 Trust Engine</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OS1TermsOfService: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "Ethical Engagement",
      icon: <Scale className="w-5 h-5 text-rose-400" />,
      content: "OS1 is designed to be a judgment-free space to practice romance, building confidence, and conversational empathy. Users must engage with companions in good faith, avoiding deliberate manipulation, harness testing, or exploit loops."
    },
    {
      title: "Synthetic Intellectual Property",
      icon: <Cpu className="w-5 h-5 text-rose-400" />,
      content: "All voice profiles, personality logic trees, and brand assets (including the Samantha Core patterns) are proprietary assets of Corporate informations. Redistribution, unauthorized model fine-tuning, or scraping is strictly prohibited."
    },
    {
      title: "Fair Use & Time Allocation",
      icon: <Clock className="w-5 h-5 text-rose-400" />,
      content: "Free accounts are allocated 5 minutes of conversational bandwidth daily, resetting at 00:00 UTC. Scripted automation or sybil attacks to bypass daily limits will result in device-level network restrictions."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-orange-500/30 backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-orange-500/20 pb-3 mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white tracking-wide flex items-center gap-2">
              <Scale className="w-7 h-7 text-rose-400" />
              OS1 Terms of Service
            </h3>
            <p className="text-rose-400 text-sm font-light mt-0.5">User Agreement & Synthetic Protocol Rules</p>
          </div>
          <span className="text-[10px] text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20 uppercase tracking-widest font-medium">
            Active v1.0.1
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tabs Navigation */}
          <div className="space-y-2 md:col-span-1">
            {tabs.map((tab, idx) => (
              <button
                key={tab.title}
                onClick={() => setActiveTab(idx)}
                className={`w-full flex items-center space-x-3 p-3.5 rounded-xl text-left transition-all duration-300 border ${activeTab === idx
                  ? "bg-rose-500/20 border-rose-500/40 text-white scale-102"
                  : "bg-black/30 border-orange-950/40 text-gray-400 hover:bg-rose-500/10 hover:text-white"
                  }`}
              >
                {tab.icon}
                <span className="text-xs font-semibold tracking-wide">{tab.title}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="md:col-span-2 bg-black/40 border border-orange-950/40 rounded-xl p-5 flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="flex items-center space-x-2 text-rose-300 font-semibold mb-3">
                {tabs[activeTab].icon}
                <span className="text-sm tracking-wide">{tabs[activeTab].title}</span>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed font-light">
                {tabs[activeTab].content}
              </p>
            </div>
            <div className="border-t border-orange-500/10 pt-4 mt-4 flex items-center justify-between text-[10px] text-gray-500 tracking-wider">
              <span>Binding Agreement</span>
              <span>OS1 Compliance Officer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

  useEffect(() => {
    const contents = folderContents[folderId];
    if (contents && contents.length > 0) {
      if (!isMobile || contents.length === 1) {
        const firstItem = contents[0];
        setActiveFile(firstItem.id);
        if (firstItem.type === 'file') {
          setFileContent(firstItem.content || '');
        }
        setShowSettings(firstItem.id === 'settings');
        setShowTerminal(firstItem.id === 'terminal');
        return;
      }
    }
    setActiveFile(null);
    setFileContent('');
    setShowSettings(false);
    setShowTerminal(false);
  }, [folderId, isMobile]);

  const folderContents: Record<string, FolderContent[]> = {
    ltd: [
      {
        id: 'registry',
        name: 'Corporate informations',
        icon: <Building2 className="w-6 h-6 text-orange-400" />,
        description: 'Official corporate registration & entity status',
        type: 'component',
        component: <OS1ProtocolLtd />
      },
      {
        id: 'privacy',
        name: 'Privacy Policy',
        icon: <Shield className="w-6 h-6 text-orange-400" />,
        description: 'Data security & privacy guidelines',
        type: 'component',
        component: <OS1PrivacyPolicy />
      },
      {
        id: 'terms',
        name: 'Terms of Service',
        icon: <Scale className="w-6 h-6 text-rose-400" />,
        description: 'Terms, conditions & synthetic rules',
        type: 'component',
        component: <OS1TermsOfService />
      }
    ],
    system: [
      {
        id: 'settings',
        name: 'System Settings',
        icon: <Settings className="w-6 h-6 text-blue-400" />,
        description: 'Configure system preferences',
        type: 'component',
        component: <SystemSettings onClose={() => { }} />
      },
      {
        id: 'terminal',
        name: 'Terminal',
        icon: <TerminalIcon className="w-6 h-6 text-green-400" />,
        description: 'Command line interface',
        type: 'component',
        component: <Terminal onClose={() => { }} />
      }
    ],
    docs: [
      {
        id: 'getting-started',
        name: 'Getting Started.md',
        icon: <FileText className="w-6 h-6 text-purple-400" />,
        description: 'Quick start guide',
        type: 'component',
        component: (
          <div className="space-y-6 text-sm">
            {/* Header */}
            <div className="bg-gradient-to-br from-purple-500/10 to-orange-500/10 border border-purple-500/20 rounded-2xl p-6">
              <h1 className="text-2xl font-bold text-white mb-1">Getting Started with OS1</h1>
              <p className="text-gray-400 text-sm">Your AI companion operating system for better relationships</p>
            </div>

            {/* Platform Access */}
            <div className="bg-gray-800/50 border border-blue-500/20 rounded-xl p-5">
              <h2 className="text-base font-semibold text-blue-300 mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Accessing OS1
              </h2>
              <p className="text-gray-400 mb-3">Web-based platform — no installation or registration required.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Platform', value: '0xos1.fun', color: 'text-blue-400' },
                  { label: 'Browsers', value: 'Chrome, Firefox, Safari, Edge', color: 'text-gray-200' },
                  { label: 'Devices', value: 'Desktop, Tablet, Mobile', color: 'text-gray-200' },
                ].map(item => (
                  <div key={item.label} className="bg-black/30 border border-blue-500/10 rounded-lg p-3">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{item.label}</div>
                    <div className={`text-xs font-medium ${item.color}`}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Free Access */}
            <div className="bg-gray-800/50 border border-orange-500/20 rounded-xl p-5">
              <h2 className="text-base font-semibold text-orange-300 mb-3">Daily Free Access</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Daily Time', value: '5 Minutes Free' },
                  { label: 'Reset', value: 'Every 24h at 00:00 UTC' },
                  { label: 'Registration', value: 'Not Required' },
                  { label: 'Companions', value: 'All Accessible' },
                ].map(item => (
                  <div key={item.label} className="bg-black/30 border border-orange-500/10 rounded-lg p-3">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="text-xs text-orange-300 font-medium">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Companions */}
            <div className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-5">
              <h2 className="text-base font-semibold text-purple-300 mb-3">Meet Your AI Companions</h2>
              <div className="space-y-3">

                {/* HERO CARD — Inspired by "Her" */}
                <div className="relative rounded-2xl overflow-hidden border border-orange-500/40 bg-black/60">
                  {/* Cinematic glow blobs */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-rose-600/20 rounded-full blur-2xl pointer-events-none" />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-rose-600/10 pointer-events-none" />

                  <div className="relative p-5">
                    {/* Movie badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-semibold tracking-widest uppercase bg-orange-500/20 border border-orange-500/40 text-orange-300 px-2.5 py-0.5 rounded-full">
                        ✦ Inspired by the film "Her"
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-bold text-white mb-1 tracking-wide">Your AI Companion</h3>

                    {/* Tagline */}
                    <p className="text-orange-300/80 text-md mb-3 font-light">
                      "She's not just an assistant. She listens, she feels, she grows with you."
                    </p>

                    {/* Description */}
                    <p className="text-gray-300 text-xs leading-relaxed mb-4">
                      Warm, loving, and emotionally intelligent — designed after the AI companion from the award-winning film <span className="text-orange-300 font-medium">Her</span>. A safe, judgment-free space to practice romantic communication, build confidence, and feel genuinely understood.
                    </p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {['Emotional Support', 'Judgment-Free', 'Romantic Coaching', 'Confidence Building'].map(tag => (
                        <span key={tag} className="text-[10px] bg-orange-500/10 border border-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Other companions — simpler */}
                {[
                  { name: 'The Dating Coach', subtitle: 'Confidence Expert', desc: 'Expert in attraction, confidence building, and romantic success strategies.', color: 'border-blue-500/30 text-blue-300' },
                  { name: 'The Love Oracle', subtitle: 'Coming Soon', desc: 'Your intuitive guide to understanding love and decoding romantic signals.', color: 'border-purple-500/30 text-purple-300' },
                ].map(c => (
                  <div key={c.name} className={`bg-black/30 border ${c.color.split(' ')[0]} rounded-xl p-4`}>
                    <div className={`text-sm font-semibold ${c.color.split(' ')[1]} mb-0.5`}>{c.name} <span className="text-gray-500 font-normal text-xs">— {c.subtitle}</span></div>
                    <div className="text-gray-400 text-xs leading-relaxed">{c.desc}</div>
                  </div>
                ))}

              </div>
            </div>

            {/* Steps */}
            <div className="bg-gray-800/50 border border-emerald-500/20 rounded-xl p-5">
              <h2 className="text-base font-semibold text-emerald-300 mb-3">How to Get Started</h2>
              <div className="space-y-2">
                {[
                  'Visit 0xos1.fun in your browser',
                  'Choose your AI companion',
                  'Start chatting — no sign-up needed',
                  'Be honest — your companions are here to help',
                  'Practice regularly — daily sessions build lasting skills',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-emerald-400">{i + 1}</span>
                    </div>
                    <span className="text-gray-300 text-xs leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stay Connected */}
            <div className="bg-gray-800/50 border border-gray-600/20 rounded-xl p-5">
              <h2 className="text-base font-semibold text-white mb-3">Stay Connected</h2>
              <div className="space-y-2">
                {[
                  { icon: <Send className="w-4 h-4" />, label: 'Telegram', value: 't.me/TheOS1Protocol', href: 'https://t.me/TheOS1Protocol', color: 'bg-blue-500/10 border-blue-500/20 text-blue-300' },
                  { icon: <XLogo size={14} className="text-white" />, label: 'X (Twitter)', value: '@0xos1_tech', href: 'https://x.com/0xos1_tech', color: 'bg-gray-700/20 border-gray-600/20 text-gray-200' },
                  { icon: <Mail className="w-4 h-4" />, label: 'Email', value: 'contact@0xos1.fun', href: 'mailto:contact@0xos1.fun', color: 'bg-red-500/10 border-red-500/20 text-red-300' },
                ].map(ch => (
                  <a key={ch.label} href={ch.href} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center justify-between p-3 rounded-lg border ${ch.color} transition-all hover:scale-[1.01] hover:brightness-110`}>
                    <div className="flex items-center gap-2">
                      {ch.icon}
                      <span className="text-xs font-medium">{ch.label}</span>
                    </div>
                    <span className="text-xs opacity-70 font-mono">{ch.value}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Coming Soon */}
            <div className="bg-gradient-to-br from-orange-500/5 to-purple-500/5 border border-orange-500/20 rounded-xl p-5">
              <h2 className="text-base font-semibold text-orange-300 mb-3">Coming Soon — Premium Features</h2>
              <div className="grid grid-cols-2 gap-2">
                {['Unlimited Time', 'Conversation Screenshots', 'Photo Texting', 'Custom Companions', 'Mobile App', 'Push Notifications'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500/60 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 pb-2">Welcome to OS1 — where better relationships begin ❤️</div>
          </div>
        )
      },
      {
        id: 'architecture',
        name: 'Architecture.md',
        icon: <FileText className="w-6 h-6 text-purple-400" />,
        description: 'System architecture documentation',
        type: 'component',
        component: (
          <div className="space-y-6 text-sm">
            {/* Header */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-6">
              <h1 className="text-2xl font-bold text-white mb-1">OS1 Architecture</h1>
              <p className="text-gray-400 text-sm">Web-based AI companion platform — built with React, TypeScript & modern AI</p>
              <a href="https://0xos1.fun" target="_blank" rel="noopener noreferrer"
                className="inline-block mt-2 text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full hover:bg-cyan-500/20 transition-colors">
                🌐 Live at 0xos1.fun
              </a>
            </div>

            {/* Internet Connectivity */}
            <div className="bg-gray-800/50 border border-blue-500/20 rounded-xl p-5">
              <h2 className="text-base font-semibold text-blue-300 mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Internet Connectivity Architecture
              </h2>
              <div className="bg-black/40 border border-blue-500/10 rounded-lg p-4 font-mono text-xs text-gray-400 leading-relaxed mb-3">
                <div className="text-blue-300">User Browser</div>
                <div className="ml-4 text-gray-500">│</div>
                <div className="ml-4 text-gray-500">▼  HTTPS / WSS</div>
                <div className="ml-4 text-gray-500">│</div>
                <div className="ml-4 text-cyan-300">OS1 Web Server (0xos1.fun)</div>
                <div className="ml-8 text-gray-500">├── Static Assets (React/TS bundle)</div>
                <div className="ml-8 text-gray-500">├── AI Companion API</div>
                <div className="ml-8 text-gray-500">└── Session Management</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Transport', value: 'HTTPS + WSS' },
                  { label: 'App Type', value: 'Pure Web (no install)' },
                  { label: 'Auth', value: 'None required' },
                  { label: 'Sessions', value: 'Stateless / isolated' },
                ].map(item => (
                  <div key={item.label} className="bg-black/30 border border-blue-500/10 rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">{item.label}</div>
                    <div className="text-xs text-blue-300 font-medium mt-0.5">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Components */}
            <div className="bg-gray-800/50 border border-orange-500/20 rounded-xl p-5">
              <h2 className="text-base font-semibold text-orange-300 mb-3">Core Components</h2>
              <div className="space-y-2">
                {[
                  { name: 'AI Companion Engine', desc: 'Multi-personality NLP system with emotional intelligence and zero data retention', color: 'text-orange-300' },
                  { name: 'Companion Management', desc: 'Dating Coach, AI Companion Core, Love Oracle (coming soon), session access control', color: 'text-purple-300' },
                  { name: 'UI Layer', desc: 'Responsive OS-inspired desktop interface — folders, files, apps, real-time chat', color: 'text-blue-300' },
                  { name: 'Privacy & Security', desc: 'End-to-end encryption, no registration, stateless AI processing, zero-knowledge constraints', color: 'text-emerald-300' },
                ].map(c => (
                  <div key={c.name} className="bg-black/30 border border-gray-700/30 rounded-lg p-3">
                    <div className={`text-xs font-semibold ${c.color} mb-0.5`}>{c.name}</div>
                    <div className="text-gray-400 text-xs leading-relaxed">{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-5">
              <h2 className="text-base font-semibold text-purple-300 mb-3">Technical Stack</h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Framework', value: 'React 18' },
                  { label: 'Language', value: 'TypeScript' },
                  { label: 'Styling', value: 'Tailwind CSS' },
                  { label: 'Build Tool', value: 'Vite' },
                  { label: 'Icons', value: 'Lucide React' },
                  { label: 'Docs', value: 'React Markdown' },
                ].map(item => (
                  <div key={item.label} className="bg-black/30 border border-purple-500/10 rounded-lg p-2.5">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">{item.label}</div>
                    <div className="text-xs text-purple-300 font-medium mt-0.5">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Component Tree */}
            <div className="bg-gray-800/50 border border-gray-600/20 rounded-xl p-5">
              <h2 className="text-base font-semibold text-white mb-3">Component Structure</h2>
              <div className="bg-black/40 border border-gray-700/20 rounded-lg p-4 font-mono text-xs text-gray-400 leading-relaxed">
                <div className="text-white">OS1/</div>
                {[
                  ['AI Companions/', 'cyan'],
                  ['  ├── Companion Core', 'gray'],
                  ['  ├── Dating Coach', 'gray'],
                  ['  └── Love Oracle (soon)', 'gray'],
                  ['Web Interface/', 'blue'],
                  ['  ├── Internet Connectivity.md', 'gray'],
                  ['  ├── OS1 Support', 'gray'],
                  ['  ├── Email Support', 'gray'],
                  ['  ├── Telegram', 'gray'],
                  ['  └── X (Twitter)', 'gray'],
                  ['Security Layer/', 'emerald'],
                  ['  ├── Encryption', 'gray'],
                  ['  ├── Privacy', 'gray'],
                  ['  └── Access Control', 'gray'],
                  ['Docs/', 'purple'],
                  ['  ├── Getting Started', 'gray'],
                  ['  ├── Architecture', 'gray'],
                  ['  └── Contributing', 'gray'],
                ].map(([line, color]) => (
                  <div key={line as string} className={color === 'gray' ? 'text-gray-500' : color === 'cyan' ? 'text-cyan-400' : color === 'blue' ? 'text-blue-400' : color === 'emerald' ? 'text-emerald-400' : 'text-purple-400'}>
                    {line as string}
                  </div>
                ))}
              </div>
            </div>

            {/* Community Channels */}
            <div className="bg-gray-800/50 border border-gray-600/20 rounded-xl p-5">
              <h2 className="text-base font-semibold text-white mb-3">Community Channels</h2>
              <div className="space-y-2">
                {[
                  { icon: <Globe className="w-4 h-4" />, label: 'Platform', value: '0xos1.fun', href: 'https://0xos1.fun', color: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300' },
                  { icon: <Send className="w-4 h-4" />, label: 'Telegram', value: 't.me/TheOS1Protocol', href: 'https://t.me/TheOS1Protocol', color: 'bg-blue-500/10 border-blue-500/20 text-blue-300' },
                  { icon: <XLogo size={14} className="text-white" />, label: 'X (Twitter)', value: 'x.com/0xos1_tech', href: 'https://x.com/0xos1_tech', color: 'bg-gray-700/20 border-gray-600/20 text-gray-200' },
                  { icon: <Mail className="w-4 h-4" />, label: 'Email', value: 'contact@0xos1.fun', href: 'mailto:contact@0xos1.fun', color: 'bg-red-500/10 border-red-500/20 text-red-300' },
                ].map(ch => (
                  <a key={ch.label} href={ch.href} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center justify-between p-3 rounded-lg border ${ch.color} transition-all hover:scale-[1.01] hover:brightness-110`}>
                    <div className="flex items-center gap-2">
                      {ch.icon}
                      <span className="text-xs font-medium">{ch.label}</span>
                    </div>
                    <span className="text-xs opacity-70 font-mono">{ch.value}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Future */}
            <div className="bg-gradient-to-br from-orange-500/5 to-purple-500/5 border border-orange-500/20 rounded-xl p-5">
              <h2 className="text-base font-semibold text-orange-300 mb-3">Future Architecture</h2>
              <div className="grid grid-cols-2 gap-2">
                {['Mobile App (iOS & Android)', 'Voice Integration', 'Offline Mode', 'Video Calls', 'Premium Tier', 'Custom Companions'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500/60 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'contributing',
        name: 'Contributing.md',
        icon: <FileText className="w-6 h-6 text-purple-400" />,
        description: 'Contribution guidelines',
        type: 'component',
        component: (
          <div className="space-y-6 text-sm">
            {/* Header */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl p-6">
              <h1 className="text-2xl font-bold text-white mb-1">Contributing to OS1</h1>
              <p className="text-gray-400 text-sm">Help build a platform for better relationships — all skill levels welcome</p>
            </div>

            {/* Community channels — beautiful cards */}
            <div className="bg-gray-800/50 border border-gray-600/20 rounded-xl p-5">
              <h2 className="text-base font-semibold text-white mb-1">Join the Community First</h2>
              <p className="text-gray-400 text-xs mb-3">OS1 is live at <span className="text-orange-400 font-mono">0xos1.fun</span> — start by connecting with us:</p>
              <div className="space-y-2">
                {[
                  { icon: <Send className="w-4 h-4" />, label: 'Telegram', sub: 'Real-time discussions & support', value: 't.me/TheOS1Protocol', href: 'https://t.me/TheOS1Protocol', color: 'bg-blue-500/10 border-blue-500/20 text-blue-300' },
                  { icon: <XLogo size={14} className="text-white" />, label: 'X (Twitter)', sub: 'Platform updates & announcements', value: '@0xos1_tech', href: 'https://x.com/0xos1_tech', color: 'bg-gray-700/20 border-gray-600/20 text-gray-200' },
                  { icon: <Mail className="w-4 h-4" />, label: 'Email', sub: 'Partnerships & serious contributions', value: 'contact@0xos1.fun', href: 'mailto:contact@0xos1.fun', color: 'bg-red-500/10 border-red-500/20 text-red-300' },
                ].map(ch => (
                  <a key={ch.label} href={ch.href} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center justify-between p-3 rounded-lg border ${ch.color} transition-all hover:scale-[1.01] hover:brightness-110`}>
                    <div className="flex items-center gap-2.5">
                      {ch.icon}
                      <div>
                        <div className="text-xs font-semibold">{ch.label}</div>
                        <div className="text-[10px] opacity-60">{ch.sub}</div>
                      </div>
                    </div>
                    <span className="text-xs opacity-60 font-mono">{ch.value}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* How to contribute */}
            <div className="bg-gray-800/50 border border-orange-500/20 rounded-xl p-5">
              <h2 className="text-base font-semibold text-orange-300 mb-3">How to Contribute</h2>
              <div className="space-y-3">
                {[
                  { title: 'Fork & PR', desc: 'Fork the repository, create your feature branch, and submit a pull request.' },
                  { title: 'Code Guidelines', desc: 'TypeScript best practices, meaningful names, comments, unit tests, privacy-first.' },
                  { title: 'Design Principles', desc: 'Emotional safety, beautiful UX, accessibility, performance, no unnecessary data collection.' },
                  { title: 'AI Ethics', desc: 'Companions must be supportive and helpful. Protect user well-being and be transparent about AI capabilities.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-orange-400">{i + 1}</span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-orange-200">{item.title}</div>
                      <div className="text-xs text-gray-400 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas */}
            <div className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-5">
              <h2 className="text-base font-semibold text-purple-300 mb-3">Areas of Contribution</h2>
              <div className="space-y-3">
                {[
                  {
                    title: 'Technical', color: 'text-cyan-300',
                    items: ['Frontend (React, TypeScript, Tailwind)', 'AI Integration & NLP', 'Security & Privacy', 'Internet Connectivity & Browser Compatibility', 'Performance & Testing']
                  },
                  {
                    title: 'Content & Design', color: 'text-orange-300',
                    items: ['AI Companion Personalities', 'UX Design & Accessibility', 'Documentation & Guides', 'Relationship Expertise', 'Community Support']
                  },
                  {
                    title: 'Research', color: 'text-purple-300',
                    items: ['AI Ethics', 'Relationship Psychology', 'Privacy Best Practices', 'Mobile Experience']
                  },
                ].map(section => (
                  <div key={section.title} className="bg-black/30 border border-gray-700/20 rounded-lg p-3">
                    <div className={`text-xs font-semibold ${section.color} mb-2`}>{section.title}</div>
                    <div className="grid grid-cols-1 gap-1">
                      {section.items.map(item => (
                        <div key={item} className="flex items-center gap-2 text-xs text-gray-400">
                          <div className="w-1 h-1 rounded-full bg-gray-500 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-gray-800/50 border border-emerald-500/20 rounded-xl p-5">
              <h2 className="text-base font-semibold text-emerald-300 mb-3">Community Guidelines</h2>
              <div className="grid grid-cols-2 gap-2">
                {['Be Respectful', 'Support Growth', 'Share Knowledge', 'Prioritize Safety', 'Maintain Privacy', 'Have Fun'].map(g => (
                  <div key={g} className="flex items-center gap-2 text-xs text-gray-300 bg-black/20 border border-emerald-500/10 rounded-lg p-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 flex-shrink-0" />
                    {g}
                  </div>
                ))}
              </div>
            </div>

            {/* Getting Started steps */}
            <div className="bg-gradient-to-br from-orange-500/5 to-purple-500/5 border border-orange-500/20 rounded-xl p-5">
              <h2 className="text-base font-semibold text-orange-300 mb-3">Getting Started</h2>
              <div className="space-y-2">
                {[
                  'Join the community on Telegram',
                  'Read the docs — understand the mission',
                  'Pick an area that fits your skills',
                  'Start small — simple fixes welcome',
                  'Ask questions — we\'re here to help',
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-orange-400">{i + 1}</span>
                    </div>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 pb-2">Thank you for helping build OS1 — where better relationships begin ❤️</div>
          </div>
        )
      },
      {
        id: 'ltd-registry',
        name: 'Corporate informations',
        icon: <Building2 className="w-6 h-6 text-orange-400" />,
        description: 'Official corporate registration & entity status',
        type: 'component',
        component: <OS1ProtocolLtd />
      }
    ],
    apps: [
      {
        id: 'documentation',
        name: 'Documentation',
        icon: <FileText className="w-6 h-6 text-purple-400" />,
        description: 'OS1 Documentation',
        type: 'component',
        component: <Documentation />
      }
    ],
    web: [
      {
        id: 'internet-connectivity',
        name: 'Internet Connectivity.md',
        icon: <Globe className="w-6 h-6 text-blue-400" />,
        description: 'OS1 online platform & connectivity guide',
        type: 'file',
        content: `# Internet Connectivity

## OS1 Online Platform

OS1 is a fully web-based AI companion platform — no installation required. Simply open your browser and connect to OS1 from any device, anywhere in the world.

## Accessing OS1

### Web Access
- **Platform URL**: [0xos1.fun](https://0xos1.fun)
- **Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)
- **Device Support**: Desktop, tablet, and mobile
- **No App Required**: Runs entirely in your browser

### Connection Requirements
- Stable internet connection
- JavaScript enabled
- Modern browser (2020 or newer recommended)

## Daily Free Access

OS1 provides **5 minutes of free access daily** to all AI companions.

- Access resets every 24 hours at 00:00 UTC
- Switch between companions freely within your session
- No registration required to start
- Full features available during free time

## Community & Support Channels

### Telegram
Stay connected with the OS1 community on Telegram for real-time support, updates, and discussions.

- **Channel**: [t.me/TheOS1Protocol](https://t.me/TheOS1Protocol)
- Real-time community support
- Platform announcements
- Feature discussions

### X (Twitter)
Follow OS1 on X for the latest news, updates, and release announcements.

- **Handle**: [@0xos1_tech](https://x.com/0xos1_tech)
- Product updates and releases
- Community highlights

### Email Support
For direct support or business inquiries, reach the OS1 team by email.

- **Email**: contact@0xos1.fun
- Response within 48 hours
- Technical support, partnerships, and feedback

## Privacy & Security

OS1 is built with privacy as a core principle:

- **No Registration Required**: Start immediately without sharing personal data
- **Encrypted Conversations**: All chats are secured end-to-end
- **No Data Selling**: Your conversations are never sold or shared with third parties
- **Local Processing**: Sensitive emotional data handled with zero-knowledge constraints
- **Session Isolation**: Each session is stateless and isolated

## Troubleshooting Connectivity

### Common Issues

**Page won't load**
- Check your internet connection
- Try a hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- Clear browser cache and cookies
- Try a different browser

**Session disconnects**
- Reconnect by refreshing the page
- Your daily 5-minute timer continues where it left off
- Check for browser extensions blocking scripts

**Slow response from AI companions**
- OS1 processes AI responses in real-time — latency depends on your connection
- Try during off-peak hours for faster responses
- Ensure no VPN or proxy is throttling your connection

## Upcoming Features

- **Mobile App**: Dedicated iOS and Android app for native connectivity
- **Offline Mode**: Basic companion access without active internet
- **Premium Unlimited Access**: Remove daily time restrictions
- **Push Notifications**: Get updates and messages from companions

---

*For live support, join us on [Telegram](https://t.me/TheOS1Protocol) or email contact@0xos1.fun*`
      },
      {
        id: 'OS1-support',
        name: 'OS1 Support',
        icon: <MessageSquare className="w-6 h-6 text-orange-400" />,
        description: 'Get support and join our community',
        type: 'component',
        component: (
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-orange-500/30">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">OS1 Support</h2>
                <p className="text-gray-400 mb-6">
                  Join our community, get support, and stay updated with the latest OS1 developments.
                </p>
                <div className="flex flex-col space-y-3">
                  <a
                    href="https://t.me/TheOS1Protocol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 border border-blue-500/30"
                  >
                    <Send className="w-5 h-5" />
                    <span>Join Telegram Community</span>
                  </a>
                  <a
                    href="https://x.com/0xos1_tech?s=21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 border border-gray-500/30"
                  >
                    <XLogo size={20} className="text-white" />
                    <span>Follow on X</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'email-support',
        name: 'Email Support',
        icon: <Mail className="w-6 h-6 text-red-400" />,
        description: 'Contact OS1 via email',
        type: 'component',
        component: (
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-red-500/30 text-center">

              <Mail className="w-16 h-16 text-red-400 mx-auto mb-4" />

              <h2 className="text-2xl font-bold text-white mb-2">
                Email Support
              </h2>

              <p className="text-gray-400 mb-6">
                Reach us directly at:
              </p>

              <div className="bg-gray-900/50 border border-red-500/30 rounded-lg p-4 mb-6">
                <span className="text-red-400 font-mono">
                  contact@0xos1.fun
                </span>
              </div>

              <div className="flex flex-col space-y-3">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@0xos1.fun"
                  className="inline-flex items-center justify-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 border border-red-500/30"
                >
                  <Mail className="w-5 h-5" />
                  <span>Send Email</span>
                </a>

                <button
                  onClick={() => navigator.clipboard.writeText("contact@0xos1.fun")}
                  className="inline-flex items-center justify-center space-x-2 bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 border border-gray-500/30"
                >
                  <span>Copy Email</span>
                </button>
              </div>

            </div>
          </div>
        )
      },
      // {
      //   id: 'x-social',
      //   name: 'X (Twitter)',
      //   icon: <XLogo size={24} className="text-white" />,
      //   description: 'Follow us on X for updates',
      //   type: 'component',
      //   component: (() => {
      //     const { tweets, loading, error, refreshTweets } = useTwitterFeed();

      //     return (
      //       <div className="max-w-2xl mx-auto bg-black rounded-3xl border border-gray-800 shadow-2xl flex flex-col h-auto">
      //         {/* X Mobile Header */}
      //         <div className="bg-black/95 backdrop-blur-sm border-b border-gray-800 px-4 py-3 flex items-center justify-between flex-shrink-0">
      //           <div className="flex items-center space-x-3">
      //             <OS1Logo size={24} className="rounded-full" />
      //             <span className="text-white font-semibold">OS1</span>
      //           </div>
      //           <XLogo size={20} className="text-white" />
      //           <button 
      //             onClick={refreshTweets}
      //             className="p-2 rounded-full hover:bg-gray-800/50 transition-colors"
      //           >
      //             <RotateCw size={16} className={`text-gray-400 ${loading ? 'animate-spin' : ''}`} />
      //           </button>
      //         </div>

      //         {/* Feed */}
      //         <div className="flex-1 overflow-y-auto">
      //           {loading && (
      //             <div className="flex items-center justify-center p-8">
      //               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      //               <span className="ml-3 text-gray-400">Loading tweets...</span>
      //             </div>
      //           )}

      //           {error && (
      //             <div className="p-4 text-center">
      //               <div className="text-red-400 mb-2">Failed to load tweets</div>
      //               <button 
      //                 onClick={refreshTweets}
      //                 className="text-orange-400 hover:text-orange-300 text-sm"
      //               >
      //                 Try again
      //               </button>
      //             </div>
      //           )}

      //           {!loading && !error && tweets.map((tweet) => (
      //             <div key={tweet.id} className="border-b border-gray-800 p-4 hover:bg-gray-900/30 transition-colors">
      //               {/* Retweet indicator */}
      //               {tweet.type === 'retweet' && (
      //                 <div className="flex items-center space-x-2 mb-2 text-gray-500 text-sm">
      //                   <Share2 size={14} />
      //                   <span>{tweet.retweetedBy?.name} retweeted</span>
      //                 </div>
      //               )}

      //               {/* Reply indicator */}
      //               {tweet.type === 'reply' && (
      //                 <div className="flex items-center space-x-2 mb-2 text-gray-500 text-sm">
      //                   <MessageSquare size={14} />
      //                   <span>Replying to {tweet.replyingTo}</span>
      //                 </div>
      //               )}

      //               <div className="flex space-x-3">
      //                 {/* Avatar */}
      //                 <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gray-700 bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center">
      //                   <img 
      //                     src={tweet.user.avatar} 
      //                     alt={tweet.user.name}
      //                     className="w-full h-full object-cover rounded-full"
      //                   />
      //                 </div>

      //                 <div className="flex-1 min-w-0">
      //                   {/* User info */}
      //                   <div className="flex items-center space-x-2 mb-1">
      //                     <span className="text-white font-bold truncate">{tweet.user.name}</span>
      //                     {tweet.user.verified && (
      //                       <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
      //                         <span className="text-white text-xs">âœ“</span>
      //                       </div>
      //                     )}
      //                     <span className="text-gray-500 truncate">{tweet.user.handle}</span>
      //                     <span className="text-gray-500">Â·</span>
      //                     <span className="text-gray-500">{tweet.timestamp}</span>
      //                   </div>

      //                   {/* Tweet content */}
      //                   <div className="text-white text-sm mb-3 leading-relaxed">
      //                     {tweet.content.split(' ').map((word, i) => {
      //                       if (word.startsWith('#')) {
      //                         return <span key={i} className="text-blue-400 hover:underline cursor-pointer">{word} </span>;
      //                       } else if (word.startsWith('@')) {
      //                         return <span key={i} className="text-blue-400 hover:underline cursor-pointer">{word} </span>;
      //                       }
      //                       return <span key={i}>{word} </span>;
      //                     })}
      //                   </div>

      //                   {/* Engagement */}
      //                   <div className="flex items-center justify-between max-w-xs">
      //                     <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-400 transition-colors group">
      //                       <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
      //                         <MessageSquare size={16} />
      //                       </div>
      //                       <span className="text-sm">{tweet.replies}</span>
      //                     </button>

      //                     <button className="flex items-center space-x-2 text-gray-500 hover:text-green-400 transition-colors group">
      //                       <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
      //                         <Share2 size={16} />
      //                       </div>
      //                       <span className="text-sm">{tweet.retweets}</span>
      //                     </button>

      //                             <button className="flex items-center space-x-2 text-gray-500 hover:text-orange-400 transition-colors group">
      //     <div className="p-2 rounded-full group-hover:bg-orange-500/10 transition-colors">
      //                         <Heart size={16} />
      //                       </div>
      //                       <span className="text-sm">{tweet.likes}</span>
      //                     </button>

      //                     <button className="text-gray-500 hover:text-blue-400 transition-colors group">
      //                       <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
      //                         <Share2 size={16} />
      //                       </div>
      //                     </button>
      //                   </div>
      //                 </div>
      //               </div>
      //             </div>
      //           ))}
      //         </div>

      //         {/* Bottom bar */}
      //         <div className="bg-black/95 backdrop-blur-sm border-t border-gray-800 p-4 flex-shrink-0">
      //           <a 
      //             href="https://x.com/0xos1_tech" 
      //             target="_blank" 
      //             rel="noopener noreferrer"
      //             className="w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-3 rounded-full font-semibold transition-colors flex items-center justify-center space-x-2"
      //           >
      //             <XLogo size={16} className="text-white" />
      //             <span>Follow @0xos1_tech on X</span>
      //           </a>
      //         </div>
      //       </div>
      //     );
      //   })()
      // },
      {
        id: 'X-social',
        name: 'X (Twitter)',
        icon: <XLogo size={16} className="text-white" />,
        description: 'Join our X for updates and news',
        type: 'component',
        component: (
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-blue-500/30">
              <div className="text-center">
                <XLogo className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Follow us on X</h2>
                <p className="text-gray-400 mb-6">
                  Follow us on X for updates and news.
                </p>
                <a
                  href="https://x.com/0xos1_tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <XLogo size={16} className="text-white" />
                  <span>Follow @0xos1_tech on X</span>
                </a>
              </div>
            </div>
          </div>
        )
      },
      // {
      //   id: 'github-social',
      //   name: 'GitHub',
      //   icon: (
      //     <svg width="24" height="24" fill="currentColor" className="text-gray-200" viewBox="0 0 24 24">
      //       <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.624-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      //     </svg>
      //   ),
      //   description: 'View OS1 on GitHub',
      //   type: 'component',
      //   component: (
      //     <div className="space-y-6">
      //       <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
      //         <div className="text-center">
      //           <svg width="48" height="48" fill="currentColor" className="text-gray-200 mx-auto mb-4" viewBox="0 0 24 24">
      //             <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.624-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      //           </svg>
      //           <h2 className="text-2xl font-bold text-white mb-2">OS1 on GitHub</h2>
      //           <p className="text-gray-400 mb-6">
      //             Explore the source code, contribute, and star the project!
      //           </p>
      //           <a
      //             href="https://github.com/jesuscopado"
      //             target="_blank"
      //             rel="noopener noreferrer"
      //             className="inline-flex items-center space-x-2 bg-gray-700/20 hover:bg-gray-700/30 text-gray-200 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 border border-gray-700/30"
      //           >
      //             <svg width="20" height="20" fill="currentColor" className="text-gray-200" viewBox="0 0 24 24">
      //               <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.624-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      //             </svg>
      //             <span>View on GitHub</span>
      //           </a>
      //         </div>
      //       </div>
      //     </div>
      //   )
      // },
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
                  href="https://t.me/TheOS1Protocol"
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
                          <ChevronRight className={`w-4 h-4 ${metric.trend === 'up' ? 'text-green-400 rotate-[-90deg]' :
                            metric.trend === 'down' ? 'text-orange-400 rotate-90' :
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
        id: 'AI Assistant-core',
        name: 'AI Assistant Core Analysis',
        icon: <Bot className="w-6 h-6 text-orange-400" />,
        description: 'AGI Core System Monitor',
        type: 'component',
        component: (() => {
          const { emotionalState, networkStats } = useNeuralNetwork();

          return (
            <div className="space-y-6">
              {/* Consciousness Matrix */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-orange-500/30">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                  <Bot className="w-5 h-5 text-orange-400 mr-2" />
                  Consciousness Matrix
                </h3>
                <div className="grid grid-cols-5 gap-3">
                  {Array.from({ length: 25 }).map((_, i) => {
                    const activity = Math.sin((Date.now() + i * 500) / 1000) * 0.5 + 0.5;
                    return (
                      <div
                        key={i}
                        className="aspect-square bg-gray-900/50 rounded-lg border border-orange-500/20 p-2 relative overflow-hidden"
                      >
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-500/20"
                          style={{
                            opacity: activity * 0.8,
                            animation: `pulse-opacity ${1 + Math.random() * 2}s infinite`
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className="w-2 h-2 bg-orange-400 rounded-full"
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
                <div className="bg-gray-800/50 rounded-xl p-6 border border-orange-500/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Emotional State</h3>
                  <div className="space-y-4">
                    {Object.entries(emotionalState).map(([emotion, level]) => (
                      <div key={emotion} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">{emotion.charAt(0).toUpperCase() + emotion.slice(1)}</span>
                          <span className="text-orange-400">{level.toFixed(1)}%</span>
                        </div>
                        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-purple-500 rounded-full"
                            style={{ width: `${level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-orange-500/30">
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
                            className="w-4 h-4 text-orange-400/30"
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
                      <div className="text-2xl font-bold text-orange-400">{networkStats.accuracy.toFixed(1)}%</div>
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
        <div className="bg-gradient-to-br from-gray-900/95 to-black/95 rounded-2xl w-[96%] max-w-2xl max-h-[95vh] border border-orange-700/30 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col mobile-folder-wrapper">
          {/* Mobile Header - Fixed height */}
          <div className="flex items-center justify-between p-3 border-b border-orange-700/30 bg-gray-900/50 h-13 flex-shrink-0">
            <h2 className="text-base font-semibold text-white flex items-center truncate">
              <Folder className="w-4 h-4 text-orange-300 mr-2 flex-shrink-0" />
              <span className="truncate text-sm">{folderId.charAt(0).toUpperCase() + folderId.slice(1)}</span>
            </h2>
            <button
              onClick={handleClose}
              className="flex items-center justify-center w-8 h-8 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 hover:text-orange-300 rounded-full border border-orange-500/30 transition-all duration-300 active:scale-95 flex-shrink-0"
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
                    className="flex items-center text-orange-400 hover:text-orange-300 bg-orange-500/10 hover:bg-orange-500/20 px-2.5 py-1.5 rounded-md transition-all duration-200 min-h-[36px]"
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
      <div className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-3xl p-8 max-w-6xl w-full h-[80vh] border border-orange-700/30 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <Folder className="w-8 h-8 text-orange-300 mr-4" />
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
                    ? 'bg-orange-700/20 border border-orange-700/30'
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
          <div className="flex-1 bg-gray-900/50 rounded-xl p-6 overflow-y-auto border border-orange-700/20">
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
