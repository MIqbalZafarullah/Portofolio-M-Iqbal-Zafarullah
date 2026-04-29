import React, { useState, useEffect, useRef } from 'react';
import { Code, PenTool, Database, Globe, FolderGit2, Layout } from 'lucide-react';

const useSkillReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
};

const levelConfig = {
  'Advanced':     { color: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/20',  bar: 'from-green-400 to-emerald-500' },
  'Intermediate': { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', bar: 'from-yellow-400 to-orange-400' },
  'Beginner':     { color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   bar: 'from-blue-400 to-cyan-400' },
};

const SkillBar = ({ skill, icon, percentage, level, delay = 0 }) => {
  const [ref, isVisible] = useSkillReveal();
  const cfg = levelConfig[level];
  return (
    <div
      ref={ref}
      className={`bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-indigo-500/30 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="text-indigo-400 p-1.5 bg-indigo-500/10 rounded-lg">{icon}</div>
          <span className="text-sm font-bold text-white">{skill}</span>
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${cfg.color} ${cfg.bg} ${cfg.border}`}>{level}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${cfg.bar} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: isVisible ? `${percentage}%` : '0%', transitionDelay: `${delay + 300}ms` }}
          />
        </div>
        <span className="text-xs font-bold text-gray-400 w-8 text-right">{percentage}%</span>
      </div>
    </div>
  );
};

const allSkills = {
  'Languages': [
    { skill: 'HTML & CSS',    icon: <Globe size={16} />,    percentage: 90, level: 'Advanced' },
    { skill: 'JavaScript',    icon: <Code size={16} />,     percentage: 72, level: 'Intermediate' },
    { skill: 'PHP',           icon: <Code size={16} />,     percentage: 68, level: 'Intermediate' },
    { skill: 'Python',        icon: <Code size={16} />,     percentage: 74, level: 'Intermediate' },
    { skill: 'Java',          icon: <Code size={16} />,     percentage: 65, level: 'Intermediate' },
    { skill: 'MySQL',         icon: <Database size={16} />, percentage: 72, level: 'Intermediate' },
  ],
  'Design': [
    { skill: 'Figma',         icon: <Layout size={16} />,   percentage: 90, level: 'Advanced' },
    { skill: 'Canva',         icon: <PenTool size={16} />,  percentage: 88, level: 'Advanced' },
    { skill: 'Illustrator',   icon: <PenTool size={16} />,  percentage: 72, level: 'Intermediate' },
    { skill: 'UI/UX Design',  icon: <Layout size={16} />,   percentage: 85, level: 'Advanced' },
    { skill: 'Graphic Design',icon: <PenTool size={16} />,  percentage: 80, level: 'Advanced' },
  ],
  'Data & Tools': [
    { skill: 'Data Analysis', icon: <Database size={16} />, percentage: 73, level: 'Intermediate' },
    { skill: 'Python Pandas', icon: <Code size={16} />,     percentage: 68, level: 'Intermediate' },
    { skill: 'Arduino / IoT', icon: <Code size={16} />,     percentage: 65, level: 'Intermediate' },
    { skill: 'Git & GitHub',  icon: <FolderGit2 size={16}/>,percentage: 72, level: 'Intermediate' },
    { skill: 'Excel',         icon: <Database size={16} />, percentage: 78, level: 'Intermediate' },
  ],
};

const SkillsView = () => {
  const [activeTab, setActiveTab] = useState('Languages');
  const tabs = Object.keys(allSkills);
  return (
    <div className="px-6 md:px-20 max-w-5xl mx-auto pb-24">
      <div className="mb-10 text-center">
        <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] mb-2">Capabilities</p>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-3">Skills.</h2>
        <p className="text-gray-400 text-sm">Technical and design skills I have mastered.</p>
      </div>
      <div className="flex justify-center mb-8">
        <div className="bg-white/5 border border-white/10 p-1 rounded-full flex gap-1 shadow-lg backdrop-blur-md">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${activeTab === tab ? 'text-white bg-indigo-600 shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {allSkills[activeTab].map((s, i) => (
          <SkillBar key={s.skill} {...s} delay={i * 80} />
        ))}
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        {Object.entries(levelConfig).map(([lvl, cfg]) => (
          <div key={lvl} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${cfg.bar}`} />
            <span className={`text-xs font-bold ${cfg.color}`}>{lvl}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsView;
