import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { EXPERIENCES } from '../../data/portfolioData';
import { soundFx } from '../../utils/sound';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative bg-[#09090B] overflow-hidden">
      {/* Radial Background Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 inline-block"
          >
            // CAREER TRAJECTORY & IMPACT
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold font-heading text-white"
          >
            Engineering <span className="text-gradient-purple-cyan">Leadership Timeline</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 text-base sm:text-lg"
          >
            Track record of driving architectural transformations, mentoring squads, and scaling core products.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Glowing Connector Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-cyan-400 to-emerald-400 opacity-30 transform -translate-x-1/2" />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Point */}
                  <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-zinc-900 border-2 border-purple-500 shadow-lg shadow-purple-500/50 flex items-center justify-center z-10">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  </div>

                  {/* Card Content */}
                  <div className={`w-full sm:w-[calc(50%-2.5rem)] ml-12 sm:ml-0 ${
                    isEven ? 'sm:mr-auto' : 'sm:ml-auto'
                  }`}>
                    <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-white/10 glass-panel glass-panel-hover space-y-4">
                      {/* Header info */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                        <div>
                          <span className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1.5 mb-1">
                            <Calendar className="w-3.5 h-3.5" /> {exp.period}
                          </span>
                          <h3 className="text-xl font-bold font-heading text-white">{exp.role}</h3>
                          <div className="text-sm font-semibold text-purple-400 flex items-center gap-2 mt-0.5">
                            <Briefcase className="w-4 h-4" /> {exp.company}
                          </div>
                        </div>

                        {exp.featuredMetric && (
                          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-mono font-bold flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5" /> {exp.featuredMetric}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Key Achievements */}
                      <div className="space-y-2 pt-2">
                        <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                          Key Deliverables & Metrics:
                        </div>
                        {exp.achievements.map((item, i) => (
                          <div key={i} className="flex items-start text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mr-2 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-3">
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-zinc-800 text-slate-400 text-[11px] font-mono border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
