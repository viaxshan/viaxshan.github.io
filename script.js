const carouselPositions = {};

function updateUI(carouselId) {
  const carousel = document.getElementById(carouselId);
  const track = carousel.querySelector(':scope > .carousel-track');
  const pos = carouselPositions[carouselId] || 0;
  track.style.transform = `translateX(${pos * -100}%)`;
}

function moveSlide(carouselId, direction) {
  const carousel = document.getElementById(carouselId);
  const slides = carousel.querySelectorAll(':scope > .carousel-track > .carousel-slide');

  if (carouselPositions[carouselId] === undefined) {
    carouselPositions[carouselId] = 0;
  }

  carouselPositions[carouselId] += direction;

  if (carouselPositions[carouselId] >= slides.length) {
    carouselPositions[carouselId] = 0;
  } else if (carouselPositions[carouselId] < 0) {
    carouselPositions[carouselId] = slides.length - 1;
  }

  updateUI(carouselId);
}

// Hamburger menu toggle
(function () {
  const menuToggle = document.getElementById('menuToggle');
  const menuPanel = document.getElementById('menuPanel');

  function closeMenu() {
    menuPanel.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
  function openMenu() {
    menuPanel.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = menuPanel.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuPanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (!menuPanel.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });

  window.addEventListener('scroll', closeMenu, { passive: true });
})();

// Dark mode toggle
(function () {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    toggleBtn.textContent = theme === 'dark' ? '☀' : '☾';
  }

  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  toggleBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });
})();

// Mascot speech bubble
const mascotImg = document.getElementById('mascotImg');
const mascotBubble = document.getElementById('mascotBubble');
const mascotWrap = document.getElementById('mascotWrap');
mascotImg.addEventListener('click', () => {
  mascotBubble.classList.toggle('show');
});
document.addEventListener('click', (e) => {
  if (!mascotWrap.contains(e.target)) {
    mascotBubble.classList.remove('show');
  }
});

// Mascot walk cycle on hover/focus
(function () {
  const idleFrame = 'mars_standing.png';
  const walkFrames = ['mars_standing2.png', 'mars_standing3.png'];
  const frameDelayMs = 180;
  let frameIndex = 0;
  let walkTimer = null;
  function startWalking() {
    if (walkTimer) return;
    walkTimer = setInterval(() => {
      frameIndex = (frameIndex + 1) % walkFrames.length;
      mascotImg.src = walkFrames[frameIndex];
    }, frameDelayMs);
  }
  function stopWalking() {
    clearInterval(walkTimer);
    walkTimer = null;
    frameIndex = 0;
    mascotImg.src = idleFrame;
  }
  mascotWrap.addEventListener('mouseenter', startWalking);
  mascotWrap.addEventListener('mouseleave', stopWalking);
  mascotWrap.addEventListener('focusin', startWalking);
  mascotWrap.addEventListener('focusout', stopWalking);
})();

// Mouse trail
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const trailColors = ['#178a8a', '#3fb6a8', '#ff8b6b', '#cfe9f3'];
  const starChars = ['✦', '★', '✩'];
  let lastTrailTime = 0;

  window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime < 35) return;
    lastTrailTime = now;

    const dot = document.createElement('span');
    dot.className = 'trail-dot';
    dot.textContent = starChars[Math.floor(Math.random() * starChars.length)];
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    dot.style.color = trailColors[Math.floor(Math.random() * trailColors.length)];
    document.body.appendChild(dot);
    dot.addEventListener('animationend', () => dot.remove());
  });
}
// Fade sections in/out on scroll
(function () {
  const targets = document.querySelectorAll('.hero, section');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  targets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('visible', entry.isIntersecting);
      });
    },
    { threshold: 0, rootMargin: '0px 0px -15% 0px' }
  );

  targets.forEach((el) => observer.observe(el));
})();

// ---------- Projects popup ----------
const projects = {
  pawfocus: {
    file: 'PawFocus.png',
    title: 'PawFocus',
    tags: ['Python', 'productivity', 'pixel art'],
    desc: "A productivity app with a kitty study buddy! Drag the kitty around your screen, and it studies alongside you until it's time to take a break.",
    media: [
      { type: 'img', src: 'PawFocus_2.png', alt: 'PawFocus screenshot' },
      { type: 'img', src: 'PawFocus_Break.png', alt: 'PawFocus break reminder screenshot' },
      { type: 'video', src: 'PawFocus Demo.mp4' }
    ],
    links: [{ label: 'View code', href: 'https://github.com/viaxshan/PawFocus' }]
  },
  dressup: {
    file: 'dressup.png',
    title: 'Dress Up!',
    tags: ['Unity', 'C#', 'hand-drawn art'],
    desc: 'A character customization game, built with github user pusheen5000000 ^_^',
    media: [
      { type: 'img', src: 'dressupscreen.png', alt: 'Dress Up! screenshot' },
      { type: 'video', src: 'dressupdemo.mp4' }
    ],
    links: [{ label: 'View code', href: 'https://github.com/pusheen5000000/dressup/tree/main' }]
  },
  econ: {
    file: 'economic_shock_sim.py',
    title: 'Economic Shock Simulator',
    tags: ['Python', 'weighted graphs', 'school project'],
    desc: 'A UI for simulating economic shocks with weighted graphs, letting users customize the underlying data. Built as a school project.',
    media: [],
    links: [{ label: 'View code', href: 'https://github.com/Tabel0112/Economic-Shock-Simulator' }]
  },
  detective: {
    file: 'detective_game.wip',
    title: 'Detective Game',
    tags: ['work in progress'],
    desc: 'A mystery/detective game currently in the works — more details and a demo coming soon!',
    media: [],
    links: []
  }
};

(function () {
  const modal = document.getElementById('projectModal');
  const carousel = document.getElementById('modalCarousel');
  const track = carousel.querySelector('.carousel-track');
  let lastFocus = null;

  function openProject(id) {
    const p = projects[id];
    if (!p) return;
    lastFocus = document.activeElement;

    document.getElementById('modalFile').textContent = p.file;
    document.getElementById('modalTitle').textContent = p.title;
    document.getElementById('modalDesc').textContent = p.desc;
    document.getElementById('modalTags').innerHTML =
      p.tags.map((t) => `<span class="tag">${t}</span>`).join('');
    document.getElementById('modalLinks').innerHTML =
      p.links.map((l) => `<a class="btn" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`).join('');

    // Build carousel (hidden if the project has no media)
    carouselPositions['modalCarousel'] = 0;
    track.style.transform = 'translateX(0)';
    track.innerHTML = p.media.map((m) =>
      m.type === 'video'
        ? `<div class="carousel-slide"><video class="project-video-slide" controls loop muted playsinline><source src="${m.src}" type="video/mp4"></video></div>`
        : `<div class="carousel-slide"><img class="project-img-slide" src="${m.src}" alt="${m.alt || ''}"></div>`
    ).join('');
    carousel.hidden = p.media.length === 0;
    carousel.querySelectorAll('.carousel-btn').forEach((b) => {
      b.style.display = p.media.length > 1 ? '' : 'none';
    });

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    document.getElementById('modalClose').focus();
  }

  function closeProject() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    track.innerHTML = ''; // stops any playing video
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('.project-tile').forEach((tile) => {
    tile.addEventListener('click', () => openProject(tile.dataset.project));
  });
  document.getElementById('modalClose').addEventListener('click', closeProject);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeProject(); });
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeProject();
    if (e.key === 'ArrowLeft') moveSlide('modalCarousel', -1);
    if (e.key === 'ArrowRight') moveSlide('modalCarousel', 1);
  });
})();
