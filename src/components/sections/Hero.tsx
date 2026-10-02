'use client';
import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Zap,
  Code2,
  Brain,
  GitBranch,
} from 'lucide-react';
import { PERSONAL } from '@/data/portfolio';

// ─────────────────────────────────────────────
//  CONSTANTS
// ─────────────────────────────────────────────
const TECH_NODES = [
  { label: 'React',        angle: 0,    r: 215 },
  { label: 'Next.js',      angle: 36,   r: 235 },
  { label: 'Python',       angle: 72,   r: 215 },
  { label: 'TypeScript',   angle: 108,  r: 230 },
  { label: 'AI APIs',      angle: 144,  r: 215 },
  { label: 'Tailwind',     angle: 180,  r: 225 },
  { label: 'GitHub',       angle: 216,  r: 235 },
  { label: 'Full Stack',   angle: 252,  r: 218 },
  { label: 'Leaflet',      angle: 288,  r: 215 },
  { label: 'Open Source',  angle: 324,  r: 225 },
];

const PROJECTS_DATA = [
  {
    name: 'CivicOS',
    tag: 'AI PLATFORM · LIVE',
    href: 'https://civicos-beta.vercel.app/',
    desc: 'AI-powered municipal platform',
  },
  {
    name: 'SHARDUL.OS',
    tag: 'PORTFOLIO · v5.0',
    href: '#home',
    desc: 'Developer OS portfolio',
  },
];

const ROLE_BADGES = [
  { icon: Code2,     label: 'Full Stack Dev'  },
  { icon: Brain,     label: 'AI Integrations' },
  { icon: GitBranch, label: 'Open Source'     },
  { icon: Zap,       label: 'Builder'         },
];

const GLITCH_OFFSETS = [12, 25, 38, 52, 65, 78, 88];

function getPos(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
}

// Stagger variants for tech nodes
const nodeContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const nodeItemVariants = {
  hidden: { opacity: 0, scale: 0, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as number[] } },
};

// Project card variants
const projectContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const projectItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as number[] } },
};

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);

  useEffect(() => { setMounted(true); }, []);

  // Scroll tracking over the full 450vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Drive phase transitions from scroll position
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if      (v < 0.13) setPhase(0); // full photo + hero text
      else if (v < 0.33) setPhase(1); // tearing
      else if (v < 0.53) setPhase(2); // mind emerges
      else if (v < 0.77) setPhase(3); // skills fly out
      else               setPhase(4); // projects appear
    });
    return unsub;
  }, [scrollYProgress]);

  // ── Tear motion values ──
  const topY     = useTransform(scrollYProgress, [0.13, 0.35], ['0%', '-70%']);
  const bottomY  = useTransform(scrollYProgress, [0.13, 0.35], ['0%',  '70%']);
  const imgAlpha = useTransform(scrollYProgress, [0.28, 0.36], [1, 0]);

  // Tear line visibility
  const tearAlpha = useTransform(
    scrollYProgress,
    [0.12, 0.19, 0.30, 0.36],
    [0, 1, 1, 0]
  );

  // ── Mind visualization ──
  const mindAlpha = useTransform(scrollYProgress, [0.33, 0.52], [0, 1]);
  const mindScale = useTransform(scrollYProgress, [0.33, 0.53], [0.35, 1]);

  // ── Hero text ──
  const textAlpha = useTransform(scrollYProgress, [0.0, 0.10, 0.15], [1, 1, 0]);
  const textY     = useTransform(scrollYProgress, [0.0, 0.15], [0, -24]);

  // ── "FROM MY MIND → TO MY WORK" label ──
  const mindLabelAlpha = useTransform(
    scrollYProgress,
    [0.45, 0.55, 0.74, 0.80],
    [0, 1, 1, 0]
  );

  // ── Projects section ──
  const projAlpha = useTransform(scrollYProgress, [0.78, 0.90], [0, 1]);
  const projY     = useTransform(scrollYProgress, [0.78, 0.90], [50, 0]);

  // ── Scroll hint ──
  const hintAlpha = useTransform(scrollYProgress, [0.0, 0.08], [1, 0]);

  // ─────────────────────────────────────────
  return (
    // Tall scroll capture container
    <div ref={containerRef} id="home" style={{ height: '450vh', position: 'relative' }}>

      {/* ══ Sticky viewport ══ */}
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: '100vh', background: '#050810' }}
      >
        {/* Grid bg */}
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" style={{ zIndex: 0 }} />

        {/* ────────────────────────────────────────────
            BG PHOTO — TOP HALF  (slides up on scroll)
           ──────────────────────────────────────────── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: 'inset(0 0 50% 0)',
            y: topY,
            opacity: imgAlpha,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          {/* The photo */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: "url('/imageshardul.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
          />
          {/* Left-side gradient so hero text stays readable */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, rgba(5,8,16,0.82) 0%, rgba(5,8,16,0.45) 55%, rgba(5,8,16,0.15) 100%)',
            }}
          />
        </motion.div>

        {/* ────────────────────────────────────────────
            BG PHOTO — BOTTOM HALF  (slides down on scroll)
           ──────────────────────────────────────────── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: 'inset(50% 0 0 0)',
            y: bottomY,
            opacity: imgAlpha,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: "url('/imageshardul.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, rgba(5,8,16,0.82) 0%, rgba(5,8,16,0.45) 55%, rgba(5,8,16,0.15) 100%)',
            }}
          />
        </motion.div>

        {/* ────────────────────────────────────────────
            TEAR / BREAK EFFECT
           ──────────────────────────────────────────── */}
        <motion.div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            transform: 'translateY(-1px)',
            opacity: tearAlpha,
            zIndex: 6,
            pointerEvents: 'none',
          }}
        >
          {/* Energy crack line */}
          <div
            style={{
              height: '2px',
              background:
                'linear-gradient(90deg, transparent 3%, rgba(0,245,200,0.6) 15%, #fff 50%, rgba(0,245,200,0.6) 85%, transparent 97%)',
              boxShadow:
                '0 0 18px rgba(0,245,200,0.9), 0 0 50px rgba(0,245,200,0.5), 0 0 100px rgba(0,245,200,0.2)',
            }}
          />
          {/* Ambient glow halo */}
          <div
            style={{
              position: 'absolute',
              top: '-50px',
              left: 0,
              right: 0,
              height: '100px',
              background:
                'radial-gradient(ellipse 80% 100px at 50% 50%, rgba(0,245,200,0.13) 0%, transparent 70%)',
            }}
          />
          {/* Glitch micro-fragments along the tear */}
          {mounted &&
            GLITCH_OFFSETS.map((pct, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${pct}%`,
                  top: i % 2 === 0 ? '-6px' : '2px',
                  width: `${5 + (i % 3) * 5}px`,
                  height: '2px',
                  background: i % 3 === 0 ? '#fff' : 'var(--accent)',
                  opacity: 0.8,
                }}
                animate={{ x: [0, i % 2 === 0 ? 5 : -5, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 0.12 + i * 0.04, ease: 'linear' }}
              />
            ))}
        </motion.div>

        {/* ────────────────────────────────────────────
            PHASE 1 — HERO TEXT (name, bio, CTAs)
           ──────────────────────────────────────────── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            opacity: textAlpha,
            y: textY,
            display: 'flex',
            alignItems: 'center',
            pointerEvents: phase === 0 ? 'auto' : 'none',
          }}
        >
          <div className="section-container w-full">
            <div style={{ maxWidth: 600 }}>
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-5"
              >
                <span className="status-dot status-dot-pulse" />
                <span className="sys-label-accent" style={{ letterSpacing: '0.2em' }}>
                  DIGITAL ENGINEER / BUILDER
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.12 }}
                className="font-bold tracking-tight"
                style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.02, marginBottom: '1rem' }}
              >
                <span className="block text-[var(--text)]">SHARDUL</span>
                <span className="block gradient-text">PARIHAR</span>
              </motion.h1>

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="text-[var(--text-muted)] leading-relaxed mb-6"
                style={{ maxWidth: 440, fontSize: '1rem' }}
              >
                {PERSONAL.bio}
              </motion.p>

              {/* Role badges */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.42 }}
                className="flex flex-wrap gap-2 mb-7"
              >
                {ROLE_BADGES.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 rounded-full mono"
                    style={{
                      padding: '5px 12px',
                      fontSize: '0.68rem',
                      letterSpacing: '0.05em',
                      background: 'var(--accent-dim)',
                      border: '1px solid var(--border-glow)',
                      color: 'var(--accent)',
                    }}
                  >
                    <Icon size={11} />
                    {label}
                  </span>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.56 }}
                className="flex flex-wrap gap-3 mb-7"
              >
                <a href="#projects" className="glow-btn glow-btn-primary">
                  EXPLORE MY WORK <ArrowRight size={15} />
                </a>
                <a
                  href={PERSONAL.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-btn glow-btn-ghost"
                >
                  VIEW RESUME <ExternalLink size={14} />
                </a>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.72 }}
                className="flex items-center gap-5"
              >
                <a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 mono text-xs hover:text-[var(--accent)] transition-colors"
                  style={{ color: 'var(--text-sub)' }}
                >
                  <Github size={14} /> github/shardul-2007
                </a>
                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 mono text-xs hover:text-[var(--accent)] transition-colors"
                  style={{ color: 'var(--text-sub)' }}
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: hintAlpha,
            zIndex: 20,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span className="mono" style={{ fontSize: '0.58rem', letterSpacing: '0.25em', color: 'var(--text-sub)' }}>
            SCROLL TO REVEAL
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            style={{
              width: 1,
              height: 36,
              background: 'linear-gradient(to bottom, var(--accent), transparent)',
            }}
          />
        </motion.div>

        {/* ────────────────────────────────────────────
            PHASE 2+3 — MIND VISUALIZATION
            (portrait face as center, orbital rings,
             tech skill nodes emerge around it)
           ──────────────────────────────────────────── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 8,
            opacity: mindAlpha,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: phase >= 2 ? 'auto' : 'none',
          }}
        >
          {/* Scale wrapper */}
          <motion.div
            style={{
              position: 'relative',
              width: 480,
              height: 480,
              scale: mindScale,
            }}
          >
            {/* ── Orbital rings ── */}
            {[
              { r: 235, dur: 28, rev: false, color: 'rgba(0,245,200,0.12)' },
              { r: 175, dur: 20, rev: true,  color: 'rgba(0,245,200,0.22)' },
              { r: 120, dur: 14, rev: false, color: 'rgba(0,245,200,0.10)' },
            ].map((ring, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width:  ring.r * 2,
                  height: ring.r * 2,
                  left:   240 - ring.r,
                  top:    240 - ring.r,
                  borderRadius: '50%',
                  border: `1px solid ${ring.color}`,
                  animation: `spin ${ring.dur}s linear infinite${ring.rev ? ' reverse' : ''}`,
                }}
              />
            ))}

            {/* ── SVG connection lines ── */}
            <svg
              style={{ position: 'absolute', inset: 0, width: 480, height: 480, pointerEvents: 'none' }}
            >
              {TECH_NODES.map((node) => {
                const p = getPos(node.angle, node.r);
                return (
                  <line
                    key={node.label}
                    x1={240} y1={240}
                    x2={240 + p.x} y2={240 + p.y}
                    stroke="rgba(0,245,200,0.07)"
                    strokeWidth="1"
                    strokeDasharray="3 7"
                  />
                );
              })}
            </svg>

            {/* ── Center portrait circle ── */}
            <div
              style={{
                position: 'absolute',
                width: 110,
                height: 110,
                left: 185,
                top: 185,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--border-glow)',
                boxShadow:
                  '0 0 30px rgba(0,245,200,0.35), 0 0 80px rgba(0,245,200,0.12)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/imageshardul.png"
                alt="Shardul Parihar"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                }}
              />
            </div>

            {/* ── "FROM MY MIND" label below portrait ── */}
            <motion.div
              style={{
                position: 'absolute',
                top: 305,
                left: 0,
                right: 0,
                textAlign: 'center',
                opacity: mindLabelAlpha,
                pointerEvents: 'none',
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.22em',
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                }}
              >
                FROM MY MIND
              </span>
            </motion.div>

            {/* ── Tech skill nodes (appear when phase >= 3) ── */}
            <AnimatePresence>
              {phase >= 3 && mounted && (
                <motion.div
                  key="nodes"
                  variants={nodeContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  style={{ position: 'absolute', inset: 0 }}
                >
                  {TECH_NODES.map((node, i) => {
                    const p = getPos(node.angle, node.r);
                    const nodeW = 72;
                    const nodeH = 28;
                    return (
                      <motion.div
                        key={node.label}
                        custom={i}
                        variants={nodeItemVariants}
                        style={{
                          position: 'absolute',
                          left: 240 + p.x - nodeW / 2,
                          top:  240 + p.y - nodeH / 2,
                          width: nodeW,
                          height: nodeH,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          borderRadius: 8,
                          backdropFilter: 'blur(12px)',
                          cursor: 'default',
                        }}
                        whileHover={{
                          borderColor: 'var(--border-glow)',
                          background: 'var(--accent-dim)',
                          scale: 1.12,
                        }}
                      >
                        <span
                          className="mono"
                          style={{ fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}
                        >
                          {node.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* ────────────────────────────────────────────
            PHASE 4 — PROJECTS  (→ TO MY WORK)
           ──────────────────────────────────────────── */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 0,
            right: 0,
            zIndex: 12,
            opacity: projAlpha,
            y: projY,
            pointerEvents: phase >= 4 ? 'auto' : 'none',
          }}
        >
          {/* "→ TO MY WORK" label */}
          <div className="text-center mb-5">
            <span
              className="mono"
              style={{ fontSize: '0.65rem', letterSpacing: '0.22em', color: 'var(--accent)' }}
            >
              → TO MY WORK
            </span>
          </div>

          {/* Project cards */}
          <motion.div
            variants={projectContainerVariants}
            initial="hidden"
            animate={phase >= 4 ? 'visible' : 'hidden'}
            className="section-container"
            style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}
          >
            {PROJECTS_DATA.map((proj, i) => (
              <motion.a
                key={proj.name}
                custom={i}
                variants={projectItemVariants}
                href={proj.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass"
                style={{
                  display: 'block',
                  padding: '16px 24px',
                  borderRadius: 14,
                  minWidth: 180,
                  maxWidth: 220,
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                whileHover={{
                  borderColor: 'var(--border-glow)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(0,245,200,0.08)',
                  y: -3,
                }}
              >
                <div
                  className="mono"
                  style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}
                >
                  {proj.name}
                </div>
                <div className="sys-label" style={{ marginBottom: 6 }}>
                  {proj.tag}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {proj.desc}
                </div>
              </motion.a>
            ))}

            {/* "See all projects" link */}
            <motion.a
              custom={2}
              variants={projectItemVariants}
              href="#projects"
              className="glass"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '16px 24px',
                borderRadius: 14,
                minWidth: 140,
                textDecoration: 'none',
                transition: 'border-color 0.2s',
              }}
              whileHover={{ borderColor: 'var(--border-glow)', y: -3 }}
            >
              <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                ALL PROJECTS
              </span>
              <ArrowRight size={13} color="var(--accent)" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── Phase indicator pills (scroll progress) ── */}
        <div
          style={{
            position: 'absolute',
            right: 24,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            pointerEvents: 'none',
          }}
        >
          {['PHOTO', 'TEAR', 'MIND', 'SKILLS', 'WORK'].map((label, i) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                opacity: phase === i ? 1 : 0.28,
                transition: 'opacity 0.4s ease',
              }}
            >
              <div
                style={{
                  width: phase === i ? 18 : 6,
                  height: 2,
                  background: 'var(--accent)',
                  borderRadius: 2,
                  transition: 'width 0.4s ease',
                }}
              />
              <span
                className="mono"
                style={{ fontSize: '0.5rem', letterSpacing: '0.14em', color: 'var(--accent)' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
