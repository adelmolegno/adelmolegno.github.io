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

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('navMenu');

function setNavOpen(isOpen) {
  if (!navToggle || !navMenu) return;
  navMenu.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Chiudi menu' : 'Apri menu');
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.contains('is-open');
    setNavOpen(!open);
  });

  // Close menu after clicking a link
  navMenu.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', () => setNavOpen(false));
  });

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setNavOpen(false);
  });

  // Ensure menu is closed when switching to desktop widths
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) setNavOpen(false);
  });
}

// Trustpilot reviews slideshow (curated excerpts)
const TRUSTPILOT_URL = 'https://www.trustpilot.com/review/adelmolegno.it';
const reviews = [
  {
    author: 'Paola',
    date: 'Nov 30, 2025',
    rating: 5,
    text:
      "Navigando per caso su internet in cerca di basette per figurini modellismo sono stata catturata dalla originalità dei prodotti di Adelmo un artista del legno. Ne ho comprata una per verificare dal vivo. Mi ha enormemente sorpreso per l’ottima qualità. Le sue non sono semplici basette ma opere d’arte."
  },
  {
    author: 'Umberto',
    date: 'Nov 14, 2025',
    rating: 5,
    text:
      "Basette bellissime, prezzo più che corretto e soprattutto si acquista da una persona gentilissima, corretta e ultra precisa. Adelmo è riuscito anche ad anticipare i tempi per una mostra."
  },
  {
    author: 'Vittorio',
    date: 'Dec 22, 2025',
    rating: 5,
    text:
      "Dal 2023 sono diventato un cliente affezionato e ho ordinato più volte basette su misura, rimanendo sempre soddisfatto dei risultati."
  },
  {
    author: 'Luciano',
    date: 'Aug 14, 2025',
    rating: 5,
    text:
      "Da anni cercavo un prodotto simile e finalmente l’ho trovato! Basi di supporto per figurini davvero ben fatte: qualità e cura nei dettagli."
  },
  {
    author: 'Benedetto',
    date: 'Oct 7, 2025',
    rating: 5,
    text:
      "Altissima professionalità. Persona gentilissima, disponibile e molto appassionata in ciò che fa. Nel mondo del modellismo, risultati eccellenti."
  }
];

const reviewCard = document.getElementById('reviewCard');
const reviewAuthor = document.getElementById('reviewAuthor');
const reviewDate = document.getElementById('reviewDate');
const reviewRating = document.getElementById('reviewRating');
const reviewText = document.getElementById('reviewText');
const reviewPrev = document.getElementById('reviewPrev');
const reviewNext = document.getElementById('reviewNext');
const reviewDots = document.getElementById('reviewDots');

let reviewIdx = 0;
let reviewTimer = null;

function starString(n) {
  const full = '★'.repeat(Math.max(0, Math.min(5, n)));
  const empty = '☆'.repeat(5 - full.length);
  return full + empty;
}

function renderReview(i) {
  if (!reviewAuthor || !reviewDate || !reviewRating || !reviewText) return;
  const r = reviews[i];
  reviewAuthor.textContent = r.author;
  reviewDate.textContent = r.date;
  reviewRating.textContent = starString(r.rating);
  reviewRating.setAttribute('aria-label', `Valutazione ${r.rating} su 5`);
  reviewText.textContent = r.text;

  if (reviewDots) {
    [...reviewDots.querySelectorAll('.reviews-dot')].forEach((d, idx) => {
      d.classList.toggle('is-active', idx === i);
      d.setAttribute('aria-current', idx === i ? 'true' : 'false');
    });
  }
}

function goReview(nextIdx) {
  reviewIdx = (nextIdx + reviews.length) % reviews.length;
  renderReview(reviewIdx);
}

function startReviewAuto() {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;
  stopReviewAuto();
  reviewTimer = window.setInterval(() => goReview(reviewIdx + 1), 6500);
}

function stopReviewAuto() {
  if (reviewTimer) window.clearInterval(reviewTimer);
  reviewTimer = null;
}

if (reviewCard && reviews.length) {
  // Build dots
  if (reviewDots) {
    reviewDots.innerHTML = '';
    reviews.forEach((_, idx) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'reviews-dot';
      b.setAttribute('aria-label', `Vai alla recensione ${idx + 1}`);
      b.addEventListener('click', () => {
        stopReviewAuto();
        goReview(idx);
        startReviewAuto();
      });
      reviewDots.appendChild(b);
    });
  }

  renderReview(reviewIdx);
  startReviewAuto();

  if (reviewPrev) {
    reviewPrev.addEventListener('click', () => {
      stopReviewAuto();
      goReview(reviewIdx - 1);
      startReviewAuto();
    });
  }

  if (reviewNext) {
    reviewNext.addEventListener('click', () => {
      stopReviewAuto();
      goReview(reviewIdx + 1);
      startReviewAuto();
    });
  }

  // Pause auto-rotate when interacting
  reviewCard.addEventListener('mouseenter', stopReviewAuto);
  reviewCard.addEventListener('mouseleave', startReviewAuto);
  reviewCard.addEventListener('focusin', stopReviewAuto);
  reviewCard.addEventListener('focusout', startReviewAuto);
}

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.background = 'rgba(42, 20, 8, 0.98)';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.background = 'rgba(42, 20, 8, 0.95)';
    navbar.style.boxShadow = '0 2px 10px rgba(42, 20, 8, 0.22)';
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

// Contact form removed (static GitHub Pages site): email + socials live in the contact section.

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
