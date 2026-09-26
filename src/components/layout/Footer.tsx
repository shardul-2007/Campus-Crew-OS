'use client';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PERSONAL } from '@/data/portfolio';

const LINKS = [
  { icon: Github,   href: PERSONAL.github,   label: 'GitHub' },
  { icon: Linkedin, href: PERSONAL.linkedin,  label: 'LinkedIn' },
  { icon: Mail,     href: 'mailto:' + PERSONAL.email, label: 'Email' },
];

const NAV = [
  { label: 'HOME',         href: '#home' },
  { label: 'ABOUT',        href: '#about' },
  { label: 'PROJECTS',     href: '#projects' },
  { label: 'EXPERIENCE',   href: '#experience' },
  { label: 'SKILLS',       href: '#skills' },
  { label: 'ACHIEVEMENTS', href: '#achievements' },
  { label: 'CONTACT',      href: '#contact' },
];

export default function Footer() {
  return (
    <footer
      className="relative border-t"
      style={{ background: '#030508', borderColor: 'var(--border)' }}
    >
      <div className="section-container py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          {/* Left — brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="status-dot" style={{ width: 6, height: 6 }} />
              <span className="mono font-bold tracking-widest">{PERSONAL.shortName}</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
              Software Engineer building real-world products with full-stack dev, AI and open source.
            </p>
            <div className="flex gap-3">
              {LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 glass rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--border-glow)] transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Center — nav */}
          <div>
            <div className="sys-label mb-5">NAVIGATION</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {NAV.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="mono text-xs text-[var(--text-sub)] hover:text-[var(--accent)] transition-colors tracking-widest"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — status */}
          <div>
            <div className="sys-label mb-5">SYSTEM INFO</div>
            <div className="flex flex-col gap-2">
              {[
                { label: 'STATUS',   value: '● ONLINE', accent: true },
                { label: 'BUILD',    value: 'v5.0 / ' + PERSONAL.buildVersion },
                { label: 'LOCATION', value: 'PUNE, INDIA' },
                { label: 'STACK',    value: 'Next.js + TypeScript' },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="sys-label">{row.label}</span>
                  <span
                    className="mono text-[10px]"
                    style={{ color: row.accent ? 'var(--accent)' : 'var(--text-sub)' }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between pt-8 border-t border-[var(--border)] flex-wrap gap-4">
          <div className="mono text-[10px] text-[var(--text-sub)] tracking-wider">
            © 2026 {PERSONAL.name} · SHARDUL.OS v5.0 · Built with Next.js + Framer Motion
          </div>
          <div className="mono text-[10px] text-[var(--text-sub)] tracking-wider">
            NOT A PORTFOLIO. A LIVE SNAPSHOT OF HOW I BUILD.
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-8 h-8 glass rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--border-glow)] transition-all"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
