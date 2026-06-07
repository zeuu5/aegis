'use strict';

/* ── Navbar scroll state ── */
const navbar = document.querySelector('.navbar');
const onScroll = () => navbar.classList.toggle('stuck', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });

/* ── Mobile menu ── */
const burger = document.querySelector('.nav-burger');
const menu   = document.querySelector('.nav-menu');
if (burger && menu) {
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── Scroll reveal ── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.07 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ── Google Form ── */
const form = document.getElementById('aegis-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    fetch(
      'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdkoXYSqU5acMJ6nlqKnnphIzMBtnoANGe2U7RZIALodlx_9w/formResponse',
      { method: 'POST', mode: 'no-cors', body: new FormData(form) }
    ).finally(() => {
      form.style.display = 'none';
      document.getElementById('form-ok').style.display = 'block';
    });
  });
}