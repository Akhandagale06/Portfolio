import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, MapPin, Phone, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { soundFx } from '../../utils/sound';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative bg-[#09090B] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 inline-block"
          >
            // BIOGRAPHY & ACADEMIC HIGHLIGHTS
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold font-heading text-white"
          >
            About Me
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 text-base sm:text-lg"
          >
            Java Backend Developer pursuing B.Tech in CSBS at KIT College of Engineering, Kolhapur.
          </motion.p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 p-8 rounded-3xl bg-zinc-900/60 border border-white/10 glass-panel space-y-6"
          >
            <div className="space-y-3">
              <h3 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" /> Engineering Objective
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {PERSONAL_INFO.bio}
              </p>
            </div>

            <div className="space-y-3 border-t border-white/10 pt-6">
              <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                Direct Contact & Credentials
              </h4>
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{PERSONAL_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{PERSONAL_INFO.email}</span>
                </div>
              </div>
            </div>

            {/* Certifications Box */}
            <div className="space-y-3 border-t border-white/10 pt-6">
              <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" /> Certifications & Training
              </h4>
              <div className="space-y-2">
                {PERSONAL_INFO.certifications.map((cert, i) => (
                  <div key={i} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Education Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-4"
          >
            <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2 mb-4">
              <GraduationCap className="w-6 h-6 text-cyan-400" /> Academic Qualifications
            </h3>

            {PERSONAL_INFO.education.map((edu, idx) => (
              <div
                key={idx}
                onMouseEnter={() => soundFx.playHover()}
                className={`p-6 rounded-3xl border transition-all ${
                  edu.highlight
                    ? 'bg-zinc-900/80 border-purple-500/40 shadow-xl shadow-purple-950/30 glass-panel'
                    : 'bg-zinc-900/40 border-white/10 glass-panel'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-2 inline-block">
                      {edu.period}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold font-heading text-white">{edu.degree}</h4>
                    <p className="text-xs text-slate-400 mt-1">{edu.institution}</p>
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                    {edu.score}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
