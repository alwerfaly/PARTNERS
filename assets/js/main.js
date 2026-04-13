/* منظمة الشراكة المجتمعية — main.js v2 */
(function () {
  'use strict';

  /* ---- Navbar scroll shadow ---- */
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ---- Mobile menu ---- */
  var toggle    = document.querySelector('.navbar__toggle');
  var mobileNav = document.querySelector('.navbar__mobile');
  var mobileClose = document.querySelector('.navbar__mobile-close');

  function openMenu()  { mobileNav && mobileNav.classList.add('open'); document.body.style.overflow = 'hidden'; toggle && toggle.setAttribute('aria-expanded','true'); }
  function closeMenu() { mobileNav && mobileNav.classList.remove('open'); document.body.style.overflow = ''; toggle && toggle.setAttribute('aria-expanded','false'); }

  if (toggle)    toggle.addEventListener('click', function() { mobileNav.classList.contains('open') ? closeMenu() : openMenu(); });
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (mobileNav) mobileNav.querySelectorAll('a').forEach(function(a) { a.addEventListener('click', closeMenu); });

  /* ---- Active nav link ---- */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav a, .navbar__mobile a').forEach(function(a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ---- Scroll-to-top ---- */
  var scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', function () {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    scrollBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ---- Scroll reveal (IntersectionObserver) ---- */
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(function(el) {
      revealObserver.observe(el);
    });

    /* Auto-add reveal to cards/items on scroll */
    document.querySelectorAll('.card, .project-card, .news-card, .health-card, .goal-item, .vm-card, .join-step').forEach(function(el, i) {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        el.style.transitionDelay = (i % 4 * 0.1) + 's';
        revealObserver.observe(el);
      }
    });
  }

  /* ---- Counter animation ---- */
  function animateCounter(el, target, dur) {
    var start = 0, step = target / (dur / 16);
    var timer = setInterval(function() {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = Math.floor(start) + (el.dataset.suffix || '');
    }, 16);
  }
  var counters = document.querySelectorAll('.hero__stat .num[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var cObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          animateCounter(e.target, parseInt(e.target.dataset.count, 10), 1200);
          cObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function(c) { cObs.observe(c); });
  }

  /* ---- Health category flip cards (tap / keyboard; hover via CSS) ---- */
  document.querySelectorAll('.health-flip').forEach(function(card) {
    card.addEventListener('click', function(e) {
      if (e.target.closest('a.health-flip__more')) return;
      var on = card.classList.toggle('is-flipped');
      card.setAttribute('aria-expanded', on ? 'true' : 'false');
    });
    card.addEventListener('keydown', function(e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      if (e.target !== card) return;
      e.preventDefault();
      var on = card.classList.toggle('is-flipped');
      card.setAttribute('aria-expanded', on ? 'true' : 'false');
    });
  });

  /* ---- Web3Forms (تواصل + انضم إلينا) ---- */
  document.querySelectorAll('form.js-web3form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var btn = form.querySelector('[type="submit"]');
      var statusEl = form.querySelector('.form-status');
      var origText = btn ? btn.textContent : '';
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'جاري الإرسال...';
      }
      if (statusEl) {
        statusEl.textContent = '';
        statusEl.className = 'form-status';
      }

      var fd = new FormData(form);
      fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
        .then(function(r) { return r.json(); })
        .then(function(data) {
          if (data.success) {
            if (statusEl) {
              statusEl.textContent = 'تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.';
              statusEl.className = 'form-status form-status--ok';
            }
            form.reset();
          } else {
            if (statusEl) {
              statusEl.textContent = data.message || 'تعذّر إرسال النموذج. حاول مرة أخرى.';
              statusEl.className = 'form-status form-status--err';
            }
          }
        })
        .catch(function() {
          if (statusEl) {
            statusEl.textContent = 'تعذّر الاتصال بالخادم. تحقق من الإنترنت وحاول مرة أخرى.';
            statusEl.className = 'form-status form-status--err';
          }
        })
        .finally(function() {
          if (btn) {
            btn.disabled = false;
            btn.textContent = origText;
          }
        });
    });
  });

}());
