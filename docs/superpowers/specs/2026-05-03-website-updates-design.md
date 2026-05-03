# Website Updates Design — 2026-05-03

## Scope

Three independent changes to the Pea Pod Network static site:

1. **Services update** — sync `index.html` service cards with current homelab (`/mnt/homelab`)
2. **genv page update** — version bump to v2.1.2, banner text correction, CSS refactor for full independence
3. **Public Terminal page** — new `/public-terminal/` documentation page with public.com design language

---

## 1. Services Update (`index.html`)

### Changes

**Remove cards:**
- Portainer — no longer running
- Gitea — replaced by Forgejo
- VS Code Server — no longer running

**Add cards:**
- Forgejo — `https://forgejo.pea-pod.me`, icon `🦭`, badge `Private`
- RustDesk — `https://rustdesk.pea-pod.me`, icon `🖥️`, badge `Private`

**Keep unchanged:**
- AdGuard Home (`https://adguard.pea-pod.me`)
- Open WebUI (`https://chat.pea-pod.me`)
- Homebridge (`https://homebridge.pea-pod.me`)

**Final service card order:** AdGuard Home, Forgejo, Open WebUI, Homebridge, RustDesk

### Announcement Banner

Update the banner to announce Public Terminal instead of genv v2.1.0. New text:
> **Public Terminal** is live — a btop-style trading TUI for Public.com with direct index investing and automated daily rebalancing.

Banner link: `/public-terminal` with text `Learn More →`  
Banner badge: `New`

### Navigation Drawer

Add a "Public Terminal" link to the side drawer on `index.html`:
- Icon: `💹`
- href: `/public-terminal`
- Position: after GENV entry

---

## 2. genv Page Update (`genv/index.html` + `css/genv.css`)

### Version Bump

- All `v2.1.0` references → `v2.1.2`
- Banner `href` → `https://github.com/ks1686/genv/releases/tag/v2.1.2`
- CTA section description: update to reference v2.1.2

### Banner Text Correction

v2.1.0 banner mentioned "Fedora COPR, Alpine" packaging channels. These were briefly added in v2.1.1 and removed in v2.1.2. Replace with:
> **GENV v2.1.2** — refined package manager support: `brew`, `paru`, `yay`, `snap`, `linuxbrew`.

### Navigation Drawer

Add "Public Terminal" link (same as homepage — icon `💹`, href `/public-terminal`).

### CSS Refactor (`css/genv.css`)

Make `genv.css` fully self-contained with its own CSS custom property block. Currently it implicitly relies on `styles.css` for some shared variables. After the refactor, `genv.css` declares all variables it needs independently:

```css
/* genv page tokens — fully independent from styles.css */
:root {
  --genv-bg: #0b0f1a;
  --genv-surface: #111827;
  --genv-surface-2: #1a2235;
  --genv-border: rgba(255,255,255,0.08);
  --genv-text: #e2e8f0;
  --genv-text-muted: #8b9ab4;
  --genv-accent: #4ade80;
  --genv-accent-hover: #22c55e;
  --genv-code-bg: rgba(255,255,255,0.06);
  --genv-font: 'Inter', system-ui, sans-serif;
  --genv-radius: 0.75rem;
}
```

No visual changes to the genv page — purely structural.

---

## 3. Public Terminal Page (New)

### Files

| File | Purpose |
|------|---------|
| `public-terminal/index.html` | Full documentation page |
| `css/public-terminal.css` | Standalone styles with public.com palette |

### Color Palette (`css/public-terminal.css`)

```css
:root {
  --pt-bg: #0D1129;
  --pt-surface: #141C44;
  --pt-surface-2: #1A2352;
  --pt-border: rgba(106,195,47,0.15);
  --pt-text: #F0F4FF;
  --pt-text-muted: rgba(240,244,255,0.55);
  --pt-accent: #6AC32F;        /* public.com lime green */
  --pt-accent-hover: #0F9B4A; /* public.com dark green */
  --pt-code-bg: rgba(106,195,47,0.08);
  --pt-font: 'Inter', system-ui, sans-serif;
  --pt-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --pt-radius: 0.75rem;
}
```

### Page Sections

All sections follow the same pattern as `genv/index.html`: `<section id="...">` with `.section-label` heading.

#### 1. Get Started

Install commands with copy buttons (two blocks — uv, pipx). Then two CTA buttons: "View on GitHub" and "Download Latest".

```bash
# uv
uv tool install --force https://github.com/ks1686/public-terminal/releases/latest/download/public_terminal-latest.tar.gz

# pipx
pipx install --force https://github.com/ks1686/public-terminal/releases/latest/download/public_terminal-latest.tar.gz
```

Run commands: `public-terminal` and `public-terminal-rebalance`

Config stored at `~/.config/public-terminal/` (respects `$XDG_CONFIG_HOME`).

#### 2. Features

Feature cards grid (same layout as genv features):
- Multi-Account — persistent tab bar, add/remove at runtime
- Live Portfolio — holdings, values, quantities, open orders, options positions
- Direct Index Investing — top N from S&P 500, NASDAQ-100, DJIA, ACWI, SPUS; market-cap weighted, rebalanced daily
- Manual Orders — limit, stop, stop-limit for stocks, ETFs, and crypto
- Options Tracking — calls/puts with contract details, expiration, P&L; expiring within 7 days highlighted
- Portfolio Chart — scrollable price history with live balance streaming (`l` key)
- Margin Support — configurable percentage of margin capacity as additional buying power
- PDT Protection — day-trade ledger prevents same-day buy+sell round-trips
- Systemd Timer — automated daily rebalance Mon–Fri 12:00 ET, manageable from TUI

#### 3. Interface

ASCII layout diagram in a `<pre>` code block (verbatim from README):

```
Header (clock)
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
Footer (key bindings)
```

Key bindings table (full table from README: `r`, `l`, `b`, `s`, `v`, `c`, `h`, `[`, `]`, `t`, `e`, `x`, `S`, `Ctrl+A`, `Ctrl+Left`, `Ctrl+Right`, `q`).

#### 4. Placing Orders

Short description of the order modal flow. Inline explanation of order types: Market, Limit, Stop, Stop Limit. Note about day-only orders.

#### 5. Rebalancer

**Target allocation table:**

| Asset | Allocation | Notes |
|-------|-----------|-------|
| Stocks | 65% | Top N from configured index, market-cap weighted |
| BTC | 15% | Bitcoin |
| ETH | 5% | Ethereum |
| GLDM | 10% | Gold ETF |
| Cash | 5% | Uninvested buying power |

How-it-works: numbered steps (1–10) as a styled list.

Margin math block (code/pre block showing the formula).

**Supported indexes table:**

| Config value | Index |
|---|---|
| `SP500` | S&P 500 |
| `NASDAQ100` | NASDAQ-100 |
| `DJIA` | Dow Jones Industrial Average |
| `FTSE_GLOBAL_ALL_CAP` | Global equities (iShares ACWI proxy) |
| `SPUS` | SP Funds S&P 500 Shariah Industry Exclusions |

Settings modal fields table (Index, Top N, Margin usage, Excluded tickers).

#### 6. Systemd Timer

Explanation of `e` key (install/remove) and `t` key (pause/resume). Shell commands block for managing from terminal. Dry-run command.

#### 7. Configuration Files

File tree in a `<pre>` block. Table describing each file's purpose.

### Navigation Drawer

Top-level site links (same as other pages) plus "On this page" section with jump links for all 7 sections.

### Homepage Card (Karim's Work section)

New card added to the `#karim-work` shortcuts grid:
- Icon: `💹`
- Title: Public Terminal
- Description: A btop-style trading TUI for Public.com — direct index investing from your terminal
- href: `/public-terminal`
- Opens in same tab (internal page)

### Nav Drawer Updates (all pages)

Every page's side drawer (`index.html`, `genv/index.html`, `public-terminal/index.html`) gets a "Public Terminal" link:
- Icon `💹`, href `/public-terminal`
- Placed after the GENV entry

---

## Architecture Summary

```
pea-pod/
├── index.html                    ← updated: services, banner, nav
├── css/
│   ├── styles.css                ← unchanged
│   ├── genv.css                  ← refactored: fully independent CSS vars
│   └── public-terminal.css       ← new: public.com dark palette
├── genv/
│   └── index.html                ← updated: v2.1.2, banner, nav
└── public-terminal/
    └── index.html                ← new: full documentation page
```

Each page's stylesheet is fully self-contained. `styles.css` handles only the shared structural layout (header, footer, cards, burger menu). `genv.css` and `public-terminal.css` each own their own complete token sets.

---

## Out of Scope

- No changes to `js/app.js`, `css/styles.css`, `changelogs.html`, or `manifest.json`
- No new JavaScript for the public-terminal page — reuse `app.js` (copy buttons, service card clicks, burger menu)
