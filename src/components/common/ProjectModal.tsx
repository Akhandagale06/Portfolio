import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Video, CheckCircle2, Layers, Cpu, Sparkles } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { usePortfolio } from '../../context/PortfolioContext';
import { soundFx } from '../../utils/sound';

export const ProjectModal: React.FC = () => {
  const { selectedProject, setSelectedProject, showToast } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        soundFx.playClick();
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, setSelectedProject]);

  if (!selectedProject) return null;

  const closeModal = () => {
    soundFx.playClick();
    setSelectedProject(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-900/95 border border-purple-500/30 rounded-2xl sm:rounded-3xl shadow-2xl shadow-purple-950/50 overflow-hidden glass-panel my-auto z-10 flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 text-slate-300 hover:text-white hover:bg-black/90 border border-white/10 transition-all backdrop-blur-md"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Hero Image Header */}
          <div className="relative h-48 sm:h-72 w-full overflow-hidden shrink-0">
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-md mb-2 inline-block">
                {selectedProject.category}
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-heading text-white leading-tight">
                {selectedProject.title}
              </h2>
              <p className="text-xs sm:text-base text-slate-300 mt-0.5 sm:mt-1 line-clamp-1">
                {selectedProject.subtitle}
              </p>
            </div>
          </div>

          {/* Scrollable Body Content */}
          <div className="p-4 sm:p-8 space-y-5 overflow-y-auto flex-1">
            {/* Action Buttons & Metrics */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs sm:text-sm flex items-center shadow-lg shadow-purple-600/30 transition-all"
                >
                  Live Product Demo <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5" />
                </a>

                {selectedProject.videoUrl && (
                  <a
                    href={selectedProject.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 font-medium text-xs sm:text-sm flex items-center transition-all"
                  >
                    Watch Demo Video <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5" />
                  </a>
                )}

                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-medium text-xs sm:text-sm flex items-center border border-white/10 transition-all"
                >
                  View Source <GithubIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5" />
                </a>
              </div>

              {selectedProject.metrics && (
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.metrics.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] sm:text-xs font-semibold"
                    >
                      ⚡ {m}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-purple-400 uppercase tracking-wider mb-1.5 flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Overview & Purpose
              </h3>
              <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
                {selectedProject.fullDescription || selectedProject.description}
              </p>
            </div>

            {/* Architecture Highlights */}
            {selectedProject.architectureHighlights && (
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center">
                  <Cpu className="w-3.5 h-3.5 mr-1.5" /> Architectural Highlights
                </h3>
                <ul className="space-y-2">
                  {selectedProject.architectureHighlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start text-slate-300 text-xs sm:text-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 mr-2 mt-0.5 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Badges */}
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center">
                <Layers className="w-3.5 h-3.5 mr-1.5" /> Technology Stack
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-xl bg-zinc-800 text-slate-300 border border-white/10 text-[11px] sm:text-xs font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-4 py-3 sm:px-8 sm:py-4 bg-black/40 border-t border-white/10 flex items-center justify-between text-[11px] sm:text-xs text-slate-400 shrink-0">
            <span>Press Esc to exit</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(selectedProject.liveUrl);
                showToast("Project URL copied!", "success");
              }}
              className="text-purple-400 hover:text-purple-300 transition-colors font-mono"
            >
              Share Link 🔗
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
