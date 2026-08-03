import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, Volume2, VolumeX, Menu, X, FileText } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { soundFx } from '../../utils/sound';

export const Navbar: React.FC = () => {
  const { soundEnabled, toggleSound, setIsCommandPaletteOpen, showToast } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Experience', href: '#experience' },
    { name: 'Services', href: '#services' },
    { name: 'Terminal', href: '#terminal' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);
      setScrolled(currentScroll > 40);

      const sections = ['hero', 'about', 'skills', 'projects', 'architecture', 'experience', 'services', 'terminal', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-900 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="fixed top-3 left-0 right-0 z-40 px-4 sm:px-8 max-w-7xl mx-auto">
        <nav
          className={`flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl transition-all duration-500 ${
            scrolled
              ? 'glass-panel shadow-2xl shadow-purple-950/20 border-purple-500/20 bg-zinc-900/80'
              : 'bg-transparent border border-transparent'
          }`}
        >
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold font-heading text-sm shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform border border-white/10 shrink-0">
              {avatarError ? (
                "AK"
              ) : (
                <img
                  src={PERSONAL_INFO.avatarUrl || `${PERSONAL_INFO.github}.png`}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover"
                  onError={() => setAvatarError(true)}
                />
              )}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-bold font-heading text-slate-100 group-hover:text-purple-400 transition-colors">
                {PERSONAL_INFO.name}
              </div>
              <div className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Java Backend Developer
              </div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-xl border border-white/5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all relative ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-cyan-600/40 border border-purple-500/50 rounded-lg -z-10"
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                soundFx.playChime();
                showToast("Opening Resume PDF Document...", "success");
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-all"
            >
              <FileText className="w-3.5 h-3.5" /> Resume
            </a>

            <button
              onClick={() => {
                soundFx.playCommandPalette();
                setIsCommandPaletteOpen(true);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/50 hover:bg-purple-900/50 border border-purple-500/30 text-purple-200 text-xs font-mono transition-all group"
            >
              <Command className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-12 transition-transform" />
              <span className="hidden lg:inline">Search</span>
              <kbd className="px-1.5 py-0.5 rounded bg-purple-900/60 border border-purple-400/30 text-[10px]">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={toggleSound}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-all"
              title="Toggle Audio Effects"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden p-6 rounded-3xl bg-zinc-900/95 border border-purple-500/30 shadow-2xl glass-panel"
          >
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="block px-4 py-3 rounded-xl bg-white/5 hover:bg-purple-600/20 text-slate-200 font-medium text-sm transition-all"
                >
                  {link.name}
                </a>
              ))}

              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white font-medium text-sm shadow-lg shadow-emerald-600/30"
              >
                <FileText className="w-4 h-4" /> Open Resume Document
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCommandPaletteOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-600 text-white font-medium text-sm shadow-lg shadow-purple-600/30"
              >
                <Command className="w-4 h-4" /> Open Command Palette (Ctrl+K)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
