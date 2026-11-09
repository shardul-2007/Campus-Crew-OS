export type UserRole = 'crew_member' | 'analyst' | 'admin' | 'program_manager' | 'technical_lead';

export type EventStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'changes_requested'
  | 'approved'
  | 'scheduled'
  | 'live'
  | 'completed'
  | 'proof_pending'
  | 'verification_pending'
  | 'verified'
  | 'rejected'
  | 'cancelled';

export type LifecycleStage =
  | 'IDEA'
  | 'PLAN'
  | 'BUILD'
  | 'TEST'
  | 'PROMOTE'
  | 'EXECUTE'
  | 'EVALUATE'
  | 'REWARD'
  | 'DOCUMENT'
  | 'IMPROVE';

export type StageStatus = 'locked' | 'available' | 'in_progress' | 'completed' | 'blocked';

export type EventPlatform = 'HRW' | 'HRC' | 'SkillUp (Not for hosting)' | 'Other';

export type ProofType =
  | 'event_photo'
  | 'group_photo'
  | 'speaker_photo'
  | 'attendance'
  | 'registration_screenshot'
  | 'contest_dashboard'
  | 'leaderboard'
  | 'winner_proof'
  | 'certificate'
  | 'poster'
  | 'social_post'
  | 'event_recording'
  | 'event_report'
  | 'contest_link'
  | 'registration_link'
  | 'other';

export type VerificationStatus = 'pending' | 'approved' | 'rejected' | 'replacement_requested';

export type RewardStatus =
  | 'pending'
  | 'verification_required'
  | 'verified'
  | 'ready_to_submit'
  | 'submitted'
  | 'activation_pending'
  | 'activated'
  | 'winner_confirmed'
  | 'issue';

export type TeamRole =
  | 'campus_crew_lead'
  | 'technical_lead'
  | 'event_operations'
  | 'outreach_marketing'
  | 'design_media'
  | 'community'
  | 'documentation'
  | 'judge'
  | 'speaker'
  | 'other';

export type ChecklistCategory =
  | 'planning'
  | 'platform'
  | 'promotion'
  | 'execution'
  | 'post_event'
  | 'reward'
  | 'documentation';

export type PromotionChannel =
  | 'linkedin'
  | 'instagram'
  | 'whatsapp'
  | 'college_groups'
  | 'classroom_outreach'
  | 'poster'
  | 'email'
  | 'other';

export interface Profile {
  id: string;
  crew_code: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  college_id?: string;
  college_name?: string;
  course?: string;
  graduation_year?: number;
  city?: string;
  state?: string;
  bio?: string;
  linkedin_url?: string;
  github_url?: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface College {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  website?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventTypeItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  min_lead_time_days: number;
  is_active: boolean;
}

export interface EventRecord {
  id: string;
  event_code: string;
  created_by: string;
  created_by_name?: string;
  created_by_email?: string;
  title: string;
  event_type_id: string;
  event_type_name?: string;
  objective?: string;
  description?: string;
  status: EventStatus;
  lifecycle_stage: LifecycleStage;
  start_date: string;
  end_date: string;
  mode: 'online' | 'offline' | 'hybrid';
  venue?: string;
  college_id?: string;
  college_name?: string;
  expected_participants: number;
  registration_url?: string;
  event_url?: string;
  platform: 'HRW' | 'HRC' | 'Other';
  actual_registrations: number;
  actual_participants: number;
  completed_submissions: number;
  completion_rate: number;
  documentation_score?: number;
  risk_level?: 'LOW' | 'MEDIUM' | 'HIGH';
  created_at: string;
  updated_at: string;
}

export interface EventStage {
  id: string;
  event_id: string;
  stage: LifecycleStage;
  status: StageStatus;
  started_at?: string;
  completed_at?: string;
  completed_by?: string;
  notes?: string;
  created_at: string;
}

export interface EventTeamMember {
  id: string;
  event_id: string;
  user_id: string;
  user_name?: string;
  user_email?: string;
  role: TeamRole;
  responsibilities: string;
  created_at: string;
}

export interface EventCollaboration {
  id: string;
  event_id: string;
  event_title?: string;
  event_code?: string;
  lead_user_id: string;
  lead_user_name?: string;
  partner_user_id: string;
  partner_user_name?: string;
  partner_college_id: string;
  partner_college_name?: string;
  responsibility: string;
  status: 'invited' | 'accepted' | 'declined' | 'completed';
  created_at: string;
}

export interface EventChecklist {
  id: string;
  event_id: string;
  category: ChecklistCategory;
  item: string;
  is_required: boolean;
  is_completed: boolean;
  completed_by?: string;
  completed_at?: string;
}

export interface ContestDetails {
  id: string;
  event_id: string;
  platform: 'HRW' | 'HRC';
  contest_url: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Mixed';
  duration_minutes: number;
  question_count: number;
  registration_count: number;
  submission_count: number;
  completion_rate: number;
  leaderboard_url?: string;
  created_at: string;
  updated_at: string;
}

export interface HackathonDetails {
  id: string;
  event_id: string;
  theme: string;
  tracks: string[];
  eligibility: string;
  team_size_min: number;
  team_size_max: number;
  technology_restrictions?: string;
  registration_deadline?: string;
  submission_deadline?: string;
  judging_date?: string;
  judging_criteria: string[];
  submission_requirements: string[];
  judge_notes?: string;
}

export interface WorkshopDetails {
  id: string;
  event_id: string;
  topic: string;
  speaker: string;
  curriculum: string;
  duration_minutes: number;
  hands_on_activity: string;
  feedback_method: string;
  resources_url?: string;
}

export interface EventParticipant {
  id: string;
  event_id: string;
  name: string;
  hacker_rank_email: string;
  email_verified: boolean;
  registration_status: 'registered' | 'attended' | 'submitted' | 'no_show';
  submission_status: 'none' | 'partial' | 'completed';
  department: string;
  academic_year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'Postgrad';
  college_name: string;
  joined_at: string;
  created_at: string;
}

export interface EventWinner {
  id: string;
  event_id: string;
  participant_id?: string;
  name?: string;
  rank: number;
  hacker_rank_email: string;
  email_verified: boolean;
  identity_verified: boolean;
  reward_status: RewardStatus;
  submitted_to_program_manager_at?: string;
  activated_at?: string;
  confirmed_received_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface EventProof {
  id: string;
  event_id: string;
  uploaded_by: string;
  uploaded_by_name?: string;
  proof_type: ProofType;
  file_path: string;
  file_name: string;
  mime_type: string;
  file_size: number;
  description: string;
  verification_status: VerificationStatus;
  reviewed_by?: string;
  reviewed_by_name?: string;
  reviewed_at?: string;
  review_comment?: string;
  created_at: string;
}

export interface EventReport {
  id: string;
  event_id: string;
  submitted_by: string;
  submitted_by_name?: string;
  event_name: string;
  event_date: string;
  college: string;
  organizer_team: string;
  event_type: string;
  objective: string;
  platform: string;
  contest_url?: string;
  registration_url?: string;
  registrations: number;
  participants: number;
  completion_rate: number;
  outcomes: string;
  feedback_summary: string;
  certificates_issued: boolean;
  social_links: string[];
  submitted_at: string;
  review_status: 'pending' | 'approved' | 'changes_requested';
  reviewed_by?: string;
  review_comment?: string;
  created_at: string;
  updated_at: string;
}

export interface EventFeedback {
  id: string;
  event_id: string;
  rating: number;
  what_went_well: string;
  improvements: string;
  submitted_by: string;
  submitted_by_name?: string;
  created_at: string;
}

export interface EventPromotion {
  id: string;
  event_id: string;
  channel: PromotionChannel;
  scheduled_at: string;
  published_at?: string;
  post_url?: string;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  status: 'scheduled' | 'published' | 'cancelled';
  created_at: string;
}

export interface Certificate {
  id: string;
  event_id: string;
  event_title?: string;
  participant_id?: string;
  certificate_type: 'participation' | 'winner';
  recipient_name: string;
  recipient_email?: string;
  certificate_url: string;
  generated_at: string;
  distributed_at?: string;
  status: 'generated' | 'distributed' | 'pending';
}

export interface RewardSubmission {
  id: string;
  event_id: string;
  winner_id: string;
  winner_name?: string;
  winner_email?: string;
  winner_rank?: number;
  reward_tier: string;
  submission_status: 'pending' | 'submitted' | 'processed' | 'issue';
  submitted_at: string;
  activation_status: 'pending' | 'activated' | 'expired';
  issue_reason?: string;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface RewardPolicy {
  id: string;
  name: string;
  description: string;
  participant_threshold: number;
  benefits: {
    tier1_rank1: string;
    tier1_rank2: string;
    tier1_rank3: string;
    swag_distributed: boolean;
    additional_notes: string;
  };
  is_active: boolean;
  effective_from: string;
  effective_until: string;
  created_at: string;
}

export interface MonthlyGoal {
  id: string;
  user_id: string;
  user_name?: string;
  month: string;
  target_events: number;
  completed_events: number;
  participants_reached: number;
  status: 'on_track' | 'at_risk' | 'achieved' | 'missed';
  created_at: string;
  updated_at: string;
}

export interface CommunityMetric {
  id: string;
  event_id?: string;
  registrations: number;
  participants: number;
  completion_rate: number;
  repeat_participants: number;
  departments_reached: string[];
  academic_years_reached: string[];
  club_collaborations: number;
  event_frequency: string;
  social_reach: number;
  recorded_at: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  entity_type: string;
  entity_id?: string;
  is_read: boolean;
  created_at: string;
}

export interface EventComment {
  id: string;
  event_id: string;
  author_id: string;
  author_name: string;
  author_role: UserRole;
  comment: string;
  is_internal: boolean;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string;
  actor_name?: string;
  actor_email?: string;
  action: string;
  entity_type: string;
  entity_id: string;
  old_values?: any;
  new_values?: any;
  ip_hash?: string;
  created_at: string;
}

export interface EventImprovement {
  id: string;
  event_id: string;
  worked_well: string;
  problems: string;
  technical_issues: string;
  promotion_notes: string;
  participant_feedback: string;
  future_changes: string;
  repeat_format: boolean;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  target_role: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  published_at: string;
  expires_at?: string;
  created_by: string;
  created_by_name?: string;
  created_at: string;
}
