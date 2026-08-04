import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, ShieldCheck, Cpu, Smartphone, UserCheck, Server, Database, Lock, Clock, ExternalLink, Zap, CheckCircle2, RefreshCw, Play, Pause, Layers, Activity, Sparkles, Gamepad2 } from 'lucide-react';
import { soundFx } from '../../utils/sound';

export const SmartSalonArchitecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visual-tree' | 'algorithm' | 'security'>('visual-tree');
  const [activeStep, setActiveStep] = useState<number>(9);
  const [selectedNode, setSelectedNode] = useState<string>('backend');
  const [isLooping, setIsLooping] = useState<boolean>(true);

  const treeNodes = [
    { id: 'customer', title: 'Customer App', subtitle: 'Mobile & Web Portal', icon: Smartphone, color: 'from-purple-600 to-indigo-600', link: 'https://salon-queue-frontend.onrender.com', desc: 'Login OTP, search nearby salons, book 15-min slots, track live queue position & flag running late.' },
    { id: 'backend', title: 'Spring Boot Backend', subtitle: 'Central Engine & API', icon: Cpu, color: 'from-cyan-500 to-blue-600', link: '#', desc: 'Stateless JWT Auth, Queue Calculation Engine, Wait Time Algorithms, Spring Security RBAC & Notifications.' },
    { id: 'admin', title: 'Salon Admin Panel', subtitle: 'Reception & Owner Board', icon: Server, color: 'from-emerald-500 to-teal-600', link: 'https://salon-queue-admin-panel.onrender.com', desc: 'Real-time queue board, add walk-in customers, call next customer, start/complete services & daily revenue.' },
    { id: 'developer', title: 'Developer Panel', subtitle: 'Platform Telemetry', icon: ShieldCheck, color: 'from-amber-500 to-orange-600', link: 'https://smart-salon-developer-panel.onrender.com', desc: 'Server health metrics, memory/CPU monitors, DB connection pools, SMS failure detection & audit logs.' },
    { id: 'database', title: 'Dual DB Matrix', subtitle: 'PostgreSQL + MongoDB', icon: Database, color: 'from-rose-500 to-purple-600', link: '#', desc: 'PostgreSQL stores transactional business entities; MongoDB streams high-throughput SMS & audit logs.' }
  ];

  const decisionRules = [
    { rule: "Online Booking Priority", desc: "Online appointments are anchored and protected. Walk-ins fill open gaps.", status: "PROTECTED" },
    { rule: "15-Min Overlap Protection", desc: "If a walk-in service would spill into an online booking slot, the online customer goes first.", status: "STRICT" },
    { rule: "15-Min Grace Period", desc: "If an online customer does not show within 15 minutes of slot, booking auto-cancels and queue advances.", status: "AUTO-CANCEL" },
    { rule: "Running Late Shift", desc: "If an online user flags 'Running Late', system shifts their slot forward and fits walk-ins into the open gap.", status: "DYNAMIC" }
  ];

  const securityFeatures = [
    { title: "Stateless JWT Auth (24h)", desc: "No server session storage. Tokens contain User ID, Mobile & RBAC Role.", icon: Lock },
    { title: "Single-Use 5-Min OTP", desc: "Deleted immediately upon verification to prevent replay attacks.", icon: ShieldCheck },
    { title: "Role-Based Access (RBAC)", desc: "Strict separation between Customer, Salon Owner, and System Admin.", icon: UserCheck },
    { title: "SQL & NoSQL Protection", desc: "Spring Data JPA parameterized queries + Spring Data MongoDB typed repositories.", icon: Database },
    { title: "Secret Environment Storage", desc: "JWT_SECRET, Mongo URI, and DB Passwords kept strictly in environment parameters.", icon: Cpu },
    { title: "UUID File Obfuscation", desc: "Uploads renamed with random UUIDs (e.g. 7d2a4f51.jpg) with 10MB limits.", icon: Layers }
  ];

  return (
    <section id="architecture" className="py-24 relative bg-[#09090B] overflow-hidden text-slate-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[650px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 inline-block"
          >
            // ARCHITECTURAL KNOWLEDGE QUEST & RANDOMIZED QUESTIONS
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold font-heading text-white"
          >
            Architecture <span className="text-gradient-aurora">Knowledge Quest</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 text-base sm:text-lg"
          >
            Learn technical insights into Spring Boot 3, STOMP WebSockets, Docker, JWT Security, and Dual Databases through randomized 1-click interactive bites!
          </motion.p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'visual-tree', label: '5-Module System Loop Diagram', icon: RefreshCw },
            { id: 'algorithm', label: 'Queue Algorithm & 15-Min Matrix', icon: Activity },
            { id: 'security', label: 'Security Architecture', icon: ShieldCheck },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFx.playClick();
                setActiveTab(tab.id as any);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-600/30 scale-105'
                  : 'bg-zinc-900/60 text-slate-400 hover:text-slate-200 border border-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 2: 5-Module System Loop Diagram */}
        {activeTab === 'visual-tree' && (
          <div className="space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-white/10 glass-panel relative overflow-hidden space-y-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>CONTINUOUS REAL-TIME SYSTEM LOOP</span>
                </div>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    setIsLooping(!isLooping);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                    isLooping
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-zinc-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {isLooping ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isLooping ? 'Auto-Cycle Active' : 'Paused'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
                {treeNodes.map((node) => {
                  const isSelected = selectedNode === node.id;
                  const Icon = node.icon;
                  return (
                    <motion.div
                      key={node.id}
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedNode(node.id);
                        setIsLooping(false);
                      }}
                      onMouseEnter={() => soundFx.playHover()}
                      whileHover={{ scale: 1.05 }}
                      className={`p-4 rounded-2xl cursor-pointer transition-all flex flex-col items-center text-center space-y-2 border ${
                        isSelected
                          ? 'bg-zinc-900 border-cyan-400 shadow-xl shadow-cyan-500/30 ring-2 ring-cyan-400/50'
                          : 'bg-zinc-950/80 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${node.color} flex items-center justify-center text-white shadow-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold font-heading text-white">{node.title}</h4>
                        <span className="text-[10px] font-mono text-slate-400">{node.subtitle}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedNode}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-2xl bg-zinc-950/90 border border-cyan-500/40 space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${treeNodes.find(n => n.id === selectedNode)?.color} flex items-center justify-center text-white`}>
                        {React.createElement(treeNodes.find(n => n.id === selectedNode)?.icon || Cpu, { className: "w-5 h-5" })}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-heading text-white">{treeNodes.find(n => n.id === selectedNode)?.title}</h3>
                        <span className="text-xs font-mono text-cyan-300">{treeNodes.find(n => n.id === selectedNode)?.subtitle}</span>
                      </div>
                    </div>

                    {treeNodes.find(n => n.id === selectedNode)?.link !== '#' && (
                      <a
                        href={treeNodes.find(n => n.id === selectedNode)?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundFx.playClick()}
                        className="px-3 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all"
                      >
                        Launch Module <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {treeNodes.find(n => n.id === selectedNode)?.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* TAB 3: Queue Algorithm */}
        {activeTab === 'algorithm' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {decisionRules.map((rule, idx) => (
              <motion.div
                key={rule.rule}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 glass-panel space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-400" /> {rule.rule}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    {rule.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {rule.desc}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* TAB 4: Security */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((sec, idx) => (
              <motion.div
                key={sec.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 glass-panel space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <sec.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold font-heading text-white">{sec.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{sec.desc}</p>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
