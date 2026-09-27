document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.innerHTML = open ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<i class="bi bi-list"></i>';
      });
    });
  }

  /* Animated role text in hero */
  var roleEl = document.getElementById('hero-role-text');
  var roles = [
    '.NET Full Stack Developer',
    'ASP.NET Core Developer',
    'Backend API Developer'
  ];
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (roleEl) {
    if (reduceMotion) {
      roleEl.textContent = roles[0];
    } else {
      var ri = 0, ci = 0, deleting = false;

      function tick() {
        var current = roles[ri];
        if (!deleting) {
          ci++;
          roleEl.textContent = current.slice(0, ci);
          if (ci === current.length) {
            deleting = true;
            setTimeout(tick, 1600);
            return;
          }
        } else {
          ci--;
          roleEl.textContent = current.slice(0, ci);
          if (ci === 0) {
            deleting = false;
            ri = (ri + 1) % roles.length;
          }
        }
        setTimeout(tick, deleting ? 35 : 65);
      }
      tick();
    }
  }

  /* Scroll reveal via AOS — adds aos-init then aos-animate to each
     [data-aos] element as it enters the viewport. */
  if (window.AOS) {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: function () {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      }
    });
  }

  /* Active nav link highlighting (scoped to in-page hash sections) */
  var sections = document.querySelectorAll('main [id]');
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navAnchors.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    sections.forEach(function (s) { navIo.observe(s); });
  }

  /* Footer year */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
});
