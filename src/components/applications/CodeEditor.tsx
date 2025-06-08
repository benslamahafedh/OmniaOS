import React, { useState } from 'react';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState(`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, OmniaOS!");
    }
}`);

  return (
    <div className="flex flex-col h-full min-h-[400px] bg-gray-900 rounded-lg overflow-hidden p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Java Editor</h2>
        <div className="flex space-x-2">
          <button 
            className="px-4 py-2 bg-pink-500/20 text-pink-400 rounded-md hover:bg-pink-500/30 transition-colors"
            onClick={() => console.log('Running code...')}
          >
            Run
          </button>
          <button 
            className="px-4 py-2 bg-pink-500/20 text-pink-400 rounded-md hover:bg-pink-500/30 transition-colors"
            onClick={() => console.log('Saving code...')}
          >
            Save
          </button>
        </div>
      </div>
      
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-1 bg-gray-800 text-white font-mono p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-500/50"
        spellCheck="false"
      />
    </div>
  );
};

export default CodeEditor; 