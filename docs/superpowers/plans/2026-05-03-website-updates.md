# Website Updates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sync homelab service cards, bump genv to v2.1.2 with CSS independence refactor, and add a full public-terminal documentation page using public.com's dark design language.

**Architecture:** Three independent HTML/CSS edits on a static site. `styles.css` owns shared structural layout only; `genv.css` and `public-terminal.css` each own their own complete token sets with no cross-file variable dependencies. The existing `js/app.js` is reused unchanged on all pages.

**Tech Stack:** Vanilla HTML5, CSS custom properties, no build step — edit files directly and verify by opening in browser.

---

## File Map

| Action | File | What changes |
|--------|------|-------------|
| Modify | `index.html` | Service cards, announcement banner, nav drawer |
| Modify | `genv/index.html` | Version refs v2.1.0→v2.1.2, banner text, nav drawer entry |
| Modify | `css/genv.css` | Replace all `var(--green-*)`, `var(--card-bg)`, `var(--border-radius)`, `var(--transition)`, `var(--font-sans)` with `--genv-*` equivalents; declare those variables at top |
| Create | `css/public-terminal.css` | Full standalone stylesheet with public.com dark palette |
| Create | `public-terminal/index.html` | Full documentation page (7 sections) |

---

## Task 1: Update service cards and banner in `index.html`

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Remove the three stale service cards**

In `index.html`, delete the entire `<div class="card service-card" ...>` blocks for Portainer, Gitea, and VS Code Server. The services grid will then contain only: AdGuard Home, Open WebUI, Homebridge.

- [ ] **Step 2: Add Forgejo card after AdGuard Home**

Insert this block as the second card in `.services-grid` (after AdGuard Home, before Open WebUI):

```html
<!-- Forgejo -->
<div class="card service-card" data-url="https://forgejo.pea-pod.me" aria-label="Open Forgejo — private service">
  <span class="card-icon" aria-hidden="true">🦭</span>
  <span class="card-title">Forgejo</span>
  <span class="badge private">Private</span>
</div>
```

- [ ] **Step 3: Add RustDesk card at the end of the services grid**

Append this block as the last card in `.services-grid` (after Homebridge):

```html
<!-- RustDesk -->
<div class="card service-card" data-url="https://rustdesk.pea-pod.me" aria-label="Open RustDesk — private service">
  <span class="card-icon" aria-hidden="true">🖥️</span>
  <span class="card-title">RustDesk</span>
  <span class="badge private">Private</span>
</div>
```

- [ ] **Step 4: Update the announcement banner**

Replace the entire content of `.banner-content` with:

```html
<div class="banner-content">
  <span class="banner-badge" aria-hidden="true">New</span>
  <p class="banner-text">
    <strong>Public Terminal</strong> is live — a btop-style trading TUI for Public.com with direct index investing and automated daily rebalancing.
  </p>
  <a class="banner-link" href="/public-terminal">Learn More →</a>
  <button class="banner-close" id="banner-close" aria-label="Dismiss announcement">✕</button>
</div>
```

- [ ] **Step 5: Add Public Terminal to the nav drawer**

In the `<ul class="side-menu-list">`, after the GENV `<li>` entry, insert:

```html
<li>
  <a class="side-menu-link" href="/public-terminal">
    <span class="side-menu-icon" aria-hidden="true">💹</span>
    <span>Public Terminal</span>
  </a>
</li>
```

- [ ] **Step 6: Add Public Terminal card to Karim's Work section**

In the `#karim-work` `.shortcuts-grid`, append after the LinkedIn card:

```html
<!-- Public Terminal -->
<a
  class="card"
  href="/public-terminal"
  aria-label="Open Public Terminal documentation"
>
  <span class="card-icon" aria-hidden="true">💹</span>
  <span class="card-title">Public Terminal</span>
  <span class="card-desc">A btop-style trading TUI for Public.com — direct index investing from your terminal</span>
  <span class="card-arrow" aria-hidden="true">→</span>
</a>
```

- [ ] **Step 7: Verify and commit**

Open `index.html` in a browser and confirm:
- Services grid shows: AdGuard Home, Forgejo, Open WebUI, Homebridge, RustDesk (5 cards)
- Banner reads "Public Terminal is live…" with "Learn More →" linking to `/public-terminal`
- Nav drawer has a "Public Terminal" entry after GENV
- Karim's Work grid has a Public Terminal card

```bash
git add index.html
git commit -m "feat: sync services with homelab, update banner for public-terminal, add nav entries"
```

---

## Task 2: Refactor `css/genv.css` for full CSS variable independence

**Files:**
- Modify: `css/genv.css`

The current `genv.css` overrides `--green-*` and `--card-bg` variables from `styles.css`, and its component rules reference `var(--card-bg)`, `var(--border-radius)`, `var(--transition)`, `var(--font-sans)`, and `var(--green-*)`. After this task, all of those are replaced with `--genv-*` equivalents declared at the top of `genv.css`.

- [ ] **Step 1: Replace the entire `:root` block at the top of `genv.css`**

Delete the existing `:root { ... }` block (lines 7–26) and replace it with:

```css
/* =============================================
   GENV — Global Environment Manager
   Fully independent dark monochrome theme
   ============================================= */

/* ---- Design tokens — no dependency on styles.css variables ---- */
:root {
  /* Background / surface */
  --genv-bg:           #0b0f1a;
  --genv-surface:      #111827;
  --genv-surface-2:    rgba(20, 20, 20, 0.9);

  /* Borders */
  --genv-border:       rgba(70, 70, 70, 0.5);
  --genv-border-hover: rgba(110, 110, 110, 0.55);

  /* Text */
  --genv-text:         #eeeeee;
  --genv-text-mid:     #d4d4d4;
  --genv-text-muted:   #9a9a9a;

  /* Accent */
  --genv-accent:       #c0c0c0;
  --genv-accent-hover: #e0e0e0;

  /* Shadows */
  --genv-shadow:       0 4px 24px rgba(0, 0, 0, 0.5);
  --genv-shadow-lg:    0 8px 40px rgba(0, 0, 0, 0.7);

  /* Misc */
  --genv-radius:       0.75rem;
  --genv-radius-lg:    1.25rem;
  --genv-transition:   all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --genv-font:         'Inter', 'Segoe UI', system-ui, sans-serif;
  --genv-mono:         'SFMono-Regular', 'Consolas', 'Liberation Mono', monospace;
}
```

Also add a `body` rule immediately after (so the page background is set by genv.css, not inherited from styles.css's `--green-50`):

```css
body {
  background-color: var(--genv-bg);
  color: var(--genv-text);
}
```

- [ ] **Step 2: Replace all `var(--card-bg)` references**

In `genv.css`, replace every `var(--card-bg)` with `var(--genv-surface-2)`.

Occurrences to update (`.genv-feature-card`, `.genv-platform-table`, `.genv-roadmap-list li`, `.genv-cta`):

```css
/* Before */
background: var(--card-bg);

/* After */
background: var(--genv-surface-2);
```

- [ ] **Step 3: Replace all `var(--border-radius)` references**

Replace every `var(--border-radius)` with `var(--genv-radius-lg)`.

Occurrences: `.genv-feature-card`, `.genv-platform-table`, `.genv-roadmap-list li`, `.genv-cta`.

- [ ] **Step 4: Replace all `var(--transition)` references**

Replace every `var(--transition)` with `var(--genv-transition)`.

Occurrences: `.copy-btn`, `.genv-feature-card`, `.genv-roadmap-list li`, `.btn-primary`, `.btn-secondary`.

- [ ] **Step 5: Replace all `var(--font-sans)` references**

Replace every `var(--font-sans)` with `var(--genv-font)`.

Occurrences: `.btn-primary`, `.btn-secondary`.

- [ ] **Step 6: Replace remaining `var(--green-*)` references with `--genv-*` equivalents**

| Old reference | New reference |
|---|---|
| `var(--green-800)` | `var(--genv-text-mid)` |
| `var(--green-900)` | `var(--genv-text)` |
| `var(--green-950)` | `var(--genv-accent-hover)` |
| `var(--card-shadow)` | `var(--genv-shadow)` |
| `var(--card-hover-shadow)` | `var(--genv-shadow-lg)` |

Apply across all component rules in the file.

- [ ] **Step 7: Update hard-coded border-color rules to use `--genv-border`**

Any remaining hard-coded `rgba(70, 70, 70, 0.5)` border references should become `var(--genv-border)`. Hard-coded `rgba(110, 110, 110, 0.55)` hover borders become `var(--genv-border-hover)`.

- [ ] **Step 8: Verify visually and commit**

Open `genv/index.html` in a browser. The page must look identical to before (dark mono theme, same grays). No visual regressions.

```bash
git add css/genv.css
git commit -m "refactor(genv): make genv.css fully independent — replace all styles.css variable references with --genv-* tokens"
```

---

## Task 3: Update `genv/index.html` — version bump and nav

**Files:**
- Modify: `genv/index.html`

- [ ] **Step 1: Bump all version references from v2.1.0 to v2.1.2**

Replace every literal `v2.1.0` occurrence in the file with `v2.1.2`. There are three: the banner badge, the banner text, and the CTA section description. Use find-and-replace.

- [ ] **Step 2: Update the banner release link**

Change the `href` on `.banner-link` from:
```html
href="https://github.com/ks1686/genv/releases/tag/v2.1.0"
```
to:
```html
href="https://github.com/ks1686/genv/releases/tag/v2.1.2"
```

- [ ] **Step 3: Rewrite the banner text**

Replace the content of `.banner-text` with:

```html
<p class="banner-text">
  <strong>GENV v2.1.2</strong> — refined package manager support:
  <code style="font-size:0.85em;background:rgba(255,255,255,0.12);padding:0.1em 0.35em;border-radius:0.25em;">brew</code>,
  <code style="font-size:0.85em;background:rgba(255,255,255,0.12);padding:0.1em 0.35em;border-radius:0.25em;">paru</code>,
  <code style="font-size:0.85em;background:rgba(255,255,255,0.12);padding:0.1em 0.35em;border-radius:0.25em;">yay</code>,
  <code style="font-size:0.85em;background:rgba(255,255,255,0.12);padding:0.1em 0.35em;border-radius:0.25em;">snap</code>,
  <code style="font-size:0.85em;background:rgba(255,255,255,0.12);padding:0.1em 0.35em;border-radius:0.25em;">linuxbrew</code>.
</p>
```

- [ ] **Step 4: Update the CTA section description**

Find the `<p class="genv-cta-desc">` block and replace its text content with:

```html
<p class="genv-cta-desc">
  GENV v2.1.2 is here — open-source and MIT licensed. Adapter quality and test coverage are where contributions matter most.
</p>
```

- [ ] **Step 5: Add Public Terminal to the nav drawer**

In the `<ul class="side-menu-list">`, after the GENV `<li>` entry (the one with `aria-current="page"`), insert:

```html
<li>
  <a class="side-menu-link" href="/public-terminal">
    <span class="side-menu-icon" aria-hidden="true">💹</span>
    <span>Public Terminal</span>
  </a>
</li>
```

- [ ] **Step 6: Verify and commit**

Open `genv/index.html` in a browser. Confirm:
- Banner badge and text show v2.1.2
- Banner text lists the five package managers
- Release notes link goes to the v2.1.2 tag
- CTA says v2.1.2
- Nav drawer has Public Terminal link

```bash
git add genv/index.html
git commit -m "feat(genv): bump to v2.1.2, correct banner text, add public-terminal nav entry"
```

---

## Task 4: Create `css/public-terminal.css`

**Files:**
- Create: `css/public-terminal.css`

- [ ] **Step 1: Create the file with full token set and base overrides**

```css
/* =============================================
   Public Terminal — public.com dark theme
   Fully independent from styles.css variables
   ============================================= */

/* ---- Design tokens ---- */
:root {
  /* Background / surface */
  --pt-bg:           #0D1129;
  --pt-surface:      #141C44;
  --pt-surface-2:    #1A2352;
  --pt-surface-3:    rgba(20, 28, 68, 0.85);

  /* Borders */
  --pt-border:       rgba(106, 195, 47, 0.15);
  --pt-border-hover: rgba(106, 195, 47, 0.35);

  /* Text */
  --pt-text:         #F0F4FF;
  --pt-text-mid:     #C8D3F0;
  --pt-text-muted:   rgba(240, 244, 255, 0.55);

  /* Accent — public.com lime green */
  --pt-accent:       #6AC32F;
  --pt-accent-hover: #0F9B4A;
  --pt-accent-dim:   rgba(106, 195, 47, 0.08);

  /* Shadows */
  --pt-shadow:       0 4px 24px rgba(0, 0, 0, 0.5);
  --pt-shadow-lg:    0 8px 40px rgba(0, 0, 0, 0.7);

  /* Misc */
  --pt-radius:       0.75rem;
  --pt-radius-lg:    1.25rem;
  --pt-transition:   all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --pt-font:         'Inter', 'Segoe UI', system-ui, sans-serif;
  --pt-mono:         'SFMono-Regular', 'Consolas', 'Liberation Mono', monospace;
}

/* ---- Base overrides ---- */
body {
  background-color: var(--pt-bg);
  color: var(--pt-text);
  font-family: var(--pt-font);
}

/* ---- Blob decoration — lime glow ---- */
.blob-1 {
  background: radial-gradient(circle, rgba(106,195,47,0.18), rgba(15,155,74,0.08));
}
.blob-2 {
  background: radial-gradient(circle, rgba(15,155,74,0.12), rgba(106,195,47,0.06));
}
.blob-3 {
  background: radial-gradient(circle, rgba(106,195,47,0.08), transparent);
}

/* ---- Announcement banner ---- */
.announcement-banner {
  background: linear-gradient(135deg, #0F9B4A 0%, #6AC32F 100%);
  border-bottom: 1px solid rgba(106, 195, 47, 0.3);
}

/* ---- Card overrides ---- */
.card {
  border-color: var(--pt-border);
}
.card::before {
  background: linear-gradient(135deg, rgba(106,195,47,0.08), rgba(15,155,74,0.04));
}
.card:hover,
.card:focus-visible {
  border-color: var(--pt-accent);
}
.card-title {
  color: var(--pt-text);
}
.card-desc {
  color: var(--pt-text-muted);
}
.card-arrow {
  color: var(--pt-accent);
}

/* ---- Section label ---- */
.section-label {
  color: var(--pt-accent);
}
.section-label::before,
.section-label::after {
  background: var(--pt-border);
}

/* ---- Burger button ---- */
.burger-btn {
  background: var(--pt-surface-3);
  border-color: var(--pt-border);
}
.burger-btn:hover {
  background: var(--pt-surface-2);
  border-color: var(--pt-accent);
}
.burger-line {
  background: var(--pt-text);
}

/* ---- Menu overlay ---- */
.menu-overlay {
  background: rgba(0, 0, 0, 0.7);
}

/* ---- Side menu ---- */
.side-menu {
  background: var(--pt-surface);
  border-right-color: var(--pt-border);
}
.side-menu-header {
  border-bottom-color: var(--pt-border);
}
.side-menu-title {
  color: var(--pt-accent);
}
.side-menu-close {
  color: var(--pt-text-mid);
}
.side-menu-close:hover {
  background: var(--pt-surface-2);
  color: var(--pt-text);
}
.side-menu-link {
  color: var(--pt-text-mid);
}
.side-menu-link:hover,
.side-menu-link:focus-visible {
  background: var(--pt-surface-2);
  color: var(--pt-text);
  border-left-color: var(--pt-accent);
}
.side-menu-link[aria-current="page"] {
  background: var(--pt-surface-2);
  color: var(--pt-text);
  border-left-color: var(--pt-accent);
}

/* ---- Back nav ---- */
.nav-back {
  background: var(--pt-surface-2);
  border-color: var(--pt-border);
  color: var(--pt-accent);
}
.nav-back:hover {
  background: var(--pt-surface);
  color: var(--pt-accent-hover);
}

/* ---- Site title gradient ---- */
.site-title {
  background: linear-gradient(135deg, #6AC32F 0%, #0F9B4A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.site-tagline {
  color: var(--pt-text-muted);
}

/* ---- Footer ---- */
footer {
  color: var(--pt-text-muted);
}
footer a {
  color: var(--pt-accent);
}
footer a:hover {
  color: var(--pt-accent-hover);
}

/* ---- Side menu section label ---- */
.side-menu-section-label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--pt-text-muted);
  padding: 0.9rem 1.5rem 0.4rem;
  margin: 0;
}

/* ---- Hero tagline ---- */
.pt-hero-tagline {
  font-size: 1.05rem;
  color: var(--pt-text-muted);
  margin-bottom: 1.25rem;
  max-width: 640px;
  line-height: 1.6;
}

/* ---- Install blocks ---- */
.pt-install-block {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid var(--pt-border);
  border-radius: var(--pt-radius);
  padding: 0.85rem 1.5rem;
  font-family: var(--pt-mono);
  font-size: 0.95rem;
  color: var(--pt-text);
  letter-spacing: 0.01em;
  width: 100%;
  box-sizing: border-box;
}

/* ---- Copy button ---- */
.copy-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  margin-left: auto;
  background: transparent;
  border: 1px solid rgba(106, 195, 47, 0.2);
  border-radius: 0.375rem;
  color: var(--pt-text-muted);
  cursor: pointer;
  transition: var(--pt-transition);
}
.copy-btn:hover {
  background: var(--pt-accent-dim);
  border-color: var(--pt-accent);
  color: var(--pt-accent);
}
.copy-btn.copied {
  border-color: var(--pt-accent);
  color: var(--pt-accent);
}
.copy-btn svg {
  width: 0.875rem;
  height: 0.875rem;
  pointer-events: none;
}

/* ---- CTA buttons ---- */
.pt-cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.4rem;
  background: var(--pt-accent);
  color: #0D1129;
  font-family: var(--pt-font);
  font-size: 0.9rem;
  font-weight: 700;
  border: 1px solid var(--pt-accent);
  border-radius: 999px;
  text-decoration: none;
  transition: var(--pt-transition);
}
.btn-primary:hover {
  background: var(--pt-accent-hover);
  border-color: var(--pt-accent-hover);
  transform: translateY(-2px);
}
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.4rem;
  background: transparent;
  color: var(--pt-text-mid);
  font-family: var(--pt-font);
  font-size: 0.9rem;
  font-weight: 700;
  border: 1px solid var(--pt-border-hover);
  border-radius: 999px;
  text-decoration: none;
  transition: var(--pt-transition);
}
.btn-secondary:hover {
  background: var(--pt-surface-2);
  border-color: var(--pt-accent);
  color: var(--pt-accent);
  transform: translateY(-2px);
}

/* ---- Features grid ---- */
.pt-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
}
.pt-feature-card {
  background: var(--pt-surface-3);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--pt-border);
  border-radius: var(--pt-radius-lg);
  box-shadow: var(--pt-shadow);
  padding: 1.5rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: var(--pt-transition);
  animation: fadeUp 0.6s ease both;
}
.pt-feature-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: var(--pt-shadow-lg);
  border-color: var(--pt-border-hover);
}
.pt-feature-icon {
  font-size: 2rem;
  line-height: 1;
  margin-bottom: 0.25rem;
}
.pt-feature-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--pt-text);
}
.pt-feature-desc {
  font-size: 0.88rem;
  color: var(--pt-text-muted);
  line-height: 1.6;
}

/* ---- Tables ---- */
.pt-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--pt-surface-3);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--pt-border);
  border-radius: var(--pt-radius-lg);
  overflow: hidden;
  box-shadow: var(--pt-shadow);
}
.pt-table th {
  padding: 0.85rem 1.25rem;
  text-align: left;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--pt-accent);
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid var(--pt-border);
}
.pt-table td {
  padding: 0.85rem 1.25rem;
  font-size: 0.9rem;
  color: var(--pt-text-mid);
  border-bottom: 1px solid rgba(106, 195, 47, 0.07);
}
.pt-table tr:last-child td {
  border-bottom: none;
}
.pt-table tr:hover td {
  background: rgba(106, 195, 47, 0.04);
}

/* ---- Code tag ---- */
.pt-code-tag {
  display: inline-block;
  font-family: var(--pt-mono);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.15em 0.5em;
  background: var(--pt-accent-dim);
  border: 1px solid rgba(106, 195, 47, 0.25);
  border-radius: 0.3rem;
  color: var(--pt-accent);
  margin: 0.1em 0.2em;
}

/* ---- Code blocks ---- */
.pt-code-block {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid var(--pt-border);
  border-radius: 0.875rem;
  padding: 1.4rem 1.5rem;
  font-family: var(--pt-mono);
  font-size: 0.875rem;
  color: var(--pt-text);
  line-height: 1.75;
  overflow-x: auto;
  white-space: pre;
  tab-size: 2;
  box-shadow: var(--pt-shadow);
}
.pt-code-block .comment {
  color: rgba(106, 195, 47, 0.5);
  font-style: italic;
}
.pt-code-block .accent {
  color: var(--pt-accent);
}

/* ---- Allocation / steps list ---- */
.pt-steps-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  counter-reset: steps;
}
.pt-steps-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 0.85rem 1.25rem;
  background: var(--pt-surface-3);
  border: 1px solid var(--pt-border);
  border-radius: 0.875rem;
  font-size: 0.9rem;
  color: var(--pt-text-muted);
  line-height: 1.6;
  counter-increment: steps;
}
.pt-steps-list li::before {
  content: counter(steps);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.6rem;
  height: 1.6rem;
  font-size: 0.72rem;
  font-weight: 800;
  background: var(--pt-accent-dim);
  border: 1px solid rgba(106, 195, 47, 0.3);
  border-radius: 999px;
  color: var(--pt-accent);
  flex-shrink: 0;
}

/* ---- CTA section ---- */
.pt-cta {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--pt-border);
  border-radius: var(--pt-radius-lg);
  padding: 2.5rem 2rem;
  text-align: center;
  box-shadow: var(--pt-shadow);
}
.pt-cta-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--pt-text);
  margin-bottom: 0.6rem;
  letter-spacing: -0.02em;
}
.pt-cta-desc {
  font-size: 0.95rem;
  color: var(--pt-text-muted);
  max-width: 540px;
  margin: 0 auto 0.5rem;
  line-height: 1.6;
}

/* ---- Responsive ---- */
@media (max-width: 768px) {
  .pt-features-grid {
    grid-template-columns: 1fr;
  }
  .pt-cta {
    padding: 2rem 1.25rem;
  }
  .pt-install-block {
    font-size: 0.82rem;
    padding: 0.75rem 1.1rem;
  }
}
```

- [ ] **Step 2: Verify the file saved correctly**

```bash
wc -l css/public-terminal.css
# Expected: ~280 lines
```

- [ ] **Step 3: Commit**

```bash
git add css/public-terminal.css
git commit -m "feat: add public-terminal.css with public.com dark palette and standalone token set"
```

---

## Task 5: Create `public-terminal/index.html`

**Files:**
- Create: `public-terminal/index.html`

This is the largest task. Build the full documentation page section by section.

- [ ] **Step 1: Create the directory and write the document head + shell**

```bash
mkdir -p public-terminal
```

Write `public-terminal/index.html` with the outer shell (head, blobs, burger, overlay, side menu, header, empty main, footer, script):

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Public Terminal — a btop-style trading TUI for Public.com with direct index investing and automated daily rebalancing." />
    <meta name="theme-color" content="#6AC32F" />

    <!-- Open Graph / Social preview -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Public Terminal" />
    <meta property="og:description" content="A btop-style trading TUI for Public.com with direct index investing and automated daily rebalancing." />
    <meta property="og:image" content="https://ks1686.github.io/favicon.png" />

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.json" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />

    <!-- Styles -->
    <link rel="stylesheet" href="/css/styles.css" />
    <link rel="stylesheet" href="/css/public-terminal.css" />

    <title>Public Terminal</title>
  </head>
  <body>
    <!-- ========== Announcement Banner ========== -->
    <div class="announcement-banner" id="announcement-banner" role="region" aria-label="Announcement">
      <div class="banner-content">
        <span class="banner-badge" aria-hidden="true">New</span>
        <p class="banner-text">
          <strong>Public Terminal</strong> — trade, rebalance, and track your Public.com portfolio from the command line.
        </p>
        <a class="banner-link" href="https://github.com/ks1686/public-terminal" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
        <button class="banner-close" id="banner-close" aria-label="Dismiss announcement">✕</button>
      </div>
    </div>

    <!-- Animated background blobs -->
    <div class="bg-decoration" aria-hidden="true">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <!-- ========== Burger Menu ========== -->
    <button class="burger-btn" id="burger-btn" aria-label="Open navigation menu" aria-expanded="false" aria-controls="side-menu">
      <span class="burger-line"></span>
      <span class="burger-line"></span>
      <span class="burger-line"></span>
    </button>

    <!-- Menu backdrop -->
    <div class="menu-overlay" id="menu-overlay" aria-hidden="true"></div>

    <!-- Side drawer -->
    <nav class="side-menu" id="side-menu" aria-label="Site navigation" aria-hidden="true">
      <div class="side-menu-header">
        <span class="side-menu-title">Navigation</span>
        <button class="side-menu-close" id="side-menu-close" aria-label="Close navigation menu">✕</button>
      </div>
      <ul class="side-menu-list">
        <li>
          <a class="side-menu-link" href="/#karim-work">
            <span class="side-menu-icon" aria-hidden="true">🌟</span>
            <span>Karim's Work</span>
          </a>
        </li>
        <li>
          <a class="side-menu-link" href="/#self-hosted">
            <span class="side-menu-icon" aria-hidden="true">🖥️</span>
            <span>Self-Hosted Services</span>
          </a>
        </li>
        <li>
          <a class="side-menu-link" href="/changelogs">
            <span class="side-menu-icon" aria-hidden="true">📋</span>
            <span>Changelogs</span>
          </a>
        </li>
        <li>
          <a class="side-menu-link" href="/genv">
            <span class="side-menu-icon" aria-hidden="true">📦</span>
            <span>GENV</span>
          </a>
        </li>
        <li>
          <a class="side-menu-link" href="/public-terminal" aria-current="page">
            <span class="side-menu-icon" aria-hidden="true">💹</span>
            <span>Public Terminal</span>
          </a>
        </li>
        <li role="presentation">
          <p class="side-menu-section-label" role="heading" aria-level="2">On this page</p>
        </li>
        <li><a class="side-menu-link" href="#get-started"><span class="side-menu-icon" aria-hidden="true">🚀</span><span>Get Started</span></a></li>
        <li><a class="side-menu-link" href="#features"><span class="side-menu-icon" aria-hidden="true">✨</span><span>Features</span></a></li>
        <li><a class="side-menu-link" href="#interface"><span class="side-menu-icon" aria-hidden="true">🖥️</span><span>Interface</span></a></li>
        <li><a class="side-menu-link" href="#placing-orders"><span class="side-menu-icon" aria-hidden="true">📋</span><span>Placing Orders</span></a></li>
        <li><a class="side-menu-link" href="#rebalancer"><span class="side-menu-icon" aria-hidden="true">⚖️</span><span>Rebalancer</span></a></li>
        <li><a class="side-menu-link" href="#systemd-timer"><span class="side-menu-icon" aria-hidden="true">⏰</span><span>Systemd Timer</span></a></li>
        <li><a class="side-menu-link" href="#configuration"><span class="side-menu-icon" aria-hidden="true">📁</span><span>Configuration</span></a></li>
      </ul>
    </nav>

    <!-- ========== Header ========== -->
    <header>
      <div class="container">
        <div class="logo-wrap">
          <span class="logo-icon" aria-hidden="true">💹</span>
          <h1 class="site-title">Public Terminal</h1>
        </div>
        <p class="site-tagline">Trade &amp; rebalance from your terminal ✦ Powered by Public.com</p>
      </div>
    </header>

    <!-- ========== Main Content ========== -->
    <main>
      <div class="container">

        <!-- Back to home -->
        <a class="nav-back" href="/" aria-label="Back to home">← Back to Home</a>

        <!-- SECTIONS GO HERE -->

      </div>
    </main>

    <!-- ========== Footer ========== -->
    <footer>
      <div class="container">
        <p>
          💹 Public Terminal &mdash; part of
          <a href="/">Pea Pod Network</a>
          &mdash; MIT License
        </p>
      </div>
    </footer>

    <!-- Scripts -->
    <script src="/js/app.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Add the Get Started section**

Replace `<!-- SECTIONS GO HERE -->` with the following (leave the comment for subsequent steps if helpful):

```html
<!-- ---- Get Started ---- -->
<section id="get-started" class="section" aria-labelledby="install-heading">
  <div class="section-label" id="install-heading">
    <span>Get Started</span>
  </div>
  <p class="pt-hero-tagline">
    A btop/htop-style trading TUI for <a href="https://public.com" target="_blank" rel="noopener noreferrer" style="color:var(--pt-accent);font-weight:600;text-decoration:none;">Public.com</a> — direct index investing, automated daily rebalancing, and live portfolio tracking from your terminal.
  </p>
  <div style="display:flex;flex-direction:column;gap:1rem;">
    <div>
      <p style="font-size:0.78rem;color:var(--pt-text-muted);margin-bottom:0.4rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;">uv (recommended)</p>
      <div class="pt-install-block" aria-label="Install command via uv">
        <span style="font-family:var(--pt-mono);font-size:0.88rem;word-break:break-all;">uv tool install --force https://github.com/ks1686/public-terminal/releases/latest/download/public_terminal-latest.tar.gz</span>
        <button class="copy-btn" aria-label="Copy command to clipboard" title="Copy">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5h-.5A1.5 1.5 0 0 0 3 3h10a1.5 1.5 0 0 0-1.5-1.5H11A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>
        </button>
      </div>
    </div>
    <div>
      <p style="font-size:0.78rem;color:var(--pt-text-muted);margin-bottom:0.4rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;">pipx</p>
      <div class="pt-install-block" aria-label="Install command via pipx">
        <span style="font-family:var(--pt-mono);font-size:0.88rem;word-break:break-all;">pipx install --force https://github.com/ks1686/public-terminal/releases/latest/download/public_terminal-latest.tar.gz</span>
        <button class="copy-btn" aria-label="Copy command to clipboard" title="Copy">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5h-.5A1.5 1.5 0 0 0 3 3h10a1.5 1.5 0 0 0-1.5-1.5H11A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>
        </button>
      </div>
    </div>
  </div>
  <p style="font-size:0.85rem;color:var(--pt-text-muted);margin-top:0.85rem;">
    Re-run the same command at any time to upgrade. Config stored at
    <code style="font-size:0.8rem;background:var(--pt-accent-dim);padding:0.1em 0.4em;border-radius:0.3rem;color:var(--pt-accent);">~/.config/public-terminal/</code>
    (respects <code style="font-size:0.8rem;background:var(--pt-accent-dim);padding:0.1em 0.4em;border-radius:0.3rem;color:var(--pt-accent);">$XDG_CONFIG_HOME</code>).
  </p>
  <p style="font-size:0.78rem;color:var(--pt-text-muted);margin-top:0.5rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;">Run</p>
  <pre class="pt-code-block" style="margin-top:0.4rem;" aria-label="Run commands">public-terminal            <span class="comment"># launch the TUI</span>
public-terminal-rebalance  <span class="comment"># run a single rebalance cycle</span>
public-terminal-rebalance --dry-run  <span class="comment"># plan without placing orders</span></pre>
  <div class="pt-cta-buttons" style="margin-top:1.25rem;">
    <a class="btn-primary" href="https://github.com/ks1686/public-terminal" target="_blank" rel="noopener noreferrer">
      ⭐ View on GitHub
    </a>
    <a class="btn-secondary" href="https://github.com/ks1686/public-terminal/releases/latest" target="_blank" rel="noopener noreferrer">
      ↓ Download Latest
    </a>
  </div>
</section>
```

- [ ] **Step 3: Add the Features section**

Append after the Get Started section:

```html
<!-- ---- Features ---- -->
<section id="features" class="section" aria-labelledby="features-heading">
  <div class="section-label" id="features-heading">
    <span>Features</span>
  </div>
  <div class="pt-features-grid">
    <div class="pt-feature-card">
      <span class="pt-feature-icon" aria-hidden="true">🗂️</span>
      <p class="pt-feature-title">Multi-Account</p>
      <p class="pt-feature-desc">Persistent tab bar to switch between accounts. Add or remove accounts at runtime without restarting.</p>
    </div>
    <div class="pt-feature-card">
      <span class="pt-feature-icon" aria-hidden="true">📊</span>
      <p class="pt-feature-title">Live Portfolio</p>
      <p class="pt-feature-desc">Holdings, values, quantities, open orders, and options positions. Press <code style="font-size:0.8rem;background:var(--pt-accent-dim);padding:0.1em 0.35em;border-radius:0.25em;color:var(--pt-accent);">l</code> to toggle live balance streaming every 30 seconds.</p>
    </div>
    <div class="pt-feature-card">
      <span class="pt-feature-icon" aria-hidden="true">📈</span>
      <p class="pt-feature-title">Direct Index Investing</p>
      <p class="pt-feature-desc">Track the top N constituents from S&amp;P 500, NASDAQ-100, DJIA, ACWI, or SPUS — market-cap weighted and automatically rebalanced daily.</p>
    </div>
    <div class="pt-feature-card">
      <span class="pt-feature-icon" aria-hidden="true">📋</span>
      <p class="pt-feature-title">Manual Orders</p>
      <p class="pt-feature-desc">Place market, limit, stop, and stop-limit orders for stocks, ETFs, and crypto. View, modify, and cancel open orders from the TUI.</p>
    </div>
    <div class="pt-feature-card">
      <span class="pt-feature-icon" aria-hidden="true">🔖</span>
      <p class="pt-feature-title">Options Tracking</p>
      <p class="pt-feature-desc">View open calls and puts with contract details, expiration dates, and P&amp;L. Positions expiring within 7 days are highlighted in yellow.</p>
    </div>
    <div class="pt-feature-card">
      <span class="pt-feature-icon" aria-hidden="true">📉</span>
      <p class="pt-feature-title">Portfolio Chart</p>
      <p class="pt-feature-desc">Scrollable price history across all holdings. Use <code style="font-size:0.8rem;background:var(--pt-accent-dim);padding:0.1em 0.35em;border-radius:0.25em;color:var(--pt-accent);">[</code> and <code style="font-size:0.8rem;background:var(--pt-accent-dim);padding:0.1em 0.35em;border-radius:0.25em;color:var(--pt-accent);">]</code> to scroll time windows. Extended-hours data included in the 24H view.</p>
    </div>
    <div class="pt-feature-card">
      <span class="pt-feature-icon" aria-hidden="true">💳</span>
      <p class="pt-feature-title">Margin Support</p>
      <p class="pt-feature-desc">Optionally deploy a configurable percentage of your margin capacity as additional buying power across all asset buckets.</p>
    </div>
    <div class="pt-feature-card">
      <span class="pt-feature-icon" aria-hidden="true">🛡️</span>
      <p class="pt-feature-title">PDT Protection</p>
      <p class="pt-feature-desc">A daily buy ledger prevents selling positions opened the same day, keeping you clear of pattern day trading restrictions.</p>
    </div>
    <div class="pt-feature-card">
      <span class="pt-feature-icon" aria-hidden="true">⏰</span>
      <p class="pt-feature-title">Systemd Timer</p>
      <p class="pt-feature-desc">Automated daily rebalance Mon–Fri at 12:00 ET. Install, remove, pause, and skip runs directly from the TUI with <code style="font-size:0.8rem;background:var(--pt-accent-dim);padding:0.1em 0.35em;border-radius:0.25em;color:var(--pt-accent);">e</code> / <code style="font-size:0.8rem;background:var(--pt-accent-dim);padding:0.1em 0.35em;border-radius:0.25em;color:var(--pt-accent);">t</code> / <code style="font-size:0.8rem;background:var(--pt-accent-dim);padding:0.1em 0.35em;border-radius:0.25em;color:var(--pt-accent);">x</code>.</p>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Add the Interface section**

```html
<!-- ---- Interface ---- -->
<section id="interface" class="section" aria-labelledby="interface-heading">
  <div class="section-label" id="interface-heading">
    <span>Interface</span>
  </div>
  <pre class="pt-code-block" aria-label="TUI layout diagram">Header (clock)
Account Tabs      — one tab per account; switch with Ctrl+Left / Ctrl+Right
Balance Bar       — total equity, buying power, options BP, crypto BP, cash or margin balance
Rebalancer Bar    — timer status, active config, key hint strip
Portfolio Chart   — scrollable price history
┌─ HOLDINGS ──────────┐  ┌─ OPEN ORDERS ──────┐
│ stocks, ETFs, crypto │  │ pending orders      │
├──────────────────────┤  └────────────────────┘
│ OPTIONS              │
│ calls, puts          │
└──────────────────────┘
Footer (key bindings)</pre>

  <p style="font-size:0.82rem;font-weight:700;color:var(--pt-text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-top:1.5rem;margin-bottom:0.75rem;">
    Key Bindings
  </p>
  <table class="pt-table" aria-label="Key bindings">
    <thead>
      <tr>
        <th scope="col">Key</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><span class="pt-code-tag">r</span></td><td>Refresh portfolio, orders, and rebalancer status</td></tr>
      <tr><td><span class="pt-code-tag">l</span></td><td>Toggle live portfolio balance stream on the chart</td></tr>
      <tr><td><span class="pt-code-tag">b</span></td><td>Place a market buy order</td></tr>
      <tr><td><span class="pt-code-tag">s</span></td><td>Place a market sell order</td></tr>
      <tr><td><span class="pt-code-tag">v</span></td><td>View / modify the selected open order</td></tr>
      <tr><td><span class="pt-code-tag">c</span></td><td>Cancel the selected open order</td></tr>
      <tr><td><span class="pt-code-tag">h</span></td><td>View order history</td></tr>
      <tr><td><span class="pt-code-tag">[</span></td><td>Scroll portfolio chart left (earlier)</td></tr>
      <tr><td><span class="pt-code-tag">]</span></td><td>Scroll portfolio chart right (later)</td></tr>
      <tr><td><span class="pt-code-tag">t</span></td><td>Pause / resume the installed rebalancer schedule</td></tr>
      <tr><td><span class="pt-code-tag">e</span></td><td>Install / remove the rebalancer schedule</td></tr>
      <tr><td><span class="pt-code-tag">x</span></td><td>Skip the next scheduled rebalance run</td></tr>
      <tr><td><span class="pt-code-tag">S</span></td><td>Open rebalance settings modal</td></tr>
      <tr><td><span class="pt-code-tag">Ctrl+A</span></td><td>Open account management modal (add / remove accounts)</td></tr>
      <tr><td><span class="pt-code-tag">Ctrl+Left</span></td><td>Switch to previous account tab</td></tr>
      <tr><td><span class="pt-code-tag">Ctrl+Right</span></td><td>Switch to next account tab</td></tr>
      <tr><td><span class="pt-code-tag">q</span></td><td>Quit</td></tr>
    </tbody>
  </table>
</section>
```

- [ ] **Step 5: Add the Placing Orders section**

```html
<!-- ---- Placing Orders ---- -->
<section id="placing-orders" class="section" aria-labelledby="orders-heading">
  <div class="section-label" id="orders-heading">
    <span>Placing Orders</span>
  </div>
  <p style="font-size:0.92rem;color:var(--pt-text-muted);margin-bottom:1rem;">
    Press <span class="pt-code-tag">b</span> to buy or <span class="pt-code-tag">s</span> to sell. A modal prompts for:
  </p>
  <table class="pt-table" aria-label="Order fields" style="margin-bottom:1rem;">
    <thead>
      <tr>
        <th scope="col">Field</th>
        <th scope="col">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>Symbol</strong></td><td>e.g. <span class="pt-code-tag">AAPL</span>, <span class="pt-code-tag">BTC</span>, <span class="pt-code-tag">GLDM</span></td></tr>
      <tr><td><strong>Instrument type</strong></td><td>Equity or Crypto</td></tr>
      <tr><td><strong>Order type</strong></td><td>Market, Limit, Stop, or Stop Limit</td></tr>
      <tr><td><strong>Quantity</strong></td><td>Shares or coin units (fractional supported)</td></tr>
    </tbody>
  </table>
  <div class="pt-features-grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr));">
    <div class="pt-feature-card">
      <p class="pt-feature-title">Market</p>
      <p class="pt-feature-desc">Immediate execution at the current market price.</p>
    </div>
    <div class="pt-feature-card">
      <p class="pt-feature-title">Limit</p>
      <p class="pt-feature-desc">Buy or sell at or better than a specified price.</p>
    </div>
    <div class="pt-feature-card">
      <p class="pt-feature-title">Stop</p>
      <p class="pt-feature-desc">Trigger a market order when the price reaches a stop price.</p>
    </div>
    <div class="pt-feature-card">
      <p class="pt-feature-title">Stop Limit</p>
      <p class="pt-feature-desc">Trigger a limit order when the price reaches a stop price.</p>
    </div>
  </div>
  <p style="font-size:0.85rem;color:var(--pt-text-muted);margin-top:0.85rem;">
    All orders are day-only. To modify an open order, press <span class="pt-code-tag">v</span> to open its details modal — modification cancels the existing order and places a new one with updated parameters.
  </p>
</section>
```

- [ ] **Step 6: Add the Rebalancer section**

```html
<!-- ---- Rebalancer ---- -->
<section id="rebalancer" class="section" aria-labelledby="rebalancer-heading">
  <div class="section-label" id="rebalancer-heading">
    <span>Rebalancer</span>
  </div>

  <p style="font-size:0.82rem;font-weight:700;color:var(--pt-text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.75rem;">Target Allocation</p>
  <table class="pt-table" aria-label="Target allocation" style="margin-bottom:1.5rem;">
    <thead>
      <tr>
        <th scope="col">Asset</th>
        <th scope="col">Allocation</th>
        <th scope="col">Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Stocks</td><td>65%</td><td>Top N from configured index, market-cap weighted</td></tr>
      <tr><td>BTC</td><td>15%</td><td>Bitcoin</td></tr>
      <tr><td>ETH</td><td>5%</td><td>Ethereum</td></tr>
      <tr><td>GLDM</td><td>10%</td><td>Gold ETF</td></tr>
      <tr><td>Cash</td><td>5%</td><td>Uninvested buying power (no orders placed)</td></tr>
    </tbody>
  </table>

  <p style="font-size:0.82rem;font-weight:700;color:var(--pt-text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.75rem;">How Each Run Works</p>
  <ol class="pt-steps-list" style="margin-bottom:1.5rem;">
    <li>Fetches the current constituent list for the configured index from official ETF holdings (Wikipedia as fallback).</li>
    <li>Fetches market caps via yfinance — 20 parallel workers, results cached up to 20 hours.</li>
    <li>Selects top N by market cap, filters excluded tickers, computes within-slice weights.</li>
    <li>Fetches the current portfolio from Public.com.</li>
    <li>Computes dollar deltas for all buckets against the investment base.</li>
    <li>Applies drift threshold: <code style="font-size:0.8rem;background:var(--pt-accent-dim);padding:0.1em 0.35em;border-radius:0.25em;color:var(--pt-accent);">max(0.5% of target, $1)</code> — positions within tolerance are left alone.</li>
    <li>Places SELL orders first, waits for them to clear, then places BUY orders.</li>
    <li>BUY orders are capped to effective buying power budget.</li>
    <li>Full liquidations use share-quantity orders to avoid broker rejection.</li>
    <li>Logs everything to <code style="font-size:0.8rem;background:var(--pt-accent-dim);padding:0.1em 0.35em;border-radius:0.25em;color:var(--pt-accent);">accounts/&lt;id&gt;/cache/rebalance.log</code>.</li>
  </ol>

  <p style="font-size:0.82rem;font-weight:700;color:var(--pt-text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.75rem;">Margin Investing</p>
  <pre class="pt-code-block" aria-label="Margin math" style="margin-bottom:1.5rem;">margin_capacity = current_margin_loan + current_margin_buying_power
allowed_margin  = margin_usage_pct × margin_capacity
investment_base = portfolio_nav + allowed_margin
effective_bp    = cash_buying_power + max(0, allowed_margin - current_margin_loan)</pre>
  <p style="font-size:0.88rem;color:var(--pt-text-muted);margin-bottom:1.5rem;">
    Set <code style="font-size:0.8rem;background:var(--pt-accent-dim);padding:0.1em 0.35em;border-radius:0.25em;color:var(--pt-accent);">margin_usage_pct = 0.0</code> to use cash only. The TUI disables the margin input if your account has no margin buying power.
  </p>

  <p style="font-size:0.82rem;font-weight:700;color:var(--pt-text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.75rem;">Rebalance Settings (<span class="pt-code-tag">S</span>)</p>
  <table class="pt-table" aria-label="Rebalance settings" style="margin-bottom:1.5rem;">
    <thead>
      <tr>
        <th scope="col">Field</th>
        <th scope="col">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>Index to track</strong></td><td>Determines which constituent list to use</td></tr>
      <tr><td><strong>Top N stocks</strong></td><td>How many top constituents to hold by market cap (default: 500)</td></tr>
      <tr><td><strong>Margin usage</strong></td><td>0.0 = cash only · 0.5 = 50% of margin capacity · 1.0 = full margin</td></tr>
      <tr><td><strong>Excluded tickers</strong></td><td>Comma-separated symbols to skip entirely (no buys, no sells)</td></tr>
    </tbody>
  </table>

  <p style="font-size:0.82rem;font-weight:700;color:var(--pt-text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.75rem;">Supported Indexes</p>
  <table class="pt-table" aria-label="Supported indexes">
    <thead>
      <tr>
        <th scope="col">Config value</th>
        <th scope="col">Index</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><span class="pt-code-tag">SP500</span></td><td>S&amp;P 500</td></tr>
      <tr><td><span class="pt-code-tag">NASDAQ100</span></td><td>NASDAQ-100</td></tr>
      <tr><td><span class="pt-code-tag">DJIA</span></td><td>Dow Jones Industrial Average</td></tr>
      <tr><td><span class="pt-code-tag">FTSE_GLOBAL_ALL_CAP</span></td><td>Global equities via iShares ACWI holdings proxy</td></tr>
      <tr><td><span class="pt-code-tag">SPUS</span></td><td>SP Funds S&amp;P 500 Shariah Industry Exclusions ETF</td></tr>
    </tbody>
  </table>
</section>
```

- [ ] **Step 7: Add the Systemd Timer section**

```html
<!-- ---- Systemd Timer ---- -->
<section id="systemd-timer" class="section" aria-labelledby="timer-heading">
  <div class="section-label" id="timer-heading">
    <span>Systemd Timer</span>
  </div>
  <p style="font-size:0.92rem;color:var(--pt-text-muted);margin-bottom:1rem;">
    The rebalancer runs as a user-level systemd service — no root access required. The timer fires Mon–Fri at <strong>12:00 ET</strong> (DST-aware). <code style="font-size:0.8rem;background:var(--pt-accent-dim);padding:0.1em 0.35em;border-radius:0.25em;color:var(--pt-accent);">Persistent=true</code> catches up immediately after a missed run.
  </p>
  <table class="pt-table" aria-label="Timer TUI controls" style="margin-bottom:1.25rem;">
    <thead>
      <tr>
        <th scope="col">Key</th>
        <th scope="col">Effect</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><span class="pt-code-tag">e</span></td><td>Install/activate or disable/remove the scheduled timer</td></tr>
      <tr><td><span class="pt-code-tag">t</span></td><td>Pause or resume the installed timer without removing service files</td></tr>
      <tr><td><span class="pt-code-tag">x</span></td><td>Skip the next run (creates a sentinel file removed on next execution)</td></tr>
    </tbody>
  </table>
  <p style="font-size:0.82rem;font-weight:700;color:var(--pt-text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem;">Manage from the shell</p>
  <pre class="pt-code-block" aria-label="Shell timer commands"><span class="comment"># Status</span>
systemctl --user status public-terminal-rebalance.timer

<span class="comment"># Live logs</span>
journalctl --user -u public-terminal-rebalance.service -f

<span class="comment"># Stop for this session</span>
systemctl --user stop public-terminal-rebalance.timer

<span class="comment"># Disable permanently</span>
systemctl --user disable --now public-terminal-rebalance.timer
rm -f ~/.config/systemd/user/public-terminal-rebalance.service
rm -f ~/.config/systemd/user/public-terminal-rebalance.timer
systemctl --user daemon-reload</pre>
</section>
```

- [ ] **Step 8: Add the Configuration Files section and CTA**

```html
<!-- ---- Configuration Files ---- -->
<section id="configuration" class="section" aria-labelledby="config-heading">
  <div class="section-label" id="config-heading">
    <span>Configuration Files</span>
  </div>
  <pre class="pt-code-block" aria-label="Configuration file tree">~/.config/public-terminal/
├── .env                              <span class="comment">— API access token (shared across all accounts)</span>
├── accounts.json                     <span class="comment">— ordered list of registered account IDs</span>
├── schema_version.json               <span class="comment">— internal migration marker</span>
└── accounts/&lt;id&gt;/
    ├── rebalance_config.json         <span class="comment">— index, top N, margin %, excluded tickers</span>
    └── cache/
        ├── rebalance.log             <span class="comment">— full rebalancer run history</span>
        ├── market_caps.json          <span class="comment">— same-day market cap cache (auto-refreshes)</span>
        ├── today_buys.json           <span class="comment">— PDT protection ledger (resets daily)</span>
        └── skip_next_rebalance       <span class="comment">— sentinel file — presence skips one run</span></pre>
  <p style="font-size:0.88rem;color:var(--pt-text-muted);margin-top:0.75rem;">
    The <code style="font-size:0.8rem;background:var(--pt-accent-dim);padding:0.1em 0.35em;border-radius:0.25em;color:var(--pt-accent);">.env</code> file holds your
    <code style="font-size:0.8rem;background:var(--pt-accent-dim);padding:0.1em 0.35em;border-radius:0.25em;color:var(--pt-accent);">PUBLIC_ACCESS_TOKEN</code> from your Public.com account settings.
    Existing v0.1.x single-account users are migrated automatically on first launch — no manual steps required.
  </p>
</section>

<!-- ---- CTA ---- -->
<section class="section" aria-labelledby="cta-heading">
  <div class="pt-cta">
    <p class="pt-cta-title" id="cta-heading">Ready to trade from your terminal?</p>
    <p class="pt-cta-desc">
      Public Terminal is open-source and MIT licensed. Requires a <a href="https://public.com" target="_blank" rel="noopener noreferrer" style="color:var(--pt-accent);font-weight:600;text-decoration:none;">Public.com</a> brokerage account with API access enabled.
    </p>
    <div class="pt-cta-buttons" style="justify-content:center;">
      <a class="btn-primary" href="https://github.com/ks1686/public-terminal" target="_blank" rel="noopener noreferrer">
        ⭐ Star on GitHub
      </a>
      <a class="btn-secondary" href="https://github.com/ks1686/public-terminal/releases/latest" target="_blank" rel="noopener noreferrer">
        ↓ Download Latest
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 9: Verify and commit**

Open `public-terminal/index.html` in a browser. Check:
- Dark navy background with lime green accents throughout
- All 7 sections render correctly with proper tables, code blocks, and feature cards
- Copy buttons appear on install blocks
- Nav drawer includes all "On this page" links and all top-level site links
- Back to Home link works
- No green color bleed from `styles.css` (body background should be `#0D1129`, not the green from styles.css)

```bash
git add public-terminal/index.html
git commit -m "feat: add public-terminal documentation page with public.com dark theme"
```

---

## Task 6: Final cross-page verification and cleanup commit

**Files:**
- Verify: `index.html`, `genv/index.html`, `public-terminal/index.html`

- [ ] **Step 1: Verify nav drawer consistency across all three pages**

Each page's side drawer must have these top-level links in order:
1. Karim's Work (`/#karim-work`)
2. Self-Hosted Services (`/#self-hosted`)
3. Changelogs (`/changelogs`)
4. GENV (`/genv`)
5. Public Terminal (`/public-terminal`)

- [ ] **Step 2: Verify `aria-current="page"` is set correctly on each page**

- `index.html` — no `aria-current` on nav links (it's the root)
- `genv/index.html` — `aria-current="page"` on the GENV link only
- `public-terminal/index.html` — `aria-current="page"` on the Public Terminal link only

- [ ] **Step 3: Final commit**

```bash
git add index.html genv/index.html public-terminal/index.html css/genv.css css/public-terminal.css
git commit -m "chore: final cross-page nav consistency check — all pages updated"
```
