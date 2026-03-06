document.addEventListener('DOMContentLoaded', () => {
  // --- Typing animation ---
  const taglines = [
    'Unix enthusiasts. System architects. We build things that run.',
    'Declarative infrastructure. Reproducible builds. Cold beer.',
    'root access to good ideas.',
  ];

  const taglineEl = document.querySelector('.tagline-text');
  let currentTagline = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 50;

  function type() {
    const current = taglines[currentTagline];

    if (isDeleting) {
      taglineEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 20;
    } else {
      taglineEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 45 + Math.random() * 35;
    }

    if (!isDeleting && charIndex === current.length) {
      typingDelay = 3000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentTagline = (currentTagline + 1) % taglines.length;
      typingDelay = 400;
    }

    setTimeout(type, typingDelay);
  }

  setTimeout(type, 600);

  // --- Scroll reveal ---
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => observer.observe(el));

  // --- Mobile menu ---
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.classList.remove('active');
    });
  });

  // --- Nav scroll state ---
  const nav = document.getElementById('nav');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  });
});
