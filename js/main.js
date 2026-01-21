// Intersection Observer for Fade-in Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
        });
    });
}

document.getElementById('google-form').addEventListener('submit', function(e) {
  e.preventDefault(); // prevent default form submission

  const form = e.target;
  const data = new FormData(form);

  // Construct the Google Form POST URL
  const url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdkoXYSqU5acMJ6nlqKnnphIzMBtnoANGe2U7RZIALodlx_9w/formResponse';

  // Use fetch to submit the form in the background
  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    body: data
  })
  .then(() => {
    // Show success message
    form.style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
  })
  .catch((err) => {
    console.error('Error submitting form', err);
  });
});
