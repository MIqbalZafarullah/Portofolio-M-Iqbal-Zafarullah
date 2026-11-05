import React from 'react';
import { BadgeCheck, Award, ExternalLink } from 'lucide-react';

export const CertificateCard = ({ cert, onClick }) => (
  <div
    onClick={onClick}
    className="relative bg-white border-2 border-black/15 hover:border-black rounded-2xl p-5 shadow-paper hover:shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between h-full min-h-[175px] group"
  >
    {/* Mini Tape on corner */}
    <div className="washi-tape tape-yellow -top-2 right-4 w-12 rotate-3 opacity-80" />

    <div>
      <div className="flex justify-between items-start mb-3">
        <span className="p-1.5 bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] rounded-lg">
          <BadgeCheck size={16} />
        </span>
        <span className="text-[10px] font-mono font-bold text-gray-700 bg-gray-100 border border-black/10 px-2.5 py-0.5 rounded-full">
          {cert.year}
        </span>
      </div>

      <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-blue-700 transition-colors leading-snug line-clamp-3 font-sans">
        {cert.title}
      </h3>
    </div>

    <div className="mt-4 pt-3 border-t border-black/5 flex items-end justify-between text-xs">
      <p className="text-[11px] text-gray-500 font-mono flex items-center gap-1.5 truncate mr-2">
        <Award size={13} className="text-pink-500 shrink-0" />
        <span className="truncate">{cert.issuer}</span>
      </p>
      <div className="p-1 rounded-full bg-gray-100 group-hover:bg-yellow-200 transition-colors text-black shrink-0">
        <ExternalLink size={13} />
      </div>
    </div>
  </div>
);
