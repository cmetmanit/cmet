/**
 * CMET News Module Script
 * Handles dynamic grid rendering, category filtering, modal detail popups,
 * multi-image sliders, and homepage latest news rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize News Grid on news.html
  const newsGridContainer = document.getElementById('news-grid-container');
  if (newsGridContainer) {
    initNewsPage();
  }

  // Initialize Homepage Latest News on index.html
  const homepageNewsContainer = document.getElementById('homepage-news-container');
  if (homepageNewsContainer) {
    renderHomepageLatestNews();
  }
});

/**
 * Initialize News Page grid and filters
 */
function initNewsPage() {
  renderNewsGrid('All');
  setupCategoryFilters();
}

/**
 * Render News Grid Cards dynamically
 */
function renderNewsGrid(category) {
  const container = document.getElementById('news-grid-container');
  if (!container) return;

  const filteredData = (category === 'All') 
    ? CMET_NEWS_DATA 
    : CMET_NEWS_DATA.filter(item => item.category === category);

  if (filteredData.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <p class="text-muted fs-5">No news items found in this category.</p>
      </div>
    `;
    return;
  }

  let html = '';
  filteredData.forEach(item => {
    const hasReadMore = !!(item.fullDescription || (item.images && item.images.length > 1));
    const shortDesc = item.shortDescription ? `<p class="news-card-desc">${escapeHTML(item.shortDescription)}</p>` : '';
    const readMoreBtn = hasReadMore 
      ? `<button class="btn btn-outline-cyan btn-sm rounded-pill mt-auto align-self-start" onclick="openNewsModal('${item.id}')">Read More &rarr;</button>` 
      : '';
    
    const catBadge = item.category ? `<span class="news-card-category">${escapeHTML(item.category)}</span>` : '';

    html += `
      <div class="col-md-6 col-lg-4">
        <div class="news-card h-100 reveal reveal-slide-up" onclick="handleCardClick(event, '${item.id}', ${hasReadMore})">
          <div class="news-card-img-wrap">
            <img src="${escapeHTML(item.featuredImage)}" alt="${escapeHTML(item.title)}" loading="lazy" class="news-card-img">
            ${catBadge}
          </div>
          <div class="news-card-body d-flex flex-column">
            <span class="news-card-date">${escapeHTML(item.date)}</span>
            <h5 class="news-card-title">${escapeHTML(item.title)}</h5>
            ${shortDesc}
            ${readMoreBtn}
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

/**
 * Handle Card Click
 */
function handleCardClick(event, newsId, hasDetails) {
  // If clicked button directly, return to avoid double trigger
  if (event.target.tagName === 'BUTTON' || event.target.closest('button')) return;
  if (hasDetails) {
    openNewsModal(newsId);
  }
}

/**
 * Setup Category Filter Buttons
 */
function setupCategoryFilters() {
  const filterBtns = document.querySelectorAll('.news-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      renderNewsGrid(category);
    });
  });
}

/**
 * Open News Detail Modal
 */
function openNewsModal(newsId) {
  const itemIndex = CMET_NEWS_DATA.findIndex(item => item.id === newsId);
  if (itemIndex === -1) return;
  
  const item = CMET_NEWS_DATA[itemIndex];
  const modalElem = document.getElementById('newsDetailModal');
  if (!modalElem) return;

  // Title, Date, Category
  document.getElementById('modalNewsTitle').innerText = item.title;
  document.getElementById('modalNewsDate').innerText = item.date;
  document.getElementById('modalNewsCategory').innerText = item.category || 'News';

  // Full Writeup
  const contentArea = document.getElementById('modalNewsContent');
  contentArea.innerHTML = item.fullDescription || (item.shortDescription ? `<p>${item.shortDescription}</p>` : '');

  // Images Carousel / Single View
  const galleryArea = document.getElementById('modalNewsGallery');
  const images = item.images && item.images.length > 0 ? item.images : [item.featuredImage];

  if (images.length === 1) {
    galleryArea.innerHTML = `
      <div class="single-news-image mb-4">
        <img src="${escapeHTML(images[0])}" alt="${escapeHTML(item.title)}" class="img-fluid rounded-4 shadow-sm w-100">
      </div>
    `;
  } else {
    // Multi-image Carousel Slider
    let indicators = '';
    let slides = '';
    images.forEach((imgSrc, idx) => {
      indicators += `<button type="button" data-bs-target="#newsModalCarousel" data-bs-slide-to="${idx}" class="${idx === 0 ? 'active' : ''}" aria-current="${idx === 0 ? 'true' : 'false'}"></button>`;
      slides += `
        <div class="carousel-item ${idx === 0 ? 'active' : ''}">
          <img src="${escapeHTML(imgSrc)}" class="d-block w-100 rounded-4 news-carousel-img" alt="Gallery Image ${idx + 1}">
        </div>
      `;
    });

    galleryArea.innerHTML = `
      <div id="newsModalCarousel" class="carousel slide mb-4" data-bs-ride="carousel">
        <div class="carousel-indicators">${indicators}</div>
        <div class="carousel-inner">${slides}</div>
        <button class="carousel-control-prev" type="button" data-bs-target="#newsModalCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#newsModalCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    `;
  }

  // Previous & Next Navigation Buttons inside Modal
  const prevIndex = (itemIndex - 1 + CMET_NEWS_DATA.length) % CMET_NEWS_DATA.length;
  const nextIndex = (itemIndex + 1) % CMET_NEWS_DATA.length;

  document.getElementById('modalPrevBtn').onclick = () => openNewsModal(CMET_NEWS_DATA[prevIndex].id);
  document.getElementById('modalNextBtn').onclick = () => openNewsModal(CMET_NEWS_DATA[nextIndex].id);

  // Show Bootstrap Modal
  const bsModal = new bootstrap.Modal(modalElem);
  bsModal.show();
}

/**
 * Render Homepage Latest News Section (Top 3 Items)
 */
function renderHomepageLatestNews() {
  const container = document.getElementById('homepage-news-container');
  if (!container) return;

  const top3 = CMET_NEWS_DATA.slice(0, 3);
  let html = '';

  top3.forEach(item => {
    const hasReadMore = !!(item.fullDescription || (item.images && item.images.length > 1));
    const shortDesc = item.shortDescription ? `<p class="news-card-desc">${escapeHTML(item.shortDescription)}</p>` : '';

    html += `
      <div class="col-md-6 col-lg-4">
        <div class="news-card h-100 reveal reveal-slide-up" onclick="handleHomepageNewsClick(event, '${item.id}')">
          <div class="news-card-img-wrap">
            <img src="${escapeHTML(item.featuredImage)}" alt="${escapeHTML(item.title)}" loading="lazy" class="news-card-img">
            <span class="news-card-category">${escapeHTML(item.category || 'Latest')}</span>
          </div>
          <div class="news-card-body d-flex flex-column">
            <span class="news-card-date">${escapeHTML(item.date)}</span>
            <h5 class="news-card-title">${escapeHTML(item.title)}</h5>
            ${shortDesc}
            <a href="news.html" class="text-cyan text-decoration-none mt-auto fw-semibold" style="color: var(--accent-cyan);">View Details &rarr;</a>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function handleHomepageNewsClick(event, newsId) {
  window.location.href = `news.html`;
}

/**
 * Helper to escape HTML characters
 */
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}
