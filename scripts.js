document.addEventListener('DOMContentLoaded', function () {
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-link').forEach(function (link) {
    if (link.getAttribute('href') === path || (path === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });

  if (document.body.classList.contains('page-home')) {
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

  // Desktop-only dropdown hover enhancement for Bootstrap navbars.
  (function() {
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
        // Only close if cursor is not hovering the nav-item or the dropdown-menu
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
  })();

  // IntersectionObserver for Scroll Reveal Animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
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
});
