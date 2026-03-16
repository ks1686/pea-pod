/**
 * Pea Pod Network - changelogs.js
 * Fetches and renders the git commit history from the GitHub API.
 */

const REPO_OWNER = 'ks1686';
const REPO_NAME = 'pea-pod';
const PER_PAGE = 20;

let currentPage = 1;
let isLoading = false;

document.addEventListener('DOMContentLoaded', () => {
  loadCommits();
  document.getElementById('btn-load-more').addEventListener('click', loadCommits);
});

/**
 * Fetch a page of commits from the GitHub API and append them to the timeline.
 */
async function loadCommits() {
  if (isLoading) return;
  isLoading = true;

  const loadMoreWrap = document.getElementById('load-more-wrap');
  const btnLoadMore = document.getElementById('btn-load-more');
  btnLoadMore.disabled = true;

  try {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?per_page=${PER_PAGE}&page=${currentPage}`;
    const response = await fetch(url, {
      headers: { Accept: 'application/vnd.github+json' },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const commits = await response.json();

    // Remove the loading indicator on first load
    if (currentPage === 1) {
      const loadingEl = document.getElementById('changelog-loading');
      if (loadingEl) loadingEl.remove();
    }

    if (commits.length === 0 && currentPage === 1) {
      renderEmpty();
      return;
    }

    renderCommits(commits);
    currentPage++;

    // Hide "Load more" if this was the last page
    if (commits.length < PER_PAGE) {
      loadMoreWrap.hidden = true;
    } else {
      loadMoreWrap.hidden = false;
      btnLoadMore.disabled = false;
    }
  } catch (err) {
    if (currentPage === 1) {
      const loadingEl = document.getElementById('changelog-loading');
      if (loadingEl) loadingEl.remove();
      renderError(err.message);
    } else {
      btnLoadMore.disabled = false;
    }
    console.error('Failed to load commits:', err);
  } finally {
    isLoading = false;
  }
}

/**
 * Render an array of commit objects into the timeline.
 * @param {Array} commits - Array of GitHub commit objects
 */
function renderCommits(commits) {
  const container = document.getElementById('changelog-container');

  // Create or reuse the changelog list element
  let list = container.querySelector('.changelog-list');
  if (!list) {
    list = document.createElement('ol');
    list.className = 'changelog-list';
    list.setAttribute('aria-label', 'Commit history');
    container.appendChild(list);
  }

  commits.forEach((commit) => {
    const sha = commit.sha.slice(0, 7);
    const message = escapeHtml(commit.commit.message.split('\n')[0]);
    const author = escapeHtml(commit.commit.author.name);
    const date = formatDate(commit.commit.author.date);
    const commitUrl = commit.html_url;

    const item = document.createElement('li');
    item.className = 'changelog-item';
    item.setAttribute('aria-label', `Commit ${sha}: ${commit.commit.message.split('\n')[0]}`);
    item.innerHTML = `
      <div class="changelog-dot" aria-hidden="true">📝</div>
      <div class="changelog-body">
        <div class="changelog-header">
          <span class="changelog-message">${message}</span>
          <a
            class="changelog-sha"
            href="${commitUrl}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View commit ${sha} on GitHub"
          >${sha}</a>
        </div>
        <div class="changelog-meta">
          <span class="author">${author}</span>
          <span class="separator">·</span>
          <time datetime="${commit.commit.author.date}">${date}</time>
        </div>
      </div>
    `;

    list.appendChild(item);
  });
}

/**
 * Render a friendly empty-state message.
 */
function renderEmpty() {
  const container = document.getElementById('changelog-container');
  container.innerHTML = '<p class="changelog-empty">No commits found.</p>';
}

/**
 * Render an error message in the container.
 * @param {string} message - Error description
 */
function renderError(message) {
  const container = document.getElementById('changelog-container');
  container.innerHTML = `
    <div class="changelog-error" role="alert">
      <strong>Couldn't load changelogs.</strong><br />
      ${escapeHtml(message)}<br />
      <small>Check your connection or try again later.</small>
    </div>
  `;
}

/**
 * Format an ISO date string into a human-readable form using the browser locale.
 * @param {string} isoDate
 * @returns {string}
 */
function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString(navigator.language || 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Escape HTML special characters to prevent XSS.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
