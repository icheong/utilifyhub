/**
 * UtilifyGrid - Global Client-Side Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initCategoryFilters();
});

function initSearch() {
  const searchInput = document.getElementById('search-tools');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const toolCards = document.querySelectorAll('.tool-card');
    const activeCategory = getActiveCategory();

    toolCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const desc = card.querySelector('p').textContent.toLowerCase();
      const tags = card.dataset.tags ? card.dataset.tags.toLowerCase() : '';
      const cardCategory = card.dataset.category;

      const matchesQuery = !query || title.includes(query) || desc.includes(query) || tags.includes(query);
      const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;

      card.style.display = matchesQuery && matchesCategory ? 'flex' : 'none';
    });
  });
}

function getActiveCategory() {
  const activeLink = document.querySelector('.sidebar-link.active[data-category]');
  return activeLink ? activeLink.dataset.category : 'all';
}

function initCategoryFilters() {
  const categoryLinks = document.querySelectorAll('.sidebar-link[data-category]');
  if (categoryLinks.length === 0) return;

  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      categoryLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const selectedCategory = link.dataset.category;
      const searchInput = document.getElementById('search-tools');
      const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
      const toolCards = document.querySelectorAll('.tool-card');

      toolCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();
        const tags = card.dataset.tags ? card.dataset.tags.toLowerCase() : '';
        const cardCategory = card.dataset.category;

        const matchesQuery = !query || title.includes(query) || desc.includes(query) || tags.includes(query);
        const matchesCategory = selectedCategory === 'all' || cardCategory === selectedCategory;

        card.style.display = matchesQuery && matchesCategory ? 'flex' : 'none';
      });
    });
  });
}

function copyToClipboard(text, buttonElement, originalHtml) {
  if (!navigator.clipboard) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      showCopySuccess(buttonElement, originalHtml);
    } catch (err) {
      console.error('Fallback: Copy failed', err);
    }
    document.body.removeChild(textarea);
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    showCopySuccess(buttonElement, originalHtml);
  }, (err) => {
    console.error('Async: Copy failed', err);
  });
}

function showCopySuccess(btn, originalHtml) {
  btn.classList.add('btn-success');
  btn.innerHTML = '<span>✅ Copied!</span>';
  setTimeout(() => {
    btn.classList.remove('btn-success');
    btn.innerHTML = originalHtml;
  }, 2000);
}

function showAlert(containerId, message, type = 'danger') {
  const container = document.getElementById(containerId);
  if (!container) return;
  const emoji = type === 'success' ? '✅' : type === 'danger' ? '❌' : '⚠️';
  container.innerHTML = `<div class="alert alert-${type}"><span>${emoji}</span><span>${message}</span></div>`;
}

function clearAlert(containerId) {
  const container = document.getElementById(containerId);
  if (container) container.innerHTML = '';
}
