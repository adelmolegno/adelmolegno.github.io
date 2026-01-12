// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 60; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.background = 'rgba(61, 40, 23, 0.98)';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.background = 'rgba(61, 40, 23, 0.95)';
    navbar.style.boxShadow = '0 2px 10px rgba(61, 40, 23, 0.2)';
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe gallery items and features
document.querySelectorAll('.gallery-item, .feature').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && message) {
      // In a real application, you would send this to a server
      // For now, we'll just show an alert
      alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
      
      // Reset form
      contactForm.reset();
}
  });
}

// Subtle parallax effect (safe): move ONLY the wood-grain background, not the layout
const woodOverlay = document.querySelector('.wood-grain-overlay');
window.addEventListener('scroll', () => {
  if (!woodOverlay) return;
  const scrolled = window.pageYOffset;
  const offset = Math.round(scrolled * 0.08);
  woodOverlay.style.backgroundPosition = `${offset}px ${offset}px`;
});

// Gallery item hover effect enhancement
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s ease';
  });
});

// Add wood texture animation on load
window.addEventListener('load', () => {
  if (woodOverlay) {
    woodOverlay.style.animation = 'grainMove 20s linear infinite';
  }
});

// Add CSS animation for wood grain (via style injection)
const style = document.createElement('style');
style.textContent = `
  @keyframes grainMove {
    0% { background-position: 0 0; }
    100% { background-position: 100px 100px; }
  }
`;
document.head.appendChild(style);
