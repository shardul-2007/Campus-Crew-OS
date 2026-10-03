'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, THEMES, type Theme } from '@/components/layout/ThemeProvider';

const LINKS = [
  { label: 'About',        href: '#about'        },
  { label: 'Skills',       href: '#skills'       },
  { label: 'Projects',     href: '#projects'     },
  { label: 'Experience',   href: '#experience'   },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact',      href: '#contact'      },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [active,    setActive]    = useState('');
  const { theme, setTheme }       = useTheme();
  const popRef                    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', s, { passive: true });
    return () => window.removeEventListener('scroll', s);
  }, []);

  useEffect(() => {
    const ids = LINKS.map(l => l.href.replace('#', ''));
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id); }),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) setThemeOpen(false);
    };
    if (themeOpen) document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [themeOpen]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setThemeOpen(false); setMenuOpen(false); }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, []);

  return (
    <>
      <div style={{
        position: 'fixed', top: 20, left: 0, right: 0,
        zIndex: 500, display: 'flex', justifyContent: 'center',
        padding: '0 20px', pointerEvents: 'none',
      }}>
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass-nav"
          style={{
            pointerEvents: 'auto',
            width: '100%', maxWidth: 820,
            borderRadius: 100,
            padding: '10px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          }}
        >
          {/* Brand */}
          <a
            href="#home"
            style={{ textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.02em', color: 'var(--text)', flexShrink: 0, whiteSpace: 'nowrap' }}
            data-cursor="hover"
          >
            Shardul Parihar
          </a>

          {/* Desktop links */}
          <div style={{ display: 'flex', gap: 2, alignItems: 'center' }} className="hidden md:flex">
            {LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                data-cursor="hover"
                style={{
                  padding: '6px 12px',
                  borderRadius: 100,
                  fontSize: '0.82rem',
                  fontWeight: active === l.href ? 600 : 400,
                  color: active === l.href ? 'var(--text)' : 'var(--text-2)',
                  background: active === l.href ? 'var(--glass)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right: theme + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }} ref={popRef}>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setThemeOpen(o => !o)}
                aria-label="Change theme"
                aria-expanded={themeOpen}
                data-cursor="hover"
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '6px 14px', borderRadius: 100,
                  border: '1px solid var(--glass-border)',
                  background: 'var(--glass)',
                  color: 'var(--text-2)', fontSize: '0.78rem',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: THEMES.find(t => t.id === theme)?.dot, display: 'inline-block' }} />
                <span className="hidden sm:inline">Theme</span>
              </button>
              <AnimatePresence>
                {themeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.16 }}
                    className="glass"
                    style={{
                      position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                      minWidth: 156, borderRadius: 18, padding: 10, zIndex: 600,
                    }}
                  >
                    <p className="label" style={{ padding: '4px 8px 10px', display: 'block' }}>Appearance</p>
                    {THEMES.map(t => (
                      <button
                        key={t.id}
                        onClick={() => { setTheme(t.id as Theme); setThemeOpen(false); }}
                        data-cursor="hover"
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          width: '100%', padding: '8px 10px', borderRadius: 12,
                          background: theme === t.id ? 'var(--glass)' : 'transparent',
                          border: 'none',
                          color: theme === t.id ? 'var(--text)' : 'var(--text-2)',
                          fontSize: '0.82rem', fontWeight: theme === t.id ? 600 : 400,
                          textAlign: 'left',
                        }}
                      >
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.dot, boxShadow: theme === t.id ? `0 0 8px ${t.dot}` : 'none', flexShrink: 0 }} />
                        {t.label}
                        {theme === t.id && <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--text-3)' }}>✓</span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              data-cursor="hover"
              style={{
                padding: '7px 12px', borderRadius: 100,
                border: '1px solid var(--glass-border)',
                background: 'var(--glass)', color: 'var(--text-2)',
                fontSize: '0.78rem', backdropFilter: 'blur(12px)',
              }}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass"
            style={{
              position: 'fixed', top: 78, left: 20, right: 20,
              zIndex: 499, borderRadius: 24, padding: 16,
            }}
          >
            {LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                data-cursor="hover"
                style={{
                  display: 'block', padding: '12px 16px', borderRadius: 12,
                  fontSize: '0.9rem', fontWeight: active === l.href ? 600 : 400,
                  color: active === l.href ? 'var(--text)' : 'var(--text-2)',
                  textDecoration: 'none',
                  background: active === l.href ? 'var(--glass)' : 'transparent',
                }}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
