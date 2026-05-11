// ── NAVBAR TOGGLE ──
function toggleNav() {
  const links = document.getElementById('navLinks');
  links.classList.toggle('open');
}

// ── NAVBAR SCROLL EFFECT ──
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.12)';
    } else {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    }
  }
});

// ── COUNTER ANIMATION ──
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      if (target >= 1000) {
        counter.textContent = (current >= 1000)
          ? (current / 1000).toFixed(0) + 'K+'
          : Math.floor(current).toLocaleString();
      } else {
        counter.textContent = Math.floor(current) + '+';
      }
    }, 16);
  });
}

// ── INTERSECTION OBSERVER for counters ──
const statsBanner = document.querySelector('.stats-banner');
if (statsBanner) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(statsBanner);
}

// ── SCROLL REVEAL ANIMATION ──
const revealElements = document.querySelectorAll(
  '.service-card, .why-card, .testimonial-card, .result-item, .timeline-item, .schedule-card, .service-detail-card, .expertise-item, .big-schedule-card, .chero-card'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ── IMAGE MODAL (Results page) ──
function openModal(el) {
  const img = el.querySelector('img');
  if (!img) return;
  const overlay = document.getElementById('modalOverlay');
  const modalImg = document.getElementById('modalImg');
  if (!overlay || !modalImg) return;
  modalImg.src = img.src;
  modalImg.alt = img.alt;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ── CONTACT FORM SUBMIT ──
function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const msg = document.getElementById('successMsg');
  if (!btn || !msg) return;

  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✓ Request Sent!';
    msg.style.display = 'block';
    document.getElementById('contactForm').reset();
    setTimeout(() => {
      btn.innerHTML = '<i class="fa fa-paper-plane"></i> Send Appointment Request';
      btn.disabled = false;
      msg.style.display = 'none';
    }, 5000);
  }, 1200);
}

// ── ACTIVE NAV LINK ──
(function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) {
      link.classList.add('active');
    }
  });
})();

// ── SMOOTH HOVER on result items ──
document.querySelectorAll('.result-item').forEach(item => {
  item.style.cursor = 'pointer';
});
