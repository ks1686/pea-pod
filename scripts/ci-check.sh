#!/usr/bin/env bash
# Static-site checks for pea-pod. No npm, no build.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

fail() {
  printf 'FAIL: %s\n' "$*" >&2
  exit 1
}

pass() {
  printf 'ok  %s\n' "$*"
}

# ---- Required files --------------------------------------------------------
required=(
  index.html
  changelogs.html
  404.html
  genv/index.html
  public-terminal/index.html
  peaproxy/index.html
  css/styles.css
  css/genv.css
  css/public-terminal.css
  css/peaproxy.css
  js/app.js
  js/changelogs.js
  wrangler.jsonc
  _headers
  manifest.json
  icons/icon-192.png
  icons/icon-512.png
  favicon.png
  apple-touch-icon.png
)
for f in "${required[@]}"; do
  [[ -f "$f" ]] || fail "missing $f"
done
pass "required files exist"

# ---- Forbidden strings (live site files only) ------------------------------
forbid_hits="$(
  grep -RInE \
    'v3\.2\.1|schemaVersion.: .4.|ks1686\.github\.io/favicon|GitHub Pages|initServiceCards|nodejs_compat|rgba\(106, 195, 47' \
    --include='*.html' --include='*.css' --include='*.js' --include='*.jsonc' --include='*.md' --include='_headers' \
    . \
    --exclude-dir=.git --exclude-dir=docs --exclude-dir=.wrangler \
    || true
)"
if [[ -n "$forbid_hits" ]]; then
  printf '%s\n' "$forbid_hits" >&2
  fail "forbidden strings still present"
fi
pass "forbidden strings absent"

# ---- Per-page chrome -------------------------------------------------------
pages=(index.html changelogs.html 404.html genv/index.html public-terminal/index.html peaproxy/index.html)
for page in "${pages[@]}"; do
  grep -q 'class="skip-link"' "$page" || fail "$page missing skip-link"
  grep -q 'document.documentElement.classList.add("js")' "$page" || fail "$page missing js class bootstrap"
  grep -q 'https://pea-pod.me/icons/icon-512.png' "$page" || fail "$page missing og:image"
  grep -q 'id="main"' "$page" || fail "$page missing main id"
  grep -q 'GitHub Pages' "$page" && fail "$page still mentions GitHub Pages"
done
pass "shared chrome on every page"

# ---- GENV facts ------------------------------------------------------------
# Version pins must match the newest ks1686/genv release tag; bump both together.
grep -q 'v4.5.1' genv/index.html || fail "genv page missing v4.5.1"
grep -q 'genv_4.5.1_linux_amd64.tar.gz' genv/index.html || fail "genv page missing linux 4.5.1 tarball"
grep -q 'genv_4.5.1_windows_amd64.zip' genv/index.html || fail "genv page missing windows 4.5.1 zip"
grep -qE 'v4\.0\.(9|10|11|12|13)|v4\.2\.2' genv/index.html && fail "genv page still pins an old version"
grep -q '"schemaVersion": "8"' genv/index.html || fail "genv page missing schema v8"
grep -q 'schema v9' genv/index.html || fail "genv page missing schema v9 mention"
grep -q 'brew install --cask genv' genv/index.html || fail "genv page missing cask install"
pass "genv v4 facts"

# ---- PeaProxy facts --------------------------------------------------------
# Pin to the newest ks1686/peaproxy release tag; bump version strings together.
grep -q 'v1.6.1' peaproxy/index.html || fail "peaproxy page missing v1.6.1"
grep -q 'go install github.com/ks1686/peaproxy/cmd/peaproxy@v1.6.1' peaproxy/index.html || fail "peaproxy page missing go install @v1.6.1"
grep -q 'peaproxy_1.6.1_linux_amd64.tar.gz' peaproxy/index.html || fail "peaproxy page missing linux 1.6.1 tarball"
grep -q '127.0.0.1:8317' peaproxy/index.html || fail "peaproxy page missing localhost bind"
grep -q 'PeaProxy authors are not liable' peaproxy/index.html || fail "peaproxy page missing OAuth liability line"
grep -q 'v1.6.1 includes' peaproxy/index.html || fail "peaproxy page missing v1.6.1 includes OAuth status"
grep -q '/v1/responses' peaproxy/index.html || fail "peaproxy page missing /v1/responses"
grep -q 'passes tools through' peaproxy/index.html || fail "peaproxy page missing Codex tools pass-through"
grep -q '/v1/images/generations' peaproxy/index.html || fail "peaproxy page missing /v1/images/generations"
grep -q '/v1/embeddings' peaproxy/index.html || fail "peaproxy page missing /v1/embeddings"
grep -q 'Copilot' peaproxy/index.html || fail "peaproxy page missing Copilot OAuth"
grep -q 'OpenCode Go' peaproxy/index.html || fail "peaproxy page missing OpenCode Go"
grep -q 'Droid' peaproxy/index.html || fail "peaproxy page missing Droid client preset"
grep -q 'provider-reported remaining when known' peaproxy/index.html || fail "peaproxy page missing honest quota remaining"
grep -q 'never invented' peaproxy/index.html || fail "peaproxy page missing quota never-invented honesty"
grep -q 'GET /admin/quota' peaproxy/index.html || fail "peaproxy page missing GET /admin/quota"
grep -q 'subscription_oauth' peaproxy/index.html || fail "peaproxy page missing subscription_oauth catalog filter"
grep -q 'https://raw.githubusercontent.com/ks1686/peaproxy/main/docs/screenshots/' peaproxy/index.html || fail "peaproxy page missing README screenshots on main"
grep -q 'docs/screenshots/accounts.png' peaproxy/index.html || fail "peaproxy page missing accounts screenshot"
grep -q 'docs/screenshots/health.png' peaproxy/index.html || fail "peaproxy page missing health screenshot"
grep -q 'Qwen consumer OAuth' peaproxy/index.html || fail "peaproxy page missing Qwen not-yet residual"
grep -q 'catalog' peaproxy/index.html || fail "peaproxy page missing catalog CLI"
grep -q 'requests' peaproxy/index.html || fail "peaproxy page missing requests CLI"
grep -q 'fill-first' peaproxy/index.html || fail "peaproxy page missing fill-first failover"
grep -q 'sticky' peaproxy/index.html || fail "peaproxy page missing sticky failover"
grep -qE 'v1\.6\.0|v1\.5\.0|v1\.4\.0|v1\.3\.0|v1\.2\.0|v1\.1\.0|v1\.0\.0|v0\.2\.8|v0\.2\.7|v0\.2\.6|v0\.2\.5|v0\.2\.4|v0\.2\.3|v0\.2\.2|v0\.2\.1|v0\.2\.0|v0\.1\.0|peaproxy@main|OAuth is on|not this tag|lives on main' peaproxy/index.html && fail "peaproxy page still pins an old version or OAuth-on-main"
grep -q 'href="/peaproxy"' index.html || fail "home nav missing PeaProxy"
pass "peaproxy v1.6.1 facts"

# ---- Wrangler / headers ----------------------------------------------------
grep -q '"not_found_handling": "404-page"' wrangler.jsonc || fail "wrangler missing 404-page handling"
grep -q 'nodejs_compat' wrangler.jsonc && fail "wrangler still has nodejs_compat"
grep -q 'X-Content-Type-Options: nosniff' _headers || fail "_headers missing nosniff"
grep -q 'X-Frame-Options: DENY' _headers || fail "_headers missing frame deny"
pass "wrangler and headers"

# ---- JS hide only under .js ------------------------------------------------
if grep -nE '^\.card \{|^\.section \{' -A 20 css/styles.css | grep -q 'opacity: 0'; then
  fail "cards/sections still hidden without .js prefix"
fi
grep -q '^\.js .card {' css/styles.css || fail "missing .js .card hide rule"
grep -q '^\.js .section {' css/styles.css || fail "missing .js .section hide rule"
pass "no-JS visibility"

# ---- Smoke serve -----------------------------------------------------------
PORT="${PORT:-8765}"
python3 -m http.server "$PORT" --bind 127.0.0.1 >/tmp/pea-pod-ci-http.log 2>&1 &
server_pid=$!
cleanup() { kill "$server_pid" >/dev/null 2>&1 || true; }
trap cleanup EXIT

ready=0
for _ in $(seq 1 50); do
  if curl -fsS "http://127.0.0.1:${PORT}/" >/dev/null 2>&1; then
    ready=1
    break
  fi
  sleep 0.1
done
[[ "$ready" == "1" ]] || fail "local http.server never became ready on :$PORT"

expect_200=(
  /
  /index.html
  /changelogs.html
  /404.html
  /genv/
  /public-terminal/
  /peaproxy/
  /css/styles.css
  /css/peaproxy.css
  /js/app.js
  /js/changelogs.js
  /icons/icon-512.png
  /manifest.json
)
for path in "${expect_200[@]}"; do
  code="000"
  code="$(curl -sS -o /tmp/pea-pod-ci-body -w '%{http_code}' "http://127.0.0.1:${PORT}${path}" || true)"
  [[ "$code" == "200" ]] || fail "$path returned $code"
done
pass "local smoke 200s"

home="$(curl -fsS "http://127.0.0.1:${PORT}/")" || fail "could not fetch /"
printf '%s' "$home" | grep -q 'Skip to content' || fail "home missing skip link in served HTML"
printf '%s' "$home" | grep -q 'Cloudflare Workers' || fail "home missing Workers footer"
pass "served home copy"

echo "ci-check passed"
