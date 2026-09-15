/**
 * SHARDUL.OS — JavaScript Modules
 * 16 named init() functions. No framework. Zero dependencies.
 */

'use strict';

/* ── Utilities ── */
const qs  = (s, ctx = document) => ctx.querySelector(s);
const qsa = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const on  = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);
const off = (el, ev, fn) => el && el.removeEventListener(ev, fn);
const rm  = (el) => el && el.remove();
const cls = (el, ...c) => el && el.classList;
const reduced = () => window.matchMedia('(prefers-reduced-motion:reduce)').matches;

/* Apply saved theme before any paint */
(function () {
  const t = localStorage.getItem('sos-theme');
  if (t) document.documentElement.setAttribute('data-theme', t);
})();


/* ═══════════════════════════════════════════
   1. BOOT SEQUENCE
   ═══════════════════════════════════════════ */
function initBoot() {
  const boot = qs('#boot');
  if (!boot) return;

  const alreadyBooted = localStorage.getItem('sos-booted');
  const enter = qs('#bootEnter');
  const skip  = qs('#bootSkip');

  function closeBoot() {
    boot.classList.add('boot-out');
    localStorage.setItem('sos-booted', '1');
    setTimeout(() => rm(boot), 520);
  }

  if (alreadyBooted || reduced()) {
    rm(boot);
    return;
  }

  /* Animate boot lines */
  const lines = qsa('.boot-line', boot);
  lines.forEach(l => {
    const delay = parseInt(l.dataset.delay, 10) || 0;
    setTimeout(() => l.classList.add('visible'), delay);
  });

  /* Show Enter button after last line */
  const lastDelay = lines.reduce((m, l) => Math.max(m, parseInt(l.dataset.delay, 10) || 0), 0);
  setTimeout(() => {
    enter && enter.classList.add('visible');
    skip  && skip.classList.add('visible');
    enter && enter.focus();
  }, lastDelay + 350);

  on(enter, 'click', closeBoot);
  on(skip,  'click', closeBoot);
  on(boot,  'keydown', e => { if (e.key === 'Enter' || e.key === ' ') closeBoot(); });
}


/* ═══════════════════════════════════════════
   2. THEME TOGGLE
   ═══════════════════════════════════════════ */
function initThemeToggle() {
  const btn = qs('#themeToggle');
  if (!btn) return;

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('sos-theme', t);
    btn.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  }

  on(btn, 'click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    setTheme(cur === 'light' ? 'dark' : 'light');
  });

  btn.setAttribute('aria-label',
    document.documentElement.getAttribute('data-theme') === 'light'
      ? 'Switch to dark mode' : 'Switch to light mode');
}


/* ═══════════════════════════════════════════
   3. NAVIGATION — scrollspy + mobile menu
   ═══════════════════════════════════════════ */
function initNav() {
  const header  = qs('#header');
  const navLinks = qsa('.nav-link');
  const toggle  = qs('#menuToggle');
  const mMenu   = qs('#mobileMenu');
  const mClose  = qs('#mobileClose');
  const mLinks  = qsa('.mm-link');
  const mmCmd   = qs('#mmCmdBtn');
  const progress = qs('#scrollProgress');

  /* Scroll progress */
  on(window, 'scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max ? window.scrollY / max : 0;
    if (progress) progress.style.transform = `scaleX(${pct})`;
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
    if (qs('#topBtn')) qs('#topBtn').classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  /* Scrollspy */
  const sections = qsa('section[id]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = navLinks.find(l => l.dataset.section === e.target.id);
        active && active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => io.observe(s));

  /* Mobile menu */
  function openMenu() {
    mMenu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    qs('.mm-close', mMenu)?.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mMenu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggle.focus();
  }
  on(toggle, 'click', openMenu);
  on(mClose, 'click', closeMenu);
  mLinks.forEach(l => on(l, 'click', closeMenu));
  on(mmCmd, 'click', () => { closeMenu(); openCommandPalette(); });

  /* Smooth scroll for all in-page links */
  on(document, 'click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = qs(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    closeMenu();
  });

  /* Back to top */
  on(qs('#topBtn'), 'click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}


/* ═══════════════════════════════════════════
   4. COMMAND PALETTE
   ═══════════════════════════════════════════ */
let cmdOpen = false;

const COMMANDS = [
  { id:'civicos',       icon:'fa-diagram-project', label:'Open CivicOS',         desc:'View the flagship project',            fn: () => { scrollTo('#work');       openCivicOS(); } },
  { id:'work',          icon:'fa-briefcase',        label:'View Projects',         desc:'Navigate to Work section',            fn: () => scrollTo('#work') },
  { id:'engineering',   icon:'fa-code',             label:'Engineering Notes',     desc:'How I build and architecture choices', fn: () => scrollTo('#engineering') },
  { id:'lab',           icon:'fa-flask',            label:'Open Lab',              desc:'Experiments and interactive demos',   fn: () => scrollTo('#lab') },
  { id:'opensource',    icon:'fa-code-branch',      label:'Open Source',           desc:'GSSoC, NSOC, GitHub contributions',   fn: () => scrollTo('#opensource') },
  { id:'journey',       icon:'fa-map',              label:'Developer Journey',     desc:'Milestones and growth path',          fn: () => scrollTo('#journey') },
  { id:'connect',       icon:'fa-envelope',         label:'Contact Shardul',       desc:'Start a conversation',                fn: () => scrollTo('#connect') },
  { id:'github',        icon:'fab fa-github',       label:'Open GitHub',           desc:'github.com/shardul-2007',             fn: () => openUrl('https://github.com/shardul-2007') },
  { id:'linkedin',      icon:'fab fa-linkedin',     label:'Open LinkedIn',         desc:'linkedin.com/in/shardul-parihar-/',   fn: () => openUrl('https://www.linkedin.com/in/shardul-parihar-/') },
  { id:'civicoslive',   icon:'fa-arrow-up-right-from-square', label:'Open CivicOS Live', desc:'civicos-beta.vercel.app',       fn: () => openUrl('https://civicos-beta.vercel.app/') },
  { id:'ai',            icon:'fa-robot',            label:'Ask Shardul AI',        desc:'Questions about projects and skills', fn: () => { scrollTo('#lab'); focusAI(); } },
  { id:'source',        icon:'fab fa-github',       label:'View Source',           desc:'github.com/shardul-2007/my-portfolio',fn: () => openUrl('https://github.com/shardul-2007/my-portfolio') },
  { id:'theme',         icon:'fa-moon',             label:'Toggle Theme',          desc:'Switch dark/light mode',              fn: () => qs('#themeToggle')?.click() },
  { id:'recruiter',     icon:'fa-briefcase',        label:'View as Recruiter',     desc:'Prioritise key projects and contact', fn: () => setViewMode('recruiter') },
  { id:'developer',     icon:'fa-code',             label:'View as Developer',     desc:'Highlight engineering and GitHub',    fn: () => setViewMode('developer') },
  { id:'collaborator',  icon:'fa-handshake',        label:'View as Collaborator',  desc:'Open source and community focus',     fn: () => setViewMode('collaborator') },
  { id:'default',       icon:'fa-globe',            label:'Reset View Mode',       desc:'Back to full default experience',     fn: () => setViewMode('default') },
];

function scrollTo(id)   { qs(id)?.scrollIntoView({ behavior: 'smooth' }); }
function openUrl(u)     { window.open(u, '_blank', 'noopener noreferrer'); }
function openCivicOS()  { 
  const btn = qs('#archToggle');
  if (btn) { btn.click(); }
}
function focusAI()      { setTimeout(() => qs('#aiInput')?.focus(), 600); }

function fuzzy(str, q) {
  if (!q) return 1;
  const s = str.toLowerCase(), query = q.toLowerCase();
  if (s.includes(query)) return 2;
  let qi = 0;
  for (let i = 0; i < s.length && qi < query.length; i++) {
    if (s[i] === query[qi]) qi++;
  }
  return qi === query.length ? 1 : 0;
}

function openCommandPalette() {
  const overlay = qs('#cmdPalette');
  const input   = qs('#cmdInput');
  if (!overlay || cmdOpen) return;
  cmdOpen = true;
  overlay.hidden = false;
  renderCommands('');
  setTimeout(() => input?.focus(), 50);
  on(qs('#cmdBackdrop'), 'click', closeCommandPalette);
}

function closeCommandPalette() {
  const overlay = qs('#cmdPalette');
  if (!overlay || !cmdOpen) return;
  cmdOpen = false;
  overlay.hidden = true;
  if (qs('#cmdInput')) qs('#cmdInput').value = '';
  off(qs('#cmdBackdrop'), 'click', closeCommandPalette);
}

function renderCommands(query) {
  const list = qs('#cmdList');
  if (!list) return;
  const results = COMMANDS
    .map(c => ({ ...c, score: fuzzy(c.label + ' ' + c.desc, query) }))
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!results.length) {
    list.innerHTML = `<li class="cmd-empty">No commands match "${query}"</li>`;
    return;
  }
  list.innerHTML = results.map((c, i) => `
    <li class="cmd-item${i === 0 ? ' active' : ''}" role="option"
        data-id="${c.id}" aria-selected="${i === 0}">
      <span class="cmd-item-icon"><i class="fa-solid ${c.icon}" aria-hidden="true"></i></span>
      <span class="cmd-item-label">${c.label}</span>
      <span class="cmd-item-desc">${c.desc}</span>
    </li>`).join('');

  list.querySelectorAll('.cmd-item').forEach(item => {
    on(item, 'click', () => {
      const cmd = COMMANDS.find(c => c.id === item.dataset.id);
      if (cmd) { closeCommandPalette(); setTimeout(cmd.fn, 100); }
    });
  });
}

function initCommandPalette() {
  const trigger = qs('#cmdTrigger');
  const input   = qs('#cmdInput');
  const list    = qs('#cmdList');

  on(trigger, 'click', openCommandPalette);

  on(document, 'keydown', e => {
    const tag = document.activeElement.tagName;
    const inInput = ['INPUT','TEXTAREA'].includes(tag);

    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      cmdOpen ? closeCommandPalette() : openCommandPalette();
    }
    if (e.key === '/' && !inInput && !cmdOpen) {
      e.preventDefault();
      openCommandPalette();
    }
    if (e.key === 'Escape') {
      closeCommandPalette();
      closeMobileMenu();
      closeViewModal();
    }
  });

  on(input, 'input', () => renderCommands(input.value.trim()));

  on(input, 'keydown', e => {
    const items = qsa('.cmd-item', list);
    const cur   = items.findIndex(i => i.classList.contains('active'));
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (cur + 1) % items.length;
      items.forEach((i, idx) => { i.classList.toggle('active', idx === next); i.setAttribute('aria-selected', idx === next); });
      items[next]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (cur - 1 + items.length) % items.length;
      items.forEach((i, idx) => { i.classList.toggle('active', idx === prev); i.setAttribute('aria-selected', idx === prev); });
      items[prev]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      const active = items[cur];
      if (active) { const cmd = COMMANDS.find(c => c.id === active.dataset.id); if (cmd) { closeCommandPalette(); setTimeout(cmd.fn, 100); } }
    }
  });
}

function closeMobileMenu() {
  const m = qs('#mobileMenu');
  if (m) { m.hidden = true; document.body.style.overflow = ''; qs('#menuToggle')?.setAttribute('aria-expanded','false'); }
}


/* ═══════════════════════════════════════════
   5. KEYBOARD SHORTCUTS
   ═══════════════════════════════════════════ */
function initKeyboardShortcuts() {
  const sectionMap = { '1': '#identity', '2': '#work', '3': '#engineering', '4': '#lab', '5': '#opensource', '6': '#journey', '7': '#connect' };

  on(document, 'keydown', e => {
    const tag = document.activeElement.tagName;
    if (['INPUT','TEXTAREA','SELECT'].includes(tag)) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (sectionMap[e.key]) { e.preventDefault(); scrollTo(sectionMap[e.key]); }
    if (e.key === 'g' || e.key === 'G') openUrl('https://github.com/shardul-2007');
  });
}


/* ═══════════════════════════════════════════
   6. SCROLL REVEALS
   ═══════════════════════════════════════════ */
function initScrollReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });

  qsa('.reveal-item, .reveal-timeline').forEach(el => io.observe(el));
}


/* ═══════════════════════════════════════════
   7. DEVELOPER CONSTELLATION
   ═══════════════════════════════════════════ */
function initConstellation() {
  const svg    = qs('#constellationSVG');
  const lGroup = qs('#cLines', svg);
  const nGroup = qs('#cNodes', svg);
  if (!svg || !lGroup || !nGroup) return;

  /* Define connections: [fromIndex, toIndex] — indices match c-node order */
  const nodeEls = qsa('.c-node', nGroup);
  const edges   = [[0,1],[0,2],[0,3],[0,4],[1,3],[2,4],[3,5],[4,5]];

  function getPos(nodeEl) {
    const t = nodeEl.getAttribute('transform') || 'translate(0,0)';
    const m = t.match(/translate\(([^,]+),([^)]+)\)/);
    return m ? { x: parseFloat(m[1]), y: parseFloat(m[2]) } : { x: 0, y: 0 };
  }

  /* Draw lines */
  edges.forEach(([ai, bi]) => {
    const a = nodeEls[ai], b = nodeEls[bi];
    if (!a || !b) return;
    const pa = getPos(a), pb = getPos(b);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', pa.x); line.setAttribute('y1', pa.y);
    line.setAttribute('x2', pb.x); line.setAttribute('y2', pb.y);
    const len = Math.hypot(pb.x - pa.x, pb.y - pa.y);
    line.style.strokeDasharray = len;
    line.style.strokeDashoffset = len;
    lGroup.appendChild(line);
    setTimeout(() => line.classList.add('drawn'), 600 + edges.indexOf([ai, bi]) * 150);
  });

  /* Wait for boot to close then animate lines */
  setTimeout(() => {
    qsa('line', lGroup).forEach((l, i) => {
      setTimeout(() => l.classList.add('drawn'), i * 120);
    });
  }, 2000);

  /* Tooltip */
  const tooltip = qs('#cTooltip');

  nodeEls.forEach(node => {
    const href  = node.dataset.href;
    const label = node.dataset.label;
    const desc  = node.dataset.desc;

    on(node, 'click', () => href && scrollTo(href));
    on(node, 'keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); href && scrollTo(href); } });

    on(node, 'mouseenter', (ev) => {
      if (!tooltip) return;
      tooltip.hidden = false;
      qs('.c-tooltip-label', tooltip).textContent = label;
      qs('.c-tooltip-desc',  tooltip).textContent = desc;
      const wrap = qs('.constellation-wrap');
      const wRect = wrap.getBoundingClientRect();
      const nRect = node.getBoundingClientRect();
      tooltip.style.left = (nRect.left - wRect.left + nRect.width / 2 - tooltip.offsetWidth / 2) + 'px';
      tooltip.style.top  = (nRect.top  - wRect.top  - tooltip.offsetHeight - 10) + 'px';
    });

    on(node, 'mouseleave', () => { if (tooltip) tooltip.hidden = true; });
    on(node, 'focus', (ev) => {
      if (!tooltip) return;
      tooltip.hidden = false;
      qs('.c-tooltip-label', tooltip).textContent = label;
      qs('.c-tooltip-desc',  tooltip).textContent = desc;
    });
    on(node, 'blur', () => { if (tooltip) tooltip.hidden = true; });
  });
}


/* ═══════════════════════════════════════════
   8. ENGINEERING TABS
   ═══════════════════════════════════════════ */
function initEngineeringTabs() {
  const tabs   = qsa('.eng-tab');
  const panels = qsa('.eng-panel');

  tabs.forEach(tab => {
    on(tab, 'click', () => {
      tabs.forEach(t => { t.setAttribute('aria-selected', 'false'); t.classList.remove('active'); });
      panels.forEach(p => p.classList.remove('active'));
      tab.setAttribute('aria-selected', 'true');
      tab.classList.add('active');
      const panel = qs('#' + tab.getAttribute('aria-controls'));
      if (panel) panel.classList.add('active');
    });
    on(tab, 'keydown', e => {
      const idx = tabs.indexOf(tab);
      if (e.key === 'ArrowRight') tabs[(idx + 1) % tabs.length].click();
      if (e.key === 'ArrowLeft')  tabs[(idx - 1 + tabs.length) % tabs.length].click();
    });
  });
}


/* ═══════════════════════════════════════════
   9. CIVICOS ARCHITECTURE DIAGRAM
   ═══════════════════════════════════════════ */
function initCivicOSArch() {
  /* Architecture toggle */
  const archBtn  = qs('#archToggle');
  const archDiv  = qs('#civicosArch');
  const studyBtn = qs('#studyToggle');
  const studyDiv = qs('#civicosStudy');

  function toggle(btn, div, other, otherDiv) {
    const isOpen = !div.hidden;
    div.hidden = isOpen;
    btn.setAttribute('aria-expanded', !isOpen);
    if (!isOpen && other && otherDiv && !otherDiv.hidden) {
      otherDiv.hidden = true;
      other.setAttribute('aria-expanded', 'false');
    }
    if (!isOpen) setTimeout(() => div.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  }

  on(archBtn,  'click', () => toggle(archBtn, archDiv, studyBtn, studyDiv));
  on(studyBtn, 'click', () => toggle(studyBtn, studyDiv, archBtn, archDiv));

  /* Architecture node panels */
  qsa('.arch-node[data-panel]').forEach(node => {
    const panelId = node.dataset.panel;
    on(node, 'click', () => {
      const allPanels = qsa('.arch-panel');
      const panel = qs('#' + panelId);
      const isOpen = !panel.hidden;

      allPanels.forEach(p => { p.hidden = true; });
      qsa('.arch-node').forEach(n => n.setAttribute('aria-expanded', 'false'));

      if (!isOpen) {
        panel.hidden = false;
        node.setAttribute('aria-expanded', 'true');
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
    on(node, 'keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); node.click(); } });
  });
}


/* ═══════════════════════════════════════════
   10. SHARDUL AI — FAQ SIMULATION
   ═══════════════════════════════════════════ */
const AI_KB = [
  {
    q: ['civicos', 'civic', 'flagship', 'what is civicos', 'tell me about civicos'],
    a: `CivicOS is my flagship project — an AI-powered municipal operating system. It combines interactive maps (Leaflet 1.9.4), real-time analytics (Recharts), and AI-driven intelligence to help citizens interact with municipal services.\n\nStack: React + Vite · Leaflet · Recharts · AI APIs · REST APIs\nLive at: civicos-beta.vercel.app`
  },
  {
    q: ['tech stack', 'what tech', 'technology', 'what languages', 'programming', 'tools'],
    a: `My primary tech stack includes:\n\n• Frontend: React, HTML, CSS, JavaScript\n• Build tools: Vite\n• Maps: Leaflet\n• Data viz: Recharts\n• Languages: JavaScript, Python\n• Other: REST APIs, AI APIs, Git, GitHub\n\nI'm also building problem-solving skills with DSA and scalable systems thinking.`
  },
  {
    q: ['available', 'hire', 'opportunity', 'job', 'internship', 'open to'],
    a: `Yes! I'm currently open to:\n• Software engineering internships\n• Entry-level full-stack / AI roles\n• Collaborative projects and hackathons\n• Open source contributions\n\nBest way to reach me: shardulparihar2007@gmail.com or LinkedIn at linkedin.com/in/shardul-parihar-/`
  },
  {
    q: ['open source', 'gssoc', 'girlscript', 'nsoc', 'github contributions'],
    a: `Open source work:\n\n• GirlScript Summer of Code (GSSoC) 2025 — Contributor. Collaborated through GitHub on community projects.\n• NSOC 2025 — Contributor. Participated in an open source development program.\n\nYou can see my GitHub at: github.com/shardul-2007`
  },
  {
    q: ['campus ambassador', 'google', 'internshala', 'guvi', 'physics wallah', 'remoterecruit', 'hackerrank', 'community'],
    a: `Campus Ambassador roles:\n\n• Google — Campus Ambassador (2025)\n• Internshala — Campus Ambassador (2025)\n• GUVI — Campus Ambassador (2025)\n• Physics Wallah — Campus Ambassador (2025)\n• RemoteRecruit — Student Ambassador (2026)\n• HackerRank — Campus Community (2026)\n\nAll involve student community engagement and promoting learning opportunities.`
  },
  {
    q: ['contact', 'email', 'linkedin', 'reach', 'connect', 'how to'],
    a: `Best ways to contact Shardul:\n\n📧 Email: shardulparihar2007@gmail.com\n💼 LinkedIn: linkedin.com/in/shardul-parihar-/\n🐙 GitHub: github.com/shardul-2007\n📍 Location: Pune, Maharashtra, India`
  },
  {
    q: ['about', 'who are you', 'who is shardul', 'biography', 'background'],
    a: `Shardul Parihar is a Software Developer from Pune, India building AI-powered products, full-stack systems and modern web experiences.\n\nHe's an open-source contributor, problem solver, and focused on DSA + scalable systems. Currently active as a campus ambassador for multiple organizations while building real-world projects.`
  },
  {
    q: ['portfolio', 'shardul os', 'this website', 'how is this built', 'website'],
    a: `This portfolio (SHARDUL.OS) is itself a project:\n\n• Stack: Plain HTML + CSS + JavaScript (zero framework)\n• Deployment: GitHub Pages\n• Architecture: 16 named JS modules, CSS custom property design system\n• Features: Boot sequence, command palette, developer constellation, AI FAQ, GitHub integration\n\nSource: github.com/shardul-2007/my-portfolio`
  },
  {
    q: ['react', 'vite', 'leaflet', 'recharts', 'why'],
    a: `Technology decisions for CivicOS:\n\n• React: Component-based architecture for complex civic UI. Fast iteration.\n• Vite: Near-instant HMR, optimized builds. Much faster than CRA.\n• Leaflet: Lightweight (~42KB), no API key needed. Better fit than Google Maps for this use case.\n• Recharts: Native React charting, no DOM conflicts, declarative composition.\n\nAll chosen for specific reasons, not just popularity.`
  },
  {
    q: ['location', 'pune', 'india', 'where are you'],
    a: `Shardul is based in Pune, Maharashtra, India. He's open to both remote and in-person opportunities.`
  },
];

function matchAI(q) {
  const lower = q.toLowerCase().trim();
  let best = null, bestScore = 0;
  AI_KB.forEach(entry => {
    entry.q.forEach(kw => {
      if (lower.includes(kw) && kw.length > bestScore) {
        best = entry; bestScore = kw.length;
      }
    });
  });
  return best;
}

function addAIMessage(role, text) {
  const chat = qs('#aiChat');
  if (!chat) return;
  const div = document.createElement('div');
  div.className = `ai-msg ai-msg-${role}`;
  const sender = document.createElement('span');
  sender.className = 'ai-sender';
  sender.textContent = role === 'user' ? 'YOU' : 'SHARDUL.AI';
  const p = document.createElement('p');
  p.style.whiteSpace = 'pre-line';
  p.textContent = text;
  div.appendChild(sender);
  div.appendChild(p);
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function addTypingIndicator() {
  const chat = qs('#aiChat');
  if (!chat) return null;
  const div = document.createElement('div');
  div.className = 'ai-msg ai-typing';
  div.innerHTML = '<span class="ai-sender">SHARDUL.AI</span><p>…</p>';
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  return div;
}

function initShardulAI() {
  const input  = qs('#aiInput');
  const send   = qs('#aiSend');
  const sugs   = qsa('.ai-sug');

  function sendMessage(q) {
    if (!q.trim()) return;
    addAIMessage('user', q);
    if (input) input.value = '';
    const typing = addTypingIndicator();
    setTimeout(() => {
      rm(typing);
      const match = matchAI(q);
      if (match) {
        addAIMessage('ai', match.a);
      } else {
        addAIMessage('ai', `I can only answer questions about Shardul's projects, skills, and experience — and I don't have a good answer for "${q}" yet.\n\nTry asking about: CivicOS, tech stack, availability, open source work, campus ambassador roles, or how to contact Shardul.`);
      }
    }, 800 + Math.random() * 400);
  }

  on(send, 'click', () => input && sendMessage(input.value));
  on(input, 'keydown', e => { if (e.key === 'Enter') { e.preventDefault(); sendMessage(input.value); } });
  sugs.forEach(s => on(s, 'click', () => sendMessage(s.dataset.q)));
}


/* ═══════════════════════════════════════════
   11. GITHUB EXPLORER
   ═══════════════════════════════════════════ */
function initGitHub() {
  const content     = qs('#ghExplorerContent');
  const badge       = qs('#ghBadge');
  const reposGrid   = qs('#ghReposGrid');
  const ghStatusDot = qs('#ghStatusDot');
  const ghStatusVal = qs('#ghStatusVal');

  const GH_USER = 'shardul-2007';

  async function fetchGH() {
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GH_USER}`, { headers: { Accept: 'application/vnd.github.v3+json' } }),
        fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=6&type=public`, { headers: { Accept: 'application/vnd.github.v3+json' } })
      ]);

      if (!userRes.ok) throw new Error('GitHub API error');
      const user  = await userRes.json();
      const repos = await reposRes.json();

      /* Update status */
      if (badge) { badge.textContent = 'CONNECTED'; badge.className = 'lab-badge badge-green'; }
      if (ghStatusDot) { ghStatusDot.classList.add('live', 'pulse'); }
      if (ghStatusVal) ghStatusVal.textContent = 'CONNECTED';

      /* Render explorer */
      if (content) {
        content.innerHTML = `
          <div class="gh-user-card">
            <img src="${user.avatar_url}&s=96" alt="${user.login}" class="gh-avatar" width="48" height="48" loading="lazy">
            <div>
              <div class="gh-user-name">${user.name || user.login}</div>
              <div class="gh-user-bio">${user.bio || 'Software Developer'}</div>
            </div>
          </div>
          <div class="gh-stats-row">
            <div class="gh-stat"><span class="gh-stat-val">${user.public_repos}</span><span class="gh-stat-label">REPOS</span></div>
            <div class="gh-stat"><span class="gh-stat-val">${user.followers}</span><span class="gh-stat-label">FOLLOWERS</span></div>
            <div class="gh-stat"><span class="gh-stat-val">${user.following}</span><span class="gh-stat-label">FOLLOWING</span></div>
          </div>
          <div class="gh-repos-list">
            ${repos.filter(r => !r.fork).slice(0,4).map(r => `
              <a href="${r.html_url}" target="_blank" rel="noopener noreferrer" class="gh-repo">
                <div class="gh-repo-name">
                  <i class="fab fa-github" style="margin-right:6px;font-size:.8rem;opacity:.5"></i>${r.name}
                </div>
                ${r.description ? `<div class="gh-repo-desc">${r.description}</div>` : ''}
                <div class="gh-repo-meta">
                  ${r.language ? `<span class="gh-lang">${r.language}</span>` : ''}
                  <span>★ ${r.stargazers_count}</span>
                  <span>⑃ ${r.forks_count}</span>
                </div>
              </a>`).join('')}
          </div>`;
      }

      /* Render repos in Open Source section */
      if (reposGrid) {
        const nonFork = repos.filter(r => !r.fork);
        if (nonFork.length) {
          reposGrid.innerHTML = nonFork.slice(0,6).map(r => `
            <a href="${r.html_url}" target="_blank" rel="noopener noreferrer" class="gh-repo">
              <div class="gh-repo-name"><i class="fab fa-github" style="margin-right:6px;font-size:.8rem;opacity:.5"></i>${r.name}</div>
              ${r.description ? `<div class="gh-repo-desc">${r.description}</div>` : ''}
              <div class="gh-repo-meta">
                ${r.language ? `<span class="gh-lang">${r.language}</span>` : ''}
                <span>★ ${r.stargazers_count}</span>
              </div>
            </a>`).join('');
        } else {
          reposGrid.innerHTML = '<p class="gh-error"><i class="fab fa-github"></i>No public repositories found.</p>';
        }
      }

    } catch (err) {
      if (badge) { badge.textContent = 'OFFLINE'; badge.className = 'lab-badge badge-red'; }
      if (ghStatusDot) { ghStatusDot.style.background = '#ef4444'; }
      if (ghStatusVal) ghStatusVal.textContent = 'UNAVAILABLE';
      if (content) {
        content.innerHTML = `<div class="gh-error">
          <i class="fab fa-github"></i>
          <p>GitHub data temporarily unavailable.</p>
          <a href="https://github.com/${GH_USER}" target="_blank" rel="noopener noreferrer" class="os-link" style="display:inline-flex;margin-top:8px">
            <i class="fab fa-github"></i> View on GitHub directly
          </a></div>`;
      }
      if (reposGrid) {
        reposGrid.innerHTML = `<div class="lab-loading">
          <i class="fab fa-github" style="font-size:1.2rem;color:var(--text-sub)"></i>
          <span>GitHub data unavailable — <a href="https://github.com/${GH_USER}" target="_blank" rel="noopener noreferrer" style="color:var(--accent)">view profile directly</a></span></div>`;
      }
    }
  }

  fetchGH();
}


/* ═══════════════════════════════════════════
   12. TOKEN LAB
   ═══════════════════════════════════════════ */
function initTokenLab() {
  const hueSlider = qs('#hueSlider');
  const satSlider = qs('#satSlider');
  const hueVal    = qs('#hueVal');
  const satVal    = qs('#satVal');
  const swatch    = qs('#tpSwatch');
  const resetBtn  = qs('#tokenReset');
  const DEFAULT_HUE = 168, DEFAULT_SAT = 100;

  function updateAccent(hue, sat) {
    const accent = `hsl(${hue}, ${sat}%, 50%)`;
    const accentDark = `hsl(${hue}, ${sat}%, 42%)`;
    const root = document.documentElement;
    root.style.setProperty('--accent', accent);
    root.style.setProperty('--accent-dim', `hsla(${hue}, ${sat}%, 50%, 0.12)`);
    root.style.setProperty('--accent-glow', `hsla(${hue}, ${sat}%, 50%, 0.20)`);
    root.style.setProperty('--border-accent', `hsla(${hue}, ${sat}%, 50%, 0.25)`);
    if (hueVal) hueVal.textContent = hue + '°';
    if (satVal) satVal.textContent = sat + '%';
    if (swatch) swatch.style.background = accent;
  }

  function resetToDefault() {
    const root = document.documentElement;
    root.style.removeProperty('--accent');
    root.style.removeProperty('--accent-dim');
    root.style.removeProperty('--accent-glow');
    root.style.removeProperty('--border-accent');
    if (hueSlider) hueSlider.value = DEFAULT_HUE;
    if (satSlider) satSlider.value = DEFAULT_SAT;
    if (hueVal) hueVal.textContent = DEFAULT_HUE + '°';
    if (satVal) satVal.textContent = DEFAULT_SAT + '%';
    if (swatch) swatch.style.background = '';
  }

  on(hueSlider, 'input', () => updateAccent(hueSlider.value, satSlider.value));
  on(satSlider, 'input', () => updateAccent(hueSlider.value, satSlider.value));
  on(resetBtn,  'click', resetToDefault);

  /* Init swatch */
  if (swatch) swatch.style.background = `hsl(${DEFAULT_HUE}, ${DEFAULT_SAT}%, 50%)`;
}


/* ═══════════════════════════════════════════
   13. CONTACT FLOW
   ═══════════════════════════════════════════ */
function initContactFlow() {
  const intentBtns  = qsa('.intent-btn');
  const messages    = qsa('.ic-msg');
  const form        = qs('#connectForm');
  const statusEl    = qs('#connectStatus');

  intentBtns.forEach(btn => {
    on(btn, 'click', () => {
      intentBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const intent = btn.dataset.intent;
      messages.forEach(m => { m.classList.toggle('active', m.dataset.intent === intent); });
    });
  });

  on(form, 'submit', async e => {
    e.preventDefault();
    const name  = qs('#cfName').value.trim();
    const email = qs('#cfEmail').value.trim();
    const msg   = qs('#cfMsg').value.trim();
    const intent = qs('.intent-btn.active')?.dataset.intent || 'other';

    /* Validate */
    let valid = true;
    [['#cfName', name], ['#cfEmail', email], ['#cfMsg', msg]].forEach(([id, val]) => {
      const el = qs(id);
      el.classList.toggle('error', !val);
      if (!val) valid = false;
    });
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      qs('#cfEmail').classList.add('error');
      valid = false;
    }
    if (!valid) { statusEl.textContent = 'Please fill in all required fields correctly.'; statusEl.className = 'form-status error'; return; }

    /* Show loading */
    const submitBtn = form.querySelector('.connect-submit-btn');
    qs('.submit-label', submitBtn).textContent = 'Sending…';
    submitBtn.disabled = true;
    statusEl.textContent = '';

    /* Send via mailto as fallback (no backend) */
    const body  = encodeURIComponent(`Name: ${name}\nIntent: ${intent}\n\n${msg}`);
    const mailto = `mailto:shardulparihar2007@gmail.com?subject=Portfolio%20Contact%20[${intent}]%20from%20${encodeURIComponent(name)}&body=${body}`;
    window.location.href = mailto;

    setTimeout(() => {
      qs('.submit-label', submitBtn).textContent = 'Send Message';
      submitBtn.disabled = false;
      statusEl.textContent = 'Your email client should open with a pre-filled message. Alternatively email shardulparihar2007@gmail.com directly.';
      statusEl.className = 'form-status success';
    }, 1200);
  });
}


/* ═══════════════════════════════════════════
   14. VIEW MODE
   ═══════════════════════════════════════════ */
let currentViewMode = 'default';

function setViewMode(mode) {
  currentViewMode = mode;
  document.body.setAttribute('data-view', mode);
  const banner = qs('#viewBanner');
  const bannerText = qs('#viewBannerText');

  if (mode === 'default') {
    if (banner) banner.hidden = true;
    qsa('.vm-opt').forEach(o => o.classList.toggle('active', o.dataset.mode === 'default'));
  } else {
    const labels = { recruiter: 'VIEWING AS RECRUITER', developer: 'VIEWING AS DEVELOPER', collaborator: 'VIEWING AS COLLABORATOR' };
    if (banner) { banner.hidden = false; if (bannerText) bannerText.textContent = labels[mode] || mode.toUpperCase(); }
    qsa('.vm-opt').forEach(o => o.classList.toggle('active', o.dataset.mode === mode));
  }
  closeViewModal();
}

function openViewModal() {
  const modal = qs('#viewModeModal');
  if (!modal) return;
  modal.hidden = false;
  qs('.vm-opt', modal)?.focus();
}

function closeViewModal() {
  const modal = qs('#viewModeModal');
  if (modal) modal.hidden = true;
}

function initViewMode() {
  const trigger   = qs('#viewModeToggle');
  const modal     = qs('#viewModeModal');
  const backdrop  = qs('#vmBackdrop');
  const closeBtn  = qs('#vmClose');
  const bannerReset = qs('#viewBannerReset');

  on(trigger,     'click', openViewModal);
  on(closeBtn,    'click', closeViewModal);
  on(backdrop,    'click', closeViewModal);
  on(bannerReset, 'click', () => setViewMode('default'));

  qsa('.vm-opt', modal).forEach(opt => {
    on(opt, 'click', () => setViewMode(opt.dataset.mode));
  });
}


/* ═══════════════════════════════════════════
   15. WORD ROTATOR
   ═══════════════════════════════════════════ */
function initWordRotator() {
  if (reduced()) return;
  const words = qsa('.id-word');
  if (!words.length) return;
  let cur = 0;
  setInterval(() => {
    words[cur].classList.remove('active');
    cur = (cur + 1) % words.length;
    words[cur].classList.add('active');
  }, 2800);
}


/* ═══════════════════════════════════════════
   16. CANVAS PARTICLES — Subtle background dots
   ═══════════════════════════════════════════ */
function initCanvas() {
  if (reduced()) return;
  const canvas = qs('#idCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, dots = [], raf;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function init() {
    dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const col = isDark ? 'rgba(0,212,170,' : 'rgba(0,122,99,';
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
      if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = col + (Math.random() * 0.15 + 0.05) + ')';
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  }

  /* Only run when visible */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { if (!raf) { resize(); init(); draw(); } }
      else { if (raf) { cancelAnimationFrame(raf); raf = null; } }
    });
  });
  io.observe(canvas.parentElement);

  on(window, 'resize', () => { resize(); init(); }, { passive: true });
}


/* ═══════════════════════════════════════════
   BOOT — run immediately
   ═══════════════════════════════════════════ */
initBoot();

/* ═══════════════════════════════════════════
   DOMCONTENTLOADED — run everything else
   ═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNav();
  initCommandPalette();
  initKeyboardShortcuts();
  initScrollReveal();
  initConstellation();
  initEngineeringTabs();
  initCivicOSArch();
  initShardulAI();
  initGitHub();
  initTokenLab();
  initContactFlow();
  initViewMode();
  initWordRotator();
  initCanvas();
});
