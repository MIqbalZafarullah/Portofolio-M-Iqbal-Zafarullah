import React from 'react';
import { Mail, Linkedin, Instagram, FolderGit2, Briefcase, BadgeCheck, Sparkles, Heart } from 'lucide-react';
import { GithubIconSmall } from '../ui/Icons';
import { profileData } from '../../data/profile';

export const Navbar = ({ activeTab, setActiveTab, onOpenContact }) => {
  const navItems = [
    { id: 'home', label: 'HOME', icon: '★' },
    { id: 'experience', label: 'EXPERIENCE', icon: '👤' },
    { id: 'works', label: 'PROYEK', icon: '🗂️' },
    { id: 'certificates', label: 'ACHIEVEMENTS', icon: '✨' },
  ];

  return (
    <>
      {/* ===== DESKTOP FLOATING LIQUID GLASS ISLAND ===== */}
      <header className="fixed top-3 left-0 right-0 z-[100] px-4 sm:px-6 pointer-events-none transition-all duration-300">
        <div className="max-w-5xl mx-auto liquid-glass-island rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between pointer-events-auto shadow-[0_12px_36px_-6px_rgba(0,0,0,0.08)]">
          
          {/* Left: Avatar / Logo Badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('home')}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 border border-white/80 flex items-center justify-center text-white font-black text-xs shadow-sm hover:scale-110 transition-transform"
              title="Home"
            >
              IQ
            </button>
            <div className="h-4 w-px bg-black/15 hidden sm:block" />
            
            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1 font-mono text-xs font-bold">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 tracking-wider ${
                      isActive
                        ? 'bg-[#FBBF24] text-black border border-black/30 shadow-[2px_2px_0px_#000000] scale-[1.02]'
                        : 'text-gray-700 hover:text-black hover:bg-white/80'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right: Social Circles & Contact Pill */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FACC15]/90 backdrop-blur-sm border border-white/80 flex items-center justify-center text-black hover:scale-110 hover:shadow-md transition-all shadow-sm"
              title="LinkedIn"
            >
              <Linkedin size={13} />
            </a>
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#34D399]/90 backdrop-blur-sm border border-white/80 flex items-center justify-center text-black hover:scale-110 hover:shadow-md transition-all shadow-sm"
              title="GitHub"
            >
              <GithubIconSmall />
            </a>
            <a
              href={profileData.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F472B6]/90 backdrop-blur-sm border border-white/80 flex items-center justify-center text-black hover:scale-110 hover:shadow-md transition-all shadow-sm"
              title="Instagram"
            >
              <Instagram size={13} />
            </a>

            <button
              onClick={onOpenContact}
              className="ml-1 sm:ml-2 px-3 sm:px-4 py-1.5 bg-[#18181B] hover:bg-black text-white border border-white/30 rounded-full font-mono text-xs font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#2563EB] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all glass-sheen"
            >
              <Heart size={12} className="text-red-400 fill-red-400" />
              <span>CONTACT</span>
            </button>
          </div>
        </div>
      </header>

      {/* ===== MOBILE BOTTOM NAVBAR (LIQUID GLASS DOCK) ===== */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 liquid-glass-island rounded-2xl px-2 py-2 flex justify-around items-center z-50 shadow-[0_10px_30px_rgba(0,0,0,0.12)] font-mono">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-[#FBBF24] text-black border border-black/30 shadow-[1px_1px_0px_#000]'
                  : 'text-gray-600 hover:text-black hover:bg-white/40'
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              <span className="text-[9px] font-bold tracking-wider mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
