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
  orgShort?: string;
  role: string;
  type?: string;
  dates: string;
  location?: string;
  description?: string;
  category: string;
  status: 'Present' | 'Completed';
  skills?: string[];
  media?: string[];
  recognition?: string;
}

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'remoterecruit',
    org: 'RemoteRecruit',
    orgShort: 'RR',
    role: 'Campus Ambassador',
    type: 'Internship',
    dates: 'Aug 2026 – Present',
    location: 'Remote',
    description:
      'Selected as a RemoteRecruit Campus Ambassador to represent and promote the organization within the student community. Engage with students, share opportunities, and support awareness of RemoteRecruit programs. Contribute to student networking, community engagement, and outreach initiatives.',
    category: 'Community / Campus Ambassador',
    status: 'Present',
    media: ['Offer letter'],
  },
  {
    id: 'osc-osci',
    org: 'Open Source Connect',
    orgShort: 'OSC',
    role: 'Open Source Contributor (OSCI)',
    dates: 'Aug 2026 – Present',
    location: 'Pune District, Maharashtra, India',
    description:
      'Contributing to open-source projects, collaborating with developers, and gaining hands-on experience with community-driven software development.',
    category: 'Open Source',
    status: 'Present',
    skills: ['MERN Stack', 'Full-Stack Development'],
    media: ['Badge'],
  },
  {
    id: 'hackerrank',
    org: 'HackerRank',
    orgShort: 'HR',
    role: 'HackerRank Campus Crew',
    type: 'Part-time',
    dates: 'Jul 2026 – Present',
    location: 'Pune District, Maharashtra, India · Remote',
    description:
      "Selected as a HackerRank Campus Crew member after a competitive interview process to represent HackerRank at PCET's Nutan Maharashtra Institute of Engineering and Technology (NMIET). Responsible for promoting coding culture, organizing campus initiatives, engaging students with HackerRank challenges, and building a strong programming community through events, workshops, and peer learning.",
    category: 'Community / Campus',
    status: 'Present',
  },
  {
    id: 'google',
    org: 'Google',
    orgShort: 'G',
    role: 'Google Student Ambassador',
    type: 'Internship',
    dates: 'Apr 2026 – Present',
    description:
      'Selected as a Google Student Ambassador and participated in the program as a student representative.',
    category: 'Community / Student Program',
    status: 'Present',
    media: ['Mail from Google', 'Top prompt creator'],
  },
  {
    id: 'mygov-changemaker',
    org: 'MyGov India',
    orgShort: 'MyGov',
    role: 'Changemaker',
    dates: 'Mar 2026 – Present',
    description: 'Received the Changemaker Badge on MyGov.',
    category: 'Achievement / Community',
    status: 'Present',
    media: ['Badge'],
  },
  {
    id: 'mygov-ca',
    org: 'MyGov India',
    orgShort: 'MyGov',
    role: 'MyGov Campus Ambassador',
    dates: 'Dec 2025 – Apr 2026',
    description: 'MyGov campus ambassador role.',
    category: 'Campus Ambassador',
    status: 'Completed',
    skills: ['English', 'Leadership', '+1 skill'],
    media: ['Confirmation certificate'],
  },
  {
    id: 'pw',
    org: 'PW (PhysicsWallah)',
    orgShort: 'PW',
    role: 'Campus Ambassador',
    type: 'Part-time',
    dates: 'Feb 2026 – Present',
    category: 'Campus Ambassador',
    status: 'Present',
  },
  {
    id: 'gssoc-contributor',
    org: 'GirlScript Summer of Code',
    orgShort: 'GSSOC',
    role: "Open Source Contributor | GSSOC'26",
    type: 'Part-time',
    dates: 'May 2026 – Jun 2026',
    description: "Open-source contributor through GSSOC'26.",
    category: 'Open Source',
    status: 'Completed',
    media: ['Badge', 'Mail for verification'],
  },
  {
    id: 'gssoc-ambassador',
    org: 'GirlScript Summer of Code',
    orgShort: 'GSSOC',
    role: 'Ambassador',
    dates: 'May 2026 – Jun 2026',
    description: 'Campus and community ambassador for GirlScript Summer of Code.',
    category: 'Community / Ambassador',
    status: 'Completed',
    media: ['Ambassador badge'],
  },
  {
    id: 'nsoc',
    org: 'Nexus Spring of Code',
    orgShort: 'NSOC',
    role: "Open Source Contributor | NSOC'26",
    type: 'Part-time',
    dates: 'Apr 2026 – May 2026',
    location: 'India',
    description: "Open-source contributor through NSOC'26.",
    category: 'Open Source',
    status: 'Completed',
    skills: ['Version Control', 'HTML', 'CSS', 'JavaScript', '+1 skill'],
    media: ['Tech contributor badge'],
  },
  {
    id: 'osc-oscg',
    org: 'Open Source Connect',
    orgShort: 'OSC',
    role: "Open Source Contributor | OSCG'26",
    type: 'Part-time',
    dates: 'Apr 2026 – May 2026',
    description: "Open-source contributor through OSCG'26.",
    category: 'Open Source',
    status: 'Completed',
    skills: ['Version Control', 'C++', '+2 skills'],
    media: ['Contributor badge'],
  },
  {
    id: 'imun',
    org: 'International MUN',
    orgShort: 'IMUN',
    role: 'Campus Ambassador',
    type: 'Internship',
    dates: 'Jan 2026 – Apr 2026',
    description:
      "Represented my college PCET'S NMIET on an international platform, acting as a bridge between the institution and global stakeholders.",
    recognition: 'International Representative, NMIET 🌐',
    category: 'Campus Ambassador / Representation',
    status: 'Completed',
    skills: ['Public Speaking'],
    media: ['Offer letter'],
  },
  {
    id: 'hcl-guvi',
    org: 'HCL GUVI',
    orgShort: 'GUVI',
    role: 'Campus Ambassador — AI Impact Summit',
    type: 'Internship',
    dates: 'Oct 2025 – Mar 2026',
    description: 'Coordinated and managed participation in a national-level AI event.',
    category: 'Campus Ambassador / Community',
    status: 'Completed',
    skills: ['Management', 'Communication', '+1 skill'],
    media: ['Certificate of recognition'],
  },
  {
    id: 'cognizance-iitr',
    org: 'Cognizance, IIT Roorkee',
    orgShort: 'IITR',
    role: 'Campus Ambassador',
    dates: 'Jan 2026 – Feb 2026',
    description: 'Appointed as Campus Ambassador for Cognizance 2026 at IIT Roorkee.',
    category: 'Campus Ambassador',
    status: 'Completed',
    skills: ['Management', 'Campus Ministry', '+2 skills'],
    media: ['Offer Letter'],
  },
  {
    id: 'guesss-top30',
    org: 'GUESSS India',
    orgShort: 'GUESSS',
    role: 'Participant — GUESSS India National Immersion Program (Top 30)',
    type: 'Part-time',
    dates: 'Dec 2025 – Jan 2026',
    description:
      'Selected among the Top 30 campus ambassadors nationally representing my college at IIT Mandi.',
    category: 'Program / Recognition',
    status: 'Completed',
    media: ['Mail of confirmation'],
  },
  {
    id: 'guesss-ca',
    org: 'GUESSS India',
    orgShort: 'GUESSS',
    role: 'Campus Ambassador',
    type: 'Internship',
    dates: 'Sep 2025 – Jan 2026',
    location: 'Remote',
    description: 'Campus Ambassador role.',
    category: 'Campus Ambassador',
    status: 'Completed',
    media: ['Offer letter'],
  },
  {
    id: 'internshala',
    org: 'Internshala',
    orgShort: 'IS',
    role: 'Campus Ambassador',
    dates: '2025',
    description:
      'Participated in student engagement initiatives around internships and career opportunities.',
    category: 'Campus Ambassador',
    status: 'Completed',
    skills: ['Community', 'Career'],
  },
];

export interface AchievementItem {
  id: string;
  name: string;
  org: string;
  orgShort?: string;
  role?: string;
  dates: string;
  category: 'OPEN SOURCE' | 'CAMPUS / COMMUNITY' | 'RECOGNITION / PROGRAMS';
  description: string;
  status: 'Present' | 'Completed';
  featured: boolean;
  media?: string[];
  recognition?: string;
  link?: string;
}

export const ACHIEVEMENTS: AchievementItem[] = [
  // ── OPEN SOURCE ──
  {
    id: 'gssoc-contributor',
    name: "Open Source Contributor | GSSOC'26",
    org: 'GirlScript Summer of Code',
    orgShort: 'GSSOC',
    dates: 'May 2026 – Jun 2026',
    category: 'OPEN SOURCE',
    description: "Open-source contributor through GSSOC'26.",
    status: 'Completed',
    featured: true,
    media: ['Badge', 'Mail for verification'],
  },
  {
    id: 'nsoc',
    name: "Open Source Contributor | NSOC'26",
    org: 'Nexus Spring of Code',
    orgShort: 'NSOC',
    dates: 'Apr 2026 – May 2026',
    category: 'OPEN SOURCE',
    description: "Open-source contributor through NSOC'26.",
    status: 'Completed',
    featured: true,
    media: ['Tech contributor badge'],
  },
  {
    id: 'osc-oscg',
    name: "Open Source Contributor | OSCG'26",
    org: 'Open Source Connect',
    orgShort: 'OSCG',
    dates: 'Apr 2026 – May 2026',
    category: 'OPEN SOURCE',
    description: "Open-source contributor through OSCG'26.",
    status: 'Completed',
    featured: true,
    media: ['Contributor badge'],
  },
  {
    id: 'osc-osci',
    name: 'Open Source Contributor (OSCI)',
    org: 'Open Source Connect',
    orgShort: 'OSCI',
    dates: 'Aug 2026 – Present',
    category: 'OPEN SOURCE',
    description:
      'Contributing to open-source projects, collaborating with developers on community-driven software development.',
    status: 'Present',
    featured: false,
    media: ['Badge'],
  },

  // ── CAMPUS / COMMUNITY ──
  {
    id: 'google',
    name: 'Google Student Ambassador',
    org: 'Google',
    orgShort: 'Google',
    dates: 'Apr 2026 – Present',
    category: 'CAMPUS / COMMUNITY',
    description:
      'Selected as a Google Student Ambassador and participated in the program as a student representative.',
    status: 'Present',
    featured: true,
    media: ['Mail from Google', 'Top prompt creator'],
  },
  {
    id: 'hackerrank',
    name: 'HackerRank Campus Crew',
    org: 'HackerRank',
    orgShort: 'HackerRank',
    dates: 'Jul 2026 – Present',
    category: 'CAMPUS / COMMUNITY',
    description:
      "Selected after a competitive interview process to represent HackerRank at PCET's NMIET, promoting coding culture, challenges, and peer learning.",
    status: 'Present',
    featured: true,
  },
  {
    id: 'remoterecruit',
    name: 'Campus Ambassador',
    org: 'RemoteRecruit',
    orgShort: 'RemoteRecruit',
    dates: 'Aug 2026 – Present',
    category: 'CAMPUS / COMMUNITY',
    description:
      'Selected as a Campus Ambassador representing RemoteRecruit, supporting student awareness, networking, and outreach.',
    status: 'Present',
    featured: false,
    media: ['Offer letter'],
  },
  {
    id: 'pw',
    name: 'Campus Ambassador',
    org: 'PW (PhysicsWallah)',
    orgShort: 'PW',
    dates: 'Feb 2026 – Present',
    category: 'CAMPUS / COMMUNITY',
    description: 'Representing PhysicsWallah student community and campus opportunity initiatives.',
    status: 'Present',
    featured: false,
  },
  {
    id: 'mygov-ca',
    name: 'MyGov Campus Ambassador',
    org: 'MyGov India',
    orgShort: 'MyGov',
    dates: 'Dec 2025 – Apr 2026',
    category: 'CAMPUS / COMMUNITY',
    description: 'MyGov campus ambassador role.',
    status: 'Completed',
    featured: false,
    media: ['Confirmation certificate'],
  },
  {
    id: 'imun',
    name: 'Campus Ambassador',
    org: 'International MUN',
    orgShort: 'IMUN',
    dates: 'Jan 2026 – Apr 2026',
    category: 'CAMPUS / COMMUNITY',
    description:
      "Represented my college PCET'S NMIET on an international platform, acting as a bridge between the institution and global stakeholders.",
    recognition: 'International Representative, NMIET 🌐',
    status: 'Completed',
    featured: true,
    media: ['Offer letter'],
  },
  {
    id: 'hcl-guvi',
    name: 'Campus Ambassador — AI Impact Summit',
    org: 'HCL GUVI',
    orgShort: 'GUVI',
    dates: 'Oct 2025 – Mar 2026',
    category: 'CAMPUS / COMMUNITY',
    description: 'Coordinated and managed participation in a national-level AI event.',
    status: 'Completed',
    featured: true,
    media: ['Certificate of recognition'],
  },
  {
    id: 'cognizance-iitr',
    name: 'Campus Ambassador',
    org: 'Cognizance, IIT Roorkee',
    orgShort: 'IIT Roorkee',
    dates: 'Jan 2026 – Feb 2026',
    category: 'CAMPUS / COMMUNITY',
    description: 'Appointed as Campus Ambassador for Cognizance 2026 at IIT Roorkee.',
    status: 'Completed',
    featured: true,
    media: ['Offer Letter'],
  },
  {
    id: 'gssoc-ambassador',
    name: 'Ambassador',
    org: 'GirlScript Summer of Code',
    orgShort: 'GSSOC',
    dates: 'May 2026 – Jun 2026',
    category: 'CAMPUS / COMMUNITY',
    description: 'Served as ambassador for the GirlScript Summer of Code program.',
    status: 'Completed',
    featured: false,
    media: ['Ambassador badge'],
  },

  // ── RECOGNITION / PROGRAMS ──
  {
    id: 'mygov-changemaker',
    name: 'Changemaker',
    org: 'MyGov India',
    orgShort: 'MyGov',
    dates: 'Mar 2026 – Present',
    category: 'RECOGNITION / PROGRAMS',
    description: 'Received the Changemaker Badge on MyGov.',
    status: 'Present',
    featured: true,
    media: ['Badge'],
  },
  {
    id: 'guesss-top30',
    name: 'Participant — Top 30 National Immersion Program',
    org: 'GUESSS India',
    orgShort: 'GUESSS India',
    dates: 'Dec 2025 – Jan 2026',
    category: 'RECOGNITION / PROGRAMS',
    description:
      'Selected among the Top 30 campus ambassadors nationally representing my college at IIT Mandi.',
    status: 'Completed',
    featured: true,
    media: ['Mail of confirmation'],
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
