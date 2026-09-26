## Learned User Preferences

- Prefer short A/B/C clarifying questions before design or implementation work; answers are often single-letter or one-word.
- After design approval, prefer shipping the full agreed scope to production rather than stopping at design docs or partial passes.
- Prefer targeted sync of project pages to current GitHub README facts (versions, install, platforms, auth) over full README mirrors or thin version-only bumps.
- Site visual direction: modern IDE-terminal look (near-black panels, monospace, soft accents)—not CRT/retro maximalism.
- Full-site shared terminal shell with per-app accent colors (pea-pod green, genv red, public-terminal blue, peaproxy teal) and medium motion (typing intro, staggered reveals, subtle grid drift—not matrix rain or heavy flicker).

## Learned Workspace Facts

- Pea-pod is a dependency-free static site (HTML/CSS/vanilla JS) deployed with Cloudflare Workers via Wrangler to pea-pod.me (`wrangler.jsonc` assets directory is `.`).
- Always keep `.assetsignore` excluding `.git`, `.wrangler`, `.cursor`, and other non-site paths so Workers asset uploads do not publish private files.
- Featured project docs live at `/genv`, `/public-terminal`, and `/peaproxy` and should stay aligned with the `ks1686/genv`, `ks1686/public-terminal`, and `ks1686/peaproxy` GitHub READMEs.
- The Self-Hosted Services section and Private/Public service badges were removed from the landing page, nav, and README; the site is a project hub with quick links, not a services directory.
- Local `npx wrangler login && npx wrangler deploy` is a valid production deploy path when Cloudflare Workers Builds tokens fail or are stale.
