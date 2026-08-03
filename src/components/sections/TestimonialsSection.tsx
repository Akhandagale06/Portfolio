import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../../data/portfolioData';
import { soundFx } from '../../utils/sound';

export const TestimonialsSection: React.FC = () => {
  // Duplicate array for infinite seamless marquee loop
  const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-24 relative bg-[#09090B] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-14 text-center space-y-4">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-3.5 py-1 rounded-full text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 inline-block"
        >
          // SOCIAL PROOF & ADVISORY REVIEWS
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-extrabold font-heading text-white"
        >
          Client & Executive <span className="text-gradient-aurora">Endorsements</span>
        </motion.h2>
      </div>

      {/* Infinite Marquee Track */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Gradient Fade Masks */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#09090B] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#09090B] to-transparent z-20 pointer-events-none" />

        <div className="animate-marquee flex gap-6">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onMouseEnter={() => soundFx.playHover()}
              className="w-[380px] sm:w-[420px] shrink-0 p-6 rounded-3xl bg-zinc-900/60 border border-white/10 glass-panel glass-panel-hover space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-purple-400/40" />
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border border-purple-500/40"
                />
                <div>
                  <div className="text-sm font-bold font-heading text-white flex items-center gap-1.5">
                    {item.name}
                    {item.badge && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                  </div>
                  <div className="text-xs text-slate-400">
                    {item.role} at <span className="text-purple-300 font-semibold">{item.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
