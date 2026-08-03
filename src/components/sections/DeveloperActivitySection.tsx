import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, GitCommit, Flame, Award, Cpu, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { SKILLS, PROJECTS, PERSONAL_INFO, DEVELOPER_ACTIVITY_STATS, TERMINAL_CONFIG } from '../../data/portfolioData';
import { usePortfolio } from '../../context/PortfolioContext';
import { soundFx } from '../../utils/sound';

export const DeveloperActivitySection: React.FC = () => {
  const { showToast, setIsEasterEggOpen } = usePortfolio();
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<Array<{ type: 'input' | 'output'; text: string }>>(
    TERMINAL_CONFIG.welcomeText.map(text => ({ type: 'output', text }))
  );

  const terminalConsoleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (terminalConsoleRef.current) {
      terminalConsoleRef.current.scrollTo({
        top: terminalConsoleRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [terminalLogs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    soundFx.playKeyPress();

    const newLogs = [...terminalLogs, { type: 'input' as const, text: `$ ${terminalInput}` }];

    if (cmd === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      return;
    } else if (cmd === 'help') {
      newLogs.push({
        type: 'output',
        text: 'Available Commands:\n- help: Show this menu\n- skills: List technical stack matrix\n- projects: View featured project summary\n- stats: Display live GitHub & LeetCode metrics\n- contact: Copy email address\n- matrix: Launch secret system visualizer\n- clear: Clear terminal screen'
      });
    } else if (cmd === 'skills') {
      const topSkills = SKILLS.slice(0, 8).map(s => `• ${s.name} (${s.level}% proficiency)`).join('\n');
      newLogs.push({ type: 'output', text: `Core Technical Matrix:\n${topSkills}` });
    } else if (cmd === 'projects') {
      const projList = PROJECTS.map(p => `• [${p.category}] ${p.title} — ${p.subtitle}`).join('\n');
      newLogs.push({ type: 'output', text: `Featured Projects Portfolio:\n${projList}` });
    } else if (cmd === 'stats') {
      newLogs.push({
        type: 'output',
        text: TERMINAL_CONFIG.liveStatsText.join('\n')
      });
    } else if (cmd === 'contact') {
      navigator.clipboard.writeText(PERSONAL_INFO.email);
      showToast("Email address copied to clipboard!", "success");
      newLogs.push({ type: 'output', text: `Email copied: ${PERSONAL_INFO.email}` });
    } else if (cmd === 'matrix' || cmd === 'sudo') {
      setIsEasterEggOpen(true);
      newLogs.push({ type: 'output', text: 'Executing privileged Matrix process... 🚀' });
    } else {
      newLogs.push({ type: 'output', text: `Command not recognized: "${cmd}". Type "help" for command reference.` });
    }

    setTerminalLogs(newLogs);
    setTerminalInput('');
  };

  return (
    <section id="terminal" className="py-24 relative bg-[#09090B] overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 inline-block"
          >
            // LIVE DEVELOPER ACTIVITY & CLI
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold font-heading text-white"
          >
            Command Center & <span className="text-gradient-aurora">Live Stats</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 text-base sm:text-lg"
          >
            Interactive CLI shell & real-time telemetry from production repositories and code contribution heatmaps.
          </motion.p>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {DEVELOPER_ACTIVITY_STATS.map((stat, idx) => {
            const IconComponent = stat.icon === 'GitCommit' ? GitCommit : stat.icon === 'Flame' ? Flame : Award;
            const colorClasses = 
              stat.accentColor === 'purple' 
                ? 'bg-purple-600/20 border-purple-500/30 text-purple-400' 
                : stat.accentColor === 'cyan' 
                ? 'bg-cyan-600/20 border-cyan-500/30 text-cyan-400' 
                : 'bg-emerald-600/20 border-emerald-500/30 text-emerald-400';

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => soundFx.playHover()}
                className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 glass-panel glass-panel-hover flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${colorClasses}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-heading text-white">{stat.title}</div>
                  <div className="text-xs font-mono text-slate-400">{stat.subtitle}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive CLI Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-zinc-950 border border-purple-500/30 overflow-hidden shadow-2xl shadow-purple-950/40 glass-panel"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-3.5 bg-zinc-900 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-slate-300 ml-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" /> {TERMINAL_CONFIG.userHost}
              </span>
            </div>

            <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
              Type <kbd className="px-1 py-0.5 rounded bg-zinc-800 border border-white/10 text-slate-300">help</kbd> for commands
            </div>
          </div>

          {/* Terminal Console Output */}
          <div ref={terminalConsoleRef} className="p-6 font-mono text-xs sm:text-sm h-72 overflow-y-auto space-y-3 bg-black/60">
            {terminalLogs.map((log, index) => (
              <div
                key={index}
                className={log.type === 'input' ? 'text-cyan-300 font-semibold' : 'text-slate-300 whitespace-pre-wrap leading-relaxed'}
              >
                {log.text}
              </div>
            ))}
          </div>

          {/* Command Input Form */}
          <form onSubmit={handleCommand} className="flex items-center px-6 py-3 bg-zinc-900/80 border-t border-white/10">
            <span className="text-purple-400 font-mono font-bold mr-2 text-sm">$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Type command here... (e.g. skills, projects, contact, matrix, clear)"
              className="w-full bg-transparent font-mono text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            />
            <button type="submit" className="p-1.5 rounded-lg text-purple-400 hover:text-white transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};
