/**
 * SHARDUL.OS v4 — JavaScript
 * 20 named init() modules. PORTFOLIO_DATA for all structured content.
 * Zero framework. Zero external JS dependencies.
 */

'use strict';

/* ── Utilities ── */
const qs  = (s, ctx = document) => ctx.querySelector(s);
const qsa = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const on  = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);
const rm  = (el) => el && el.remove();
const reduced = () => window.matchMedia('(prefers-reduced-motion:reduce)').matches;

/* Apply saved theme + power before any paint (also done inline in head, but belt+suspenders) */
(function () {
  const t = localStorage.getItem('sos-theme');
  if (t) document.documentElement.setAttribute('data-theme', t);
  const p = localStorage.getItem('sos-power');
  if (p === 'low') document.documentElement.setAttribute('data-power', 'low');
})();


/* ═══════════════════════════════════════════════════
   PORTFOLIO DATA — Single source of truth for all content.
   Edit here; UI renders from this object.
   ═══════════════════════════════════════════════════ */
const PORTFOLIO_DATA = {

  buildLog: [
    {
      date: '2026-09-16',
      title: 'SHARDUL.OS v4 — Complete production rebuild',
      tags: ['portfolio', 'architecture', 'ux'],
      what: 'Full rebuild of portfolio as a developer OS. Added Build Log, Achievements, API Explorer, Performance Monitor, mobile constellation list, Low Power mode, and JSON-LD structured data.',
      learned: 'Separating content (PORTFOLIO_DATA) from structure (HTML) makes future updates painless. CSS custom properties are a complete design system on their own.',
      next: 'Add more lab experiments. Write more build log entries.',
    },
    {
      date: '2026-09-15',
      title: 'Command palette with fuzzy search',
      tags: ['ux', 'keyboard', 'accessibility'],
      what: 'Built a full command palette (⌘K / /) with 17 commands, fuzzy search, keyboard navigation (↑↓ Enter Escape), and accessible ARIA dialog.',
      learned: 'Fuzzy matching without a library is straightforward: check string includes first, then sequential character matching. Arrow key navigation requires tracking active index and scrolling into view.',
      next: 'Add recently-used commands memory via localStorage.',
    },
    {
      date: '2026-09-15',
      title: 'Electric cyan design system',
      tags: ['design', 'css', 'tokens'],
      what: 'Built a complete design token system using CSS custom properties. Dark + light themes. One accent color (#00d4aa) applied consistently through the entire UI. Token Lab experiment lets visitors live-edit the accent color.',
      learned: 'CSS custom properties on :root + a [data-theme="light"] override is the most maintainable approach for theming — no JavaScript class toggling needed for colors.',
      next: 'Add more token categories to the lab (spacing, radius, typography scale).',
    },
    {
      date: '2026-09-15',
      title: 'CivicOS — Interactive architecture diagram',
      tags: ['civicos', 'ux', 'react'],
      what: 'Added clickable architecture nodes in the CivicOS case study. Each layer expands to explain what it does, why it was chosen, and how it fits. Tech choices justified without generic copy.',
      learned: 'Hidden/shown panels with aria-expanded + hidden attribute is more accessible than CSS display toggling. Screen readers announce state changes correctly.',
      next: 'Add a full process diagram (Problem → Research → Architecture → Implementation → Result).',
    },
    {
      date: '2026-09-15',
      title: 'Developer Constellation SVG',
      tags: ['svg', 'animation', 'interaction'],
      what: 'Built an animated SVG constellation showing developer identity nodes (CIVICOS, AI, FULL STACK, WEB, OPEN SOURCE, COMMUNITY). Lines animate in on load. Hover shows tooltip. Click navigates to section.',
      learned: 'SVG stroke-dasharray + stroke-dashoffset is the cleanest way to animate line drawing. IntersectionObserver for trigger avoids scroll listener overhead.',
      next: 'Add a mobile-first touch-friendly list alternative (done in v4).',
    },
  ],

  achievements: [
    {
      cat: 'OPEN SOURCE',
      name: 'GirlScript Summer of Code',
      detail: 'Contributor. Collaborated on community projects via GitHub under the GSSoC program.',
      year: '2025',
      proof: 'images/gssoc.jpg',
    },
    {
      cat: 'OPEN SOURCE',
      name: 'NSOC',
      detail: 'Contributor. Participated in open source development program.',
      year: '2025',
      proof: 'images/nsoc.jpg',
    },
    {
      cat: 'COMMUNITY',
      name: 'Google Campus Ambassador',
      detail: 'Student community initiatives, promoting technology and learning opportunities.',
      year: '2025',
      proof: 'images/google-offer.jpg',
    },
    {
      cat: 'COMMUNITY',
      name: 'Internshala Campus Ambassador',
      detail: 'Promoting internships and career programs to students.',
      year: '2025',
      proof: 'images/internshala.jpg',
    },
    {
      cat: 'COMMUNITY',
      name: 'GUVI Campus Ambassador',
      detail: 'Student engagement and technology skill-development initiatives.',
      year: '2025',
      proof: 'images/guvi.jpg',
    },
    {
      cat: 'COMMUNITY',
      name: 'Physics Wallah Campus Ambassador',
      detail: 'Student community activities and educational opportunity promotion.',
      year: '2025',
      proof: 'images/physics-wallah.jpg',
    },
    {
      cat: 'COMMUNITY',
      name: 'RemoteRecruit Student Ambassador',
      detail: 'Selected as Student Ambassador in a student-focused technology community.',
      year: '2026',
      proof: 'images/remote-recruit.jpg',
    },
    {
      cat: 'COMMUNITY',
      name: 'HackerRank Campus Community',
      detail: 'Student community engagement, contests and developer activities.',
      year: '2026',
      proof: 'images/hackerrank.jpg',
    },
  ],

};


/* ═══════════════════════════════════════════════════
   1. BOOT SEQUENCE
   ═══════════════════════════════════════════════════ */
function initBoot() {
  const boot = qs('#boot');
  if (!boot) return;

  const alreadyBooted = localStorage.getItem('sos-booted');
  const enter = qs('#bootEnter');
  const skip  = qs('#bootSkip');

  function closeBoot() {
    boot.classList.add('boot-out');
    localStorage.setItem('sos-booted', '1');
    setTimeout(() => { boot.style.display = 'none'; }, 520);
  }

  if (alreadyBooted || reduced()) {
    boot.style.display = 'none';
    return;
  }

  const lines = qsa('.boot-line', boot);
  lines.forEach(l => {
    const delay = parseInt(l.dataset.delay, 10) || 0;
    setTimeout(() => l.classList.add('visible'), delay);
  });

  const lastDelay = lines.reduce((m, l) => Math.max(m, parseInt(l.dataset.delay, 10) || 0), 0);
  setTimeout(() => {
    enter && enter.classList.add('visible');
    skip  && skip.classList.add('visible');
    enter && enter.focus();
  }, lastDelay + 350);

  on(enter, 'click', closeBoot);
  on(skip,  'click', closeBoot);
  on(boot, 'keydown', e => { if (e.key === 'Enter' || e.key === ' ') closeBoot(); });
}


/* ═══════════════════════════════════════════════════
   2. THEME TOGGLE
   ═══════════════════════════════════════════════════ */
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

  const cur = document.documentElement.getAttribute('data-theme') || 'dark';
  btn.setAttribute('aria-label', cur === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
}


/* ═══════════════════════════════════════════════════
   3. LOW POWER MODE
   ═══════════════════════════════════════════════════ */
function initLowPowerMode() {
  const btn   = qs('#lowPowerToggle');
  const label = qs('#lowPowerLabel');
  if (!btn) return;

  let on_ = localStorage.getItem('sos-power') === 'low';

  function apply() {
    document.documentElement.setAttribute('data-power', on_ ? 'low' : '');
    localStorage.setItem('sos-power', on_ ? 'low' : '');
    btn.classList.toggle('active', on_);
    if (label) label.textContent = on_ ? 'POWER ON' : 'LOW POWER';
    btn.setAttribute('aria-label', on_ ? 'Disable low power mode' : 'Enable low power mode — pauses animations');
  }

  on(btn, 'click', () => { on_ = !on_; apply(); });
  apply();
}


/* ═══════════════════════════════════════════════════
   4. NAV — scrollspy + mobile menu + scroll progress
   ═══════════════════════════════════════════════════ */
function initNav() {
  const header    = qs('#header');
  const navLinks  = qsa('.nav-link');
  const toggle    = qs('#menuToggle');
  const mMenu     = qs('#mobileMenu');
  const mClose    = qs('#mobileClose');
  const mLinks    = qsa('.mm-link');
  const mmCmd     = qs('#mmCmdBtn');
  const progress  = qs('#scrollProgress');
  const topBtn    = qs('#topBtn');

  on(window, 'scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max ? window.scrollY / max : 0;
    if (progress) progress.style.transform = `scaleX(${pct})`;
    if (header)   header.classList.toggle('scrolled', window.scrollY > 20);
    if (topBtn)   topBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  const sections = qsa('section[id]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = navLinks.find(l => l.dataset.section === e.target.id);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => io.observe(s));

  /* Mobile menu */
  function openMenu()  { mMenu.hidden = false; toggle.setAttribute('aria-expanded','true'); document.body.style.overflow = 'hidden'; qs('#mobileClose')?.focus(); }
  function closeMenu() { mMenu.hidden = true;  toggle.setAttribute('aria-expanded','false'); document.body.style.overflow = ''; toggle.focus(); }

  on(toggle, 'click', openMenu);
  on(mClose, 'click', closeMenu);
  mLinks.forEach(l => on(l, 'click', closeMenu));
  on(mmCmd,  'click', () => { closeMenu(); openCommandPalette(); });

  /* Smooth scroll */
  on(document, 'click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = qs(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    closeMenu();
  });

  on(topBtn, 'click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}


/* ═══════════════════════════════════════════════════
   5. COMMAND PALETTE
   ═══════════════════════════════════════════════════ */
let cmdOpen = false;

const COMMANDS = [
  { id:'civicos',      icon:'fa-diagram-project',          label:'Open CivicOS',          desc:'View flagship project case study',      fn: () => { scrollToId('#work'); openCivicOS(); } },
  { id:'work',         icon:'fa-briefcase',                label:'View Projects',          desc:'Navigate to Work section',              fn: () => scrollToId('#work') },
  { id:'engineering',  icon:'fa-code',                     label:'Engineering Notes',      desc:'Architecture and tech decisions',        fn: () => scrollToId('#engineering') },
  { id:'buildlog',     icon:'fa-terminal',                 label:'Build Log',              desc:'Dev journal — what was built',          fn: () => { scrollToId('#engineering'); openEngTab('et-buildlog'); } },
  { id:'lab',          icon:'fa-flask',                    label:'Open Lab',               desc:'Experiments and interactive demos',      fn: () => scrollToId('#lab') },
  { id:'api-exp',      icon:'fa-plug',                     label:'API Explorer',           desc:'Fire real HTTP requests in the browser', fn: () => { scrollToId('#lab'); setTimeout(() => qs('#labAPI')?.scrollIntoView({ behavior:'smooth', block:'center' }), 600); } },
  { id:'opensource',   icon:'fa-code-branch',              label:'Open Source',            desc:'GSSoC, NSOC and GitHub work',           fn: () => scrollToId('#opensource') },
  { id:'journey',      icon:'fa-map',                      label:'Developer Journey',      desc:'Milestones and campus community',        fn: () => scrollToId('#journey') },
  { id:'achievements', icon:'fa-trophy',                   label:'Achievements',           desc:'Programs and community roles',           fn: () => { scrollToId('#journey'); setTimeout(() => qs('#achGrid')?.scrollIntoView({ behavior:'smooth', block:'center' }), 600); } },
  { id:'connect',      icon:'fa-envelope',                 label:'Contact Shardul',        desc:'Start a conversation',                  fn: () => scrollToId('#connect') },
  { id:'github',       icon:'fab fa-github',               label:'Open GitHub',            desc:'github.com/shardul-2007',               fn: () => openUrl('https://github.com/shardul-2007') },
  { id:'linkedin',     icon:'fab fa-linkedin',             label:'Open LinkedIn',          desc:'linkedin.com/in/shardul-parihar-/',      fn: () => openUrl('https://www.linkedin.com/in/shardul-parihar-/') },
  { id:'civicoslive',  icon:'fa-arrow-up-right-from-square',label:'Open CivicOS Live',     desc:'civicos-beta.vercel.app',               fn: () => openUrl('https://civicos-beta.vercel.app/') },
  { id:'ai',           icon:'fa-robot',                    label:'Ask Shardul AI',         desc:'Questions about projects and skills',   fn: () => { scrollToId('#lab'); setTimeout(() => qs('#aiInput')?.focus(), 700); } },
  { id:'theme',        icon:'fa-moon',                     label:'Toggle Theme',           desc:'Switch dark / light mode',              fn: () => qs('#themeToggle')?.click() },
  { id:'power',        icon:'fa-bolt',                     label:'Toggle Low Power',       desc:'Pause heavy animations',               fn: () => qs('#lowPowerToggle')?.click() },
  { id:'source',       icon:'fab fa-github',               label:'View Source',            desc:'github.com/shardul-2007/my-portfolio', fn: () => openUrl('https://github.com/shardul-2007/my-portfolio') },
  { id:'recruiter',    icon:'fa-briefcase',                label:'View as Recruiter',      desc:'Highlight projects and contact',        fn: () => setViewMode('recruiter') },
  { id:'developer',    icon:'fa-code',                     label:'View as Developer',      desc:'Highlight engineering and GitHub',      fn: () => setViewMode('developer') },
  { id:'collaborator', icon:'fa-handshake',                label:'View as Collaborator',   desc:'Highlight open source and community',   fn: () => setViewMode('collaborator') },
];

function scrollToId(id)  { qs(id)?.scrollIntoView({ behavior: 'smooth' }); }
function openUrl(u)       { window.open(u, '_blank', 'noopener noreferrer'); }
function openCivicOS()    { const btn = qs('#archToggle'); if (btn && btn.getAttribute('aria-expanded') !== 'true') btn.click(); }
function openEngTab(tabId) { const tab = qs('#' + tabId); if (tab) tab.click(); }

function fuzzy(str, q) {
  if (!q) return 1;
  const s = str.toLowerCase(), query = q.toLowerCase();
  if (s.includes(query)) return 2;
  let qi = 0;
  for (let i = 0; i < s.length && qi < query.length; i++) { if (s[i] === query[qi]) qi++; }
  return qi === query.length ? 1 : 0;
}

function openCommandPalette() {
  const overlay = qs('#cmdPalette');
  const input   = qs('#cmdInput');
  if (!overlay || cmdOpen) return;
  cmdOpen = true;
  overlay.hidden = false;
  renderCmdList('');
  setTimeout(() => input?.focus(), 50);
}

function closeCommandPalette() {
  const overlay = qs('#cmdPalette');
  if (!overlay || !cmdOpen) return;
  cmdOpen = false;
  overlay.hidden = true;
  const input = qs('#cmdInput');
  if (input) input.value = '';
}

function renderCmdList(query) {
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
      if (cmd) { closeCommandPalette(); setTimeout(cmd.fn, 80); }
    });
  });
}

function initCommandPalette() {
  const trigger = qs('#cmdTrigger');
  const input   = qs('#cmdInput');
  const list    = qs('#cmdList');

  on(trigger, 'click', openCommandPalette);
  on(qs('#cmdBackdrop'), 'click', closeCommandPalette);

  on(document, 'keydown', e => {
    const tag = document.activeElement.tagName;
    const inInput = ['INPUT','TEXTAREA','SELECT'].includes(tag);
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); cmdOpen ? closeCommandPalette() : openCommandPalette(); }
    if (e.key === '/' && !inInput && !cmdOpen) { e.preventDefault(); openCommandPalette(); }
    if (e.key === 'Escape') { closeCommandPalette(); closeMobileMenu(); closeViewModal(); }
  });

  on(input, 'input', () => renderCmdList(input?.value.trim() || ''));

  on(input, 'keydown', e => {
    const items = qsa('.cmd-item', list);
    const cur   = items.findIndex(i => i.classList.contains('active'));
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (cur + 1) % items.length;
      items.forEach((it, idx) => { it.classList.toggle('active', idx === next); it.setAttribute('aria-selected', idx === next); });
      items[next]?.scrollIntoView({ block:'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (cur - 1 + items.length) % items.length;
      items.forEach((it, idx) => { it.classList.toggle('active', idx === prev); it.setAttribute('aria-selected', idx === prev); });
      items[prev]?.scrollIntoView({ block:'nearest' });
    } else if (e.key === 'Enter') {
      const active = items[cur];
      if (active) { const cmd = COMMANDS.find(c => c.id === active.dataset.id); if (cmd) { closeCommandPalette(); setTimeout(cmd.fn, 80); } }
    }
  });
}

function closeMobileMenu() {
  const m = qs('#mobileMenu');
  if (m) { m.hidden = true; document.body.style.overflow = ''; qs('#menuToggle')?.setAttribute('aria-expanded','false'); }
}


/* ═══════════════════════════════════════════════════
   6. KEYBOARD SHORTCUTS
   ═══════════════════════════════════════════════════ */
function initKeyboardShortcuts() {
  const sectionMap = { '1':'#identity','2':'#work','3':'#engineering','4':'#lab','5':'#opensource','6':'#journey','7':'#connect' };
  on(document, 'keydown', e => {
    const tag = document.activeElement.tagName;
    if (['INPUT','TEXTAREA','SELECT'].includes(tag)) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (sectionMap[e.key]) { e.preventDefault(); scrollToId(sectionMap[e.key]); }
    if (e.key === 'g' || e.key === 'G') openUrl('https://github.com/shardul-2007');
  });
}


/* ═══════════════════════════════════════════════════
   7. SCROLL REVEALS
   ═══════════════════════════════════════════════════ */
function initScrollReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  qsa('.reveal-item, .reveal-timeline').forEach(el => io.observe(el));
}


/* ═══════════════════════════════════════════════════
   8. DEVELOPER CONSTELLATION
   ═══════════════════════════════════════════════════ */
function initConstellation() {
  const svg    = qs('#constellationSVG');
  const lGroup = qs('#cLines', svg);
  const nGroup = qs('#cNodes', svg);
  if (!svg || !lGroup || !nGroup) return;

  const nodeEls = qsa('.c-node', nGroup);
  const edges   = [[0,1],[0,2],[0,3],[0,4],[1,4],[2,3],[3,5],[4,5]];

  function getPos(n) {
    const t = n.getAttribute('transform') || '';
    const m = t.match(/translate\(([^,]+),([^)]+)\)/);
    return m ? { x:parseFloat(m[1]), y:parseFloat(m[2]) } : { x:0, y:0 };
  }

  edges.forEach(([ai, bi]) => {
    const a = nodeEls[ai], b = nodeEls[bi];
    if (!a || !b) return;
    const pa = getPos(a), pb = getPos(b);
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', pa.x); line.setAttribute('y1', pa.y);
    line.setAttribute('x2', pb.x); line.setAttribute('y2', pb.y);
    const len = Math.hypot(pb.x - pa.x, pb.y - pa.y);
    line.style.strokeDasharray = len;
    line.style.strokeDashoffset = len;
    lGroup.appendChild(line);
  });

  setTimeout(() => {
    qsa('line', lGroup).forEach((l, i) => setTimeout(() => l.classList.add('drawn'), i * 120));
  }, 1600);

  const tooltip = qs('#cTooltip');

  nodeEls.forEach(node => {
    const href  = node.dataset.href;
    const label = node.dataset.label;
    const desc  = node.dataset.desc;

    on(node, 'click', () => href && scrollToId(href));
    on(node, 'keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); href && scrollToId(href); } });

    on(node, 'mouseenter', () => {
      if (!tooltip) return;
      tooltip.hidden = false;
      qs('.c-tooltip-label', tooltip).textContent = label;
      qs('.c-tooltip-desc', tooltip).textContent  = desc;
      const wrap  = qs('.constellation-wrap');
      const wRect = wrap.getBoundingClientRect();
      const nRect = node.getBoundingClientRect();
      tooltip.style.left = (nRect.left - wRect.left + nRect.width / 2 - tooltip.offsetWidth / 2) + 'px';
      tooltip.style.top  = (nRect.top  - wRect.top  - tooltip.offsetHeight - 10) + 'px';
    });
    on(node, 'mouseleave', () => { if (tooltip) tooltip.hidden = true; });
    on(node, 'focus', () => { if (tooltip) { tooltip.hidden = false; qs('.c-tooltip-label', tooltip).textContent = label; qs('.c-tooltip-desc', tooltip).textContent = desc; } });
    on(node, 'blur',  () => { if (tooltip) tooltip.hidden = true; });
  });
}


/* ═══════════════════════════════════════════════════
   9. ENGINEERING TABS
   ═══════════════════════════════════════════════════ */
function initEngineeringTabs() {
  const tabs   = qsa('.eng-tab');
  const panels = qsa('.eng-panel');

  tabs.forEach(tab => {
    on(tab, 'click', () => {
      tabs.forEach(t => { t.setAttribute('aria-selected','false'); t.classList.remove('active'); });
      panels.forEach(p => p.classList.remove('active'));
      tab.setAttribute('aria-selected','true');
      tab.classList.add('active');
      const panel = qs('#' + tab.getAttribute('aria-controls'));
      if (panel) panel.classList.add('active');
    });
    on(tab, 'keydown', e => {
      const idx = tabs.indexOf(tab);
      if (e.key === 'ArrowRight') tabs[(idx + 1) % tabs.length]?.click();
      if (e.key === 'ArrowLeft')  tabs[(idx - 1 + tabs.length) % tabs.length]?.click();
    });
  });
}


/* ═══════════════════════════════════════════════════
   10. BUILD LOG
   ═══════════════════════════════════════════════════ */
function initBuildLog() {
  const container = qs('#buildLogEntries');
  if (!container) return;

  const entries = PORTFOLIO_DATA.buildLog || [];
  if (!entries.length) {
    container.innerHTML = '<p class="bl-desc">No entries yet. Add them to <code>PORTFOLIO_DATA.buildLog</code> in script.js.</p>';
    return;
  }

  container.innerHTML = entries.map(e => `
    <div class="bl-entry">
      <div class="bl-entry-header">
        <span class="bl-date">${e.date}</span>
        <span class="bl-title">${e.title}</span>
        <div class="bl-tags">${(e.tags || []).map(t => `<span class="bl-tag">${t}</span>`).join('')}</div>
      </div>
      <div class="bl-sections">
        ${e.what   ? `<div class="bl-section"><span class="bl-section-label">BUILT</span><p>${e.what}</p></div>` : ''}
        ${e.learned? `<div class="bl-section"><span class="bl-section-label">LEARNED</span><p>${e.learned}</p></div>` : ''}
        ${e.next   ? `<div class="bl-section"><span class="bl-section-label">NEXT</span><p>${e.next}</p></div>` : ''}
      </div>
    </div>`).join('');
}


/* ═══════════════════════════════════════════════════
   11. ACHIEVEMENTS
   ═══════════════════════════════════════════════════ */
function initAchievements() {
  const grid = qs('#achGrid');
  if (!grid) return;

  const items = PORTFOLIO_DATA.achievements || [];
  if (!items.length) {
    grid.innerHTML = '<p style="color:var(--text-sub);font-size:.875rem">No achievements listed yet.</p>';
    return;
  }

  grid.innerHTML = items.map(a => `
    <div class="ach-card reveal-item">
      <span class="ach-cat">${a.cat}</span>
      <span class="ach-name">${a.name}</span>
      <p class="ach-detail">${a.detail}</p>
      <span class="ach-year">${a.year}</span>
      ${a.proof ? `<a href="${a.proof}" target="_blank" rel="noopener noreferrer" class="ach-proof"><i class="fa-solid fa-file" aria-hidden="true"></i> View Proof</a>` : ''}
    </div>`).join('');

  /* Re-trigger reveal observer for new elements */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  qsa('.ach-card', grid).forEach(el => io.observe(el));
}


/* ═══════════════════════════════════════════════════
   12. CIVICOS ARCHITECTURE DIAGRAM
   ═══════════════════════════════════════════════════ */
function initCivicOSArch() {
  const archBtn  = qs('#archToggle');
  const archDiv  = qs('#civicosArch');
  const studyBtn = qs('#studyToggle');
  const studyDiv = qs('#civicosStudy');

  function toggle(btn, div, otherBtn, otherDiv) {
    const isOpen = !div.hidden;
    div.hidden = isOpen;
    btn.setAttribute('aria-expanded', !isOpen);
    if (!isOpen && otherBtn && otherDiv && !otherDiv.hidden) {
      otherDiv.hidden = true;
      otherBtn.setAttribute('aria-expanded','false');
    }
    if (!isOpen) setTimeout(() => div.scrollIntoView({ behavior:'smooth', block:'nearest' }), 50);
  }

  on(archBtn,  'click', () => toggle(archBtn, archDiv, studyBtn, studyDiv));
  on(studyBtn, 'click', () => toggle(studyBtn, studyDiv, archBtn, archDiv));

  qsa('.arch-node[data-panel]').forEach(node => {
    const panelId = node.dataset.panel;
    on(node, 'click', () => {
      const allPanels = qsa('.arch-panel');
      const panel = qs('#' + panelId);
      if (!panel) return;
      const isOpen = !panel.hidden;
      allPanels.forEach(p => { p.hidden = true; });
      qsa('.arch-node').forEach(n => n.setAttribute('aria-expanded','false'));
      if (!isOpen) {
        panel.hidden = false;
        node.setAttribute('aria-expanded','true');
        panel.scrollIntoView({ behavior:'smooth', block:'nearest' });
      }
    });
    on(node, 'keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); node.click(); } });
  });
}


/* ═══════════════════════════════════════════════════
   13. SHARDUL AI — FAQ SIMULATION
   ═══════════════════════════════════════════════════ */
const AI_KB = [
  { q:['civicos','civic','flagship','what is civicos','tell me about civicos'],
    a:`CivicOS is my flagship project — an AI-powered municipal operating system. It combines interactive maps (Leaflet 1.9.4), real-time analytics (Recharts), and AI-driven intelligence to help citizens interact with municipal services.\n\nStack: React + Vite · Leaflet · Recharts · AI APIs · REST APIs\nLive: civicos-beta.vercel.app` },
  { q:['tech stack','what tech','technology','what languages','programming','tools'],
    a:`My primary tech stack:\n\n• Frontend: React, HTML, CSS, JavaScript\n• Build tools: Vite\n• Maps: Leaflet\n• Data viz: Recharts\n• Languages: JavaScript, Python\n• Other: REST APIs, AI APIs, Git, GitHub\n\nFocused on DSA + scalable systems thinking.` },
  { q:['available','hire','opportunity','job','internship','open to'],
    a:`Yes — I'm open to:\n• Software engineering internships\n• Entry-level full-stack / AI roles\n• Hackathons and collaborations\n• Open source contributions\n\nBest way: shardulparihar2007@gmail.com or LinkedIn at linkedin.com/in/shardul-parihar-/` },
  { q:['open source','gssoc','girlscript','nsoc'],
    a:`Open source:\n\n• GirlScript Summer of Code (GSSoC) 2025 — Contributor\n• NSOC 2025 — Contributor\n\nGitHub: github.com/shardul-2007` },
  { q:['campus ambassador','google','internshala','guvi','physics wallah','remoterecruit','hackerrank','community'],
    a:`Campus Ambassador roles:\n\n• Google — Campus Ambassador (2025)\n• Internshala — Campus Ambassador (2025)\n• GUVI — Campus Ambassador (2025)\n• Physics Wallah — Campus Ambassador (2025)\n• RemoteRecruit — Student Ambassador (2026)\n• HackerRank — Campus Community (2026)` },
  { q:['contact','email','linkedin','reach','connect'],
    a:`Contact Shardul:\n\n📧 shardulparihar2007@gmail.com\n💼 linkedin.com/in/shardul-parihar-/\n🐙 github.com/shardul-2007\n📍 Pune, Maharashtra, India` },
  { q:['about','who are you','who is shardul','biography','background'],
    a:`Shardul Parihar is a Software Developer from Pune, India building AI-powered products, full-stack systems and modern web experiences. Open-source contributor, problem solver, focused on DSA + scalable systems.` },
  { q:['portfolio','shardul os','this website','how is this built'],
    a:`SHARDUL.OS is built with plain HTML + CSS + JavaScript — zero framework. Deployed on GitHub Pages. Architecture: PORTFOLIO_DATA object for all content, 20 named init() modules, CSS custom property design system.\n\nSource: github.com/shardul-2007/my-portfolio` },
  { q:['build log','what have you built','recent work'],
    a:`Recent builds logged in the Build Log (Engineering tab):\n\n• SHARDUL.OS v4 — full portfolio rebuild\n• Command palette with fuzzy search\n• Electric cyan design system\n• CivicOS interactive architecture diagram\n• Developer constellation SVG` },
];

function matchAI(q) {
  const lower = q.toLowerCase().trim();
  let best = null, bestScore = 0;
  AI_KB.forEach(entry => {
    entry.q.forEach(kw => {
      if (lower.includes(kw) && kw.length > bestScore) { best = entry; bestScore = kw.length; }
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

function initShardulAI() {
  const input = qs('#aiInput');
  const send  = qs('#aiSend');
  const sugs  = qsa('.ai-sug');

  function sendMsg(q) {
    if (!q.trim()) return;
    addAIMessage('user', q);
    if (input) input.value = '';
    const typing = document.createElement('div');
    typing.className = 'ai-msg ai-typing';
    typing.innerHTML = '<span class="ai-sender">SHARDUL.AI</span><p>…</p>';
    qs('#aiChat')?.appendChild(typing);
    qs('#aiChat').scrollTop = qs('#aiChat').scrollHeight;

    setTimeout(() => {
      rm(typing);
      const match = matchAI(q);
      if (match) {
        addAIMessage('ai', match.a);
      } else {
        addAIMessage('ai', `I can answer questions about Shardul's projects, skills and experience.\n\nTry: "What is CivicOS?", "Tech stack?", "Available?", "Open source work?", "Contact?", or "How is this built?"`);
      }
    }, 700 + Math.random() * 400);
  }

  on(send,  'click',   () => input && sendMsg(input.value));
  on(input, 'keydown', e => { if (e.key === 'Enter') { e.preventDefault(); sendMsg(input.value); } });
  sugs.forEach(s => on(s, 'click', () => sendMsg(s.dataset.q)));
}


/* ═══════════════════════════════════════════════════
   14. API EXPLORER
   ═══════════════════════════════════════════════════ */
const API_ENDPOINTS = {
  'gh-user':  { url: 'https://api.github.com/users/shardul-2007', label: 'GET' },
  'gh-repos': { url: 'https://api.github.com/users/shardul-2007/repos?sort=updated&per_page=3', label: 'GET' },
  'jp-post':  { url: 'https://jsonplaceholder.typicode.com/posts/1', label: 'GET' },
  'jp-users': { url: 'https://jsonplaceholder.typicode.com/users?_limit=3', label: 'GET' },
};

function initAPIExplorer() {
  const select    = qs('#apiEndpoint');
  const runBtn    = qs('#apiRun');
  const output    = qs('#apiOutput');
  const urlDisplay= qs('#apiUrlDisplay');
  const statusRow = qs('#apiStatusRow');
  const statusCode= qs('#apiStatusCode');
  const statusTime= qs('#apiStatusTime');

  if (!runBtn || !output) return;

  function updateUrl() {
    const ep = API_ENDPOINTS[select?.value];
    if (urlDisplay && ep) urlDisplay.textContent = ep.url;
  }
  on(select, 'change', updateUrl);
  updateUrl();

  on(runBtn, 'click', async () => {
    const key = select?.value || 'gh-user';
    const ep  = API_ENDPOINTS[key];
    if (!ep) return;

    output.textContent = '⏳ Fetching…';
    if (statusRow) statusRow.hidden = true;
    runBtn.disabled = true;

    const start = Date.now();
    try {
      const res  = await fetch(ep.url, { headers: { Accept: 'application/json' } });
      const time = Date.now() - start;
      const data = await res.json();

      if (statusRow) statusRow.hidden = false;
      if (statusCode) {
        statusCode.textContent = res.status + ' ' + res.statusText;
        statusCode.className = 'api-status-code ' + (res.ok ? 'ok' : 'err');
      }
      if (statusTime) statusTime.textContent = time + 'ms';
      output.textContent = JSON.stringify(data, null, 2).slice(0, 2400);
    } catch (err) {
      if (statusRow) statusRow.hidden = false;
      if (statusCode) { statusCode.textContent = 'NETWORK ERROR'; statusCode.className = 'api-status-code err'; }
      output.textContent = 'Error: ' + err.message + '\n\nThis usually means the API is unreachable or CORS blocked. Try a different endpoint.';
    } finally {
      runBtn.disabled = false;
    }
  });
}


/* ═══════════════════════════════════════════════════
   15. PERFORMANCE MONITOR
   ═══════════════════════════════════════════════════ */
function initPerfMonitor() {
  const body = qs('#perfBody');
  if (!body) return;

  const metrics = {};

  function render() {
    if (!Object.keys(metrics).length) {
      body.innerHTML = '<p class="perf-note">Metrics will appear as they become available. Some may not be reported by all browsers.</p>';
      return;
    }
    body.innerHTML = Object.entries(metrics).map(([name, val]) => {
      let cls = '';
      if (name === 'LCP') { cls = val < 2500 ? '' : val < 4000 ? ' warn' : ' bad'; }
      if (name === 'FCP') { cls = val < 1800 ? '' : val < 3000 ? ' warn' : ' bad'; }
      if (name === 'CLS') { cls = val < 0.1 ? '' : val < 0.25 ? ' warn' : ' bad'; }
      const display = name === 'CLS' ? val.toFixed(4) : val + 'ms';
      return `<div class="perf-metric">
        <span class="perf-metric-name">${name}</span>
        <span class="perf-metric-val${cls}">${display}</span>
      </div>`;
    }).join('') + '<p class="perf-note">LCP &lt; 2500ms · FCP &lt; 1800ms · CLS &lt; 0.1 are "Good" per Core Web Vitals.</p>';
  }

  function readNavTiming() {
    try {
      const nav = performance.getEntriesByType('navigation')[0];
      if (nav) {
        if (nav.domContentLoadedEventEnd) metrics['DOMContentLoaded'] = Math.round(nav.domContentLoadedEventEnd);
        if (nav.loadEventEnd) metrics['Load'] = Math.round(nav.loadEventEnd);
        if (nav.responseEnd && nav.requestStart) metrics['TTFB'] = Math.round(nav.responseEnd - nav.requestStart);
      }
      const fcp = performance.getEntriesByName('first-contentful-paint')[0];
      if (fcp) metrics['FCP'] = Math.round(fcp.startTime);
    } catch(_) {}
    render();
  }

  if ('PerformanceObserver' in window) {
    try {
      new PerformanceObserver(list => {
        list.getEntries().forEach(e => {
          if (e.entryType === 'largest-contentful-paint') { metrics['LCP'] = Math.round(e.startTime); render(); }
          if (e.entryType === 'layout-shift' && !e.hadRecentInput) {
            metrics['CLS'] = (metrics['CLS'] || 0) + e.value;
            render();
          }
        });
      }).observe({ type: 'largest-contentful-paint', buffered: true });

      new PerformanceObserver(list => {
        list.getEntries().forEach(e => {
          if (e.entryType === 'layout-shift' && !e.hadRecentInput) {
            metrics['CLS'] = parseFloat(((metrics['CLS'] || 0) + e.value).toFixed(4));
            render();
          }
        });
      }).observe({ type: 'layout-shift', buffered: true });
    } catch(_) {}
  }

  setTimeout(readNavTiming, 1500);
}


/* ═══════════════════════════════════════════════════
   16. GITHUB EXPLORER + OPEN SOURCE REPOS
   ═══════════════════════════════════════════════════ */
function initGitHub() {
  const content   = qs('#ghExplorerContent');
  const badge     = qs('#ghBadge');
  const reposGrid = qs('#ghReposGrid');
  const statusDot = qs('#ghStatusDot');
  const statusVal = qs('#ghStatusVal');
  const GH_USER   = 'shardul-2007';

  async function fetchGH() {
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GH_USER}`),
        fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=6&type=public`),
      ]);
      if (!userRes.ok) throw new Error('GitHub API ' + userRes.status);
      const user  = await userRes.json();
      const repos = await reposRes.json();

      if (badge) { badge.textContent = 'CONNECTED'; badge.className = 'lab-badge badge-green'; }
      if (statusDot) { statusDot.classList.add('live','pulse'); }
      if (statusVal) statusVal.textContent = 'CONNECTED';

      if (content) {
        content.innerHTML = `
          <div class="gh-user-card">
            <img src="${user.avatar_url}&s=96" alt="" class="gh-avatar" width="48" height="48" loading="lazy">
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
                <div class="gh-repo-name"><i class="fab fa-github" style="margin-right:6px;opacity:.5;font-size:.8rem"></i>${r.name}</div>
                ${r.description ? `<div class="gh-repo-desc">${r.description}</div>` : ''}
                <div class="gh-repo-meta">
                  ${r.language ? `<span class="gh-lang">${r.language}</span>` : ''}
                  <span>★ ${r.stargazers_count}</span>
                  <span>⑃ ${r.forks_count}</span>
                </div>
              </a>`).join('')}
          </div>`;
      }

      if (reposGrid) {
        const nonFork = repos.filter(r => !r.fork);
        reposGrid.innerHTML = (nonFork.length ? nonFork : repos).slice(0,6).map(r => `
          <a href="${r.html_url}" target="_blank" rel="noopener noreferrer" class="gh-repo">
            <div class="gh-repo-name"><i class="fab fa-github" style="margin-right:6px;opacity:.5;font-size:.8rem"></i>${r.name}</div>
            ${r.description ? `<div class="gh-repo-desc">${r.description}</div>` : ''}
            <div class="gh-repo-meta">
              ${r.language ? `<span class="gh-lang">${r.language}</span>` : ''}
              <span>★ ${r.stargazers_count}</span>
            </div>
          </a>`).join('');
      }

    } catch (err) {
      if (badge) { badge.textContent = 'OFFLINE'; badge.className = 'lab-badge badge-red'; }
      if (statusDot) statusDot.style.background = '#ef4444';
      if (statusVal) statusVal.textContent = 'UNAVAILABLE';
      const fallback = `<div class="gh-error"><i class="fab fa-github"></i><p>GitHub data unavailable.</p>
        <a href="https://github.com/${GH_USER}" target="_blank" rel="noopener noreferrer" class="os-link">View profile directly</a></div>`;
      if (content) content.innerHTML = fallback;
      if (reposGrid) reposGrid.innerHTML = fallback;
    }
  }

  fetchGH();
}


/* ═══════════════════════════════════════════════════
   17. TOKEN LAB
   ═══════════════════════════════════════════════════ */
function initTokenLab() {
  const hueSlider = qs('#hueSlider');
  const satSlider = qs('#satSlider');
  const hueVal    = qs('#hueVal');
  const satVal    = qs('#satVal');
  const swatch    = qs('#tpSwatch');
  const resetBtn  = qs('#tokenReset');
  const DEFAULT_HUE = 168, DEFAULT_SAT = 100;

  function update(hue, sat) {
    const color = `hsl(${hue}, ${sat}%, 50%)`;
    const root  = document.documentElement;
    root.style.setProperty('--accent',        color);
    root.style.setProperty('--accent-dim',    `hsla(${hue}, ${sat}%, 50%, 0.12)`);
    root.style.setProperty('--accent-glow',   `hsla(${hue}, ${sat}%, 50%, 0.20)`);
    root.style.setProperty('--border-accent', `hsla(${hue}, ${sat}%, 50%, 0.25)`);
    if (hueVal) hueVal.textContent = hue + '°';
    if (satVal) satVal.textContent = sat + '%';
    if (swatch) swatch.style.background = color;
  }

  function reset() {
    const root = document.documentElement;
    ['--accent','--accent-dim','--accent-glow','--border-accent'].forEach(p => root.style.removeProperty(p));
    if (hueSlider) hueSlider.value = DEFAULT_HUE;
    if (satSlider) satSlider.value = DEFAULT_SAT;
    if (hueVal) hueVal.textContent = DEFAULT_HUE + '°';
    if (satVal) satVal.textContent = DEFAULT_SAT + '%';
    if (swatch) swatch.style.background = '';
  }

  on(hueSlider, 'input', () => update(hueSlider.value, satSlider.value));
  on(satSlider, 'input', () => update(hueSlider.value, satSlider.value));
  on(resetBtn,  'click', reset);

  if (swatch) swatch.style.background = `hsl(${DEFAULT_HUE}, ${DEFAULT_SAT}%, 50%)`;
}


/* ═══════════════════════════════════════════════════
   18. CONTACT FLOW
   ═══════════════════════════════════════════════════ */
function initContactFlow() {
  const intentBtns = qsa('.intent-btn');
  const messages   = qsa('.ic-msg');
  const form       = qs('#connectForm');
  const statusEl   = qs('#connectStatus');

  intentBtns.forEach(btn => {
    on(btn, 'click', () => {
      intentBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const intent = btn.dataset.intent;
      messages.forEach(m => m.classList.toggle('active', m.dataset.intent === intent));
    });
  });

  on(form, 'submit', e => {
    e.preventDefault();
    const name   = qs('#cfName')?.value.trim();
    const email  = qs('#cfEmail')?.value.trim();
    const msg    = qs('#cfMsg')?.value.trim();
    const intent = qs('.intent-btn.active')?.dataset.intent || 'other';

    let valid = true;
    [['#cfName', name], ['#cfEmail', email], ['#cfMsg', msg]].forEach(([id, val]) => {
      const el = qs(id);
      el?.classList.toggle('error', !val);
      if (!val) valid = false;
    });
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { qs('#cfEmail')?.classList.add('error'); valid = false; }
    if (!valid) { statusEl.textContent = 'Please fill in all required fields.'; statusEl.className = 'form-status error'; return; }

    const submitBtn = form.querySelector('.connect-submit-btn');
    const lbl = qs('.submit-label', submitBtn);
    if (lbl) lbl.textContent = 'Opening email…';
    if (submitBtn) submitBtn.disabled = true;
    statusEl.textContent = '';

    const body    = encodeURIComponent(`Name: ${name}\nIntent: ${intent}\n\n${msg}`);
    const mailto  = `mailto:shardulparihar2007@gmail.com?subject=Portfolio%20Contact%20[${intent}]%20from%20${encodeURIComponent(name)}&body=${body}`;
    window.location.href = mailto;

    setTimeout(() => {
      if (lbl) lbl.textContent = 'Send Message';
      if (submitBtn) submitBtn.disabled = false;
      statusEl.textContent = '✓ Your email client should open with a pre-filled message. Alternatively email shardulparihar2007@gmail.com directly.';
      statusEl.className = 'form-status success';
    }, 1200);
  });
}


/* ═══════════════════════════════════════════════════
   19. VIEW MODE
   ═══════════════════════════════════════════════════ */
function setViewMode(mode) {
  document.body.setAttribute('data-view', mode);
  const banner     = qs('#viewBanner');
  const bannerText = qs('#viewBannerText');
  const LABELS = { recruiter:'VIEWING AS RECRUITER', developer:'VIEWING AS DEVELOPER', collaborator:'VIEWING AS COLLABORATOR' };

  if (mode === 'default') {
    if (banner) banner.hidden = true;
  } else {
    if (banner) { banner.hidden = false; if (bannerText) bannerText.textContent = LABELS[mode] || mode.toUpperCase(); }
  }
  qsa('.vm-opt').forEach(o => o.classList.toggle('active', o.dataset.mode === mode));
  closeViewModal();
}

function openViewModal()  { const m = qs('#viewModeModal'); if (m) { m.hidden = false; qs('.vm-opt', m)?.focus(); } }
function closeViewModal() { const m = qs('#viewModeModal'); if (m) m.hidden = true; }

function initViewMode() {
  on(qs('#viewModeToggle'), 'click', openViewModal);
  on(qs('#vmClose'),        'click', closeViewModal);
  on(qs('#vmBackdrop'),     'click', closeViewModal);
  on(qs('#viewBannerReset'),'click', () => setViewMode('default'));
  qsa('.vm-opt').forEach(opt => on(opt, 'click', () => setViewMode(opt.dataset.mode)));
}


/* ═══════════════════════════════════════════════════
   20. WORD ROTATOR + CANVAS PARTICLES
   ═══════════════════════════════════════════════════ */
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

function initCanvas() {
  if (reduced()) return;
  const canvas = qs('#idCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, dots = [], raf;

  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  function makeDots() {
    dots = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    if (document.documentElement.getAttribute('data-power') === 'low') { raf = null; return; }
    const col = document.documentElement.getAttribute('data-theme') === 'light' ? 'rgba(0,122,99,' : 'rgba(0,212,170,';
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
      if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = col + (Math.random() * 0.12 + 0.04) + ')';
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        if (!raf) { resize(); makeDots(); draw(); }
      } else {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
      }
    });
  });
  io.observe(canvas.parentElement);

  on(window, 'resize', () => { resize(); makeDots(); }, { passive: true });
}


/* ═══════════════════════════════════════════════════
   BOOT — runs immediately (before DOM ready)
   ═══════════════════════════════════════════════════ */
initBoot();

/* ═══════════════════════════════════════════════════
   DOMContentLoaded — all other modules
   ═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initLowPowerMode();
  initNav();
  initCommandPalette();
  initKeyboardShortcuts();
  initScrollReveal();
  initConstellation();
  initEngineeringTabs();
  initBuildLog();
  initAchievements();
  initCivicOSArch();
  initShardulAI();
  initAPIExplorer();
  initPerfMonitor();
  initGitHub();
  initTokenLab();
  initContactFlow();
  initViewMode();
  initWordRotator();
  initCanvas();
});
