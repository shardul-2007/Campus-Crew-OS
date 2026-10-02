'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '@/data/portfolio';

const GROUPS = [
  { key: 'Frontend',     label: 'Frontend',     color: '#00F5C8', desc: 'UI & web interfaces' },
  { key: 'Languages',    label: 'Languages',    color: '#5B8DEF', desc: 'Core programming' },
  { key: 'Backend',      label: 'Backend',      color: '#A78BFA', desc: 'Server & APIs' },
  { key: 'AI',           label: 'AI / ML',      color: '#F59E0B', desc: 'Intelligent systems' },
  { key: 'Tools',        label: 'Tools',        color: '#6B7280', desc: 'Dev workflow' },
  { key: 'CS',           label: 'CS',           color: '#00F5C8', desc: 'Fundamentals' },
  { key: 'Cybersecurity',label: 'Security',     color: '#EF4444', desc: 'Cyber & infosec' },
];

const LEVEL_DOT: Record<string, string> = {
  primary: 'var(--accent)', secondary: 'rgba(255,255,255,0.3)', learning: 'rgba(255,255,255,0.12)',
};
const LEVEL_LABEL: Record<string, string> = {
  primary: 'Daily', secondary: 'Proficient', learning: 'Learning',
};

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const displayGroups = activeGroup
    ? GROUPS.filter(g => g.key === activeGroup)
    : GROUPS;

  return (
    <section id="skills" className="py-28 relative" style={{ background: '#060a14' }}>
      <div className="section-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[var(--accent)] opacity-60" />
            <span className="sys-label-accent">WHAT I WORK WITH</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Tech Stack &amp;<br />
            <span className="gradient-text">Capabilities</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-md leading-relaxed">
            Built through real projects. Grouped by domain — filter to explore.
          </p>
          <div className="flex items-center gap-6 mt-5 text-xs flex-wrap">
            {Object.entries(LEVEL_LABEL).map(([lvl, label]) => (
              <div key={lvl} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: LEVEL_DOT[lvl] }} />
                <span className="text-[var(--text-sub)]">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Group filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveGroup(null)}
            className={`glow-btn text-xs py-2 px-4 ${!activeGroup ? 'glow-btn-primary' : 'glow-btn-ghost'}`}
          >
            All
          </button>
          {GROUPS.map(g => (
            <button
              key={g.key}
              onClick={() => setActiveGroup(activeGroup === g.key ? null : g.key)}
              className={`glow-btn text-xs py-2 px-4 ${activeGroup === g.key ? 'glow-btn-primary' : 'glow-btn-ghost'}`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Grouped skill blocks */}
        <div className="flex flex-col gap-8">
          {displayGroups.map((group, gi) => {
            const groupSkills = SKILLS.filter(s => s.category === group.key);
            if (!groupSkills.length) return null;
            return (
              <motion.div
                key={group.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.06 }}
              >
                {/* Group header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full" style={{ background: group.color }} />
                  <span className="font-semibold text-sm" style={{ color: group.color }}>{group.label}</span>
                  <span className="text-xs text-[var(--text-sub)]">— {group.desc}</span>
                  <div className="h-px flex-1 bg-[var(--border)]" />
                  <span className="mono text-[10px] text-[var(--text-sub)]">{groupSkills.length} tools</span>
                </div>

                {/* Skill cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
                  {groupSkills.map((skill, si) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: si * 0.04 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="glass rounded-xl p-3.5 flex flex-col gap-2 cursor-default group"
                      style={{ borderColor: skill.level === 'primary' ? group.color + '30' : 'var(--border)' }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: LEVEL_DOT[skill.level] }} />
                        <span className="mono text-[8px] tracking-widest" style={{ color: group.color, opacity: 0.65 }}>{group.label.toUpperCase()}</span>
                      </div>
                      <div className="font-medium text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-tight">
                        {skill.name}
                      </div>
                      <div className="mono text-[9px] text-[var(--text-sub)]">{LEVEL_LABEL[skill.level]}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}