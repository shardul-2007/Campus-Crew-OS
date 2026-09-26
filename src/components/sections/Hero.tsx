'use client';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { PERSONAL } from '@/data/portfolio';
import { useRef, useEffect, useState } from 'react';

const TECH_NODES = [
  { label: 'React',       angle: 0,   r: 130, size: 52 },
  { label: 'Next.js',    angle: 45,  r: 160, size: 56 },
  { label: 'Python',     angle: 90,  r: 130, size: 52 },
  { label: 'TypeScript', angle: 135, r: 155, size: 60 },
  { label: 'AI APIs',    angle: 180, r: 140, size: 52 },
  { label: 'Leaflet',    angle: 225, r: 158, size: 52 },
  { label: 'Tailwind',   angle: 270, r: 130, size: 52 },
  { label: 'GitHub',     angle: 315, r: 150, size: 52 },
];

const CODE_FRAGMENTS = [
  'const civicOS = new Platform();',
  'await ai.query(data);',
  'fn build() -> Result<OS>',
  'git commit -m "feat: v5"',
  'export default SHARDUL;',
  '<System status="online" />',
  'npm run build',
  'interface Developer {}',
];

function getNodePos(angle: number, r: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useTransform(mouseX, v => v - 200);
  const glowY = useTransform(mouseY, v => v - 200);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const headlineLines = PERSONAL.headline.split('\n');

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={handleMouse}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(0,245,200,0.05) 0%, transparent 65%), #050810' }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Cursor-reactive glow */}
      {mounted && (
        <motion.div
          className="pointer-events-none absolute rounded-full"
          style={{
            x: glowX, y: glowY,
            width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(0,245,200,0.05) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Drifting code fragments */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && CODE_FRAGMENTS.map((frag, i) => (
          <motion.div
            key={i}
            className="absolute mono"
            style={{
              left: `${10 + (i * 11) % 80}%`,
              color: 'rgba(0,245,200,0.07)',
              fontSize: '0.68rem',
            }}
            initial={{ y: '110vh', opacity: 0 }}
            animate={{ y: '-20vh', opacity: [0, 0.9, 0.9, 0] }}
            transition={{
              duration: 18 + i * 3,
              repeat: Infinity,
              delay: i * 2.5,
              ease: 'linear',
            }}
          >
            {frag}
          </motion.div>
        ))}
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[88vh] py-24">

          {/* LEFT — Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <span className="status-dot status-dot-pulse" />
              <span className="sys-label-accent">DIGITAL TWIN / SOFTWARE ENGINEER</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-none">
              {headlineLines.map((line, i) => (
                <span key={i} className={`block ${i === 1 ? 'gradient-text' : 'text-[var(--text)]'}`}>
                  {line}
                </span>
              ))}
            </h1>

            <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-lg">
              {PERSONAL.bio}
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#projects" className="glow-btn glow-btn-primary">
                EXPLORE MY WORK
                <ArrowRight size={15} />
              </a>
              <a
                href={PERSONAL.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn glow-btn-ghost"
              >
                VIEW RESUME
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 pt-5 border-t border-[var(--border)]">
              {[
                { label: 'PROJECTS', value: '2+' },
                { label: 'PROGRAMS', value: '8' },
                { label: 'BUILD', value: 'v5.0' },
              ].map(s => (
                <div key={s.label}>
                  <div className="mono text-2xl font-bold text-[var(--accent)]">{s.value}</div>
                  <div className="sys-label mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Developer System Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-[320px] h-[320px] md:w-[380px] md:h-[380px]">

              {/* Orbital rings */}
              {[
                { inset: 0, duration: 30, dir: 1, color: 'var(--border)' },
                { inset: 20, duration: 22, dir: -1, color: 'rgba(0,245,200,0.2)' },
                { inset: 60, duration: 16, dir: 1, color: 'rgba(0,245,200,0.1)' },
              ].map((ring, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border"
                  style={{
                    inset: ring.inset,
                    borderColor: ring.color,
                    animation: `spin ${ring.duration}s linear infinite ${ring.dir < 0 ? 'reverse' : ''}`,
                  }}
                />
              ))}

              {/* Center node */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-20 h-20 rounded-full glass flex items-center justify-center"
                  style={{
                    borderColor: 'var(--border-glow)',
                    boxShadow: '0 0 32px rgba(0,245,200,0.18), 0 0 60px rgba(0,245,200,0.06)',
                  }}
                >
                  <span className="mono text-sm font-bold text-[var(--accent)] text-center leading-tight">
                    S.P<br /><span style={{ fontSize: '0.5rem', opacity: 0.7 }}>v5.0</span>
                  </span>
                </div>
              </div>

              {/* Tech nodes */}
              {mounted && TECH_NODES.map((node, i) => {
                const pos = getNodePos(node.angle, node.r);
                return (
                  <motion.div
                    key={node.label}
                    className="absolute glass rounded-lg flex items-center justify-center text-center cursor-default"
                    style={{
                      width: node.size,
                      height: node.size,
                      left: `calc(50% + ${pos.x}px - ${node.size / 2}px)`,
                      top: `calc(50% + ${pos.y}px - ${node.size / 2}px)`,
                      fontSize: '0.58rem',
                      padding: '4px',
                      color: 'var(--text-muted)',
                      fontFamily: 'JetBrains Mono, monospace',
                      letterSpacing: '0.03em',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                    whileHover={{
                      backgroundColor: 'var(--accent-dim)',
                      borderColor: 'var(--border-glow)',
                      color: 'var(--accent)',
                      scale: 1.18,
                    }}
                  >
                    {node.label}
                  </motion.div>
                );
              })}

              {/* SVG connection lines */}
              {mounted && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 380 380"
                >
                  {TECH_NODES.map((node) => {
                    const pos = getNodePos(node.angle, node.r);
                    return (
                      <line
                        key={node.label}
                        x1={190} y1={190}
                        x2={190 + pos.x} y2={190 + pos.y}
                        stroke="rgba(0,245,200,0.09)"
                        strokeWidth="1"
                        strokeDasharray="3 5"
                      />
                    );
                  })}
                </svg>
              )}

              {/* Floating info chips */}
              {[
                { label: 'STATUS', value: 'AVAILABLE', top: '4%', right: '-8%', accent: true, delay: 0 },
                { label: 'LOCATION', value: 'PUNE, IN', bottom: '15%', left: '-10%', accent: false, delay: 1 },
                { label: 'BUILD', value: PERSONAL.buildVersion, top: '-2%', left: '8%', accent: false, delay: 2 },
              ].map((chip) => (
                <motion.div
                  key={chip.label}
                  className="absolute glass rounded-lg px-3 py-2"
                  style={chip as React.CSSProperties}
                  animate={{ y: [0, chip.delay % 2 === 0 ? -5 : 5, 0] }}
                  transition={{ repeat: Infinity, duration: 4 + chip.delay, ease: 'easeInOut', delay: chip.delay }}
                >
                  <div className="sys-label mb-0.5">{chip.label}</div>
                  <div className={`mono text-xs font-medium ${chip.accent ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                    {chip.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050810] to-transparent pointer-events-none" />
    </section>
  );
}
