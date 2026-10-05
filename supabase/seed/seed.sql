-- Campus Crew OS Seed Data
-- Tagline: Plan. Execute. Prove. Grow.
-- Seed dataset: 1 Admin, 5 Analysts, 30 Crew Members, 15 Colleges, 50 Events across all statuses & lifecycle stages.

-- 1. ROLES
INSERT INTO roles (id, name, description) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'crew_member', 'Campus Crew Student Ambassador'),
  ('a0000000-0000-0000-0000-000000000002', 'analyst', 'Program Operations & Marketing Analyst'),
  ('a0000000-0000-0000-0000-000000000003', 'admin', 'System Administrator & Executive Lead'),
  ('a0000000-0000-0000-0000-000000000004', 'program_manager', 'National Program Manager'),
  ('a0000000-0000-0000-0000-000000000005', 'technical_lead', 'Technical Community Lead')
ON CONFLICT (id) DO NOTHING;

-- 2. COLLEGES (15 Colleges)
INSERT INTO colleges (id, name, city, state, country, website) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'Indian Institute of Technology, Bombay', 'Mumbai', 'Maharashtra', 'India', 'https://www.iitb.ac.in'),
  ('c0000000-0000-0000-0000-000000000002', 'College of Engineering, Pune (COEP)', 'Pune', 'Maharashtra', 'India', 'https://www.coep.org.in'),
  ('c0000000-0000-0000-0000-000000000003', 'BITS Pilani', 'Pilani', 'Rajasthan', 'India', 'https://www.bits-pilani.ac.in'),
  ('c0000000-0000-0000-0000-000000000004', 'National Institute of Technology, Trichy', 'Tiruchirappalli', 'Tamil Nadu', 'India', 'https://www.nitt.edu'),
  ('c0000000-0000-0000-0000-000000000005', 'Delhi Technological University (DTU)', 'New Delhi', 'Delhi', 'India', 'https://www.dtu.ac.in'),
  ('c0000000-0000-0000-0000-000000000006', 'Vellore Institute of Technology (VIT)', 'Vellore', 'Tamil Nadu', 'India', 'https://vit.ac.in'),
  ('c0000000-0000-0000-0000-000000000007', 'International Institute of Information Technology (IIIT)', 'Hyderabad', 'Telangana', 'India', 'https://www.iiit.ac.in'),
  ('c0000000-0000-0000-0000-000000000008', 'RV College of Engineering', 'Bengaluru', 'Karnataka', 'India', 'https://www.rvce.edu.in'),
  ('c0000000-0000-0000-0000-000000000009', 'PSG College of Technology', 'Coimbatore', 'Tamil Nadu', 'India', 'https://www.psgtech.edu'),
  ('c0000000-0000-0000-0000-000000000010', 'Manipal Institute of Technology', 'Manipal', 'Karnataka', 'India', 'https://manipal.edu/mit.html'),
  ('c0000000-0000-0000-0000-000000000011', 'Jadavpur University', 'Kolkata', 'West Bengal', 'India', 'http://www.jaduniv.edu.in'),
  ('c0000000-0000-0000-0000-000000000012', 'Thapar Institute of Engineering and Technology', 'Patiala', 'Punjab', 'India', 'https://www.thapar.edu'),
  ('c0000000-0000-0000-0000-000000000013', 'Pune Institute of Computer Technology (PICT)', 'Pune', 'Maharashtra', 'India', 'https://pict.edu'),
  ('c0000000-0000-0000-0000-000000000014', 'SRM Institute of Science and Technology', 'Chennai', 'Tamil Nadu', 'India', 'https://www.srmist.edu.in'),
  ('c0000000-0000-0000-0000-000000000015', 'Birla Institute of Technology, Mesra', 'Ranchi', 'Jharkhand', 'India', 'https://www.bitmesra.ac.in')
ON CONFLICT (id) DO NOTHING;

-- 3. EVENT TYPES (16 Handbook Formats)
INSERT INTO event_types (id, name, slug, description, min_lead_time_days) VALUES
  ('e0000000-0000-0000-0000-000000000001', 'Coding Contest', 'coding_contest', 'Timed algorithmic problem solving on HRW or HRC', 7),
  ('e0000000-0000-0000-0000-000000000002', 'DSA Assessment', 'dsa_test', 'Core Data Structures & Algorithms diagnostic test', 5),
  ('e0000000-0000-0000-0000-000000000003', 'MCQ Skill Challenge', 'mcq_test', 'Multiple-choice CS concepts & aptitude test', 3),
  ('e0000000-0000-0000-0000-000000000004', 'Debugging Test', 'debugging_test', 'Finding and fixing logical bugs in existing codebases', 5),
  ('e0000000-0000-0000-0000-000000000005', 'Development Challenge', 'development_challenge', 'Building practical features or end-to-end components', 10),
  ('e0000000-0000-0000-0000-000000000006', 'Hackathon', 'hackathon', 'Multi-hour collaborative sprint to build prototype solutions', 14),
  ('e0000000-0000-0000-0000-000000000007', 'Codeathon', 'codeathon', 'Intense competitive coding marathon', 10),
  ('e0000000-0000-0000-0000-000000000008', 'Technical Workshop', 'workshop', 'Hands-on guided walkthrough of tools and frameworks', 7),
  ('e0000000-0000-0000-0000-000000000009', 'Skill Bootcamp', 'bootcamp', 'Multi-day progressive structured coding curriculum', 14),
  ('e0000000-0000-0000-0000-000000000010', 'Tech Talk', 'tech_talk', 'Expert-led lecture discussing tech stack architectures', 5),
  ('e0000000-0000-0000-0000-000000000011', 'Industry Session', 'industry_session', 'Career guidance & industry hiring trends session', 7),
  ('e0000000-0000-0000-0000-000000000012', 'Tech Quiz', 'quiz', 'Fast-paced technical trivia and rapid-fire questions', 3),
  ('e0000000-0000-0000-0000-000000000013', 'Community Meetup', 'community_meetup', 'Informal campus gathering for peer learning & networking', 5),
  ('e0000000-0000-0000-0000-000000000014', 'Mock Interview Sprint', 'mock_interview', 'Simulated technical interview practice with peers', 7),
  ('e0000000-0000-0000-0000-000000000015', 'Inter-College Competition', 'inter_college_competition', 'Cross-campus competitive coding tournament', 14),
  ('e0000000-0000-0000-0000-000000000016', 'Special Initiative', 'other', 'Custom approved community activation', 7)
ON CONFLICT (id) DO NOTHING;

-- 4. REWARD POLICIES
INSERT INTO reward_policies (id, name, description, participant_threshold, benefits, is_active, effective_from, effective_until) VALUES
  ('r0000000-0000-0000-0000-000000000001', 'Campus Season Standard Policy (2026)', 'Standard quarterly reward distribution guidelines based on verified participant participation and test completions.', 50, '{"tier1_rank1": "HackerRank Gold Certificate + Tech Kit", "tier1_rank2": "HackerRank Silver Certificate + Swag Pack", "tier1_rank3": "HackerRank Bronze Certificate + Swag Pack", "swag_distributed": true, "additional_notes": "Requires verified participant emails on HRW/HRC."}'::jsonb, true, '2026-01-01', '2026-12-31')
ON CONFLICT (id) DO NOTHING;

-- End of migration / seed definitions
