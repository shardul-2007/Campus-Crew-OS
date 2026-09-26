'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '@/data/portfolio';

const CATEGORIES = ['Frontend', 'Languages', 'Backend', 'AI', 'Tools', 'CS', 'Cybersecurity'];

const CAT_COLORS: Record<string, string> = {
  Frontend: '#00F5C8',
  Languages: '#5B8DEF',
  Backend: '#A78BFA',
  AI: '#F59E0B',
  Tools: '#6B7280',
  CS: '#00F5C8',
  Cybersecurity: '#EF4444',
};

const LEVEL_LABELS: Record<string, string> = {
  primary: 'PRIMARY',
  secondary: 'SECONDARY',
  learning: 'LEARNING',
};

export default function Skills() {
  const [active, setActive] = useState<string | null>(null);

  const filtered = active ? SKILLS.filter(s => s.category === active) : SKILLS;

  return (
    <section id="skills" className="py-32 relative" style={{ background: '#060a14' }}>
      <div className="section-container">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="sys-label-accent">SECTION 05</span>
            <div className="h-px flex-1 max-w-[48px] bg-[var(--accent)] opacity-40" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            TECH STACK /<br />
            <span className="gradient-text">CAPABILITIES</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-lg">
            Technologies I use to ship. Filter by category. Dot color indicates proficiency level.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex items-center gap-6 mb-8 text-xs">
          {[
            { level: 'primary', label: 'Primary', color: 'var(--accent)' },
            { level: 'secondary', label: 'Secondary', color: 'var(--text-sub)' },
            { level: 'learning', label: 'Learning', color: 'var(--border-md)' },
          ].map(item => (
            <div key={item.level} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
              <span className="sys-label">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActive(null)}
            className={`glow-btn text-xs py-2 px-4 ${active === null ? 'glow-btn-primary' : 'glow-btn-ghost'}`}
          >
            ALL
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(active === cat ? null : cat)}
              className={`glow-btn text-xs py-2 px-4 ${active === cat ? 'glow-btn-primary' : 'glow-btn-ghost'}`}
              style={active === cat ? { background: CAT_COLORS[cat], borderColor: CAT_COLORS[cat] } : {}}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
        >
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.035, 0.5) }}
              whileHover={{ scale: 1.06, y: -2 }}
              className="glass rounded-xl p-4 text-center cursor-default group relative"
              style={{
                borderColor: skill.level === 'primary' ? 'var(--border-md)' : 'var(--border)',
              }}
            >
              {/* Level dot */}
              <div className="absolute top-2.5 right-2.5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background:
                      skill.level === 'primary'
                        ? CAT_COLORS[skill.category] || 'var(--accent)'
                        : skill.level === 'secondary'
                        ? 'var(--text-sub)'
                        : 'var(--border-md)',
                  }}
                />
              </div>

              {/* Category label */}
              <div
                className="mono mb-1.5"
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.12em',
                  color: CAT_COLORS[skill.category] || 'var(--accent)',
                  opacity: 0.65,
                }}
              >
                {skill.category.toUpperCase()}
              </div>

              {/* Skill name */}
              <div className="font-semibold text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-tight">
                {skill.name}
              </div>

              {/* Level label */}
              <div className="mono mt-1.5" style={{ fontSize: '0.58rem', color: 'var(--text-sub)' }}>
                {LEVEL_LABELS[skill.level]}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
