'use client';
import { motion } from 'framer-motion';
import { ACHIEVEMENTS } from '@/data/portfolio';
import { Linkedin, ArrowUpRight } from 'lucide-react';

const CAT_COLORS: Record<string, string> = {
  'OPEN SOURCE': '#5B8DEF',
  COMMUNITY: '#A78BFA',
  PROGRAM: '#00F5C8',
};

export default function Achievements() {
  return (
    <section id="achievements" className="py-32 relative" style={{ background: '#050810' }}>
      <div className="section-container">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="sys-label-accent">SECTION 06</span>
            <div className="h-px flex-1 max-w-[48px] bg-[var(--accent)] opacity-40" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            ACHIEVEMENT /<br />
            <span className="gradient-text">LOG</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-lg">
            Campus programs, open source contributions, and community roles. Each one a verified milestone.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="glass rounded-xl p-5 group hover:border-[var(--border-md)] transition-all hover:-translate-y-1 cursor-default relative overflow-hidden"
            >
              {/* Subtle top gradient */}
              <div className="absolute inset-0 rounded-xl pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(0,245,200,0.03) 0%, transparent 60%)' }} />

              <div
                className="mono text-[9px] font-bold tracking-[0.15em] mb-3 px-2 py-0.5 rounded-full self-start inline-block"
                style={{
                  background: CAT_COLORS[a.cat] ? CAT_COLORS[a.cat] + '1a' : 'rgba(255,255,255,0.04)',
                  color: CAT_COLORS[a.cat] || 'var(--text-sub)',
                  border: '1px solid ' + (CAT_COLORS[a.cat] ? CAT_COLORS[a.cat] + '44' : 'var(--border)'),
                }}
              >
                {a.cat}
              </div>

              <div className="text-xl mb-2">{a.icon}</div>
              <h3 className="font-semibold text-sm leading-tight mb-1">{a.name}</h3>
              <div className="mono text-xs text-[var(--text-sub)] mb-2">{a.org}</div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3">{a.detail}</p>

              <div className="mono text-[10px] text-[var(--text-sub)]">{a.year}</div>
            </motion.div>
          ))}
        </div>

        {/* Single LinkedIn proof note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex items-center gap-4 glass rounded-2xl p-5"
          style={{ borderColor: 'rgba(0,245,200,0.1)' }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--accent-dim)', border: '1px solid var(--border-glow)' }}
          >
            <Linkedin size={18} className="text-[var(--accent)]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="sys-label mb-1">VERIFIED CREDENTIALS</div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              All offer letters, badges and certificates for the above roles are available on my{' '}
              <span className="text-[var(--accent)] font-medium">LinkedIn Experience section</span>
              {' '}— including Google, Internshala, GUVI, Physics Wallah, RemoteRecruit, HackerRank, GSSoC and NSOC.
            </p>
          </div>
          <a
            href="https://www.linkedin.com/in/shardul-parihar-/"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-btn glow-btn-ghost text-xs flex-shrink-0"
          >
            LINKEDIN <ArrowUpRight size={13} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
