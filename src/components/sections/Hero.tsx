'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, MapPin, Zap } from 'lucide-react';
import { PERSONAL } from '@/data/portfolio';
import { useRef } from 'react';

const BASE = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

const ROLES = ['Full-Stack Developer', 'AI Enthusiast', 'Open Source Contributor', 'Problem Solver'];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen overflow-hidden flex items-center">

      {/* Background — full bleed photo */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: imgScale, opacity: imgOpacity }}
      >
        <img
          src={BASE + '/imageshardul.png'}
          alt="Shardul Parihar"
          className="w-full h-full object-cover object-top"
          style={{ filter: 'brightness(0.35) saturate(0.8)' }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,8,16,0.95) 40%, rgba(5,8,16,0.5) 70%, rgba(5,8,16,0.2) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #050810 0%, transparent 40%)' }} />
        {/* Cyan ambient */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(0,245,200,0.06) 0%, transparent 70%)' }} />
      </motion.div>

      {/* Grid */}
      <div className="absolute inset-0 z-0 grid-bg opacity-20" />

      {/* Content */}
      <motion.div style={{ y: textY }} className="section-container relative z-10 w-full py-32 pt-36">
        <div className="max-w-2xl">

          {/* Pre-label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="status-dot status-dot-pulse" />
            <span className="mono text-xs tracking-[0.2em] text-[var(--accent)]">AVAILABLE FOR OPPORTUNITIES</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-bold tracking-tight leading-none mb-3"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            <span className="text-[var(--text)]">Shardul</span>
            <br />
            <span className="gradient-text">Parihar.</span>
          </motion.h1>

          {/* Roles — scrolling pill row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {ROLES.map((role, i) => (
              <span
                key={role}
                className="mono text-xs px-3 py-1.5 rounded-full"
                style={{
                  background: i === 0 ? 'var(--accent-dim)' : 'rgba(255,255,255,0.05)',
                  border: i === 0 ? '1px solid var(--border-glow)' : '1px solid var(--border)',
                  color: i === 0 ? 'var(--accent)' : 'var(--text-muted)',
                }}
              >
                {role}
              </span>
            ))}
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg text-[var(--text-muted)] leading-relaxed mb-8 max-w-xl"
            style={{ fontWeight: 300 }}
          >
            I build things that actually ship. From civic AI platforms to developer tools —
            I care about the craft, the code, and the problem behind both.
          </motion.p>

          {/* Location + meta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4 mb-10 text-sm text-[var(--text-sub)]"
          >
            <span className="flex items-center gap-1.5">
              <MapPin size={13} /> Pune, India
            </span>
            <span className="w-px h-4 bg-[var(--border)]" />
            <span className="flex items-center gap-1.5">
              <Zap size={13} className="text-[var(--accent)]" /> Open to work
            </span>
            <span className="w-px h-4 bg-[var(--border)]" />
            <span className="mono text-xs">v5.0 · 2026</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <a href="#projects" className="glow-btn glow-btn-primary">
              See What I Built
            </a>
            <a href="#contact" className="glow-btn glow-btn-ghost">
              Let&apos;s Talk
            </a>
            <a
              href="https://www.linkedin.com/in/shardul-parihar/"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn glow-btn-ghost"
            >
              LinkedIn
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="mono text-[10px] text-[var(--text-sub)] tracking-[0.2em]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-[var(--text-sub)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}