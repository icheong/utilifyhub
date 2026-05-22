/**
 * UtilifyHub - Global Client-Side Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize general behaviors
  initSearch();
  initCategoryFilters();
});

/**
 * Handle Search Filter across Tool Cards
 */
function initSearch() {
  const searchInput = document.getElementById('search-tools');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const toolCards = document.querySelectorAll('.tool-card');

    toolCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const desc = card.querySelector('p').textContent.toLowerCase();
      const tags = card.dataset.tags ? card.dataset.tags.toLowerCase() : '';

      if (title.includes(query) || desc.includes(query) || tags.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/**
 * Sidebar Category Filters
 */
function initCategoryFilters() {
  const categoryLinks = document.querySelectorAll('.sidebar-link[data-category]');
  if (categoryLinks.length === 0) return;

  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Update active state
      categoryLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const selectedCategory = link.dataset.category;
      const toolCards = document.querySelectorAll('.tool-card');

      toolCards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Shared Utility: Copy text to clipboard with feedback
 * @param {string} text - Text to copy
 * @param {HTMLElement} buttonElement - Button clicked to provide visual feedback
 * @param {string} originalHtml - Original HTML of the button to restore
 */
function copyToClipboard(text, buttonElement, originalHtml) {
  if (!navigator.clipboard) {
    // Fallback
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

/**
 * Shared Utility: Generate customizable visual alert messages in tools
 * @param {string} containerId - Element ID to render the alert inside
 * @param {string} message - Alert message string
 * @param {string} type - 'success' | 'danger' | 'warning'
 */
function showAlert(containerId, message, type = 'danger') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const emoji = type === 'success' ? '✅' : type === 'danger' ? '❌' : '⚠️';
  container.innerHTML = `
    <div class="alert alert-${type}">
      <span>${emoji}</span>
      <span>${message}</span>
    </div>
  `;
}

function clearAlert(containerId) {
  const container = document.getElementById(containerId);
  if (container) container.innerHTML = '';
}
