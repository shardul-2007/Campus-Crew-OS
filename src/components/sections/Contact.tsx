'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PERSONAL, CONTACT_CHANNELS } from '@/data/portfolio';

const BASE = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';
const vp = { once: true, margin: '-60px' };

const ICON_MAP: Record<string, LucideIcon> = {
  Mail,
  Linkedin,
  Github,
};

export default function Contact() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\n\n${message}`);
    window.location.href = `mailto:${PERSONAL.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <section id="contact" className="section" aria-label="Contact" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* ── Real portrait background layer ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            bottom: '-15%',
            right: '-10%',
            width: '75%',
            height: '140%',
            backgroundImage: `url(${BASE}/imageshardul.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 25%',
            filter: 'var(--photo-filter)',
            opacity: 'var(--photo-opacity)' as unknown as number,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 90% 70% at 50% 90%, var(--cursor-glow) 0%, transparent 70%),' +
              'linear-gradient(to top, var(--bg) 15%, var(--overlay) 60%, var(--bg) 100%)',
          }}
        />
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 64 }}
        >
          <span className="s-label">Contact</span>
          <h2
            className="display"
            style={{
              fontSize: 'clamp(2.8rem, 8vw, 6.8rem)',
              color: 'var(--text)',
              lineHeight: 0.95,
              maxWidth: 720,
              marginTop: 18,
            }}
          >
            Let&apos;s build something.
          </h2>
          <p
            style={{
              fontSize: '1.02rem',
              color: 'var(--text-2)',
              marginTop: 20,
              maxWidth: 580,
              lineHeight: 1.7,
            }}
          >
            Open to software engineering internships, opportunities, collaborations, open-source projects, and interesting technical ideas.
          </p>
          <p
            style={{
              fontSize: '0.94rem',
              color: 'var(--text-2)',
              marginTop: 10,
              maxWidth: 580,
              lineHeight: 1.6,
            }}
          >
            If you&apos;re building something and think I could contribute, feel free to reach out.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20 }}>
            <span className="dot-available" />
            <span style={{ fontSize: '0.86rem', color: 'var(--text-2)' }}>
              {PERSONAL.location} · Available globally for remote opportunities
            </span>
          </div>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 40,
            alignItems: 'start',
          }}
        >
          {/* Direct channels */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {CONTACT_CHANNELS.map((ch, i) => {
                const Icon = ICON_MAP[ch.icon] || Mail;
                return (
                  <motion.a
                    key={ch.id}
                    href={ch.href}
                    target={ch.id !== 'email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={vp}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -2 }}
                    className="glass"
                    data-cursor="hover"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '18px 22px',
                      borderRadius: 18,
                      textDecoration: 'none',
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        flexShrink: 0,
                        border: '1px solid var(--glass-border-h)',
                        background: 'var(--glass-bg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={18} color="var(--text)" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="meta" style={{ marginBottom: 2 }}>{ch.label}</p>
                      <p
                        style={{
                          fontSize: '0.90rem',
                          fontWeight: 600,
                          color: 'var(--text)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {ch.value}
                      </p>
                    </div>
                    <ArrowRight size={15} color="var(--text-3)" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Direct message form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="glass"
            style={{ padding: 'clamp(24px, 4vw, 36px)', borderRadius: 24 }}
          >
            <p className="meta" style={{ marginBottom: 4 }}>Direct Message</p>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
              Have an idea?
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-2)', marginBottom: 20 }}>
              Send me a message directly.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label
                  htmlFor="contact-name"
                  style={{ display: 'block', fontSize: '0.80rem', color: 'var(--text-2)', marginBottom: 6, fontWeight: 500 }}
                >
                  Your name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  style={{
                    width: '100%',
                    padding: '11px 16px',
                    borderRadius: 12,
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text)',
                    fontSize: '0.90rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--glass-border-h)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--glass-border)'; }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  style={{ display: 'block', fontSize: '0.80rem', color: 'var(--text-2)', marginBottom: 6, fontWeight: 500 }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Hi Shardul, let's connect..."
                  style={{
                    width: '100%',
                    padding: '11px 16px',
                    borderRadius: 12,
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text)',
                    fontSize: '0.90rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--glass-border-h)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--glass-border)'; }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-fill"
                data-cursor="hover"
                style={{ alignSelf: 'flex-start', marginTop: 4, cursor: 'pointer' }}
              >
                {sent ? (
                  '✓ Mail client opened'
                ) : (
                  <>
                    <Send size={14} /> Send via Email
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* ── Footer ── */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: 96,
            paddingTop: 36,
            borderTop: '1px solid var(--glass-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 20,
            }}
          >
            <div>
              <p style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)', marginBottom: 4 }}>
                {PERSONAL.name}
              </p>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-2)', marginBottom: 2 }}>
                Software Engineering Student · Full-Stack Developer · Builder
              </p>
              <p style={{ fontSize: '0.80rem', color: 'var(--text-3)' }}>
                {PERSONAL.location}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                style={{ color: 'var(--text-2)', textDecoration: 'none', fontSize: '0.84rem' }}
              >
                GitHub
              </a>
              <span style={{ color: 'var(--text-3)' }}>·</span>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                style={{ color: 'var(--text-2)', textDecoration: 'none', fontSize: '0.84rem' }}
              >
                LinkedIn
              </a>
              <span style={{ color: 'var(--text-3)' }}>·</span>
              <a
                href={`mailto:${PERSONAL.email}`}
                data-cursor="hover"
                style={{ color: 'var(--text-2)', textDecoration: 'none', fontSize: '0.84rem' }}
              >
                Email
              </a>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 12, fontSize: '0.76rem', color: 'var(--text-3)' }}>
            © 2026 Shardul Parihar
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
