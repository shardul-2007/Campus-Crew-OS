'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu, ExternalLink } from 'lucide-react';
import { PERSONAL } from '@/data/portfolio';

const NAV_LINKS = [
  { label: 'HOME',         href: '#home' },
  { label: 'ABOUT',        href: '#about' },
  { label: 'PROJECTS',     href: '#projects' },
  { label: 'EXPERIENCE',   href: '#experience' },
  { label: 'SKILLS',       href: '#skills' },
  { label: 'ACHIEVEMENTS', href: '#achievements' },
  { label: 'CONTACT',      href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href));
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => s && io.observe(s));
    return () => io.disconnect();
  }, []);

  function closeMenu() { setMenuOpen(false); }

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px z-[9999]"
        style={{ background: 'var(--accent)', transformOrigin: 'left', scaleX: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0 }}
      />
      {/* Actual scroll progress tracked via useScroll would go here — simplified version */}

      {/* Main navbar */}
      <nav
        className="fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(5,8,16,0.88)' : 'rgba(5,8,16,0.6)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: scrolled ? '1px solid rgba(0,245,200,0.12)' : '1px solid rgba(255,255,255,0.06)',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div className="flex items-center justify-between px-5 py-3 max-w-7xl mx-auto">

          {/* Left — wordmark */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <span className="status-dot status-dot-pulse" style={{ width: 6, height: 6 }} />
            <div>
              <div className="mono font-bold text-sm tracking-widest group-hover:text-[var(--accent)] transition-colors">
                {PERSONAL.shortName}
              </div>
              <div className="mono text-[8px] tracking-[0.2em] text-[var(--text-sub)]">
                SOFTWARE ENGINEER / BUILDER
              </div>
            </div>
          </a>

          {/* Center — nav links (desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="mono text-[10px] tracking-[0.14em] px-3 py-2 rounded-lg transition-all"
                style={{
                  color: active === link.href.slice(1) ? 'var(--accent)' : 'var(--text-muted)',
                  background: active === link.href.slice(1) ? 'var(--accent-dim)' : 'transparent',
                  fontWeight: active === link.href.slice(1) ? 600 : 400,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-2">
            <span
              className="hidden sm:flex items-center gap-2 mono text-xs px-3 py-1.5 rounded-full"
              style={{
                background: 'var(--accent-dim)',
                border: '1px solid var(--border-glow)',
                color: 'var(--accent)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              AVAILABLE
            </span>
            <a
              href={PERSONAL.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex glow-btn glow-btn-ghost text-xs py-1.5 px-3"
            >
              RESUME <ExternalLink size={11} />
            </a>
            {/* Mobile hamburger */}
            <button
              className="lg:hidden glass rounded-lg p-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(5,8,16,0.96)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid var(--border-md)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
            }}
          >
            <div className="p-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="mono text-sm tracking-widest px-4 py-3 rounded-xl transition-all"
                  style={{
                    color: active === link.href.slice(1) ? 'var(--accent)' : 'var(--text-muted)',
                    background: active === link.href.slice(1) ? 'var(--accent-dim)' : 'transparent',
                    border: '1px solid transparent',
                    borderColor: active === link.href.slice(1) ? 'var(--border-glow)' : 'transparent',
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-4 border-t border-[var(--border)] mt-2 flex flex-wrap gap-2">
                <span className="flex items-center gap-2 mono text-xs px-3 py-2 rounded-full"
                  style={{ background: 'var(--accent-dim)', border: '1px solid var(--border-glow)', color: 'var(--accent)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  AVAILABLE
                </span>
                <a href={PERSONAL.resumeUrl} target="_blank" rel="noopener noreferrer"
                  className="glow-btn glow-btn-ghost text-xs py-2">
                  RESUME <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
