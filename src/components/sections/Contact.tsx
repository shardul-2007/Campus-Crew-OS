'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PERSONAL, CONTACT_CHANNELS } from '@/data/portfolio';

const ICON_MAP: Record<string, LucideIcon> = { Mail, Linkedin, Github };

export default function Contact() {
  const [name,    setName]    = useState('');
  const [message, setMessage] = useState('');
  const [sent,    setSent]    = useState(false);

  const basePath = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const sub  = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\n\n${message}`);
    window.location.href = `mailto:${PERSONAL.email}?subject=${sub}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <section id="contact" className="section" aria-label="Contact" style={{ position: 'relative' }}>
      {/* Blurred portrait behind this section — cinematic */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-20%', left: '-10%',
          width: '70%', height: '140%',
          backgroundImage: `url(${basePath}/imageshardul.png)`,
          backgroundSize: 'cover', backgroundPosition: 'center top',
          filter: 'blur(88px) saturate(75%)',
          opacity: 'var(--photo-opacity)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--photo-overlay)' }} />
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        {/* Giant statement */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 80 }}
        >
          <div className="section-eyebrow">
            <span className="label">Contact</span>
            <div className="section-line" />
          </div>
          <h2
            className="display"
            style={{ fontSize: 'clamp(2.8rem,8vw,7rem)', color: 'var(--text)', lineHeight: 0.95, maxWidth: 700 }}
          >
            Let&apos;s build<br />something.
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 24 }}>
            <span className="dot-live" />
            <span style={{ fontSize: '0.88rem', color: 'var(--text-2)' }}>
              Open to internships, collaborations and projects
            </span>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 40 }}>
          {/* Contact channels */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 28 }}>
              Best reached by email or LinkedIn. Based in Pune, India — available remotely.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -2 }}
                    className="glass"
                    data-cursor="hover"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '16px 20px', borderRadius: 18, textDecoration: 'none',
                    }}
                  >
                    <div style={{
                      width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                      border: '1px solid var(--glass-border-h)',
                      background: 'var(--glass)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {Icon && <Icon size={16} color="var(--text-2)" />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p className="label" style={{ marginBottom: 3 }}>{ch.label}</p>
                      <p style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {ch.value}
                      </p>
                    </div>
                    <ArrowRight size={15} color="var(--text-3)" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="glass"
            style={{ padding: 32, borderRadius: 28 }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 24 }}>
              Send a message
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-2)', marginBottom: 7, fontWeight: 500 }}>
                  Your name
                </label>
                <input
                  type="text" required value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  style={{
                    width: '100%', padding: '11px 16px', borderRadius: 12,
                    background: 'var(--glass)', border: '1px solid var(--glass-border)',
                    color: 'var(--text)', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--glass-border-h)'; }}
                  onBlur={e  => { e.target.style.borderColor = 'var(--glass-border)';   }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-2)', marginBottom: 7, fontWeight: 500 }}>
                  Message
                </label>
                <textarea
                  required rows={5} value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Hi Shardul, I'd like to discuss..."
                  style={{
                    width: '100%', padding: '11px 16px', borderRadius: 12,
                    background: 'var(--glass)', border: '1px solid var(--glass-border)',
                    color: 'var(--text)', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none',
                    resize: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--glass-border-h)'; }}
                  onBlur={e  => { e.target.style.borderColor = 'var(--glass-border)';   }}
                />
              </div>
              <p className="label" style={{ marginTop: -4 }}>
                Opens your email client with a pre-filled message
              </p>
              <button
                type="submit"
                className="btn btn-fill"
                data-cursor="hover"
                style={{ alignSelf: 'flex-start' }}
              >
                {sent
                  ? '✓ Email client opened'
                  : <><Send size={14} /> Send message</>}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: 80, fontSize: '0.8rem', color: 'var(--text-3)' }}
        >
          {PERSONAL.location} · {PERSONAL.email}
        </motion.p>
      </div>
    </section>
  );
}
