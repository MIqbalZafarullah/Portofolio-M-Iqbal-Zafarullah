import React from 'react';
import { Download, GraduationCap, ArrowUpRight, Sparkles, MapPin, Briefcase } from 'lucide-react';
import { profileData, techTools, toolIcons } from '../data/profile';
import { Reveal } from '../components/ui/Reveal';

export const HomeView = ({ onOpenCV, onOpenContact }) => {
  return (
    <div className="relative w-full flex flex-col pt-6 pb-16">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center my-6">
        
        {/* Top Annotation Pills */}
        <div className="flex justify-between items-center max-w-md mx-auto mb-2 text-[10px] font-mono uppercase tracking-wider">
          <span className="bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] px-3 py-1 rounded-full shadow-sm font-bold">
            MADE THINGS
          </span>
          <span className="font-hand text-lg text-gray-600 -rotate-3">
            my name is ✎
          </span>
          <span className="bg-[#FEF9C3] text-[#854D0E] border border-[#FDE047] px-3 py-1 rounded-full shadow-sm font-bold">
            SWEAT THE DETAILS
          </span>
        </div>

        {/* Floating Mini Photo Circles (Left & Right) */}
        <div className="relative inline-block my-2">
          {/* Left Mini Avatar */}
          <div className="hidden sm:block absolute -left-16 lg:-left-24 top-6 w-14 h-14 lg:w-16 lg:h-16 rounded-full border-2 border-orange-400 p-0.5 shadow-md bg-white -rotate-6 hover:rotate-0 transition-transform">
            <img
              src={profileData.profilePhoto}
              alt="Iqbal"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Center Pixel Name Box */}
          <div className="relative inline-block border-2 border-[#E11D48] bg-white/70 backdrop-blur-sm rounded-xl px-6 sm:px-12 py-3 shadow-[4px_4px_0px_#E11D48] transition-transform hover:scale-[1.02]">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-pixel tracking-widest text-[#18181B] uppercase select-none">
              IQBAL
            </h1>
          </div>

          {/* Right Mini Avatar - GenBI photo */}
          <div className="hidden sm:block absolute -right-16 lg:-right-24 top-6 w-14 h-14 lg:w-16 lg:h-16 rounded-full border-2 border-orange-400 p-0.5 shadow-md bg-white rotate-6 hover:rotate-0 transition-transform">
            <img
              src="/Portofolio-M-Iqbal-Zafarullah/iqbal-genbi.jpg"
              alt="Iqbal - GenBI"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Annotations & Stickers around Name */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 my-4 font-mono text-xs">
          <span className="bg-[#FEF08A] text-black border border-black/40 px-3 py-1 rounded-md shadow-[2px_2px_0px_#000] -rotate-1 font-bold">
            Product & UI/UX Designer ↖
          </span>

          <span className="inline-flex items-center gap-1.5 bg-white text-gray-800 border border-black/20 px-3 py-1 rounded-full text-[11px] font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            OPEN TO NEW WORK & GOOD PROBLEMS
          </span>

          <span className="bg-[#DCFCE7] text-black border border-black/40 px-3 py-1 rounded-md shadow-[2px_2px_0px_#000] rotate-1 font-bold">
            ↗ Bengkulu, ID
          </span>
        </div>

        {/* Punchline Statement */}
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 mt-6 mb-8 max-w-3xl mx-auto leading-tight font-sans">
          I design software that <span className="inline-block px-2 bg-emerald-100 text-emerald-800 rounded border border-emerald-300">🎯 gets out</span> of your way. 🌸
        </h2>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={onOpenContact}
            className="px-6 py-3 bg-[#18181B] hover:bg-black text-white font-mono text-xs font-bold rounded-lg shadow-[3px_3px_0px_#2563EB] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center gap-2"
          >
            <span className="w-4 h-4 bg-blue-600 text-white rounded flex items-center justify-center text-[10px]">↗</span>
            <span>CONTACT ME</span>
          </button>

          <button
            onClick={onOpenCV}
            className="px-6 py-3 bg-white hover:bg-yellow-50 text-black border-2 border-black font-mono text-xs font-bold rounded-lg shadow-[3px_3px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center gap-2"
          >
            <Download size={14} />
            <span>VIEW CURRICULUM VITAE</span>
          </button>
        </div>

        {/* Role Stickers */}
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {profileData.rolePills.map((pill, i) => (
            <span
              key={i}
              className="bg-white/80 border border-black/20 text-gray-800 text-xs font-mono font-medium px-3 py-1 rounded-full shadow-sm hover:border-black transition-colors"
            >
              #{pill}
            </span>
          ))}
        </div>
      </section>

      {/* ===== "WHAT'S UP" / NOTEBOOK SKETCH SECTION ===== */}
      <section className="relative max-w-4xl mx-auto px-4 sm:px-6 my-16 w-full">
        <div className="relative bg-white/90 border-2 border-black/15 rounded-3xl p-6 sm:p-12 shadow-paper">
          
          {/* Section Header Pin */}
          <div className="flex justify-center -mt-10 sm:-mt-16 mb-8">
            <span className="bg-white border-2 border-black px-6 py-1.5 rounded-lg font-mono text-xs font-bold uppercase tracking-widest shadow-[3px_3px_0px_#000000]">
              what's up
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            
            {/* Left Polaroid Photo with Tape */}
            <div className="relative shrink-0">
              <div className="washi-tape tape-blue -top-3 -left-3 w-20 -rotate-12" />
              <div className="washi-tape tape-yellow -bottom-3 -right-3 w-20 rotate-12" />
              <div className="bg-white p-3 pb-6 border border-black/20 rounded-md shadow-polaroid -rotate-3 hover:rotate-0 transition-transform w-52 sm:w-60">
                <div className="aspect-[4/5] bg-gray-100 rounded overflow-hidden">
                  <img
                    src={profileData.profilePhoto}
                    alt="M. Iqbal Zafarullah"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-hand text-center text-sm font-bold text-gray-600 mt-2">
                  Iqbal Zafarullah • 2026
                </p>
              </div>
            </div>

            {/* Right Handwritten Text & Highlighter Stickers */}
            <div className="flex-1 text-center lg:text-left space-y-5">
              <p className="font-hand text-2xl sm:text-3xl text-gray-900 leading-relaxed">
                Muhammad Iqbal Zafarullah is an <span className="bg-yellow-200 px-1 rounded">Informatics student</span> & product designer who works with local businesses and modern startups. ✨ He turns complex problems into visuals and software that are clear, considered, and built for real people. 🎨
              </p>

              {/* Highlighter Sticker Badges */}
              <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start pt-2 font-mono text-xs font-bold">
                <span className="highlighter-yellow px-4 py-2 rounded-md border border-yellow-400 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] flex items-center gap-1.5 -rotate-1">
                  <span>Interaction Design</span> 🎨
                </span>
                <span className="highlighter-green px-4 py-2 rounded-md border border-green-400 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] flex items-center gap-1.5 rotate-1">
                  <span>Prototyping</span> 🧩
                </span>
                <span className="highlighter-pink px-4 py-2 rounded-md border border-pink-400 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] flex items-center gap-1.5 -rotate-2">
                  <span>User Research</span> 🌸
                </span>
                <span className="highlighter-blue px-4 py-2 rounded-md border border-blue-400 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] flex items-center gap-1.5 rotate-2">
                  <span>Web Development</span> 👀
                </span>
              </div>
            </div>

          </div>

          {/* Education Mini Note at Bottom */}
          <div className="mt-10 pt-8 border-t border-black/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-600">
            <div className="flex items-center gap-2">
              <GraduationCap size={16} className="text-black" />
              <span><strong>{profileData.education.university}</strong> — {profileData.education.degree} ({profileData.education.period})</span>
            </div>
            <div className="bg-[#FEF08A] text-black border border-black/30 px-3 py-1 rounded font-bold">
              GPA: {profileData.education.gpa} / {profileData.education.maxGpa}
            </div>
          </div>

        </div>
      </section>

      {/* ===== TOOLS MARQUEE & STICKER GRID ===== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 my-10 w-full">
        {/* Marquee Tape */}
        <div className="relative border-y-2 border-black py-3 mb-10 bg-[#FAF9F5] overflow-hidden shadow-sm">
          <div className="flex w-max animate-marquee font-mono text-sm font-black tracking-widest uppercase">
            {[...techTools, ...techTools, ...techTools].map((tool, idx) => (
              <div key={idx} className="flex items-center gap-4 mx-6 text-black">
                <span>{tool}</span>
                <span className="text-pink-500 text-xs">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Sticker Cards */}
        <div className="text-center mb-6">
          <span className="font-hand text-xl text-gray-500">my favorite toolset 🧰</span>
          <h3 className="font-pixel text-3xl font-black text-black uppercase mt-1">Tools I Use Daily.</h3>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {toolIcons.map((t) => (
            <div
              key={t.name}
              className="bg-white border-2 border-black/15 rounded-xl p-3 flex flex-col items-center justify-center gap-2 shadow-sm hover:border-black hover:shadow-[3px_3px_0px_#000] hover:-translate-y-1 transition-all group"
            >
              <img
                src={t.icon}
                alt={t.name}
                className="w-7 h-7 object-contain group-hover:scale-110 transition-transform"
              />
              <span className="text-[10px] font-mono font-bold text-gray-700 uppercase">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
