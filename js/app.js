/**
 * Pea Pod Network - app.js
 * Handles smooth animations and shortcut card functionality.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initCardRipple();
  initServiceCards();
  initBurgerMenu();
  initAnnouncementBanner();
});

/**
 * Intersection Observer for scroll-triggered fade-in animations.
 * Cards that start off-screen will animate in as they enter the viewport.
 */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.card, .section').forEach((el) => {
    observer.observe(el);
  });
}

/**
 * Ripple effect on card clicks for tactile feedback.
 */
function initCardRipple() {
  document.querySelectorAll('.card:not(.service-card)').forEach((card) => {
    card.addEventListener('click', createRipple);
  });

  document.querySelectorAll('.card.service-card.active').forEach((card) => {
    card.addEventListener('click', createRipple);
  });
}

function createRipple(event) {
  const card = event.currentTarget;
  const ripple = document.createElement('span');
  const rect = card.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    border-radius: 50%;
    background: rgba(74, 222, 128, 0.25);
    transform: scale(0);
    animation: rippleEffect 0.5s ease-out forwards;
    pointer-events: none;
  `;

  card.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

/**
 * Service cards — when a service is deployed, set data-url and data-status="online"
 * on the card element, then call activateServiceCard() or reload the page.
 * This function wires up click handlers for any already-active service cards.
 */
function initServiceCards() {
  document.querySelectorAll('.card.service-card[data-url]').forEach((card) => {
    const url = card.dataset.url;
    if (url) {
      card.classList.add('active');
      card.setAttribute('role', 'link');
      card.setAttribute('tabindex', '0');
      card.addEventListener('click', () => window.open(url, '_blank', 'noopener noreferrer'));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.open(url, '_blank', 'noopener noreferrer');
        }
      });
    }
  });
}

// Inject ripple keyframe once
(function injectRippleStyle() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleEffect {
      to { transform: scale(2.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();

/**
 * Announcement banner — dismissible, remembers state in localStorage.
 */
function initAnnouncementBanner() {
  const banner = document.getElementById('announcement-banner');
  const closeBtn = document.getElementById('banner-close');
  if (!banner || !closeBtn) return;

  if (localStorage.getItem('gpm-banner-dismissed') === '1') {
    banner.classList.add('hidden');
    return;
  }

  closeBtn.addEventListener('click', () => {
    banner.classList.add('hidden');
    localStorage.setItem('gpm-banner-dismissed', '1');
  });
}
 */
function initBurgerMenu() {
  const burgerBtn = document.getElementById('burger-btn');
  const sideMenu = document.getElementById('side-menu');
  const overlay = document.getElementById('menu-overlay');
  const closeBtn = document.getElementById('side-menu-close');

  if (!burgerBtn || !sideMenu || !overlay || !closeBtn) return;

  function openMenu() {
    sideMenu.classList.add('open');
    overlay.classList.add('open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    sideMenu.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeMenu() {
    sideMenu.classList.remove('open');
    overlay.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    sideMenu.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    burgerBtn.focus();
  }

  burgerBtn.addEventListener('click', () => {
    if (sideMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sideMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close the menu when an anchor link is clicked (in-page or cross-page with hash)
  sideMenu.querySelectorAll('.side-menu-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (link.hash) {
        closeMenu();
      }
    });
  });
}
