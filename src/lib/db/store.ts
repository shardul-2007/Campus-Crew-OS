import fs from 'fs';
import path from 'path';
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
  Announcement,
  EventCollaboration,
  LifecycleStage,
  EventStatus
} from '@/types/database';
import {
  INITIAL_COLLEGES,
  INITIAL_EVENT_TYPES,
  INITIAL_PROFILES,
  INITIAL_REWARD_POLICIES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_MONTHLY_GOALS,
  generateInitialEvents
} from './mock-data';

interface AppDatabase {
  profiles: Profile[];
  colleges: College[];
  eventTypes: EventTypeItem[];
  events: EventRecord[];
  stages: EventStage[];
  team: EventTeamMember[];
  checklists: EventChecklist[];
  collaborations: EventCollaboration[];
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
  rewardPolicies: RewardPolicy[];
  monthlyGoals: MonthlyGoal[];
  communityMetrics: CommunityMetric[];
  notifications: NotificationItem[];
  comments: EventComment[];
  auditLogs: AuditLog[];
  improvements: EventImprovement[];
  announcements: Announcement[];
}

const DATA_FILE_PATH = path.join(process.cwd(), '.campus_crew_os_data.json');

class DataStore {
  private db: AppDatabase;

  constructor() {
    this.db = this.loadOrInitialize();
  }

  private loadOrInitialize(): AppDatabase {
    try {
      if (fs.existsSync(DATA_FILE_PATH)) {
        const raw = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn('Failed to read database file, initializing fresh database.', err);
    }

    // Initialize with comprehensive dataset
    const generated = generateInitialEvents();
    const initialData: AppDatabase = {
      profiles: INITIAL_PROFILES,
      colleges: INITIAL_COLLEGES,
      eventTypes: INITIAL_EVENT_TYPES,
      events: generated.events,
      stages: generated.stages,
      team: generated.team,
      checklists: generated.checklists,
      collaborations: [
        {
          id: 'collab-1',
          event_id: 'ev-main-42',
          event_title: 'CodeRush 2026',
          event_code: 'ACT-2026-00042',
          lead_user_id: 'user-crew-1',
          lead_user_name: 'Shardul Patel',
          partner_user_id: 'user-crew-2',
          partner_user_name: 'Aarav Gupta',
          partner_college_id: 'col-13',
          partner_college_name: 'Pune Institute of Computer Technology (PICT)',
          responsibility: 'Joint problem curation and inter-campus outreach',
          status: 'accepted',
          created_at: '2026-09-20T10:00:00Z'
        }
      ],
      contestDetails: generated.contestDetails,
      hackathonDetails: generated.hackathonDetails,
      workshopDetails: generated.workshopDetails,
      participants: generated.participants,
      winners: generated.winners,
      proofs: generated.proofs,
      reports: generated.reports,
      feedback: generated.feedback,
      promotions: generated.promotions,
      certificates: generated.certificates,
      rewards: generated.rewards,
      rewardPolicies: INITIAL_REWARD_POLICIES,
      monthlyGoals: INITIAL_MONTHLY_GOALS,
      communityMetrics: [
        {
          id: 'cm-1',
          event_id: 'ev-main-42',
          registrations: 126,
          participants: 94,
          completion_rate: 74.5,
          repeat_participants: 28,
          departments_reached: ['Computer Engineering', 'IT', 'Electronics & Telecom'],
          academic_years_reached: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
          club_collaborations: 2,
          event_frequency: 'Bi-weekly',
          social_reach: 7400,
          recorded_at: '2026-10-05T12:00:00Z'
        }
      ],
      notifications: [
        {
          id: 'notif-1',
          user_id: 'user-crew-1',
          type: 'event_approved',
          title: 'Event Approved: CodeRush 2026',
          message: 'Your event proposal ACT-2026-00042 has been reviewed and approved by Priya Nair (Analyst).',
          entity_type: 'event',
          entity_id: 'ev-main-42',
          is_read: false,
          created_at: '2026-10-01T11:42:00Z'
        },
        {
          id: 'notif-2',
          user_id: 'user-analyst-1',
          type: 'proof_uploaded',
          title: 'New Proof Uploaded',
          message: 'Shardul Patel uploaded contest dashboard telemetry for CodeRush 2026.',
          entity_type: 'proof',
          entity_id: 'prf-main-2',
          is_read: true,
          created_at: '2026-10-05T14:50:00Z'
        }
      ],
      comments: generated.comments,
      auditLogs: generated.auditLogs,
      improvements: generated.improvements,
      announcements: INITIAL_ANNOUNCEMENTS
    };

    this.saveToDisk(initialData);
    return initialData;
  }

  private saveToDisk(data: AppDatabase) {
    try {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist database to file:', err);
    }
  }

  private persist() {
    this.saveToDisk(this.db);
  }

  // --- PROFILES & AUTH ---
  getProfiles(): Profile[] {
    return [...this.db.profiles];
  }

  getProfileById(id: string): Profile | undefined {
    return this.db.profiles.find((p) => p.id === id);
  }

  getProfileByEmail(email: string): Profile | undefined {
    return this.db.profiles.find((p) => p.email.toLowerCase() === email.toLowerCase());
  }

  updateProfile(id: string, updates: Partial<Profile>, actorId?: string): Profile | null {
    const idx = this.db.profiles.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    const old = { ...this.db.profiles[idx] };
    this.db.profiles[idx] = {
      ...this.db.profiles[idx],
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.logAudit(actorId || id, 'Updated Profile', 'profile', id, old, this.db.profiles[idx]);
    this.persist();
    return this.db.profiles[idx];
  }

  // --- COLLEGES & EVENT TYPES ---
  getColleges(): College[] {
    return [...this.db.colleges];
  }

  getCollegeById(id: string): College | undefined {
    return this.db.colleges.find((c) => c.id === id);
  }

  getEventTypes(): EventTypeItem[] {
    return [...this.db.eventTypes];
  }

  // --- EVENTS ---
  getEvents(filters?: {
    status?: string;
    eventType?: string;
    collegeId?: string;
    creatorId?: string;
    search?: string;
    platform?: string;
    risk?: string;
  }): EventRecord[] {
    let list = [...this.db.events];
    if (!filters) return list;

    if (filters.status && filters.status !== 'all') {
      list = list.filter((e) => e.status === filters.status);
    }
    if (filters.eventType && filters.eventType !== 'all') {
      list = list.filter((e) => e.event_type_id === filters.eventType || e.event_type_name === filters.eventType);
    }
    if (filters.collegeId && filters.collegeId !== 'all') {
      list = list.filter((e) => e.college_id === filters.collegeId);
    }
    if (filters.creatorId) {
      list = list.filter((e) => e.created_by === filters.creatorId);
    }
    if (filters.platform && filters.platform !== 'all') {
      list = list.filter((e) => e.platform === filters.platform);
    }
    if (filters.risk && filters.risk !== 'all') {
      list = list.filter((e) => e.risk_level === filters.risk);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.event_code.toLowerCase().includes(q) ||
          (e.college_name && e.college_name.toLowerCase().includes(q)) ||
          (e.created_by_name && e.created_by_name.toLowerCase().includes(q))
      );
    }

    return list.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
  }

  getEventByCode(eventCode: string): EventRecord | undefined {
    return this.db.events.find((e) => e.event_code.toUpperCase() === eventCode.toUpperCase());
  }

  getEventById(id: string): EventRecord | undefined {
    return this.db.events.find((e) => e.id === id);
  }

  createEvent(input: {
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
    contest_details?: Partial<ContestDetails>;
    hackathon_details?: Partial<HackathonDetails>;
    workshop_details?: Partial<WorkshopDetails>;
  }, creatorId: string): EventRecord {
    const creator = this.getProfileById(creatorId);
    const eventType = this.db.eventTypes.find((t) => t.id === input.event_type_id);
    const college = input.college_id ? this.getCollegeById(input.college_id) : (creator?.college_id ? this.getCollegeById(creator.college_id) : undefined);

    const year = new Date().getFullYear();
    const count = this.db.events.length + 1;
    const eventCode = `ACT-${year}-${String(count).padStart(5, '0')}`;
    const eventId = `ev-${Date.now()}`;

    const newEvent: EventRecord = {
      id: eventId,
      event_code: eventCode,
      created_by: creatorId,
      created_by_name: creator?.full_name || 'Campus Ambassador',
      created_by_email: creator?.email || 'ambassador@campuscrew.org',
      title: input.title,
      event_type_id: input.event_type_id,
      event_type_name: eventType?.name || 'Coding Contest',
      objective: input.objective,
      description: input.description,
      status: 'draft',
      lifecycle_stage: 'IDEA',
      start_date: input.start_date,
      end_date: input.end_date,
      mode: input.mode,
      venue: input.venue,
      college_id: college?.id || creator?.college_id,
      college_name: college?.name || creator?.college_name,
      expected_participants: Number(input.expected_participants) || 50,
      registration_url: input.registration_url,
      event_url: input.event_url,
      platform: input.platform || 'HRW',
      actual_registrations: 0,
      actual_participants: 0,
      completed_submissions: 0,
      completion_rate: 0,
      documentation_score: 15,
      risk_level: 'LOW',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.db.events.unshift(newEvent);

    // Initialize 10 lifecycle stages
    const LIFECYCLE_STAGES: LifecycleStage[] = [
      'IDEA', 'PLAN', 'BUILD', 'TEST', 'PROMOTE', 'EXECUTE', 'EVALUATE', 'REWARD', 'DOCUMENT', 'IMPROVE'
    ];
    LIFECYCLE_STAGES.forEach((st, idx) => {
      this.db.stages.push({
        id: `stg-${eventId}-${idx}`,
        event_id: eventId,
        stage: st,
        status: idx === 0 ? 'in_progress' : idx === 1 ? 'available' : 'locked',
        started_at: idx === 0 ? new Date().toISOString() : undefined,
        created_at: new Date().toISOString()
      });
    });

    // Initialize default checklists from handbook
    const defaultChecklists = [
      { cat: 'planning', item: 'Event format & objectives defined', req: true },
      { cat: 'platform', item: `Configure test on ${input.platform || 'HRW'}`, req: true },
      { cat: 'platform', item: 'Test problem statements and test cases', req: true },
      { cat: 'planning', item: 'Assign organizing team responsibilities', req: true },
      { cat: 'promotion', item: 'Launch campaign across campus channels', req: true },
      { cat: 'execution', item: 'Monitor live event & provide support', req: true },
      { cat: 'post_event', item: 'Finalize leaderboard & confirm winners', req: true },
      { cat: 'documentation', item: 'File event report and upload proof', req: true }
    ];
    defaultChecklists.forEach((chk, cIdx) => {
      this.db.checklists.push({
        id: `chk-${eventId}-${cIdx}`,
        event_id: eventId,
        category: chk.cat as any,
        item: chk.item,
        is_required: chk.req,
        is_completed: false
      });
    });

    // Assign creator as campus_crew_lead
    this.db.team.push({
      id: `tm-${eventId}-lead`,
      event_id: eventId,
      user_id: creatorId,
      user_name: creator?.full_name,
      user_email: creator?.email,
      role: 'campus_crew_lead',
      responsibilities: 'Overall event leadership and liaison.',
      created_at: new Date().toISOString()
    });

    // Optional event specific details
    if (input.contest_details) {
      this.db.contestDetails.push({
        id: `cd-${eventId}`,
        event_id: eventId,
        platform: (input.platform as any) || 'HRW',
        contest_url: input.contest_details.contest_url || '',
        difficulty: input.contest_details.difficulty || 'Intermediate',
        duration_minutes: input.contest_details.duration_minutes || 90,
        question_count: input.contest_details.question_count || 4,
        registration_count: 0,
        submission_count: 0,
        completion_rate: 0,
        leaderboard_url: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }

    this.logAudit(creatorId, 'Created Event', 'event', eventId, null, newEvent);
    this.persist();
    return newEvent;
  }

  updateEvent(id: string, updates: Partial<EventRecord>, actorId: string): EventRecord | null {
    const idx = this.db.events.findIndex((e) => e.id === id);
    if (idx === -1) return null;
    const old = { ...this.db.events[idx] };
    this.db.events[idx] = {
      ...this.db.events[idx],
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.recalculateDocumentationScore(id);
    this.logAudit(actorId, 'Updated Event Details', 'event', id, old, this.db.events[idx]);
    this.persist();
    return this.db.events[idx];
  }

  // --- STATE MACHINE WORKFLOWS ---
  submitEvent(eventId: string, userId: string): { success: boolean; event?: EventRecord; error?: string } {
    const ev = this.getEventById(eventId);
    if (!ev) return { success: false, error: 'Event not found' };
    if (!['draft', 'changes_requested'].includes(ev.status)) {
      return { success: false, error: `Cannot submit event in status '${ev.status}'` };
    }

    const oldStatus = ev.status;
    ev.status = 'submitted';
    ev.lifecycle_stage = 'PLAN';
    ev.updated_at = new Date().toISOString();

    // Notify all analysts
    const analysts = this.db.profiles.filter((p) => p.role === 'analyst' || p.role === 'admin');
    analysts.forEach((a) => {
      this.createNotification({
        user_id: a.id,
        type: 'event_submitted',
        title: `Event Proposal Submitted: ${ev.event_code}`,
        message: `${ev.created_by_name} submitted '${ev.title}' for review.`,
        entity_type: 'event',
        entity_id: ev.id
      });
    });

    this.logAudit(userId, 'Submitted Event Proposal', 'event', eventId, { status: oldStatus }, { status: 'submitted' });
    this.persist();
    return { success: true, event: ev };
  }

  approveEvent(eventId: string, analystId: string, comment?: string): { success: boolean; event?: EventRecord; error?: string } {
    const ev = this.getEventById(eventId);
    if (!ev) return { success: false, error: 'Event not found' };
    const analyst = this.getProfileById(analystId);

    const oldStatus = ev.status;
    ev.status = 'approved';
    ev.lifecycle_stage = 'BUILD';
    ev.updated_at = new Date().toISOString();

    if (comment) {
      this.addComment({
        event_id: eventId,
        author_id: analystId,
        author_name: analyst?.full_name || 'Analyst',
        author_role: 'analyst',
        comment: comment,
        is_internal: false
      });
    }

    // Notify event owner
    this.createNotification({
      user_id: ev.created_by,
      type: 'event_approved',
      title: `Event Approved: ${ev.event_code}`,
      message: `Your event proposal '${ev.title}' has been approved by ${analyst?.full_name || 'an analyst'}. Ready for promotion and test building.`,
      entity_type: 'event',
      entity_id: ev.id
    });

    this.logAudit(analystId, 'Approved Event Proposal', 'event', eventId, { status: oldStatus }, { status: 'approved' });
    this.persist();
    return { success: true, event: ev };
  }

  requestChanges(eventId: string, analystId: string, reason: string): { success: boolean; event?: EventRecord; error?: string } {
    const ev = this.getEventById(eventId);
    if (!ev) return { success: false, error: 'Event not found' };
    const analyst = this.getProfileById(analystId);

    const oldStatus = ev.status;
    ev.status = 'changes_requested';
    ev.updated_at = new Date().toISOString();

    this.addComment({
      event_id: eventId,
      author_id: analystId,
      author_name: analyst?.full_name || 'Analyst',
      author_role: 'analyst',
      comment: `Changes requested: ${reason}`,
      is_internal: false
    });

    this.createNotification({
      user_id: ev.created_by,
      type: 'changes_requested',
      title: `Changes Requested: ${ev.event_code}`,
      message: `${analyst?.full_name || 'Analyst'} requested modifications on '${ev.title}': ${reason}`,
      entity_type: 'event',
      entity_id: ev.id
    });

    this.logAudit(analystId, 'Requested Changes on Event', 'event', eventId, { status: oldStatus }, { status: 'changes_requested', reason });
    this.persist();
    return { success: true, event: ev };
  }

  rejectEvent(eventId: string, analystId: string, reason: string): { success: boolean; event?: EventRecord; error?: string } {
    const ev = this.getEventById(eventId);
    if (!ev) return { success: false, error: 'Event not found' };
    const analyst = this.getProfileById(analystId);

    const oldStatus = ev.status;
    ev.status = 'rejected';
    ev.updated_at = new Date().toISOString();

    this.addComment({
      event_id: eventId,
      author_id: analystId,
      author_name: analyst?.full_name || 'Analyst',
      author_role: 'analyst',
      comment: `Proposal rejected: ${reason}`,
      is_internal: false
    });

    this.createNotification({
      user_id: ev.created_by,
      type: 'event_rejected',
      title: `Event Proposal Rejected: ${ev.event_code}`,
      message: `Your event '${ev.title}' was rejected by ${analyst?.full_name || 'Analyst'}: ${reason}`,
      entity_type: 'event',
      entity_id: ev.id
    });

    this.logAudit(analystId, 'Rejected Event Proposal', 'event', eventId, { status: oldStatus }, { status: 'rejected', reason });
    this.persist();
    return { success: true, event: ev };
  }

  transitionLifecycleStage(eventId: string, targetStage: LifecycleStage, actorId: string, notes?: string): { success: boolean; error?: string } {
    const ev = this.getEventById(eventId);
    if (!ev) return { success: false, error: 'Event not found' };

    const stages = this.getEventStages(eventId);
    const currStageIndex = stages.findIndex((s) => s.stage === ev.lifecycle_stage);
    const targetStageIndex = stages.findIndex((s) => s.stage === targetStage);

    if (targetStageIndex === -1) return { success: false, error: 'Invalid target stage' };

    // Update stages status
    stages.forEach((st, idx) => {
      if (idx < targetStageIndex) {
        st.status = 'completed';
        if (!st.completed_at) {
          st.completed_at = new Date().toISOString();
          st.completed_by = actorId;
        }
      } else if (idx === targetStageIndex) {
        st.status = 'in_progress';
        st.started_at = new Date().toISOString();
        if (notes) st.notes = notes;
      }
    });

    ev.lifecycle_stage = targetStage;
    if (targetStage === 'EXECUTE') {
      ev.status = 'live';
    } else if (targetStage === 'EVALUATE' || targetStage === 'REWARD' || targetStage === 'DOCUMENT') {
      if (ev.status === 'live') ev.status = 'completed';
    } else if (targetStage === 'IMPROVE' && ev.documentation_score && ev.documentation_score >= 80) {
      ev.status = 'verified';
    }

    ev.updated_at = new Date().toISOString();
    this.recalculateDocumentationScore(eventId);
    this.logAudit(actorId, `Transitioned Stage to ${targetStage}`, 'event', eventId, null, { stage: targetStage, notes });
    this.persist();
    return { success: true };
  }

  // --- STAGES, CHECKLISTS, TEAM ---
  getEventStages(eventId: string): EventStage[] {
    return this.db.stages.filter((s) => s.event_id === eventId);
  }

  getEventChecklists(eventId: string): EventChecklist[] {
    return this.db.checklists.filter((c) => c.event_id === eventId);
  }

  toggleChecklistItem(itemId: string, completed: boolean, actorId: string): EventChecklist | null {
    const item = this.db.checklists.find((c) => c.id === itemId);
    if (!item) return null;
    item.is_completed = completed;
    item.completed_by = completed ? actorId : undefined;
    item.completed_at = completed ? new Date().toISOString() : undefined;
    this.recalculateDocumentationScore(item.event_id);
    this.persist();
    return item;
  }

  getEventTeam(eventId: string): EventTeamMember[] {
    return this.db.team.filter((t) => t.event_id === eventId);
  }

  addTeamMember(member: Omit<EventTeamMember, 'id' | 'created_at'>): EventTeamMember {
    const user = this.getProfileById(member.user_id);
    const newMember: EventTeamMember = {
      id: `tm-${Date.now()}`,
      event_id: member.event_id,
      user_id: member.user_id,
      user_name: user?.full_name,
      user_email: user?.email,
      role: member.role,
      responsibilities: member.responsibilities,
      created_at: new Date().toISOString()
    };
    this.db.team.push(newMember);
    this.persist();
    return newMember;
  }

  // --- PROOFS & STORAGE ---
  getEventProofs(eventId?: string): EventProof[] {
    if (!eventId) return [...this.db.proofs];
    return this.db.proofs.filter((p) => p.event_id === eventId);
  }

  getPendingProofs(): EventProof[] {
    return this.db.proofs.filter((p) => p.verification_status === 'pending');
  }

  addProof(input: Omit<EventProof, 'id' | 'created_at' | 'verification_status'>): EventProof {
    const user = this.getProfileById(input.uploaded_by);
    const newProof: EventProof = {
      id: `prf-${Date.now()}`,
      event_id: input.event_id,
      uploaded_by: input.uploaded_by,
      uploaded_by_name: user?.full_name,
      proof_type: input.proof_type,
      file_path: input.file_path,
      file_name: input.file_name,
      mime_type: input.mime_type,
      file_size: input.file_size,
      description: input.description,
      verification_status: 'pending',
      created_at: new Date().toISOString()
    };
    this.db.proofs.unshift(newProof);
    this.recalculateDocumentationScore(input.event_id);

    // Notify analysts
    const analysts = this.db.profiles.filter((p) => p.role === 'analyst' || p.role === 'admin');
    analysts.forEach((a) => {
      this.createNotification({
        user_id: a.id,
        type: 'proof_uploaded',
        title: 'New Proof Evidence Uploaded',
        message: `${user?.full_name || 'Crew member'} uploaded ${input.proof_type.replace('_', ' ')} for an event.`,
        entity_type: 'proof',
        entity_id: newProof.id
      });
    });

    this.logAudit(input.uploaded_by, 'Uploaded Proof', 'proof', newProof.id, null, newProof);
    this.persist();
    return newProof;
  }

  verifyProof(proofId: string, status: 'approved' | 'rejected' | 'replacement_requested', analystId: string, comment?: string): EventProof | null {
    const proof = this.db.proofs.find((p) => p.id === proofId);
    if (!proof) return null;
    const analyst = this.getProfileById(analystId);

    const oldStatus = proof.verification_status;
    proof.verification_status = status;
    proof.reviewed_by = analystId;
    proof.reviewed_by_name = analyst?.full_name;
    proof.reviewed_at = new Date().toISOString();
    proof.review_comment = comment;

    this.recalculateDocumentationScore(proof.event_id);

    // Notify proof uploader
    this.createNotification({
      user_id: proof.uploaded_by,
      type: status === 'approved' ? 'proof_verified' : 'proof_rejected',
      title: `Proof ${status === 'approved' ? 'Verified' : 'Review Update'}`,
      message: `Your proof '${proof.file_name}' was marked as ${status} by ${analyst?.full_name || 'Analyst'}.`,
      entity_type: 'proof',
      entity_id: proof.id
    });

    this.logAudit(analystId, `Verified Proof (${status})`, 'proof', proofId, { status: oldStatus }, { status, comment });
    this.persist();
    return proof;
  }

  // --- PARTICIPANTS & WINNERS ---
  getEventParticipants(eventId: string): EventParticipant[] {
    return this.db.participants.filter((p) => p.event_id === eventId);
  }

  addParticipant(part: Omit<EventParticipant, 'id' | 'created_at'>): EventParticipant {
    const newPart: EventParticipant = {
      id: `part-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ...part,
      created_at: new Date().toISOString()
    };
    this.db.participants.push(newPart);

    // Update actual participants on event
    const ev = this.getEventById(part.event_id);
    if (ev) {
      ev.actual_registrations = this.db.participants.filter((p) => p.event_id === part.event_id).length;
      ev.actual_participants = this.db.participants.filter((p) => p.event_id === part.event_id && (p.registration_status === 'attended' || p.submission_status === 'completed')).length;
      ev.completed_submissions = this.db.participants.filter((p) => p.event_id === part.event_id && p.submission_status === 'completed').length;
      if (ev.actual_participants > 0) {
        ev.completion_rate = Number(((ev.completed_submissions / ev.actual_participants) * 100).toFixed(1));
      }
    }

    this.recalculateDocumentationScore(part.event_id);
    this.persist();
    return newPart;
  }

  getEventWinners(eventId: string): EventWinner[] {
    return this.db.winners.filter((w) => w.event_id === eventId);
  }

  addWinner(win: Omit<EventWinner, 'id' | 'created_at' | 'updated_at'>): EventWinner {
    const newWin: EventWinner = {
      id: `win-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ...win,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.db.winners.push(newWin);
    this.recalculateDocumentationScore(win.event_id);
    this.persist();
    return newWin;
  }

  verifyWinner(winnerId: string, analystId: string): EventWinner | null {
    const win = this.db.winners.find((w) => w.id === winnerId);
    if (!win) return null;
    win.email_verified = true;
    win.identity_verified = true;
    win.reward_status = 'verified';
    win.updated_at = new Date().toISOString();

    this.logAudit(analystId, 'Verified Event Winner', 'winner', winnerId, null, win);
    this.recalculateDocumentationScore(win.event_id);
    this.persist();
    return win;
  }

  // --- REWARDS ---
  getEventRewards(eventId?: string): RewardSubmission[] {
    if (!eventId) return [...this.db.rewards];
    return this.db.rewards.filter((r) => r.event_id === eventId);
  }

  submitReward(input: Omit<RewardSubmission, 'id' | 'created_at' | 'updated_at'>): RewardSubmission {
    const newReward: RewardSubmission = {
      id: `rew-${Date.now()}`,
      ...input,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.db.rewards.push(newReward);
    this.persist();
    return newReward;
  }

  updateRewardStatus(rewardId: string, status: RewardSubmission['submission_status'], activationStatus?: RewardSubmission['activation_status']): RewardSubmission | null {
    const r = this.db.rewards.find((item) => item.id === rewardId);
    if (!r) return null;
    r.submission_status = status;
    if (activationStatus) r.activation_status = activationStatus;
    r.updated_at = new Date().toISOString();
    this.persist();
    return r;
  }

  // --- CERTIFICATES ---
  getEventCertificates(eventId?: string): Certificate[] {
    if (!eventId) return [...this.db.certificates];
    return this.db.certificates.filter((c) => c.event_id === eventId);
  }

  generateCertificate(cert: Omit<Certificate, 'id' | 'generated_at'>): Certificate {
    const newCert: Certificate = {
      id: `cert-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ...cert,
      generated_at: new Date().toISOString()
    };
    this.db.certificates.push(newCert);
    this.persist();
    return newCert;
  }

  // --- EVENT REPORT ---
  getEventReport(eventId: string): EventReport | undefined {
    return this.db.reports.find((r) => r.event_id === eventId);
  }

  getPendingReports(): EventReport[] {
    return this.db.reports.filter((r) => r.review_status === 'pending');
  }

  submitReport(rep: Omit<EventReport, 'id' | 'submitted_at' | 'created_at' | 'updated_at'>): EventReport {
    const existing = this.db.reports.findIndex((r) => r.event_id === rep.event_id);
    const newRep: EventReport = {
      id: `rep-${Date.now()}`,
      ...rep,
      submitted_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (existing !== -1) {
      this.db.reports[existing] = newRep;
    } else {
      this.db.reports.push(newRep);
    }

    this.recalculateDocumentationScore(rep.event_id);
    this.logAudit(rep.submitted_by, 'Submitted Event Report', 'report', newRep.id, null, newRep);
    this.persist();
    return newRep;
  }

  reviewReport(reportId: string, status: 'approved' | 'changes_requested', analystId: string, comment?: string): EventReport | null {
    const rep = this.db.reports.find((r) => r.id === reportId);
    if (!rep) return null;
    rep.review_status = status;
    rep.reviewed_by = analystId;
    rep.review_comment = comment;
    rep.updated_at = new Date().toISOString();

    const ev = this.getEventById(rep.event_id);
    if (ev && status === 'approved') {
      ev.status = 'verified';
    }

    this.recalculateDocumentationScore(rep.event_id);
    this.logAudit(analystId, `Reviewed Event Report (${status})`, 'report', reportId, null, { status, comment });
    this.persist();
    return rep;
  }

  // --- FEEDBACK & IMPROVEMENTS ---
  getEventFeedback(eventId: string): EventFeedback[] {
    return this.db.feedback.filter((f) => f.event_id === eventId);
  }

  addFeedback(fb: Omit<EventFeedback, 'id' | 'created_at'>): EventFeedback {
    const newFb: EventFeedback = {
      id: `fb-${Date.now()}`,
      ...fb,
      created_at: new Date().toISOString()
    };
    this.db.feedback.push(newFb);
    this.persist();
    return newFb;
  }

  getEventImprovement(eventId: string): EventImprovement | undefined {
    return this.db.improvements.find((i) => i.event_id === eventId);
  }

  saveImprovement(imp: Omit<EventImprovement, 'id' | 'created_at'>): EventImprovement {
    const existing = this.db.improvements.findIndex((i) => i.event_id === imp.event_id);
    const newImp: EventImprovement = {
      id: `imp-${Date.now()}`,
      ...imp,
      created_at: new Date().toISOString()
    };
    if (existing !== -1) {
      this.db.improvements[existing] = newImp;
    } else {
      this.db.improvements.push(newImp);
    }
    this.recalculateDocumentationScore(imp.event_id);
    this.persist();
    return newImp;
  }

  // --- COLLABORATIONS ---
  getCollaborations(): EventCollaboration[] {
    return [...this.db.collaborations];
  }

  createCollaboration(collab: Omit<EventCollaboration, 'id' | 'created_at'>): EventCollaboration {
    const newCollab: EventCollaboration = {
      id: `collab-${Date.now()}`,
      ...collab,
      created_at: new Date().toISOString()
    };
    this.db.collaborations.push(newCollab);
    this.persist();
    return newCollab;
  }

  // --- NOTIFICATIONS ---
  getNotifications(userId: string): NotificationItem[] {
    return this.db.notifications
      .filter((n) => n.user_id === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  createNotification(notif: Omit<NotificationItem, 'id' | 'created_at' | 'is_read'>): NotificationItem {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ...notif,
      is_read: false,
      created_at: new Date().toISOString()
    };
    this.db.notifications.unshift(newNotif);
    this.persist();
    return newNotif;
  }

  markNotificationRead(notifId: string): void {
    const n = this.db.notifications.find((item) => item.id === notifId);
    if (n) {
      n.is_read = true;
      this.persist();
    }
  }

  markAllNotificationsRead(userId: string): void {
    this.db.notifications.forEach((n) => {
      if (n.user_id === userId) n.is_read = true;
    });
    this.persist();
  }

  // --- COMMENTS & AUDIT LOGS ---
  getComments(eventId: string): EventComment[] {
    return this.db.comments.filter((c) => c.event_id === eventId);
  }

  addComment(cmt: Omit<EventComment, 'id' | 'created_at'>): EventComment {
    const newCmt: EventComment = {
      id: `cmt-${Date.now()}`,
      ...cmt,
      created_at: new Date().toISOString()
    };
    this.db.comments.push(newCmt);
    this.persist();
    return newCmt;
  }

  getAuditLogs(): AuditLog[] {
    return [...this.db.auditLogs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  logAudit(actorId: string, action: string, entityType: string, entityId: string, oldVal?: any, newVal?: any): void {
    const actor = this.getProfileById(actorId);
    this.db.auditLogs.unshift({
      id: `aud-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      actor_id: actorId,
      actor_name: actor?.full_name || 'System User',
      actor_email: actor?.email || 'system@campuscrew.org',
      action,
      entity_type: entityType,
      entity_id: entityId,
      old_values: oldVal,
      new_values: newVal,
      created_at: new Date().toISOString()
    });
    if (this.db.auditLogs.length > 500) {
      this.db.auditLogs.pop();
    }
    this.persist();
  }

  // --- ANNOUNCEMENTS & POLICIES ---
  getAnnouncements(): Announcement[] {
    return [...this.db.announcements].sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
  }

  createAnnouncement(ann: Omit<Announcement, 'id' | 'created_at'>): Announcement {
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      ...ann,
      created_at: new Date().toISOString()
    };
    this.db.announcements.unshift(newAnn);
    this.persist();
    return newAnn;
  }

  getRewardPolicies(): RewardPolicy[] {
    return [...this.db.rewardPolicies];
  }

  getMonthlyGoals(userId?: string): MonthlyGoal[] {
    if (userId) {
      return this.db.monthlyGoals.filter((g) => g.user_id === userId);
    }
    return [...this.db.monthlyGoals];
  }

  // --- DOCUMENTATION SCORE RECALCULATION ---
  recalculateDocumentationScore(eventId: string): number {
    const ev = this.getEventById(eventId);
    if (!ev) return 0;

    let score = 0;
    // 1. Event Report: 20%
    const report = this.getEventReport(eventId);
    if (report) score += 20;

    // 2. Proof Photos & telemetry: 15%
    const proofs = this.getEventProofs(eventId);
    if (proofs.length >= 2) score += 15;
    else if (proofs.length === 1) score += 8;

    // 3. Participant Data: 15%
    const participants = this.getEventParticipants(eventId);
    if (participants.length > 0) score += 15;

    // 4. Winner Details: 10%
    const winners = this.getEventWinners(eventId);
    if (winners.length > 0) score += 10;

    // 5. Certificate Status: 10%
    const certs = this.getEventCertificates(eventId);
    if (certs.length > 0 || (report && report.certificates_issued)) score += 10;

    // 6. Social / Promotion: 10%
    const promos = this.db.promotions.filter((p) => p.event_id === eventId);
    if (promos.length > 0) score += 10;

    // 7. Contest Evidence: 10%
    const contestEvidence = proofs.filter((p) => p.proof_type === 'contest_dashboard' || p.proof_type === 'leaderboard');
    if (contestEvidence.length > 0) score += 10;

    // 8. Feedback: 10%
    const fb = this.getEventFeedback(eventId);
    if (fb.length > 0) score += 10;

    ev.documentation_score = Math.min(score, 100);

    // Update risk level
    const now = new Date().getTime();
    const startTime = new Date(ev.start_date).getTime();
    const hoursRemaining = (startTime - now) / (1000 * 60 * 60);

    if (hoursRemaining < 48 && hoursRemaining > 0 && ev.documentation_score < 40 && ev.status !== 'approved' && ev.status !== 'live') {
      ev.risk_level = 'HIGH';
    } else if (hoursRemaining < 72 && hoursRemaining > 0 && ev.status === 'draft') {
      ev.risk_level = 'MEDIUM';
    } else {
      ev.risk_level = 'LOW';
    }

    return ev.documentation_score;
  }

  // --- ANALYTICS AGGREGATIONS ---
  getAnalyticsOverview() {
    const totalCrew = this.db.profiles.filter((p) => p.role === 'crew_member').length;
    const activeCrew = this.db.profiles.filter((p) => p.role === 'crew_member' && p.is_active).length;
    const totalEvents = this.db.events.length;
    const verifiedEvents = this.db.events.filter((e) => e.status === 'verified').length;
    const pendingReviews = this.db.events.filter((e) => ['submitted', 'under_review'].includes(e.status)).length;

    const totalParticipants = this.db.events.reduce((acc, e) => acc + (e.actual_participants || 0), 0);
    const totalRegistrations = this.db.events.reduce((acc, e) => acc + (e.actual_registrations || 0), 0);

    const collegesSet = new Set(this.db.events.map((e) => e.college_id).filter(Boolean));
    const citiesSet = new Set(this.db.colleges.map((c) => c.city));

    const avgCompletion = totalParticipants > 0
      ? Number((this.db.events.reduce((acc, e) => acc + (e.completed_submissions || 0), 0) / totalParticipants * 100).toFixed(1))
      : 72.4;

    const pendingProofCount = this.db.proofs.filter((p) => p.verification_status === 'pending').length;
    const pendingReportCount = this.db.reports.filter((r) => r.review_status === 'pending').length;
    const pendingWinnerCount = this.db.winners.filter((w) => w.reward_status === 'pending' || w.reward_status === 'verification_required').length;
    const highRiskEventsCount = this.db.events.filter((e) => e.risk_level === 'HIGH').length;

    return {
      totalCrew,
      activeCrew,
      totalEvents,
      verifiedEvents,
      pendingReviews,
      totalParticipants,
      totalColleges: collegesSet.size,
      citiesReached: citiesSet.size,
      totalRegistrations,
      uniqueStudents: Math.floor(totalParticipants * 0.82),
      repeatParticipants: Math.floor(totalParticipants * 0.18),
      avgCompletionRate: avgCompletion,
      clubCollaborations: this.db.collaborations.length,
      socialReach: 48200,
      pendingProofCount,
      pendingReportCount,
      pendingWinnerCount,
      highRiskEventsCount
    };
  }

  getMonthlyPerformance() {
    return [
      { month: 'Jul 2026', target: 20, completed: 22, verified: 19 },
      { month: 'Aug 2026', target: 20, completed: 25, verified: 23 },
      { month: 'Sep 2026', target: 25, completed: 28, verified: 26 },
      { month: 'Oct 2026', target: 30, completed: 34, verified: 28 }
    ];
  }

  getEventMix() {
    const counts: Record<string, number> = {};
    this.db.events.forEach((e) => {
      const type = e.event_type_name || 'Coding Contest';
      counts[type] = (counts[type] || 0) + 1;
    });

    const colors = ['#00F5C8', '#6366F1', '#EC4899', '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6'];
    const total = this.db.events.length || 1;

    return Object.entries(counts).map(([name, count], idx) => ({
      name,
      count,
      percentage: Number(((count / total) * 100).toFixed(1)),
      color: colors[idx % colors.length]
    }));
  }

  getCrewPerformance() {
    const crewMembers = this.db.profiles.filter((p) => p.role === 'crew_member');
    return crewMembers.map((cm) => {
      const userEvents = this.db.events.filter((e) => e.created_by === cm.id);
      const verified = userEvents.filter((e) => e.status === 'verified').length;
      const participants = userEvents.reduce((acc, e) => acc + (e.actual_participants || 0), 0);
      const completedSubs = userEvents.reduce((acc, e) => acc + (e.completed_submissions || 0), 0);
      const completionRate = participants > 0 ? Number(((completedSubs / participants) * 100).toFixed(1)) : 0;
      const collabs = this.db.collaborations.filter((c) => c.lead_user_id === cm.id || c.partner_user_id === cm.id).length;
      const docScores = userEvents.map((e) => e.documentation_score || 0);
      const avgDoc = docScores.length > 0 ? Number((docScores.reduce((a, b) => a + b, 0) / docScores.length).toFixed(0)) : 75;

      // Configurable Impact Score Formula
      // verified events (25) + participant tier (20) + completion rate (20) + collaborations (15) + doc quality (20)
      const impactScore = Math.min(
        100,
        Math.round(
          verified * 15 +
          Math.min(participants * 0.1, 25) +
          (completionRate * 0.25) +
          (collabs * 5) +
          (avgDoc * 0.2)
        )
      );

      return {
        id: cm.id,
        crew_code: cm.crew_code,
        name: cm.full_name,
        college_name: cm.college_name || 'Affiliated College',
        events_count: userEvents.length,
        verified_count: verified,
        participants_count: participants,
        completion_rate: completionRate,
        collaborations_count: collabs,
        documentation_score: avgDoc,
        impact_score: impactScore,
        last_activity: userEvents.length > 0 ? userEvents[0].updated_at : cm.updated_at
      };
    }).sort((a, b) => b.impact_score - a.impact_score);
  }

  getCollegePerformance() {
    return this.db.colleges.map((col) => {
      const collegeEvents = this.db.events.filter((e) => e.college_id === col.id);
      const participants = collegeEvents.reduce((acc, e) => acc + (e.actual_participants || 0), 0);
      const completedSubs = collegeEvents.reduce((acc, e) => acc + (e.completed_submissions || 0), 0);
      const completionRate = participants > 0 ? Number(((completedSubs / participants) * 100).toFixed(1)) : 0;
      const repeatParticipants = Math.floor(participants * 0.22);

      const status: 'active' | 'new' | 'returning' =
        collegeEvents.length >= 3 ? 'active' : collegeEvents.length === 1 ? 'new' : 'returning';

      return {
        id: col.id,
        name: col.name,
        city: col.city,
        state: col.state,
        events_count: collegeEvents.length,
        participants_count: participants,
        completion_rate: completionRate,
        repeat_participants: repeatParticipants,
        last_event_date: collegeEvents.length > 0 ? collegeEvents[0].start_date : col.updated_at,
        status
      };
    }).sort((a, b) => b.events_count - a.events_count);
  }
}

// Global Singleton for Next.js App
declare global {
  var __campusCrewDb: DataStore | undefined;
}

export const db = global.__campusCrewDb || (global.__campusCrewDb = new DataStore());
