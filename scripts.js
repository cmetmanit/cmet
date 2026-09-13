// Auto-highlight active navigation link and parent dropdowns
function highlightActiveNavLink() {
  let currentPath = window.location.pathname.split('/').pop() || 'index';
  currentPath = currentPath.split('#')[0].split('?')[0].replace(/\.html$/, '');
  if (currentPath === '') currentPath = 'index';

  // Highlight direct nav links
  document.querySelectorAll('.navbar .nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('#')) return;
    const linkPath = href.split('/').pop().split('#')[0].split('?')[0].replace(/\.html$/, '');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  // Highlight dropdown items and mark parent dropdown toggle as active
  document.querySelectorAll('.navbar .dropdown-item').forEach(function (item) {
    const href = item.getAttribute('href');
    if (!href || href === '#' || href.startsWith('#')) return;
    const itemPath = href.split('/').pop().split('#')[0].split('?')[0].replace(/\.html$/, '');
    if (itemPath === currentPath) {
      item.classList.add('active');
      const parentDropdown = item.closest('.nav-item.dropdown');
      if (parentDropdown) {
        const toggle = parentDropdown.querySelector('.dropdown-toggle');
        if (toggle) toggle.classList.add('active');
      }
    }
  });
}

// Reusable dynamic component loader for header and footer (Method 1)
function loadSharedComponent(elementId, filePath, callback) {
  const target = document.getElementById(elementId);
  if (!target) return;
  fetch(filePath)
    .then(function (res) {
      if (!res.ok) throw new Error('Failed to load ' + filePath);
      return res.text();
    })
    .then(function (html) {
      target.innerHTML = html;
      if (typeof callback === 'function') callback();
    })
    .catch(function (err) {
      console.warn('Could not load shared component:', filePath, err);
    });
}

// Desktop-only dropdown hover enhancement for Bootstrap navbars
function initDropdownHover() {
  const desktopQuery = window.matchMedia('(min-width: 992px)');
  const hoverDelay = 250;
  const dropdownItems = Array.from(document.querySelectorAll('.nav-item.dropdown'));
  const hoverState = new WeakMap();

  if (!dropdownItems.length || !window.bootstrap || !window.bootstrap.Dropdown) {
    return;
  }

  const clearTimers = function(state) {
    if (state.openTimer) { clearTimeout(state.openTimer); state.openTimer = null; }
    if (state.closeTimer) { clearTimeout(state.closeTimer); state.closeTimer = null; }
  };

  const showDropdown = function(state) {
    clearTimers(state);
    if (!state.dropdownMenu.classList.contains('show')) {
      state.openTimer = setTimeout(function() {
        state.dropdownInstance.show();
      }, 50);
    }
  };

  const hideDropdown = function(state) {
    if (state.openTimer) { clearTimeout(state.openTimer); state.openTimer = null; }
    state.closeTimer = setTimeout(function() {
      if (!state.dropdownItem.matches(':hover') && !state.dropdownMenu.matches(':hover')) {
        state.dropdownInstance.hide();
      }
    }, hoverDelay);
  };

  const attachHover = function(dropdownItem) {
    const trigger = dropdownItem.querySelector('[data-bs-toggle="dropdown"]');
    const menu = dropdownItem.querySelector('.dropdown-menu');
    if (!trigger || !menu) return;

    const instance = window.bootstrap.Dropdown.getOrCreateInstance(trigger);
    const state = {
      dropdownItem: dropdownItem,
      trigger: trigger,
      dropdownMenu: menu,
      dropdownInstance: instance,
      openTimer: null,
      closeTimer: null,
      mouseEnterHandler: null,
      mouseLeaveHandler: null,
      menuEnterHandler: null,
      menuLeaveHandler: null
    };
    hoverState.set(dropdownItem, state);

    state.mouseEnterHandler = function() {
      if (desktopQuery.matches) showDropdown(state);
    };
    state.mouseLeaveHandler = function() {
      if (desktopQuery.matches) hideDropdown(state);
    };
    state.menuEnterHandler = function() {
      if (desktopQuery.matches) {
        clearTimeout(state.closeTimer);
        state.closeTimer = null;
      }
    };
    state.menuLeaveHandler = function() {
      if (desktopQuery.matches) hideDropdown(state);
    };

    dropdownItem.addEventListener('mouseenter', state.mouseEnterHandler);
    dropdownItem.addEventListener('mouseleave', state.mouseLeaveHandler);
    menu.addEventListener('mouseenter', state.menuEnterHandler);
    menu.addEventListener('mouseleave', state.menuLeaveHandler);
  };

  const detachHover = function(dropdownItem) {
    const state = hoverState.get(dropdownItem);
    if (!state) return;
    clearTimers(state);
    dropdownItem.removeEventListener('mouseenter', state.mouseEnterHandler);
    dropdownItem.removeEventListener('mouseleave', state.mouseLeaveHandler);
    state.dropdownMenu.removeEventListener('mouseenter', state.menuEnterHandler);
    state.dropdownMenu.removeEventListener('mouseleave', state.menuLeaveHandler);
    hoverState.delete(dropdownItem);
  };

  const enableHover = function() {
    dropdownItems.forEach(function(item) {
      if (!hoverState.get(item)) attachHover(item);
    });
  };

  const disableHover = function() {
    dropdownItems.forEach(function(item) {
      detachHover(item);
    });
  };

  desktopQuery.addEventListener('change', function(e) {
    if (e.matches) { enableHover(); } else { disableHover(); }
  });

  if (desktopQuery.matches) {
    enableHover();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  function setupHeader() {
    highlightActiveNavLink();
    initDropdownHover();
  }

  // Load Shared Header if container exists; otherwise highlight hardcoded nav
  if (document.getElementById('site-header')) {
    loadSharedComponent('site-header', 'header.html', setupHeader);
  } else {
    setupHeader();
  }

  if (document.body.classList.contains('page-home')) {
    // Hero Background Slideshow (cycles through all 5 banner images smoothly without any dots/overlays)
    if (window.__cmetHeroInitialized) return;
    const heroSlides = document.querySelectorAll('.hero-section .hero-slide');
    if (heroSlides.length > 1) {
      window.__cmetHeroInitialized = true;
      let currentHeroIndex = 0;
      const heroInterval = 5000;

      // Preload images for seamless transitions
      heroSlides.forEach(function(slide) {
        const bg = slide.style.backgroundImage;
        if (bg) {
          const match = bg.match(/url\(['"]?(.*?)['"]?\)/);
          if (match && match[1]) {
            const img = new Image();
            img.src = match[1];
          }
        }
      });

      setInterval(function() {
        heroSlides[currentHeroIndex].classList.remove('active');
        currentHeroIndex = (currentHeroIndex + 1) % heroSlides.length;
        heroSlides[currentHeroIndex].classList.add('active');
      }, heroInterval);
    }

    const track = document.querySelector('.collaborator-track');
    if (track) {
      let scrollPos = 0;
      setInterval(() => {
        scrollPos += 1;
        if (scrollPos > track.scrollWidth - track.clientWidth) {
          scrollPos = 0;
        }
        track.scrollTo({ left: scrollPos, behavior: 'smooth' });
      }, 50);
    }
  }

  // Gallery Lightbox Functionality
  if (document.body.classList.contains('page-gallery')) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modalHTML = `
      <div class="lightbox-modal" id="lightboxModal">
        <div class="lightbox-content">
          <span class="lightbox-close">&times;</span>
          <img id="lightboxImage" src="" alt="">
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeBtn = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', function() {
        const img = this.querySelector('img');
        lightboxImage.src = img.src;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
      });
    });

    closeBtn.addEventListener('click', function() {
      modal.classList.remove('show');
      document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Desktop-only dropdown hover enhancement is initialized in setupHeader() upon header component load.

  // IntersectionObserver for Scroll Reveal Animations with Fallback
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(function(el) {
      el.classList.add('active');
    });
  } else {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -20px 0px'
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          const countElements = entry.target.querySelectorAll('.count-up');
          countElements.forEach(function(el) { animateCounter(el); });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(function(el) {
      revealObserver.observe(el);
    });
  }

  // Animated Counter Logic
  function animateCounter(el) {
    if (el.dataset.animated === 'true') return;
    el.dataset.animated = 'true';

    const target = parseInt(el.dataset.target, 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);

    let frame = 0;
    const counter = setInterval(function() {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      el.textContent = prefix + currentCount + suffix;

      if (frame === totalFrames) {
        clearInterval(counter);
        el.textContent = prefix + target + suffix;
      }
    }, frameDuration);
  }

  // Pause collaborator marquee animation on hover for user accessibility
  const marquees = document.querySelectorAll('.collab-marquee');
  marquees.forEach(function(m) {
    m.addEventListener('mouseenter', function() {
      m.style.animationPlayState = 'paused';
    });
    m.addEventListener('mouseleave', function() {
      m.style.animationPlayState = 'running';
    });
  });

  // Site-wide Footer Visitor Counter
  function initVisitorCounter() {
    const footerContainer = document.querySelector('.footer .container');
    if (!footerContainer) return;

    let counterWrap = document.getElementById('visitor-counter-wrap');
    if (!counterWrap) {
      counterWrap = document.createElement('div');
      counterWrap.id = 'visitor-counter-wrap';
      counterWrap.className = 'visitor-counter-box';
      footerContainer.appendChild(counterWrap);
    }

    const baseCount = 18452;

    function renderCounter(count) {
      const formatted = String(count).padStart(6, '0');
      const digitsHtml = formatted
        .split('')
        .map(function(d) { return '<span class="counter-digit">' + d + '</span>'; })
        .join('');

      counterWrap.innerHTML = 
        '<div class="visitor-counter-inner" title="Total Website Visits">' +
          '<span class="visitor-label">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-1">' +
              '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>' +
              '<circle cx="12" cy="12" r="3"></circle>' +
            '</svg>' +
            'Visitors' +
          '</span>' +
          '<div class="counter-odometer">' + digitsHtml + '</div>' +
        '</div>';
    }

    function fallbackLocal() {
      var stored = parseInt(localStorage.getItem('cmet_visitor_count'), 10);
      if (isNaN(stored) || stored < baseCount) {
        stored = baseCount;
      }
      if (!sessionStorage.getItem('cmet_session_counted')) {
        sessionStorage.setItem('cmet_session_counted', 'true');
        stored += 1;
        localStorage.setItem('cmet_visitor_count', stored);
      }
      renderCounter(stored);
    }

    // Try fetching from visitor-counter.php endpoint
    fetch('visitor-counter.php')
      .then(function(res) {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then(function(data) {
        if (data && data.count) {
          renderCounter(data.count);
          localStorage.setItem('cmet_visitor_count', data.count);
        } else {
          fallbackLocal();
        }
      })
      .catch(function() {
        fallbackLocal();
      });
  }

  // Load Shared Footer if container exists; otherwise initialize hardcoded footer counter
  if (document.getElementById('site-footer')) {
    loadSharedComponent('site-footer', 'footer.html', initVisitorCounter);
  } else {
    initVisitorCounter();
  }
});
