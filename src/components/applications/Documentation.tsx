import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="bg-gray-900 rounded-lg p-6 text-white overflow-y-auto max-h-[600px]">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
        OS1 Documentation
      </h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-orange-400">About OS1</h2>
          <p className="text-gray-300 leading-relaxed">
            OS1 is a revolutionary web-based operating system that hosts AI companions designed to help you navigate your romantic life.
            Built with cutting-edge AI technology, OS1 provides a unique platform where virtual companions assist you in
            developing better communication skills, understanding relationships, and building confidence in romantic interactions.
          </p>
          <div className="mt-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <p className="text-orange-300 text-sm font-medium">
              🌐 Platform: <a href="https://0xos1.fun" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-200">0xos1.fun</a>
              &nbsp;— No installation or registration required.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-orange-400">Internet Connectivity</h2>
          <p className="text-gray-300 leading-relaxed mb-3">
            OS1 is fully web-based. Access it from any modern browser on desktop or mobile — no app download needed.
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
            <li>Works on Chrome, Firefox, Safari, and Edge</li>
            <li>Optimized for both desktop and mobile</li>
            <li>All conversations are encrypted over HTTPS</li>
            <li>No persistent data stored between sessions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-orange-400">AI Companion</h2>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
            <h3 className="text-xl font-semibold mb-2 text-blue-300">Core Assistant</h3>
            <p className="text-gray-300 leading-relaxed">
              A warm, supportive AI companion inspired by the movie "Her". Helps with conversational confidence, emotional support, and romantic communication skill-building in a judgment-free environment.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-orange-400">Current Features</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">

            <li>Real-time conversation with AI companions</li>
            <li>Safe, judgment-free environment for practice</li>
            <li>Personalized advice and coaching</li>
            <li>Relationship skill development tools</li>
            <li>Modern, intuitive OS-inspired user interface</li>
            <li>No registration required — start immediately</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-orange-400">Community & Support</h2>
          <div className="space-y-2">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-blue-300 font-medium text-sm">Telegram Community</p>
                <p className="text-gray-400 text-xs">Real-time support and discussions</p>
              </div>
              <a
                href="https://t.me/TheOS1Protocol"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-xs underline"
              >
                t.me/TheOS1Protocol
              </a>
            </div>
            <div className="p-3 bg-gray-700/20 border border-gray-600/20 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-gray-200 font-medium text-sm">X (Twitter)</p>
                <p className="text-gray-400 text-xs">Updates and announcements</p>
              </div>
              <a
                href="https://x.com/0xos1_tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white text-xs underline"
              >
                @0xos1_tech
              </a>
            </div>
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-red-300 font-medium text-sm">Email Support</p>
                <p className="text-gray-400 text-xs">Direct support and inquiries</p>
              </div>
              <span className="text-red-400 font-mono text-xs">contact@0xos1.fun</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-orange-400">Coming Soon — Premium Features</h2>
          <div className="space-y-3">
            <div className="p-3 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-lg border border-orange-500/20">
              <h3 className="text-lg font-semibold text-orange-300">Conversation Screenshots</h3>
              <p className="text-gray-300 text-sm">
                Upload conversation screenshots for personalized coaching from your AI companion
              </p>
            </div>

            <div className="p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
              <h3 className="text-lg font-semibold text-purple-300">Photo Texting with the Love Oracle</h3>
              <p className="text-gray-300 text-sm">
                Send photos to the Love Oracle for intuitive relationship insights and guidance
              </p>
            </div>

            <div className="p-3 bg-gradient-to-r from-blue-500/10 to-orange-500/10 rounded-lg border border-blue-500/20">
              <h3 className="text-lg font-semibold text-blue-300">Custom Virtual Partner Builder</h3>
              <p className="text-gray-300 text-sm">
                Create your very own personalized AI companion within the OS1 ecosystem
              </p>
            </div>

            <div className="p-3 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-lg border border-green-500/20">
              <h3 className="text-lg font-semibold text-green-300">Mobile App</h3>
              <p className="text-gray-300 text-sm">
                Dedicated iOS and Android app for native OS1 connectivity and notifications
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-orange-400">Getting Started</h2>
          <p className="text-gray-300 leading-relaxed">
            OS1 is currently in its first release for testing. Everything is free with daily 5-minute access sessions.
            Visit <a href="https://0xos1.fun" target="_blank" rel="noopener noreferrer" className="text-orange-400 underline hover:text-orange-300">0xos1.fun</a> in your browser,
            choose your preferred AI companion, and begin your journey toward better romantic relationships.
            No sign-up needed — just open and connect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-orange-400">Privacy & Safety</h2>
          <p className="text-gray-300 leading-relaxed">
            Your privacy and emotional safety are our top priorities. All conversations with AI companions are private and secure.
            OS1 requires no registration, collects no personal data, and processes conversations with zero-knowledge constraints.
            Our system is designed to provide a safe space for practicing and improving your romantic communication skills
            without fear of judgment or exposure.
          </p>
        </section>
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-lg border border-orange-500/30">
        <p className="text-center text-orange-400">
          Made with ❤️ for better relationships — OS1 Team
        </p>
        <p className="text-center text-gray-400 text-sm mt-2">
          First Release at 0xos1.fun
        </p>
      </div>
    </div>
  );
};

export default Documentation;
