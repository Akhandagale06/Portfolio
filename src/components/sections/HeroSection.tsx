import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles, Terminal, CheckCircle2, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../common/BrandIcons';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { WireframeSphere } from '../three/WireframeSphere';
import { ParticleField } from '../three/ParticleField';
import { usePortfolio } from '../../context/PortfolioContext';
import { soundFx } from '../../utils/sound';

export const HeroSection: React.FC = () => {
  const { showToast } = usePortfolio();
  const [currentTitleIdx, setCurrentTitleIdx] = useState(0);
  const [activeCodeTab, setActiveCodeTab] = useState<'react' | 'java' | 'spring'>('react');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIdx((prev) => (prev + 1) % PERSONAL_INFO.titles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const codeSnippets = {
    react: `// React 19 & Next.js 15 Enterprise Architecture
export function RealTimeStreamGraph({ pipelineId }: GraphProps) {
  const { streamData } = useEventSource(\`/api/v2/stream/\${pipelineId}\`);
  return <CanvasGraphVisualizer data={streamData} fps={60} />;
}`,
    java: `// Java 21 High-Throughput Reactive Engine
@Service
@RequiredArgsConstructor
public class StreamOrchestratorService {
    private final ReactiveRedisTemplate<String, EventPayload> redisTemplate;

    public Flux<EventPayload> dispatchEventStream(UUID tenantId) {
        return redisTemplate.listenToChannel("tenant:" + tenantId)
                .map(ReactiveSubscription::getMessage);
    }
}`,
    spring: `// Spring Boot 3.3 REST & SSE Event Controller
@RestController
@RequestMapping("/api/v1/architecture")
public class SystemMetricsController {

    @GetMapping(value = "/telemetry", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamLiveMetrics() {
        SseEmitter emitter = new SseEmitter(30_000L);
        MetricsPublisher.subscribe(emitter::send);
        return emitter;
    }
}`
  };

  const handleDownloadCV = () => {
    soundFx.playChime();
    showToast("Opening Resume PDF Document...", "success");
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#09090B]">
      <ParticleField />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/80 border border-purple-500/30 backdrop-blur-md shadow-lg shadow-purple-900/20"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono text-slate-200">
                🟢 Open for Java Backend & Software Roles
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold font-heading tracking-tight text-white leading-none">
                Hi, I'm <br />
                <span className="text-gradient-aurora">
                  {PERSONAL_INFO.name}
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-10 sm:h-12 flex items-center"
            >
              <span className="text-lg sm:text-2xl font-mono text-cyan-400 font-semibold flex items-center">
                <Terminal className="w-5 h-5 mr-2 text-purple-400" />
                <motion.span
                  key={currentTitleIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {PERSONAL_INFO.titles[currentTitleIdx]}
                </motion.span>
                <span className="w-2 h-6 bg-purple-400 ml-2 animate-pulse" />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed"
            >
              {PERSONAL_INFO.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <a
                href="#projects"
                onClick={() => soundFx.playClick()}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-sm flex items-center gap-2 shadow-xl shadow-purple-600/30 hover:scale-105 transition-all group"
              >
                Explore Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDownloadCV}
                className="px-6 py-3.5 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-semibold text-sm flex items-center gap-2 shadow-lg transition-all"
              >
                <FileText className="w-4 h-4 text-emerald-400" /> Resume / CV <Download className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                onClick={() => soundFx.playClick()}
                className="px-6 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-slate-200 hover:text-white border border-white/10 font-semibold text-sm flex items-center gap-2 transition-all"
              >
                Get In Touch
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6 pt-4 border-t border-white/10 text-sm text-slate-400"
            >
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundFx.playHover()}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-purple-600/20 text-slate-300 hover:text-white transition-all"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundFx.playHover()}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-600/20 text-slate-300 hover:text-white transition-all"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundFx.playHover()}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-rose-600/20 text-slate-300 hover:text-white transition-all"
                  title="Instagram Profile"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            <div className="w-full relative">
              <WireframeSphere />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full -mt-10 sm:-mt-16 bg-zinc-900/90 border border-purple-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-xl glass-panel relative z-20"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 ml-2">architecture.core</span>
                </div>

                <div className="flex gap-1">
                  {(['react', 'java', 'spring'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        soundFx.playClick();
                        setActiveCodeTab(lang);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                        activeCodeTab === lang
                          ? 'bg-purple-600/40 text-purple-200 border border-purple-500/50'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      .{lang === 'spring' ? 'spring-boot' : lang}
                    </button>
                  ))}
                </div>
              </div>

              <pre className="text-xs font-mono text-slate-300 overflow-x-auto p-2 bg-black/50 rounded-xl border border-white/5 leading-relaxed">
                <code>{codeSnippets[activeCodeTab]}</code>
              </pre>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
