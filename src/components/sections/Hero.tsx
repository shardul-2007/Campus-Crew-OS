'use client';
import { useRef, useState, useEffect, useId } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PERSONAL } from '@/data/portfolio';

const BASE = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

/* ─────────────────────────────────────────────────────────────
   INLINE SVG DEFS — organic torn paper clip-paths
   Paths describe irregular tear edge.
   Top mask: full portrait from top down to the torn edge.
   Bot mask: from the torn edge down to the bottom.
   The tear line is a hand-crafted organic bezier curve path.
   ───────────────────────────────────────────────────────────── */
function TearSVGDefs({ topId, botId }: { topId: string; botId: string }) {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
    >
      <defs>
        {/*
          The tear line — reading left to right across the image at ~50% height.
          Using cubic bezier curves for organic irregularity.
          The path starts at (0, 50%) and ends at (100%, 50%) via an
          asymmetric, slightly tilted organic edge.
          All values in percentage of the image bounding box (0..100).
        */}
        <clipPath id={topId} clipPathUnits="objectBoundingBox">
          <path d="
            M 0,0
            L 1,0
            L 1,0.485
            C 0.93,0.500 0.87,0.468 0.80,0.492
            C 0.73,0.516 0.67,0.480 0.60,0.505
            C 0.53,0.530 0.47,0.488 0.40,0.513
            C 0.33,0.538 0.27,0.496 0.20,0.518
            C 0.13,0.540 0.07,0.502 0,0.522
            Z
          " />
        </clipPath>
        <clipPath id={botId} clipPathUnits="objectBoundingBox">
          <path d="
            M 0,0.522
            C 0.07,0.502 0.13,0.540 0.20,0.518
            C 0.27,0.496 0.33,0.538 0.40,0.513
            C 0.47,0.488 0.53,0.530 0.60,0.505
            C 0.67,0.480 0.73,0.516 0.80,0.492
            C 0.87,0.468 0.93,0.500 1,0.485
            L 1,1
            L 0,1
            Z
          " />
        </clipPath>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   ABSTRACT NEURAL VISUAL — SVG art, not emoji, not Lucide Brain
   Fine organic lines + nodes that resemble a neural structure.
   ───────────────────────────────────────────────────────────── */
function NeuralArt() {
  return (
    <svg
      width="140" height="140" viewBox="0 0 140 140" fill="none"
      aria-label="Abstract neural visualization"
      style={{ display: 'block' }}
    >
      {/* Concentric orbit rings */}
      <circle cx="70" cy="70" r="64" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
      <circle cx="70" cy="70" r="42" stroke="rgba(255,255,255,0.09)" strokeWidth="0.6" />
      <circle cx="70" cy="70" r="20" stroke="rgba(255,255,255,0.14)" strokeWidth="0.6" />

      {/* Outer dendrite paths — organic, not perfectly radial */}
      <path d="M 70,6 C 62,22 58,38 64,50" stroke="rgba(255,255,255,0.28)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M 134,70 C 118,62 102,60 90,66" stroke="rgba(255,255,255,0.24)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M 70,134 C 78,118 82,102 76,90" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M 6,70 C 22,78 38,80 52,74" stroke="rgba(255,255,255,0.20)" strokeWidth="0.8" fill="none" strokeLinecap="round" />

      {/* Diagonal dendrites */}
      <path d="M 116,24 C 104,36 94,46 86,56" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <path d="M 24,116 C 36,104 46,94 56,86" stroke="rgba(255,255,255,0.15)" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <path d="M 116,116 C 104,104 94,94 86,86" stroke="rgba(255,255,255,0.14)" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <path d="M 24,24 C 36,36 46,46 56,56" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" fill="none" strokeLinecap="round" />

      {/* Mid-ring branching connections */}
      <path d="M 70,28 Q 80,50 70,50" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" fill="none" />
      <path d="M 112,70 Q 90,60 90,70" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" fill="none" />
      <path d="M 70,112 Q 60,90 70,90" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" fill="none" />
      <path d="M 28,70 Q 50,80 50,70" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" fill="none" />

      {/* Outer nodes */}
      <circle cx="70"  cy="6"   r="2.2" fill="rgba(255,255,255,0.55)" />
      <circle cx="134" cy="70"  r="1.8" fill="rgba(255,255,255,0.45)" />
      <circle cx="70"  cy="134" r="1.8" fill="rgba(255,255,255,0.40)" />
      <circle cx="6"   cy="70"  r="1.8" fill="rgba(255,255,255,0.40)" />
      <circle cx="116" cy="24"  r="1.5" fill="rgba(255,255,255,0.32)" />
      <circle cx="24"  cy="116" r="1.5" fill="rgba(255,255,255,0.30)" />
      <circle cx="116" cy="116" r="1.5" fill="rgba(255,255,255,0.28)" />
      <circle cx="24"  cy="24"  r="1.5" fill="rgba(255,255,255,0.28)" />

      {/* Mid ring nodes */}
      <circle cx="70"  cy="28"  r="2.5" fill="rgba(255,255,255,0.60)" />
      <circle cx="112" cy="70"  r="2"   fill="rgba(255,255,255,0.50)" />
      <circle cx="70"  cy="112" r="2"   fill="rgba(255,255,255,0.45)" />
      <circle cx="28"  cy="70"  r="2"   fill="rgba(255,255,255,0.45)" />

      {/* Core */}
      <circle cx="70" cy="70" r="9"  fill="rgba(255,255,255,0.10)" />
      <circle cx="70" cy="70" r="5"  fill="rgba(255,255,255,0.45)" />
      <circle cx="70" cy="70" r="2.5" fill="rgba(255,255,255,0.92)" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   GLASS ORB
   ───────────────────────────────────────────────────────────── */
function GlassOrb() {
  return (
    <div
      style={{
        position: 'relative',
        width: 200, height: 200,
        borderRadius: '50%',
        background:
          'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.035) 55%, transparent 100%)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.14)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.20), 0 0 100px rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Spinning outer orbit */}
      <div style={{
        position: 'absolute',
        inset: -20,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.07)',
        animation: 'orb-cw 26s linear infinite',
      }}>
        {/* 3 knots on ring */}
        {[60, 180, 300].map(deg => {
          const r = (deg * Math.PI) / 180;
          return (
            <div key={deg} style={{
              position: 'absolute',
              width: 5, height: 5,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.40)',
              top: `${50 + Math.sin(r) * 50}%`,
              left: `${50 + Math.cos(r) * 50}%`,
              transform: 'translate(-50%,-50%)',
            }} />
          );
        })}
      </div>
      {/* Slow counter-spin inner dashed ring */}
      <div style={{
        position: 'absolute',
        inset: -6,
        borderRadius: '50%',
        border: '1px dashed rgba(255,255,255,0.05)',
        animation: 'orb-ccw 18s linear infinite',
      }} />
      <NeuralArt />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO — 480vh scroll container
   ───────────────────────────────────────────────────────────── */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Unique IDs for SVG clip paths (SSR safe)
  const uid = useId().replace(/:/g, '');
  const topClipId = `tear-top-${uid}`;
  const botClipId = `tear-bot-${uid}`;

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── PHASE 0 (0→20%): editorial layout, name + portrait ──
  const heroOpacity = useTransform(scrollYProgress, [0.00, 0.14, 0.22], [1, 1, 0]);
  const heroY       = useTransform(scrollYProgress, [0.00, 0.22], [0, -56]);

  // ── PHASE 1 (10→44%): portrait grows to fill viewport ──
  const prtScale = useTransform(scrollYProgress, [0.00, 0.20, 0.44], [1, 1.05, 1.55]);
  const prtX     = useTransform(scrollYProgress, [0.00, 0.20, 0.44], ['20%', '20%', '0%']);

  // ── PHASE 2 (42→70%): organic tear ──
  const topY  = useTransform(scrollYProgress, [0.42, 0.70], ['0%', '-65%']);
  const botY  = useTransform(scrollYProgress, [0.42, 0.70], ['0%',  '65%']);
  const prtOp = useTransform(scrollYProgress, [0.58, 0.72], [1, 0]);

  // Crack glow at tear seam
  const crackOp = useTransform(scrollYProgress, [0.46, 0.55, 0.66, 0.74], [0, 1, 1, 0]);

  // ── PHASE 3 (70→90%): orb reveals ──
  const orbOp    = useTransform(scrollYProgress, [0.68, 0.82], [0, 1]);
  const orbScale = useTransform(scrollYProgress, [0.68, 0.84], [0.55, 1]);
  const orbTextOp = useTransform(scrollYProgress, [0.80, 0.90, 0.97, 1.0], [0, 1, 1, 0]);

  // Scroll hint fades away
  const hintOp = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div
      ref={containerRef}
      id="home"
      style={{ height: '480vh', position: 'relative' }}
    >
      {/* Inline SVG clip path definitions */}
      <TearSVGDefs topId={topClipId} botId={botClipId} />

      {/* ── STICKY VIEWPORT ── */}
      <div
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
        aria-label="Hero section"
      >
        {/* Extra deep portrait atmosphere in hero */}
        {mounted && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-10%', right: '-5%',
              width: '70%', height: '120%',
              backgroundImage: `url(${BASE}/imageshardul.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              filter: 'blur(100px) saturate(70%) brightness(0.45)',
              opacity: 0.26,
            }} />
          </div>
        )}

        {/* ═════════════════════════════════════════════════════
            PHASE 0 — Name + bio + CTA (editorial layout)
            ═════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            opacity: heroOpacity, y: heroY,
            pointerEvents: 'none',
          }}
        >
          <div
            className="wrap"
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              paddingTop: 80,
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxWidth: 520, pointerEvents: 'auto' }}
            >
              {/* Available indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 36 }}>
                <span className="dot-available" />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-2)', letterSpacing: '0.02em' }}>
                  Available for opportunities
                </span>
              </div>

              {/* Name */}
              <h1
                className="display"
                style={{
                  fontSize: 'clamp(3.8rem, 9.5vw, 8rem)',
                  color: 'var(--text)',
                  marginBottom: '0.12em',
                }}
              >
                Shardul<br />Parihar
              </h1>

              <p style={{
                fontSize: '1.05rem',
                color: 'var(--text-2)',
                fontWeight: 500,
                marginBottom: 18,
                letterSpacing: '-0.01em',
              }}>
                Software Engineer
              </p>

              <p style={{
                fontSize: '0.93rem',
                color: 'var(--text-2)',
                lineHeight: 1.75,
                maxWidth: 400,
                marginBottom: 40,
              }}>
                {PERSONAL.bio}
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#projects" className="btn btn-fill" data-cursor="hover">
                  View my work
                </a>
                <a href="#contact" className="btn" data-cursor="hover">
                  Get in touch
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ═════════════════════════════════════════════════════
            PHASE 1–2 — Portrait: grows → organic SVG tear
            ═════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            position: 'absolute',
            zIndex: 5,
            top: '50%', left: '50%',
            translateX: '-50%', translateY: '-50%',
            width: 'clamp(300px, 44vw, 560px)',
            aspectRatio: '3 / 4',
            scale: prtScale,
            x: prtX,
            pointerEvents: 'none',
          }}
        >
          {/* TOP HALF — clips via SVG clipPath, slides up */}
          <motion.div
            style={{
              position: 'absolute', inset: 0,
              clipPath: `url(#${topClipId})`,
              y: topY,
              opacity: prtOp,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE}/imageshardul.png`}
              alt="Shardul Parihar"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center top',
                display: 'block',
              }}
            />
            {/* Fade to bg at edges */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(6,8,16,0.30) 0%, transparent 40%, rgba(6,8,16,0.15) 100%)',
            }} />
          </motion.div>

          {/* BOTTOM HALF — clips via SVG clipPath, slides down */}
          <motion.div
            style={{
              position: 'absolute', inset: 0,
              clipPath: `url(#${botClipId})`,
              y: botY,
              opacity: prtOp,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE}/imageshardul.png`}
              alt=""
              aria-hidden="true"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center top',
                display: 'block',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(6,8,16,0.35) 0%, transparent 40%, rgba(6,8,16,0.15) 100%)',
            }} />
          </motion.div>

          {/* Tear crack — luminous edge at split point */}
          <motion.div
            style={{
              position: 'absolute',
              left: 0, right: 0,
              top: '50%',
              translateY: '-1px',
              zIndex: 20,
              opacity: crackOp,
              pointerEvents: 'none',
            }}
          >
            {/* The main glow line */}
            <div style={{
              height: 2,
              background:
                'linear-gradient(90deg, transparent 0%, var(--crack) 20%, rgba(255,255,255,1) 50%, var(--crack) 80%, transparent 100%)',
              boxShadow:
                '0 0 18px var(--crack-glow), 0 0 48px var(--crack-glow)',
              filter: 'blur(0.5px)',
            }} />
            {/* Diffuse atmospheric glow around tear */}
            <div style={{
              position: 'absolute',
              top: -48, left: '5%', right: '5%', height: 96,
              background:
                'radial-gradient(ellipse 80% 48px at 50% 50%, var(--crack-glow) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
          </motion.div>
        </motion.div>

        {/* ═════════════════════════════════════════════════════
            PHASE 3 — Glass orb + neural visual
            ═════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 8,
            opacity: orbOp,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 44,
            pointerEvents: 'none',
          }}
        >
          <motion.div style={{ scale: orbScale }}>
            <GlassOrb />
          </motion.div>

          <motion.div
            style={{ opacity: orbTextOp, textAlign: 'center', padding: '0 24px' }}
          >
            <p style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)',
              fontWeight: 700,
              fontFamily: 'Manrope, system-ui, sans-serif',
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              marginBottom: 12,
              lineHeight: 1.1,
            }}>
              Shardul Parihar
            </p>
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--text-2)',
              maxWidth: 320,
              margin: '0 auto',
              lineHeight: 1.65,
            }}>
              {PERSONAL.bio}
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 32, left: '50%',
            translateX: '-50%',
            opacity: hintOp,
            zIndex: 20,
            pointerEvents: 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          }}
        >
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--text-3)', textTransform: 'uppercase' }}>
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            style={{
              width: 1, height: 40,
              background: 'linear-gradient(to bottom, var(--text-3), transparent)',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
