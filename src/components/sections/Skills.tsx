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

const LEVEL_DOT: Record<string, string> = {
  primary: 'var(--accent)',
  secondary: 'var(--text-sub)',
  learning: 'var(--border-md)',
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
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[var(--accent)] opacity-60" />
            <span className="sys-label-accent">WHAT I WORK WITH</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            Technologies I reach for<br />
            <span className="gradient-text">when things need to ship.</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-lg leading-relaxed">
            Built up through real projects, not just tutorials. Dot colour shows depth of use.
          </p>

          {/* Proficiency legend */}
          <div className="flex items-center gap-6 mt-5 text-xs">
            {[
              { level: 'primary', label: 'Use daily' },
              { level: 'secondary', label: 'Comfortable' },
              { level: 'learning', label: 'Growing' },
            ].map(item => (
              <div key={item.level} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: LEVEL_DOT[item.level] }} />
                <span className="text-[var(--text-sub)]">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActive(null)}
            className={`glow-btn text-xs py-1.5 px-3 ${active === null ? 'glow-btn-primary' : 'glow-btn-ghost'}`}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(active === cat ? null : cat)}
              className={`glow-btn text-xs py-1.5 px-3 ${active === cat ? 'glow-btn-primary' : 'glow-btn-ghost'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.4) }}
              whileHover={{ scale: 1.07, y: -3 }}
              className="glass rounded-xl p-4 text-center cursor-default group"
              style={{ borderColor: skill.level === 'primary' ? 'var(--border-md)' : 'var(--border)' }}
            >
              <div className="flex justify-end mb-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: CAT_COLORS[skill.category] ? (skill.level === 'primary' ? CAT_COLORS[skill.category] : LEVEL_DOT[skill.level]) : LEVEL_DOT[skill.level] }} />
              </div>
              <div className="font-medium text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-tight">
                {skill.name}
              </div>
              <div className="mono mt-1.5" style={{ fontSize: '0.56rem', color: CAT_COLORS[skill.category] || 'var(--text-sub)', opacity: 0.7, letterSpacing: '0.1em' }}>
                {skill.category.toUpperCase()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}