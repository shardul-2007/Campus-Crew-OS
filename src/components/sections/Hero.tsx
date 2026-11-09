'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PERSONAL } from '@/data/portfolio';

const BASE = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Elegant, subtle scroll parallax — strictly spatial, never colliding
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <section
      ref={heroRef}
      id="home"
      aria-label="Hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'clamp(90px, 12vh, 120px)',
        paddingBottom: 'clamp(60px, 8vh, 100px)',
        overflow: 'hidden',
      }}
    >
      {/* ── Atmospheric background layer (very soft photographic depth) ── */}
      {mounted && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          {/* Subtle cursor-reactive ambient glow in hero */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle 600px at var(--cx, 60%) var(--cy, 40%), var(--cursor-glow) 0%, transparent 70%)',
              opacity: 0.9,
            }}
          />
          {/* Radiant shining yellow atmospheric bloom behind hero */}
          <div
            style={{
              position: 'absolute',
              top: '5%',
              right: '5%',
              width: 550,
              height: 550,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(255, 215, 50, 0.10) 0%, rgba(245, 180, 25, 0.035) 45%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          {/* Extremely soft, distant blur layer behind hero */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-5%',
              width: '60%',
              height: '110%',
              backgroundImage: `url(${BASE}/imageshardul.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              filter: 'blur(100px) saturate(70%) brightness(0.40)',
              opacity: 'var(--photo-opacity)' as unknown as number,
            }}
          />
        </div>
      )}

      {/* ── Main Hero Composition ── */}
      <motion.div
        className="wrap"
        style={{
          width: '100%',
          position: 'relative',
          zIndex: 10,
          opacity: heroOpacity,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            alignItems: 'center',
            rowGap: 'clamp(36px, 6vw, 48px)',
            columnGap: 'clamp(24px, 4vw, 56px)',
          }}
        >
          {/* ═══════════════════════════════════════════════════
              LEFT / FRONT LAYER — TYPOGRAPHY & IDENTITY
              Always front, always unobstructed, zIndex: 20
              ═══════════════════════════════════════════════════ */}
          <motion.div
            style={{
              y: textY,
              zIndex: 20,
              gridColumn: '1 / -1',
            }}
            className="lg:!col-span-7 xl:!col-span-7"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Availability status badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
                padding: '4px 14px',
                borderRadius: 100,
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(12px)',
                marginBottom: 'clamp(20px, 3vh, 32px)',
              }}
            >
              <span className="dot-available" />
              <span
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-2)',
                  letterSpacing: '0.02em',
                  fontWeight: 500,
                }}
              >
                Available for opportunities
              </span>
            </div>

            {/* Primary Name — Large, Editorial, completely unobstructed */}
            <h1
              className="display"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 6.8rem)',
                color: 'var(--text)',
                lineHeight: 0.94,
                marginBottom: '0.22em',
                letterSpacing: '-0.04em',
                wordBreak: 'normal',
                overflowWrap: 'break-word',
              }}
            >
              Shardul
              <br />
              Parihar
            </h1>

            {/* Role / Subtitle */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)',
                color: 'var(--text)',
                fontWeight: 600,
                letterSpacing: '-0.015em',
                marginBottom: 8,
              }}
            >
              {PERSONAL.role}
            </p>

            {/* Core Headline */}
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                color: 'var(--text-2)',
                fontWeight: 500,
                lineHeight: 1.45,
                marginBottom: 18,
                maxWidth: 540,
              }}
            >
              {PERSONAL.headline}
            </p>

            {/* Bio Paragraphs */}
            <p
              style={{
                fontSize: '0.94rem',
                color: 'var(--text-2)',
                lineHeight: 1.75,
                maxWidth: 520,
                marginBottom: 12,
              }}
            >
              {PERSONAL.bio}
            </p>

            <p
              style={{
                fontSize: '0.90rem',
                color: 'var(--text-2)',
                lineHeight: 1.7,
                maxWidth: 520,
                marginBottom: 'clamp(24px, 4vh, 36px)',
              }}
            >
              {PERSONAL.bioSecondary}
            </p>

            {/* Action CTAs */}
            <div
              style={{
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-fill"
                data-cursor="button"
              >
                GitHub
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                data-cursor="button"
              >
                LinkedIn
              </a>
              <a
                href="#projects"
                className="btn"
                data-cursor="button"
              >
                View Projects
              </a>
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════════════════
              RIGHT / VISUAL LAYER — EDITORIAL CINEMATIC PORTRAIT
              Unobstructed, organic feathered fade, whole portrait
              Desktop: right side (5 cols), Mobile: natural flow
              ═══════════════════════════════════════════════════ */}
          <motion.div
            style={{
              y: portraitY,
              zIndex: 10,
              gridColumn: '1 / -1',
              display: 'flex',
              justifyContent: 'center',
            }}
            className="lg:!col-span-5 xl:!col-span-5 lg:!justify-end"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              data-cursor="portrait"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 'clamp(260px, 85vw, 420px)',
                aspectRatio: '3.6 / 4.8',
                borderRadius: 'clamp(24px, 4vw, 36px)',
                overflow: 'hidden',
              }}
            >
              {/* Soft atmospheric halo behind portrait edge */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: -16,
                  borderRadius: 'inherit',
                  background:
                    'radial-gradient(circle at 50% 40%, rgba(120, 120, 200, 0.15) 0%, transparent 75%)',
                  filter: 'blur(32px)',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />

              {/* The Cinematic Photo Container */}
              <motion.div
                style={{
                  scale: portraitScale,
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  zIndex: 1,
                  borderRadius: 'inherit',
                  overflow: 'hidden',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  boxShadow:
                    '0 24px 64px rgba(0, 0, 0, 0.35), inset 0 1px 0 var(--glass-inset)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE}/imageshardul.png`}
                  alt="Shardul Parihar"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 12%',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                />

                {/* Organic feathered vignette overlay — merges seamlessly with atmosphere */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background:
                      'linear-gradient(to bottom, transparent 65%, var(--bg) 98%),' +
                      'radial-gradient(ellipse 95% 95% at 50% 35%, transparent 60%, rgba(6, 7, 11, 0.35) 100%)',
                    mixBlendMode: 'normal',
                  }}
                />

                {/* Subtle glass reflection highlight */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background:
                      'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 45%)',
                  }}
                />
              </motion.div>

              {/* Subtle Location Capsule beneath photo */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 5,
                  padding: '6px 16px',
                  borderRadius: 100,
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid var(--glass-border-h)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  whiteSpace: 'nowrap',
                }}
              >
                <span className="dot-available" style={{ width: 6, height: 6 }} />
                <span
                  style={{
                    fontSize: '0.76rem',
                    color: 'var(--text)',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                  }}
                >
                  Pune, India
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
