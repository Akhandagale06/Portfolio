import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Video, Sparkles, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import { PROJECTS } from '../../data/portfolioData';
import { usePortfolio } from '../../context/PortfolioContext';
import { soundFx } from '../../utils/sound';

export const ProjectsSection: React.FC = () => {
  const { setSelectedProject } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Full Stack', 'Cloud & Web3', 'AI & ML'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative bg-[#09090B] overflow-hidden">
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 inline-block"
          >
            // CURATED ENGINEERING PORTFOLIO
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold font-heading text-white"
          >
            Featured <span className="text-gradient-aurora">Architectures & Apps</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 text-base sm:text-lg"
          >
            Spring Boot microservices, high-performance REST APIs, and full-stack React platforms.
          </motion.p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playClick();
                setActiveCategory(cat);
              }}
              onMouseEnter={() => soundFx.playHover()}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-600/30 scale-105'
                  : 'bg-zinc-900/60 text-slate-400 hover:text-slate-200 border border-white/10 hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => soundFx.playHover()}
              className="group rounded-3xl bg-zinc-900/60 border border-white/10 overflow-hidden glass-panel glass-panel-hover flex flex-col justify-between relative"
            >
              <div
                className="relative h-52 w-full overflow-hidden cursor-pointer"
                onClick={() => {
                  soundFx.playClick();
                  setSelectedProject(project);
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-purple-950/80 text-purple-300 border border-purple-500/40 backdrop-blur-md">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> FEATURED
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedProject(project);
                    }}
                    className="text-xl font-bold font-heading text-white group-hover:text-cyan-400 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </h3>
                  <p className="text-xs font-mono text-purple-400 mt-0.5">{project.subtitle}</p>
                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {project.metrics && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                    {project.metrics.slice(0, 2).map((metric, i) => (
                      <span key={i} className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        ⚡ {metric}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-zinc-800/80 text-slate-300 text-[11px] font-mono border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-1 rounded-lg bg-zinc-800 text-slate-400 text-[11px] font-mono">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedProject(project);
                    }}
                    className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center"
                  >
                    Deep Inspection →
                  </button>

                  <div className="flex items-center gap-2">
                    {project.videoUrl && (
                      <a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          soundFx.playClick();
                        }}
                        className="text-rose-400 hover:text-rose-300 transition-colors p-1"
                        title="Watch Demo Video"
                      >
                        <Video className="w-4 h-4" />
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playClick();
                      }}
                      className="text-slate-400 hover:text-white transition-colors p-1"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playClick();
                      }}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors p-1"
                      title="Live Product Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
