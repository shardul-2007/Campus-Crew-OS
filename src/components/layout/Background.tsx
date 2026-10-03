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
        transition: 'background-color 0.35s ease',
      }}
    >
      {/* ── Portrait — massive, blurred, atmospheric photographic layer ── */}
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
          filter: 'var(--photo-filter)',
          opacity: 'var(--photo-opacity)' as unknown as number,
          transform: 'scale(1.06)',
          willChange: 'transform',
          transition: 'filter 0.35s ease, opacity 0.35s ease',
        }}
      />

      {/* ── Atmospheric overlay layer ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--overlay)',
          transition: 'background 0.35s ease',
        }}
      />

      {/* ── Cursor-reactive light illumination ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle 520px at var(--cx, 50%) var(--cy, 35%), var(--cursor-glow) 0%, transparent 75%)',
        }}
      />

      {/* ── Vignette edge depth ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 48%, rgba(0,0,0,0.35) 100%)',
        }}
      />

      {/* ── Grain ── */}
      <div className="grain" />
    </div>
  );
}
