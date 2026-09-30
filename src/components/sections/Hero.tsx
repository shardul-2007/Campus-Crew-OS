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

// Nodes that emerge from portrait after reveal
const EMERGE_NODES = [
  { label: 'CivicOS',     sub: 'AI Platform',    x: '62%', y: '22%', delay: 2.0 },
  { label: 'Open Source', sub: 'GSSoC · NSOC',   x: '58%', y: '68%', delay: 2.2 },
  { label: '10+',         sub: 'Programs',        x: '82%', y: '45%', delay: 2.4 },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY      = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const photoParallax = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const photoOpacity  = useTransform(scrollYProgress, [0, 0.75], [1, 0.3]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen overflow-hidden flex items-center">

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════
          LARGE PORTRAIT — fills the right ~55% of the viewport
      ══════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ y: photoParallax, opacity: photoOpacity }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Photo reveal — expands circle from face centre */}
        <motion.div
          className="absolute right-0 top-0 bottom-0"
          style={{ width: '62%' }}
          initial={{ clipPath: 'circle(0% at 48% 36%)' }}
          animate={{ clipPath: 'circle(130% at 48% 36%)' }}
          transition={{ duration: 1.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={BASE + '/imageshardul.png'}
            alt="Shardul Parihar"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top',
              filter: 'brightness(0.55) contrast(1.12) saturate(0.85)',
              display: 'block',
            }}
          />
          {/* Left-edge fade: blends photo into page bg */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, #050810 0%, rgba(5,8,16,0.75) 20%, rgba(5,8,16,0.25) 45%, transparent 65%)',
          }} />
          {/* Bottom fade */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, #050810 0%, transparent 25%)',
          }} />
          {/* Top fade */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, #050810 0%, transparent 18%)',
          }} />
          {/* Subtle scanlines */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.055) 2px, rgba(0,0,0,0.055) 4px)',
            pointerEvents: 'none',
          }} />
          {/* Cyan left-edge accent line */}
          <div style={{
            position: 'absolute', left: 0, top: '15%', bottom: '15%', width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(0,245,200,0.35), transparent)',
          }} />
        </motion.div>

        {/* Scan-sweep animation on reveal */}
        <motion.div
          initial={{ top: '36%', opacity: 0 }}
          animate={{ top: ['36%', '-5%'], opacity: [0, 0.7, 0.7, 0] }}
          transition={{ duration: 1.8, delay: 0.15, times: [0, 0.05, 0.9, 1] }}
          style={{
            position: 'absolute', right: 0, width: '62%', height: 2,
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,245,200,0.5) 40%, rgba(0,245,200,0.8) 60%, transparent 100%)',
            boxShadow: '0 0 20px rgba(0,245,200,0.4)',
          }}
        />

        {/* Ambient glow on left from the portrait */}
        <div style={{
          position: 'absolute', left: '28%', top: '20%', width: 300, height: 400,
          background: 'radial-gradient(ellipse, rgba(0,245,200,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      </motion.div>

      {/* "FROM MY MIND → TO MY WORK" emerging nodes */}
      {EMERGE_NODES.map((node) => (
        <motion.div
          key={node.label}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: node.delay, ease: [0.16, 1, 0.3, 1] }}
          className="absolute z-10 pointer-events-none hidden lg:block"
          style={{ left: node.x, top: node.y }}
        >
          <div
            className="glass rounded-xl px-3 py-2 text-center"
            style={{
              borderColor: 'rgba(0,245,200,0.2)',
              boxShadow: '0 0 20px rgba(0,245,200,0.1)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="font-bold text-sm text-[var(--accent)]">{node.label}</div>
            <div className="mono text-[9px] text-[var(--text-sub)] tracking-widest mt-0.5">{node.sub}</div>
          </div>
        </motion.div>
      ))}

      {/* ══════════════════════════════════════════════════════════════
          HERO TEXT — left side, always readable
      ══════════════════════════════════════════════════════════════ */}
      <motion.div style={{ y: contentY }} className="section-container relative z-20 w-full py-28 pt-36">
        <div className="max-w-[500px]">

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.9 }}
            className="flex items-center gap-3 mb-7"
          >
            <span className="status-dot status-dot-pulse" style={{ width: 7, height: 7 }} />
            <span className="mono text-[10px] tracking-[0.22em] text-[var(--accent)]">AVAILABLE FOR WORK</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold tracking-tight leading-none mb-5"
            style={{ fontSize: 'clamp(3rem, 6vw, 5.2rem)', letterSpacing: '-0.025em' }}
          >
            <span className="block text-[var(--text)]">Shardul</span>
            <span className="block gradient-text">Parihar.</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.15 }}
            className="mono text-xs tracking-[0.18em] text-[var(--text-sub)] mb-6 uppercase"
          >
            Software Engineer &nbsp;·&nbsp; Builder &nbsp;·&nbsp; AI Enthusiast
          </motion.p>

          {/* Skill chips */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 2.25 }}
            className="flex flex-wrap gap-2 mb-7"
          >
            {CHIPS.map((c, i) => (
              <motion.span key={c.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.3 + i * 0.08 }}
                className="mono text-[11px] px-3 py-1.5 rounded-full select-none"
                style={{
                  background: c.accent ? 'var(--accent-dim)' : 'rgba(255,255,255,0.04)',
                  border: c.accent ? '1px solid var(--border-glow)' : '1px solid var(--border)',
                  color: c.accent ? 'var(--accent)' : 'var(--text-muted)',
                  letterSpacing: '0.1em',
                }}
              >{c.label}</motion.span>
            ))}
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.5 }}
            className="text-sm text-[var(--text-muted)] leading-relaxed mb-9"
            style={{ fontWeight: 300 }}
          >
            {PERSONAL.bio}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.65 }}
            className="flex flex-wrap gap-3"
          >
            <a href="#projects" className="glow-btn glow-btn-primary">
              View My Work
            </a>
            <a href="#contact" className="glow-btn glow-btn-ghost">
              Get In Touch
            </a>
            <a
              href="https://www.linkedin.com/in/shardul-parihar/"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn glow-btn-ghost"
            >
              LinkedIn ↗
            </a>
          </motion.div>

          {/* Location / meta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.9 }}
            className="flex items-center gap-4 mt-8 text-xs mono text-[var(--text-sub)]"
          >
            <span className="flex items-center gap-1.5"><MapPin size={11} /> Pune, India</span>
            <span className="w-px h-3 bg-[var(--border)]" />
            <span className="flex items-center gap-1.5"><Zap size={11} className="text-[var(--accent)]" /> Open to work</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <span className="mono text-[9px] tracking-[0.25em] text-[var(--text-sub)]">SCROLL</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown size={13} className="text-[var(--text-sub)]" />
        </motion.div>
      </motion.div>

      {/* Bottom page fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #050810, transparent)' }} />
    </section>
  );
}