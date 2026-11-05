import React, { useState, useEffect, useRef } from 'react';
import { Code, PenTool, Database, Globe, FolderGit2, Layout } from 'lucide-react';

const useSkillReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
};

const levelConfig = {
  'Advanced':     { color: 'text-emerald-700', bg: 'bg-emerald-100', border: 'border-emerald-300', bar: 'bg-emerald-500' },
  'Intermediate': { color: 'text-amber-800',  bg: 'bg-amber-100',  border: 'border-amber-300',  bar: 'bg-amber-500' },
  'Beginner':     { color: 'text-blue-700',   bg: 'bg-blue-100',   border: 'border-blue-300',   bar: 'bg-blue-500' },
};

const SkillBar = ({ skill, icon, percentage, level, delay = 0 }) => {
  const [ref, isVisible] = useSkillReveal();
  const cfg = levelConfig[level];

  return (
    <div
      ref={ref}
      className={`bg-white border-2 border-black/15 hover:border-black rounded-xl p-4 shadow-sm hover:shadow-[3px_3px_0px_#000] hover:-translate-y-0.5 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="text-black p-1 bg-yellow-200 border border-black/20 rounded-md">{icon}</div>
          <span className="text-sm font-bold text-gray-900 font-sans">{skill}</span>
        </div>
        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
          {level}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden border border-black/10">
          <div
            className={`h-full ${cfg.bar} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: isVisible ? `${percentage}%` : '0%', transitionDelay: `${delay + 200}ms` }}
          />
        </div>
        <span className="text-xs font-mono font-bold text-gray-600 w-8 text-right">{percentage}%</span>
      </div>
    </div>
  );
};

const allSkills = {
  'Languages': [
    { skill: 'HTML & CSS',    icon: <Globe size={15} />,    percentage: 90, level: 'Advanced' },
    { skill: 'JavaScript',    icon: <Code size={15} />,     percentage: 72, level: 'Intermediate' },
    { skill: 'PHP',           icon: <Code size={15} />,     percentage: 68, level: 'Intermediate' },
    { skill: 'Python',        icon: <Code size={15} />,     percentage: 74, level: 'Intermediate' },
    { skill: 'Java',          icon: <Code size={15} />,     percentage: 65, level: 'Intermediate' },
    { skill: 'MySQL',         icon: <Database size={15} />, percentage: 72, level: 'Intermediate' },
  ],
  'Design': [
    { skill: 'Figma',         icon: <Layout size={15} />,   percentage: 90, level: 'Advanced' },
    { skill: 'Canva',         icon: <PenTool size={15} />,  percentage: 88, level: 'Advanced' },
    { skill: 'Illustrator',   icon: <PenTool size={15} />,  percentage: 72, level: 'Intermediate' },
    { skill: 'UI/UX Design',  icon: <Layout size={15} />,   percentage: 85, level: 'Advanced' },
    { skill: 'Graphic Design',icon: <PenTool size={15} />,  percentage: 80, level: 'Advanced' },
  ],
  'Data & Tools': [
    { skill: 'Data Analysis', icon: <Database size={15} />, percentage: 73, level: 'Intermediate' },
    { skill: 'Python Pandas', icon: <Code size={15} />,     percentage: 68, level: 'Intermediate' },
    { skill: 'Arduino / IoT', icon: <Code size={15} />,     percentage: 65, level: 'Intermediate' },
    { skill: 'Git & GitHub',  icon: <FolderGit2 size={15}/>,percentage: 72, level: 'Intermediate' },
    { skill: 'Excel',         icon: <Database size={15} />, percentage: 78, level: 'Intermediate' },
  ],
};

const SkillsView = () => {
  const [activeTab, setActiveTab] = useState('Languages');
  const tabs = Object.keys(allSkills);

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <span className="font-hand text-lg text-gray-500">technical proficiency ⚡</span>
        <h3 className="text-2xl sm:text-3xl font-black font-pixel text-black uppercase mt-0.5 mb-2">
          Skills & Toolset.
        </h3>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="bg-[#FAF9F5] border-2 border-black p-1 rounded-xl flex gap-1 font-mono text-xs font-bold shadow-[2px_2px_0px_#000]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg transition-all ${
                activeTab === tab
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-600 hover:text-black hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {allSkills[activeTab].map((s, i) => (
          <SkillBar key={s.skill} {...s} delay={i * 60} />
        ))}
      </div>

      {/* Level Indicators */}
      <div className="mt-8 flex flex-wrap justify-center gap-6 font-mono text-xs font-bold">
        {Object.entries(levelConfig).map(([lvl, cfg]) => (
          <div key={lvl} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${cfg.bar}`} />
            <span className={cfg.color}>{lvl}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsView;
