import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="bg-gray-900 rounded-lg p-6 text-white overflow-y-auto max-h-[600px]">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
        OmniaOS Documentation
      </h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-pink-400">About OmniaOS</h2>
          <p className="text-gray-300 leading-relaxed">
            OmniaOS is a revolutionary open-source web operating system that reimagines how we interact with computers.
            Built by developers, for developers, it combines the power of modern web technologies with an intuitive,
            anime-inspired interface.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-pink-400">Open Source Philosophy</h2>
          <p className="text-gray-300 leading-relaxed">
            We believe in the power of community-driven development. OmniaOS is proudly open source, allowing developers
            worldwide to contribute, modify, and enhance the system. Our code is freely available on GitHub, and we
            welcome contributions from developers of all skill levels.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-pink-400">Community Guidelines</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Respect fellow contributors</li>
            <li>Write clean, documented code</li>
            <li>Test thoroughly before submitting</li>
            <li>Share knowledge and help others</li>
            <li>Keep the anime aesthetics consistent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-pink-400">Getting Started</h2>
          <p className="text-gray-300 leading-relaxed">
            Join our vibrant community of developers! Whether you're a seasoned programmer or just starting out,
            there's a place for you in the OmniaOS ecosystem. Check out our GitHub repository, join our Discord
            server, and start contributing today!
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-pink-400">Future Vision</h2>
          <p className="text-gray-300 leading-relaxed">
            OmniaOS is more than just a web OS - it's a vision of the future. We're building a platform where
            creativity meets functionality, where anime aesthetics enhance user experience, and where AI assists
            rather than replaces human interaction. Join us in shaping this future!
          </p>
        </section>
      </div>

      <div className="mt-8 p-4 bg-pink-500/10 rounded-lg border border-pink-500/30">
        <p className="text-center text-pink-400">
          Made with ❤️ by the OmniaOS Community
        </p>
      </div>
    </div>
  );
};

export default Documentation; 