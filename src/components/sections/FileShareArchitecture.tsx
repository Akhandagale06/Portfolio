import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Lock, Database, CreditCard, Share2, ShieldCheck, ExternalLink, Cpu, Layers, RefreshCw, Smartphone, BookOpen, Zap, Heart, Sparkles, Check, X } from 'lucide-react';
import { soundFx } from '../../utils/sound';

export const FileShareArchitecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workflows' | 'credit-economy' | 'stack'>('workflows');

  return (
    <section id="file-share-architecture" className="py-24 relative bg-[#09090B] overflow-hidden text-slate-100 border-t border-white/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[650px] bg-cyan-600/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 inline-block"
          >
            // SECURE CLOUD VAULT ARCHITECTURE
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold font-heading text-white"
          >
            File Sharing <span className="text-gradient-aurora">Cloud Architecture</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 text-base sm:text-lg"
          >
            Explore technical workflows, credit monetization engine, Supabase cloud storage, and Spring Boot REST security stack.
          </motion.p>
        </div>

        {/* Live Project Launcher */}
        <div className="max-w-xl mx-auto">
          <a
            href="https://frontend-file-share.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="p-5 rounded-2xl bg-zinc-900/80 border border-cyan-500/40 glass-panel glass-panel-hover flex items-center justify-between group shadow-xl"
          >
            <div className="flex items-center gap-3">
              <Cloud className="w-6 h-6 text-cyan-400" />
              <div className="text-left">
                <div className="text-base font-bold text-white">Full Stack File Sharing Platform</div>
                <div className="text-xs font-mono text-cyan-300">frontend-file-share.onrender.com</div>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-cyan-300" />
          </a>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'workflows', label: '4 System Workflows', icon: Layers },
            { id: 'credit-economy', label: 'Credit Economy & Razorpay', icon: CreditCard },
            { id: 'stack', label: 'Tech Stack & MongoDB Docs', icon: Database },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundFx.playClick();
                setActiveTab(tab.id as any);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg shadow-cyan-600/30 scale-105'
                  : 'bg-zinc-900/60 text-slate-400 hover:text-slate-200 border border-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>



        {/* TAB 2: WORKFLOWS */}
        {activeTab === 'workflows' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-purple-500/30 glass-panel space-y-3">
              <div className="flex items-center gap-3">
                <Lock className="w-6 h-6 text-purple-400" />
                <h3 className="text-base font-bold font-heading text-white">1. Auth & Clerk Webhook Sync</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clerk handles user login widgets. When a profile is created, Clerk dispatches a webhook to Spring Boot, which initializes a MongoDB ProfileDocument with 5 free credits and plan = FREE. Every request carries a Clerk JWT validated against Clerk public keys.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-cyan-500/30 glass-panel space-y-3">
              <div className="flex items-center gap-3">
                <Cloud className="w-6 h-6 text-cyan-400" />
                <h3 className="text-base font-bold font-heading text-white">2. File Upload & Credit Tickets</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Each file upload costs 1 credit ticket. Backend verifies credits ≥ number of files. If valid, streams binaries to Supabase Object Storage, saves FileMetaDataDoc in MongoDB, and deducts 1 credit per file.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-emerald-500/30 glass-panel space-y-3">
              <div className="flex items-center gap-3">
                <Share2 className="w-6 h-6 text-emerald-400" />
                <h3 className="text-base font-bold font-heading text-white">3. Public/Private Link Vault</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Files are private by default. Toggling isPublic = true opens the file for public visitors at /file/:id without requiring a Clerk token login.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-amber-500/30 glass-panel space-y-3">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-amber-400" />
                <h3 className="text-base font-bold font-heading text-white">4. Razorpay HMAC SHA256 Payment</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                User selects Premium (500 credits) or Ultimate (5,000 credits). Backend creates a Razorpay order. Upon checkout, PaymentService verifies HMAC SHA256 cryptographic signatures to safely credit user balance.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: CREDIT ECONOMY */}
        {activeTab === 'credit-economy' && (
          <div className="p-8 rounded-3xl bg-zinc-900/60 border border-white/10 glass-panel space-y-6 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold font-heading text-white">Credit Economy & Subscription Monetization</h3>
              <p className="text-xs font-mono text-cyan-300">Enterprise grade HMAC SHA256 payment validation</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 space-y-2 text-center">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-slate-300 text-[10px] font-mono">FREE TIER</span>
                <div className="text-2xl font-extrabold text-white">5 Credits</div>
                <p className="text-xs text-slate-400">Initialized automatically on signup via Clerk webhook</p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-purple-500/40 space-y-2 text-center shadow-lg shadow-purple-950/40">
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30">PREMIUM PLAN</span>
                <div className="text-2xl font-extrabold text-purple-300">500 Credits</div>
                <p className="text-xs text-slate-400">Razorpay HMAC SHA256 verified transaction</p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-cyan-500/40 space-y-2 text-center shadow-lg shadow-cyan-950/40">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono border border-cyan-500/30">ULTIMATE PLAN</span>
                <div className="text-2xl font-extrabold text-cyan-300">5,000 Credits</div>
                <p className="text-xs text-slate-400">Unlimited high-capacity cloud file sharing</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TECH STACK & MONGODB DOCS */}
        {activeTab === 'stack' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 glass-panel space-y-3">
              <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan-400" /> MongoDB Document Schemas
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                <li><strong>ProfileDocument:</strong> User Clerk ID, email, profile image, credit balance, current plan.</li>
                <li><strong>FileMetaDataDoc:</strong> Supabase URL, original file name, size, owner ID, isPublic flag.</li>
                <li><strong>UserCredits:</strong> Credit balance tracking & transaction logs.</li>
                <li><strong>PaymentTransaction:</strong> Razorpay order ID, HMAC signature, status log.</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 glass-panel space-y-3">
              <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-400" /> Full Stack Tech Architecture
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                <li><strong>Frontend:</strong> React 18 + Vite 8, React Router v7, Tailwind CSS v4, Clerk React.</li>
                <li><strong>Backend:</strong> Java 21, Spring Boot 3, Spring Security JWT, HMAC SHA256 crypto.</li>
                <li><strong>Services:</strong> Supabase S3 Object Storage, Razorpay Payment Gateway.</li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
