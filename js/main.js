'use strict';

/* ═══════════════════════════════════════
   NAVBAR — scroll state
═══════════════════════════════════════ */
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ═══════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════ */
const menuBtn  = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
  const openMenu  = () => {
    navLinks.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
  };

  menuBtn.addEventListener('click', () =>
    navLinks.classList.contains('open') ? closeMenu() : openMenu()
  );
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('click', e => {
    if (navbar && !navbar.contains(e.target) && navLinks.classList.contains('open')) closeMenu();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

/* ═══════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ═══════════════════════════════════════
   FAQ — keyboard support
═══════════════════════════════════════ */
document.querySelectorAll('.faq-q').forEach(summary => {
  summary.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const item = summary.closest('.faq-item');
      if (item) item.open = !item.open;
    }
  });
});

/* ═══════════════════════════════════════
   SMOOTH ANCHOR SCROLL
   (offset accounts for fixed navbar height)
═══════════════════════════════════════ */
const NAV_HEIGHT = 72;
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT,
      behavior: 'smooth'
    });
  });
});

/* ═══════════════════════════════════════
   GOOGLE FORM SUBMISSION
═══════════════════════════════════════ */
const form = document.getElementById('google-form');
if (form) {
  const markError  = field => { field.style.borderColor = 'rgba(239,68,68,0.6)'; field.focus(); };
  const clearError = field => { field.style.borderColor = ''; };

  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => clearError(input));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const nameField    = form.querySelector('#f-name');
    const contactField = form.querySelector('#f-contact');
    let valid = true;

    if (!nameField.value.trim())    { markError(nameField);    valid = false; }
    if (!contactField.value.trim()) { markError(contactField); valid = false; }
    if (!valid) return;

    const btn = form.querySelector('.form-submit');
    btn.innerHTML = '<span>Sending…</span>';
    btn.disabled  = true;
    btn.style.opacity = '0.65';

    fetch(
      'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdkoXYSqU5acMJ6nlqKnnphIzMBtnoANGe2U7RZIALodlx_9w/formResponse',
      { method: 'POST', mode: 'no-cors', body: new FormData(form) }
    ).finally(() => {
      form.style.display = 'none';
      const success = document.getElementById('form-success');
      if (success) {
        success.style.display = 'block';
        success.setAttribute('tabindex', '-1');
        success.focus();
      }
    });
  });
}