import React from 'react';

export const RolePill = ({ text }) => (
  <span className="bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full text-[10px] md:text-xs text-gray-300 font-medium transition-all interactive-card">
    {text}
  </span>
);

export const SocialIcon = ({ icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-indigo-600 transition-all shadow-lg interactive-card"
  >
    {icon}
  </a>
);

