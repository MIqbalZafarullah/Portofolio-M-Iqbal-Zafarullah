import React from 'react';
import { profileData } from '../../data/profile';

export const Footer = () => (
  <footer className="border-t border-black/10 bg-[#FAF9F5] py-10 mt-20 relative z-10 text-center font-mono">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
          Available for Collaboration & Full-Time Roles
        </span>
      </div>

      <p className="text-2xl font-black font-pixel tracking-widest text-black">
        {profileData.name.toUpperCase()}
      </p>

      <p className="text-xs text-gray-500 max-w-md font-sans">
        {profileData.title} · Universitas Bengkulu
      </p>

      <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-gray-700 mt-2">
        <a href={profileData.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-600 underline">LinkedIn</a>
        <span>•</span>
        <a href={profileData.socials.github} target="_blank" rel="noreferrer" className="hover:text-black underline">GitHub</a>
        <span>•</span>
        <a href={profileData.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-pink-600 underline">Instagram</a>
        <span>•</span>
        <a href={`mailto:${profileData.socials.email}`} className="hover:text-indigo-600 underline">Email</a>
      </div>

      <p className="text-[10px] text-gray-400 mt-4">
        © {new Date().getFullYear()} {profileData.name} — Built with React & Notebook Aesthetics 📓
      </p>
    </div>
  </footer>
);
