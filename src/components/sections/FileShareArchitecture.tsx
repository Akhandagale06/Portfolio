import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Lock, Database, CreditCard, Share2, ShieldCheck, Trophy, Flame, RotateCcw, Lightbulb, CheckCircle2, Award, ExternalLink, Cpu, Layers, RefreshCw, Smartphone, BookOpen, Gamepad2, ShieldAlert, Zap, Play, Heart, Sparkles, Check, X } from 'lucide-react';
import { soundFx } from '../../utils/sound';

interface SecurityAttack {
  id: number;
  name: string;
  type: 'invalid-jwt' | 'fake-payment' | 'unauthorized-download' | 'spam-upload' | 'expired-token';
  description: string;
  requiredWeaponId: string;
  requiredWeaponName: string;
}

interface SecurityDefenseWeapon {
  id: string;
  name: string;
  subtitle: string;
  icon: any;
  color: string;
  borderColor: string;
  glowColor: string;
}

export const FileShareArchitecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hacker-vs-security' | 'workflows' | 'credit-economy' | 'stack'>('hacker-vs-security');

  // HACKER VS SECURITY GAME STATE
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [systemIntegrity, setSystemIntegrity] = useState<number>(100); // HP %
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem('hacker_security_highscore') || '0', 10);
  });
  const [attacksDefendedCount, setAttacksDefendedCount] = useState<number>(0);
  const [currentAttack, setCurrentAttack] = useState<SecurityAttack | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; success: boolean } | null>(null);

  // INCOMING ATTACKS POOL
  const attackPool: SecurityAttack[] = [
    {
      id: 1,
      name: "❌ Invalid JWT Attack",
      type: "invalid-jwt",
      description: "Attacker sent a tampered JWT header in request authorization.",
      requiredWeaponId: "jwt",
      requiredWeaponName: "✔ JWT Verification"
    },
    {
      id: 2,
      name: "❌ Fake Payment Callback",
      type: "fake-payment",
      description: "Attacker forged a fake Razorpay webhook payload trying to gain 5,000 credits.",
      requiredWeaponId: "hmac",
      requiredWeaponName: "✔ HMAC SHA256"
    },
    {
      id: 3,
      name: "❌ Unauthorized Private File Access",
      type: "unauthorized-download",
      description: "Unauthenticated visitor tried downloading a private vault file.",
      requiredWeaponId: "authorization",
      requiredWeaponName: "✔ Authorization Check"
    },
    {
      id: 4,
      name: "❌ Spam File Upload Attack",
      type: "spam-upload",
      description: "User with 0 credits tried spamming 50 file uploads to Supabase.",
      requiredWeaponId: "validation",
      requiredWeaponName: "✔ Credit Validation"
    },
    {
      id: 5,
      name: "❌ Expired Auth Token",
      type: "expired-token",
      description: "Session token expired 3 hours ago; user trying to execute API actions.",
      requiredWeaponId: "clerk",
      requiredWeaponName: "✔ Clerk Authentication"
    }
  ];

  // 5 DEFENSE WEAPONS
  const defenseWeapons: SecurityDefenseWeapon[] = [
    {
      id: 'clerk',
      name: '✔ Clerk',
      subtitle: 'Session & User Auth',
      icon: Lock,
      color: 'bg-purple-600/20 text-purple-300',
      borderColor: 'border-purple-500',
      glowColor: 'rgba(168, 85, 247, 0.4)'
    },
    {
      id: 'hmac',
      name: '✔ HMAC SHA256',
      subtitle: 'Razorpay Signature Crypto',
      icon: ShieldCheck,
      color: 'bg-cyan-600/20 text-cyan-300',
      borderColor: 'border-cyan-500',
      glowColor: 'rgba(6, 182, 212, 0.4)'
    },
    {
      id: 'jwt',
      name: '✔ JWT',
      subtitle: 'Token Signature Verification',
      icon: Cpu,
      color: 'bg-emerald-600/20 text-emerald-300',
      borderColor: 'border-emerald-500',
      glowColor: 'rgba(16, 185, 129, 0.4)'
    },
    {
      id: 'validation',
      name: '✔ Validation',
      subtitle: 'Credit Balance (Credits >= 1)',
      icon: CreditCard,
      color: 'bg-amber-600/20 text-amber-300',
      borderColor: 'border-amber-500',
      glowColor: 'rgba(245, 158, 11, 0.4)'
    },
    {
      id: 'authorization',
      name: '✔ Authorization',
      subtitle: 'isPublic & Permission Rules',
      icon: Share2,
      color: 'bg-rose-600/20 text-rose-300',
      borderColor: 'border-rose-500',
      glowColor: 'rgba(244, 63, 94, 0.4)'
    }
  ];

  const spawnNextAttack = () => {
    const randomAttack = attackPool[Math.floor(Math.random() * attackPool.length)];
    setCurrentAttack({
      ...randomAttack,
      id: Date.now()
    });
    setFeedbackMsg(null);
  };

  const startGame = () => {
    soundFx.playChime();
    setScore(0);
    setSystemIntegrity(100);
    setAttacksDefendedCount(0);
    setGameState('playing');
    spawnNextAttack();
  };

  const handleWeaponClick = (weapon: SecurityDefenseWeapon) => {
    if (gameState !== 'playing' || !currentAttack) return;

    if (weapon.id === currentAttack.requiredWeaponId) {
      // SUCCESS DEFENSE!
      soundFx.playSuccess();
      setScore((s) => s + 200);
      setAttacksDefendedCount((a) => a + 1);
      setFeedbackMsg({
        text: `🛡️ ATTACK BLOCKED! [${weapon.name}] successfully neutralized [${currentAttack.name}]! +200 XP`,
        success: true
      });

      setTimeout(() => {
        spawnNextAttack();
      }, 1000);
    } else {
      // FAILED DEFENSE!
      soundFx.playKeyPress();
      setSystemIntegrity((hp) => {
        const nextHp = hp - 25;
        if (nextHp <= 0) {
          setGameState('gameover');
        }
        return Math.max(0, nextHp);
      });

      setFeedbackMsg({
        text: `💥 BREACH DETECTED! [${weapon.name}] failed. Correct Defense was [${currentAttack.requiredWeaponName}]. (-25% System Integrity)`,
        success: false
      });

      setTimeout(() => {
        if (systemIntegrity - 25 > 0) {
          spawnNextAttack();
        }
      }, 1400);
    }
  };

  // High score
  if (score > highScore) {
    setHighScore(score);
    localStorage.setItem('hacker_security_highscore', String(score));
  }

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
            // HACKER VS SECURITY DEFENDER GAME 🎮
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold font-heading text-white"
          >
            Hacker vs <span className="text-gradient-aurora">Security Defender</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 text-base sm:text-lg"
          >
            You are the security system! Protect the cloud vault by choosing the correct security defense (Clerk, HMAC SHA256, JWT, Validation, Authorization) against incoming hacker attacks.
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
            { id: 'hacker-vs-security', label: '🎮 PLAY HACKER VS SECURITY GAME', icon: Gamepad2 },
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

        {/* TAB 1: HACKER VS SECURITY DEFENDER GAME */}
        {activeTab === 'hacker-vs-security' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-cyan-500/40 glass-panel shadow-2xl space-y-6 relative overflow-hidden max-w-4xl mx-auto">
            
            {/* Top Telemetry HUD */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950 border border-white/10 text-xs font-mono">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> SYSTEM INTEGRITY: <strong className="text-emerald-300 text-sm">{systemIntegrity}% HP</strong>
                </div>
                <div>DEFENDED: <strong className="text-cyan-300 text-sm">🛡️ {attacksDefendedCount} Attacks</strong></div>
                <div>SCORE: <strong className="text-purple-300 text-sm">{score} XP</strong></div>
                <div>HIGH: <strong className="text-amber-300 text-sm">{highScore} XP</strong></div>
              </div>

              {gameState === 'playing' ? (
                <button
                  onClick={() => setGameState('idle')}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-bold font-mono"
                >
                  Pause Game
                </button>
              ) : (
                <button
                  onClick={startGame}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold text-xs font-mono shadow-lg hover:scale-105 transition-all"
                >
                  {gameState === 'gameover' ? 'Play Again 🔄' : 'START SECURITY GAME 🚀'}
                </button>
              )}
            </div>

            {/* Health Bar */}
            <div className="w-full h-2.5 bg-zinc-950 rounded-full overflow-hidden border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400"
                animate={{ width: `${systemIntegrity}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Main Stage */}
            <div className="relative min-h-[340px] w-full bg-zinc-950 rounded-2xl border border-white/10 p-6 flex flex-col justify-between overflow-hidden">
              
              {/* Game Over Screen */}
              {gameState === 'gameover' && (
                <div className="absolute inset-0 bg-black/95 backdrop-blur-md z-40 p-6 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                    <ShieldAlert className="w-8 h-8 animate-bounce" />
                  </div>
                  <h3 className="text-3xl font-extrabold font-heading text-white">SYSTEM BREACHED!</h3>
                  <p className="text-sm font-mono text-slate-300">
                    Attacks Defended: <strong className="text-cyan-300">{attacksDefendedCount}</strong> | Final Score: <strong className="text-emerald-400">{score} XP</strong>
                  </p>
                  <button
                    onClick={startGame}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold text-xs font-mono shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Restart Security Defense
                  </button>
                </div>
              )}

              {/* Start Screen */}
              {gameState === 'idle' && (
                <div className="absolute inset-0 bg-black/85 backdrop-blur-sm z-40 p-6 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">Hacker vs Security Defender</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
                    Protect the cloud vault! Select the correct security defense weapon (Clerk, HMAC SHA256, JWT, Validation, Authorization) to block incoming hacker attacks in real time.
                  </p>
                  <button
                    onClick={startGame}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold text-xs font-mono shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" /> START SECURITY DEFENSE NOW
                  </button>
                </div>
              )}

              {/* Active Incoming Attack Card */}
              {currentAttack && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentAttack.id}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/50 space-y-2 relative overflow-hidden shadow-lg shadow-rose-950/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-rose-400 font-bold font-mono text-xs sm:text-sm">
                        <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" /> INCOMING ATTACK DETECTED
                      </div>
                      <span className="px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-mono border border-rose-500/40 font-bold">
                        DANGER
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold font-heading text-white">
                      {currentAttack.name}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentAttack.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Feedback Message */}
              {feedbackMsg && (
                <div className={`p-3 rounded-xl border text-xs font-mono text-center font-bold ${
                  feedbackMsg.success ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300' : 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                }`}>
                  {feedbackMsg.text}
                </div>
              )}

              {/* 5 Security Defense Weapons Controls */}
              <div className="space-y-3 mt-4">
                <div className="text-xs font-mono text-cyan-400 font-bold">
                  SELECT THE CORRECT SECURITY DEFENSE WEAPON TO BLOCK THE ATTACK:
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {defenseWeapons.map((weapon) => {
                    const Icon = weapon.icon;
                    return (
                      <motion.button
                        key={weapon.id}
                        onClick={() => handleWeaponClick(weapon)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between space-y-2 backdrop-blur-md shadow-md ${weapon.color} ${weapon.borderColor} hover:scale-105`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-white shadow-inner">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold font-heading text-white">
                            {weapon.name}
                          </div>
                          <div className="text-[9px] font-mono text-slate-400 line-clamp-1">
                            {weapon.subtitle}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

            </div>

            <div className="text-center text-xs font-mono text-slate-400">
              🛡️ Learn Enterprise Security: Neutralize invalid JWTs, fake payments, and unauthorized downloads with real defenses!
            </div>
          </div>
        )}

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
