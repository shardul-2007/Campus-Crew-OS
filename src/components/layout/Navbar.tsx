'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { label: 'About',        href: '#about'        },
  { label: 'Skills',       href: '#skills'       },
  { label: 'Projects',     href: '#projects'     },
  { label: 'Experience',   href: '#experience'   },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact',      href: '#contact'      },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active,   setActive]   = useState('');

  // Scroll-aware opacity (slightly recede when scrolled deep)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section highlight
  useEffect(() => {
    const ids = LINKS.map(l => l.href.replace('#', ''));
    const els = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id); }),
      { rootMargin: '-38% 0px -58% 0px' }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, []);

  // Close on scroll (mobile UX)
  useEffect(() => {
    if (!menuOpen) return;
    const s = () => setMenuOpen(false);
    window.addEventListener('scroll', s, { passive: true, once: true });
    return () => window.removeEventListener('scroll', s);
  }, [menuOpen]);

  return (
    <>
      {/* ── Floating glass bar ── */}
      <div
        style={{
          position: 'fixed',
          top: 20,
          left: 0, right: 0,
          zIndex: 500,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 20px',
          pointerEvents: 'none',
        }}
      >
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="glass-nav"
          role="navigation"
          aria-label="Main navigation"
          style={{
            pointerEvents: 'auto',
            width: '100%',
            maxWidth: 800,
            borderRadius: 100,
            padding: '10px 22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            opacity: scrolled ? 0.88 : 1,
            transition: 'opacity 0.4s ease',
          }}
        >
          {/* Brand */}
          <a
            href="#home"
            data-cursor="hover"
            style={{
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.93rem',
              letterSpacing: '-0.025em',
              color: 'var(--text)',
              flexShrink: 0,
              whiteSpace: 'nowrap',
              fontFamily: 'Manrope, system-ui, sans-serif',
            }}
          >
            Shardul Parihar
          </a>

          {/* Desktop links */}
          <div
            className="hidden md:flex"
            style={{ alignItems: 'center', gap: 2 }}
          >
            {LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="hover"
                style={{
                  display: 'block',
                  padding: '6px 13px',
                  borderRadius: 100,
                  fontSize: '0.82rem',
                  fontWeight: active === link.href ? 600 : 400,
                  color: active === link.href ? 'var(--text)' : 'var(--text-2)',
                  background: active === link.href ? 'rgba(255,255,255,0.07)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.18s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger only */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            data-cursor="hover"
            style={{
              padding: '7px 14px',
              borderRadius: 100,
              border: '1px solid var(--glass-border)',
              background: 'var(--glass-bg)',
              color: 'var(--text-2)',
              fontSize: '0.82rem',
              backdropFilter: 'blur(12px)',
              fontFamily: 'inherit',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </motion.nav>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="glass"
            style={{
              position: 'fixed',
              top: 76,
              left: 20, right: 20,
              zIndex: 499,
              borderRadius: 20,
              padding: 12,
              overflow: 'hidden',
            }}
          >
            {LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                data-cursor="hover"
                style={{
                  display: 'block',
                  padding: '13px 18px',
                  borderRadius: 12,
                  fontSize: '0.92rem',
                  fontWeight: active === link.href ? 600 : 400,
                  color: active === link.href ? 'var(--text)' : 'var(--text-2)',
                  background: active === link.href ? 'rgba(255,255,255,0.07)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'background 0.15s ease',
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
