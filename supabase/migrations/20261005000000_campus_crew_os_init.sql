-- Campus Crew OS Database Schema & Migration
-- Tagline: Plan. Execute. Prove. Grow.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ROLES TABLE
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. COLLEGES TABLE
CREATE TABLE IF NOT EXISTS colleges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT DEFAULT 'India',
  website TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_colleges_name ON colleges(name);
CREATE INDEX IF NOT EXISTS idx_colleges_city ON colleges(city);
CREATE INDEX IF NOT EXISTS idx_colleges_state ON colleges(state);

-- 3. PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  crew_code TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  college_id UUID REFERENCES colleges(id) ON DELETE SET NULL,
  course TEXT,
  graduation_year INTEGER,
  city TEXT,
  state TEXT,
  bio TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  role TEXT NOT NULL DEFAULT 'crew_member',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_college ON profiles(college_id);

-- 4. USER ROLES TABLE
CREATE TABLE IF NOT EXISTS user_roles (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, role_id)
);

-- 5. EVENT TYPES TABLE
CREATE TABLE IF NOT EXISTS event_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  min_lead_time_days INTEGER DEFAULT 7,
  is_active BOOLEAN DEFAULT TRUE
);

-- 6. EVENTS TABLE
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_code TEXT UNIQUE NOT NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  event_type_id UUID REFERENCES event_types(id) ON DELETE RESTRICT,
  objective TEXT,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (
    status IN (
      'draft', 'submitted', 'under_review', 'changes_requested', 'approved',
      'scheduled', 'live', 'completed', 'proof_pending', 'verification_pending',
      'verified', 'rejected', 'cancelled'
    )
  ),
  lifecycle_stage TEXT NOT NULL DEFAULT 'IDEA' CHECK (
    lifecycle_stage IN (
      'IDEA', 'PLAN', 'BUILD', 'TEST', 'PROMOTE', 'EXECUTE', 'EVALUATE', 'REWARD', 'DOCUMENT', 'IMPROVE'
    )
  ),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  mode TEXT NOT NULL DEFAULT 'online' CHECK (mode IN ('online', 'offline', 'hybrid')),
  venue TEXT,
  college_id UUID REFERENCES colleges(id) ON DELETE SET NULL,
  expected_participants INTEGER NOT NULL DEFAULT 50 CHECK (expected_participants >= 0),
  registration_url TEXT,
  event_url TEXT,
  platform TEXT NOT NULL DEFAULT 'HRW' CHECK (platform IN ('HRW', 'HRC', 'Other')),
  actual_registrations INTEGER DEFAULT 0 CHECK (actual_registrations >= 0),
  actual_participants INTEGER DEFAULT 0 CHECK (actual_participants >= 0),
  completed_submissions INTEGER DEFAULT 0 CHECK (completed_submissions >= 0),
  completion_rate NUMERIC DEFAULT 0.0 CHECK (completion_rate >= 0 AND completion_rate <= 100),
  documentation_score NUMERIC DEFAULT 0.0 CHECK (documentation_score >= 0 AND documentation_score <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(created_by);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_stage ON events(lifecycle_stage);
CREATE INDEX IF NOT EXISTS idx_events_college ON events(college_id);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);

-- 7. EVENT STAGES TABLE
CREATE TABLE IF NOT EXISTS event_stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  stage TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'locked' CHECK (status IN ('locked', 'available', 'in_progress', 'completed', 'blocked')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  completed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_event_stages_event ON event_stages(event_id);

-- 8. EVENT TEAM MEMBERS
CREATE TABLE IF NOT EXISTS event_team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (
    role IN (
      'campus_crew_lead', 'technical_lead', 'event_operations', 'outreach_marketing',
      'design_media', 'community', 'documentation', 'judge', 'speaker', 'other'
    )
  ),
  responsibilities TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_id, role)
);

-- 9. EVENT COLLABORATIONS
CREATE TABLE IF NOT EXISTS event_collaborations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  lead_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  partner_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  partner_college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
  responsibility TEXT,
  status TEXT NOT NULL DEFAULT 'invited' CHECK (status IN ('invited', 'accepted', 'declined', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. EVENT CHECKLISTS
CREATE TABLE IF NOT EXISTS event_checklists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (
    category IN ('planning', 'platform', 'promotion', 'execution', 'post_event', 'reward', 'documentation')
  ),
  item TEXT NOT NULL,
  is_required BOOLEAN DEFAULT TRUE,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  completed_at TIMESTAMPTZ
);

-- 11. EVENT SPECIFIC TABLES
CREATE TABLE IF NOT EXISTS contest_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID UNIQUE REFERENCES events(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('HRW', 'HRC')),
  contest_url TEXT,
  difficulty TEXT NOT NULL DEFAULT 'Intermediate',
  duration_minutes INTEGER NOT NULL DEFAULT 90,
  question_count INTEGER NOT NULL DEFAULT 4,
  registration_count INTEGER DEFAULT 0,
  submission_count INTEGER DEFAULT 0,
  completion_rate NUMERIC DEFAULT 0.0,
  leaderboard_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hackathon_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID UNIQUE REFERENCES events(id) ON DELETE CASCADE,
  theme TEXT NOT NULL,
  tracks JSONB DEFAULT '[]'::jsonb,
  eligibility TEXT,
  team_size_min INTEGER DEFAULT 1,
  team_size_max INTEGER DEFAULT 4,
  technology_restrictions TEXT,
  registration_deadline TIMESTAMPTZ,
  submission_deadline TIMESTAMPTZ,
  judging_date TIMESTAMPTZ,
  judging_criteria JSONB DEFAULT '[]'::jsonb,
  submission_requirements JSONB DEFAULT '[]'::jsonb,
  judge_notes TEXT
);

CREATE TABLE IF NOT EXISTS workshop_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID UNIQUE REFERENCES events(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  speaker TEXT NOT NULL,
  curriculum TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 120,
  hands_on_activity TEXT,
  feedback_method TEXT,
  resources_url TEXT
);

-- 12. PARTICIPANTS
CREATE TABLE IF NOT EXISTS event_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  hacker_rank_email TEXT NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  registration_status TEXT NOT NULL DEFAULT 'registered',
  submission_status TEXT NOT NULL DEFAULT 'none',
  department TEXT,
  academic_year TEXT,
  college_name TEXT,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_participants_event ON event_participants(event_id);

-- 13. WINNERS
CREATE TABLE IF NOT EXISTS event_winners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  participant_id UUID REFERENCES event_participants(id) ON DELETE SET NULL,
  rank INTEGER NOT NULL CHECK (rank > 0),
  hacker_rank_email TEXT NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  identity_verified BOOLEAN DEFAULT FALSE,
  reward_status TEXT NOT NULL DEFAULT 'pending' CHECK (
    reward_status IN (
      'pending', 'verification_required', 'verified', 'ready_to_submit',
      'submitted', 'activation_pending', 'activated', 'winner_confirmed', 'issue'
    )
  ),
  submitted_to_program_manager_at TIMESTAMPTZ,
  activated_at TIMESTAMPTZ,
  confirmed_received_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_winners_event ON event_winners(event_id);

-- 14. PROOF CENTER
CREATE TABLE IF NOT EXISTS event_proofs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  proof_type TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  description TEXT,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (
    verification_status IN ('pending', 'approved', 'rejected', 'replacement_requested')
  ),
  reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  review_comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_proofs_event ON event_proofs(event_id);
CREATE INDEX IF NOT EXISTS idx_proofs_status ON event_proofs(verification_status);

-- 15. REPORTS
CREATE TABLE IF NOT EXISTS event_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID UNIQUE REFERENCES events(id) ON DELETE CASCADE,
  submitted_by UUID REFERENCES profiles(id) ON DELETE RESTRICT,
  event_name TEXT NOT NULL,
  event_date DATE NOT NULL,
  college TEXT NOT NULL,
  organizer_team TEXT NOT NULL,
  event_type TEXT NOT NULL,
  objective TEXT NOT NULL,
  platform TEXT NOT NULL,
  contest_url TEXT,
  registration_url TEXT,
  registrations INTEGER NOT NULL DEFAULT 0,
  participants INTEGER NOT NULL DEFAULT 0,
  completion_rate NUMERIC NOT NULL DEFAULT 0.0,
  outcomes TEXT NOT NULL,
  feedback_summary TEXT NOT NULL,
  certificates_issued BOOLEAN DEFAULT FALSE,
  social_links JSONB DEFAULT '[]'::jsonb,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  review_status TEXT NOT NULL DEFAULT 'pending' CHECK (
    review_status IN ('pending', 'approved', 'changes_requested')
  ),
  reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  review_comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. FEEDBACK
CREATE TABLE IF NOT EXISTS event_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  what_went_well TEXT,
  improvements TEXT,
  submitted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. SOCIAL PROMOTIONS
CREATE TABLE IF NOT EXISTS event_promotions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  published_at TIMESTAMPTZ,
  post_url TEXT,
  reach INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. CERTIFICATES
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  participant_id UUID REFERENCES event_participants(id) ON DELETE SET NULL,
  certificate_type TEXT NOT NULL CHECK (certificate_type IN ('participation', 'winner')),
  recipient_name TEXT NOT NULL,
  certificate_url TEXT NOT NULL,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  distributed_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'generated'
);

-- 19. REWARDS
CREATE TABLE IF NOT EXISTS reward_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  winner_id UUID REFERENCES event_winners(id) ON DELETE CASCADE,
  reward_tier TEXT NOT NULL,
  submission_status TEXT NOT NULL DEFAULT 'pending',
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  activation_status TEXT NOT NULL DEFAULT 'pending',
  issue_reason TEXT,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reward_policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  participant_threshold INTEGER NOT NULL DEFAULT 50,
  benefits JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  effective_from DATE NOT NULL,
  effective_until DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. MONTHLY GOALS
CREATE TABLE IF NOT EXISTS monthly_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  month DATE NOT NULL,
  target_events INTEGER NOT NULL DEFAULT 1,
  completed_events INTEGER NOT NULL DEFAULT 0,
  participants_reached INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'on_track',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, month)
);

-- 21. COMMUNITY METRICS
CREATE TABLE IF NOT EXISTS community_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  registrations INTEGER DEFAULT 0,
  participants INTEGER DEFAULT 0,
  completion_rate NUMERIC DEFAULT 0.0,
  repeat_participants INTEGER DEFAULT 0,
  departments_reached JSONB DEFAULT '[]'::jsonb,
  academic_years_reached JSONB DEFAULT '[]'::jsonb,
  club_collaborations INTEGER DEFAULT 0,
  event_frequency TEXT DEFAULT 'Monthly',
  social_reach INTEGER DEFAULT 0,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 22. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, is_read);

-- 23. EVENT COMMENTS
CREATE TABLE IF NOT EXISTS event_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 24. AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  old_values JSONB,
  new_values JSONB,
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_entity ON audit_logs(entity_type, entity_id);

-- 25. IMPROVEMENTS
CREATE TABLE IF NOT EXISTS event_improvements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID UNIQUE REFERENCES events(id) ON DELETE CASCADE,
  worked_well TEXT,
  problems TEXT,
  technical_issues TEXT,
  promotion_notes TEXT,
  participant_feedback TEXT,
  future_changes TEXT,
  repeat_format BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 26. ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  target_role TEXT DEFAULT 'all',
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  published_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_collaborations ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE contest_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE hackathon_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshop_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_winners ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_proofs ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_improvements ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- REUSABLE AUTH/PERMISSION FUNCTIONS
CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_analyst() RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('analyst', 'admin', 'program_manager')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_crew_member() RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'crew_member'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_event_owner(target_event_id UUID) RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM events WHERE id = target_event_id AND created_by = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_event_team_member(target_event_id UUID) RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM event_team_members WHERE event_id = target_event_id AND user_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM event_collaborations WHERE event_id = target_event_id AND partner_user_id = auth.uid() AND status = 'accepted'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION can_review_event(target_event_id UUID) RETURNS BOOLEAN AS $$
BEGIN
  RETURN is_analyst() OR is_admin();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS POLICIES

-- Profiles
CREATE POLICY "profiles_select_own_or_staff" ON profiles
  FOR SELECT USING (auth.uid() = id OR is_analyst());

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_admin_all" ON profiles
  FOR ALL USING (is_admin());

-- Colleges
CREATE POLICY "colleges_select_all" ON colleges
  FOR SELECT USING (true);

CREATE POLICY "colleges_admin_manage" ON colleges
  FOR ALL USING (is_admin());

-- Event Types
CREATE POLICY "event_types_select_all" ON event_types
  FOR SELECT USING (true);

CREATE POLICY "event_types_admin_manage" ON event_types
  FOR ALL USING (is_admin());

-- Events
CREATE POLICY "events_select_policy" ON events
  FOR SELECT USING (
    created_by = auth.uid()
    OR is_event_team_member(id)
    OR is_analyst()
    OR status IN ('approved', 'scheduled', 'live', 'completed', 'verified')
  );

CREATE POLICY "events_insert_policy" ON events
  FOR INSERT WITH CHECK (created_by = auth.uid() OR is_admin());

CREATE POLICY "events_update_policy" ON events
  FOR UPDATE USING (
    (created_by = auth.uid() AND status IN ('draft', 'changes_requested'))
    OR is_analyst()
  );

CREATE POLICY "events_admin_all" ON events
  FOR ALL USING (is_admin());

-- Event Proofs
CREATE POLICY "proofs_select_policy" ON event_proofs
  FOR SELECT USING (
    is_event_owner(event_id)
    OR is_event_team_member(event_id)
    OR is_analyst()
  );

CREATE POLICY "proofs_insert_policy" ON event_proofs
  FOR INSERT WITH CHECK (
    is_event_owner(event_id)
    OR is_event_team_member(event_id)
    OR is_admin()
  );

CREATE POLICY "proofs_update_reviewers" ON event_proofs
  FOR UPDATE USING (is_analyst());

-- Event Winners (privacy protected)
CREATE POLICY "winners_select_policy" ON event_winners
  FOR SELECT USING (
    is_event_owner(event_id)
    OR is_analyst()
  );

CREATE POLICY "winners_modify_owner_analyst" ON event_winners
  FOR ALL USING (
    is_event_owner(event_id)
    OR is_analyst()
  );

-- Audit logs (Read only for analysts/admins, insert through backend)
CREATE POLICY "audit_logs_select" ON audit_logs
  FOR SELECT USING (is_analyst());

-- NOTIFICATIONS
CREATE POLICY "notifications_select_own" ON notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "notifications_update_own" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- STORAGE BUCKETS SETUP (Supabase standard)
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('profile-images', 'profile-images', true),
  ('event-proofs', 'event-proofs', false),
  ('event-documents', 'event-documents', false),
  ('event-media', 'event-media', false),
  ('certificates', 'certificates', false),
  ('reports', 'reports', false)
ON CONFLICT (id) DO NOTHING;

-- STORAGE POLICIES
CREATE POLICY "Storage public profile images" ON storage.objects
  FOR SELECT USING (bucket_id = 'profile-images');

CREATE POLICY "Storage proof authorized read" ON storage.objects
  FOR SELECT USING (
    bucket_id IN ('event-proofs', 'event-documents', 'event-media', 'certificates', 'reports')
    AND (auth.role() = 'authenticated')
  );

CREATE POLICY "Storage proof authenticated upload" ON storage.objects
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated'
  );
