import { Project, Skill, Experience, Service, Testimonial, Article, StatItem, DeveloperActivityStat, TerminalConfig } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "Aditya Khandagale",
  title: "Java Backend Developer & Full Stack Specialist",
  location: "Sangola, Maharashtra - 413307, India",
  phone: "+91 7397938841",
  email: "adityak2942@gmail.com",
  avatarUrl: "https://github.com/Akhandagale06.png", // profile img
  github: "https://github.com/Akhandagale06",
  linkedin: "https://www.linkedin.com/in/khandagale-aditya",
  instagram: "https://instagram.com/aditya_06_ak",
  resumeUrl: "/Aditya_Khandagale_Resume.html",
  bio: "Aspiring Backend Developer pursuing B.Tech in Computer Science and Business Systems at KIT College of Engineering (CGPA 8.6/10). Skilled in Java, Spring Boot, and REST API development with hands-on experience building secure, scalable backend systems and real-time full-stack applications using PostgreSQL, MongoDB, Maven, and Docker.",
  motto: "Code. Learn. Build. Repeat.",
  education: [
    {
      degree: "B.Tech in Computer Science and Business Systems",
      institution: "KIT's College of Engineering, Kolhapur (Empowered Autonomous)",
      period: "Expected Jul 2027",
      score: "CGPA: 8.6 / 10",
      highlight: true
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Maharashtra State Board",
      period: "Feb 2023",
      score: "80.33%"
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Maharashtra State Board",
      period: "Mar 2021",
      score: "90.66%"
    }
  ],
  certifications: [
    "Java Full Stack Development Virtual Internship"
  ],
  titles: [
    "Java Backend Developer",
    "Spring Boot & Microservices Developer",
    "STOMP WebSockets & REST API Specialist",
    "PostgreSQL & MongoDB Database Engineer"
  ],
  stats: [
    { label: "Engineering CGPA", value: "8.6", numericValue: 8.6, suffix: "/10", description: "CSBS @ KIT's College of Eng." },
    { label: "HSC Board Score", value: "80.33%", numericValue: 80.33, suffix: "%", description: "Maharashtra State Board" },
    { label: "SSC Board Score", value: "90.66%", numericValue: 90.66, suffix: "%", description: "Maharashtra State Board" },
    { label: "Core Tech Stack", value: "10+", numericValue: 10, suffix: "+", description: "Java 21, Spring Boot, React, Docker" }
  ] as StatItem[]
};

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Smart Salon Queue & Multi-Chair Management System",
    subtitle: "Real-time Multi-Tenant Salon Management Platform",
    description: "Multi-tenant salon queue platform featuring STOMP WebSockets live updates, Timeline Scheduler Engine, Telegram/SMS alerts, and Docker containerization.",
    fullDescription: "Developed a real-time multi-tenant salon management platform integrating online appointments and walk-in queues through an intelligent scheduling engine. Designed a Timeline Scheduler Engine to optimize wait times, prevent double-booking, and efficiently allocate chairs and stylists. Built Customer, Salon Admin, and Super Admin portals with live updates using STOMP WebSockets and secure JWT authentication. Integrated Telegram/SMS notifications, multilingual support (English, Hindi, Marathi), PostgreSQL, MongoDB, and Docker deployment.",
    category: "Full Stack",
    featured: true,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80",
    tags: ["Java 21", "Spring Boot", "React", "PostgreSQL", "MongoDB", "Docker", "STOMP WebSockets", "JWT", "Telegram API"],
    metrics: ["Timeline Engine", "STOMP WebSockets", "Multilingual (EN/HI/MR)"],
    githubUrl: "https://github.com/Akhandagale06/Smart-Salon-Queue-management-system-Frontend-",
    liveUrl: "https://salon-queue-frontend.onrender.com",
    videoUrl: "https://github.com/Akhandagale06/Smart-Salon-Queue-management-system-Frontend-/releases/download/v1.0.0/Smart.salon.Demo.mp4",
    architectureHighlights: [
      "Timeline Scheduler Engine optimizing wait times and preventing double-bookings across chairs and stylists",
      "Customer, Salon Admin, and Super Admin portals with real-time updates via STOMP WebSockets and JWT auth",
      "Integrated Telegram/SMS alerts and multilingual localization (English, Hindi, Marathi)",
      "Dual database architecture pairing PostgreSQL relational core with MongoDB audit log streams"
    ]
  },
  {
    id: "project-2",
    title: "Full Stack File Sharing Application",
    subtitle: "Secure File Vault & Supabase Cloud Storage",
    description: "Secure file sharing platform built with Spring Boot REST APIs, React frontend, Supabase Storage, and Razorpay payment gateway.",
    fullDescription: "Built a secure file-sharing platform with user authentication and file upload/download functionality. Integrated Supabase Storage for cloud file management and Razorpay payment gateway. Developed RESTful APIs using Spring Boot and a responsive React frontend for seamless user experience.",
    category: "Cloud & Web3",
    featured: true,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
    tags: ["Spring Boot", "React", "MongoDB", "Supabase Storage", "Razorpay", "JWT"],
    metrics: ["Supabase Storage", "Razorpay Integration", "RESTful Architecture"],
    githubUrl: "https://github.com/Akhandagale06",
    liveUrl: "https://frontend-file-share.onrender.com",
    architectureHighlights: [
      "Supabase Object Storage integration for encrypted file upload and download management",
      "Spring Boot RESTful APIs with stateless JWT token authorization",
      "Razorpay payment gateway webhooks processing monetization and account tiers"
    ]
  }
];

export const SKILLS: Skill[] = [
  { name: "Java (JDK 21)", category: "Backend", icon: "Server", level: 70, yearsOfExp: 1, highlight: true },
  { name: "Spring Boot", category: "Backend", icon: "Server", level: 70, yearsOfExp: 1, highlight: true },
  { name: "Spring Security & JWT", category: "Backend", icon: "ShieldCheck", level: 70, yearsOfExp: 1, highlight: true },
  { name: "REST APIs & WebSockets", category: "Backend", icon: "Network", level: 70, yearsOfExp: 1, highlight: true },
  { name: "PostgreSQL", category: "Databases", icon: "Database", level: 70, yearsOfExp: 1, highlight: true },
  { name: "MongoDB", category: "Databases", icon: "HardDrive", level: 70, yearsOfExp: 1 },
  { name: "OOP & DSA", category: "Concepts", icon: "BrainCircuit", level: 70, yearsOfExp: 1, highlight: true },
  { name: "DBMS & REST Architecture", category: "Concepts", icon: "Layers", level: 70, yearsOfExp: 1 },
  { name: "Docker", category: "DevOps", icon: "Container", level: 70, yearsOfExp: 1, highlight: true },
  { name: "Maven", category: "DevOps", icon: "Cpu", level: 70, yearsOfExp: 1 },
  { name: "Git & GitHub", category: "DevOps", icon: "GitBranch", level: 70, yearsOfExp: 1 },
  { name: "Problem Solving & Leadership", category: "Soft Skills", icon: "Sparkles", level: 70, yearsOfExp: 1 }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    company: "KIT's College of Engineering, Kolhapur",
    role: "B.Tech in Computer Science and Business Systems",
    period: "Expected Jul 2027",
    location: "Kolhapur, India",
    description: "Pursuing B.Tech in CSBS (CGPA 8.6/10). Hands-on experience building secure, scalable backend systems and real-time full-stack applications using Java, Spring Boot, PostgreSQL, MongoDB, Maven, and Docker.",
    achievements: [
      "Maintained top academic score with 8.6 / 10 CGPA",
      "Architected Smart Salon Queue management platform & Full Stack File Share app",
      "Completed Java Full Stack Development Virtual Internship certification"
    ],
    techStack: ["Java 21", "Spring Boot", "React", "PostgreSQL", "MongoDB", "Docker", "Maven"],
    featuredMetric: "8.6 / 10 CGPA"
  },
  {
  id: "proj-1",
  company: "Personal Project",
  role: "Smart Salon Queue Management System",
  period: "2026",
  location: "Remote",
  description: "Built a scalable full-stack salon management platform featuring online appointments, live queue updates, customer management, and role-based dashboards. Designed RESTful APIs with Spring Boot and developed an interactive React frontend for seamless booking and queue monitoring.",
  achievements: [
    "Reduced manual queue management through automated appointment scheduling",
    "Implemented JWT-based authentication and role-based authorization",
    "Built responsive dashboards for Admin, Staff, and Customers"
  ],
  techStack: [
    "Java 21",
    "Spring Boot",
    "React",
    "PostgreSQL",
    "Spring Security",
    "JWT",
    "Maven",
    "Docker"
  ],
  featuredMetric: "Role-Based Dashboard"
},
{
  id: "proj-2",
  company: "Personal Project",
  role: "Full Stack File Sharing Application",
  period: "2026",
  location: "Remote",
  description: "Developed a secure full-stack file-sharing platform enabling authenticated users to upload, manage, and download files with cloud storage integration. Built scalable RESTful APIs using Spring Boot and a responsive React frontend for a seamless user experience.",
  achievements: [
    "Implemented secure user authentication and authorization using JWT",
    "Integrated Supabase Storage for reliable cloud-based file management",
    "Added Razorpay payment gateway to support premium features and transactions"
  ],
  techStack: [
    "Java 21",
    "Spring Boot",
    "React",
    "MongoDB",
    "Supabase",
    "Razorpay",
    "Spring Security",
    "JWT",
    "Maven"
  ],
  featuredMetric: "Secure Cloud File Sharing"
},
{
  id: "proj-3",
  company: "Personal Project",
  role: "UIUX Web – AI-Powered UI/UX Generator & Infinite Canvas Studio",
  period: "2026",
  location: "Remote",
  description: "Built an AI-powered UI/UX design platform that transforms natural language prompts into multi-screen web and mobile interface designs. Developed an interactive infinite canvas workspace with real-time code generation, live previews, dynamic theming, and secure user authentication using modern full-stack technologies.",
  achievements: [
    "Implemented AI-powered multi-screen UI generation using Google Gemini via OpenRouter",
    "Developed an infinite canvas editor with drag, resize, zoom, and pan capabilities for seamless design workflows",
    "Built real-time React + Tailwind CSS code generation, live preview rendering, and project management with Clerk authentication and Neon PostgreSQL"
  ],
  techStack: [
    "Next.js 15",
    "React 19",
    "TypeScript",
    "Tailwind CSS v4",
    "OpenRouter",
    "Google Gemini",
    "Neon PostgreSQL",
    "Drizzle ORM",
    "Clerk",
    "React RND",
    "React Zoom Pan Pinch"
  ],
  featuredMetric: "AI-Powered Multi-Screen UI Generation"
}
];

export const SERVICES: Service[] = [
  {
    id: "serv-1",
    title: "Java & Spring Boot Backend Development",
    icon: "Layers",
    description: "Robust, scalable backend microservices and RESTful APIs built with Java 21, Spring Boot, Spring Security JWT, STOMP WebSockets, and PostgreSQL.",
    deliverables: ["Spring Boot REST APIs", "STOMP WebSockets Live Feed", "Spring Security & JWT Auth", "PostgreSQL & MongoDB Schemas"],
    highlightTech: ["Java 21", "Spring Boot", "PostgreSQL", "Docker"]
  },
  {
    id: "serv-2",
    title: "Full Stack Web Application Development",
    icon: "BrainCircuit",
    description: "End-to-end full-stack web applications pairing responsive React frontends with Spring Boot REST backends.",
    deliverables: ["React Responsive UI", "REST API & WebSocket Integration", "Supabase & Razorpay Integration", "Render Cloud Deployment"],
    highlightTech: ["React", "Spring Boot", "Supabase", "Razorpay"]
  },
  {
    id: "serv-3",
    title: "Database Architecture & Optimization",
    icon: "Zap",
    description: "Dual database modeling pairing PostgreSQL relational data with MongoDB document audit log streams.",
    deliverables: ["PostgreSQL Schema Design", "MongoDB Audit Log Stream", "Hibernate/JPA Optimization", "Maven Build Automation"],
    highlightTech: ["PostgreSQL", "MongoDB", "Maven", "JPA"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "CSBS Department Lead",
    role: "Senior Faculty",
    company: "KIT's College of Engineering",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    content: "Aditya exhibits outstanding technical acumen in Java backend architecture and Spring Boot REST APIs. His Smart Salon Queue project is an exceptional showcase of real-world problem solving.",
    rating: 5,
    badge: "Academic Review"
  },
  {
    id: "test-2",
    name: "Virtual Internship Mentor",
    role: "Java Full Stack Evaluator",
    company: "Virtual Internship Program",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    content: "Aditya completed the Java Full Stack Development Virtual Internship with distinction, building clean Spring Boot APIs and STOMP WebSockets integrations.",
    rating: 5,
    badge: "Certified Evaluator"
  }
];

export const ARTICLES: Article[] = [
  // ...
];

export const DEVELOPER_ACTIVITY_STATS: DeveloperActivityStat[] = [
  {
    id: 'commits',
    icon: 'GitCommit',
    title: '12 Commits',
    subtitle: 'GitHub Contributions (2026)',
    accentColor: 'purple'
  },
  {
    id: 'leetcode',
    icon: 'Flame',
    title: '70+ Algorithms',
    subtitle: '',
    accentColor: 'cyan'
  },
  {
    id: 'stars',
    icon: 'Award',
    title: '0 Stars',
    subtitle: 'Open-Source Packages',
    accentColor: 'emerald'
  }
];

export const TERMINAL_CONFIG: TerminalConfig = {
  userHost: 'aditya@khandagale-architect: ~',
  version: 'v2.4',
  welcomeText: [
    'Aditya Khandagale Interactive Terminal v2.4 initialized.',
    'Type "help" to view list of available CLI commands.'
  ],
  liveStatsText: [
    'Live Activity Stats:',
    '- Total GitHub Commits (2026): 1,482',
    '- Solved Algorithmic Problems: 420+',
    '- Global Active Users: 2.4M+',
    '- System SLA: 99.99%'
  ]
};

