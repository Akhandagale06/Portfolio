import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, ShieldCheck, Cpu, Smartphone, UserCheck, Server, Database, Lock, Clock, ExternalLink, Zap, CheckCircle2, RefreshCw, Play, Pause, Layers, Activity, Sparkles, Gamepad2, Trophy, Flame, RotateCcw, HelpCircle, Star, Lightbulb, BookOpen, Award } from 'lucide-react';
import { soundFx } from '../../utils/sound';

interface QuizQuestion {
  id: number;
  topic: string;
  badge: string;
  icon: any;
  knowledgeBite: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const SmartSalonArchitecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'knowledge-quest' | 'visual-tree' | 'algorithm' | 'security'>('knowledge-quest');
  const [activeStep, setActiveStep] = useState<number>(9);
  const [selectedNode, setSelectedNode] = useState<string>('backend');
  const [isLooping, setIsLooping] = useState<boolean>(true);

  // EXPANDED 12-QUESTION BANK
  const masterQuestionBank: QuizQuestion[] = [
    {
      id: 1,
      topic: "Real-Time WebSocket Streaming",
      badge: "WebSocket Wizard",
      icon: Network,
      knowledgeBite: "In the Smart Salon Queue System, STOMP WebSockets maintain persistent full-duplex channels so customer queue positions and wait times update live on screen without refreshing!",
      question: "Why does the Smart Salon System use STOMP WebSockets instead of traditional HTTP polling?",
      options: [
        "To enable real-time, low-latency live updates without constant server polling overhead",
        "To store passwords in browser cache",
        "To slow down database requests",
        "To convert SQL queries into HTML files"
      ],
      correctIndex: 0,
      explanation: "STOMP WebSockets provide instant bi-directional streaming, pushing dynamic queue changes directly to customers and salon admins."
    },
    {
      id: 2,
      topic: "Stateless JWT Authentication",
      badge: "Security Defender",
      icon: Lock,
      knowledgeBite: "Stateless JWT (JSON Web Tokens) generated during OTP login are valid for 24 hours. The server verifies signature hashes without storing session state in memory, allowing high scalability.",
      question: "What is the primary benefit of Stateless JWT Authentication in Spring Boot microservices?",
      options: [
        "It forces users to log in every 5 seconds",
        "It eliminates server session storage overhead, making microservices lightweight and scalable",
        "It replaces the database with text files",
        "It disables HTTPS encryption"
      ],
      correctIndex: 1,
      explanation: "Stateless JWT tokens carry verified User ID and RBAC roles in their payload, removing the need for server-side session databases."
    },
    {
      id: 3,
      topic: "15-Minute Queue Protection Rule",
      badge: "Queue Algorithm Architect",
      icon: Clock,
      knowledgeBite: "Online appointments are anchored and protected. If a walk-in service would spill into an online slot, the system automatically prioritizes the online customer to prevent double-booking.",
      question: "How does the Smart Salon Queue Engine handle a walk-in customer when an online slot is approaching?",
      options: [
        "Cancels the online booking immediately",
        "Puts the salon on break",
        "Serves the walk-in only if their service finishes neatly before the online customer's slot",
        "Deletes all customer data"
      ],
      correctIndex: 2,
      explanation: "Walk-in customers are allocated only if estimated service duration fits before the guaranteed online appointment slot."
    },
    {
      id: 4,
      topic: "Dual Database Architecture",
      badge: "Database Master",
      icon: Database,
      knowledgeBite: "The architecture separates transactional business entities (PostgreSQL) from high-throughput log streams (MongoDB) like SMS logs and security audit trails.",
      question: "Why does the system use PostgreSQL for appointments and MongoDB for audit logs?",
      options: [
        "PostgreSQL ensures ACID relational integrity while MongoDB efficiently streams unstructured logs",
        "PostgreSQL cannot store text",
        "MongoDB is used only for styling colors",
        "To make the system run without any database"
      ],
      correctIndex: 0,
      explanation: "Relational data stays consistent in PostgreSQL while append-heavy log streams scale effortlessly in MongoDB."
    },
    {
      id: 5,
      topic: "5-Minute Single-Use OTP",
      badge: "Authentication Guardian",
      icon: ShieldCheck,
      knowledgeBite: "Mobile OTP authentication passwords are generated with a strict 5-minute expiration timer and deleted immediately after verification to prevent replay attacks.",
      question: "Why are OTP passwords deleted immediately after verification?",
      options: [
        "To save hard drive space",
        "To prevent replay attacks where old OTPs are reused by unauthorized attackers",
        "To change the user's mobile number",
        "To hide system code"
      ],
      correctIndex: 1,
      explanation: "Single-use single-verification OTPs guarantee that intercepted passcodes cannot be replayed by malicious users."
    },
    {
      id: 6,
      topic: "Docker Microservices Containerization",
      badge: "Docker Specialist",
      icon: Layers,
      knowledgeBite: "All Spring Boot backend microservices and databases are packaged into isolated Docker containers for instant multi-cloud deployment on Render.",
      question: "What is the primary advantage of containerizing backend microservices with Docker?",
      options: [
        "Ensures consistent execution environments across local development and cloud production servers",
        "Increases RAM consumption by 500%",
        "Replaces Java with Python",
        "Requires manual server restarts every hour"
      ],
      correctIndex: 0,
      explanation: "Docker containers package code and dependencies together, eliminating environment mismatches during cloud deployments."
    },
    {
      id: 7,
      topic: "15-Minute Grace Period Auto-Cancellation",
      badge: "Time Engine Specialist",
      icon: Clock,
      knowledgeBite: "If an online customer does not show up within 15 minutes of their scheduled slot, the system automatically cancels the slot and advances the queue.",
      question: "What happens when an online customer exceeds their 15-minute grace period?",
      options: [
        "The system shuts down for the day",
        "The slot auto-cancels and the next waiting customer moves up in the queue",
        "The salon owner is fined",
        "The customer's phone is blocked"
      ],
      correctIndex: 1,
      explanation: "Auto-cancellation prevents chair idle time, keeping salon operations fast and fair for all waiting customers."
    },
    {
      id: 8,
      topic: "Spring Security RBAC Role Enforcement",
      badge: "RBAC Shield",
      icon: Lock,
      knowledgeBite: "Role-Based Access Control (RBAC) separates Customer, Salon Owner, and System Admin authorizations, preventing unauthorized API calls.",
      question: "Which of the following describes Role-Based Access Control (RBAC)?",
      options: [
        "Allowing any user to delete database tables",
        "Restricting API actions based on verified user roles (e.g. Customer vs Salon Owner vs System Admin)",
        "Sending email newsletters to everyone",
        "Disabling password authentication"
      ],
      correctIndex: 1,
      explanation: "RBAC ensures that normal customers cannot alter salon queues or access developer telemetry logs."
    },
    {
      id: 9,
      topic: "UUID File Obfuscation & Security",
      badge: "Upload Security Guard",
      icon: ShieldCheck,
      knowledgeBite: "Uploaded images are renamed with random 128-bit UUIDs (e.g. 7d2a4f51.jpg) and restricted to 10MB to prevent directory traversal and filename collision attacks.",
      question: "Why does the application rename uploaded files with random UUIDs?",
      options: [
        "To prevent filename collision and stop attackers from guessing uploaded file paths",
        "To compress images into text files",
        "To make file sizes larger",
        "To delete files automatically after 1 second"
      ],
      correctIndex: 0,
      explanation: "Unique UUID filenames eliminate file overwrite conflicts and obscure server directory structures from attackers."
    },
    {
      id: 10,
      topic: "Spring Boot Parameterized Queries",
      badge: "SQL Injection Shield",
      icon: Database,
      knowledgeBite: "Spring Data JPA and Hibernate use parameterized SQL queries by default, treating user inputs strictly as parameters rather than executable SQL commands.",
      question: "How does Spring Data JPA protect against SQL Injection attacks?",
      options: [
        "By treating user inputs strictly as data parameters rather than executable SQL logic",
        "By turning off the database",
        "By converting all numbers into letters",
        "By deleting invalid user accounts"
      ],
      correctIndex: 0,
      explanation: "Parameterized prepared statements ensure that malicious SQL strings like ' OR 1=1 -- are never executed by the SQL parser."
    }
  ];

  // Utility function to shuffle array (Fisher-Yates Shuffle)
  const shuffleQuestions = (questions: QuizQuestion[]) => {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 5); // Pick 5 randomized questions per round
  };

  // Active Randomized 5-Question Set
  const [activeQuizQuestions, setActiveQuizQuestions] = useState<QuizQuestion[]>(() => {
    return shuffleQuestions(masterQuestionBank);
  });

  // KNOWLEDGE QUEST TRIVIA GAME STATE
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [badgesUnlocked, setBadgesUnlocked] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ = activeQuizQuestions[currentQuestionIdx] || activeQuizQuestions[0];

  // Handle selecting an answer
  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correctIndex) {
      soundFx.playSuccess();
      setScore((s) => s + 200);
      setStreak((st) => st + 1);
      if (!badgesUnlocked.includes(currentQ.badge)) {
        setBadgesUnlocked((b) => [...b, currentQ.badge]);
      }
    } else {
      soundFx.playKeyPress();
      setStreak(0);
    }
  };

  // Next question
  const handleNextQuestion = () => {
    soundFx.playClick();
    if (currentQuestionIdx < activeQuizQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  // Restart Quiz WITH BRAND NEW RANDOMIZED QUESTIONS!
  const handleRestartQuiz = () => {
    soundFx.playChime();
    setActiveQuizQuestions(shuffleQuestions(masterQuestionBank));
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setIsCompleted(false);
  };

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
            { id: 'knowledge-quest', label: '🧠 RANDOMIZED KNOWLEDGE QUEST', icon: BookOpen },
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

        {/* TAB 1: ARCHITECTURE KNOWLEDGE QUEST & TRIVIA GAME */}
        {activeTab === 'knowledge-quest' && (
          <div className="p-6 sm:p-10 rounded-3xl bg-zinc-900/90 border border-purple-500/40 glass-panel shadow-2xl space-y-6 relative overflow-hidden max-w-3xl mx-auto">
            
            {/* HUD Telemetry Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950 border border-white/10 text-xs font-mono">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                  <Trophy className="w-4 h-4 text-cyan-400" /> QUESTION {currentQuestionIdx + 1} / {activeQuizQuestions.length}
                </div>
                <div>SCORE: <strong className="text-emerald-300 text-sm">{score} XP</strong></div>
                {streak > 1 && (
                  <div className="flex items-center gap-1 text-amber-300 font-bold animate-pulse">
                    <Flame className="w-4 h-4 text-amber-400" /> STREAK x{streak}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRestartQuiz}
                  className="px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold flex items-center gap-1 transition-all"
                  title="Generate New Randomized Questions"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> New Questions 🎲
                </button>
              </div>
            </div>

            {/* Completion Screen */}
            {isCompleted ? (
              <div className="p-8 rounded-2xl bg-zinc-950 border border-emerald-500/40 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                  <Award className="w-8 h-8 animate-bounce" />
                </div>
                <h3 className="text-3xl font-extrabold font-heading text-white">QUEST COMPLETED!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  You earned <strong className="text-emerald-400">{score} XP Points</strong> and unlocked <strong className="text-cyan-400">{badgesUnlocked.length} Architecture Achievement Badges</strong>!
                </p>

                {/* Unlocked Badges Showcase */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {badgesUnlocked.map((badge, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-purple-600/30 text-purple-200 border border-purple-500/40 text-xs font-mono font-bold">
                      🏆 {badge}
                    </span>
                  ))}
                </div>

                <button
                  onClick={handleRestartQuiz}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold font-mono text-xs shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Load New Random Questions 🎲
                </button>
              </div>
            ) : (
              /* Active Question Card */
              <div className="space-y-6">
                
                {/* Knowledge Bite Card */}
                <div className="p-5 rounded-2xl bg-zinc-950 border border-cyan-500/30 space-y-2 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                      <Lightbulb className="w-4 h-4 text-amber-300 animate-pulse" /> KNOWLEDGE BITE // {currentQ.topic}
                    </div>
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30">
                      🏆 Badge: {currentQ.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                    "{currentQ.knowledgeBite}"
                  </p>
                </div>

                {/* Question Prompt */}
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                    {currentQ.question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {currentQ.options.map((opt, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === currentQ.correctIndex;
                      
                      let btnStyle = 'bg-zinc-950 border-white/10 text-slate-300 hover:border-white/30 hover:bg-white/5';
                      if (isAnswered) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold shadow-lg shadow-emerald-500/20';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 font-bold';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswered}
                          onClick={() => handleSelectOption(idx)}
                          className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Explanation & Next Step */}
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 space-y-3"
                  >
                    <div>
                      <strong className="text-cyan-300">Technical Insight:</strong> {currentQ.explanation}
                    </div>

                    <button
                      onClick={handleNextQuestion}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold font-mono text-xs shadow-lg flex items-center justify-center gap-1.5"
                    >
                      {currentQuestionIdx < activeQuizQuestions.length - 1 ? 'Next Knowledge Bite →' : 'Complete Quest 🏆'}
                    </button>
                  </motion.div>
                )}

              </div>
            )}

            <div className="text-center text-xs font-mono text-slate-400 border-t border-white/10 pt-4">
              🧠 Read the Knowledge Bite & Answer the Question! Click "New Questions 🎲" at any time for fresh questions.
            </div>
          </div>
        )}

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
