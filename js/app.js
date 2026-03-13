/**
 * Pea Pod - app.js
 * Smooth animations, shortcut card functionality, and services infrastructure
 */

'use strict';

/* ============================================================
   Constants & Config
   ============================================================ */

/** Base configuration – extend services here when ready */
const CONFIG = {
  networkName: 'Pea Pod Network',
  version: '1.0.0',
  /** Future self-hosted services will be added to this array.
   *  Each object must have: id, title, description, icon, url, tag
   *  Set `comingSoon: true` to render as a placeholder. */
  services: [
    // Example structure (remove `comingSoon` and add a real URL to activate):
    // {
    //   id: 'service-example',
    //   title: 'My Service',
    //   description: 'A brief description of what this service does.',
    //   icon: '🔧',
    //   url: 'https://service.example.com',
    //   tag: 'Service',
    //   comingSoon: false,
    // },
  ],
};

/* ============================================================
   DOM Helpers
   ============================================================ */

/**
 * Query a single element; throws if not found.
 * @param {string} selector
 * @param {Element|Document} [root=document]
 * @returns {Element}
 */
function $(selector, root = document) {
  const el = root.querySelector(selector);
  if (!el) throw new Error(`Element not found: ${selector}`);
  return el;
}

/**
 * Query all matching elements as an Array.
 * @param {string} selector
 * @param {Element|Document} [root=document]
 * @returns {Element[]}
 */
function $$(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

/* ============================================================
   Shortcut Card Builder
   Generates card HTML from a service config object.
   ============================================================ */

/**
 * Build a shortcut card DOM element.
 * @param {{ id: string, title: string, description: string, icon: string,
 *           url: string, tag: string, comingSoon?: boolean }} service
 * @returns {HTMLAnchorElement|HTMLDivElement}
 */
function buildServiceCard(service) {
  const isPlaceholder = Boolean(service.comingSoon);
  const tag = document.createElement(isPlaceholder ? 'div' : 'a');

  tag.className = `shortcut-card${isPlaceholder ? ' shortcut-card--placeholder' : ''}`;
  tag.setAttribute('data-card-id', service.id);

  if (!isPlaceholder) {
    tag.href = service.url;
    tag.target = '_blank';
    tag.rel = 'noopener noreferrer';
    tag.setAttribute('aria-label', `Open ${service.title}`);
  } else {
    tag.setAttribute('aria-disabled', 'true');
    tag.setAttribute('role', 'article');
  }

  tag.innerHTML = `
    <span class="card-shine" aria-hidden="true"></span>
    <div class="card-icon-wrap" aria-hidden="true">${service.icon}</div>
    <div class="card-content">
      <div class="card-title">${escapeHtml(service.title)}</div>
      <p class="card-description">${escapeHtml(service.description)}</p>
    </div>
    <div class="card-footer">
      <span class="card-tag">${escapeHtml(service.tag)}</span>
      ${isPlaceholder
        ? '<span class="card-tag">Coming Soon</span>'
        : '<span class="card-arrow" aria-hidden="true">↗</span>'}
    </div>
  `;

  return tag;
}

/**
 * Minimal HTML escaping to prevent XSS in dynamic card content.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ============================================================
   Services Section Renderer
   ============================================================ */

/**
 * Renders service cards into the services grid container.
 * If no services are configured, the section remains hidden.
 */
function renderServices() {
  const section = document.getElementById('services-section');
  const grid = document.getElementById('services-grid');

  if (!section || !grid) return;

  const { services } = CONFIG;

  if (!services || services.length === 0) {
    // No services yet – keep section hidden
    section.hidden = true;
    return;
  }

  section.hidden = false;

  // Clear any existing cards
  grid.innerHTML = '';

  services.forEach((service, index) => {
    const card = buildServiceCard(service);
    // Stagger animation
    card.style.animationDelay = `${(index + 1) * 0.1}s`;
    grid.appendChild(card);
  });
}

/* ============================================================
   Intersection Observer – Fade-in on scroll
   ============================================================ */

/**
 * Set up an IntersectionObserver so cards that enter the viewport
 * fade in with a subtle upward motion (supplements CSS keyframes).
 */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  $$('.shortcut-card, .section-header, .hero').forEach((el) => {
    observer.observe(el);
  });
}

/* ============================================================
   Header – dynamic scroll behaviour
   ============================================================ */

function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 80) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ============================================================
   Card ripple effect on click
   ============================================================ */

function initCardRipple() {
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.shortcut-card:not(.shortcut-card--placeholder)');
    if (!card) return;

    const ripple = document.createElement('span');
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
      background: rgba(92, 184, 92, 0.2);
      border-radius: 50%;
      transform: scale(0);
      animation: rippleAnim 500ms ease-out forwards;
      pointer-events: none;
      z-index: 0;
    `;

    // Inject ripple keyframes once
    if (!document.getElementById('ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = '@keyframes rippleAnim { to { transform: scale(2.5); opacity: 0; } }';
      document.head.appendChild(style);
    }

    card.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
}

/* ============================================================
   Live clock in footer
   ============================================================ */

function initClock() {
  const clockEl = document.getElementById('footer-clock');
  if (!clockEl) return;

  function tick() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  tick();
  setInterval(tick, 60_000);
}

/* ============================================================
   Keyboard navigation polish
   ============================================================ */

function initKeyboardNav() {
  // Make non-anchor cards keyboard focusable if needed in future
  $$('.shortcut-card[role="article"]').forEach((card) => {
    card.setAttribute('tabindex', '-1'); // not focusable if placeholder
  });
}

/* ============================================================
   App Entry Point
   ============================================================ */

function init() {
  renderServices();
  initScrollAnimations();
  initHeader();
  initCardRipple();
  initClock();
  initKeyboardNav();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
