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

  /* ---- Studio scroll reveal (IntersectionObserver) ---- */
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

  /* ---- Image Carousel ---- */
  function ImgCarousel(el) {
    this.el       = el;
    this.track    = el.querySelector('.img-carousel__track');
    this.slides   = el.querySelectorAll('.img-carousel__slide');
    this.prevBtn  = el.querySelector('.img-carousel__btn--prev');
    this.nextBtn  = el.querySelector('.img-carousel__btn--next');
    this.dotsWrap = el.querySelector('.img-carousel__dots');
    this.counter  = el.querySelector('.img-carousel__counter');
    this.total    = this.slides.length;
    this.current  = 0;
    this.ms       = parseInt(el.getAttribute('data-autoplay'), 10) || 4500;
    this.timer    = null;
    this.txStart  = 0;
    this.dots     = [];

    if (!this.total || !this.track) return;

    /* Build dots */
    var self = this;
    for (var i = 0; i < this.total; i++) {
      (function(idx) {
        var d = document.createElement('button');
        d.className = 'img-carousel__dot';
        d.setAttribute('aria-label', '\u0627\u0644\u0635\u0648\u0631\u0629 ' + (idx + 1));
        d.addEventListener('click', function() { self.goTo(idx); self.resetTimer(); });
        self.dotsWrap.appendChild(d);
        self.dots.push(d);
      }(i));
    }

    /* Buttons */
    if (this.prevBtn) this.prevBtn.addEventListener('click', function() { self.prev(); self.resetTimer(); });
    if (this.nextBtn) this.nextBtn.addEventListener('click', function() { self.next(); self.resetTimer(); });

    /* Pause on hover */
    el.addEventListener('mouseenter', function() { self.stopTimer(); });
    el.addEventListener('mouseleave', function() { self.startTimer(); });

    /* Touch / swipe */
    el.addEventListener('touchstart', function(e) {
      self.txStart = e.changedTouches[0].clientX;
      self.stopTimer();
    }, { passive: true });
    el.addEventListener('touchend', function(e) {
      var dx = e.changedTouches[0].clientX - self.txStart;
      if (Math.abs(dx) > 40) { dx < 0 ? self.next() : self.prev(); }
      self.startTimer();
    }, { passive: true });

    /* Keyboard (when focused) */
    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft')  { self.next(); self.resetTimer(); }
      if (e.key === 'ArrowRight') { self.prev(); self.resetTimer(); }
    });

    this.goTo(0);
    this.startTimer();
  }

  ImgCarousel.prototype.goTo = function(idx) {
    this.current = ((idx % this.total) + this.total) % this.total;
    this.track.style.transform = 'translateX(-' + (this.current * 100) + '%)';
    this.dots.forEach(function(d, i) { d.classList.toggle('active', i === this.current); }, this);
    if (this.counter) this.counter.textContent = (this.current + 1) + ' / ' + this.total;
  };
  ImgCarousel.prototype.prev  = function() { this.goTo(this.current - 1); };
  ImgCarousel.prototype.next  = function() { this.goTo(this.current + 1); };
  ImgCarousel.prototype.startTimer = function() {
    var self = this;
    this.stopTimer();
    this.timer = setInterval(function() { self.next(); }, self.ms);
  };
  ImgCarousel.prototype.stopTimer  = function() { clearInterval(this.timer); this.timer = null; };
  ImgCarousel.prototype.resetTimer = function() { this.stopTimer(); this.startTimer(); };

  document.querySelectorAll('.img-carousel').forEach(function(el) { new ImgCarousel(el); });

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
