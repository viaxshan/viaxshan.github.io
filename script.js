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
  const walkFrames = ['mars_standing.png', 'mars_standing2.png', 'mars_standing3.png'];
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
