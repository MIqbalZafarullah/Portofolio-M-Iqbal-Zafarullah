import React from 'react';
import { Download, X } from 'lucide-react';
import { profileData } from '../../data/profile';

export const CVViewerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const cvPath = profileData.cvPath;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl h-[90vh] bg-[#FAF9F5] border-2 border-black rounded-3xl shadow-[8px_8px_0px_#000] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-black/10 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-200 border border-black/20 rounded-lg flex items-center justify-center text-black">
              <Download size={15} />
            </div>
            <div>
              <p className="text-black font-black text-sm font-mono">CV — {profileData.name.toUpperCase()}</p>
              <p className="text-gray-500 text-[10px] font-mono">Curriculum Vitae Document</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={cvPath}
              download="CV M Iqbal Zafarullah.pdf"
              className="bg-black hover:bg-gray-800 text-white text-xs font-mono font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_#2563EB]"
            >
              <Download size={13} /> Unduh File PDF
            </a>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black bg-gray-100 hover:bg-yellow-200 border border-black/10 p-2 rounded-full transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden bg-gray-200">
          <iframe
            src={`${cvPath}#toolbar=0&navpanes=0&scrollbar=1`}
            className="w-full h-full border-0"
            title={`CV ${profileData.name}`}
          />
        </div>
      </div>
    </div>
  );
};
