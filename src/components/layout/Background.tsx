'use client';

const BASE = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

export default function Background() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: 'var(--bg)',
      }}
    >
      {/* ── Portrait — massive, blurred, atmospheric ── */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '120%',
          height: '140%',
          backgroundImage: `url(${BASE}/imageshardul.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 15%',
          filter: 'blur(88px) saturate(80%) brightness(0.55)',
          opacity: 0.28,
          transform: 'scale(1.06)',
          willChange: 'transform',
        }}
      />

      {/* ── Dark atmospheric overlay — navy depth ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 120% 80% at 60% 20%, rgba(60,55,120,0.12) 0%, transparent 60%),' +
            'radial-gradient(ellipse 80% 60% at 10% 80%, rgba(30,25,80,0.10) 0%, transparent 60%),' +
            'rgba(6, 8, 16, 0.55)',
        }}
      />

      {/* ── Cursor-reactive light — set by Cursor.tsx via CSS vars ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle 520px at var(--cx, 50%) var(--cy, 35%), rgba(255,255,255,0.020) 0%, transparent 75%)',
        }}
      />

      {/* ── Vignette: edges darker ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 48%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* ── Grain — defined in globals.css ── */}
      <div className="grain" />
    </div>
  );
}
