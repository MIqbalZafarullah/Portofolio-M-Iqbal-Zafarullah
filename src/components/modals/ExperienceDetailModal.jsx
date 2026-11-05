import React from 'react';
import { X, Building2, Settings, ExternalLink } from 'lucide-react';
import { OrgLogo } from '../ui/OrgLogo';

export const ExperienceDetailModal = ({ exp, isOpen, onClose }) => {
  if (!isOpen || !exp) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-3 pt-4 pb-[80px] md:p-8 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div
        className="relative w-full max-w-3xl bg-[#FAF9F5] border-2 border-black rounded-3xl shadow-[8px_8px_0px_#000] transform scale-100 animate-in zoom-in-95 duration-300 flex flex-col overflow-hidden text-gray-900"
      >
        {/* Top washi tape */}
        <div className="washi-tape tape-yellow -top-3 left-12 w-20 rotate-2" />

        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-black/10 bg-white">
          <div className="flex items-center gap-4">
            <OrgLogo src={exp.logo} alt={exp.org || exp.orgName} className="w-12 h-12" iconSize={22} />
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                DOCUMENT FILE: {exp.org || exp.orgName}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-gray-900 leading-tight">
                {exp.title}
              </h2>
              <p className="text-xs font-mono font-bold text-blue-700 mt-0.5">
                {exp.date}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black bg-gray-100 hover:bg-yellow-200 border border-black/10 p-2.5 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div
          className="p-6 md:p-8 overflow-y-auto overscroll-contain space-y-6"
          style={{ maxHeight: 'calc(100vh - 200px)', WebkitOverflowScrolling: 'touch' }}
        >
          {exp.desc && (
            <div className="bg-yellow-50/70 border border-yellow-200 p-4 rounded-xl">
              <p className="text-gray-800 text-sm leading-relaxed font-sans">
                {exp.desc}
              </p>
            </div>
          )}

          {exp.responsibilities && exp.responsibilities.length > 0 && (
            <div>
              <h4 className="font-mono text-xs font-bold text-gray-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Building2 size={16} className="text-black" /> TANGGUNG JAWAB & CAPAIAN UTAMA
              </h4>
              <ul className="space-y-2 font-sans">
                {exp.responsibilities.map((task, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 bg-white border border-black/10 p-3 rounded-xl shadow-sm">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {exp.skills && exp.skills.length > 0 && (
              <div className="bg-white p-5 rounded-2xl border border-black/15 shadow-sm">
                <h4 className="font-mono text-xs font-bold text-gray-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Settings size={15} className="text-black" /> Keahlian Terkait
                </h4>
                <div className="flex flex-wrap gap-1.5 font-mono">
                  {exp.skills.map((s, i) => (
                    <span
                      key={i}
                      className="text-[11px] text-gray-800 bg-gray-100 px-3 py-1 rounded-md border border-black/10"
                    >
                      #{s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {exp.photo && (
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-black/15 shadow-sm">
                <img src={exp.photo} alt="activity" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
