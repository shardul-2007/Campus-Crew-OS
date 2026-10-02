'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, Radio, Zap, Layers } from 'lucide-react';
import { PROJECTS } from '@/data/portfolio';

const STATUS_COLOR: Record<string, string> = {
  'LIVE': '#00F5C8', 'IN DEVELOPMENT': '#F59E0B', 'OPEN SOURCE': '#5B8DEF', 'ARCHIVED': '#6B7280',
};

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>('civicos');

  return (
    <section id="projects" className="py-28 relative" style={{ background: '#050810' }}>
      <div className="section-container">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[var(--accent)] opacity-60" />
            <span className="sys-label-accent">WHAT I BUILD</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Projects &amp;<br /><span className="gradient-text">Real Products</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-md leading-relaxed">
            Things that actually shipped — not demos, not tutorials.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {PROJECTS.filter(p => p.featured).map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="glass rounded-2xl overflow-hidden"
              style={{
                borderColor: expanded === project.id ? 'var(--border-glow)' : 'var(--border)',
                boxShadow: expanded === project.id ? '0 0 40px rgba(0,245,200,0.06), 0 16px 48px rgba(0,0,0,0.5)' : 'none',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
            >
              {/* Window bar */}
              <div className="flex items-center gap-3 px-5 py-3 border-b border-[var(--border)]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <div className="mono text-[10px] text-[var(--text-sub)] flex-1 text-center tracking-widest">
                  {project.name.toUpperCase()}.exe — {project.category}
                </div>
                <div className="flex items-center gap-1.5">
                  <Radio size={9} style={{ color: STATUS_COLOR[project.status] }} />
                  <span className="mono text-[9px]" style={{ color: STATUS_COLOR[project.status] }}>{project.status}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
                  <div>
                    <div className="sys-label-accent mb-2">{project.category} · {project.year}</div>
                    <h3 className="text-3xl font-bold tracking-tight mb-2">{project.name}</h3>
                    <div className="mono text-sm mb-4" style={{ color: 'rgba(0,245,200,0.75)' }}>{project.tagline}</div>
                    <p className="text-[var(--text-muted)] leading-relaxed mb-6 max-w-2xl text-sm">{project.description}</p>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.stack.map(s => <span key={s} className="tech-pill">{s}</span>)}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="glow-btn glow-btn-primary text-sm">
                          <ExternalLink size={13} /> VIEW LIVE
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="glow-btn glow-btn-ghost text-sm">
                          <Github size={13} /> GITHUB
                        </a>
                      )}
                      {project.architecture && (
                        <button onClick={() => setExpanded(expanded === project.id ? null : project.id)} className="glow-btn glow-btn-ghost text-sm">
                          <Layers size={13} /> ARCHITECTURE
                          <motion.span animate={{ rotate: expanded === project.id ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'inline-flex' }}>
                            <ChevronDown size={13} />
                          </motion.span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Status indicators */}
                  <div className="hidden md:flex flex-col gap-3">
                    {[
                      { icon: Radio, label: project.status, color: STATUS_COLOR[project.status] },
                      { icon: Zap, label: 'SHIPPED', color: 'var(--accent)' },
                    ].map(({ icon: Icon, label, color }) => (
                      <div key={label} className="glass rounded-xl p-3 text-center w-20">
                        <Icon size={16} style={{ color }} className="mx-auto mb-1" />
                        <div className="mono text-[8px] tracking-widest" style={{ color: 'var(--text-sub)' }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architecture panel */}
                <AnimatePresence>
                  {expanded === project.id && project.architecture && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pt-6 border-t border-[var(--border)]">
                        <div className="sys-label mb-4">ARCHITECTURE</div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {project.architecture.map(node => (
                            <div key={node.layer} className="rounded-xl p-4" style={{ background: 'var(--accent-dim)', border: '1px solid var(--border-glow)' }}>
                              <div className="sys-label-accent mb-1 text-[9px]">{node.layer}</div>
                              <div className="font-semibold text-sm mb-1.5">{node.tech}</div>
                              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{node.detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}