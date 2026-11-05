import React, { useState } from 'react';
import { GraduationCap, Landmark, HeartHandshake, Code2, FlaskConical, Building2 } from 'lucide-react';

const getOrgBadgeConfig = (name = '') => {
  const lower = name.toLowerCase();
  if (lower.includes('universitas') || lower.includes('unib') || lower.includes('informatics')) {
    return {
      icon: GraduationCap,
      label: 'UNIB',
      bg: 'bg-[#FEF08A]',
      border: 'border-black/30',
      text: 'text-amber-900',
    };
  }
  if (lower.includes('bank indonesia') || lower.includes('genbi')) {
    return {
      icon: Landmark,
      label: 'GenBI',
      bg: 'bg-[#BFDBFE]',
      border: 'border-blue-400',
      text: 'text-blue-900',
    };
  }
  if (lower.includes('himatif')) {
    return {
      icon: Code2,
      label: 'HMTF',
      bg: 'bg-[#E9D5FF]',
      border: 'border-purple-400',
      text: 'text-purple-900',
    };
  }
  if (lower.includes('ercom')) {
    return {
      icon: FlaskConical,
      label: 'ERCOM',
      bg: 'bg-[#FECDD3]',
      border: 'border-rose-400',
      text: 'text-rose-900',
    };
  }
  if (lower.includes('genre') || lower.includes('bkkbn') || lower.includes('kemendukbangga')) {
    return {
      icon: HeartHandshake,
      label: 'BKKBN',
      bg: 'bg-[#BBF7D0]',
      border: 'border-emerald-400',
      text: 'text-emerald-900',
    };
  }
  return {
    icon: Building2,
    label: name.slice(0, 3).toUpperCase(),
    bg: 'bg-yellow-100',
    border: 'border-yellow-400',
    text: 'text-gray-900',
  };
};

export const OrgLogo = ({ src, alt = '', className = 'w-10 h-10', iconSize = 18 }) => {
  const [imgError, setImgError] = useState(false);
  const badge = getOrgBadgeConfig(alt);
  const IconComponent = badge.icon;

  if (!src || imgError) {
    return (
      <div
        className={`${className} rounded-xl ${badge.bg} border-2 ${badge.border} flex flex-col items-center justify-center shadow-[1px_1px_0px_#000] select-none shrink-0 transition-transform hover:scale-105`}
        title={alt}
      >
        <IconComponent size={iconSize} className={badge.text} />
        <span className={`text-[8px] font-mono font-black ${badge.text} leading-none mt-0.5 tracking-tight`}>
          {badge.label}
        </span>
      </div>
    );
  }

  return (
    <div className={`${className} rounded-xl bg-white border border-black/15 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-sm`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        onError={() => setImgError(true)}
      />
    </div>
  );
};

