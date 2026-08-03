import React from 'react';
import { motion } from 'framer-motion';
import { Layers, BrainCircuit, Sparkles, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { SERVICES } from '../../data/portfolioData';
import { soundFx } from '../../utils/sound';

export const ServicesSection: React.FC = () => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return Layers;
      case 'BrainCircuit': return BrainCircuit;
      case 'Sparkles': return Sparkles;
      case 'Zap': return Zap;
      default: return Sparkles;
    }
  };

  return (
    <section id="services" className="py-24 relative bg-[#09090B] overflow-hidden">
      {/* Radial Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 inline-block"
          >
            // ADVISORY & ARCHITECTURE SERVICES
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold font-heading text-white"
          >
            Capabilities & <span className="text-gradient-purple-cyan">Specialized Services</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 text-base sm:text-lg"
          >
            Tailored engineering engagement models for high-growth tech companies and enterprise innovation teams.
          </motion.p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, idx) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => soundFx.playHover()}
                className="p-8 rounded-3xl bg-zinc-900/60 border border-white/10 glass-panel glass-panel-hover flex flex-col justify-between space-y-6 group relative overflow-hidden"
              >
                {/* Glow Border Overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-600/25 transition-all pointer-events-none" />

                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-cyan-400" />
                  </div>

                  <h3 className="text-2xl font-bold font-heading text-white">{service.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{service.description}</p>

                  {/* Deliverables */}
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider">Key Deliverables:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.deliverables.map((item, i) => (
                        <div key={i} className="flex items-center text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tech Stack Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {service.highlightTech.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-lg bg-zinc-800 text-slate-400 text-[11px] font-mono border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    onClick={() => soundFx.playClick()}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group-hover:translate-x-1"
                  >
                    Inquire <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
