import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code2, Server, Smartphone, Cloud, Brain, Database, Sparkles, CheckCircle2 } from 'lucide-react';
import { SKILLS } from '../../data/portfolioData';
import { Skill } from '../../types/portfolio';
import { soundFx } from '../../utils/sound';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'AI', 'Cloud', 'DevOps', 'Databases', 'Mobile'];

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS
    : SKILLS.filter(s => s.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Frontend': return Code2;
      case 'Backend': return Server;
      case 'AI': return Brain;
      case 'Cloud': return Cloud;
      case 'DevOps': return Cpu;
      case 'Databases': return Database;
      case 'Mobile': return Smartphone;
      default: return Sparkles;
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-[#09090B] overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 inline-block"
          >
            // TECHNICAL PROFICIENCY & SPECTRUM
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold font-heading text-white"
          >
            Capabilities & <span className="text-gradient-purple-cyan">Tech Matrix</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 text-base sm:text-lg"
          >
            Mastery across modern web stacks, distributed systems, vector AI orchestration, and cloud primitives.
          </motion.p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat);
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105'
                    : 'bg-zinc-900/60 text-slate-400 hover:text-slate-200 border border-white/10 hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => {
            const CategoryIcon = getCategoryIcon(skill.category);
            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                onMouseEnter={() => soundFx.playHover()}
                className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 glass-panel glass-panel-hover relative overflow-hidden group space-y-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <CategoryIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-heading text-white">{skill.name}</h3>
                      <span className="text-xs font-mono text-slate-400">{skill.category} • {skill.yearsOfExp} Yrs Exp</span>
                    </div>
                  </div>

                  {/* Circular SVG Dial */}
                  <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="18"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="3"
                        fill="transparent"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="18"
                        stroke="#06B6D4"
                        strokeWidth="3"
                        fill="transparent"
                        strokeDasharray={113}
                        strokeDashoffset={113 - (113 * skill.level) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <span className="absolute text-[10px] font-bold font-mono text-cyan-300">
                      {skill.level}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
