// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      event.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const form = document.querySelector('.contact-form');

if (form) {
  form.addEventListener('submit', () => {
    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.textContent = 'Opening Email...';
    }
  });
}

// Reveal elements on scroll
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!prefersReducedMotion.matches) {
  const revealElements = document.querySelectorAll('.hero-grid, .about-grid, .skill-list, .project-grid, .contact-grid');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

// Filter functionality for project cards
// const filterButtons = document.querySelectorAll('.filter');
// const projectCards = document.querySelectorAll('.project-card');

// filterButtons.forEach((button) => {
//   button.addEventListener('click', () => {
//     const selectedFilter = button.getAttribute('data-filter');

//     filterButtons.forEach((btn) => {
//       btn.classList.remove('active');
//     });

//     button.classList.add('active');

//     projectCards.forEach((card) => {
//       const cardCategory = card.getAttribute('data-category');

//       if (selectedFilter === 'all' || selectedFilter === cardCategory) {
//         card.style.display = 'grid';
//       } else {
//         card.style.display = 'none';
//       }
//     });
//   });
// });
