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
    : CMET_NEWS_DATA.filter(item => {
        if (category === 'Upcoming Event') return item.category === 'Upcoming Event';
        if (category === 'Events') return item.category === 'Events' || item.category === 'Upcoming Event';
        return item.category === category;
      });

  if (filteredData.length === 0) {
    if (category === 'Upcoming Event') {
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="p-4 p-md-5 rounded-4 bg-light border d-inline-block text-center" style="max-width: 620px;">
            <div class="mb-3 d-inline-flex p-3 rounded-circle bg-white shadow-sm" style="color: var(--teal, #137a6a);">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <h4 class="fw-bold text-blue mb-2">No Upcoming Events at Present</h4>
            <p class="text-muted mb-4 lead-sm" style="font-size: 0.98rem; line-height: 1.6;">All scheduled technical programs, exposure visits, and demonstrations have concluded successfully. New workshops and calls will be announced here.</p>
            <button class="btn btn-outline-cyan btn-sm rounded-pill px-4 py-2 fw-semibold" onclick="document.querySelector('.news-filter-btn[data-category=\\'All\\']').click();">Browse Concluded Events &amp; News &rarr;</button>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <p class="text-muted fs-5">No news items found in this category.</p>
        </div>
      `;
    }
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

    const mediaHtml = item.featuredImage
      ? `<img src="${escapeHTML(item.featuredImage)}" alt="${escapeHTML(item.title)}" loading="lazy" class="news-card-img">`
      : `<div class="d-flex flex-column justify-content-center align-items-center h-100 w-100 text-white text-center px-3" style="background: linear-gradient(135deg, #0b2733 0%, #137a6a 100%);">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="mb-2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
          <span class="small fw-semibold text-uppercase" style="letter-spacing: 0.08em; opacity: 0.9;">CMET &bull; ${escapeHTML(item.category || 'News Update')}</span>
        </div>`;

    html += `
      <div class="col-md-6 col-lg-4">
        <div class="news-card h-100 reveal active reveal-slide-up" onclick="handleCardClick(event, '${item.id}', ${hasReadMore})">
          <div class="news-card-img-wrap">
            ${mediaHtml}
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
  container.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
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
  if (newsId === 'cmet-two-day-exposure-program-oct2026') {
    newsId = 'cmet-odisha-technical-program-oct2026';
  }
  const itemIndex = CMET_NEWS_DATA.findIndex(item => item.id === newsId);
  if (itemIndex === -1) return;
  
  const item = CMET_NEWS_DATA[itemIndex];
  const modalElem = document.getElementById('newsDetailModal');
  if (!modalElem) return;

  // Title, Date, Category
  document.getElementById('modalNewsTitle').innerText = item.title;
  document.getElementById('modalNewsDate').innerText = item.date;
  const catElem = document.getElementById('modalNewsCategory');
  if (catElem) {
    catElem.innerText = item.category || 'News';
    if (item.category === 'Upcoming Event') {
      catElem.style.background = 'rgba(194, 65, 12, 0.12)';
      catElem.style.color = '#c2410c';
    } else {
      catElem.style.background = 'rgba(19, 122, 106, 0.1)';
      catElem.style.color = 'var(--teal)';
    }
  }

  // Full Writeup
  const contentArea = document.getElementById('modalNewsContent');
  contentArea.innerHTML = item.fullDescription || (item.shortDescription ? `<p>${item.shortDescription}</p>` : '');

  // Images Carousel / Single View
  const galleryArea = document.getElementById('modalNewsGallery');
  const rawImages = item.images && item.images.length > 0 ? item.images : (item.featuredImage ? [item.featuredImage] : []);
  const images = rawImages.filter(Boolean);
  const captionHtml = item.photoCaption
    ? `<p class="small text-muted fst-italic mt-2 mb-0"><strong>Photo Caption:</strong> ${escapeHTML(item.photoCaption)}</p>`
    : '';

  if (images.length === 0) {
    galleryArea.innerHTML = item.photoCaption
      ? `<div class="p-3 mb-4 rounded-3 bg-light border small text-muted fst-italic"><strong>Photo Caption:</strong> ${escapeHTML(item.photoCaption)}</div>`
      : '';
  } else if (images.length === 1) {
    galleryArea.innerHTML = `
      <div class="single-news-image mb-4">
        <img src="${escapeHTML(images[0])}" alt="${escapeHTML(item.title)}" class="img-fluid rounded-4 shadow-sm w-100">
        ${captionHtml}
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
      <div class="mb-4">
        <div id="newsModalCarousel" class="carousel slide" data-bs-ride="carousel">
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
        ${captionHtml}
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

    const mediaHtml = item.featuredImage
      ? `<img src="${escapeHTML(item.featuredImage)}" alt="${escapeHTML(item.title)}" loading="lazy" class="news-card-img">`
      : `<div class="d-flex flex-column justify-content-center align-items-center h-100 w-100 text-white text-center px-3" style="background: linear-gradient(135deg, #0b2733 0%, #137a6a 100%);">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="mb-2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
          <span class="small fw-semibold text-uppercase" style="letter-spacing: 0.08em; opacity: 0.9;">CMET &bull; ${escapeHTML(item.category || 'Latest')}</span>
        </div>`;

    html += `
      <div class="col-md-6 col-lg-4">
        <div class="news-card h-100 reveal active reveal-slide-up" onclick="handleHomepageNewsClick(event, '${item.id}')">
          <div class="news-card-img-wrap">
            ${mediaHtml}
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
  container.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
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
