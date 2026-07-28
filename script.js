document.addEventListener('DOMContentLoaded', function () {

  /* -------------------- Menu mobile -------------------- */
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }

  /* -------------------- Scroll suave nas âncoras -------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var headerHeight = document.getElementById('header').offsetHeight;
          var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

  /* -------------------- Header muda ao rolar -------------------- */
  var header = document.getElementById('header');
  var scrollThreshold = 10;

  function toggleHeaderStyle() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  toggleHeaderStyle();
  window.addEventListener('scroll', toggleHeaderStyle, { passive: true });

  /* -------------------- Animações de entrada (Intersection Observer) -------------------- */
  var fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* -------------------- Ano dinâmico no footer -------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* -------------------- Rastreamento de conversão (Google Ads) -------------------- */
  var whatsappButtons = document.querySelectorAll('.btn-whatsapp');
  whatsappButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Descomente e insira seu ID/label de conversão do Google Ads abaixo:
      // gtag_report_conversion();
    });
  });

  // function gtag_report_conversion(url) {
  //   var callback = function () {
  //     if (typeof url !== 'undefined') { window.location = url; }
  //   };
  //   gtag('event', 'conversion', {
  //     'send_to': 'AW-XXXXXXXXX/XXXXXXXXXXXXXXXXXXXX', // substitua pelo ID de conversão
  //     'event_callback': callback
  //   });
  //   return false;
  // }

});
