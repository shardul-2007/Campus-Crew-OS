'use client';

const BASE = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

// 18 subtle floating microscopic light particles providing natural optical depth
const PARTICLES = [
  { id: 1, top: '12%', left: '18%', size: 2.2, opacity: 0.28, factor: 1.8 },
  { id: 2, top: '24%', left: '78%', size: 1.8, opacity: 0.22, factor: -1.5 },
  { id: 3, top: '35%', left: '32%', size: 2.6, opacity: 0.32, factor: 2.1 },
  { id: 4, top: '48%', left: '88%', size: 1.6, opacity: 0.18, factor: -2.0 },
  { id: 5, top: '58%', left: '14%', size: 2.0, opacity: 0.25, factor: 1.6 },
  { id: 6, top: '65%', left: '55%', size: 3.0, opacity: 0.35, factor: -1.9 },
  { id: 7, top: '78%', left: '82%', size: 1.8, opacity: 0.20, factor: 2.4 },
  { id: 8, top: '85%', left: '25%', size: 2.4, opacity: 0.26, factor: -1.7 },
  { id: 9, top: '18%', left: '45%', size: 1.5, opacity: 0.18, factor: 1.4 },
  { id: 10, top: '92%', left: '68%', size: 2.0, opacity: 0.22, factor: 2.0 },
  { id: 11, top: '8%',  left: '62%', size: 1.7, opacity: 0.20, factor: -1.8 },
  { id: 12, top: '42%', left: '10%', size: 2.2, opacity: 0.24, factor: 1.9 },
  { id: 13, top: '52%', left: '72%', size: 1.9, opacity: 0.21, factor: -2.2 },
  { id: 14, top: '72%', left: '38%', size: 2.5, opacity: 0.30, factor: 1.7 },
  { id: 15, top: '28%', left: '92%', size: 1.6, opacity: 0.17, factor: -1.6 },
  { id: 16, top: '82%', left: '4%',  size: 2.1, opacity: 0.23, factor: 2.3 },
  { id: 17, top: '15%', left: '85%', size: 2.8, opacity: 0.33, factor: -2.1 },
  { id: 18, top: '62%', left: '94%', size: 1.7, opacity: 0.19, factor: 1.5 },
];

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
      {/* ── Depth 1: Atmospheric light field (shifts slowly via --bg-parallax) ── */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-15%',
          width: '130%',
          height: '130%',
          background:
            'radial-gradient(circle 850px at 70% 30%, rgba(200, 225, 255, 0.045) 0%, transparent 70%)',
          transform: 'translate3d(var(--bg-parallax-x, 0px), var(--bg-parallax-y, 0px), 0)',
          willChange: 'transform',
        }}
      />

      {/* ── Depth 2: Blurred portrait atmosphere (shifts with --photo-parallax) ── */}
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
          transform:
            'translate3d(var(--photo-parallax-x, 0px), var(--photo-parallax-y, 0px), 0) scale(1.08)',
          willChange: 'transform',
          transition: 'filter 0.35s ease, opacity 0.35s ease',
        }}
      />

      {/* ── Depth 3: Microscopic floating dust / light particles ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          willChange: 'transform',
        }}
      >
        {PARTICLES.map(p => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              backgroundColor: 'var(--cursor-core)',
              boxShadow: '0 0 6px var(--cursor-core-glow)',
              opacity: p.opacity,
              transform: `translate3d(calc(var(--bg-parallax-x, 0px) * ${p.factor}), calc(var(--bg-parallax-y, 0px) * ${p.factor}), 0)`,
              transition: 'opacity 0.4s ease',
            }}
          />
        ))}
      </div>

      {/* ── Atmospheric overlay layer ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--overlay)',
          transition: 'background 0.35s ease',
        }}
      />

      {/* ── Depth 4: Living atmospheric cursor-reactive field (250–500px radius, dissolving naturally) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle 520px at var(--pointer-x, 50%) var(--pointer-y, 35%), var(--cursor-glow) 0%, transparent 75%)',
        }}
      />

      {/* ── Depth 5: Vignette edge depth ── */}
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
