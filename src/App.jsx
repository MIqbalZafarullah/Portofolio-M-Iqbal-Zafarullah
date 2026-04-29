import React, { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, Instagram, Download, ChevronRight, PenTool, Code, Settings, FolderGit2, Award, ExternalLink, BadgeCheck, GraduationCap, Layout, X, ChevronLeft, Building2, Zap, Heart, Coffee, Gamepad2, Camera, BookOpen, CheckCircle, AlertCircle, Loader, Globe, Database, Cpu, Briefcase } from 'lucide-react';
import emailjs from '@emailjs/browser';

import SkillsView from './components/SkillsView';

// --- CUSTOM HOOK: EFEK SUARA UI (KLIK KEYBOARD MEKANIK) ---
const useUISounds = () => {
  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const audioCtx = new AudioContext();

    const playHover = () => {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.03);
    };

    const playClick = () => {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(450, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.015);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.03);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, .interactive-card, input, textarea')) playHover();
    };
    const handleMouseDown = (e) => {
      if (e.target.closest('button, a, .interactive-card, input, textarea')) playClick();
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
};

// --- KOMPONEN: BACKGROUND PARTIKEL ---
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 1.5;
        this.speedY = Math.random() * 0.5 + 0.1;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.y -= this.speedY;
        if (this.y < 0) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 180, 252, ${this.opacity})`;
        ctx.fill();
      }
    }
    const init = () => {
      particles = [];
      const numParticles = window.innerWidth < 768 ? 50 : 150;
      for (let i = 0; i < numParticles; i++) particles.push(new Particle());
    };
    init();
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[1] opacity-60" />;
};

// --- CUSTOM HOOK: EFEK MENGETIK ---
const useTypewriter = (words, typingSpeed = 100, deletingSpeed = 50, delay = 1500) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) setTimeout(() => setIsDeleting(true), delay);
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delay]);
  return text;
};

// --- KOMPONEN: CUSTOM CURSOR ---

// --- CUSTOM HOOK: SCROLL REVEAL ---
const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: options.threshold || 0.12, rootMargin: options.rootMargin || '0px 0px -40px 0px' });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
};

// --- KOMPONEN: SCROLL REVEAL WRAPPER ---
const Reveal = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const [ref, isVisible] = useScrollReveal();
  const base = 'transition-all duration-700 ease-out';
  const hidden = {
    up: 'opacity-0 translate-y-10',
    down: 'opacity-0 -translate-y-10',
    left: 'opacity-0 translate-x-10',
    right: 'opacity-0 -translate-x-10',
  }[direction];
  const visible = 'opacity-100 translate-y-0 translate-x-0';
  return (
    <div
      ref={ref}
      className={`${base} ${isVisible ? visible : hidden} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const CustomCursor = () => {
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    const moveCursor = (e) => {
      if (dotRef.current) dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      if (glowRef.current) glowRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
      const target = e.target;
      const clickable = target.closest('button, a, input, textarea, [role="button"], .interactive-card');
      setIsHovering(!!clickable);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);
  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
      <div ref={dotRef} className="absolute" style={{ transform: 'translate(-100px, -100px)' }}>
        <div className="w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_10px_#818cf8]" />
      </div>
      <div ref={glowRef} className="absolute" style={{ transform: 'translate(-100px, -100px)' }}>
        <div className={`w-8 h-8 rounded-full border border-indigo-400/50 shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all duration-300 ease-out flex items-center justify-center ${isHovering ? 'scale-150 bg-indigo-500/20 border-indigo-300' : 'scale-100'}`} />
      </div>
    </div>
  );
};

// --- KOMPONEN: 3D TILT CARD ---
const SpotlightTiltCard = ({ children, className, onClick }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [transformStyle, setTransformStyle] = useState("");
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    if (window.innerWidth > 768) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((centerY - y) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;
      setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    }
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative rounded-3xl transition-all duration-300 ease-out group ${className}`}
      style={{ transform: transformStyle, transformStyle: "preserve-3d" }}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 z-20"
        style={{ opacity: isHovered ? 1 : 0, background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99,102,241,0.15), transparent 40%)` }}
      />
      <div className="relative z-10 h-full w-full bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-xl shadow-black/20">
        {children}
      </div>
    </div>
  );
};

// --- KOMPONEN: MODAL DETAIL PROYEK ---
const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  const [currentImg, setCurrentImg] = useState(0);
  useEffect(() => { setCurrentImg(0); }, [project]);
  if (!isOpen || !project) return null;
  const nextImg = () => setCurrentImg((prev) => (prev + 1) % project.gallery.length);
  const prevImg = () => setCurrentImg((prev) => (prev === 0 ? project.gallery.length - 1 : prev - 1));
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#070b19]/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-5xl bg-[#12103D]/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-indigo-500/20 transform scale-100 animate-in zoom-in-95 duration-300 flex flex-col max-h-full overflow-hidden interactive-card">
        <div className="flex justify-between items-center p-6 border-b border-white/10 relative z-10">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full mb-2 inline-block">{project.category}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors bg-white/5 p-3 rounded-full hover:bg-white/10"><X size={24} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 space-y-4">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/50 border border-white/10 group">
              <img src={project.gallery[currentImg]} alt="Project Detail" className="w-full h-full object-cover transition-all duration-500" />
              {project.gallery.length > 1 && (
                <><button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-indigo-600 text-white rounded-full"><ChevronLeft size={20} /></button><button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-indigo-600 text-white rounded-full"><ChevronRight size={20} /></button></>
              )}
            </div>
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Code size={18} className="text-indigo-400" /> Tech Stack</h4>
              <div className="flex flex-wrap gap-2">{project.techList.map((tech, i) => <span key={i} className="text-xs text-indigo-200 bg-indigo-500/20 px-3 py-1 rounded-lg border border-indigo-500/30">{tech}</span>)}</div>
            </div>
          </div>
          <div className="lg:w-1/2 space-y-6">
            <div><h4 className="text-lg font-bold text-white mb-2">💡 Latar Belakang</h4><p className="text-gray-300 text-sm leading-relaxed">{project.background}</p></div>
            <div><h4 className="text-lg font-bold text-white mb-2">🚀 Solusi & Hasil</h4><p className="text-gray-300 text-sm leading-relaxed">{project.solution}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- KOMPONEN: MODAL DETAIL PENGALAMAN ---
const ExperienceDetailModal = ({ exp, isOpen, onClose }) => {
  if (!isOpen || !exp) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#070b19]/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-3xl bg-[#12103D]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-indigo-500/20 transform scale-100 animate-in zoom-in-95 duration-300 flex flex-col overflow-hidden interactive-card">
        <div className="flex justify-between items-center p-6 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 p-2 flex items-center justify-center border border-white/10 overflow-hidden"><img src={exp.logo} alt="org logo" className="w-full h-full object-contain" /></div>
            <div><h2 className="text-xl md:text-2xl font-bold text-white leading-tight">{exp.title}</h2><p className="text-indigo-300 text-sm">{exp.org} • {exp.date}</p></div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors bg-white/5 p-3 rounded-full hover:bg-white/10"><X size={20} /></button>
        </div>
        <div className="p-6 md:p-8 overflow-y-auto max-h-[70vh]">
          <div className="mb-8">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Building2 size={18} className="text-indigo-400" /> Tanggung Jawab Utama</h4>
            <ul className="space-y-3">{exp.responsibilities.map((task, i) => (<li key={i} className="flex items-start gap-3 text-gray-300 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div><span>{task}</span></li>))}</ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Settings size={18} className="text-indigo-400" /> Keahlian Terkait</h4>
              <div className="flex flex-wrap gap-2">{exp.skills.map((s, i) => <span key={i} className="text-[10px] text-indigo-200 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30">{s}</span>)}</div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10"><img src={exp.photo} alt="activity" className="w-full h-full object-cover" /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- KOMPONEN: MODAL SERTIFIKAT ---
const CertificateModal = ({ cert, isOpen, onClose }) => {
  if (!isOpen || !cert) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#070b19]/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-3xl bg-[#12103D]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-indigo-500/20 transform scale-100 animate-in zoom-in-95 duration-300 flex flex-col overflow-hidden interactive-card">
        <div className="flex justify-between items-center p-5 md:p-6 border-b border-white/10 relative z-10">
          <div><span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full mb-2 inline-block">{cert.category}</span><h2 className="text-xl md:text-2xl font-bold text-white">{cert.title}</h2></div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors bg-white/5 p-3 rounded-full hover:bg-white/10"><X size={20} /></button>
        </div>
        <div className="p-5 md:p-8 flex flex-col items-center overflow-y-auto max-h-[75vh]">
          <div className="w-full bg-black/40 rounded-xl p-2 border border-white/10 mb-6 shadow-inner"><img src={cert.image} alt={cert.title} className="w-full h-auto max-h-[400px] object-contain rounded-lg shadow-lg" /></div>
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/10">
            <div><p className="text-gray-300 font-medium mb-1">Diterbitkan oleh: <span className="text-white font-bold">{cert.issuer}</span></p><p className="text-gray-400 text-sm">Tahun Penerbitan: <span className="text-indigo-300">{cert.year}</span></p></div>
            <a href={cert.link} target="_blank" rel="noreferrer" className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg interactive-card flex items-center justify-center gap-2">Verifikasi Kredensial <ExternalLink size={18} /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- KOMPONEN: CONTACT MODAL (EMAILJS) ---
const ContactModal = ({ isOpen, onClose }) => {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // ⚙️ KONFIGURASI EMAILJS
  // Daftar gratis di https://www.emailjs.com/ lalu isi nilai di bawah:
  const EMAILJS_SERVICE_ID = 'service_iqbalzf';   // Ganti dengan Service ID kamu
  const EMAILJS_TEMPLATE_ID = 'template_iqbalzf';  // Ganti dengan Template ID kamu
  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';   // Ganti dengan Public Key kamu

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'myjournaliqbok@gmail.com',
          reply_to: formData.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => { setStatus('idle'); onClose(); }, 2500);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#070b19]/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl shadow-indigo-500/20 transform scale-100 animate-in zoom-in-95 duration-300 interactive-card">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"><X size={20} /></button>

        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle size={56} className="text-green-400 mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-white mb-2">Pesan Terkirim! 🎉</h3>
            <p className="text-gray-400 text-sm">Terima kasih! Iqbal akan membalas sesegera mungkin.</p>
          </div>
        ) : (
          <>
            <h3 className="text-3xl font-bold text-white mb-2">Mari Ngobrol! ☕</h3>
            <p className="text-gray-400 text-sm mb-6">Punya ide proyek atau pertanyaan? Pesan langsung terkirim ke email Iqbal.</p>
            {status === 'error' && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-300 text-xs px-4 py-2.5 rounded-xl mb-4">
                <AlertCircle size={14} /> Gagal mengirim. Periksa koneksi internet dan coba lagi.
              </div>
            )}
            <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-semibold text-indigo-300 mb-1 uppercase tracking-wider">Nama Anda</label>
                <input name="name" type="text" required value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all placeholder-gray-500" placeholder="Budi Santoso" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-indigo-300 mb-1 uppercase tracking-wider">Email Anda</label>
                <input name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all placeholder-gray-500" placeholder="budi@example.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-indigo-300 mb-1 uppercase tracking-wider">Pesan</label>
                <textarea name="message" required rows="4" value={formData.message} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none resize-none transition-all placeholder-gray-500" placeholder="Halo Iqbal, saya tertarik untuk..."></textarea>
              </div>
              <button type="submit" disabled={status === 'loading'} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 mt-4 interactive-card disabled:opacity-70 disabled:cursor-not-allowed">
                {status === 'loading' ? (<><Loader size={18} className="animate-spin" /> Mengirim...</>) : (<>Kirim Pesan <Mail size={18} /></>)}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

// --- KOMPONEN: CV VIEWER MODAL ---
const CVViewerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const cvPath = '/Portofolio-M-Iqbal-Zafarullah/CV M Iqbal Zafarullah.pdf';
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#070b19]/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl h-[90vh] bg-[#12103D]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-indigo-500/20 flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600/30 border border-indigo-500/40 rounded-lg flex items-center justify-center">
              <Download size={14} className="text-indigo-400" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">CV M. Iqbal Zafarullah</p>
              <p className="text-gray-500 text-[10px]">Curriculum Vitae</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={cvPath}
              download="CV M Iqbal Zafarullah.pdf"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-full transition-all flex items-center gap-1.5 shadow-lg interactive-card"
            >
              <Download size={14} /> Unduh CV
            </a>
            <button onClick={onClose} className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all">
              <X size={18} />
            </button>
          </div>
        </div>
        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden bg-gray-900">
          <iframe
            src={`${cvPath}#toolbar=0&navpanes=0&scrollbar=1`}
            className="w-full h-full border-0"
            title="CV M. Iqbal Zafarullah"
          />
        </div>
      </div>
    </div>
  );
};

// --- APP UTAMA ---
const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCVOpen, setIsCVOpen] = useState(false);
  useUISounds();
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      html, body { overflow-x: hidden; margin: 0; padding: 0; }
      @media (pointer: fine) { body, a, button, input, textarea, [role="button"], .interactive-card { cursor: none !important; } }
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #070b19; }
      ::-webkit-scrollbar-thumb { background: #4f46e5; border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: #6366f1; }
      @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      .animate-marquee { animation: marquee 25s linear infinite; }
      .animate-marquee:hover { animation-play-state: paused; }
      .hide-scrollbar-custom { -ms-overflow-style: none; scrollbar-width: none; }
      .hide-scrollbar-custom::-webkit-scrollbar { display: none; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  const renderContent = () => {
    switch (activeTab) {
      case 'home':         return <HomeView onOpenCV={() => setIsCVOpen(true)} />;
      case 'experience':   return <ExperienceView />;
      case 'works':        return <WorksView />;
      case 'certificates': return <CertificatesView />;
      default:             return <HomeView onOpenCV={() => setIsCVOpen(true)} />;
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0A1A] via-[#12103D] to-[#1A1549] text-gray-200 font-sans selection:bg-indigo-500 selection:text-white relative pb-24 md:pb-0">
      <CustomCursor /><ParticleBackground />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <CVViewerModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
      {/* ===== DESKTOP & TABLET NAV ===== */}
      <nav className="fixed top-0 w-full z-[100] px-4 sm:px-6 md:px-10 lg:px-20 py-3 md:py-4">
        {/* Mobile top bar */}
        <div className="flex md:hidden justify-between items-center">
          <div className="text-lg font-black text-white tracking-widest cursor-pointer flex items-center interactive-card" onClick={() => setActiveTab('home')}>IQBALZF<span className="text-indigo-500">.</span></div>
          <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-indigo-500 transition-all shadow-lg interactive-card flex items-center gap-1.5">Contact Me <Mail size={13} /></button>
        </div>
        {/* Tablet/Desktop: 3-col grid */}
        <div className="hidden md:grid grid-cols-3 items-center">
          <div className="text-xl lg:text-2xl font-black text-white tracking-widest cursor-pointer flex items-center interactive-card" onClick={() => setActiveTab('home')}>IQBALZF<span className="text-indigo-500">.</span></div>
          <div className="flex justify-center">
            <div className="flex gap-2 lg:gap-4 text-xs lg:text-sm font-semibold tracking-wide bg-white/5 backdrop-blur-md border border-white/10 px-3 lg:px-6 py-2.5 rounded-full shadow-lg">
              <NavButton label="Home"         active={activeTab === 'home'}         onClick={() => setActiveTab('home')} />
              <NavButton label="Experience"    active={activeTab === 'experience'}   onClick={() => setActiveTab('experience')} />
              <NavButton label="Projects"      active={activeTab === 'works'}        onClick={() => setActiveTab('works')} />
              <NavButton label="Achievements"  active={activeTab === 'certificates'} onClick={() => setActiveTab('certificates')} />
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white text-xs lg:text-sm font-bold px-4 lg:px-5 py-2 lg:py-2.5 rounded-full hover:bg-indigo-500 transition-all shadow-lg interactive-card flex items-center gap-2">Contact Me <Mail size={14} /></button>
          </div>
        </div>
      </nav>
      <main key={activeTab} className="min-h-screen w-full relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both pt-20 md:pt-24 lg:pt-28">
        {renderContent()}
      </main>
      <Footer />
      {/* ===== MOBILE BOTTOM NAV (5 items) ===== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#12103D]/95 backdrop-blur-xl border-t border-white/10 px-1 py-2 flex justify-around items-center z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] pb-safe">
        <MobileNavIcon icon={<HomeIcon />}           label="Home"         active={activeTab === 'home'}         onClick={() => setActiveTab('home')} />
        <MobileNavIcon icon={<Briefcase size={18} />} label="Experience"   active={activeTab === 'experience'}  onClick={() => setActiveTab('experience')} />
        <MobileNavIcon icon={<FolderGit2 size={18} />} label="Projects"    active={activeTab === 'works'}       onClick={() => setActiveTab('works')} />
        <MobileNavIcon icon={<BadgeCheck size={18} />} label="Achievements" active={activeTab === 'certificates'} onClick={() => setActiveTab('certificates')} />
      </div>
    </div>
  );
};

// --- HOME VIEW ---
const HomeView = ({ onOpenCV }) => {
  const typingText = useTypewriter(['Informatics Student', 'UI/UX Designer', 'Graphic Designer', 'Data Enthusiast', 'Youth Educator']);
  const techTools = ['Figma', 'Canva', 'Illustrator', 'UI/UX Design', 'HTML', 'CSS', 'PHP', 'Python', 'MySQL', 'Data Analysis'];
  const toolIcons = [
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'Photoshop', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
    { name: 'Illustrator', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg' },
    { name: 'Canva', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
    { name: 'VSCode', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  ];
  return (
    <div className="relative w-full flex flex-col">

      {/* ===== HERO SECTION — CENTERED ===== */}
      <div className="relative flex flex-col items-center px-4 md:px-20 text-center">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none z-0" />

        {/* Photo */}
        <div className="relative z-10 mb-6">
          <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full p-1 bg-gradient-to-br from-indigo-500/60 to-purple-500/60 shadow-2xl shadow-indigo-500/40 mx-auto group">
            <img src="/Portofolio-M-Iqbal-Zafarullah/foto-profil.jpg" alt="M. Iqbal Zafarullah" className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500" />
          </div>
        </div>

        {/* Available badge */}
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 z-10 relative">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Available for collaboration
        </div>

        {/* Typewriter */}
        <div className="relative z-10 h-6 mb-3">
          <h3 className="text-indigo-400 text-xs md:text-sm font-bold tracking-[0.2em] uppercase inline-flex items-center">
            {typingText}<span className="w-1.5 h-4 bg-indigo-400 ml-1 animate-pulse" />
          </h3>
        </div>

        {/* Name */}
        <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-extrabold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-400 leading-tight">
          M. Iqbal Zafarullah
        </h1>



        {/* Role Pills */}
        <div className="relative z-10 flex flex-wrap justify-center gap-2 mb-8">
          <RolePill text="Bank Indonesia Scholar 2025" />
          <RolePill text="UI/UX Designer" />
          <RolePill text="Graphic Designer" />
          <RolePill text="Data Enthusiast" />
          <RolePill text="Youth Education Advocate" />
        </div>

        {/* CTA */}
        <div className="relative z-10 flex flex-wrap justify-center gap-3 mb-8">
          <button onClick={onOpenCV} className="bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3 rounded-full font-bold flex items-center gap-2 transition-all hover:-translate-y-1 shadow-lg shadow-indigo-500/30 interactive-card">
            <Download size={18} /> View CV
          </button>
        </div>

        {/* Social Links */}
        <div className="relative z-10 flex justify-center gap-3 mb-12">
          <SocialIcon icon={<Linkedin size={20} />} href="https://www.linkedin.com/in/m-iqbal-zafarullah" />
          <SocialIcon icon={<Mail size={20} />} href="mailto:myjournaliqbok@gmail.com" />
          <SocialIcon icon={<Instagram size={20} />} href="https://www.instagram.com/ibqaalzf?igsh=MTlldDkxNHB3YmF0MQ==" />
          <SocialIcon icon={<GithubIconSmall />} href="https://github.com/MIqbalZafarullah" />
        </div>
      </div>

      {/* ===== ABOUT SECTION (Reference Layout) ===== */}
      <div id="about-bento" className="px-6 md:px-20 max-w-7xl mx-auto pb-10 w-full">
        {/* Marquee */}
        <Reveal>
          <div className="w-full overflow-hidden relative border-y border-white/5 py-4 mb-10 bg-white/[0.01]">
            <div className="flex w-max animate-marquee">
              {[...techTools, ...techTools].map((tool, idx) => (<div key={idx} className="flex items-center gap-4 mx-6 text-gray-400"><span className="text-sm md:text-lg font-bold tracking-widest uppercase">{tool}</span><span className="text-indigo-500 text-xs">❖</span></div>))}
            </div>
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0B0A1A] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0B0A1A] to-transparent pointer-events-none" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT — Bio + Tags + Stats */}
          <Reveal className="lg:col-span-2 flex flex-col gap-5" delay={100}>
            <SpotlightTiltCard>
              <div className="p-7 relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/8 blur-[60px] rounded-full pointer-events-none" />
                <p className="text-gray-300 leading-relaxed text-sm mb-4">
                  Iqbal is an <strong className="text-white">Informatics student at the University of Bengkulu</strong> and a 2025 Bank Indonesia Scholarship Awardee with strong interests in UI/UX design, data analysis, and technology-driven social innovation.
                </p>
                <p className="text-gray-300 leading-relaxed text-sm mb-4">
                  He actively develops digital solutions through academic projects and interdisciplinary communities such as the Engineering Research Community (ERCOM), the Bank Indonesia Scholarship Community (GenBI), and the Bengkulu Provincial GenRe Forum.
                </p>
                <p className="text-gray-300 leading-relaxed text-sm mb-5">
                  Recognized as the 2024 Bengkulu Province GenRe Ambassador, Iqbal is passionate about leveraging technology to support digital education, public health awareness, and youth empowerment.
                </p>
                <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-500/5 rounded-r-xl mb-5">
                  <p className="text-gray-300 text-sm italic">
                    "With expertise in UI/UX design and web development using tools like <strong className="text-indigo-300">Figma</strong> and <strong className="text-indigo-300">Adobe Illustrator</strong>, I focus on creating accessible digital products that bridge the gap between technological innovation and meaningful social impact."
                  </p>
                </blockquote>
                <div className="flex flex-wrap gap-2">
                  {['UI/UX DESIGN', 'WEB DEVELOPMENT', 'DATA ANALYSIS', 'DESIGN GRAPHICS'].map((tag, i) => (
                    <span key={i} className="text-[10px] font-black tracking-widest border border-indigo-500/40 text-indigo-300 px-3 py-1.5 rounded-full bg-indigo-500/10">{tag}</span>
                  ))}
                </div>
              </div>
            </SpotlightTiltCard>
          </Reveal>

          {/* RIGHT — Education + Certifications */}
          <Reveal className="flex flex-col gap-5" delay={250}>
            <SpotlightTiltCard>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-black text-white">Education</h3>
                  <GraduationCap size={18} className="text-indigo-400" />
                </div>
                <div className="border-l-2 border-indigo-500/40 pl-4 mb-4">
                  <p className="text-indigo-300 font-bold text-sm">Universitas Bengkulu</p>
                  <p className="text-white text-xs font-semibold mt-0.5">Bachelor of Informatics</p>
                  <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest mt-1">2024 — Present</p>
                  <p className="text-[10px] text-gray-500 italic mt-2">Focus: Data Analysis & UI/UX Design.</p>
                </div>
                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Current GPA</p>
                    <p className="text-xl font-black text-indigo-400 mt-0.5">3.68 <span className="text-xs font-semibold text-gray-500">/ 4.00</span></p>
                  </div>
                  <GraduationCap size={20} className="text-indigo-500/50" />
                </div>
              </div>
            </SpotlightTiltCard>

            <SpotlightTiltCard>
              <div className="p-6">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Top Certifications</p>
                <ul className="space-y-2.5">
                  {['Dicoding Indonesia', 'Komdigi', 'Kemendukbangga', 'MySkill'].map((c, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-gray-300">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightTiltCard>
          </Reveal>
        </div>
      </div>

      {/* ===== TOOLS SECTION ===== */}
      <Reveal className="px-6 md:px-20 max-w-7xl mx-auto pb-24 w-full" delay={100}>
        <div className="text-center mb-8">
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] mb-2">Tech Stack</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white">Tools I Use.</h2>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 gap-4">
          {toolIcons.map((t) => (
            <div key={t.name} className="flex flex-col items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-indigo-500/40 hover:bg-white/10 transition-all duration-300 interactive-card group">
              <img src={t.icon} alt={t.name} className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300" />
              <span className="text-[10px] font-bold text-gray-400 group-hover:text-indigo-300 transition-colors uppercase tracking-wide">{t.name}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
};


// --- EXPERIENCE VIEW ---
const ExperienceView = () => {
  const [selectedExp, setSelectedExp] = useState(null);

  const workData = [
    {
      id: 1, type: 'work',
      title: 'Peer Facilitator – Youth Health & Development Programs',
      org: 'Kemendukbangga / BKKBN', orgLink: 'https://www.bkkbn.go.id/',
      date: 'Jan 2024 – Present',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/BKKBN_logo.svg/1200px-BKKBN_logo.svg.png',
      desc: 'Served as a peer facilitator in youth education initiatives under BKKBN, including the "Tentang Kita Upgrade" module focused on mental health and adolescent self-development.',
      bullets: ['Tentang Kita Upgrade Module – mental health & self-development focus', 'Nutrition & Anemia Prevention Education Module for Adolescents', 'Interactive peer-learning sessions at district and city level in Bengkulu'],
      responsibilities: ['Facilitated interactive educational sessions.', 'Promoted youth nutrition awareness.', 'Organized Bengkulu youth discussion forums.'],
      skills: ['Public Speaking', 'Mentoring', 'Nutrition Education'],
      photo: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800'
    },
    {
      id: 2, type: 'work',
      title: 'Teaching Assistant – Data Structures & Algorithms Practicum',
      org: 'Universitas Bengkulu – Informatics Engineering', orgLink: 'https://unib.ac.id/',
      date: 'Jan 2025 – Present',
      logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/2/29/Logo_Universitas_Bengkulu.png/220px-Logo_Universitas_Bengkulu.png',
      desc: 'Assisted lecturers in conducting practicum sessions for the Data Structures and Algorithms course. Supported students in understanding fundamental concepts.',
      bullets: ['Guided coding exercises and evaluated student assignments', 'Facilitated laboratory practicum sessions', 'Explained algorithm concepts, data structures, and problem-solving techniques'],
      responsibilities: ['Explained Tree & Graph implementations.', 'Evaluated student programming assignments.'],
      skills: ['Data Structures', 'Algorithms', 'Java'],
      photo: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800'
    }
  ];

  const orgData = [
    {
      id: 3, type: 'org',
      orgName: 'Generasi Baru Indonesia (GenBI) – Universitas Bengkulu Chapter',
      orgLink: 'https://genbi.id/',
      logo: 'https://genbi.id/wp-content/uploads/2021/07/logo-genbi.png',
      roles: [{
        title: 'Education and Culture Division Staff', date: '2025 – Present',
        desc: 'Contributed to educational leadership, cultural initiatives, and community programs within the Bank Indonesia scholarship community.',
        bullets: ['Collaborated with team for youth development programs', 'Supported community engagement activities', 'Raised social awareness through educational outreach initiatives']
      }],
      responsibilities: ['Managed community development programs.', 'Compiled divisional activity reports.'],
      skills: ['Leadership', 'Event Planning', 'Community Outreach'],
      photo: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800'
    },
    {
      id: 4, type: 'org',
      orgName: 'Bengkulu Provincial GenRe Forum (Forum Generasi Berencana)',
      orgLink: '#',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/BKKBN_logo.svg/1200px-BKKBN_logo.svg.png',
      roles: [{
        title: 'Secretary of Data & Information', date: '2025 – 2026',
        desc: 'Managed data reporting and information media design for the provincial youth organization.',
        bullets: ['Organized annual organizational data reports', 'Designed informational flyers for social media', 'Supported GenRe website management']
      }],
      responsibilities: ['Organized annual data reports.', 'Designed social media informational flyers.'],
      skills: ['Data Management', 'Graphic Design'],
      photo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800'
    }
  ];

  return (
    <>
      <ExperienceDetailModal exp={selectedExp} isOpen={!!selectedExp} onClose={() => setSelectedExp(null)} />
      <div className="px-6 md:px-20 max-w-4xl mx-auto pb-24">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] mb-2">History</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-3">Experience.</h2>
          <p className="text-gray-400 text-sm">My professional journey and organizational involvement.</p>
        </div>

        {/* ── WORK EXPERIENCE ── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-7 h-7 bg-indigo-600/30 border border-indigo-500/40 rounded-lg flex items-center justify-center"><Briefcase size={14} className="text-indigo-400" /></div>
            <h3 className="text-xl md:text-2xl font-bold text-white">Work Experience</h3>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <Reveal delay={0}>
            <div className="space-y-5">
              {workData.map((item, _i) => (
                <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 group cursor-pointer" onClick={() => setSelectedExp(item)}>
                  {/* Card header with logo */}
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10">
                    <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                      <img src={item.logo} alt={item.org} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                      <Briefcase size={14} className="text-indigo-400 hidden" />
                    </div>
                    <a href={item.orgLink} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="text-sm font-bold text-white hover:text-indigo-300 transition-colors">{item.org}</a>
                    <span className="ml-auto text-[9px] font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">{item.date}</span>
                  </div>
                  {/* Card body */}
                  <div className="px-5 py-4">
                    <h4 className="text-sm md:text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">{item.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-3">{item.desc}</p>
                    <ul className="space-y-1">
                      {item.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                          <ChevronRight size={12} className="text-indigo-500 mt-0.5 shrink-0" /><span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>


        {/* ── ORGANIZATIONAL EXPERIENCE ── */}
        <Reveal delay={80}>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-7 h-7 bg-purple-600/30 border border-purple-500/40 rounded-lg flex items-center justify-center"><Award size={14} className="text-purple-400" /></div>
              <h3 className="text-xl md:text-2xl font-bold text-white">Organizational Experience</h3>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="space-y-5">
              {orgData.map((item) => (
                <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300">
                  {/* Card header with logo */}
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10">
                    <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                      <img src={item.logo} alt={item.orgName} className="w-full h-full object-contain p-0.5"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                      <Award size={14} className="text-purple-400 hidden" />
                    </div>
                    <a href={item.orgLink} target="_blank" rel="noreferrer" className="text-sm font-bold text-white hover:text-purple-300 transition-colors">{item.orgName}</a>
                  </div>
                  {/* Roles */}
                  {item.roles.map((role, ri) => (
                    <div key={ri} className="px-5 py-4 interactive-card cursor-pointer group border-b border-white/5 last:border-0"
                      onClick={() => setSelectedExp({ ...item, title: role.title, date: role.date, desc: role.desc })}>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                        <h4 className="text-xs md:text-sm font-bold text-purple-200 group-hover:text-purple-300 transition-colors">{role.title}</h4>
                        <span className="text-[9px] font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 self-start sm:self-auto">{role.date}</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed mb-2">{role.desc}</p>
                      <ul className="space-y-1">
                        {role.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                            <ChevronRight size={12} className="text-purple-500 mt-0.5 shrink-0" /><span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
};

// --- HALAMAN PENCAPAIAN ---
const CertificatesView = () => {
  const [viewMode, setViewMode] = useState('certifications');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCert, setSelectedCert] = useState(null);

  const filters = ['All', 'Data & AI', 'UI/UX', 'Web Dev'];

  const certData = [
    { id: 1, title: 'Data Science Fundamentals', issuer: 'Dicoding Indonesia', year: '2026', category: 'Data & AI', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800', link: 'https://dicoding.com/' },
    { id: 2, title: 'Front-End Web Development', issuer: 'Dicoding Indonesia', year: '2025', category: 'Web Dev', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800', link: 'https://dicoding.com/' },
    { id: 3, title: 'UX Research Fundamentals', issuer: 'MySkill', year: '2025', category: 'UI/UX', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800', link: 'https://myskill.id/' },
    { id: 4, title: 'Basic Web Programming', issuer: 'Dicoding Indonesia', year: '2025', category: 'Web Dev', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800', link: 'https://dicoding.com/' },
    { id: 5, title: 'UI/UX Design Journey', issuer: 'Rakamin Academy', year: '2025', category: 'UI/UX', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=800', link: 'https://rakamin.com/' },
    { id: 6, title: 'Prompt Engineering w/ Azure OpenAI', issuer: 'Digital Talent Scholarship', year: '2025', category: 'Data & AI', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800', link: 'https://digitalent.kominfo.go.id/' },
    { id: 7, title: 'Backend in Website Dev', issuer: 'MySkill', year: '2025', category: 'Web Dev', image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800', link: 'https://myskill.id/' },
  ];

  const awardData = [
    { id: 101, title: 'Bank Indonesia Scholarship Awardee', issuer: 'GenBI', year: '2025', category: 'Beasiswa', image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=800', link: '#' },
    { id: 102, title: 'Juara 3 - Lomba Desain Infografis', issuer: 'BKKBN', year: '2025', category: 'Kompetisi', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800', link: '#' },
    { id: 103, title: 'Top 12 Finalis Duta GenRe', issuer: 'Prov. Bengkulu', year: '2024', category: 'Duta', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800', link: '#' },
    { id: 104, title: 'Anggota Terbaik (Garda Terbaik)', issuer: 'ERCOM UNIB', year: '2025', category: 'Organisasi', image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800', link: '#' },
  ];

  const filteredCerts = activeFilter === 'All' ? certData : certData.filter(c => c.category === activeFilter);
  const displayedData = viewMode === 'certifications' ? filteredCerts : awardData;

  return (
    <>
      <CertificateModal cert={selectedCert} isOpen={!!selectedCert} onClose={() => setSelectedCert(null)} />

      <div className="px-6 md:px-20 max-w-7xl mx-auto pb-10">
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-2">Achievements.</h2>
          <p className="text-gray-400 font-medium text-xs md:text-sm mb-6">Certifications & Academic Accomplishments.</p>
          <div className="flex justify-center mb-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-1 rounded-full flex gap-1 relative interactive-card shadow-lg">
              <button onClick={() => setViewMode('certifications')} className={`px-4 py-2 rounded-full text-[10px] md:text-xs font-bold transition-all duration-300 relative z-10 ${viewMode === 'certifications' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}>Skill Certifications</button>
              <button onClick={() => setViewMode('achievements')} className={`px-4 py-2 rounded-full text-[10px] md:text-xs font-bold transition-all duration-300 relative z-10 ${viewMode === 'achievements' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}>Awards & Achievements</button>
              <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-indigo-600 rounded-full transition-all duration-300 shadow-md ${viewMode === 'certifications' ? 'left-1' : 'left-[calc(50%+3px)]'}`}></div>
            </div>
          </div>
          <div className={`flex flex-wrap justify-center gap-2 transition-all duration-500 overflow-hidden ${viewMode === 'certifications' ? 'opacity-100 max-h-20 mb-4' : 'opacity-0 max-h-0 mb-0 pointer-events-none'}`}>
            {filters.map(filter => (<button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold transition-all duration-300 interactive-card ${activeFilter === filter ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40' : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'}`}>{filter}</button>))}
          </div>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-10 snap-x hide-scrollbar-custom" style={{ scrollBehavior: 'smooth' }}>{displayedData.map((item) => (<div key={item.id} className="min-w-[260px] md:min-w-[320px] snap-center flex-shrink-0 h-[200px]"><CertificateCard cert={item} onClick={() => setSelectedCert(item)} /></div>))}</div>
        <div className="flex justify-center items-center gap-2 text-gray-500 animate-pulse"><ChevronLeft size={14} /> <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to explore</span> <ChevronRight size={14} /></div>
      </div>

      {/* ===== DIVIDER ===== */}
      <div className="px-6 md:px-20 max-w-7xl mx-auto my-10">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest px-3">Skills & Capabilities</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
      </div>

      {/* ===== SKILLS SECTION ===== */}
      <SkillsView />

    </>
  );
};



// --- KOMPONEN BENTO HELPERS ---
const StatItem = ({ label, value, sub, icon }) => (
  <div className="group">
    <p className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest flex items-center gap-2 mb-1">{icon} {label}</p>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-black text-white group-hover:text-indigo-300 transition-colors">{value}</span>
      <span className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter">{sub}</span>
    </div>
  </div>
);

const ValuePill = ({ title, desc }) => (
  <div className="bg-white/5 border border-white/5 p-3 rounded-2xl group hover:border-indigo-500/50 transition-all">
    <p className="text-xs font-bold text-white mb-0.5">{title}</p>
    <p className="text-[10px] text-gray-500 group-hover:text-gray-400">{desc}</p>
  </div>
);

const HobbyIcon = ({ icon, label }) => (
  <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-2xl border border-white/5 hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-all interactive-card">
    <div className="text-indigo-400 mb-2">{icon}</div>
    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
  </div>
);

// --- KOMPONEN PROYEK (VERSI LENGKAP) ---
const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const WorksView = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const projectsData = [
    { id: 1, title: 'Budgetku Web App', category: 'Web Dev', tech: 'PHP, MySQL', desc: 'Aplikasi web manajemen keuangan pribadi yang membantu pengguna melacak aktivitas finansial.', gallery: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800'], techList: ['PHP', 'MySQL', 'CSS3', 'JS'], background: 'Mahasiswa sering kesulitan melacak pengeluaran harian.', solution: 'Membangun aplikasi responsif dengan dashboard analisis.', githubUrl: 'https://github.com/iqbalzafarullah' },
    { id: 2, title: 'BibokSalad UI/UX', category: 'UI/UX', tech: 'Figma', desc: 'Prototipe antarmuka website responsif yang menerapkan prinsip desain user-centered.', gallery: ['https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800'], techList: ['Figma', 'Prototyping', 'UX Research'], background: 'Toko makanan sehat butuh UX intuitif untuk pemesanan salad kustom.', solution: 'Desain ulang alur checkout satu halaman.', githubUrl: 'https://github.com/iqbalzafarullah' },
    { id: 3, title: 'HydroGreen IoT', category: 'IoT', tech: 'IoT, Arduino', desc: 'Sistem hidroponik cerdas berbasis IoT untuk mengatasi keterbatasan lahan pertanian.', gallery: ['https://images.unsplash.com/photo-1530836369250-ef71a3f5e481?q=80&w=800'], techList: ['Arduino', 'C++', 'IoT Sensors'], background: 'Lahan perkotaan Bengkulu yang sempit mempersulit pertanian.', solution: 'Sensor monitoring pH & Nutrisi otomatis via smartphone.', githubUrl: 'https://github.com/iqbalzafarullah' },
    { id: 4, title: 'Spider-Man 2D Game', category: 'Game', tech: 'Java', desc: 'Video game arcade 2D dengan aset karakter dan logika level yang dirancang mandiri.', gallery: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800'], techList: ['Java', 'Greenfoot', 'OOP'], background: 'Tugas akhir mata kuliah OOP.', solution: 'Implementasi pewarisan dan polimorfisme dalam game arcade.', githubUrl: 'https://github.com/iqbalzafarullah' }
  ];
  return (
    <>
      <ProjectDetailModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
      <div className="px-6 md:px-20 max-w-7xl mx-auto pb-24"><div className="mb-8 text-center"><h2 className="text-3xl md:text-6xl font-bold text-white mb-2">Proyek Unggulan.</h2><p className="text-gray-400 font-medium text-xs md:text-sm">Eksplorasi Teknologi & Desain Antarmuka.</p></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">{projectsData.map((project) => (
          <SpotlightTiltCard key={project.id} className="group cursor-pointer interactive-card" onClick={() => setSelectedProject(project)}>
            <div className="h-40 md:h-52 w-full overflow-hidden relative">
              <img src={project.gallery[0]} alt="p" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              {/* Status badge top-left */}
              <div className="absolute top-3 left-3 bg-green-500/90 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10">
                <span className="w-1.5 h-1.5 bg-white rounded-full" /> Selesai
              </div>
              {/* GitHub icon top-right */}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
                className="absolute top-3 right-3 bg-black/60 hover:bg-indigo-600 text-white p-2 rounded-full backdrop-blur-sm border border-white/20 hover:border-indigo-400 transition-all duration-300 hover:scale-110 shadow-lg z-10"
                title="View on GitHub"
              >
                <GithubIcon size={16} />
              </a>
            </div>
            <div className="p-5 md:p-6"><div className="flex justify-between items-center mb-3"><span className="text-[9px] font-bold bg-indigo-500/20 px-2.5 py-1 rounded-full text-indigo-200">{project.tech}</span><ExternalLink size={14} className="text-gray-500" /></div><h3 className="font-bold text-xl text-white group-hover:text-indigo-300 transition-colors">{project.title}</h3><p className="text-[11px] md:text-xs text-gray-400 leading-relaxed mt-2">{project.desc}</p></div>
          </SpotlightTiltCard>
        ))}</div>
      </div>
    </>
  );
};

const NavButton = ({ label, active, onClick }) => (<button onClick={onClick} className={`relative px-2 py-1 hover:text-indigo-300 transition-colors font-medium interactive-card ${active ? 'text-indigo-300' : 'text-gray-400'}`}>{label}{active && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-[3px] bg-indigo-500 rounded-full" />}</button>);
const RolePill = ({ text }) => <span className="bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full text-[10px] md:text-xs text-gray-300 font-medium transition-all interactive-card">{text}</span>;
const SocialIcon = ({ icon, href }) => <a href={href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-indigo-600 transition-all shadow-lg interactive-card">{icon}</a>;
const CertificateCard = ({ cert, onClick }) => (
  <SpotlightTiltCard className="interactive-card h-full" onClick={onClick}><div className="flex flex-col justify-between h-full p-5 cursor-pointer"><div><div className="flex justify-between items-start mb-3"><div className="p-1.5 bg-indigo-500/20 rounded-lg"><BadgeCheck size={18} className="text-indigo-400" /></div><span className="text-[9px] font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">{cert.year}</span></div><h3 className="text-sm md:text-base font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors leading-snug">{cert.title}</h3></div><div className="mt-4 flex items-end justify-between"><p className="text-[10px] md:text-xs text-gray-400 font-medium flex items-center gap-1.5 truncate mr-4"><Award size={12} className="text-purple-400 shrink-0" /> {cert.issuer}</p><div className="p-1.5 bg-white/5 hover:bg-indigo-500 rounded-full transition-all text-gray-400 hover:text-white shrink-0"><ExternalLink size={14} /></div></div></div></SpotlightTiltCard>
);
const MobileNavIcon = ({ icon, label, active, onClick }) => (<button onClick={onClick} className={`flex flex-col items-center justify-center gap-1 px-1 py-1 rounded-xl transition-all w-12 interactive-card ${active ? 'text-indigo-400 -translate-y-1' : 'text-gray-500'}`}><div className={`transition-all ${active ? 'bg-indigo-500/20 p-1.5 rounded-xl' : ''}`}>{icon}</div><span className={`text-[7px] font-medium ${active ? 'opacity-100' : 'opacity-70'}`}>{label}</span></button>);
const HomeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
const GithubIconSmall = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>;

// --- FOOTER ---
const Footer = () => (
  <footer className="hidden md:block relative z-10 border-t border-white/5 bg-[#070b19]/60 backdrop-blur-md mt-auto">
    <div className="max-w-7xl mx-auto px-6 md:px-20 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex flex-col items-center md:items-start gap-1">
        <span className="text-lg font-black text-white tracking-widest">IQBALZF<span className="text-indigo-500">.</span></span>
        <p className="text-[10px] text-gray-500">Informatics Student · UI/UX Designer · Data Enthusiast</p>
      </div>
      <div className="flex gap-4 text-xs text-gray-500">
        <a href="https://www.linkedin.com/in/m-iqbal-zafarullah" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">LinkedIn</a>
        <a href="https://github.com/MIqbalZafarullah" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">GitHub</a>
        <a href="https://www.instagram.com/ibqaalzf?igsh=MTlldDkxNHB3YmF0MQ==" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Instagram</a>
        <a href="mailto:myjournaliqbok@gmail.com" className="hover:text-indigo-400 transition-colors">Email</a>
      </div>
      <p className="text-[10px] text-gray-600">© {new Date().getFullYear()} M. Iqbal Zafarullah. All rights reserved.</p>
    </div>
  </footer>
);

export default App;