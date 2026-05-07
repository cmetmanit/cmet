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
});
