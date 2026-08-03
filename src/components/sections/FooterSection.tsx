import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../common/BrandIcons';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { usePortfolio } from '../../context/PortfolioContext';
import { soundFx } from '../../utils/sound';

export const FooterSection: React.FC = () => {
  const { setIsEasterEggOpen } = usePortfolio();

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 bg-[#09090B] border-t border-white/10 relative overflow-hidden text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold font-heading text-xl shadow-lg shadow-purple-600/30">
              AK
            </div>
            <div>
              <div className="text-base font-bold font-heading text-white">{PERSONAL_INFO.name}</div>
              <div className="text-xs font-mono text-cyan-400">Java Backend Developer & Full Stack Specialist</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-slate-300">
            <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-purple-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-purple-400 transition-colors">Education</a>
            <a href="#services" className="hover:text-purple-400 transition-colors">Services</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all" title="GitHub">
              <GithubIcon className="w-4 h-4" />
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all" title="LinkedIn">
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a href={PERSONAL_INFO.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all" title="Instagram">
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>KIT's College of Engineering (CSBS • CGPA 8.6/10)</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                soundFx.playChime();
                setIsEasterEggOpen(true);
              }}
              className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
            >
              <Terminal className="w-3.5 h-3.5" /> Secret Matrix
            </button>

            <button
              onClick={scrollToTop}
              className="p-3 rounded-2xl bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/30 flex items-center justify-center transition-all group"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-500 font-mono">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. Code. Learn. Build. Repeat.
        </div>
      </div>
    </footer>
  );
};
