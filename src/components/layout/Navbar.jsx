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
      {/* ===== DESKTOP NAVBAR ===== */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[#FAF9F5]/90 backdrop-blur-md border-b border-black/10 px-4 sm:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Avatar / Logo Badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('home')}
              className="w-8 h-8 rounded-full bg-pink-400 border border-black/20 flex items-center justify-center text-white font-bold text-xs shadow-sm hover:scale-105 transition-transform"
              title="Home"
            >
              IQ
            </button>
            <div className="h-4 w-px bg-black/15 hidden sm:block" />
            
            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1.5 font-mono text-xs font-bold">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3.5 py-1.5 rounded-md transition-all flex items-center gap-1.5 tracking-wider ${
                      isActive
                        ? 'bg-[#FBBF24] text-black border border-black/30 shadow-[2px_2px_0px_#000000]'
                        : 'text-gray-600 hover:text-black hover:bg-black/5'
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
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FACC15] border border-black/20 flex items-center justify-center text-black hover:scale-110 transition-transform shadow-sm"
              title="LinkedIn"
            >
              <Linkedin size={13} />
            </a>
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#34D399] border border-black/20 flex items-center justify-center text-black hover:scale-110 transition-transform shadow-sm"
              title="GitHub"
            >
              <GithubIconSmall />
            </a>
            <a
              href={profileData.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F472B6] border border-black/20 flex items-center justify-center text-black hover:scale-110 transition-transform shadow-sm"
              title="Instagram"
            >
              <Instagram size={13} />
            </a>

            <button
              onClick={onOpenContact}
              className="ml-1 sm:ml-2 px-3 sm:px-4 py-1.5 bg-white hover:bg-yellow-100 border border-black rounded-full font-mono text-xs font-bold text-black flex items-center gap-1.5 shadow-[2px_2px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
            >
              <Heart size={12} className="text-red-500 fill-red-500" />
              <span>CONTACT</span>
            </button>
          </div>
        </div>
      </header>

      {/* ===== MOBILE BOTTOM NAVBAR ===== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#FAF9F5]/95 backdrop-blur-xl border-t border-black/15 px-2 py-2 flex justify-around items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe font-mono">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-[#FBBF24] text-black border border-black/30 shadow-[1px_1px_0px_#000]'
                  : 'text-gray-500 hover:text-black'
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
