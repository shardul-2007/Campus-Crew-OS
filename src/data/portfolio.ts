// ═══════════════════════════════════════════════════════════════
// Shardul Parihar — Portfolio Data
// Single source of truth for all content.
// ═══════════════════════════════════════════════════════════════

export const PERSONAL = {
  name: 'Shardul Parihar',
  shortName: 'Shardul Parihar',
  role: 'Software Engineering Student',
  headline: 'Building full-stack products, AI experiences, and the web.',
  bio: 'Software engineering student from Pune, India, focused on full-stack development, modern web technologies, AI-powered applications, and software engineering.',
  bioSecondary: 'I enjoy turning ideas into working software — from interfaces and APIs to intelligent applications and interactive 3D experiences.',
  location: 'Pune, Maharashtra, India',
  email: 'shardulparihar2007@gmail.com',
  github: 'https://github.com/shardul-2007',
  githubUser: 'shardul-2007',
  linkedin: 'https://www.linkedin.com/in/shardul-parihar/',
  portfolio: 'https://shardul-2007.github.io/my-portfolio/',
  status: 'AVAILABLE',
  resumeUrl: 'https://www.linkedin.com/in/shardul-parihar/',
};

export const ABOUT_DATA = {
  heading: 'Building things. Learning deeply. Shipping often.',
  paragraphs: [
    "I'm Shardul Parihar, a software engineering student interested in full-stack development, AI, modern web technologies, and product engineering.",
    "I work across the stack — building interfaces, APIs, data-driven applications, AI integrations, and interactive experiences.",
    "My projects include AssemblyOS, an AI-powered machine and assembly intelligence platform, CivicOS, an AI-powered civic intelligence platform, and SHARDUL.OS, my personal developer portfolio.",
    "Alongside building projects, I contribute to open source through programs such as GSSoC and NSOC and participate in developer and student communities through campus ambassador programs.",
    "Currently focused on becoming a stronger software engineer by building, experimenting, contributing, and continuously learning.",
  ],
  focus: [
    {
      title: 'Full-Stack Development',
      skills: 'React · Next.js · Node.js · REST APIs · TypeScript · JavaScript',
    },
    {
      title: 'Frontend Engineering',
      skills: 'React · Next.js · HTML5 · CSS3 · Tailwind CSS · Framer Motion · Vite',
    },
    {
      title: 'Backend & APIs',
      skills: 'Node.js · REST APIs · API Integration · JSON · Authentication · Backend Architecture',
    },
    {
      title: 'AI & Intelligent Applications',
      skills: 'AI APIs · Prompt Engineering · AI Integration · AI-powered Applications · Computer Vision Concepts',
    },
    {
      title: 'Programming',
      skills: 'Python · C · C++ · Java · JavaScript · TypeScript',
    },
    {
      title: 'Computer Science',
      skills: 'Data Structures & Algorithms · Object-Oriented Programming · Problem Solving · Software Engineering',
    },
    {
      title: 'Tools & Platforms',
      skills: 'Git · GitHub · Vercel · GitHub Pages · npm · VS Code',
    },
  ],
};

export interface Project {
  id: string;
  num: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  description: string;
  stack: string[];
  status: 'LIVE' | 'IN DEVELOPMENT' | 'OPEN SOURCE';
  github: string;
  live: string;
  featured: boolean;
  architecture?: {
    layer: string;
    tech: string;
    detail: string;
  }[];
}

export const PROJECTS: Project[] = [
  {
    id: 'assemblyos',
    num: '001',
    name: 'AssemblyOS',
    tagline: 'AI-Powered Machine & Assembly Intelligence',
    category: 'AI · 3D · SOFTWARE ENGINEERING',
    year: '2026',
    description:
      'AssemblyOS explores how AI can help people understand physical products and machines through images and interactive 3D assemblies. Users can capture or upload a product image, identify visible components, connect them to a compatible assembly, and explore the resulting 3D model. The interactive workspace allows users to inspect, select, isolate, hide, remove, attach, replace, explode, and reassemble components, while exploring relationships between parts. The flagship demonstration uses a drone assembly, with the system designed to extend to other machines, electronics, and mechanical products.',
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Three.js',
      'React Three Fiber',
      'Zustand',
      'Framer Motion',
      'AI APIs',
      'Zod',
    ],
    status: 'LIVE',
    github: 'https://github.com/shardul-2007/assemblyos',
    live: 'https://github.com/shardul-2007/assemblyos',
    featured: true,
    architecture: [
      {
        layer: 'Interactive 3D',
        tech: 'Three.js + React Three Fiber',
        detail: '3D viewport for component selection, isolation, explosion, and reassembly',
      },
      {
        layer: 'State Architecture',
        tech: 'Zustand + React 18',
        detail: 'Reactive hierarchical state for part relationships and assembly hierarchy',
      },
      {
        layer: 'AI Intelligence',
        tech: 'AI APIs + Vision',
        detail: 'Product image recognition and component identification pipeline',
      },
      {
        layer: 'Validation Layer',
        tech: 'Zod + TypeScript',
        detail: 'Rigid schema enforcement for mechanical parts, connections, and metadata',
      },
    ],
  },
  {
    id: 'civicos',
    num: '002',
    name: 'CivicOS',
    tagline: 'AI-Powered Civic Intelligence Platform',
    category: 'FULL STACK · AI',
    year: '2025',
    description:
      'CivicOS is a full-stack civic intelligence platform combining interactive maps, municipal data, analytics, and AI-assisted information access. It brings civic information, issue tracking, visual analytics, and AI-powered query resolution into a single web application.',
    stack: ['React', 'Vite', 'JavaScript', 'Leaflet', 'Recharts', 'REST APIs', 'AI APIs'],
    status: 'LIVE',
    github: 'https://github.com/shardul-2007',
    live: 'https://civicos-beta.vercel.app/',
    featured: true,
    architecture: [
      {
        layer: 'Frontend',
        tech: 'React + Vite',
        detail: 'Fast component-driven interface with responsive civic dashboards',
      },
      {
        layer: 'Geospatial Maps',
        tech: 'Leaflet 1.9.4',
        detail: 'Interactive municipal maps with customized overlays and location pins',
      },
      {
        layer: 'Analytics',
        tech: 'Recharts',
        detail: 'Composable visual analytics for urban and civic metrics',
      },
      {
        layer: 'AI Query Engine',
        tech: 'AI APIs',
        detail: 'Intelligent query resolution and structured municipal data summaries',
      },
    ],
  },
  {
    id: 'shardul-os',
    num: '003',
    name: 'SHARDUL.OS',
    tagline: 'Personal Developer Portfolio',
    category: 'FRONTEND · DESIGN',
    year: '2026',
    description:
      'SHARDUL.OS is my personal portfolio — an interactive space for exploring my work, technical skills, projects, experience, achievements, and contact information. Designed with a futuristic glass interface and developer-focused visual language, it presents my work through an experience rather than a conventional resume page.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GitHub API'],
    status: 'LIVE',
    github: 'https://github.com/shardul-2007/my-portfolio',
    live: 'https://shardul-2007.github.io/my-portfolio/',
    featured: true,
  },
];

export interface SkillCategory {
  category: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'C', 'C++', 'Java', 'HTML5', 'CSS3'],
  },
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Responsive Design'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'REST APIs', 'API Integration', 'JSON', 'Authentication'],
  },
  {
    category: 'AI',
    skills: ['AI APIs', 'Prompt Engineering', 'AI Integration', 'AI Applications'],
  },
  {
    category: 'Libraries',
    skills: ['Leaflet', 'Recharts', 'Three.js', 'React Three Fiber'],
  },
  {
    category: 'Computer Science',
    skills: ['DSA', 'Algorithms', 'OOP', 'Problem Solving', 'Software Engineering'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Vercel', 'GitHub Pages', 'npm', 'VS Code'],
  },
];

export interface ExperienceItem {
  id: string;
  org: string;
  role: string;
  year: string;
  description: string;
  tags: string[];
}

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'remoterecruit',
    org: 'RemoteRecruit',
    role: 'Student Ambassador',
    year: '2026',
    description:
      'Selected as a Student Ambassador, participating in student-focused technology and remote-work community initiatives.',
    tags: ['Community', 'Ambassador'],
  },
  {
    id: 'hackerrank',
    org: 'HackerRank Campus Community',
    role: 'Campus Community',
    year: '2026',
    description:
      'Participating in campus developer community activities around programming, DSA, contests, and technical learning.',
    tags: ['Community', 'DSA', 'Contests'],
  },
  {
    id: 'gssoc',
    org: 'GirlScript Summer of Code',
    role: 'Open Source Contributor',
    year: '2025',
    description:
      'Contributed to open-source projects through the GSSoC 2025 program using GitHub-based collaboration.',
    tags: ['Open Source', 'GitHub', 'Collaboration'],
  },
  {
    id: 'nsoc',
    org: 'NSOC',
    role: 'Open Source Contributor',
    year: '2025',
    description:
      'Participated in an open-source development program focused on collaborative software development.',
    tags: ['Open Source', 'GitHub'],
  },
  {
    id: 'google',
    org: 'Google',
    role: 'Campus Ambassador',
    year: '2025',
    description:
      'Participated in student community initiatives around Google technologies and developer programs.',
    tags: ['Community', 'Technology', 'Leadership'],
  },
  {
    id: 'internshala',
    org: 'Internshala',
    role: 'Campus Ambassador',
    year: '2025',
    description:
      'Participated in student engagement initiatives around internships and career opportunities.',
    tags: ['Community', 'Career'],
  },
  {
    id: 'guvi',
    org: 'GUVI',
    role: 'Campus Ambassador',
    year: '2025',
    description:
      'Participated in technology and learning initiatives focused on student skill development.',
    tags: ['Community', 'Technology', 'EdTech'],
  },
  {
    id: 'pw',
    org: 'Physics Wallah',
    role: 'Campus Ambassador',
    year: '2025',
    description:
      'Participated in educational community initiatives and student opportunity programs.',
    tags: ['Community', 'Education'],
  },
];

export interface AchievementItem {
  id: string;
  name: string;
  role: string;
  year: string;
  link?: string;
}

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'gssoc',
    name: 'GirlScript Summer of Code (GSSoC)',
    role: 'Open Source Contributor',
    year: '2025',
  },
  {
    id: 'nsoc',
    name: 'NSOC',
    role: 'Open Source Contributor',
    year: '2025',
  },
  {
    id: 'google',
    name: 'Google',
    role: 'Campus Ambassador',
    year: '2025',
  },
  {
    id: 'osgc',
    name: 'OSGC',
    role: 'Open Source Contributor',
    year: '2025',
    link: 'https://github.com/shardul-2007/assemblyos',
  },
  {
    id: 'hackerrank',
    name: 'HackerRank',
    role: 'Campus Community',
    year: '2026',
  },
  {
    id: 'remoterecruit',
    name: 'RemoteRecruit',
    role: 'Student Ambassador',
    year: '2026',
  },
];

export const CONTACT_CHANNELS = [
  {
    id: 'email',
    label: 'Email',
    value: 'shardulparihar2007@gmail.com',
    href: 'mailto:shardulparihar2007@gmail.com',
    icon: 'Mail',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: '/in/shardul-parihar/',
    href: 'https://www.linkedin.com/in/shardul-parihar/',
    icon: 'Linkedin',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/shardul-2007',
    href: 'https://github.com/shardul-2007',
    icon: 'Github',
  },
];
