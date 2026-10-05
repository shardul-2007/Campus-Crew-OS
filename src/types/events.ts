import { EventRecord, EventStage, EventTeamMember, EventChecklist, EventProof, EventWinner, EventParticipant, EventReport, EventImprovement, EventFeedback, ContestDetails, HackathonDetails, WorkshopDetails } from './database';

export interface EventDetailView extends EventRecord {
  stages: EventStage[];
  team: EventTeamMember[];
  checklist: EventChecklist[];
  proofs: EventProof[];
  winners: EventWinner[];
  participants: EventParticipant[];
  report?: EventReport;
  improvement?: EventImprovement;
  feedback: EventFeedback[];
  contest_details?: ContestDetails;
  hackathon_details?: HackathonDetails;
  workshop_details?: WorkshopDetails;
}

export interface CreateEventInput {
  title: string;
  event_type_id: string;
  objective: string;
  description: string;
  mode: 'online' | 'offline' | 'hybrid';
  venue?: string;
  college_id?: string;
  start_date: string;
  end_date: string;
  platform: 'HRW' | 'HRC' | 'Other';
  expected_participants: number;
  registration_url?: string;
  event_url?: string;
  // Specific templates
  contest_details?: Partial<ContestDetails>;
  hackathon_details?: Partial<HackathonDetails>;
  workshop_details?: Partial<WorkshopDetails>;
  team?: Array<{ user_id: string; role: string; responsibilities: string }>;
  promotion_channels?: string[];
}
