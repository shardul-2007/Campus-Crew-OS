'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, MapPin, Zap } from 'lucide-react';
import { PERSONAL } from '@/data/portfolio';
import { useRef } from 'react';

const BASE = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

const CHIPS = [
  { label: 'Full Stack',     accent: true  },
  { label: 'AI / ML',        accent: false },
  { label: 'Web Dev',        accent: false },
  { label: 'Cybersecurity',  accent: false },
  { label: 'Open Source',    accent: false },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY   = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen overflow-hidden flex items-center">

      {/* Deep background */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 70% at 70% 50%, rgba(0,245,200,0.04) 0%, transparent 65%), #050810' }} />
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />

      {/* Ambient glow from portrait side */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(0,245,200,0.06) 0%, transparent 70%)' }} />

      <div className="section-container relative z-10 w-full py-32 pt-36">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center min-h-[80vh]">

          {/* ── LEFT: Text ─────────────────────────────────────────── */}
          <motion.div style={{ y: textY }} className="flex flex-col order-2 lg:order-1">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="status-dot status-dot-pulse" style={{ width: 7, height: 7 }} />
              <span className="mono text-xs tracking-[0.22em] text-[var(--accent)]">OPEN TO OPPORTUNITIES</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold tracking-tight leading-none mb-6"
              style={{ fontSize: 'clamp(3.2rem, 7vw, 5.5rem)', letterSpacing: '-0.02em' }}
            >
              <span className="block text-[var(--text)]">Shardul</span>
              <span className="block gradient-text">Parihar.</span>
            </motion.h1>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mono text-sm tracking-[0.15em] text-[var(--text-sub)] mb-6 uppercase"
            >
              Software Engineer &nbsp;/&nbsp; Builder &nbsp;/&nbsp; AI Enthusiast
            </motion.p>

            {/* Chip row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {CHIPS.map((c, i) => (
                <motion.span
                  key={c.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  className="mono text-[11px] px-3 py-1.5 rounded-full"
                  style={{
                    background: c.accent ? 'var(--accent-dim)' : 'rgba(255,255,255,0.04)',
                    border: c.accent ? '1px solid var(--border-glow)' : '1px solid var(--border)',
                    color: c.accent ? 'var(--accent)' : 'var(--text-muted)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {c.label}
                </motion.span>
              ))}
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base text-[var(--text-muted)] leading-relaxed mb-10 max-w-md"
              style={{ fontWeight: 300 }}
            >
              {PERSONAL.bio}
            </motion.p>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex items-center gap-4 mb-10 text-xs text-[var(--text-sub)] mono"
            >
              <span className="flex items-center gap-1.5"><MapPin size={12} /> Pune, India</span>
              <span className="w-px h-3 bg-[var(--border)]" />
              <span className="flex items-center gap-1.5"><Zap size={12} className="text-[var(--accent)]" />Open to work</span>
              <span className="w-px h-3 bg-[var(--border)]" />
              <span className="text-[var(--text-sub)]">Build {PERSONAL.buildVersion}</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-wrap gap-3"
            >
              <a href="#projects" className="glow-btn glow-btn-primary">See My Work</a>
              <a href="#contact"  className="glow-btn glow-btn-ghost">Get In Touch</a>
              <a href="https://www.linkedin.com/in/shardul-parihar/" target="_blank" rel="noopener noreferrer" className="glow-btn glow-btn-ghost">
                LinkedIn
              </a>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Portrait with cinematic center-reveal ────────── */}
          <motion.div
            style={{ y: portraitY }}
            className="relative flex items-center justify-center order-1 lg:order-2"
          >
            {/* Outer ambient glow */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: 420, height: 500,
                borderRadius: '40% 60% 55% 45% / 45% 40% 60% 55%',
                background: 'radial-gradient(circle, rgba(0,245,200,0.12) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            {/* Portrait container */}
            <div className="relative" style={{ width: 'min(340px, 85vw)', aspectRatio: '3/4' }}>

              {/* Glass border frame */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  border: '1px solid rgba(0,245,200,0.18)',
                  boxShadow: '0 0 40px rgba(0,245,200,0.1), 0 32px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
                  zIndex: 2,
                  pointerEvents: 'none',
                  borderRadius: 24,
                }}
              />

              {/* Scanlines overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  zIndex: 3,
                  borderRadius: 24,
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
                }}
              />

              {/* ── The photo with CINEMATIC CENTER REVEAL ── */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                style={{ borderRadius: 24 }}
                initial={{ clipPath: 'circle(0% at 50% 40%)' }}
                animate={{ clipPath: 'circle(120% at 50% 40%)' }}
                transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={BASE + '/imageshardul.png'}
                  alt="Shardul Parihar — Software Engineer"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                />
                {/* Bottom gradient for text readability */}
                <div
                  style={{
                    position: 'absolute', inset: 0, borderRadius: 24,
                    background: 'linear-gradient(to top, rgba(5,8,16,0.5) 0%, transparent 50%)',
                  }}
                />
              </motion.div>

              {/* Bottom label overlay */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="absolute bottom-0 left-0 right-0 p-5 z-10"
              >
                <div
                  className="glass rounded-xl px-4 py-3"
                  style={{ borderColor: 'rgba(0,245,200,0.15)', backdropFilter: 'blur(12px)' }}
                >
                  <div className="font-semibold text-sm">{PERSONAL.name}</div>
                  <div className="mono text-[10px] text-[var(--accent)] tracking-widest mt-0.5">{PERSONAL.subtitle}</div>
                </div>
              </motion.div>

              {/* Corner accent dots */}
              {[
                { top: -6, left: -6 }, { top: -6, right: -6 },
                { bottom: -6, left: -6 }, { bottom: -6, right: -6 },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.08 }}
                  style={{
                    position: 'absolute', width: 12, height: 12,
                    border: '2px solid var(--accent)', borderRadius: 2,
                    ...pos,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="mono text-[9px] text-[var(--text-sub)] tracking-[0.25em]">SCROLL</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
          <ArrowDown size={13} className="text-[var(--text-sub)]" />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #050810, transparent)' }} />
    </section>
  );
}