export interface TopCrewMember {
  id: string;
  crew_code: string;
  name: string;
  college_name: string;
  events_count: number;
  verified_count: number;
  participants_count: number;
  completion_rate: number;
  collaborations_count: number;
  documentation_score: number;
  impact_score: number;
  last_activity: string;
}

export interface CollegeMetric {
  id: string;
  name: string;
  city: string;
  state: string;
  events_count: number;
  participants_count: number;
  completion_rate: number;
  repeat_participants: number;
  last_event_date: string;
  status: 'active' | 'new' | 'returning';
}

export interface MonthlyPerformance {
  month: string;
  target: number;
  completed: number;
  verified: number;
}

export interface EventMixItem {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface AnalystOverviewStats {
  totalCrew: number;
  activeCrew: number;
  totalEvents: number;
  verifiedEvents: number;
  pendingReviews: number;
  totalParticipants: number;
  totalColleges: number;
  citiesReached: number;
  totalRegistrations: number;
  uniqueStudents: number;
  repeatParticipants: number;
  avgCompletionRate: number;
  clubCollaborations: number;
  socialReach: number;
  pendingProofCount: number;
  pendingReportCount: number;
  pendingWinnerCount: number;
  highRiskEventsCount: number;
}
