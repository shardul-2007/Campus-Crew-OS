'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { createEventAction } from '@/lib/actions/events';
import {
  Code2,
  Terminal,
  HelpCircle,
  Bug,
  Laptop,
  Cpu,
  BookOpen,
  GraduationCap,
  MessageSquare,
  Users,
  Trophy,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  AlertTriangle,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';

const EVENT_FORMATS = [
  { id: 'type-1', name: 'Coding Contest', slug: 'coding_contest', icon: Code2, desc: 'Timed algorithmic challenges on HRW/HRC.' },
  { id: 'type-2', name: 'DSA Assessment', slug: 'dsa_test', icon: Terminal, desc: 'Diagnostic testing of foundational data structures.' },
  { id: 'type-3', name: 'MCQ Skill Challenge', slug: 'mcq_test', icon: HelpCircle, desc: 'CS fundamentals and speed trivia.' },
  { id: 'type-4', name: 'Debugging Test', slug: 'debugging_test', icon: Bug, desc: 'Detecting bugs in existing codebases.' },
  { id: 'type-6', name: 'Hackathon', slug: 'hackathon', icon: Laptop, desc: 'Collaborative development marathon.' },
  { id: 'type-8', name: 'Technical Workshop', slug: 'workshop', icon: BookOpen, desc: 'Hands-on guided programming session.' },
  { id: 'type-10', name: 'Tech Talk', slug: 'tech_talk', icon: MessageSquare, desc: 'Expert speaker session and architecture insights.' },
  { id: 'type-13', name: 'Community Meetup', slug: 'community_meetup', icon: Users, desc: 'Informal student gathering and peer networking.' },
];

export default function CreateEventWizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    event_type_id: 'type-1',
    title: '',
    objective: '',
    description: '',
    mode: 'online' as 'online' | 'offline' | 'hybrid',
    venue: '',
    expected_participants: 60,
    start_date: '2026-10-25T14:00',
    end_date: '2026-10-25T17:00',
    platform: 'HRW' as 'HRW' | 'HRC' | 'Other',
    registration_url: '',
    event_url: '',
    // Specific metadata
    difficulty: 'Intermediate',
    duration_minutes: 120,
    question_count: 4,
    tech_lead_assigned: true,
    marketing_lead_assigned: true,
    channels: ['linkedin', 'whatsapp', 'college_groups'],
  });

  // Autosave simulation to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('campus_crew_event_draft');
    if (saved) {
      try {
        setFormData((prev) => ({ ...prev, ...JSON.parse(saved) }));
      } catch (e) {}
    }
  }, []);

  const updateField = (field: string, val: any) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: val };
      localStorage.setItem('campus_crew_event_draft', JSON.stringify(next));
      return next;
    });
  };

  const handleNext = () => {
    setError(null);
    if (currentStep === 2 && !formData.title.trim()) {
      setError('Please provide an event title before proceeding.');
      return;
    }
    if (currentStep < 9) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await createEventAction({
        title: formData.title || 'Untitled Campus Event',
        event_type_id: formData.event_type_id,
        objective: formData.objective || 'Promote student coding proficiency on campus.',
        description: formData.description || 'Structured campus chapter activity.',
        mode: formData.mode,
        venue: formData.venue,
        start_date: new Date(formData.start_date).toISOString(),
        end_date: new Date(formData.end_date).toISOString(),
        platform: formData.platform,
        expected_participants: Number(formData.expected_participants) || 50,
        registration_url: formData.registration_url,
        event_url: formData.event_url,
        contest_details: {
          difficulty: formData.difficulty as any,
          duration_minutes: Number(formData.duration_minutes),
          question_count: Number(formData.question_count),
          contest_url: formData.event_url,
        }
      });

      if (res.success && res.event) {
        localStorage.removeItem('campus_crew_event_draft');
        router.push(`/events/${res.event.event_code}`);
      } else {
        setError(res.error || 'Failed to create event proposal');
      }
    } catch (err: any) {
      setError(err.message || 'Submission error');
    } finally {
      setLoading(false);
    }
  };

  const STEPS = [
    'Event Format',
    'Basic Details',
    'Audience',
    'Date & Platform',
    'Test Config',
    'Crew Team',
    'Promotion',
    'Review',
    'Submit'
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest">
            Handbook Planning Protocol
          </span>
          <h1 className="text-2xl font-black text-white mt-0.5">
            Create Event Proposal
          </h1>
        </div>
        <button
          onClick={() => router.push('/events')}
          className="text-xs text-slate-400 hover:text-white"
        >
          Cancel & Exit
        </button>
      </div>

      {/* Step Tracker */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 mb-8 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[600px] text-xs">
          {STEPS.map((sName, idx) => {
            const stepNum = idx + 1;
            const isDone = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;
            return (
              <div key={sName} className="flex items-center gap-1.5">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                    isCurrent
                      ? 'bg-emerald-500 text-black'
                      : isDone
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isDone ? '✓' : stepNum}
                </span>
                <span
                  className={`font-semibold ${
                    isCurrent ? 'text-white' : isDone ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                >
                  {sName}
                </span>
                {idx < STEPS.length - 1 && <span className="text-slate-700 ml-2">›</span>}
              </div>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-lg bg-rose-950/70 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Step Content Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl mb-8">
        {/* Step 1: Event Format */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Step 1: Choose Event Format</h2>
            <p className="text-xs text-slate-400">
              Select one of the handbook authorized formats. Coding Contests directly satisfy the 1-per-month program expectation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {EVENT_FORMATS.map((fmt) => {
                const Icon = fmt.icon;
                const selected = formData.event_type_id === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => updateField('event_type_id', fmt.id)}
                    className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 ${
                      selected
                        ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/50'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-lg shrink-0 ${
                        selected ? 'bg-emerald-500 text-black' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{fmt.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5 leading-snug">{fmt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Basic Details */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Step 2: Basic Event Information</h2>
            <p className="text-xs text-slate-400">
              Set clear objectives so the review analyst understands your goals.
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Event Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="e.g. CodeRush 2026: Campus Algo Challenge"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Primary Objective</label>
              <input
                type="text"
                value={formData.objective}
                onChange={(e) => updateField('objective', e.target.value)}
                placeholder="e.g. Diagnostic testing of 2nd & 3rd year students in Tree & Graph algorithms."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Detailed Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Outline the schedule, target concepts, and problem curation strategy..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        )}

        {/* Step 3: Audience */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Step 3: Audience & Mode</h2>
            <p className="text-xs text-slate-400">
              Define expected participant turnout and event setting.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Delivery Mode</label>
                <select
                  value={formData.mode}
                  onChange={(e) => updateField('mode', e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="online">Online (Virtual HRW test)</option>
                  <option value="offline">Offline (In-person Campus Lab)</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Expected Participants</label>
                <input
                  type="number"
                  min="10"
                  value={formData.expected_participants}
                  onChange={(e) => updateField('expected_participants', Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Threshold: 50+ participants required for official tier rewards.
                </span>
              </div>
            </div>

            {formData.mode !== 'online' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Physical Venue</label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => updateField('venue', e.target.value)}
                  placeholder="e.g. Computer Science Department Lab 3"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}
          </div>
        )}

        {/* Step 4: Date & Platform */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Step 4: Platform Selection & Dates</h2>
            <p className="text-xs text-slate-400">
              The handbook distinguishes between assessment platforms:
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-900/60 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Info className="w-4 h-4" />
                <span>Handbook Platform Guidance:</span>
              </div>
              <p>• <strong>HRW (HackerRank Work):</strong> Primary assessment engine for technical campus contests.</p>
              <p>• <strong>HRC (HackerRank Community):</strong> Alternative/fallback contest environment.</p>
              <p>• <em>SkillUp:</em> Strictly for personal learning/certification, not event hosting.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Contest Platform</label>
                <select
                  value={formData.platform}
                  onChange={(e) => updateField('platform', e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                >
                  <option value="HRW">HRW (Primary Assessment Platform)</option>
                  <option value="HRC">HRC (Fallback Platform)</option>
                  <option value="Other">Other Approved Platform</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Start Date & Time</label>
                <input
                  type="datetime-local"
                  value={formData.start_date}
                  onChange={(e) => updateField('start_date', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Platform Contest Link</label>
              <input
                type="url"
                value={formData.event_url}
                onChange={(e) => updateField('event_url', e.target.value)}
                placeholder="https://hrw.hackerrank.com/tests/your-test-id"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>
          </div>
        )}

        {/* Step 5: Test Config */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Step 5: Event-Specific Configuration</h2>
            <p className="text-xs text-slate-400">
              Configure question complexity and timed parameters.
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => updateField('difficulty', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Duration (Min)</label>
                <input
                  type="number"
                  value={formData.duration_minutes}
                  onChange={(e) => updateField('duration_minutes', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Questions</label>
                <input
                  type="number"
                  value={formData.question_count}
                  onChange={(e) => updateField('question_count', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Team */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Step 6: Assign Organizing Team</h2>
            <p className="text-xs text-slate-400">
              The handbook emphasizes role specialization for reliable execution.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Campus Crew Lead</p>
                  <p className="text-[11px] text-slate-400">Overall coordination & proposal submission</p>
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Assigned (You)
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Technical Lead</p>
                  <p className="text-[11px] text-slate-400">Question testing, edge cases, problem statement proofing</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.tech_lead_assigned}
                  onChange={(e) => updateField('tech_lead_assigned', e.target.checked)}
                  className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Outreach & Marketing Lead</p>
                  <p className="text-[11px] text-slate-400">Campus broadcasts, social posters, classroom visits</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.marketing_lead_assigned}
                  onChange={(e) => updateField('marketing_lead_assigned', e.target.checked)}
                  className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Promotion */}
        {currentStep === 7 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Step 7: Promotion Schedule</h2>
            <p className="text-xs text-slate-400">
              The handbook recommends a structured timeline: T-14, T-7, T-3, T-1, Event Day, and Post-Event.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <label className="block text-xs font-medium text-slate-300 mb-2">Planned Channels</label>
              {['LinkedIn Announcements', 'WhatsApp Chapter Groups', 'Classroom Flyers', 'College Notice Board'].map((ch) => (
                <div key={ch} className="flex items-center gap-2 p-2 rounded bg-slate-950 border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{ch}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 8: Review */}
        {currentStep === 8 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Step 8: Review Event Proposal</h2>
            <p className="text-xs text-slate-400">Verify your information before submitting to the approval queue.</p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
                <span className="text-slate-400">Title:</span>
                <span className="font-bold text-white">{formData.title || 'Untitled Event'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
                <span className="text-slate-400">Platform:</span>
                <span className="font-mono font-bold text-emerald-400">{formData.platform}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
                <span className="text-slate-400">Mode:</span>
                <span className="capitalize text-white">{formData.mode}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
                <span className="text-slate-400">Expected Turnout:</span>
                <span className="font-bold text-white">{formData.expected_participants} students</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-slate-400">Start Date:</span>
                <span className="font-mono text-white">{formData.start_date.replace('T', ' ')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 9: Submit */}
        {currentStep === 9 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-500/10">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white">Ready to Submit Proposal</h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Submitting will automatically initialize the 10-stage lifecycle, assign the default operational checklist, and alert the operations analyst queue.
            </p>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentStep === 1 || loading}
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Back
          </Button>

          {currentStep < 9 ? (
            <Button type="button" variant="primary" size="sm" onClick={handleNext}>
              Next Step
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleSubmit}
              isLoading={loading}
            >
              Submit Event Proposal
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
