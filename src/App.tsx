import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/sections/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SmartSalonArchitecture } from './components/sections/SmartSalonArchitecture';
import { FileShareArchitecture } from './components/sections/FileShareArchitecture';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { DeveloperActivitySection } from './components/sections/DeveloperActivitySection';
import { ServicesSection } from './components/sections/ServicesSection';
import { ContactSection } from './components/sections/ContactSection';
import { FooterSection } from './components/sections/FooterSection';

import { CustomCursor } from './components/common/CustomCursor';
import { CommandPalette } from './components/common/CommandPalette';
import { ProjectModal } from './components/common/ProjectModal';
import { ArticleModal } from './components/common/ArticleModal';
import { ResumeModal } from './components/common/ResumeModal';
import { ToastNotification } from './components/common/ToastNotification';
import { EasterEggModal } from './components/common/EasterEggModal';

const PortfolioContent: React.FC = () => {
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#09090B] text-slate-100 relative selection:bg-purple-600/30 selection:text-purple-300 w-full overflow-x-hidden">
      {/* Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette />

      {/* Modals & Overlays */}
      <ProjectModal />
      <ArticleModal />
      <ResumeModal />
      <EasterEggModal />
      <ToastNotification />

      {/* Top Floating Glass Navigation */}
      <Navbar />

      {/* Main Portfolio Sections */}
      <main className="w-full relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <SmartSalonArchitecture />
        <FileShareArchitecture />
        <ExperienceSection />
        <DeveloperActivitySection />
        <ServicesSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
};

export default App;
