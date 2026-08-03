import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, FolderGit2, Cpu, User, Mail, Volume2, VolumeX, Sparkles, X, Terminal } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { PROJECTS } from '../../data/portfolioData';
import { soundFx } from '../../utils/sound';

export const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, soundEnabled, toggleSound, setSelectedProject, setIsEasterEggOpen } = usePortfolio();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const navigateTo = (id: string) => {
    soundFx.playClick();
    setIsCommandPaletteOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProjects = PROJECTS.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCommandPaletteOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-2xl bg-zinc-900/90 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-900/20 overflow-hidden z-10 glass-panel"
        >
          <div className="flex items-center px-4 py-3.5 border-b border-white/10">
            <Search className="w-5 h-5 text-purple-400 mr-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                soundFx.playKeyPress();
                setQuery(e.target.value);
              }}
              placeholder="Search projects, skills, or jump to section... (Press Esc to close)"
              className="w-full bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none text-base"
              autoFocus
            />
            <button
              onClick={() => setIsCommandPaletteOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-h-[380px] overflow-y-auto p-3 space-y-4">
            <div>
              <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider px-3 mb-2">
                Quick Navigation
              </div>
              <div className="space-y-1">
                {[
                  { label: 'Hero / Top', id: 'hero', icon: Compass },
                  { label: 'About & Impact', id: 'about', icon: User },
                  { label: 'Technical Skills Matrix', id: 'skills', icon: Cpu },
                  { label: 'Featured Work & Projects', id: 'projects', icon: FolderGit2 },
                  { label: 'Smart Salon Architecture', id: 'architecture', icon: Terminal },
                  { label: 'Interactive Terminal CLI', id: 'terminal', icon: Terminal },
                  { label: 'Get in Touch', id: 'contact', icon: Mail },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className="w-full flex items-center px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-purple-600/20 transition-all text-sm font-medium group text-left"
                  >
                    <item.icon className="w-4 h-4 mr-3 text-purple-400 group-hover:text-cyan-400 transition-colors" />
                    <span>{item.label}</span>
                    <span className="ml-auto text-xs text-slate-500 group-hover:text-purple-300">Jump</span>
                  </button>
                ))}
              </div>
            </div>

            {query && (
              <div>
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider px-3 mb-2">
                  Matching Projects ({filteredProjects.length})
                </div>
                <div className="space-y-1">
                  {filteredProjects.length === 0 ? (
                    <div className="px-3 py-2 text-sm text-slate-400">No matching projects found.</div>
                  ) : (
                    filteredProjects.map((project) => (
                      <button
                        key={project.id}
                        onClick={() => {
                          soundFx.playClick();
                          setSelectedProject(project);
                          setIsCommandPaletteOpen(false);
                        }}
                        className="w-full flex items-center px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-cyan-600/20 transition-all text-sm group text-left"
                      >
                        <FolderGit2 className="w-4 h-4 mr-3 text-cyan-400" />
                        <div>
                          <div className="font-medium">{project.title}</div>
                          <div className="text-xs text-slate-400">{project.subtitle}</div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider px-3 mb-2">
                System Controls
              </div>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={toggleSound}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-sm transition-all border border-white/5"
                >
                  <span className="flex items-center">
                    {soundEnabled ? <Volume2 className="w-4 h-4 mr-2.5 text-cyan-400" /> : <VolumeX className="w-4 h-4 mr-2.5 text-slate-500" />}
                    Audio FX: <strong className="ml-1">{soundEnabled ? 'ENABLED' : 'MUTED'}</strong>
                  </span>
                </button>
              </div>

              <button
                onClick={() => {
                  soundFx.playChime();
                  setIsCommandPaletteOpen(false);
                  setIsEasterEggOpen(true);
                }}
                className="w-full mt-2 flex items-center justify-center p-2.5 rounded-xl bg-gradient-to-r from-purple-600/30 to-cyan-600/30 border border-purple-500/40 text-purple-200 hover:text-white text-sm font-medium transition-all"
              >
                <Sparkles className="w-4 h-4 mr-2 text-amber-300 animate-pulse" />
                Launch System Matrix Easter Egg 🚀
              </button>
            </div>
          </div>

          <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Tip: Use <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/10 text-slate-300">Esc</kbd> to exit</span>
            <span className="flex items-center gap-1 text-purple-400">
              <Sparkles className="w-3 h-3" /> Command Center v2.4
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
