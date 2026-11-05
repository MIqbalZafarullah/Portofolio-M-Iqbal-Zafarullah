import React, { useRef, useState } from 'react';
import { X, CheckCircle, AlertCircle, Loader, Mail, Send, Heart } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { profileData } from '../../data/profile';

export const ContactModal = ({ isOpen, onClose }) => {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // ⚙️ KONFIGURASI EMAILJS
  const EMAILJS_SERVICE_ID = 'service_iqbalzf';
  const EMAILJS_TEMPLATE_ID = 'template_iqbalzf';
  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

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
      setTimeout(() => {
        setStatus('idle');
        onClose();
      }, 2500);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Notebook Paper Contact Card */}
      <div className="relative w-full max-w-lg bg-[#FAF9F5] border-2 border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#000] transform scale-100 animate-in zoom-in-95 duration-300">
        
        {/* Washi tape on top */}
        <div className="washi-tape tape-yellow -top-3 left-1/2 -translate-x-1/2 w-28 -rotate-1" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-black bg-white border border-black/20 p-2 rounded-full hover:bg-yellow-200 transition-colors shadow-sm"
        >
          <X size={18} />
        </button>

        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
            <CheckCircle size={56} className="text-emerald-500 animate-bounce" />
            <h3 className="text-2xl font-black font-pixel text-black">PESAN TERKIRIM! 🎉</h3>
            <p className="text-gray-600 text-sm font-sans max-w-xs">
              Terima kasih telah menyapa! Iqbal akan membaca dan membalas pesanmu sesegera mungkin.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <span className="font-hand text-lg text-gray-500">get in touch ✉️</span>
              <div className="inline-block border-2 border-black px-6 py-1 rounded-lg bg-yellow-200 shadow-[2px_2px_0px_#000] mt-1 mb-2">
                <h3 className="text-2xl font-black font-pixel text-black uppercase tracking-wider">
                  CONTACT
                </h3>
              </div>
              <p className="text-gray-600 text-xs font-sans max-w-xs mx-auto">
                Punya ide proyek, diskusi UI/UX, atau tawaran kolaborasi? Kirimkan pesan langsung di bawah ini.
              </p>
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 bg-red-100 border border-red-300 text-red-800 text-xs px-4 py-2.5 rounded-xl mb-4 font-mono">
                <AlertCircle size={14} className="shrink-0" />
                <span>Gagal mengirim. Periksa koneksi internet atau hubungi via email langsung.</span>
              </div>
            )}

            <form ref={formRef} className="space-y-3.5 font-sans" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-mono font-bold text-gray-700 mb-1 uppercase tracking-wider">
                  Nama Anda
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white border-2 border-black/20 focus:border-black rounded-xl px-4 py-2.5 text-black outline-none transition-all placeholder-gray-400 text-sm shadow-sm"
                  placeholder="Budi Santoso"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-gray-700 mb-1 uppercase tracking-wider">
                  Email Anda
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border-2 border-black/20 focus:border-black rounded-xl px-4 py-2.5 text-black outline-none transition-all placeholder-gray-400 text-sm shadow-sm"
                  placeholder="budi@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-gray-700 mb-1 uppercase tracking-wider">
                  Pesan Anda
                </label>
                <textarea
                  name="message"
                  required
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white border-2 border-black/20 focus:border-black rounded-xl px-4 py-2.5 text-black outline-none resize-none transition-all placeholder-gray-400 text-sm shadow-sm"
                  placeholder="Halo Iqbal, saya tertarik untuk mendiskusikan..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-black hover:bg-gray-800 text-white font-mono font-bold py-3 rounded-xl shadow-[3px_3px_0px_#2563EB] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 text-xs uppercase tracking-wider"
              >
                {status === 'loading' ? (
                  <>
                    <Loader size={15} className="animate-spin" /> Mengirim Pesan...
                  </>
                ) : (
                  <>
                    Kirim Pesan Sekarang <Send size={14} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-black/10 text-center text-xs font-mono text-gray-500">
              Direct Email: <a href={`mailto:${profileData.socials.email}`} className="text-black font-bold underline">{profileData.socials.email}</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
