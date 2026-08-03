import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Eye, Calendar, Share2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { soundFx } from '../../utils/sound';

export const ArticleModal: React.FC = () => {
  const { selectedArticle, setSelectedArticle, showToast } = usePortfolio();

  if (!selectedArticle) return null;

  const closeModal = () => {
    soundFx.playClick();
    setSelectedArticle(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-zinc-900/95 border border-cyan-500/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden glass-panel my-auto z-10 p-5 sm:p-8 flex flex-col"
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-cyan-400 mb-3">
            <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
              {selectedArticle.category}
            </span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedArticle.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedArticle.readTime}</span>
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {selectedArticle.views} Views</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-bold font-heading text-white mb-4">
            {selectedArticle.title}
          </h2>

          <div className="prose prose-invert max-w-none text-slate-300 space-y-4 overflow-y-auto pr-2 flex-1 text-xs sm:text-base">
            <p className="text-sm sm:text-lg text-slate-200 leading-relaxed font-medium italic border-l-2 border-purple-500 pl-4">
              "{selectedArticle.excerpt}"
            </p>
            <p className="leading-relaxed">
              {selectedArticle.content}
            </p>
            <p className="leading-relaxed">
              To deliver exceptional performance in production environments, software engineers must strike a precise balance between raw compute throughput, browser execution pipelines, and micro-animations. By avoiding layout shifts and leveraging GPU hardware acceleration, web platforms feel instantaneous.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between shrink-0">
            <div className="flex flex-wrap gap-1.5">
              {selectedArticle.tags.map(t => (
                <span key={t} className="px-2 py-0.5 rounded-lg bg-zinc-800 text-[11px] font-mono text-slate-400">
                  #{t}
                </span>
              ))}
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                showToast("Article link copied!", "success");
              }}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-600/20 text-cyan-300 hover:bg-cyan-600/30 border border-cyan-500/30 text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
