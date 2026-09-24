// Smooth scroll for in-page nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('navLinks')?.classList.remove('is-open');
  });
});
 
// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('is-open');
});

// Highlight active nav link based on section in view
const sections = document.querySelectorAll('section[id], header[id]');
const links = document.querySelectorAll('.nav_links a');
const navOffset = 130; // roughly the sticky nav height + a little breathing room

const highlightNav = () => {
  const scrollPos = window.scrollY + navOffset;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

  let current = sections[0]?.getAttribute('id') || '';

  if (atBottom) {
    // Can't scroll any further, so whatever the last section is counts as active,
    // even if its top never reaches navOffset.
    current = sections[sections.length - 1]?.getAttribute('id') || current;
  } else {
    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        current = section.getAttribute('id');
      }
    });
  }

  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};
window.addEventListener('scroll', highlightNav);
window.addEventListener('resize', highlightNav);
highlightNav();

// Reveal elements on scroll
const revealTargets = document.querySelectorAll(
  '.skill-file, .project, .section_heading, .lead'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));