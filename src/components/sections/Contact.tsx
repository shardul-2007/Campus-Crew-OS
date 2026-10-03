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
      {/* ── Real portrait as cinematic closing background layer ── */}
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
            filter: 'blur(96px) saturate(70%) brightness(0.40)',
            opacity: 0.25,
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
        {/* Header with large CONTACT display */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 68 }}
        >
          <span className="s-label">Contact</span>
          <h2
            className="display"
            style={{
              fontSize: 'clamp(3rem, 8.5vw, 7.5rem)',
              color: 'var(--text)',
              lineHeight: 0.95,
              maxWidth: 720,
              marginTop: 20,
            }}
          >
            Contact
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 24 }}>
            <span className="dot-available" />
            <span style={{ fontSize: '0.88rem', color: 'var(--text-2)' }}>
              Open to opportunities, collaborations, and discussions
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
            <p style={{ fontSize: '0.94rem', color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 28 }}>
              Feel free to reach out directly through email or LinkedIn. Based in {PERSONAL.location}, available globally for remote roles.
            </p>

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
                      padding: '16px 22px',
                      borderRadius: 18,
                      textDecoration: 'none',
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        flexShrink: 0,
                        border: '1px solid var(--glass-border-h)',
                        background: 'var(--glass-bg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={17} color="var(--text-2)" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="meta" style={{ marginBottom: 2 }}>{ch.label}</p>
                      <p
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: 500,
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

          {/* Mailto message form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="glass"
            style={{ padding: 'clamp(24px, 4vw, 36px)', borderRadius: 24 }}
          >
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
              Direct message
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-3)', marginBottom: 20 }}>
              Fills your default email client with your message for {PERSONAL.email}.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label
                  htmlFor="contact-name"
                  style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-2)', marginBottom: 6, fontWeight: 500 }}
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
                    fontSize: '0.88rem',
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
                  style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-2)', marginBottom: 6, fontWeight: 500 }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Hello Shardul, let's connect..."
                  style={{
                    width: '100%',
                    padding: '11px 16px',
                    borderRadius: 12,
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text)',
                    fontSize: '0.88rem',
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
                style={{ alignSelf: 'flex-start', marginTop: 4 }}
              >
                {sent ? (
                  '✓ Mail client opened'
                ) : (
                  <>
                    <Send size={14} /> Send via email client
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer closing line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            marginTop: 96,
            paddingTop: 32,
            borderTop: '1px solid var(--glass-border)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            fontSize: '0.80rem',
            color: 'var(--text-3)',
          }}
        >
          <p>
            Shardul Parihar · {PERSONAL.location}
          </p>
          <p>
            Software Engineer / Builder
          </p>
        </motion.div>
      </div>
    </section>
  );
}
