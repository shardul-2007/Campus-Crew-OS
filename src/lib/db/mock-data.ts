import {
  Profile,
  College,
  EventTypeItem,
  EventRecord,
  EventStage,
  EventTeamMember,
  EventChecklist,
  ContestDetails,
  HackathonDetails,
  WorkshopDetails,
  EventParticipant,
  EventWinner,
  EventProof,
  EventReport,
  EventFeedback,
  EventPromotion,
  Certificate,
  RewardSubmission,
  RewardPolicy,
  MonthlyGoal,
  CommunityMetric,
  NotificationItem,
  EventComment,
  AuditLog,
  EventImprovement,
  Announcement
} from '@/types/database';

export const INITIAL_COLLEGES: College[] = [
  { id: 'col-1', name: 'Indian Institute of Technology, Bombay', city: 'Mumbai', state: 'Maharashtra', country: 'India', website: 'https://www.iitb.ac.in', is_active: true, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' },
  { id: 'col-2', name: 'College of Engineering, Pune (COEP)', city: 'Pune', state: 'Maharashtra', country: 'India', website: 'https://www.coep.org.in', is_active: true, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' },
  { id: 'col-3', name: 'BITS Pilani', city: 'Pilani', state: 'Rajasthan', country: 'India', website: 'https://www.bits-pilani.ac.in', is_active: true, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' },
  { id: 'col-4', name: 'National Institute of Technology, Trichy', city: 'Tiruchirappalli', state: 'Tamil Nadu', country: 'India', website: 'https://www.nitt.edu', is_active: true, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' },
  { id: 'col-5', name: 'Delhi Technological University (DTU)', city: 'New Delhi', state: 'Delhi', country: 'India', website: 'https://www.dtu.ac.in', is_active: true, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' },
  { id: 'col-6', name: 'Vellore Institute of Technology (VIT)', city: 'Vellore', state: 'Tamil Nadu', country: 'India', website: 'https://vit.ac.in', is_active: true, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' },
  { id: 'col-7', name: 'International Institute of Information Technology (IIIT)', city: 'Hyderabad', state: 'Telangana', country: 'India', website: 'https://www.iiit.ac.in', is_active: true, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' },
  { id: 'col-8', name: 'RV College of Engineering', city: 'Bengaluru', state: 'Karnataka', country: 'India', website: 'https://www.rvce.edu.in', is_active: true, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' },
  { id: 'col-9', name: 'PSG College of Technology', city: 'Coimbatore', state: 'Tamil Nadu', country: 'India', website: 'https://www.psgtech.edu', is_active: true, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' },
  { id: 'col-10', name: 'Manipal Institute of Technology', city: 'Manipal', state: 'Karnataka', country: 'India', website: 'https://manipal.edu/mit.html', is_active: true, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' },
  { id: 'col-11', name: 'Jadavpur University', city: 'Kolkata', state: 'West Bengal', country: 'India', website: 'http://www.jaduniv.edu.in', is_active: true, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' },
  { id: 'col-12', name: 'Thapar Institute of Engineering and Technology', city: 'Patiala', state: 'Punjab', country: 'India', website: 'https://www.thapar.edu', is_active: true, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' },
  { id: 'col-13', name: 'Pune Institute of Computer Technology (PICT)', city: 'Pune', state: 'Maharashtra', country: 'India', website: 'https://pict.edu', is_active: true, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' },
  { id: 'col-14', name: 'SRM Institute of Science and Technology', city: 'Chennai', state: 'Tamil Nadu', country: 'India', website: 'https://www.srmist.edu.in', is_active: true, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' },
  { id: 'col-15', name: 'Birla Institute of Technology, Mesra', city: 'Ranchi', state: 'Jharkhand', country: 'India', website: 'https://www.bitmesra.ac.in', is_active: true, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z' },
];

export const INITIAL_EVENT_TYPES: EventTypeItem[] = [
  { id: 'type-1', name: 'Coding Contest', slug: 'coding_contest', description: 'Timed algorithmic problem solving on HRW or HRC', min_lead_time_days: 7, is_active: true },
  { id: 'type-2', name: 'DSA Assessment', slug: 'dsa_test', description: 'Core Data Structures & Algorithms diagnostic test', min_lead_time_days: 5, is_active: true },
  { id: 'type-3', name: 'MCQ Skill Challenge', slug: 'mcq_test', description: 'Multiple-choice CS concepts & aptitude test', min_lead_time_days: 3, is_active: true },
  { id: 'type-4', name: 'Debugging Test', slug: 'debugging_test', description: 'Finding and fixing logical bugs in existing codebases', min_lead_time_days: 5, is_active: true },
  { id: 'type-5', name: 'Development Challenge', slug: 'development_challenge', description: 'Building practical features or end-to-end components', min_lead_time_days: 10, is_active: true },
  { id: 'type-6', name: 'Hackathon', slug: 'hackathon', description: 'Multi-hour collaborative sprint to build prototype solutions', min_lead_time_days: 14, is_active: true },
  { id: 'type-7', name: 'Codeathon', slug: 'codeathon', description: 'Intense competitive coding marathon', min_lead_time_days: 10, is_active: true },
  { id: 'type-8', name: 'Technical Workshop', slug: 'workshop', description: 'Hands-on guided walkthrough of tools and frameworks', min_lead_time_days: 7, is_active: true },
  { id: 'type-9', name: 'Skill Bootcamp', slug: 'bootcamp', description: 'Multi-day progressive structured coding curriculum', min_lead_time_days: 14, is_active: true },
  { id: 'type-10', name: 'Tech Talk', slug: 'tech_talk', description: 'Expert-led lecture discussing tech stack architectures', min_lead_time_days: 5, is_active: true },
  { id: 'type-11', name: 'Industry Session', slug: 'industry_session', description: 'Career guidance & industry hiring trends session', min_lead_time_days: 7, is_active: true },
  { id: 'type-12', name: 'Tech Quiz', slug: 'quiz', description: 'Fast-paced technical trivia and rapid-fire questions', min_lead_time_days: 3, is_active: true },
  { id: 'type-13', name: 'Community Meetup', slug: 'community_meetup', description: 'Informal campus gathering for peer learning & networking', min_lead_time_days: 5, is_active: true },
  { id: 'type-14', name: 'Mock Interview Sprint', slug: 'mock_interview', description: 'Simulated technical interview practice with peers', min_lead_time_days: 7, is_active: true },
  { id: 'type-15', name: 'Inter-College Competition', slug: 'inter_college_competition', description: 'Cross-campus competitive coding tournament', min_lead_time_days: 14, is_active: true },
  { id: 'type-16', name: 'Special Initiative', slug: 'other', description: 'Custom approved community activation', min_lead_time_days: 7, is_active: true },
];

export const INITIAL_PROFILES: Profile[] = [
  // Demo Crew Member
  {
    id: 'user-crew-1',
    crew_code: 'CREW-0001',
    full_name: 'Shardul Patel',
    email: 'crew@example.com',
    phone: '+91 98765 43210',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    college_id: 'col-2',
    college_name: 'College of Engineering, Pune (COEP)',
    course: 'B.Tech Computer Engineering',
    graduation_year: 2027,
    city: 'Pune',
    state: 'Maharashtra',
    bio: 'Lead Campus Crew Ambassador at COEP. Passionate about competitive programming, open source, and campus developer communities.',
    linkedin_url: 'https://linkedin.com/in/shardul-patel',
    github_url: 'https://github.com/shardul-patel',
    role: 'crew_member',
    is_active: true,
    created_at: '2026-01-15T00:00:00Z',
    updated_at: '2026-10-01T00:00:00Z'
  },
  // Demo Analyst
  {
    id: 'user-analyst-1',
    crew_code: 'ANL-0001',
    full_name: 'Priya Nair',
    email: 'analyst@example.com',
    phone: '+91 98765 11223',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    college_id: 'col-8',
    college_name: 'RV College of Engineering',
    course: 'Alumni / Community Operations',
    graduation_year: 2023,
    city: 'Bengaluru',
    state: 'Karnataka',
    bio: 'Operations and Growth Analyst. Monitoring proof verification, quality standards, and college performance metrics across India.',
    linkedin_url: 'https://linkedin.com/in/priya-nair-campus',
    github_url: 'https://github.com/priyanair',
    role: 'analyst',
    is_active: true,
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-10-01T00:00:00Z'
  },
  // Demo Admin
  {
    id: 'user-admin-1',
    crew_code: 'ADM-0001',
    full_name: 'Aditya Verma',
    email: 'admin@example.com',
    phone: '+91 99887 76655',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    college_id: 'col-1',
    college_name: 'Indian Institute of Technology, Bombay',
    course: 'Program Director',
    graduation_year: 2020,
    city: 'Mumbai',
    state: 'Maharashtra',
    bio: 'System Administrator and National Program Lead for Campus Crew Operations.',
    linkedin_url: 'https://linkedin.com/in/aditya-verma-lead',
    github_url: 'https://github.com/adityaverma',
    role: 'admin',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-01T00:00:00Z'
  },
  // Additional Analysts (4 more to total 5)
  {
    id: 'user-analyst-2',
    crew_code: 'ANL-0002',
    full_name: 'Rohan Deshmukh',
    email: 'rohan.analyst@campuscrew.org',
    role: 'analyst',
    city: 'Pune',
    state: 'Maharashtra',
    is_active: true,
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-10-01T00:00:00Z'
  },
  {
    id: 'user-analyst-3',
    crew_code: 'ANL-0003',
    full_name: 'Ananya Sharma',
    email: 'ananya.analyst@campuscrew.org',
    role: 'analyst',
    city: 'Delhi',
    state: 'Delhi',
    is_active: true,
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-10-01T00:00:00Z'
  },
  {
    id: 'user-analyst-4',
    crew_code: 'ANL-0004',
    full_name: 'Karthik Raja',
    email: 'karthik.analyst@campuscrew.org',
    role: 'analyst',
    city: 'Chennai',
    state: 'Tamil Nadu',
    is_active: true,
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-10-01T00:00:00Z'
  },
  {
    id: 'user-analyst-5',
    crew_code: 'ANL-0005',
    full_name: 'Sneha Kulkarni',
    email: 'sneha.analyst@campuscrew.org',
    role: 'analyst',
    city: 'Hyderabad',
    state: 'Telangana',
    is_active: true,
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-10-01T00:00:00Z'
  },
  // 29 additional crew members (total 30)
  ...Array.from({ length: 29 }, (_, i) => {
    const num = i + 2;
    const names = [
      'Aarav Gupta', 'Ishaan Sengupta', 'Meera Iyer', 'Tanvi Joshi', 'Devansh Roy',
      'Diya Sundaram', 'Kabir Mehta', 'Aanya Agarwal', 'Rishi Mukherjee', 'Kavya Pillai',
      'Arjun Reddy', 'Nisha Trivedi', 'Siddharth Rao', 'Pooja Bhatt', 'Manish Chawla',
      'Ritika Sen', 'Harsh Vardhan', 'Shreya Saxena', 'Vikramaditya Nair', 'Neha Bansal',
      'Gaurav Soni', 'Swati Hegde', 'Abhinav Kapoor', 'Ankita Ghosh', 'Pranav Menon',
      'Simran Kaur', 'Yash Singhal', 'Vidya Venkatesh', 'Kunal Tiwari'
    ];
    const name = names[i] || `Campus Ambassador ${num}`;
    const collegeId = `col-${(i % 15) + 1}`;
    const collegeName = INITIAL_COLLEGES[(i % 15)].name;
    const cities = ['Mumbai', 'Pune', 'Bengaluru', 'Delhi', 'Hyderabad', 'Chennai', 'Kolkata'];
    const city = cities[i % cities.length];
    return {
      id: `user-crew-${num}`,
      crew_code: `CREW-${String(num).padStart(4, '0')}`,
      full_name: name,
      email: `crew${num}@campuscrew.org`,
      phone: `+91 98${num}00 11${num}0`,
      avatar_url: `https://images.unsplash.com/photo-${1500000000000 + i}?w=150`,
      college_id: collegeId,
      college_name: collegeName,
      course: 'B.Tech / B.E.',
      graduation_year: 2026 + (i % 3),
      city: city,
      state: INITIAL_COLLEGES[(i % 15)].state,
      bio: `Campus Crew Ambassador representing ${collegeName}. Building student tech ecosystem.`,
      role: 'crew_member' as const,
      is_active: true,
      created_at: '2026-02-01T00:00:00Z',
      updated_at: '2026-10-01T00:00:00Z'
    };
  })
];

export const INITIAL_REWARD_POLICIES: RewardPolicy[] = [
  {
    id: 'r-1',
    name: 'Campus Season Standard Policy (2026)',
    description: 'Current active reward terms: HackerRank certificates and verified digital rewards for top rankers in verified contests meeting the 50+ participant threshold.',
    participant_threshold: 50,
    benefits: {
      tier1_rank1: 'HackerRank Gold Certificate + Elite Swag Pack',
      tier1_rank2: 'HackerRank Silver Certificate + Branded Swag Pack',
      tier1_rank3: 'HackerRank Bronze Certificate + Tech Sticker Kit',
      swag_distributed: true,
      additional_notes: 'Must verify HackerRank registered emails before reward submission to program manager.'
    },
    is_active: true,
    effective_from: '2026-01-01',
    effective_until: '2026-12-31',
    created_at: '2026-01-01T00:00:00Z'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'October 2026 Monthly Event Target Reminder',
    content: 'Reminder to all Campus Crew Ambassadors: Every college chapter is expected to host at least one HackerRank-platform event (HRW or fallback HRC) this month. SkillUp may be used for learning, but event contests must be hosted on HRW/HRC.',
    target_role: 'crew_member',
    priority: 'high',
    published_at: '2026-10-01T08:00:00Z',
    created_by: 'user-admin-1',
    created_by_name: 'Aditya Verma',
    created_at: '2026-10-01T08:00:00Z'
  },
  {
    id: 'ann-2',
    title: 'Responsible Data Handling Notice for Participant Emails',
    content: 'Please ensure participant emails and private contact numbers are strictly guarded and uploaded only via designated Proof & Winner verification tables. Do not share raw participant lists publicly.',
    target_role: 'all',
    priority: 'normal',
    published_at: '2026-09-25T10:00:00Z',
    created_by: 'user-analyst-1',
    created_by_name: 'Priya Nair',
    created_at: '2026-09-25T10:00:00Z'
  }
];

export const INITIAL_MONTHLY_GOALS: MonthlyGoal[] = [
  {
    id: 'goal-1',
    user_id: 'user-crew-1',
    user_name: 'Shardul Patel',
    month: '2026-10-01',
    target_events: 1,
    completed_events: 1,
    participants_reached: 126,
    status: 'on_track',
    created_at: '2026-10-01T00:00:00Z',
    updated_at: '2026-10-05T00:00:00Z'
  },
  {
    id: 'goal-2',
    user_id: 'user-crew-2',
    user_name: 'Aarav Gupta',
    month: '2026-10-01',
    target_events: 1,
    completed_events: 0,
    participants_reached: 0,
    status: 'at_risk',
    created_at: '2026-10-01T00:00:00Z',
    updated_at: '2026-10-05T00:00:00Z'
  }
];

// Helper to generate 50 realistic events
export function generateInitialEvents(): {
  events: EventRecord[];
  stages: EventStage[];
  team: EventTeamMember[];
  checklists: EventChecklist[];
  contestDetails: ContestDetails[];
  hackathonDetails: HackathonDetails[];
  workshopDetails: WorkshopDetails[];
  participants: EventParticipant[];
  winners: EventWinner[];
  proofs: EventProof[];
  reports: EventReport[];
  feedback: EventFeedback[];
  promotions: EventPromotion[];
  certificates: Certificate[];
  rewards: RewardSubmission[];
  comments: EventComment[];
  auditLogs: AuditLog[];
  improvements: EventImprovement[];
} {
  const events: EventRecord[] = [];
  const stages: EventStage[] = [];
  const team: EventTeamMember[] = [];
  const checklists: EventChecklist[] = [];
  const contestDetails: ContestDetails[] = [];
  const hackathonDetails: HackathonDetails[] = [];
  const workshopDetails: WorkshopDetails[] = [];
  const participants: EventParticipant[] = [];
  const winners: EventWinner[] = [];
  const proofs: EventProof[] = [];
  const reports: EventReport[] = [];
  const feedback: EventFeedback[] = [];
  const promotions: EventPromotion[] = [];
  const certificates: Certificate[] = [];
  const rewards: RewardSubmission[] = [];
  const comments: EventComment[] = [];
  const auditLogs: AuditLog[] = [];
  const improvements: EventImprovement[] = [];

  const ALL_STATUSES: EventRecord['status'][] = [
    'draft', 'submitted', 'under_review', 'changes_requested', 'approved',
    'scheduled', 'live', 'completed', 'proof_pending', 'verification_pending',
    'verified', 'rejected', 'cancelled'
  ];

  const LIFECYCLE_STAGES: EventStage['stage'][] = [
    'IDEA', 'PLAN', 'BUILD', 'TEST', 'PROMOTE', 'EXECUTE', 'EVALUATE', 'REWARD', 'DOCUMENT', 'IMPROVE'
  ];

  // Specific canonical event 1: CodeRush 2026 (ACT-2026-00042) requested in prompt
  const mainEventId = 'ev-main-42';
  const mainEvent: EventRecord = {
    id: mainEventId,
    event_code: 'ACT-2026-00042',
    created_by: 'user-crew-1',
    created_by_name: 'Shardul Patel',
    created_by_email: 'crew@example.com',
    title: 'CodeRush 2026',
    event_type_id: 'type-1',
    event_type_name: 'Coding Contest',
    objective: 'College-wide competitive coding sprint targeting DSA and algorithmic problem solving.',
    description: 'Premier annual contest on HackerRank Work (HRW) assessing Trees, Dynamic Programming, Graphs, and Math algorithms across all engineering branches.',
    status: 'live',
    lifecycle_stage: 'EXECUTE',
    start_date: '2026-10-05T14:00:00Z',
    end_date: '2026-10-05T17:00:00Z',
    mode: 'online',
    venue: 'Computer Center Lab 4 & Virtual HRW',
    college_id: 'col-2',
    college_name: 'College of Engineering, Pune (COEP)',
    expected_participants: 120,
    registration_url: 'https://forms.campuscrew.org/coderush-2026',
    event_url: 'https://hrw.hackerrank.com/tests/coderush-2026-coep',
    platform: 'HRW',
    actual_registrations: 126,
    actual_participants: 94,
    completed_submissions: 70,
    completion_rate: 74.5,
    documentation_score: 85,
    risk_level: 'LOW',
    created_at: '2026-09-15T10:00:00Z',
    updated_at: '2026-10-05T11:42:00Z'
  };
  events.push(mainEvent);

  // Contest details for CodeRush
  contestDetails.push({
    id: 'cd-main-42',
    event_id: mainEventId,
    platform: 'HRW',
    contest_url: 'https://hrw.hackerrank.com/tests/coderush-2026-coep',
    difficulty: 'Intermediate',
    duration_minutes: 180,
    question_count: 5,
    registration_count: 126,
    submission_count: 70,
    completion_rate: 74.5,
    leaderboard_url: 'https://hrw.hackerrank.com/tests/coderush-2026-coep/leaderboard',
    created_at: '2026-09-15T10:00:00Z',
    updated_at: '2026-10-05T11:42:00Z'
  });

  // Stages for CodeRush
  LIFECYCLE_STAGES.forEach((st, idx) => {
    let sStatus: EventStage['status'] = 'locked';
    if (idx < 5) sStatus = 'completed';
    else if (idx === 5) sStatus = 'in_progress'; // EXECUTE
    else if (idx === 6) sStatus = 'available';

    stages.push({
      id: `stage-main-${idx}`,
      event_id: mainEventId,
      stage: st,
      status: sStatus,
      started_at: idx <= 5 ? '2026-09-15T10:00:00Z' : undefined,
      completed_at: idx < 5 ? '2026-10-04T18:00:00Z' : undefined,
      completed_by: idx < 5 ? 'user-crew-1' : undefined,
      notes: idx === 5 ? 'Contest is currently running. Real-time test telemetry being monitored.' : `Stage ${st} validated.`,
      created_at: '2026-09-15T10:00:00Z'
    });
  });

  // Team members for CodeRush
  team.push(
    { id: 'tm-1', event_id: mainEventId, user_id: 'user-crew-1', user_name: 'Shardul Patel', user_email: 'crew@example.com', role: 'campus_crew_lead', responsibilities: 'Overall event owner, liaison with university authorities & platform scheduling.', created_at: '2026-09-15T10:00:00Z' },
    { id: 'tm-2', event_id: mainEventId, user_id: 'user-crew-2', user_name: 'Aarav Gupta', user_email: 'crew2@campuscrew.org', role: 'technical_lead', responsibilities: 'HRW test curation, test case verification, and live problem clarifications.', created_at: '2026-09-15T10:00:00Z' },
    { id: 'tm-3', event_id: mainEventId, user_id: 'user-crew-3', user_name: 'Ishaan Sengupta', user_email: 'crew3@campuscrew.org', role: 'outreach_marketing', responsibilities: 'Social media broadcasts, classroom flyers, and WhatsApp group announcements.', created_at: '2026-09-15T10:00:00Z' },
    { id: 'tm-4', event_id: mainEventId, user_id: 'user-crew-4', user_name: 'Meera Iyer', user_email: 'crew4@campuscrew.org', role: 'documentation', responsibilities: 'Evidence capture, attendance cross-referencing, and post-event reporting.', created_at: '2026-09-15T10:00:00Z' }
  );

  // Checklists for CodeRush
  const checklistItems: Array<{ cat: EventChecklist['category']; item: string; done: boolean; req: boolean }> = [
    { cat: 'planning', item: 'Event format & objectives defined', done: true, req: true },
    { cat: 'platform', item: 'Platform configured (HRW test drafted)', done: true, req: true },
    { cat: 'platform', item: 'Test cases and questions tested by tech lead', done: true, req: true },
    { cat: 'planning', item: 'Organizing team assigned and notified', done: true, req: true },
    { cat: 'promotion', item: 'Promotion launched across college channels (T-7 / T-3)', done: true, req: true },
    { cat: 'promotion', item: 'Final reminder sent to registered students (T-1)', done: true, req: false },
    { cat: 'execution', item: 'Event live and HRW contest monitoring active', done: true, req: true },
    { cat: 'post_event', item: 'Leaderboard reviewed and finalized', done: false, req: true },
    { cat: 'reward', item: 'Winner details verified against student registry', done: false, req: true },
    { cat: 'documentation', item: 'Event report and proof submission filed', done: false, req: true }
  ];
  checklistItems.forEach((chk, cIdx) => {
    checklists.push({
      id: `chk-main-${cIdx}`,
      event_id: mainEventId,
      category: chk.cat,
      item: chk.item,
      is_required: chk.req,
      is_completed: chk.done,
      completed_by: chk.done ? 'user-crew-1' : undefined,
      completed_at: chk.done ? '2026-10-04T12:00:00Z' : undefined
    });
  });

  // Proofs for CodeRush
  proofs.push(
    {
      id: 'prf-main-1',
      event_id: mainEventId,
      uploaded_by: 'user-crew-1',
      uploaded_by_name: 'Shardul Patel',
      proof_type: 'event_photo',
      file_path: 'event-proofs/coderush-lab-session-1.jpg',
      file_name: 'coderush-lab-session-1.jpg',
      mime_type: 'image/jpeg',
      file_size: 2450000,
      description: 'Computer Center Lab 4 with students competing in CodeRush 2026.',
      verification_status: 'approved',
      reviewed_by: 'user-analyst-1',
      reviewed_by_name: 'Priya Nair',
      reviewed_at: '2026-10-05T15:00:00Z',
      review_comment: 'Clear lab picture with college banner and active coding sessions.',
      created_at: '2026-10-05T14:30:00Z'
    },
    {
      id: 'prf-main-2',
      event_id: mainEventId,
      uploaded_by: 'user-crew-1',
      uploaded_by_name: 'Shardul Patel',
      proof_type: 'contest_dashboard',
      file_path: 'event-proofs/hrw-dashboard-overview.png',
      file_name: 'hrw-dashboard-overview.png',
      mime_type: 'image/png',
      file_size: 1820000,
      description: 'HackerRank Work admin dashboard showing 94 active test takers and question submission metrics.',
      verification_status: 'approved',
      reviewed_by: 'user-analyst-1',
      reviewed_by_name: 'Priya Nair',
      reviewed_at: '2026-10-05T15:10:00Z',
      review_comment: 'Telemetry matches actual test registration figures.',
      created_at: '2026-10-05T14:45:00Z'
    },
    {
      id: 'prf-main-3',
      event_id: mainEventId,
      uploaded_by: 'user-crew-1',
      uploaded_by_name: 'Shardul Patel',
      proof_type: 'poster',
      file_path: 'event-proofs/coderush-promotional-poster.png',
      file_name: 'coderush-promotional-poster.png',
      mime_type: 'image/png',
      file_size: 3100000,
      description: 'Official approved promotional poster distributed across campus notices.',
      verification_status: 'approved',
      reviewed_by: 'user-analyst-1',
      reviewed_by_name: 'Priya Nair',
      reviewed_at: '2026-10-01T12:00:00Z',
      review_comment: 'Official branding compliance confirmed.',
      created_at: '2026-09-28T10:00:00Z'
    }
  );

  // Participants for CodeRush
  const sampleParticipants = [
    { name: 'Aakash Verma', email: 'aakash.v@coep.ac.in', rank: 1, dep: 'Computer Engineering', year: '3rd Year' as const },
    { name: 'Sanjana Kulkarni', email: 'sanjana.k@coep.ac.in', rank: 2, dep: 'IT', year: '3rd Year' as const },
    { name: 'Rohan Joshi', email: 'rohan.j@coep.ac.in', rank: 3, dep: 'Computer Engineering', year: '2nd Year' as const },
    { name: 'Neha Deshmukh', email: 'neha.d@coep.ac.in', rank: 4, dep: 'Electronics & Telecom', year: '3rd Year' as const },
    { name: 'Vignesh Sundaram', email: 'vignesh.s@coep.ac.in', rank: 5, dep: 'Computer Engineering', year: '4th Year' as const }
  ];

  sampleParticipants.forEach((p, pIdx) => {
    const pId = `part-main-${pIdx + 1}`;
    participants.push({
      id: pId,
      event_id: mainEventId,
      name: p.name,
      hacker_rank_email: p.email,
      email_verified: true,
      registration_status: 'attended',
      submission_status: 'completed',
      department: p.dep,
      academic_year: p.year,
      college_name: 'College of Engineering, Pune (COEP)',
      joined_at: '2026-10-05T14:05:00Z',
      created_at: '2026-09-25T11:00:00Z'
    });

    if (p.rank <= 3) {
      const wId = `win-main-${p.rank}`;
      winners.push({
        id: wId,
        event_id: mainEventId,
        participant_id: pId,
        name: p.name,
        rank: p.rank,
        hacker_rank_email: p.email,
        email_verified: true,
        identity_verified: true,
        reward_status: p.rank === 1 ? 'ready_to_submit' : 'verified',
        submitted_to_program_manager_at: undefined,
        activated_at: undefined,
        notes: `Top scorer with ${500 - (p.rank - 1) * 30}/500 score and fast completion time.`,
        created_at: '2026-10-05T16:00:00Z',
        updated_at: '2026-10-05T16:00:00Z'
      });
    }
  });

  // Feedback for CodeRush
  feedback.push(
    { id: 'fb-1', event_id: mainEventId, rating: 5, what_went_well: 'Great test platform stability on HRW and engaging problem statements!', improvements: 'Maybe include a mock warm-up contest 2 days prior.', submitted_by: 'user-crew-2', submitted_by_name: 'Aarav Gupta', created_at: '2026-10-05T17:15:00Z' },
    { id: 'fb-2', event_id: mainEventId, rating: 4, what_went_well: 'Problem difficulty balanced between intermediate DP and graphs.', improvements: 'More lab terminals requested next time.', submitted_by: 'user-crew-3', submitted_by_name: 'Ishaan Sengupta', created_at: '2026-10-05T17:20:00Z' }
  );

  // Promotions for CodeRush
  promotions.push(
    { id: 'promo-1', event_id: mainEventId, channel: 'linkedin', scheduled_at: '2026-09-28T09:00:00Z', published_at: '2026-09-28T09:10:00Z', post_url: 'https://linkedin.com/posts/coderush-2026', reach: 3400, likes: 210, comments: 34, shares: 18, status: 'published', created_at: '2026-09-25T10:00:00Z' },
    { id: 'promo-2', event_id: mainEventId, channel: 'whatsapp', scheduled_at: '2026-10-02T10:00:00Z', published_at: '2026-10-02T10:05:00Z', post_url: 'https://chat.whatsapp.com/coep-crew', reach: 1800, likes: 0, comments: 0, shares: 0, status: 'published', created_at: '2026-10-02T10:00:00Z' },
    { id: 'promo-3', event_id: mainEventId, channel: 'instagram', scheduled_at: '2026-10-04T12:00:00Z', published_at: '2026-10-04T12:15:00Z', post_url: 'https://instagram.com/p/coderush26', reach: 2200, likes: 310, comments: 45, shares: 25, status: 'published', created_at: '2026-10-04T10:00:00Z' }
  );

  // Comments for CodeRush
  comments.push(
    { id: 'cmt-1', event_id: mainEventId, author_id: 'user-analyst-1', author_name: 'Priya Nair', author_role: 'analyst', comment: 'Contest proposal looks stellar. Verified HRW assessment link and team assignments. Approved!', is_internal: false, created_at: '2026-10-01T11:42:00Z' },
    { id: 'cmt-2', event_id: mainEventId, author_id: 'user-crew-1', author_name: 'Shardul Patel', author_role: 'crew_member', comment: 'Thank you Priya! Promotion launched and we have already crossed 120 registrations.', is_internal: false, created_at: '2026-10-02T09:15:00Z' }
  );

  // Audit Log for CodeRush
  auditLogs.push(
    { id: 'aud-1', actor_id: 'user-crew-1', actor_name: 'Shardul Patel', actor_email: 'crew@example.com', action: 'Created Event Proposal', entity_type: 'event', entity_id: mainEventId, new_values: { title: 'CodeRush 2026', code: 'ACT-2026-00042' }, created_at: '2026-09-15T10:00:00Z' },
    { id: 'aud-2', actor_id: 'user-analyst-1', actor_name: 'Priya Nair', actor_email: 'analyst@example.com', action: 'Approved Event', entity_type: 'event', entity_id: mainEventId, old_values: { status: 'submitted' }, new_values: { status: 'approved' }, created_at: '2026-10-01T11:42:00Z' },
    { id: 'aud-3', actor_id: 'user-crew-1', actor_name: 'Shardul Patel', actor_email: 'crew@example.com', action: 'Transitioned to LIVE', entity_type: 'event', entity_id: mainEventId, old_values: { status: 'scheduled' }, new_values: { status: 'live' }, created_at: '2026-10-05T14:00:00Z' }
  );

  // Now generate remaining 49 events across all types, colleges, and statuses!
  const titles = [
    'Algorithmic Ascent', 'Bits & Bytes Hackathon', 'Graph Theory Deep Dive', 'Full Stack Forge',
    'Bug Bounty Blitz', 'Data Structures Diagnostic', 'Python for CP Workshop', 'Cloud Native Codeathon',
    'System Design Fundamentals', 'Code Combat Inter-College', 'Junior Dev MCQ Sprint', 'Mock Tech Interview Drive',
    'Fast Track Recursion', 'HackerRank Campus League', 'CyberSec Capture The Flag', 'API Engineering Bootcamp',
    'Open Source Contribution Sprint', 'Dynamic Programming Demystified', 'Tree Traversal Tournament',
    'Freshers Coding Challenge', 'Competitive Java Masters', 'Winter Code Blitz', 'Algorithm Arena',
    'Front-End UI Challenge', 'Backend Microservices Sprint', 'SQL & Database Design Sprint',
    'HackerRank Placement Prep 101', 'Women in Tech Hackathon', 'Low-Level Design Workshop', 'Android Dev Sprint',
    'Binary Search Marathon', 'Greedy Algorithms Workshop', 'Bit Manipulation Challenge', 'Senior Batch Exit Contest',
    'Campus Coders League Q3', 'Hack-The-Campus 2026', 'CodeCraft Invitational', 'DevOps & CI/CD Hands-on',
    'Machine Learning Foundations', 'Blockchain Smart Contract Lab', 'Campus Coding Premier League',
    'Summer Codefest', 'Core CS Fundamentals Quiz', 'Tech Career Roadmap Talk', 'Campus HackSprint',
    'LeetCode to HackerRank Bridge', 'Object Oriented Design Sprint', 'Speed Debugging Cup', 'Night Owl Codeathon'
  ];

  titles.forEach((title, idx) => {
    const eNum = idx + 1;
    const eCode = `ACT-2026-${String(eNum).padStart(5, '0')}`;
    const eId = `ev-${eNum}`;
    const typeIdx = idx % INITIAL_EVENT_TYPES.length;
    const eventType = INITIAL_EVENT_TYPES[typeIdx];
    const college = INITIAL_COLLEGES[idx % INITIAL_COLLEGES.length];
    const status = ALL_STATUSES[idx % ALL_STATUSES.length];
    const crewMember = INITIAL_PROFILES[idx % 25];

    // Dates spread from July 2026 to November 2026
    const month = 7 + (idx % 4); // 7=July, 8=Aug, 9=Sept, 10=Oct
    const day = (idx % 26) + 1;
    const dateStr = `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T10:00:00Z`;
    const endDateStr = `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T13:00:00Z`;

    let stageIdx = 0;
    if (status === 'draft') stageIdx = 1;
    else if (status === 'submitted' || status === 'under_review') stageIdx = 2;
    else if (status === 'approved' || status === 'scheduled') stageIdx = 4;
    else if (status === 'live') stageIdx = 5;
    else if (status === 'completed' || status === 'proof_pending') stageIdx = 6;
    else if (status === 'verification_pending') stageIdx = 7;
    else if (status === 'verified') stageIdx = 9;
    else stageIdx = 2;

    const currentStage = LIFECYCLE_STAGES[stageIdx] || 'PLAN';
    const regCount = 50 + (idx * 7) % 250;
    const partCount = Math.floor(regCount * (0.65 + (idx % 30) / 100));
    const subCount = Math.floor(partCount * (0.75 + (idx % 20) / 100));
    const compRate = partCount > 0 ? Number(((subCount / partCount) * 100).toFixed(1)) : 0;
    const docScore = status === 'verified' ? 95 : status === 'verification_pending' ? 82 : status === 'completed' ? 70 : 45;

    const evRecord: EventRecord = {
      id: eId,
      event_code: eCode,
      created_by: crewMember.id,
      created_by_name: crewMember.full_name,
      created_by_email: crewMember.email,
      title: title,
      event_type_id: eventType.id,
      event_type_name: eventType.name,
      objective: `Drive algorithmic proficiency and student participation in ${eventType.name}.`,
      description: `Structured campus activity for ${college.name} students hosted on ${idx % 3 === 0 ? 'HRC' : 'HRW'}.`,
      status: status,
      lifecycle_stage: currentStage,
      start_date: dateStr,
      end_date: endDateStr,
      mode: idx % 3 === 0 ? 'offline' : idx % 3 === 1 ? 'online' : 'hybrid',
      venue: idx % 3 === 0 ? 'Main Auditorium' : 'Virtual',
      college_id: college.id,
      college_name: college.name,
      expected_participants: 60 + (idx * 5) % 150,
      registration_url: `https://forms.campuscrew.org/${eventType.slug}-${eNum}`,
      event_url: `https://hrw.hackerrank.com/tests/${eventType.slug}-${eNum}`,
      platform: idx % 5 === 0 ? 'HRC' : 'HRW',
      actual_registrations: regCount,
      actual_participants: partCount,
      completed_submissions: subCount,
      completion_rate: compRate,
      documentation_score: docScore,
      risk_level: (status === 'scheduled' && idx % 4 === 0) ? 'HIGH' : (status === 'draft' && idx % 3 === 0) ? 'MEDIUM' : 'LOW',
      created_at: '2026-08-01T00:00:00Z',
      updated_at: dateStr
    };
    events.push(evRecord);

    // Event stages
    LIFECYCLE_STAGES.forEach((st, sIdx) => {
      let stStatus: EventStage['status'] = 'locked';
      if (sIdx < stageIdx) stStatus = 'completed';
      else if (sIdx === stageIdx) stStatus = 'in_progress';
      else if (sIdx === stageIdx + 1) stStatus = 'available';

      stages.push({
        id: `stage-${eNum}-${sIdx}`,
        event_id: eId,
        stage: st,
        status: stStatus,
        started_at: sIdx <= stageIdx ? '2026-08-01T00:00:00Z' : undefined,
        completed_at: sIdx < stageIdx ? '2026-08-15T00:00:00Z' : undefined,
        completed_by: sIdx < stageIdx ? crewMember.id : undefined,
        created_at: '2026-08-01T00:00:00Z'
      });
    });

    // Checklists
    checklists.push(
      { id: `chk-${eNum}-1`, event_id: eId, category: 'planning', item: 'Format and objectives established', is_required: true, is_completed: stageIdx >= 1 },
      { id: `chk-${eNum}-2`, event_id: eId, category: 'platform', item: 'Platform configured on HRW/HRC', is_required: true, is_completed: stageIdx >= 2 },
      { id: `chk-${eNum}-3`, event_id: eId, category: 'platform', item: 'Platform tests validated by technical lead', is_required: true, is_completed: stageIdx >= 3 },
      { id: `chk-${eNum}-4`, event_id: eId, category: 'promotion', item: 'Pre-event outreach conducted', is_required: true, is_completed: stageIdx >= 4 },
      { id: `chk-${eNum}-5`, event_id: eId, category: 'execution', item: 'Event executed and tracked live', is_required: true, is_completed: stageIdx >= 5 },
      { id: `chk-${eNum}-6`, event_id: eId, category: 'post_event', item: 'Leaderboard and winners confirmed', is_required: true, is_completed: stageIdx >= 6 },
      { id: `chk-${eNum}-7`, event_id: eId, category: 'documentation', item: 'Event report filed with evidence', is_required: true, is_completed: stageIdx >= 8 }
    );

    // Context details
    if (eventType.slug.includes('contest') || eventType.slug.includes('test') || eventType.slug.includes('codeathon')) {
      contestDetails.push({
        id: `cd-${eNum}`,
        event_id: eId,
        platform: idx % 5 === 0 ? 'HRC' : 'HRW',
        contest_url: `https://hrw.hackerrank.com/tests/${eventType.slug}-${eNum}`,
        difficulty: idx % 3 === 0 ? 'Beginner' : idx % 3 === 1 ? 'Intermediate' : 'Advanced',
        duration_minutes: 90,
        question_count: 4,
        registration_count: regCount,
        submission_count: subCount,
        completion_rate: compRate,
        leaderboard_url: `https://hrw.hackerrank.com/tests/${eventType.slug}-${eNum}/leaderboard`,
        created_at: dateStr,
        updated_at: dateStr
      });
    } else if (eventType.slug.includes('hackathon')) {
      hackathonDetails.push({
        id: `hd-${eNum}`,
        event_id: eId,
        theme: 'Next-Gen Developer Productivity',
        tracks: ['Web & Cloud', 'AI & Machine Learning', 'Open Source Tooling'],
        eligibility: 'Open to all enrolled students',
        team_size_min: 1,
        team_size_max: 4,
        technology_restrictions: 'Standard web frameworks and open source libraries',
        judging_criteria: ['Originality', 'Technical Complexity', 'User Experience', 'Impact'],
        submission_requirements: ['GitHub repository', 'Live demo URL', '3-minute walkthrough video']
      });
    } else if (eventType.slug.includes('workshop') || eventType.slug.includes('tech_talk') || eventType.slug.includes('bootcamp')) {
      workshopDetails.push({
        id: `wd-${eNum}`,
        event_id: eId,
        topic: title,
        speaker: 'Senior Campus Crew Tech Lead',
        curriculum: 'Part 1: Theory & Architecture, Part 2: Hands-on implementation, Part 3: Q&A',
        duration_minutes: 120,
        hands_on_activity: 'Live interactive coding challenge hosted on HackerRank',
        feedback_method: 'Digital feedback form',
        resources_url: 'https://github.com/campuscrew/resources'
      });
    }

    // Proofs for completed / verified events
    if (['completed', 'proof_pending', 'verification_pending', 'verified'].includes(status)) {
      proofs.push({
        id: `prf-${eNum}-1`,
        event_id: eId,
        uploaded_by: crewMember.id,
        uploaded_by_name: crewMember.full_name,
        proof_type: 'event_photo',
        file_path: `event-proofs/event-${eNum}-photo.jpg`,
        file_name: `event-${eNum}-photo.jpg`,
        mime_type: 'image/jpeg',
        file_size: 2100000,
        description: `Campus photography showing attendees at ${title}`,
        verification_status: status === 'verified' ? 'approved' : 'pending',
        reviewed_by: status === 'verified' ? 'user-analyst-1' : undefined,
        reviewed_by_name: status === 'verified' ? 'Priya Nair' : undefined,
        created_at: dateStr
      });
      proofs.push({
        id: `prf-${eNum}-2`,
        event_id: eId,
        uploaded_by: crewMember.id,
        uploaded_by_name: crewMember.full_name,
        proof_type: 'contest_dashboard',
        file_path: `event-proofs/event-${eNum}-contest-dashboard.png`,
        file_name: `event-${eNum}-contest-dashboard.png`,
        mime_type: 'image/png',
        file_size: 1450000,
        description: `Platform telemetry verification screenshot`,
        verification_status: status === 'verified' ? 'approved' : 'pending',
        reviewed_by: status === 'verified' ? 'user-analyst-1' : undefined,
        reviewed_by_name: status === 'verified' ? 'Priya Nair' : undefined,
        created_at: dateStr
      });
    }

    // Reports for verified/completed events
    if (['verified', 'verification_pending'].includes(status)) {
      reports.push({
        id: `rep-${eNum}`,
        event_id: eId,
        submitted_by: crewMember.id,
        submitted_by_name: crewMember.full_name,
        event_name: title,
        event_date: dateStr.split('T')[0],
        college: college.name,
        organizer_team: `${crewMember.full_name} and Campus Crew Chapter`,
        event_type: eventType.name,
        objective: `Algorithmic proficiency and student engagement.`,
        platform: idx % 5 === 0 ? 'HRC' : 'HRW',
        contest_url: `https://hrw.hackerrank.com/tests/${eventType.slug}-${eNum}`,
        registration_url: `https://forms.campuscrew.org/${eventType.slug}-${eNum}`,
        registrations: regCount,
        participants: partCount,
        completion_rate: compRate,
        outcomes: `High student enthusiasm with ${partCount} active participants and ${compRate}% problem completion rate.`,
        feedback_summary: 'Participants appreciated clear problem explanations and real-time leaderboard ranking.',
        certificates_issued: status === 'verified',
        social_links: [`https://linkedin.com/posts/${eventType.slug}-${eNum}`],
        submitted_at: dateStr,
        review_status: status === 'verified' ? 'approved' : 'pending',
        reviewed_by: status === 'verified' ? 'user-analyst-1' : undefined,
        review_comment: status === 'verified' ? 'Event report verified with all evidence attachments.' : undefined,
        created_at: dateStr,
        updated_at: dateStr
      });
    }

    // Improvements for verified/completed events
    if (['verified', 'completed'].includes(status)) {
      improvements.push({
        id: `imp-${eNum}`,
        event_id: eId,
        worked_well: 'Automated contest environment and high participation from junior batches.',
        problems: 'A few students faced connectivity latency in the first 10 minutes.',
        technical_issues: 'Resolved by providing hotspot backup stations.',
        promotion_notes: 'WhatsApp announcements generated the quickest response.',
        participant_feedback: 'Loved the algorithmic test questions.',
        future_changes: 'Add an extra problem statement and provide warm-up practice links.',
        repeat_format: true,
        created_at: dateStr
      });
    }
  });

  return {
    events,
    stages,
    team,
    checklists,
    contestDetails,
    hackathonDetails,
    workshopDetails,
    participants,
    winners,
    proofs,
    reports,
    feedback,
    promotions,
    certificates,
    rewards,
    comments,
    auditLogs,
    improvements
  };
}
