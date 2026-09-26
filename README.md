<div align="center">
  <h1>🫛 Pea Pod Network</h1>
  <p><em>A cozy corner of the internet — powered by green energy &amp; good vibes</em></p>

  [![Deployed on Cloudflare](https://img.shields.io/badge/Deployed%20on-Cloudflare-F38020?logo=cloudflare&logoColor=white)](https://cloudflare.com)
  [![Vanilla JS](https://img.shields.io/badge/Built%20with-Vanilla%20JS-F7DF1E?logo=javascript&logoColor=black)](#tech-stack)
  [![License](https://img.shields.io/github/license/ks1686/pea-pod)](LICENSE)
</div>

---

## 📖 About

**Pea Pod Network** is the public-facing homepage for a personal project hub. It acts as a central launchpad with:

1. **Quick Links** — direct shortcuts to external profiles (Resume, GitHub, LinkedIn).
2. **Project pages** — documentation for open-source tools like [GENV](https://pea-pod.me/genv/), [Public Terminal](https://pea-pod.me/public-terminal/), and [PeaProxy](https://pea-pod.me/peaproxy/).

The site is a dependency-free static web app: pure HTML, CSS, and vanilla JavaScript — no build step required. It is deployed globally via Cloudflare Workers and can be added to the home screen from its [web app manifest](#web-app-manifest).

---

## ✨ Features

- **🗂️ Unified dashboard** — profile shortcuts and project documentation in one place
- **🎞️ Scroll animations** — cards fade in smoothly as they enter the viewport (IntersectionObserver)
- **💧 Ripple effect** — satisfying click feedback on every interactive card
- **📱 Fully responsive** — CSS Grid layout adapts from mobile to wide desktop
- **♿ Accessible** — semantic HTML, ARIA labels, keyboard navigation, and `prefers-reduced-motion` support
- **📲 Installable** — web app manifest with its own icon and theme colour
- **⚡ Zero dependencies** — no npm, no bundler, no framework overhead

---

## 🔗 Quick Links

| Card | Destination |
|------|-------------|
| 📄 **Resume** | [ks1686.github.io](https://ks1686.github.io) |
| 🐙 **GitHub** | [github.com/ks1686](https://github.com/ks1686) |
| 💼 **LinkedIn** | [linkedin.com/in/karim-smires](https://www.linkedin.com/in/karim-smires/) |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic elements) |
| Styling | CSS3 — Grid, Flexbox, CSS Variables, keyframe animations, backdrop-filter |
| Scripting | Vanilla JavaScript (ES6+) |
| Fonts | [Sora](https://fonts.google.com/specimen/Sora) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts |
| Deploy | [Cloudflare Workers](https://workers.cloudflare.com) via [Wrangler](https://developers.cloudflare.com/workers/wrangler/) |
| Manifest | Web App Manifest (`standalone`) |

---

## 📁 Project Structure

```
pea-pod/
├── index.html              # Main page — structure & content
├── changelogs.html         # Changelog page
├── 404.html                # Themed not-found page
├── css/
│   ├── styles.css          # Global styling: layout, animations, colour palette
│   ├── genv.css            # GENV page accents
│   ├── public-terminal.css # Styles for the Public Terminal page
│   └── peaproxy.css        # Styles for the PeaProxy page
├── js/
│   ├── app.js              # Scroll animations, ripple effect, UI helpers
│   └── changelogs.js       # GitHub commit timeline
├── genv/
│   └── index.html          # GENV project page
├── public-terminal/
│   └── index.html          # Public Terminal project page
├── peaproxy/
│   └── index.html          # PeaProxy project page
├── docs/                   # Design specs and implementation plans
├── icons/
│   ├── icon-192.png        # PWA icon (192 × 192)
│   └── icon-512.png        # PWA icon (512 × 512)
├── favicon.png             # Browser tab icon
├── apple-touch-icon.png
├── manifest.json           # PWA manifest (name, theme colour, icons)
├── wrangler.jsonc          # Cloudflare Workers configuration
└── _headers                # HTTP response headers (cache control)
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

# Same checks GitHub Actions runs on every PR
bash scripts/ci-check.sh
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
| `compatibility_date` | `2026-08-15` |
| `assets.directory` | `.` (entire repo root) |
| `assets.not_found_handling` | `404-page` |
| `observability` | enabled |

---

## 📲 Web App Manifest

The site ships a web app manifest (`manifest.json`):

- **App name:** Pea Pod Network
- **Display mode:** `standalone` (hides browser chrome when installed)
- **Theme colour:** `#4ade80`
- **Icons:** 192 × 192 and 512 × 512 PNG

There is no service worker, so the site is not offline-capable. Install it from Chrome / Edge / Safari using *Add to Home Screen* / *Install App*.

---

## ♿ Accessibility

- Semantic landmark elements (`<header>`, `<main>`, `<footer>`, `<section>`)
- Descriptive `aria-label` attributes on every interactive element
- Full keyboard navigation for interactive cards (`Enter` / `Space` to activate)
- `prefers-reduced-motion` media query disables animations for users who request it
- `:focus-visible` outlines on all focusable elements

---

<div align="center">
  <sub>🫛 Pea Pod Network — deployed on <a href="https://workers.cloudflare.com">Cloudflare Workers</a></sub>
</div>
