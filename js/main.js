/* =========================================================
   NAVBAR — scroll class
   ========================================================= */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* =========================================================
   MOBILE MENU
   ========================================================= */
const menuBtn  = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  // Close menu when any nav link is clicked
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* =========================================================
   SCROLL-TRIGGERED FADE-UP ANIMATIONS
   ========================================================= */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.07 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* =========================================================
   GOOGLE FORM SUBMISSION
   ========================================================= */
const form = document.getElementById('google-form');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const submitBtn = form.querySelector('.form-submit');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    fetch(
      'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdkoXYSqU5acMJ6nlqKnnphIzMBtnoANGe2U7RZIALodlx_9w/formResponse',
      { method: 'POST', mode: 'no-cors', body: new FormData(form) }
    )
    .then(() => {
      form.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    })
    .catch(() => {
      // Even if fetch errors (CORS), the form likely submitted — show success
      form.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    });
  });
}