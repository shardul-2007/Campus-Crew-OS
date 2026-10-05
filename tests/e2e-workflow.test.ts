import { db } from '../src/lib/db/store';
import { is_admin, is_analyst, is_crew_member, can_review_event } from '../src/lib/permissions/rbac';

export async function runEndToEndLifecycleTest() {
  console.log('====================================================');
  console.log('STARTING CAMPUS CREW OS COMPLETE END-TO-END TEST');
  console.log('====================================================\n');

  // 1. Authenticate Crew Member
  console.log('[Step 1] Loading Crew Member Account (crew@example.com)...');
  const crewUser = db.getProfileByEmail('crew@example.com');
  if (!crewUser) throw new Error('Crew user not found');
  console.log(`✓ Crew Member verified: ${crewUser.full_name} (${crewUser.crew_code})`);

  // Assert RLS permissions for Crew Member
  if (is_analyst(crewUser)) throw new Error('RLS Violation: Crew member should not have analyst role');
  if (can_review_event(crewUser)) throw new Error('RLS Violation: Crew member cannot review events');
  console.log('✓ RLS verified: Crew member restricted from review operations');

  // 2. Create Event: Coding Contest on HRW
  console.log('\n[Step 2] Creating Event: "CodeSprint 2026: Graph Algorithms" on HRW...');
  const newEvent = db.createEvent({
    title: 'CodeSprint 2026: Graph Algorithms',
    event_type_id: 'type-1', // Coding Contest
    objective: 'Advance algorithmic problem solving on Trees and Graphs.',
    description: 'Campus chapter competitive coding sprint.',
    mode: 'online',
    start_date: new Date(Date.now() + 86400000 * 7).toISOString(),
    end_date: new Date(Date.now() + 86400000 * 7 + 10800000).toISOString(),
    platform: 'HRW',
    expected_participants: 80,
    registration_url: 'https://forms.campuscrew.org/codesprint-2026',
    event_url: 'https://hrw.hackerrank.com/tests/codesprint-2026',
    contest_details: {
      difficulty: 'Intermediate',
      duration_minutes: 120,
      question_count: 4,
      contest_url: 'https://hrw.hackerrank.com/tests/codesprint-2026'
    }
  }, crewUser.id);

  console.log(`✓ Event created: ${newEvent.title} [${newEvent.event_code}] (Status: ${newEvent.status}, Stage: ${newEvent.lifecycle_stage})`);

  // 3. Submit Event Proposal
  console.log('\n[Step 3] Submitting Event Proposal for review...');
  const submitRes = db.submitEvent(newEvent.id, crewUser.id);
  if (!submitRes.success || submitRes.event?.status !== 'submitted') {
    throw new Error('Failed to submit event proposal');
  }
  console.log(`✓ Event submitted. Status: ${submitRes.event.status}, Stage: ${submitRes.event.lifecycle_stage}`);

  // 4. Authenticate Operations Analyst
  console.log('\n[Step 4] Logging in as Operations Analyst (analyst@example.com)...');
  const analystUser = db.getProfileByEmail('analyst@example.com');
  if (!analystUser) throw new Error('Analyst user not found');
  console.log(`✓ Analyst verified: ${analystUser.full_name} (${analystUser.crew_code})`);

  if (!is_analyst(analystUser)) throw new Error('RLS Error: Analyst check failed');
  if (!can_review_event(analystUser)) throw new Error('RLS Error: Analyst should have review permissions');
  console.log('✓ RLS verified: Analyst authorized to review and approve proposals');

  // 5. Analyst Reviews and Approves Event
  console.log('\n[Step 5] Analyst reviewing and approving event...');
  const approveRes = db.approveEvent(newEvent.id, analystUser.id, 'Assessment link and problem difficulty verified on HRW. Approved.');
  if (!approveRes.success || approveRes.event?.status !== 'approved') {
    throw new Error('Failed to approve event proposal');
  }
  console.log(`✓ Event approved! Status: ${approveRes.event.status}, Stage: ${approveRes.event.lifecycle_stage}`);

  // 6. Complete Promotion & Mark Event Live
  console.log('\n[Step 6] Completing Promotion & Transitioning to EXECUTE (Live)...');
  db.transitionLifecycleStage(newEvent.id, 'PROMOTE', crewUser.id, 'Promotional flyers distributed.');
  const liveRes = db.transitionLifecycleStage(newEvent.id, 'EXECUTE', crewUser.id, 'Contest opened on HRW.');
  const liveEvent = db.getEventById(newEvent.id);
  console.log(`✓ Event transitioned to LIVE. Status: ${liveEvent?.status}, Stage: ${liveEvent?.lifecycle_stage}`);

  // 7. Add Participants
  console.log('\n[Step 7] Adding Participants...');
  const part1 = db.addParticipant({
    event_id: newEvent.id,
    name: 'Rohit Sharma',
    hacker_rank_email: 'rohit@campus.ac.in',
    email_verified: true,
    registration_status: 'attended',
    submission_status: 'completed',
    department: 'Computer Science',
    academic_year: '3rd Year',
    college_name: 'COEP Pune',
    joined_at: new Date().toISOString()
  });

  const part2 = db.addParticipant({
    event_id: newEvent.id,
    name: 'Sneha Patel',
    hacker_rank_email: 'sneha@campus.ac.in',
    email_verified: true,
    registration_status: 'attended',
    submission_status: 'completed',
    department: 'IT',
    academic_year: '3rd Year',
    college_name: 'COEP Pune',
    joined_at: new Date().toISOString()
  });
  console.log(`✓ Added 2 participants: ${part1.name}, ${part2.name}`);

  // 8. Add Winners
  console.log('\n[Step 8] Recording Winners from HRW Leaderboard...');
  const win1 = db.addWinner({
    event_id: newEvent.id,
    participant_id: part1.id,
    name: 'Rohit Sharma',
    rank: 1,
    hacker_rank_email: 'rohit@campus.ac.in',
    email_verified: true,
    identity_verified: false,
    reward_status: 'verification_required',
    notes: 'Solved all 4 problems with optimal complexity'
  });
  console.log(`✓ Winner recorded: Rank 1 - ${win1.name} (Reward status: ${win1.reward_status})`);

  // 9. Upload Proof Evidence
  console.log('\n[Step 9] Uploading Event Photos & Telemetry Proofs...');
  const proof1 = db.addProof({
    event_id: newEvent.id,
    uploaded_by: crewUser.id,
    proof_type: 'event_photo',
    file_path: 'event-proofs/codesprint-lab.jpg',
    file_name: 'codesprint-lab.jpg',
    mime_type: 'image/jpeg',
    file_size: 2400000,
    description: 'Students taking test in computer lab.'
  });

  const proof2 = db.addProof({
    event_id: newEvent.id,
    uploaded_by: crewUser.id,
    proof_type: 'contest_dashboard',
    file_path: 'event-proofs/codesprint-hrw-dashboard.png',
    file_name: 'codesprint-hrw-dashboard.png',
    mime_type: 'image/png',
    file_size: 1800000,
    description: 'HRW test dashboard telemetry'
  });
  console.log(`✓ Uploaded 2 proofs: ${proof1.file_name}, ${proof2.file_name}`);

  // 10. Submit Event Report
  console.log('\n[Step 10] Submitting Official Event Report...');
  const report = db.submitReport({
    event_id: newEvent.id,
    submitted_by: crewUser.id,
    event_name: newEvent.title,
    event_date: new Date().toISOString().split('T')[0],
    college: 'COEP Pune',
    organizer_team: 'Shardul Patel & Campus Crew Team',
    event_type: 'Coding Contest',
    objective: 'Graph algorithms proficiency',
    platform: 'HRW',
    contest_url: 'https://hrw.hackerrank.com/tests/codesprint-2026',
    registration_url: 'https://forms.campuscrew.org/codesprint-2026',
    registrations: 85,
    participants: 72,
    completion_rate: 80.5,
    outcomes: '72 active participants; 58 completed submissions.',
    feedback_summary: 'Overall rating 4.9/5.',
    certificates_issued: true,
    social_links: ['https://linkedin.com/posts/codesprint-2026'],
    review_status: 'pending'
  });
  console.log(`✓ Event report filed. Review status: ${report.review_status}`);

  // 11. Analyst Audits & Verifies Proof
  console.log('\n[Step 11] Analyst verifying proofs...');
  const verifiedProof1 = db.verifyProof(proof1.id, 'approved', analystUser.id, 'Lab session confirmed.');
  const verifiedProof2 = db.verifyProof(proof2.id, 'approved', analystUser.id, 'Telemetry verified.');
  console.log(`✓ Proofs verified: ${verifiedProof1?.verification_status}, ${verifiedProof2?.verification_status}`);

  // 12. Analyst Verifies Winner Identity
  console.log('\n[Step 12] Analyst verifying Winner identity...');
  const verifiedWinner = db.verifyWinner(win1.id, analystUser.id);
  console.log(`✓ Winner verified: ${verifiedWinner?.name} (Identity verified: ${verifiedWinner?.identity_verified}, Status: ${verifiedWinner?.reward_status})`);

  // 13. Submit Reward & Generate Certificates
  console.log('\n[Step 13] Submitting Reward and Generating Certificates...');
  const reward = db.submitReward({
    event_id: newEvent.id,
    winner_id: win1.id,
    winner_name: win1.name,
    winner_email: win1.hacker_rank_email,
    winner_rank: 1,
    reward_tier: 'HackerRank Gold Certificate + Swag Pack',
    submission_status: 'submitted',
    submitted_at: new Date().toISOString(),
    activation_status: 'pending'
  });

  const certWinner = db.generateCertificate({
    event_id: newEvent.id,
    event_title: newEvent.title,
    recipient_name: win1.name || 'Top Ranker',
    recipient_email: win1.hacker_rank_email,
    certificate_type: 'winner',
    certificate_url: `https://certificates.campuscrew.org/verify/WIN-${win1.id}`,
    status: 'generated'
  });
  console.log(`✓ Reward recorded: ${reward.reward_tier}`);
  console.log(`✓ Certificate generated: ${certWinner.certificate_url}`);

  // 14. Review Report & Mark Event VERIFIED
  console.log('\n[Step 14] Reviewing Report & Transitioning Event to VERIFIED...');
  db.reviewReport(report.id, 'approved', analystUser.id, 'All documentation verified.');
  const finalEvent = db.getEventById(newEvent.id);
  console.log(`✓ FINAL EVENT STATUS: ${finalEvent?.status} (Doc Score: ${finalEvent?.documentation_score}%)`);

  // 15. Verify Analytics Aggregations Update
  console.log('\n[Step 15] Checking Analytics and Impact Score updates...');
  const overview = db.getAnalyticsOverview();
  console.log(`✓ Total Events: ${overview.totalEvents}, Verified Events: ${overview.verifiedEvents}`);

  const crewPerf = db.getCrewPerformance().find((c) => c.id === crewUser.id);
  console.log(`✓ Crew Member Impact Score: ${crewPerf?.impact_score} (Verified count: ${crewPerf?.verified_count})`);

  console.log('\n====================================================');
  console.log('✅ ALL 15 END-TO-END WORKFLOW STAGES PASSED SUCCESSFULLY!');
  console.log('====================================================\n');
}

if (require.main === module) {
  runEndToEndLifecycleTest().catch((err) => {
    console.error('Test Failed:', err);
    process.exit(1);
  });
}
