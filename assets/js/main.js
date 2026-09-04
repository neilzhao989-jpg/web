/* Auric Aura Fengshui — interface behaviour */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var nav    = document.getElementById('nav');
  var burger = document.getElementById('burger');

  /* ------------------------------------------------ sticky header state */
  function syncHeader() {
    header.classList.toggle('is-stuck', window.scrollY > 24);
  }
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  /* ------------------------------------------------------- mobile menu */
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  burger.addEventListener('click', function () {
    setMenu(!nav.classList.contains('is-open'));
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  /* --------------------------------------------------- services dropdown */
  var dropdowns = Array.prototype.slice.call(document.querySelectorAll('[data-dropdown]'));

  dropdowns.forEach(function (item) {
    var toggle = item.querySelector('.nav__toggle');

    toggle.addEventListener('click', function () {
      var open = !item.classList.contains('is-open');
      dropdowns.forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.nav__toggle').setAttribute('aria-expanded', 'false');
      });
      item.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-dropdown]')) return;
    dropdowns.forEach(function (item) {
      item.classList.remove('is-open');
      item.querySelector('.nav__toggle').setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    dropdowns.forEach(function (item) {
      item.classList.remove('is-open');
      item.querySelector('.nav__toggle').setAttribute('aria-expanded', 'false');
    });
    if (nav.classList.contains('is-open')) setMenu(false);
  });

  /* ---------------------------------------------------- reveal on scroll */
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.06 });

    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ------------------------------------------------ active nav highlight */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link[href^="#"]'));
  var sections = links
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle(
            'is-active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ------------------------------------------------------- one FAQ open */
  var faqs = Array.prototype.slice.call(document.querySelectorAll('.faq__item'));
  faqs.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqs.forEach(function (other) { if (other !== item) other.open = false; });
    });
  });

  /* ------------------------------------------------------------- year */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
