'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PERSONAL, CONTACT_CHANNELS } from '@/data/portfolio';

const ICON_MAP: Record<string, LucideIcon> = {
  Mail, Linkedin, Github,
};

export default function Contact() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent('Portfolio Contact from ' + name);
    const body = encodeURIComponent('Name: ' + name + '\n\n' + message);
    window.location.href = 'mailto:' + PERSONAL.email + '?subject=' + subject + '&body=' + body;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <section id="contact" className="py-32 relative" style={{ background: '#050810' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(0,245,200,0.04) 0%, transparent 70%)' }} />
      <div className="section-container relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="sys-label-accent">SECTION 08</span>
            <div className="h-px flex-1 max-w-[48px] bg-[var(--accent)] opacity-40" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            OPEN /<br />
            <span className="gradient-text">CONNECTION</span>
          </h2>
          <div className="flex items-center gap-3">
            <span className="status-dot status-dot-pulse" />
            <span className="sys-label-accent">CONNECTION AVAILABLE</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left — direct channels */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <p className="text-[var(--text-muted)] leading-relaxed mb-2">
              Open to software engineering opportunities, collaborations and project discussions.
              Best way to reach me is email or LinkedIn.
            </p>

            {CONTACT_CHANNELS.map((ch, i) => {
              const Icon = ICON_MAP[ch.icon];
              return (
                <motion.a
                  key={ch.id}
                  href={ch.href}
                  target={ch.id !== 'email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass glass-hover rounded-xl p-5 flex items-center gap-4 group"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent-dim)', border: '1px solid var(--border-glow)' }}
                  >
                    {Icon && <Icon size={18} className="text-[var(--accent)]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="sys-label mb-0.5">{ch.label}</div>
                    <div className="text-sm font-medium text-[var(--text)] truncate group-hover:text-[var(--accent)] transition-colors">
                      {ch.value}
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-[var(--text-sub)] group-hover:text-[var(--accent)] transition-colors flex-shrink-0" />
                </motion.a>
              );
            })}

            <div className="glass rounded-xl p-5 mt-2" style={{ borderColor: 'var(--border-glow)', background: 'var(--accent-dim)' }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="status-dot status-dot-pulse" />
                <span className="sys-label-accent">AVAILABILITY STATUS</span>
              </div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Currently available for internships, freelance projects, and collaborations.
                Response time: within 24-48 hours.
              </p>
              <div className="mt-3 mono text-xs text-[var(--text-sub)]">LOCATION: {PERSONAL.location.toUpperCase()}</div>
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[var(--border)]">
              <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
              <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
              <div className="w-2 h-2 rounded-full bg-[#28C840]" />
              <span className="mono text-xs text-[var(--text-sub)] ml-2">new_connection.sh</span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="sys-label block mb-2">YOUR NAME <span className="text-[var(--accent)]">*</span></label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full px-4 py-3 rounded-lg mono text-sm outline-none transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border-md)',
                    color: 'var(--text)',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--border-glow)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border-md)'; }}
                />
              </div>

              <div>
                <label className="sys-label block mb-2">MESSAGE <span className="text-[var(--accent)]">*</span></label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Hi Shardul, I would like to discuss..."
                  className="w-full px-4 py-3 rounded-lg mono text-sm outline-none transition-colors resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border-md)',
                    color: 'var(--text)',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--border-glow)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border-md)'; }}
                />
              </div>

              <div className="mono text-xs text-[var(--text-sub)]">
                This will open your email client with a pre-filled message to {PERSONAL.email}
              </div>

              <button type="submit" className="glow-btn glow-btn-primary self-start">
                {sent ? '✓ EMAIL CLIENT OPENED' : <><Send size={14} /> SEND MESSAGE</>}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}