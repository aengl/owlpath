function showGallery(img) {
  document.body.classList.add('gallery-open');
  document.querySelector('#gallery .caption').innerHTML = img.getAttribute(
    'data-gallery-caption'
  );
  document
    .querySelector('#gallery img')
    .setAttribute('srcset', img.getAttribute('data-gallery-source'));
  document
    .getElementById('gallery')
    .setAttribute('style', 'display: initial');
}

function hideGallery() {
  document.body.classList.remove('gallery-open');
  document.querySelector('#gallery img').setAttribute('srcset', '');
  document.getElementById('gallery').setAttribute('style', '');
}

// Open gallery when clicking image
const images = document.querySelectorAll('img[data-gallery-source]');
images.forEach(node =>
  node.addEventListener('click', () => showGallery(node))
);

// Close gallery when clicking background
const gallery = document.getElementById('gallery');
gallery.addEventListener('click', () => hideGallery());

// Close gallery when pressing 'esc'
document.onkeydown = event => {
  if (event.key === 'Escape') {
    hideGallery();
  }
};
