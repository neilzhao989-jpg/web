/* Auric Aura Fengshui — interface behaviour */
(function () {
  'use strict';

  var STORE = 'aa-lang';
  var ZH = window.AA_ZH || {};

  var header = document.querySelector('.site-header');
  var nav    = document.getElementById('nav');
  var burger = document.getElementById('burger');

  /* Reveal is set up before anything else: if a later block throws, content
     must never be left stranded at opacity 0. */
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


  /* --------------------------------------------------------------- i18n */
  function store(lang) {
    try { localStorage.setItem(STORE, lang); } catch (e) {}
  }

  function stored() {
    try { return localStorage.getItem(STORE); } catch (e) { return null; }
  }

  function translate(el, attr, key, lang) {
    var cache = attr ? 'aaEn' + attr.replace(/[^a-z0-9]/gi, '') : 'aaEn';
    if (el.dataset[cache] === undefined) {
      el.dataset[cache] = attr ? (el.getAttribute(attr) || '') : el.innerHTML;
    }
    var value = (lang === 'zh' && ZH[key]) ? ZH[key] : el.dataset[cache];
    if (attr) el.setAttribute(attr, value);
    else el.innerHTML = value;
  }

  function setLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      translate(el, null, el.dataset.i18n, lang);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      translate(el, 'aria-label', el.dataset.i18nAria, lang);
    });

    var page = document.documentElement.dataset.page;
    var titleKey = 'title.' + page;
    if (document.body.dataset.aaTitle === undefined) {
      document.body.dataset.aaTitle = document.title;
    }
    document.title = (lang === 'zh' && ZH[titleKey]) ? ZH[titleKey] : document.body.dataset.aaTitle;

    document.documentElement.lang = (lang === 'zh') ? 'zh-Hans' : 'en';
    store(lang);
  }

  // A failure here must not take down the header, menu or reveal below.
  try { setLang(stored() === 'zh' ? 'zh' : 'en'); } catch (e) {}

  var langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      try {
        setLang(document.documentElement.lang === 'zh-Hans' ? 'en' : 'zh');
      } catch (e) {}
    });
  }

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

  function closeDropdowns() {
    dropdowns.forEach(function (item) {
      item.classList.remove('is-open');
      item.querySelector('.nav__toggle').setAttribute('aria-expanded', 'false');
    });
  }

  dropdowns.forEach(function (item) {
    var toggle = item.querySelector('.nav__toggle');
    toggle.addEventListener('click', function () {
      var open = !item.classList.contains('is-open');
      closeDropdowns();
      item.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-dropdown]')) closeDropdowns();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeDropdowns();
    if (nav.classList.contains('is-open')) setMenu(false);
  });

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
