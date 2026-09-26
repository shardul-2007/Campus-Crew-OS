// ═══════════════════════════════════════════════════════════════
// SHARDUL.OS — Portfolio Data
// Single source of truth for ALL content.
// No invented data — everything here is real.
// ═══════════════════════════════════════════════════════════════

export const PERSONAL = {
  name: 'Shardul Parihar',
  shortName: 'SHARDUL.PARIHAR',
  role: 'Software Engineer',
  subtitle: 'SOFTWARE ENGINEER / BUILDER',
  bio: 'Software engineering student focused on full-stack development, web technologies, AI, cybersecurity and innovative digital products.',
  location: 'Pune, Maharashtra, India',
  locationShort: 'INDIA',
  email: 'shardulparihar2007@gmail.com',
  github: 'https://github.com/shardul-2007',
  githubUser: 'shardul-2007',
  linkedin: 'https://www.linkedin.com/in/shardul-parihar-/',
  portfolio: 'https://shardul-2007.github.io/my-portfolio/',
  status: 'AVAILABLE',
  focus: ['Full Stack', 'AI / ML', 'Web Development', 'Cybersecurity'],
  headline: 'BUILDING DIGITAL\nSYSTEMS THAT MATTER.',
  buildVersion: '2026.09',
  resumeUrl: 'https://www.linkedin.com/in/shardul-parihar-/', // link to LinkedIn until PDF added
};

export interface Project {
  id: string;
  num: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  status: 'LIVE' | 'IN DEVELOPMENT' | 'OPEN SOURCE' | 'ARCHIVED';
  github?: string;
  live?: string;
  featured: boolean;
  category: string;
  year: string;
  architecture?: ArchNode[];
}

interface ArchNode {
  layer: string;
  tech: string;
  detail: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'civicos',
    num: '001',
    name: 'CivicOS',
    tagline: 'AI-Powered Municipal Operating System',
    description: 'A full-stack civic intelligence platform combining interactive maps, real-time analytics, and AI-driven insights. Built to help citizens interact with municipal services and urban data. Features live issue tracking, analytics dashboards, and AI-powered query resolution.',
    stack: ['React', 'Vite', 'Leaflet', 'Recharts', 'AI APIs', 'REST APIs', 'JavaScript'],
    status: 'LIVE',
    github: 'https://github.com/shardul-2007',
    live: 'https://civicos-beta.vercel.app/',
    featured: true,
    category: 'FULL STACK / AI',
    year: '2025',
    architecture: [
      { layer: 'Frontend',  tech: 'React + Vite',      detail: 'Component-based UI with fast hot reload and production bundling' },
      { layer: 'Maps',      tech: 'Leaflet 1.9.4',     detail: 'Interactive geospatial map rendering with custom overlays and markers' },
      { layer: 'Analytics', tech: 'Recharts',           detail: 'Composable data visualization for civic metrics and dashboards' },
      { layer: 'AI Layer',  tech: 'AI APIs',            detail: 'Intelligent query resolution and data summarization' },
      { layer: 'Data',      tech: 'REST APIs',          detail: 'Structured municipal data endpoints with real-time updates' },
    ],
  },
  {
    id: 'shardul-os',
    num: '002',
    name: 'SHARDUL.OS',
    tagline: 'Personal Developer OS — This Portfolio',
    description: 'An experimental portfolio redesigned as a personal developer operating system. Features a futuristic glassmorphism UI, command palette, developer constellation, API explorer, performance monitor, build log, and Shardul.AI knowledge base. Originally built in plain HTML/CSS/JS, now rebuilt in Next.js.',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GitHub API'],
    status: 'LIVE',
    github: 'https://github.com/shardul-2007/my-portfolio',
    live: 'https://shardul-2007.github.io/my-portfolio/',
    featured: true,
    category: 'FRONTEND / DESIGN',
    year: '2026',
  },
];

export interface Skill {
  name: string;
  category: string;
  level: 'primary' | 'secondary' | 'learning';
}

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'React',        category: 'Frontend',    level: 'primary'   },
  { name: 'Next.js',      category: 'Frontend',    level: 'primary'   },
  { name: 'HTML5',        category: 'Frontend',    level: 'primary'   },
  { name: 'CSS3',         category: 'Frontend',    level: 'primary'   },
  { name: 'Tailwind',     category: 'Frontend',    level: 'primary'   },
  { name: 'Framer Motion',category: 'Frontend',    level: 'secondary' },
  // Languages
  { name: 'JavaScript',   category: 'Languages',   level: 'primary'   },
  { name: 'TypeScript',   category: 'Languages',   level: 'primary'   },
  { name: 'Python',       category: 'Languages',   level: 'primary'   },
  // Backend / APIs
  { name: 'REST APIs',    category: 'Backend',     level: 'primary'   },
  { name: 'Node.js',      category: 'Backend',     level: 'secondary' },
  // Data / Viz
  { name: 'Leaflet',      category: 'Tools',       level: 'primary'   },
  { name: 'Recharts',     category: 'Tools',       level: 'primary'   },
  // DevOps / Tools
  { name: 'Git',          category: 'Tools',       level: 'primary'   },
  { name: 'GitHub',       category: 'Tools',       level: 'primary'   },
  { name: 'Vite',         category: 'Tools',       level: 'primary'   },
  { name: 'GitHub Pages', category: 'Tools',       level: 'secondary' },
  { name: 'Vercel',       category: 'Tools',       level: 'secondary' },
  // AI
  { name: 'AI APIs',      category: 'AI',          level: 'primary'   },
  { name: 'Prompt Eng.',  category: 'AI',          level: 'secondary' },
  // Cybersecurity
  { name: 'Cybersecurity',category: 'Cybersecurity',level:'learning'  },
  // DSA
  { name: 'DSA',          category: 'CS',          level: 'primary'   },
  { name: 'Algorithms',   category: 'CS',          level: 'primary'   },
];

export interface Experience {
  id: string;
  year: string;
  type: string;
  title: string;
  org?: string;
  role?: string;
  description: string;
  tags: string[];
  proof?: string;
  link?: string;
  current?: boolean;
}

export const EXPERIENCE: Experience[] = [
  {
    id: 'shardul-os-v5',
    year: '2026',
    type: 'BUILD',
    title: 'SHARDUL.OS v5 — Next.js Rebuild',
    org: 'Personal Project',
    description: 'Rebuilt portfolio as a full Next.js / TypeScript / Framer Motion application with futuristic glassmorphism UI — Developer OS concept.',
    tags: ['Next.js', 'TypeScript', 'Framer Motion'],
    current: true,
  },
  {
    id: 'remoterecruit',
    year: '2026',
    type: 'COMMUNITY',
    title: 'RemoteRecruit Student Ambassador',
    org: 'RemoteRecruit',
    role: 'Student Ambassador',
    description: 'Selected as Student Ambassador — student-focused technology and remote work community.',
    tags: ['Community', 'Ambassador'],
    proof: 'images/remote-recruit.jpg',
  },
  {
    id: 'hackerrank',
    year: '2026',
    type: 'COMMUNITY',
    title: 'HackerRank Campus Community',
    org: 'HackerRank',
    role: 'Campus Community',
    description: 'Campus community engagement, developer contests, and DSA practice activities.',
    tags: ['Community', 'DSA', 'Contests'],
    proof: 'images/hackerrank.jpg',
  },
  {
    id: 'shardul-os-v4',
    year: '2026',
    type: 'BUILD',
    title: 'SHARDUL.OS v4 — Developer OS Portfolio',
    org: 'Personal Project',
    description: 'Original SHARDUL.OS — plain HTML/CSS/JS portfolio with glassmorphism UI, command palette, constellation, API explorer, build log.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Design'],
  },
  {
    id: 'civicos',
    year: '2025',
    type: 'BUILD',
    title: 'CivicOS — Flagship Project',
    org: 'Personal Project',
    description: 'Designed and built CivicOS — AI-powered civic intelligence platform with interactive maps (Leaflet), analytics dashboards (Recharts), and AI-driven query resolution.',
    tags: ['React', 'Vite', 'Leaflet', 'AI'],
    link: 'https://civicos-beta.vercel.app/',
  },
  {
    id: 'gssoc',
    year: '2025',
    type: 'OPEN SOURCE',
    title: 'GirlScript Summer of Code',
    org: 'GSSoC',
    role: 'Contributor',
    description: 'Open source contributor. Collaborated on community projects via GitHub under the GSSoC 2025 program.',
    tags: ['Open Source', 'GitHub', 'Collaboration'],
    proof: 'images/gssoc.jpg',
  },
  {
    id: 'nsoc',
    year: '2025',
    type: 'OPEN SOURCE',
    title: 'NSOC',
    org: 'NSOC',
    role: 'Contributor',
    description: 'Participated in open source development program. Code contributions and collaborative development.',
    tags: ['Open Source', 'GitHub'],
    proof: 'images/nsoc.jpg',
  },
  {
    id: 'google',
    year: '2025',
    type: 'COMMUNITY',
    title: 'Google Campus Ambassador',
    org: 'Google',
    role: 'Campus Ambassador',
    description: 'Student community initiatives, promoting Google technologies and developer programs on campus.',
    tags: ['Community', 'Google', 'Leadership'],
    proof: 'images/google-offer.jpg',
  },
  {
    id: 'internshala',
    year: '2025',
    type: 'COMMUNITY',
    title: 'Internshala Campus Ambassador',
    org: 'Internshala',
    role: 'Campus Ambassador',
    description: 'Promoting internship and career opportunities. Student engagement and program awareness.',
    tags: ['Community', 'Career', 'Ambassador'],
    proof: 'images/internshala.jpg',
  },
  {
    id: 'guvi',
    year: '2025',
    type: 'COMMUNITY',
    title: 'GUVI Campus Ambassador',
    org: 'GUVI',
    role: 'Campus Ambassador',
    description: 'Technology skill-development initiative. Student engagement and online learning advocacy.',
    tags: ['Community', 'EdTech'],
    proof: 'images/guvi.jpg',
  },
  {
    id: 'pw',
    year: '2025',
    type: 'COMMUNITY',
    title: 'Physics Wallah Campus Ambassador',
    org: 'Physics Wallah',
    role: 'Campus Ambassador',
    description: 'Educational community activities and student opportunity promotion.',
    tags: ['Community', 'Education'],
    proof: 'images/physics-wallah.jpg',
  },
];

export interface Achievement {
  id: string;
  cat: string;
  name: string;
  org: string;
  detail: string;
  year: string;
  proof?: string;
  icon: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id:'gssoc',       cat:'OPEN SOURCE',   name:'GirlScript Summer of Code', org:'GSSoC',           detail:'Open source contributor 2025',          year:'2025', proof:'images/gssoc.jpg',         icon:'⌥' },
  { id:'nsoc',        cat:'OPEN SOURCE',   name:'NSOC',                     org:'NSOC',            detail:'Open source contributor 2025',          year:'2025', proof:'images/nsoc.jpg',          icon:'⌥' },
  { id:'google',      cat:'COMMUNITY',     name:'Google Campus Ambassador',  org:'Google',          detail:'Student programs & developer community', year:'2025', proof:'images/google-offer.jpg',  icon:'◈' },
  { id:'internshala', cat:'COMMUNITY',     name:'Internshala Ambassador',    org:'Internshala',     detail:'Career & internship advocacy',           year:'2025', proof:'images/internshala.jpg',   icon:'◈' },
  { id:'guvi',        cat:'COMMUNITY',     name:'GUVI Campus Ambassador',    org:'GUVI',            detail:'EdTech community engagement',            year:'2025', proof:'images/guvi.jpg',          icon:'◈' },
  { id:'pw',          cat:'COMMUNITY',     name:'Physics Wallah Ambassador', org:'Physics Wallah',  detail:'Educational community programs',         year:'2025', proof:'images/physics-wallah.jpg',icon:'◈' },
  { id:'rr',          cat:'PROGRAM',       name:'RemoteRecruit Ambassador',  org:'RemoteRecruit',   detail:'Student ambassador 2026',               year:'2026', proof:'images/remote-recruit.jpg', icon:'▲' },
  { id:'hr',          cat:'PROGRAM',       name:'HackerRank Campus',         org:'HackerRank',      detail:'DSA & campus developer community',       year:'2026', proof:'images/hackerrank.jpg',    icon:'▲' },
];

export const ABOUT_PANELS = [
  {
    num: '01',
    id: 'engineer',
    label: 'ENGINEER',
    title: 'Systems Thinker',
    body: 'Focused on DSA and scalable system design. I approach problems from first principles — understanding the "why" before the "how". Currently deepening expertise in algorithms, data structures, and computer science fundamentals.',
    tags: ['DSA', 'Algorithms', 'Systems Design'],
  },
  {
    num: '02',
    id: 'builder',
    label: 'BUILDER',
    title: 'Shipping Real Products',
    body: 'Built CivicOS — an AI-powered civic intelligence platform — from zero to deployed product. SHARDUL.OS is this portfolio, rebuilt multiple times in pursuit of a genuinely unique developer experience. I bias toward shipping.',
    tags: ['CivicOS', 'SHARDUL.OS', 'Full Stack'],
  },
  {
    num: '03',
    id: 'community',
    label: 'COMMUNITY',
    title: 'Building Together',
    body: 'Campus Ambassador for Google, Internshala, GUVI, Physics Wallah, RemoteRecruit and HackerRank. Contributor to GSSoC and NSOC open source programs. Community building and knowledge sharing are part of how I grow.',
    tags: ['Google', 'Open Source', 'Leadership'],
  },
  {
    num: '04',
    id: 'creator',
    label: 'CREATOR',
    title: 'Building in Public',
    body: 'I treat each project as a product — designed, engineered, and shipped. SHARDUL.OS evolved through five major versions. I document what I build, what I learn, and what comes next. The process is part of the work.',
    tags: ['Design', 'Portfolio', 'Writing'],
  },
];

export const CONTACT_CHANNELS = [
  { id: 'email',    label: 'EMAIL',    value: 'shardulparihar2007@gmail.com', href: 'mailto:shardulparihar2007@gmail.com', icon: 'Mail' },
  { id: 'linkedin', label: 'LINKEDIN', value: '/in/shardul-parihar-/',         href: 'https://www.linkedin.com/in/shardul-parihar-/', icon: 'Linkedin' },
  { id: 'github',   label: 'GITHUB',   value: 'github.com/shardul-2007',       href: 'https://github.com/shardul-2007', icon: 'Github' },
];
