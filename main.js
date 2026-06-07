/* ===================================================
   La Mandarina — main.js
   Restaurant Schoperia La Mandarina · San Joaquín
   =================================================== */

// Navegación con scroll suave y efecto en navbar
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    nav.style.background = window.scrollY > 80
      ? 'rgba(20, 8, 0, 0.97)'
      : 'var(--cafe-oscuro)';
  }
});

// Menú hamburger para mobile
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });
  // Cerrar al hacer clic en un enlace
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.textContent = '☰';
    });
  });
}

// Animación de entrada para las cards al hacer scroll (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

// Aplicar animación a cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll(
    '.carne-card, .res-card, .amb-car, .local-card'
  );
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });
});

// Año dinámico en footer
const yearEl = document.querySelector('.footer-bottom p');
if (yearEl) {
  const currentYear = new Date().getFullYear();
  yearEl.textContent = yearEl.textContent.replace('2026', currentYear);
}
