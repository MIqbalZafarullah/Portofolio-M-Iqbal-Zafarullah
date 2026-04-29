import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

const FAB = ({ onClick }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={onClick}
      className="fixed bottom-28 md:bottom-8 right-6 z-[90] bg-indigo-600 hover:bg-indigo-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-indigo-500/40 border border-indigo-400/30 transition-all duration-300 hover:scale-110 interactive-card"
      title="Lihat CV"
    >
      <Download size={22} />
    </button>
  );
};

export default FAB;
