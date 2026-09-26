'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACHIEVEMENTS } from '@/data/portfolio';
import { Linkedin, ArrowUpRight, X, ExternalLink } from 'lucide-react';

const CAT_COLORS: Record<string, string> = {
  'OPEN SOURCE': '#5B8DEF',
  COMMUNITY: '#A78BFA',
  PROGRAM: '#00F5C8',
};

export default function Achievements() {
  const [showModal, setShowModal] = useState(false);

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

        {/* Achievement cards — NO individual proof buttons */}
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

        {/* Single CTA button at the bottom */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={() => setShowModal(true)}
            className="glow-btn glow-btn-primary text-sm gap-2"
            style={{ padding: '14px 28px', fontSize: '0.82rem' }}
          >
            <Linkedin size={16} />
            VIEW ALL PROOFS, OFFER LETTERS &amp; CERTIFICATES
          </button>
        </motion.div>
      </div>

      {/* Popup modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(5,8,16,0.88)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.88, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl overflow-hidden max-w-md w-full"
              style={{ borderColor: 'var(--border-glow)', boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 40px rgba(0,245,200,0.08)' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]" style={{ background: 'rgba(0,245,200,0.05)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-dim)', border: '1px solid var(--border-glow)' }}>
                    <Linkedin size={16} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <div className="sys-label-accent" style={{ fontSize: '0.65rem' }}>VERIFIED CREDENTIALS</div>
                    <div className="font-semibold text-sm">Proofs &amp; Certificates</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent-dim)] transition-all"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal body */}
              <div className="px-6 py-6">
                {/* Credentials list */}
                <div className="flex flex-col gap-2 mb-6">
                  {[
                    { name: 'Google Campus Ambassador', year: '2025' },
                    { name: 'Internshala Campus Ambassador', year: '2025' },
                    { name: 'GUVI Campus Ambassador', year: '2025' },
                    { name: 'Physics Wallah Ambassador', year: '2025' },
                    { name: 'GirlScript Summer of Code', year: '2025' },
                    { name: 'NSOC Contributor', year: '2025' },
                    { name: 'RemoteRecruit Ambassador', year: '2026' },
                    { name: 'HackerRank Campus Community', year: '2026' },
                  ].map(item => (
                    <div key={item.name} className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                      <div className="flex items-center gap-2">
                        <span className="status-dot" style={{ width: 5, height: 5, background: 'var(--accent)', opacity: 0.6 }} />
                        <span className="text-sm text-[var(--text-muted)]">{item.name}</span>
                      </div>
                      <span className="mono text-[10px] text-[var(--text-sub)]">{item.year}</span>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 text-center">
                  All offer letters, badges &amp; certificates for the above roles are available on my{' '}
                  <span className="text-[var(--accent)] font-semibold">LinkedIn Profile — Experience section</span>.
                </p>

                <a
                  href="https://www.linkedin.com/in/shardul-parihar-/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-btn glow-btn-primary w-full justify-center text-sm"
                  style={{ padding: '12px 20px' }}
                >
                  <Linkedin size={15} />
                  OPEN LINKEDIN PROFILE
                  <ExternalLink size={13} />
                </a>

                {/* Thank you message */}
                <div className="mt-5 pt-4 border-t border-[var(--border)] text-center">
                  <div className="mono text-xs text-[var(--text-sub)] tracking-wider">
                    ✦ &nbsp; Thank you for visiting SHARDUL.OS &nbsp; ✦
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}