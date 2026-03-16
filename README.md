<div align="center">
  <h1>🫛 Pea Pod Network</h1>
  <p><em>A cozy corner of the internet — powered by green energy &amp; good vibes</em></p>

  [![Deployed on Cloudflare](https://img.shields.io/badge/Deployed%20on-Cloudflare-F38020?logo=cloudflare&logoColor=white)](https://cloudflare.com)
  [![Hosted on GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222?logo=github&logoColor=white)](https://pages.github.com)
  [![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa&logoColor=white)](#progressive-web-app)
  [![Vanilla JS](https://img.shields.io/badge/Built%20with-Vanilla%20JS-F7DF1E?logo=javascript&logoColor=black)](#tech-stack)
  [![License](https://img.shields.io/github/license/ks1686/pea-pod)](LICENSE)
</div>

---

## 📖 About

**Pea Pod Network** is the public-facing homepage for a personal self-hosted network. It acts as a central hub with two main purposes:

1. **Quick Links** — direct shortcuts to external profiles (Resume, GitHub, LinkedIn).
2. **Services Directory** — a curated list of self-hosted services running on the home network, each with a clear public/private badge.

The site is a dependency-free static web app: pure HTML, CSS, and vanilla JavaScript — no build step required. It is deployed globally via Cloudflare Workers and installable as a [Progressive Web App](#progressive-web-app).

---

## ✨ Features

- **🗂️ Unified dashboard** — profile shortcuts and self-hosted services in one place
- **🏷️ Status badges** — visual indicators for Private / Public service visibility
- **🎞️ Scroll animations** — cards fade in smoothly as they enter the viewport (IntersectionObserver)
- **💧 Ripple effect** — satisfying click feedback on every interactive card
- **📱 Fully responsive** — CSS Grid layout adapts from mobile to wide desktop
- **♿ Accessible** — semantic HTML, ARIA labels, keyboard navigation, and `prefers-reduced-motion` support
- **📲 PWA** — installable as a standalone app with its own icon and theme colour
- **⚡ Zero dependencies** — no npm, no bundler, no framework overhead

---

## 🔗 Quick Links

| Card | Destination |
|------|-------------|
| 📄 **Resume** | [ks1686.github.io](https://ks1686.github.io) |
| 🐙 **GitHub** | [github.com/ks1686](https://github.com/ks1686) |
| 💼 **LinkedIn** | [linkedin.com/in/karim-smires](https://www.linkedin.com/in/karim-smires/) |

---

## 🏠 Self-Hosted Services

| Icon | Service | URL | Visibility |
|------|---------|-----|------------|
| ⚗️ | **Forgejo** | forgejo.pea-pod.me | 🔒 Private |
| 🏠 | **Homebridge** | homebridge.pea-pod.me | 🔒 Private |
| 💻 | **code-server** | code.pea-pod.me | 🔒 Private |
| 🛡️ | **AdGuard** | adguard.pea-pod.me | 🔒 Private |
| 📊 | **Status Monitor** | [monitor.pea-pod.me](https://monitor.pea-pod.me) | 🌐 Public |

> **Private** services are only reachable on the internal home network. **Public** services are accessible from anywhere.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic elements) |
| Styling | CSS3 — Grid, Flexbox, CSS Variables, keyframe animations, backdrop-filter |
| Scripting | Vanilla JavaScript (ES6+) |
| Fonts | [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts |
| Hosting | [GitHub Pages](https://pages.github.com) |
| CDN / Deploy | [Cloudflare Workers](https://workers.cloudflare.com) via [Wrangler](https://developers.cloudflare.com/workers/wrangler/) |
| PWA | Web App Manifest + service worker support |

---

## 📁 Project Structure

```
pea-pod/
├── index.html          # Main page — structure & content
├── css/
│   └── styles.css      # All styling: layout, animations, colour palette
├── js/
│   └── app.js          # Scroll animations, ripple effect, service card wiring
├── icons/
│   ├── icon-192.png    # PWA icon (192 × 192)
│   └── icon-512.png    # PWA icon (512 × 512)
├── favicon.png         # Browser tab icon
├── apple-touch-icon.png
├── manifest.json       # PWA manifest (name, theme colour, icons)
├── wrangler.jsonc      # Cloudflare Workers configuration
└── _headers            # HTTP response headers (cache control)
```

---

## 🚀 Running Locally

No build step is required. Serve the project root with any static file server:

```bash
# Using the Wrangler CLI (mirrors the production Cloudflare setup)
npx wrangler dev

# Or with Python's built-in server
python3 -m http.server 8080
# → open http://localhost:8080
```

---

## ☁️ Deployment

The site is deployed automatically through **Cloudflare Workers** using `wrangler.jsonc`:

```bash
# Deploy to production
npx wrangler deploy
```

Key Wrangler settings (`wrangler.jsonc`):

| Setting | Value |
|---------|-------|
| `name` | `pea-pod` |
| `compatibility_date` | `2025-09-27` |
| `assets.directory` | `.` (entire repo root) |
| `compatibility_flags` | `nodejs_compat` |
| `observability` | enabled |

---

## 📲 Progressive Web App

The site ships a full PWA manifest (`manifest.json`):

- **App name:** Pea Pod Network
- **Display mode:** `standalone` (hides browser chrome when installed)
- **Theme colour:** `#16a34a` (green)
- **Icons:** 192 × 192 and 512 × 512 PNG

Install it from Chrome / Edge / Safari using the browser's *"Add to Home Screen"* / *"Install App"* option.

---

## ♿ Accessibility

- Semantic landmark elements (`<header>`, `<main>`, `<footer>`, `<section>`)
- Descriptive `aria-label` attributes on every interactive element
- Full keyboard navigation for service cards (`Enter` / `Space` to activate)
- `prefers-reduced-motion` media query disables animations for users who request it
- `:focus-visible` outlines on all focusable elements

---

<div align="center">
  <sub>🫛 Pea Pod Network — hosted on <a href="https://pages.github.com">GitHub Pages</a> &amp; served via <a href="https://cloudflare.com">Cloudflare</a></sub>
</div>
