import React, { useState } from 'react';
import { Briefcase, Award, ChevronRight, Building2, Calendar, MapPin } from 'lucide-react';
import { workData, orgData } from '../data/experiences';
import { ExperienceDetailModal } from '../components/modals/ExperienceDetailModal';

export const ExperienceView = () => {
  const [selectedExp, setSelectedExp] = useState(null);

  return (
    <>
      <ExperienceDetailModal exp={selectedExp} isOpen={!!selectedExp} onClose={() => setSelectedExp(null)} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-24">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="font-hand text-xl text-gray-500">career journey & leadership roles 🏛️</span>
          <h2 className="text-4xl sm:text-6xl font-black font-pixel text-black uppercase mt-1 mb-3">
            Experience.
          </h2>
          <p className="text-gray-600 font-sans text-xs sm:text-sm max-w-md mx-auto">
            Perjalanan profesional, asisten laboratorium, dan kepemimpinan organisasi kemahasiswaan.
          </p>
        </div>

        {/* ── 1. WORK & TEACHING ASSISTANT EXPERIENCE ── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#FEF08A] text-black border-2 border-black p-2 rounded-lg shadow-[2px_2px_0px_#000]">
              <Briefcase size={18} />
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-mono text-black uppercase tracking-wide">
                Work & Academic Experience
              </h3>
              <p className="text-xs font-mono text-gray-500">Asistensi Praktikum & Fasilitator Program</p>
            </div>
            <div className="flex-1 h-0.5 bg-black/10 ml-2" />
          </div>

          <div className="space-y-6">
            {workData.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedExp(item)}
                className="relative bg-white border-2 border-black/15 hover:border-black rounded-2xl p-6 shadow-paper hover:shadow-[4px_4px_0px_#000000] hover:-translate-y-1 transition-all cursor-pointer group"
              >
                {/* Washi tape on corner */}
                <div className="washi-tape tape-yellow -top-2 right-8 w-14 rotate-6" />

                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-black/15 p-1 flex items-center justify-center overflow-hidden shrink-0">
                      <img
                        src={item.logo}
                        alt={item.org}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <a
                        href={item.orgLink}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-mono font-bold text-gray-600 hover:text-black hover:underline"
                      >
                        {item.org}
                      </a>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <span className="self-start sm:self-auto bg-green-100 text-green-800 border border-green-300 font-mono text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {item.date}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4 font-sans">
                  {item.desc}
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5 font-sans mb-4">
                  {item.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="text-blue-600 font-bold">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-black/5 font-mono text-[10px]">
                  {item.skills.map((s, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 border border-black/10 px-2 py-0.5 rounded">
                      #{s}
                    </span>
                  ))}
                  <span className="ml-auto text-blue-600 font-bold hover:underline text-[11px]">
                    Detail Dokumen ↗
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 2. ORGANIZATIONAL LEADERSHIP EXPERIENCE ── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#FBCFE8] text-black border-2 border-black p-2 rounded-lg shadow-[2px_2px_0px_#000]">
              <Award size={18} />
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-black font-mono text-black uppercase tracking-wide">
                Organizational Leadership
              </h3>
              <p className="text-xs font-mono text-gray-500">Struktur Pengurus & Tanggung Jawab Eksekutif</p>
            </div>
            <div className="flex-1 h-0.5 bg-black/10 ml-2" />
          </div>

          <div className="space-y-6">
            {orgData.map((item) => (
              <div
                key={item.id}
                className="bg-white border-2 border-black/15 rounded-2xl overflow-hidden shadow-paper"
              >
                {/* Org Header Bar */}
                <div className="bg-[#FAF9F5] border-b-2 border-black/15 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-black/10 p-0.5 flex items-center justify-center shrink-0">
                      <img src={item.logo} alt={item.orgName} className="w-full h-full object-contain" />
                    </div>
                    <a
                      href={item.orgLink}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-sm font-bold text-gray-900 hover:text-purple-600 hover:underline"
                    >
                      {item.orgName}
                    </a>
                  </div>
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest hidden sm:inline">
                    Organization
                  </span>
                </div>

                {/* Roles list */}
                <div className="divide-y divide-black/10">
                  {item.roles.map((role, ri) => (
                    <div
                      key={ri}
                      onClick={() =>
                        setSelectedExp({
                          ...item,
                          title: role.title,
                          date: role.date,
                          desc: role.desc,
                          bullets: role.bullets || item.bullets || [],
                          responsibilities: role.responsibilities || item.responsibilities || [],
                          skills: role.skills || item.skills || [],
                          photo: role.photo || item.photo,
                          org: item.orgName,
                        })
                      }
                      className="p-6 hover:bg-yellow-50/40 transition-colors cursor-pointer group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h4 className="text-base font-bold text-gray-900 group-hover:text-purple-700 transition-colors flex items-center gap-2">
                          <span>{role.title}</span>
                          <span className="text-xs text-gray-400 group-hover:translate-x-1 transition-transform">↗</span>
                        </h4>
                        <span className="bg-[#FEF08A] text-black border border-black/30 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                          {role.date}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed mb-3">
                        {role.desc}
                      </p>

                      <ul className="space-y-1 font-sans">
                        {role.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                            <span className="text-purple-600 font-bold">›</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
