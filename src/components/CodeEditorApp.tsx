import React, { useState } from 'react';
import { Code2, Play, Save } from 'lucide-react';
import CodeEditor from './CodeEditor';

const CodeEditorApp: React.FC = () => {
  const [code, setCode] = useState<string>(`<!DOCTYPE html>
<html>
<head>
  <title>My Web Page</title>
</head>
<body>
  <h1>Welcome to OmniaOS Code Editor!</h1>
  <p>Start typing your HTML code here...</p>
</body>
</html>`);

  const [preview, setPreview] = useState<boolean>(false);

  const handlePreview = () => {
    setPreview(!preview);
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving code:', code);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-pink-500/30">
        <div className="flex items-center space-x-2">
          <Code2 className="w-5 h-5 text-pink-500" />
          <span className="text-white font-medium">HTML Editor</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePreview}
            className="flex items-center space-x-1 px-3 py-1 rounded-md bg-pink-500/20 hover:bg-pink-500/30 text-pink-500"
          >
            <Play className="w-4 h-4" />
            <span>{preview ? 'Edit' : 'Preview'}</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-1 px-3 py-1 rounded-md bg-pink-500/20 hover:bg-pink-500/30 text-pink-500"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="flex-1 overflow-hidden">
        {preview ? (
          <div className="w-full h-full bg-white">
            <iframe
              title="preview"
              srcDoc={code}
              className="w-full h-full border-none"
              sandbox="allow-scripts"
            />
          </div>
        ) : (
          <CodeEditor
            initialValue={code}
            onChange={(value) => setCode(value || '')}
          />
        )}
      </div>
    </div>
  );
};

export default CodeEditorApp; 