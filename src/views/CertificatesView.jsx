import React, { useState } from 'react';
import { certData, awardData, certificateFilters } from '../data/certificates';
import { CertificateModal } from '../components/modals/CertificateModal';
import { CertificateCard } from '../components/ui/CertificateCard';
import SkillsView from '../components/SkillsView';

export const CertificatesView = () => {
  const [viewMode, setViewMode] = useState('certifications');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCert, setSelectedCert] = useState(null);

  const filteredCerts = activeFilter === 'All'
    ? certData
    : certData.filter((c) => c.category === activeFilter);
  const displayedData = viewMode === 'certifications' ? filteredCerts : awardData;

  return (
    <>
      <CertificateModal cert={selectedCert} isOpen={!!selectedCert} onClose={() => setSelectedCert(null)} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="font-hand text-xl text-gray-500">verified credentials & awards 📜</span>
          <h2 className="text-4xl sm:text-6xl font-black font-pixel text-black uppercase mt-1 mb-3">
            Achievements.
          </h2>
          <p className="text-gray-600 font-sans text-xs sm:text-sm max-w-lg mx-auto mb-6">
            Sertifikasi keahlian teknologi, kejuaraan kompetisi nasional/internasional, dan penghargaan akademik.
          </p>

          {/* Toggle View Mode Buttons (Notebook Index Tabs) */}
          <div className="flex justify-center mb-6">
            <div className="bg-white border-2 border-black p-1 rounded-xl flex gap-1 shadow-[3px_3px_0px_#000] font-mono text-xs font-bold">
              <button
                onClick={() => setViewMode('certifications')}
                className={`px-5 py-2.5 rounded-lg transition-all ${
                  viewMode === 'certifications'
                    ? 'bg-[#FBBF24] text-black shadow-sm'
                    : 'text-gray-600 hover:text-black hover:bg-gray-100'
                }`}
              >
                Skill Certifications
              </button>
              <button
                onClick={() => setViewMode('achievements')}
                className={`px-5 py-2.5 rounded-lg transition-all ${
                  viewMode === 'achievements'
                    ? 'bg-[#FBBF24] text-black shadow-sm'
                    : 'text-gray-600 hover:text-black hover:bg-gray-100'
                }`}
              >
                Awards & Achievements
              </button>
            </div>
          </div>

          {/* Category Filter Pills (when certifications active) */}
          <div
            className={`flex flex-wrap justify-center gap-2 transition-all duration-500 font-mono text-xs font-bold overflow-hidden ${
              viewMode === 'certifications' ? 'opacity-100 max-h-24 mb-6' : 'opacity-0 max-h-0 mb-0 pointer-events-none'
            }`}
          >
            {certificateFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full transition-all border ${
                  activeFilter === filter
                    ? 'bg-black text-white border-black shadow-[2px_2px_0px_rgba(0,0,0,0.3)]'
                    : 'bg-white text-gray-700 border-black/20 hover:border-black'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-12">
          {displayedData.map((item) => (
            <div key={item.id} className="h-full">
              <CertificateCard cert={item} onClick={() => setSelectedCert(item)} />
            </div>
          ))}
        </div>

        {/* ===== DIVIDER ===== */}
        <div className="my-12">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-0.5 bg-black/10" />
            <span className="font-mono text-xs font-bold text-gray-500 uppercase tracking-widest px-3 bg-white border border-black/15 py-1 rounded-full shadow-sm">
              ⚡ Skills & Technical Stack
            </span>
            <div className="flex-1 h-0.5 bg-black/10" />
          </div>
        </div>

        {/* ===== SKILLS SECTION ===== */}
        <div className="bg-white border-2 border-black/15 rounded-3xl p-6 sm:p-10 shadow-paper">
          <SkillsView />
        </div>
      </div>
    </>
  );
};
