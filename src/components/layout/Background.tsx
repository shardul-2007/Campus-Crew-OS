'use client';
// Photographic atmospheric background:
// 1. Deep dark base (from CSS var)
// 2. Real portrait — huge, blurred, darkened, low opacity
// 3. Cursor-reactive light (reads --cx / --cy set by Cursor.tsx)
// 4. Grain overlay (in globals.css)
export default function Background() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
        backgroundColor: 'var(--bg)',
      }}
    >
      {/* ── Portrait layer: large, blurred, darkened ── */}
      <div
        style={{
          position: 'absolute',
          top: '-15%', left: '-5%',
          width: '110%', height: '130%',
          backgroundImage: 'url(/my-portfolio/imageshardul.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          filter: 'blur(72px) saturate(90%)',
          opacity: 'var(--photo-opacity)',
          transform: 'scale(1.08)',
        }}
      />
      {/* ── Dark overlay so glass has depth ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'var(--photo-overlay)',
      }} />
      {/* ── Cursor reactive light ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle 500px at var(--cx, 50vw) var(--cy, 40vh), rgba(255,255,255,0.025) 0%, transparent 80%)',
      }} />
      {/* ── Subtle vignette corners ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)',
      }} />
      {/* ── Grain (defined in globals.css) ── */}
      <div className="grain" />
    </div>
  );
}
