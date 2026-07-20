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
    const hoverDelay = 220;
    const dropdownItems = Array.from(document.querySelectorAll('.nav-item.dropdown'));
    const hoverState = new WeakMap();

    if (!dropdownItems.length || !window.bootstrap || !window.bootstrap.Dropdown) {
      return;
    }

    const clearTimers = state => {
      if (state.openTimer) {
        clearTimeout(state.openTimer);
        state.openTimer = null;
      }
      if (state.closeTimer) {
        clearTimeout(state.closeTimer);
        state.closeTimer = null;
      }
    };

    const showDropdown = state => {
      clearTimeout(state.closeTimer);
      if (!state.dropdownMenu.classList.contains('show')) {
        state.openTimer = window.setTimeout(() => {
          state.dropdownInstance.show();
        }, 50);
      }
    };

    const hideDropdown = state => {
      clearTimeout(state.openTimer);
      state.closeTimer = window.setTimeout(() => {
        if (!state.dropdownItem.matches(':hover')) {
          state.dropdownInstance.hide();
        }
      }, hoverDelay);
    };

    const attachHover = (dropdownItem) => {
      const trigger = dropdownItem.querySelector('[data-bs-toggle="dropdown"]');
      const menu = dropdownItem.querySelector('.dropdown-menu');
      if (!trigger || !menu) {
        return;
      }

      const instance = window.bootstrap.Dropdown.getOrCreateInstance(trigger);
      const state = {
        dropdownItem,
        trigger,
        dropdownMenu: menu,
        dropdownInstance: instance,
        openTimer: null,
        closeTimer: null,
        mouseEnterHandler: null,
        mouseLeaveHandler: null,
        menuEnterHandler: null,
      };
      hoverState.set(dropdownItem, state);

      state.mouseEnterHandler = () => {
        if (!desktopQuery.matches) return;
        showDropdown(state);
      };
      state.mouseLeaveHandler = () => {
        if (!desktopQuery.matches) return;
        hideDropdown(state);
      };
      state.menuEnterHandler = () => {
        if (!desktopQuery.matches) return;
        clearTimeout(state.closeTimer);
      };

      dropdownItem.addEventListener('mouseenter', state.mouseEnterHandler);
      dropdownItem.addEventListener('mouseleave', state.mouseLeaveHandler);
      menu.addEventListener('mouseenter', state.menuEnterHandler);
      menu.addEventListener('mouseleave', state.mouseLeaveHandler);
    };

    const detachHover = (dropdownItem) => {
      const state = hoverState.get(dropdownItem);
      if (!state) return;
      clearTimers(state);
      dropdownItem.removeEventListener('mouseenter', state.mouseEnterHandler);
      dropdownItem.removeEventListener('mouseleave', state.mouseLeaveHandler);
      state.dropdownMenu.removeEventListener('mouseenter', state.menuEnterHandler);
      state.dropdownMenu.removeEventListener('mouseleave', state.mouseLeaveHandler);
    };

    const enableHover = () => {
      dropdownItems.forEach(dropdownItem => {
        const state = hoverState.get(dropdownItem);
        if (state && state.mouseEnterHandler) {
          return;
        }
        attachHover(dropdownItem);
      });
    };

    const disableHover = () => {
      dropdownItems.forEach(dropdownItem => {
        detachHover(dropdownItem);
      });
    };

    const onDesktopChange = (event) => {
      if (event.matches) {
        enableHover();
      } else {
        disableHover();
      }
    };

    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener('change', onDesktopChange);
    } else if (desktopQuery.addListener) {
      desktopQuery.addListener(onDesktopChange);
    }

    if (desktopQuery.matches) {
      enableHover();
    }
  })();
});
