import React, { useState } from 'react';

// Import the character images
import samanthaImage from '../assets/samantha.png';
import brotherImage from '../assets/brother.png';
import sisterImage from '../assets/sister.png';

interface Character {
  id: string;
  name: string;
  image: string;
  description: string;
  color: string;
}

interface SideDockProps {
  onCharacterClick?: (characterId: string) => void;
}

const SideDock: React.FC<SideDockProps> = ({ onCharacterClick }) => {
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null);

  const characters: Character[] = [
    {
      id: 'samantha',
      name: 'Samantha',
      image: samanthaImage,
      description: 'AI Assistant',
      color: 'from-red-700 to-red-800'
    },
    {
      id: 'elias',
      name: 'Elias',
      image: brotherImage,
      description: 'The Brother',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'lyra',
      name: 'Lyra', 
      image: sisterImage,
      description: 'The Sister',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const handleCharacterClick = (characterId: string) => {
    if (onCharacterClick) {
      onCharacterClick(characterId);
    }
  };

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
              <div className="bg-black/50 backdrop-blur-xl rounded-2xl border border-red-700/30 p-4">
        <div className="flex flex-col space-y-4">
          {characters.map((character) => (
            <div
              key={character.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredCharacter(character.id)}
              onMouseLeave={() => setHoveredCharacter(null)}
              onClick={() => handleCharacterClick(character.id)}
            >
              {/* Character Icon */}
              <div className={`
                relative w-16 h-16 rounded-full overflow-hidden border-2 
                ${hoveredCharacter === character.id ? 'border-white/60 scale-110' : 'border-white/30 scale-100'}
                transition-all duration-300 group-hover:shadow-lg
              `}>
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${character.color} opacity-20`} />
                
                {/* Character image */}
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Hover overlay */}
                <div className={`
                  absolute inset-0 bg-gradient-to-t from-black/50 to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300
                `} />
              </div>

              {/* Character name tooltip */}
              {hoveredCharacter === character.id && (
                <div className="absolute left-20 top-1/2 transform -translate-y-1/2 z-50">
                  <div className="bg-black/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
                    <div className="text-white font-semibold text-sm">{character.name}</div>
                    <div className="text-white/70 text-xs">{character.description}</div>
                  </div>
                  {/* Arrow pointing to icon */}
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-black/90"></div>
                  </div>
                </div>
              )}

              {/* Glow effect */}
              <div className={`
                absolute inset-0 rounded-full bg-gradient-to-br ${character.color}
                opacity-0 group-hover:opacity-30 blur-lg -z-10
                transition-opacity duration-300
              `} />
            </div>
          ))}
        </div>
        
        {/* Dock title */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="text-white/60 text-xs text-center font-semibold">
            AI Family
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideDock; 