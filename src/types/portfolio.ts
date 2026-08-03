export type SkillCategory = 'Frontend' | 'Backend' | 'Mobile' | 'Cloud' | 'AI' | 'DevOps' | 'Databases' | 'Concepts' | 'Soft Skills';

export interface Skill {
  name: string;
  category: SkillCategory;
  icon: string;
  level: number; // 0-100
  yearsOfExp?: number;
  highlight?: boolean;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription?: string;
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'Cloud & Web3' | 'AI & ML';
  featured?: boolean;
  image: string;
  tags: string[];
  metrics?: string[];
  githubUrl: string;
  liveUrl: string;
  videoUrl?: string;
  architectureHighlights?: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
  featuredMetric?: string;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  deliverables: string[];
  highlightTech: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  badge?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  views: string;
}

export interface StatItem {
  label: string;
  value: string;
  numericValue: number;
  suffix?: string;
  description: string;
}

export interface DeveloperActivityStat {
  id: string;
  icon: 'GitCommit' | 'Flame' | 'Award';
  title: string;
  subtitle: string;
  accentColor: 'purple' | 'cyan' | 'emerald';
}

export interface TerminalConfig {
  userHost: string;
  version: string;
  welcomeText: string[];
  liveStatsText: string[];
}

