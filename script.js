/* ── Greeting ── */
(function setGreeting() {
  const h = new Date().getHours();
  const g = h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening';
  document.getElementById('greeting').textContent = `${g} 👋 I'm`;
})();

/* ── Navbar scroll effect ── */
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Mobile menu toggle ── */
const menuBtn = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── Scroll reveal (IntersectionObserver) ── */
const revealEls = document.querySelectorAll(
  '.glass-card, .section-title, .hero-content > *, .timeline-item, .project-card, .edu-card, .skill-card'
);
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

/* ── Active nav highlight ── */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
});

/* ── Contact form validation ── */
const form = document.getElementById('contact-form');
const nameIn = document.getElementById('cf-name');
const emailIn = document.getElementById('cf-email');
const msgIn = document.getElementById('cf-message');

// Reject numbers and special chars in name field
nameIn.addEventListener('input', () => {
  nameIn.value = nameIn.value.replace(/[^a-zA-Z\s]/g, '');
});

form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;
  // Name
  if (!nameIn.value.trim() || /[^a-zA-Z\s]/.test(nameIn.value)) {
    document.getElementById('err-name').textContent = 'Please enter a valid name (letters only).';
    valid = false;
  } else {
    document.getElementById('err-name').textContent = '';
  }
  // Email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailIn.value)) {
    document.getElementById('err-email').textContent = 'Please enter a valid email.';
    valid = false;
  } else {
    document.getElementById('err-email').textContent = '';
  }
  // Message
  if (!msgIn.value.trim()) {
    document.getElementById('err-message').textContent = 'Please enter a message.';
    valid = false;
  } else {
    document.getElementById('err-message').textContent = '';
  }
  if (valid) {
    document.getElementById('form-success').textContent = '✅ Message sent successfully!';
    form.reset();
    setTimeout(() => { document.getElementById('form-success').textContent = ''; }, 4000);
  }
});

/* ── Tilt effect on project cards ── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
    card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
