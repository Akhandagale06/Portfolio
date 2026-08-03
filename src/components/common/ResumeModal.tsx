import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { soundFx } from '../../utils/sound';

export const ResumeModal: React.FC = () => {
  const { isResumeModalOpen, setIsResumeModalOpen } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isResumeModalOpen) {
        soundFx.playClick();
        setIsResumeModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isResumeModalOpen, setIsResumeModalOpen]);

  if (!isResumeModalOpen) return null;

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundFx.playClick();
            setIsResumeModalOpen(false);
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[92vh] bg-zinc-900 border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden glass-panel my-auto z-10 flex flex-col"
        >
          {/* Action Toolbar */}
          <div className="px-6 py-3.5 bg-zinc-950 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
                Official Resume Sheet // Aditya Sudam Khandagale
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
              >
                <Printer className="w-3.5 h-3.5" /> Print / Save as PDF
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setIsResumeModalOpen(false);
                }}
                className="p-1.5 rounded-full bg-white/10 text-slate-300 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable White A4 Paper Sheet Container */}
          <div className="p-4 sm:p-8 overflow-y-auto flex-1 bg-zinc-800 flex justify-center">
            
            {/* White Resume Page */}
            <div className="w-full max-w-[800px] bg-white text-black p-8 sm:p-12 shadow-2xl font-serif text-[13px] leading-snug space-y-4 rounded-sm border border-slate-300">
              
              {/* Name & Contact Header */}
              <div className="text-center space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-wider text-black uppercase font-serif">
                  ADITYA SUDAM KHANDAGALE
                </h1>
                
                <div className="text-xs text-slate-800 font-serif flex flex-wrap items-center justify-center gap-2">
                  <span>+91 7397938841</span>
                  <span>—</span>
                  <a href="mailto:adityak2942@gmail.com" className="text-blue-900 underline">adityak2942@gmail.com</a>
                  <span>—</span>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-900 underline">LinkedIn</a>
                  <span>—</span>
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-blue-900 underline">GitHub</a>
                </div>

                <div className="text-xs text-slate-700 font-serif">
                  Sangola, Maharashtra - 413307, India
                </div>
              </div>

              <hr className="border-t border-black opacity-80 my-2" />

              {/* Objective */}
              <div className="space-y-1">
                <h2 className="text-sm font-bold font-serif uppercase tracking-wider text-black border-b border-black pb-0.5">
                  Objective
                </h2>
                <p className="text-justify text-slate-900 leading-normal">
                  Aspiring Backend Developer pursuing B.Tech in Computer Science and Business Systems at KIT College of Engineering. Skilled in Java, Spring Boot, REST API development with hands-on experience building secure, scalable backend systems and real-time full-stack applications using PostgreSQL, MongoDB, Maven, Docker.
                </p>
              </div>

              {/* Education */}
              <div className="space-y-1.5">
                <h2 className="text-sm font-bold font-serif uppercase tracking-wider text-black border-b border-black pb-0.5">
                  Education
                </h2>

                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-black">KIT's College of Engineering, Kolhapur (Empowered Autonomous)</div>
                      <div className="italic text-slate-800">B.Tech in Computer Science and Business Systems</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-black">Expected Jul 2027</div>
                      <div className="font-bold text-black">CGPA: 8.6/10</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-black">Higher Secondary Certificate (HSC)</div>
                      <div className="italic text-slate-800">Maharashtra State Board</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-black">Feb 2023</div>
                      <div className="font-bold text-black">80.33%</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-black">Secondary School Certificate (SSC)</div>
                      <div className="italic text-slate-800">Maharashtra State Board</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-black">Mar 2021</div>
                      <div className="font-bold text-black">90.66%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-1">
                <h2 className="text-sm font-bold font-serif uppercase tracking-wider text-black border-b border-black pb-0.5">
                  Skills
                </h2>
                <div className="space-y-1 text-slate-900">
                  <div><strong>Languages:</strong> Java, Spring Boot</div>
                  <div><strong>Backend:</strong> Java, Spring Boot, Spring Security, REST APIs</div>
                  <div><strong>Databases:</strong> PostgreSQL, MongoDB</div>
                  <div><strong>Tools:</strong> Git, GitHub</div>
                  <div><strong>Concepts:</strong> Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), DBMS, REST Architecture</div>
                  <div><strong>Soft Skills:</strong> Problem Solving, Leadership, Teamwork, Adaptability, Time Management</div>
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-2.5">
                <h2 className="text-sm font-bold font-serif uppercase tracking-wider text-black border-b border-black pb-0.5">
                  Projects
                </h2>

                {/* Project 1 */}
                <div className="space-y-1">
                  <div className="font-bold text-black text-sm">
                    Smart Salon Queue & Multi-Chair Management System
                  </div>
                  <div className="italic text-slate-800 text-xs">
                    Java 21 — Spring Boot — React — PostgreSQL — MongoDB — Docker
                  </div>
                  <a href="https://salon-queue-frontend.onrender.com" target="_blank" rel="noopener noreferrer" className="text-blue-900 underline text-xs font-bold block">
                    Live Demo
                  </a>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-900 pl-1">
                    <li>Developed a real-time multi-tenant salon management platform integrating online appointments and walk-in queues through an intelligent scheduling engine.</li>
                    <li>Designed a Timeline Scheduler Engine to optimize wait times, prevent double-booking, and efficiently allocate chairs and stylists.</li>
                    <li>Built Customer, Salon Admin, and Super Admin portals with live updates using STOMP WebSockets and secure JWT authentication.</li>
                    <li>Integrated Telegram/SMS notifications, multilingual support (English, Hindi, Marathi), PostgreSQL, MongoDB, and Docker deployment.</li>
                  </ul>
                </div>

                {/* Project 2 */}
                <div className="space-y-1">
                  <div className="font-bold text-black text-sm">
                    Full Stack File Sharing Application
                  </div>
                  <div className="italic text-slate-800 text-xs">
                    Spring Boot — React — MongoDB — Supabase
                  </div>
                  <a href="https://frontend-file-share.onrender.com" target="_blank" rel="noopener noreferrer" className="text-blue-900 underline text-xs font-bold block">
                    Live Demo
                  </a>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-900 pl-1">
                    <li>Built a secure file-sharing platform with user authentication and file upload/download functionality.</li>
                    <li>Integrated Supabase Storage for cloud file management and Razorpay payment gateway.</li>
                    <li>Developed RESTful APIs using Spring Boot and a responsive React frontend for seamless user experience.</li>
                  </ul>
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-1">
                <h2 className="text-sm font-bold font-serif uppercase tracking-wider text-black border-b border-black pb-0.5">
                  Certifications
                </h2>
                <ul className="list-disc list-inside text-slate-900">
                  <li>Java Full Stack Development Virtual Internship</li>
                </ul>
              </div>

            </div>

          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3 bg-zinc-950 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 shrink-0">
            <span>Press Esc or click outside to dismiss</span>
            <button
              onClick={handlePrint}
              className="text-purple-400 hover:text-purple-300 transition-colors font-mono font-bold"
            >
              Print / Save PDF Document 🖨️
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
