'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PERSONAL } from '@/data/portfolio';

/* ─── Abstract Neural SVG (not an emoji, not a Lucide icon) ─── */
function NeuralSVG() {
  return (
    <svg
      width="160" height="160" viewBox="0 0 160 160" fill="none"
      aria-label="Neural network visualization"
      style={{ display: 'block' }}
    >
      {/* Outer orbit */}
      <circle cx="80" cy="80" r="72" stroke="rgba(255,255,255,0.08)" strokeWidth="0.75" />
      {/* Mid orbit */}
      <circle cx="80" cy="80" r="46" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" />
      {/* Inner orbit */}
      <circle cx="80" cy="80" r="22" stroke="rgba(255,255,255,0.20)" strokeWidth="0.75" />

      {/* Radial connection lines — outer nodes */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const ox = 80 + Math.cos(rad) * 72;
        const oy = 80 + Math.sin(rad) * 72;
        const mx = 80 + Math.cos(rad) * 46;
        const my = 80 + Math.sin(rad) * 46;
        return (
          <g key={deg}>
            <line x1={ox} y1={oy} x2={mx} y2={my}
              stroke="rgba(255,255,255,0.14)" strokeWidth="0.75" />
            <circle cx={ox} cy={oy} r={i % 2 === 0 ? 2.5 : 1.8}
              fill="rgba(255,255,255,0.55)" />
          </g>
        );
      })}

      {/* Mid-orbit nodes */}
      {[22, 112, 202, 292].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const mx = 80 + Math.cos(rad) * 46;
        const my = 80 + Math.sin(rad) * 46;
        const ix = 80 + Math.cos(rad) * 22;
        const iy = 80 + Math.sin(rad) * 22;
        return (
          <g key={deg}>
            <line x1={mx} y1={my} x2={ix} y2={iy}
              stroke="rgba(255,255,255,0.20)" strokeWidth="0.75" />
            <circle cx={mx} cy={my} r="3" fill="rgba(255,255,255,0.70)" />
          </g>
        );
      })}

      {/* Cross connections — inner to mid */}
      <line x1="80" y1="58" x2="104" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
      <line x1="80" y1="58" x2="56" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
      <line x1="80" y1="102" x2="104" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
      <line x1="80" y1="102" x2="56" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />

      {/* Center — glowing core */}
      <circle cx="80" cy="80" r="10" fill="rgba(255,255,255,0.12)" />
      <circle cx="80" cy="80" r="6"  fill="rgba(255,255,255,0.50)" />
      <circle cx="80" cy="80" r="3"  fill="rgba(255,255,255,0.95)" />
    </svg>
  );
}

/* ─── Glass Orb that reveals in the tear gap ─── */
function GlassOrb() {
  return (
    <div
      style={{
        width: 180, height: 180,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.14), rgba(255,255,255,0.03) 60%)',
        backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.18)',
        boxShadow: '0 0 80px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.25)',
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Slow-spinning outer ring */}
      <div style={{
        position: 'absolute',
        inset: -18,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.10)',
        animation: 'spin-cw 24s linear infinite',
      }}>
        {/* Ring knots */}
        {[0, 120, 240].map(deg => {
          const r = (deg * Math.PI) / 180;
          const x = 50 + Math.cos(r) * 50;
          const y = 50 + Math.sin(r) * 50;
          return (
            <div key={deg} style={{
              position: 'absolute',
              width: 5, height: 5,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.55)',
              top: `${y}%`, left: `${x}%`,
              transform: 'translate(-50%,-50%)',
            }} />
          );
        })}
      </div>
      {/* Counter-spinning inner ring */}
      <div style={{
        position: 'absolute',
        inset: -4,
        borderRadius: '50%',
        border: '1px dashed rgba(255,255,255,0.07)',
        animation: 'spin-ccw 16s linear infinite',
      }} />
      <NeuralSVG />
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── Phase 0 (0–18%): hero text + portrait visible ──
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.14, 0.22], [1, 1, 0]);
  const heroTextY       = useTransform(scrollYProgress, [0, 0.22], [0, -48]);

  // ── Phase 1 (10–42%): portrait scales up from side to center ──
  const portraitScale   = useTransform(scrollYProgress, [0, 0.18, 0.42], [1, 1, 1.45]);
  const portraitX       = useTransform(scrollYProgress, [0, 0.18, 0.42], ['25%', '25%', '0%']);

  // ── Phase 2 (42–68%): organic tear ──
  const tearTopY        = useTransform(scrollYProgress, [0.40, 0.68], ['0%', '-62%']);
  const tearBotY        = useTransform(scrollYProgress, [0.40, 0.68], ['0%',  '62%']);
  const portraitOpacity = useTransform(scrollYProgress, [0.58, 0.70], [1, 0]);

  // Crack energy glow between halves
  const crackOpacity    = useTransform(scrollYProgress, [0.44, 0.55, 0.65, 0.72], [0, 1, 1, 0]);

  // ── Phase 3 (68–88%): orb + text reveal ──
  const orbOpacity      = useTransform(scrollYProgress, [0.66, 0.80], [0, 1]);
  const orbScale        = useTransform(scrollYProgress, [0.66, 0.82], [0.5, 1]);
  const textRevealOp    = useTransform(scrollYProgress, [0.78, 0.88, 0.96, 1.0], [0, 1, 1, 0]);

  // ── Scroll hint ──
  const hintOpacity     = useTransform(scrollYProgress, [0, 0.07], [1, 0]);

  const basePath = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

  return (
    <div ref={containerRef} id="home" style={{ height: '420vh', position: 'relative' }}>
      <div
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
        aria-label="Hero section"
      >

        {/* ── Background: portrait also behind hero (even more blurred) ── */}
        {mounted && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          }}>
            <div style={{
              position: 'absolute',
              top: '-5%', right: '-5%',
              width: '65%', height: '110%',
              backgroundImage: `url(${basePath}/imageshardul.png)`,
              backgroundSize: 'cover', backgroundPosition: 'center top',
              filter: 'blur(90px) saturate(80%)',
              opacity: 0.22,
            }} />
          </div>
        )}

        {/* ═══════════════════════════════════════════
            PHASE 0 — Hero text + portrait side by side
            ═══════════════════════════════════════════ */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            opacity: heroTextOpacity, y: heroTextY,
            pointerEvents: 'none',
          }}
        >
          <div className="wrap" style={{
            height: '100%',
            display: 'flex', alignItems: 'center',
            paddingTop: 90,
          }}>
            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ flex: '0 0 auto', maxWidth: 520, pointerEvents: 'auto' }}
            >
              {/* Available status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
                <span className="dot-live" />
                <span className="label" style={{ color: 'var(--text-2)' }}>Available for opportunities</span>
              </div>

              {/* Name — the most important thing */}
              <h1
                className="display"
                style={{ fontSize: 'clamp(3.6rem,9vw,7.5rem)', color: 'var(--text)', marginBottom: '0.15em' }}
              >
                Shardul<br />Parihar
              </h1>

              <p style={{ fontSize: '1.1rem', color: 'var(--text-2)', fontWeight: 500, marginBottom: 20 }}>
                Software Engineer
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-2)', lineHeight: 1.7, maxWidth: 400, marginBottom: 40 }}>
                {PERSONAL.bio}
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#projects" className="btn btn-fill" data-cursor="hover">View my work</a>
                <a href="#contact"  className="btn"          data-cursor="hover">Get in touch</a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════
            PHASES 1–2 — Portrait grows then tears
            ═══════════════════════════════════════════ */}
        <motion.div
          style={{
            position: 'absolute', zIndex: 5,
            top: '50%', left: '50%',
            translateX: '-50%', translateY: '-50%',
            width: 'clamp(280px, 42vw, 520px)',
            aspectRatio: '3 / 4',
            scale: portraitScale,
            x: portraitX,
            pointerEvents: 'none',
          }}
        >
          {/* TOP HALF */}
          <motion.div
            className="tear-top"
            style={{
              position: 'absolute', inset: 0,
              y: tearTopY,
              opacity: portraitOpacity,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/imageshardul.png`}
              alt="Shardul Parihar"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, var(--bg) 100%)' }} />
          </motion.div>

          {/* BOTTOM HALF */}
          <motion.div
            className="tear-bot"
            style={{
              position: 'absolute', inset: 0,
              y: tearBotY,
              opacity: portraitOpacity,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/imageshardul.png`}
              alt=""
              aria-hidden
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, transparent 55%, var(--bg) 100%)' }} />
          </motion.div>

          {/* Crack energy line */}
          <motion.div
            style={{
              position: 'absolute', left: 0, right: 0, top: '48.5%',
              translateY: '-50%',
              opacity: crackOpacity,
              zIndex: 20, pointerEvents: 'none',
            }}
          >
            <div style={{
              height: 1.5,
              background: 'linear-gradient(90deg, transparent 0%, var(--crack) 25%, rgba(255,255,255,1) 50%, var(--crack) 75%, transparent 100%)',
              boxShadow: '0 0 24px var(--crack-glow), 0 0 60px var(--crack-glow)',
            }} />
            {/* Glow diffusion */}
            <div style={{
              position: 'absolute', top: -40, left: 0, right: 0, height: 80,
              background: 'radial-gradient(ellipse 70% 40px at 50% 50%, var(--crack-glow) 0%, transparent 70%)',
            }} />
          </motion.div>
        </motion.div>

        {/* ═══════════════════════════════════════════
            PHASE 3 — Glass orb + bio reveal
            ═══════════════════════════════════════════ */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 8,
            opacity: orbOpacity,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 40, pointerEvents: 'none',
          }}
        >
          <motion.div style={{ scale: orbScale }}>
            <GlassOrb />
          </motion.div>

          <motion.div style={{ opacity: textRevealOp, textAlign: 'center' }}>
            <h2
              className="display"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--text)', marginBottom: 12 }}
            >
              Shardul Parihar
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', maxWidth: 340, margin: '0 auto', lineHeight: 1.65 }}>
              {PERSONAL.bio}
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{
            position: 'absolute', bottom: 36, left: '50%', translateX: '-50%',
            opacity: hintOpacity, zIndex: 20, pointerEvents: 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}
        >
          <span className="label">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, var(--text-2), transparent)' }}
          />
        </motion.div>
      </div>
    </div>
  );
}
