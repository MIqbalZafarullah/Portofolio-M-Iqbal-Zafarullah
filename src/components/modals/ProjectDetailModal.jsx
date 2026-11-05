import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Code, Zap, CheckCircle2 } from 'lucide-react';

export const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    setCurrentImg(0);
  }, [project]);

  if (!isOpen || !project) return null;

  const nextImg = () => setCurrentImg((prev) => (prev + 1) % project.gallery.length);
  const prevImg = () => setCurrentImg((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-3 pt-4 pb-[80px] md:p-8 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div
        className="relative w-full max-w-5xl bg-[#FAF9F5] border-2 border-black rounded-3xl shadow-[8px_8px_0px_#000] transform scale-100 animate-in zoom-in-95 duration-300 flex flex-col max-h-full overflow-hidden text-gray-900"
        style={{ maxHeight: 'calc(100vh - 80px)' }}
      >
        {/* Top Washi Tape */}
        <div className="washi-tape tape-yellow -top-3 left-16 w-24 rotate-1" />

        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-black/10 bg-white">
          <div>
            <span className="font-mono text-[10px] uppercase font-bold text-blue-800 bg-blue-100 border border-blue-300 px-3 py-0.5 rounded-full mb-1.5 inline-block">
              {project.category} • PROJECT DOSSIER
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-gray-900 font-sans">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black bg-gray-100 hover:bg-yellow-200 border border-black/10 p-2.5 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain p-6 md:p-8 flex flex-col lg:flex-row gap-8"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* Left: Gallery & Tech Stack */}
          <div className="lg:w-1/2 space-y-4">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/5 border-2 border-black/15 shadow-sm group">
              <img
                src={project.gallery[currentImg]}
                alt="Project Detail"
                className="w-full h-full object-cover transition-all duration-500"
              />
              {project.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-blue-600 text-white rounded-full transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextImg}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-blue-600 text-white rounded-full transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            <div className="bg-white p-5 rounded-2xl border-2 border-black/15 shadow-sm">
              <h4 className="font-mono text-xs font-bold text-gray-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Code size={16} className="text-black" /> Tech Stack & Tools
              </h4>
              <div className="flex flex-wrap gap-2 font-mono">
                {project.techList.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs text-gray-800 bg-gray-100 px-3 py-1 rounded-md border border-black/10 font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Details & Bullets */}
          <div className="lg:w-1/2 space-y-6 font-sans">
            {project.date && (
              <span className="font-mono text-xs font-bold text-gray-700 bg-[#FEF08A] border border-black/30 px-3 py-1 rounded-md inline-block">
                {project.date}
              </span>
            )}

            {project.desc && (
              <p className="text-gray-800 text-sm leading-relaxed bg-yellow-50/60 p-4 rounded-xl border border-yellow-200">
                {project.desc}
              </p>
            )}

            {project.bullets && project.bullets.length > 0 && (
              <div>
                <h4 className="font-mono text-xs font-bold text-gray-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Zap size={15} className="text-yellow-600" /> Fitur & Implementasi Utama
                </h4>
                <ul className="space-y-2">
                  {project.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-gray-700 bg-white p-3 rounded-xl border border-black/10 shadow-sm"
                    >
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.background && (
              <div>
                <h4 className="font-mono text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                  💡 Latar Belakang & Tantangan
                </h4>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{project.background}</p>
              </div>
            )}

            {project.solution && (
              <div>
                <h4 className="font-mono text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                  🚀 Solusi & Hasil
                </h4>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{project.solution}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
