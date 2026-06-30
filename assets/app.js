/* ============================================================
   E-book — interactividad y efectos
   1) Animaciones de entrada al hacer scroll (IntersectionObserver)
   2) Quiz interactivo con selección de opciones
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1) Reveal on scroll ---------- */
  // Se aplica por JS: si el script no carga, el contenido queda visible (sin .reveal).
  var revealSelectors = [
    '.section-head', '.card', '.step', '.learn-item',
    '.testi-card', '.price-card', '.guarantee', '.faq-item',
    '.quiz-grid', '.quiz-option', '.final-cta .container'
  ];
  var revealEls = document.querySelectorAll(revealSelectors.join(','));

  // Stagger ligero para hijos de una misma grilla
  revealEls.forEach(function (el) {
    el.classList.add('reveal');
    var siblings = el.parentElement ? el.parentElement.children : [];
    var idx = Array.prototype.indexOf.call(siblings, el);
    if (idx > 0) el.style.transitionDelay = Math.min(idx % 4, 3) * 70 + 'ms';
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: mostrar todo
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- 2) Quiz interactivo ---------- */
  var options = document.querySelectorAll('.quiz-option');
  var result = document.querySelector('.quiz-result');
  var resultText = document.querySelector('.quiz-result .qr-text');

  options.forEach(function (opt) {
    opt.addEventListener('click', function () {
      options.forEach(function (o) {
        o.classList.remove('selected');
        o.setAttribute('aria-pressed', 'false');
      });
      opt.classList.add('selected');
      opt.setAttribute('aria-pressed', 'true');

      if (result && resultText) {
        resultText.innerHTML = opt.getAttribute('data-msg') || '';
        result.hidden = false;
        // reinicia la animación
        result.classList.remove('show');
        void result.offsetWidth;
        result.classList.add('show');
      }
    });
  });
})();
