/* ============================================================
   JARVIS PORTFOLIO — app.js
   ============================================================ */

// ---- Data ----

const PROJECTS = [
  {
    tag: 'NLP · Stance Detection',
    title: 'Discourse Shift Detection in Political Social Media',
    desc: 'Tracking how political discourse evolves across major events — when frames get introduced, how narratives fracture, and what the linguistic signals of a real shift look like versus noise.',
    tags: ['stance detection', 'political NLP', 'LLMs', 'discourse analysis'],
    links: [
      { label: 'Code', href: '#' },
      { label: 'Paper', href: '#' },
    ],
  },
  {
    tag: 'Platform Analysis',
    title: 'Cross-Platform Stance Signals in Health Discourse',
    desc: 'Comparing how stance toward public health topics manifests differently across Twitter/X, Reddit, and YouTube comment sections — and what that tells us about platform-specific communication norms.',
    tags: ['cross-platform', 'health discourse', 'framing', 'social media'],
    links: [
      { label: 'Code', href: '#' },
      { label: 'Paper', href: '#' },
    ],
  },
  {
    tag: 'Framing Analysis',
    title: 'Framing and Counter-Framing in Media Ecosystems',
    desc: 'Mapping how competing actors frame the same issue and how counter-frames gain or lose traction over time, using fine-tuned LLMs to annotate frame types at scale.',
    tags: ['framing theory', 'media ecosystems', 'counter-narratives', 'LLM annotation'],
    links: [
      { label: 'Code', href: '#' },
      { label: 'Paper', href: '#' },
    ],
  },
  {
    tag: 'Fairness · NLP',
    title: 'Dialect Embeddings and Representation in Social Media NLP',
    desc: 'Investigating how dialectal variation in social media language affects the performance of standard NLP pipelines — and what it means for fairness when some voices are systematically harder to process.',
    tags: ['dialect', 'fairness', 'social media NLP', 'word embeddings'],
    links: [
      { label: 'Code', href: '#' },
      { label: 'Paper', href: '#' },
    ],
  },
];

const TEACHING = [
  {
    role: 'Teaching Assistant',
    title: 'Introduction to Computational Linguistics',
    org: 'Department of Computational Social Science',
    year: 'Fall 2025',
  },
  {
    role: 'Guest Lecturer',
    title: 'Social Media Discourse Analysis — Methods Workshop',
    org: 'Graduate Research Methods Series',
    year: 'Spring 2025',
  },
];

// ---- Render helpers ----

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = PROJECTS.map(
    (p) => `
    <article class="project-card reveal">
      <span class="project-card__tag">${p.tag}</span>
      <h3 class="project-card__title">${p.title}</h3>
      <p class="project-card__desc">${p.desc}</p>
      <div class="project-card__tags">
        ${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
      </div>
      <div class="project-card__links">
        ${p.links.map((l) => `<a href="${l.href}">${l.label}</a>`).join('')}
      </div>
    </article>`
  ).join('');
}

function renderPublications() {
  const grid = document.getElementById('pubGrid');

  if (grid.dataset.filled === 'true') {
    // User has populated — nothing to do, HTML is already in DOM
    return;
  }

  // Empty state — show placeholder cards
  grid.innerHTML = Array(3)
    .fill(null)
    .map(
      () => `
    <div class="pub-empty reveal">
      <div class="pub-empty__icon">📄</div>
      <div class="pub-empty__title">Paper coming soon</div>
      <p class="pub-empty__sub">Add your published work here — title, venue, links.</p>
    </div>`
    )
    .join('');
}

function renderTeaching() {
  const list = document.getElementById('teachingList');
  list.innerHTML = TEACHING.map(
    (t) => `
    <div class="teaching__item reveal">
      <div>
        <div class="teaching__item__role">${t.role}</div>
        <div class="teaching__item__title">${t.title}</div>
        <div class="teaching__item__org">${t.org}</div>
      </div>
      <div class="teaching__item__year">${t.year}</div>
    </div>`
  ).join('');
}

// ---- Intersection Observer (reveal on scroll) ----

function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

// ---- Mobile nav ----

function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  // Close on link click
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('active');
    });
  });

  // Scroll class
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Active link tracking
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((a) => {
            a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}

// ---- Year ----
function setYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderPublications();
  renderTeaching();
  setYear();
  initReveal();
  initNav();
});