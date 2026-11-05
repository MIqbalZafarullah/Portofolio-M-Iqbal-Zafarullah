import React from 'react';
import { X, ExternalLink, Award, CheckCircle } from 'lucide-react';

export const CertificateModal = ({ cert, isOpen, onClose }) => {
  if (!isOpen || !cert) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-3 pt-4 pb-[80px] md:p-8 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div
        className="relative w-full max-w-2xl bg-[#FAF9F5] border-2 border-black rounded-3xl shadow-[8px_8px_0px_#000] transform scale-100 animate-in zoom-in-95 duration-300 flex flex-col overflow-hidden text-gray-900"
      >
        {/* Top Washi Tape */}
        <div className="washi-tape tape-yellow -top-3 left-10 w-24 rotate-1" />

        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 md:p-6 border-b border-black/10 bg-white">
          <div>
            <span className="font-mono text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-0.5 rounded-full mb-1.5 inline-block">
              {cert.category} • VERIFIED CREDENTIAL
            </span>
            <h2 className="text-lg md:text-xl font-black text-gray-900 font-sans leading-tight">
              {cert.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black bg-gray-100 hover:bg-yellow-200 border border-black/10 p-2.5 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div
          className="p-5 md:p-8 flex flex-col items-center overflow-y-auto overscroll-contain space-y-5"
          style={{ maxHeight: 'calc(100vh - 200px)', WebkitOverflowScrolling: 'touch' }}
        >
          {cert.image && (
            <div className="w-full bg-white rounded-xl p-2 border-2 border-black/15 shadow-sm">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-auto max-h-[360px] object-contain rounded-lg"
              />
            </div>
          )}

          {cert.desc && (
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed w-full bg-white p-4 rounded-xl border border-black/10 font-sans">
              {cert.desc}
            </p>
          )}

          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-5 rounded-2xl border-2 border-black/15 font-mono text-xs">
            <div>
              <p className="text-gray-700 font-bold mb-0.5">
                Diterbitkan oleh: <span className="text-black font-black">{cert.issuer}</span>
              </p>
              <p className="text-gray-500 text-[11px]">
                Tahun: <span className="text-blue-700 font-bold">{cert.year}</span>
              </p>
            </div>

            {cert.link && cert.link !== '#' && (
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-[2px_2px_0px_#2563EB] flex items-center justify-center gap-2 text-xs"
              >
                Verifikasi Kredensial <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
