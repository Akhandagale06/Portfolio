import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Copy, MapPin, Clock } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../common/BrandIcons';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { usePortfolio } from '../../context/PortfolioContext';
import { soundFx } from '../../utils/sound';

export const ContactSection: React.FC = () => {
  const { showToast } = usePortfolio();
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Java Backend Role', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setCurrentTime(timeStr + ' IST');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Please complete all required fields", "info");
      return;
    }

    soundFx.playChime();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      showToast("Message sent successfully! Aditya will get back to you soon.", "success");
      setFormData({ name: '', email: '', subject: 'Java Backend Role', message: '' });
    }, 1200);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    showToast("Email address copied to clipboard!", "success");
  };

  return (
    <section id="contact" className="py-24 relative bg-[#09090B] overflow-hidden">
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[700px] h-[500px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1 rounded-full text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 inline-block"
          >
            // INITIATE COLLABORATION
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold font-heading text-white"
          >
            Let's Build Something <span className="text-gradient-aurora">Scalable</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 text-base sm:text-lg"
          >
            Open for Java Backend, Spring Boot Microservices, and Full Stack Software Engineer roles.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-3xl bg-zinc-900/60 border border-white/10 glass-panel space-y-6">
              <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-400" /> Direct Contact
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-zinc-800/50 border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-slate-400">Primary Email</div>
                    <div className="text-sm font-semibold font-mono text-cyan-300 mt-0.5">{PERSONAL_INFO.email}</div>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="p-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 transition-colors"
                    title="Copy Email Address"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-800/50 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" /> Kolhapur, MH, India
                    </span>
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {currentTime}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    KIT's College of Engineering (CSBS • CGPA 8.6/10)
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-xs font-mono text-slate-400 mb-3">Connect across networks:</div>
                <div className="flex items-center gap-3">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="p-3 rounded-2xl bg-white/5 hover:bg-purple-600/20 text-slate-300 hover:text-white border border-white/5 transition-all"
                    title="GitHub Profile"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="p-3 rounded-2xl bg-white/5 hover:bg-cyan-600/20 text-slate-300 hover:text-white border border-white/5 transition-all"
                    title="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={PERSONAL_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="p-3 rounded-2xl bg-white/5 hover:bg-rose-600/20 text-slate-300 hover:text-white border border-white/5 transition-all"
                    title="Instagram Profile"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-3xl bg-zinc-900/60 border border-white/10 glass-panel space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Recruiter / Collaborator"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300">Inquiry Type</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/10 text-slate-100 focus:outline-none focus:border-purple-500 text-sm transition-all"
                >
                  <option value="Java Backend Role">Java Backend Software Role</option>
                  <option value="Spring Boot Microservices">Spring Boot Microservices Project</option>
                  <option value="Full Stack Web Application">Full Stack Web Application</option>
                  <option value="General Inquiry">General Inquiry / Opportunity</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300">Project / Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about opportunities or technical projects..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950/80 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-cyan-500 to-emerald-400 text-white font-bold font-heading text-base shadow-xl shadow-purple-600/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Transmitting Message...
                  </span>
                ) : (
                  <>
                    Send Direct Message <Send className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
