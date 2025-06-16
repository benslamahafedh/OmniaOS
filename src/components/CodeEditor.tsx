import React from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../contexts/ThemeContext';

interface CodeEditorProps {
  initialValue?: string;
  onChange?: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue = '', onChange }) => {
  const { theme } = useTheme();

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border border-pink-500/30">
      <Editor
        height="500px"
        defaultLanguage="html"
        defaultValue={initialValue}
        theme={theme.id === 'default' ? 'vs-dark' : 'vs'}
        onChange={onChange}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: true,
          scrollBeyondLastLine: false,
          readOnly: false,
          cursorStyle: 'line',
          folding: true,
          padding: { top: 15, bottom: 15 },
        }}
      />
    </div>
  );
};

export default CodeEditor; 