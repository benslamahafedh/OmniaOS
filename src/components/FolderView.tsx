import React from 'react';
import { X } from 'lucide-react';

interface FolderViewProps {
  folderId: string;
  onClose: () => void;
}

const FolderView: React.FC<FolderViewProps> = ({ folderId, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xl z-50 flex items-center justify-center">
      <div className="bg-gray-900/95 rounded-3xl border border-red-500/30 p-8 w-full max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Folder: {folderId}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="text-white">
          Folder content will be added here
        </div>
      </div>
    </div>
  );
};

export default FolderView; 