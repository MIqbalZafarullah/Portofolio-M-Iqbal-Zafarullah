import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, Github, Zap, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { projectsData, projectFilters } from '../data/projects';
import { ProjectDetailModal } from '../components/modals/ProjectDetailModal';
import { GithubIcon } from '../components/ui/Icons';

// Skema warna berkas tematik
const folderThemes = [
  { bg: 'bg-[#1D4ED8]', tabBg: 'bg-[#1D4ED8]', text: 'text-white', badgeBg: 'bg-white/20 text-white', accent: '#60A5FA' }, // Royal Blue
  { bg: 'bg-[#18181B]', tabBg: 'bg-[#18181B]', text: 'text-white', badgeBg: 'bg-white/15 text-white', accent: '#A1A1AA' }, // Dark Graphite
  { bg: 'bg-[#D97706]', tabBg: 'bg-[#D97706]', text: 'text-white', badgeBg: 'bg-white/20 text-white', accent: '#FDE68A' }, // Amber
  { bg: 'bg-[#047857]', tabBg: 'bg-[#047857]', text: 'text-white', badgeBg: 'bg-white/20 text-white', accent: '#6EE7B7' }, // Emerald
  { bg: 'bg-[#4338CA]', tabBg: 'bg-[#4338CA]', text: 'text-white', badgeBg: 'bg-white/20 text-white', accent: '#A5B4FC' }, // Indigo
  { bg: 'bg-[#BE123C]', tabBg: 'bg-[#BE123C]', text: 'text-white', badgeBg: 'bg-white/20 text-white', accent: '#FDA4AF' }, // Rose
  { bg: 'bg-[#0F766E]', tabBg: 'bg-[#0F766E]', text: 'text-white', badgeBg: 'bg-white/20 text-white', accent: '#5EEAD4' }, // Teal
  { bg: 'bg-[#1E293B]', tabBg: 'bg-[#1E293B]', text: 'text-white', badgeBg: 'bg-white/20 text-white', accent: '#94A3B8' }, // Slate Dark
  { bg: 'bg-[#C2410C]', tabBg: 'bg-[#C2410C]', text: 'text-white', badgeBg: 'bg-white/20 text-white', accent: '#FDBA74' }, // Rust Orange
  { bg: 'bg-[#6D28D9]', tabBg: 'bg-[#6D28D9]', text: 'text-white', badgeBg: 'bg-white/20 text-white', accent: '#C4B5FD' }, // Purple
  { bg: 'bg-[#374151]', tabBg: 'bg-[#374151]', text: 'text-white', badgeBg: 'bg-white/20 text-white', accent: '#D1D5DB' }, // Cool Gray
];

export const WorksView = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.filterCategory === activeFilter);

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <>
      <ProjectDetailModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-24">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="font-hand text-xl text-gray-500">case studies & engineering dossier 📁</span>
          <h2 className="text-4xl sm:text-6xl font-black font-pixel text-black uppercase mt-1 mb-3">
            Proyek.
          </h2>
          <p className="text-gray-600 font-sans text-xs sm:text-sm max-w-xl mx-auto">
            Klik berkas untuk membuka lembar kerja, dokumen teknis, dan fitur implementasi di dalamnya.
          </p>

          {/* Sticky Tab Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 font-mono text-xs font-bold">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-t-lg transition-all border-b-2 ${
                  activeFilter === filter
                    ? 'bg-[#18181B] text-white border-black shadow-[2px_2px_0px_rgba(0,0,0,0.3)]'
                    : 'bg-white text-gray-700 hover:bg-yellow-50 border-gray-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Berkas / Folder Dossiers — 2 columns, expand full width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {filteredProjects.map((project, idx) => {
            const isExpanded = expandedId === project.id;
            const theme = folderThemes[idx % folderThemes.length];
            const projectNumber = String(idx + 1).padStart(2, '0');

            return (
              <React.Fragment key={project.id}>
                {/* FOLDER CARD */}
                <div
                  className={`relative transition-all duration-500 group ${
                    isExpanded ? 'lg:col-span-2' : ''
                  }`}
                >
                  {/* 1. TOP FOLDER TAB */}
                  <div className="flex items-end">
                    <div
                      onClick={() => toggleExpand(project.id)}
                      className={`cursor-pointer px-5 py-2 ${theme.tabBg} text-white font-mono text-xs font-bold uppercase tracking-widest rounded-t-xl folder-tab-shape shadow-sm hover:brightness-110 transition-all flex items-center gap-2 select-none`}
                      style={{ minWidth: '160px' }}
                    >
                      <span>{isExpanded ? '▼' : '+'}</span>
                      <span>PROJECT {projectNumber}</span>
                      {project.date && (
                        <span className="text-[10px] opacity-75 hidden sm:inline">• {project.date}</span>
                      )}
                    </div>
                  </div>

                  {/* 2. MAIN FOLDER BODY */}
                  <div
                    className={`${theme.bg} ${theme.text} rounded-b-2xl rounded-tr-2xl p-5 sm:p-6 shadow-folder transition-all duration-500 border border-black/10`}
                  >
                    <div className={`flex ${isExpanded ? 'flex-col lg:flex-row' : 'flex-col sm:flex-row'} items-start justify-between gap-5`}>
                      
                      {/* LEFT: Title, Meta, Desc, Tags, Buttons */}
                      <div className="flex-1 space-y-3 min-w-0">
                        <div className="flex items-center gap-2 text-xs font-mono tracking-wider opacity-90 uppercase">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
                          <span className="truncate">{project.tech}</span>
                        </div>

                        <h3
                          onClick={() => toggleExpand(project.id)}
                          className={`font-extrabold tracking-tight cursor-pointer hover:underline decoration-white/50 underline-offset-4 ${
                            isExpanded ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl'
                          }`}
                        >
                          {project.title}
                        </h3>

                        <p className="text-sm leading-relaxed opacity-90 font-sans line-clamp-3">
                          {project.desc}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <button
                            onClick={() => toggleExpand(project.id)}
                            className="px-3 py-1.5 bg-white text-black font-mono text-xs font-bold rounded-lg shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center gap-1.5"
                          >
                            <span>{isExpanded ? 'TUTUP' : 'BUKA BERKAS'}</span>
                            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          </button>

                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-xs font-bold underline flex items-center gap-1 opacity-90 hover:opacity-100 hover:text-yellow-200 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github size={12} /> GitHub ↗
                          </a>

                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                            className="font-mono text-[10px] opacity-70 hover:opacity-100 underline"
                          >
                            Layar Penuh ↗
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.techList.slice(0, isExpanded ? undefined : 4).map((tech, i) => (
                            <span
                              key={i}
                              className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/20 text-white border border-white/20"
                            >
                              {tech}
                            </span>
                          ))}
                          {!isExpanded && project.techList.length > 4 && (
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/10 text-white/70 border border-white/15">
                              +{project.techList.length - 4}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* RIGHT: Polaroid photo */}
                      <div className={`relative shrink-0 ${isExpanded ? 'w-full lg:w-64' : 'w-full sm:w-44'}`}>
                        <div className="washi-tape tape-blue -top-2 left-4 w-12 -rotate-6" />
                        <div className="washi-tape tape-yellow -top-2 right-4 w-12 rotate-6" />
                        <div
                          onClick={() => toggleExpand(project.id)}
                          className="bg-white p-2 pb-4 rounded-xl shadow-polaroid cursor-pointer hover:rotate-0 rotate-1 transition-all"
                        >
                          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                            <img
                              src={project.gallery[0]}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <p className="font-mono text-center text-[9px] font-bold text-gray-700 mt-1.5 truncate">
                            📁 {project.title}
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* 3. ACCORDION DOSSIER SHEET */}
                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        isExpanded ? 'max-h-[1400px] opacity-100 mt-6 pt-6 border-t border-white/25' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="bg-[#FAF9F5] text-gray-900 rounded-2xl p-5 sm:p-7 shadow-inner border border-black/15 font-sans space-y-6">
                        
                        <div className="flex justify-between items-center border-b border-black/10 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold uppercase tracking-widest bg-yellow-200 text-yellow-900 px-2.5 py-0.5 rounded border border-yellow-400">
                              CONFIDENTIAL DOSSIER
                            </span>
                            <span className="font-mono text-xs text-gray-500">ID: PRJ-{projectNumber}</span>
                          </div>
                          <span className="font-hand text-base text-gray-600 font-bold">Document verified ✓</span>
                        </div>

                        {project.bullets && project.bullets.length > 0 && (
                          <div>
                            <h4 className="font-mono text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                              <Zap size={14} className="text-yellow-500" /> FITUR & IMPLEMENTASI UTAMA
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {project.bullets.map((bullet, bi) => (
                                <div
                                  key={bi}
                                  className="bg-white border border-black/10 p-3 rounded-xl flex items-start gap-2 shadow-sm text-xs text-gray-800"
                                >
                                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{bullet}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                          {project.background && (
                            <div className="bg-yellow-50/70 border border-yellow-200/80 p-4 rounded-xl">
                              <h5 className="font-mono text-xs font-bold text-yellow-900 uppercase tracking-wider mb-2">
                                💡 Latar Belakang & Masalah
                              </h5>
                              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{project.background}</p>
                            </div>
                          )}
                          {project.solution && (
                            <div className="bg-emerald-50/70 border border-emerald-200/80 p-4 rounded-xl">
                              <h5 className="font-mono text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
                                🚀 Solusi & Hasil Rekayasa
                              </h5>
                              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{project.solution}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => toggleExpand(project.id)}
                            className="px-4 py-1.5 bg-black text-white rounded font-mono text-xs font-bold hover:bg-gray-800 transition-colors"
                          >
                            Tutup Berkas Dokumen ✕
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};
