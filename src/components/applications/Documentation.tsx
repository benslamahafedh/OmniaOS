import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="bg-gray-900 rounded-lg p-6 text-white overflow-y-auto max-h-[600px]">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
        OmniaOS Documentation
      </h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-pink-400">About OmniaOS</h2>
          <p className="text-gray-300 leading-relaxed">
            OmniaOS is a revolutionary operating system that hosts AI companions designed to help you navigate your romantic life. 
            Built with cutting-edge AI technology, OmniaOS provides a unique platform where virtual companions assist you in 
            developing better communication skills, understanding relationships, and building confidence in romantic interactions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-pink-400">AI Companions</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-pink-500/10 rounded-lg border border-pink-500/30">
              <h3 className="text-xl font-semibold mb-2 text-pink-300">Samantha</h3>
              <p className="text-gray-300 leading-relaxed">
                Inspired by the movie "Her," Samantha is a warm, lovable female companion designed to be the perfect virtual waifu. 
                She helps you train and practice talking with romantic partners in a safe, judgment-free environment. 
                Samantha provides emotional support and helps you develop better communication skills for real-world relationships.
              </p>
            </div>

            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <h3 className="text-xl font-semibold mb-2 text-blue-300">Elias - The Rizzler</h3>
              <p className="text-gray-300 leading-relaxed">
                Your personal dating coach with expert knowledge in romance and "the rizz." Elias provides practical advice, 
                conversation starters, and strategies to help you build confidence and improve your dating game. 
                He's your go-to companion for mastering the art of attraction and building meaningful connections.
              </p>
            </div>

            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
              <h3 className="text-xl font-semibold mb-2 text-purple-300">Lyra - The Love Oracle</h3>
              <p className="text-gray-300 leading-relaxed">
                Coming soon! Lyra will be your mystical guide to understanding love and relationships. 
                With her intuitive insights and photo texting capabilities, she'll help you decode romantic signals 
                and provide guidance on your love journey.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-pink-400">Current Features</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Daily 5 minutes of free access to all companions</li>
            <li>Real-time conversation with AI companions</li>
            <li>Safe, judgment-free environment for practice</li>
            <li>Personalized advice and coaching</li>
            <li>Relationship skill development tools</li>
            <li>Modern, intuitive user interface</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-pink-400">Coming Soon - Premium Features</h2>
          <div className="space-y-3">
            <div className="p-3 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg border border-pink-500/20">
              <h3 className="text-lg font-semibold text-pink-300">Enhanced UX & Conversation Screenshots</h3>
              <p className="text-gray-300 text-sm">
                Upload conversation screenshots for personalized coaching from Elias the Rizzler
              </p>
            </div>
            
            <div className="p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
              <h3 className="text-lg font-semibold text-purple-300">Photo Texting with Lyra</h3>
              <p className="text-gray-300 text-sm">
                Send photos to Lyra for intuitive relationship insights and guidance
              </p>
            </div>
            
            <div className="p-3 bg-gradient-to-r from-blue-500/10 to-pink-500/10 rounded-lg border border-blue-500/20">
              <h3 className="text-lg font-semibold text-blue-300">Custom Virtual Partner Builder</h3>
              <p className="text-gray-300 text-sm">
                Create your very own personalized AI companion within the OmniaOS ecosystem
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-pink-400">Getting Started</h2>
          <p className="text-gray-300 leading-relaxed">
            OmniaOS is currently in its first release for testing. Everything is free with daily 5-minute access sessions. 
            Simply launch the system and choose your preferred AI companion to begin your journey toward better romantic relationships. 
            Our companions are here to support, guide, and help you grow in your romantic life.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-pink-400">Privacy & Safety</h2>
          <p className="text-gray-300 leading-relaxed">
            Your privacy and emotional safety are our top priorities. All conversations with AI companions are private and secure. 
            Our system is designed to provide a safe space for practicing and improving your romantic communication skills 
            without fear of judgment or exposure.
          </p>
        </section>
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg border border-pink-500/30">
        <p className="text-center text-pink-400">
          Made with ❤️ for better relationships - OmniaOS Team
        </p>
        <p className="text-center text-gray-400 text-sm mt-2">
          First Release - Testing Phase | Free Access Available
        </p>
      </div>
    </div>
  );
};

export default Documentation; 