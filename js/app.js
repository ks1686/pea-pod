/**
 * Pea Pod Network - app.js
 * Terminal shell interactions: motion, menu, copy, typing hero.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initCardRipple();
  initBurgerMenu();
  initAnnouncementBanner();
  initCopyButtons();
  initHeroTyping();
});

/**
 * Intersection Observer for scroll-triggered reveal animations.
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
    { threshold: 0.12 }
  );

  document.querySelectorAll('.card, .section').forEach((el) => {
    observer.observe(el);
  });
}

/**
 * Ripple effect on card clicks for tactile feedback.
 */
function initCardRipple() {
  document.querySelectorAll('.card').forEach((card) => {
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
  const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#4ade80';

  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    border-radius: 50%;
    background: ${accent};
    opacity: 0.22;
    transform: scale(0);
    animation: rippleEffect 0.5s ease-out forwards;
    pointer-events: none;
  `;

  card.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

/**
 * Dismissible announcement banners (project pages).
 */
function initAnnouncementBanner() {
  const banner = document.getElementById('announcement-banner');
  const closeBtn = document.getElementById('banner-close');
  if (!banner || !closeBtn) return;

  const theme = document.body.dataset.theme || 'pea-pod';
  const storageKey = `${theme}-banner-dismissed`;

  if (localStorage.getItem(storageKey) === '1') {
    banner.classList.add('hidden');
    return;
  }

  closeBtn.addEventListener('click', () => {
    banner.classList.add('hidden');
    localStorage.setItem(storageKey, '1');
  });
}

function initBurgerMenu() {
  const burgerBtn = document.getElementById('burger-btn');
  const sideMenu = document.getElementById('side-menu');
  const overlay = document.getElementById('menu-overlay');
  const closeBtn = document.getElementById('side-menu-close');

  if (!burgerBtn || !sideMenu || !overlay || !closeBtn) return;

  const chrome = document.querySelectorAll('header, main, footer, .bg-decoration, .announcement-banner');

  function setChromeInert(on) {
    chrome.forEach((el) => {
      if (on) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
  }

  function focusableInMenu() {
    return Array.from(sideMenu.querySelectorAll('a[href], button:not([disabled])'));
  }

  function openMenu() {
    sideMenu.classList.add('open');
    overlay.classList.add('open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    sideMenu.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setChromeInert(true);
    closeBtn.focus();
  }

  function closeMenu() {
    sideMenu.classList.remove('open');
    overlay.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    sideMenu.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setChromeInert(false);
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
    if (!sideMenu.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeMenu();
      return;
    }

    if (e.key !== 'Tab') return;

    const items = focusableInMenu();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  sideMenu.querySelectorAll('.side-menu-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (link.hash) {
        closeMenu();
      }
    });
  });
}

/**
 * Copy-to-clipboard for install command blocks.
 */
function initCopyButtons() {
  const checkSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>';
  const clipSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5h-.5A1.5 1.5 0 0 0 3 3h10a1.5 1.5 0 0 0-1.5-1.5H11A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>';

  let live = document.getElementById('copy-status');
  if (!live) {
    live = document.createElement('div');
    live.id = 'copy-status';
    live.className = 'visually-hidden';
    live.setAttribute('aria-live', 'polite');
    document.body.appendChild(live);
  }

  function announce(message) {
    live.textContent = '';
    window.requestAnimationFrame(() => {
      live.textContent = message;
    });
  }

  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const block = btn.closest('.genv-install-block, .pt-install-block, .ppx-install-block');
      if (!block) return;
      const lines = Array.from(block.querySelectorAll('.install-cmd')).map((el) => el.textContent.trim());
      const text = lines.filter((line) => line && !line.startsWith('#')).join('\n');
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = checkSVG;
        announce('Copied');
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = clipSVG;
        }, 2000);
      }).catch(() => {
        btn.title = 'Copy failed';
        announce('Copy failed');
        setTimeout(() => { btn.title = 'Copy'; }, 2000);
      });
    });
  });
}

/**
 * Homepage terminal typing intro.
 */
function initHeroTyping() {
  const host = document.getElementById('hero-prompt');
  if (!host) return;

  const typed = host.querySelector('.prompt-typed');
  const full = host.dataset.prompt || '';
  if (!typed || !full) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    typed.textContent = full;
    host.classList.add('is-done');
    return;
  }

  let i = 0;
  const tick = () => {
    typed.textContent = full.slice(0, i);
    i += 1;
    if (i <= full.length) {
      const delay = full[i - 1] === ' ' ? 28 : 22 + Math.random() * 28;
      window.setTimeout(tick, delay);
    } else {
      host.classList.add('is-done');
    }
  };

  window.setTimeout(tick, 350);
}
