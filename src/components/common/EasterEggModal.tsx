import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Terminal } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const EasterEggModal: React.FC = () => {
  const { isEasterEggOpen, setIsEasterEggOpen } = usePortfolio();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isEasterEggOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = 350;

    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZλπΩ⚡⌘🚀< />{}';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(9, 9, 11, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#22C55E';
      ctx.font = `${fontSize}px JetBrains Mono`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isEasterEggOpen]);

  if (!isEasterEggOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsEasterEggOpen(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-lg"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          className="relative w-full max-w-xl bg-black border border-emerald-500/50 rounded-2xl p-6 shadow-2xl z-10 glass-panel overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3 mb-4">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm">
              <Terminal className="w-4 h-4" />
              <span>SYSTEM MATRIX ACTIVE // SECRET UNLOCKED</span>
            </div>
            <button
              onClick={() => setIsEasterEggOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-emerald-500/20 mb-4 h-[250px]">
            <canvas ref={canvasRef} className="w-full h-full block" />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-black/40 text-center p-4">
              <Sparkles className="w-8 h-8 text-amber-300 animate-bounce mb-2" />
              <h3 className="text-xl font-bold font-heading text-white">"There is no spoon."</h3>
              <p className="text-xs font-mono text-emerald-300 mt-1 max-w-md">
                You've discovered the hidden system layer. Code is just thoughts made visible.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsEasterEggOpen(false)}
              className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black font-semibold text-sm transition-all"
            >
              Resume Experience
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
