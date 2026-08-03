import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Article } from '../types/portfolio';
import { soundFx } from '../utils/sound';

interface ToastInfo {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'accent';
}

interface PortfolioContextType {
  theme: 'dark';
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isResumeModalOpen: boolean;
  setIsResumeModalOpen: (open: boolean) => void;
  selectedProject: Project | null;
  setSelectedProject: (proj: Project | null) => void;
  selectedArticle: Article | null;
  setSelectedArticle: (art: Article | null) => void;
  toast: ToastInfo | null;
  showToast: (message: string, type?: 'success' | 'info' | 'accent') => void;
  isEasterEggOpen: boolean;
  setIsEasterEggOpen: (open: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme] = useState<'dark'>('dark');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(soundFx.enabled);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [toast, setToast] = useState<ToastInfo | null>(null);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, []);

  const toggleTheme = () => {
    soundFx.playClick();
  };

  const toggleSound = () => {
    const newState = soundFx.toggleSound();
    setSoundEnabled(newState);
  };

  const showToast = (message: string, type: 'success' | 'info' | 'accent' = 'success') => {
    if (type === 'success') soundFx.playSuccess();
    else soundFx.playClick();
    
    setToast({ id: String(Date.now()), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundFx.playCommandPalette();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        theme,
        toggleTheme,
        soundEnabled,
        toggleSound,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isResumeModalOpen,
        setIsResumeModalOpen,
        selectedProject,
        setSelectedProject,
        selectedArticle,
        setSelectedArticle,
        toast,
        showToast,
        isEasterEggOpen,
        setIsEasterEggOpen,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};
