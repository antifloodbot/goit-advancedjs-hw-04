import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import errorIcon from '../img/vectors/circle_Vector_left.svg';
import closeIcon from '../img/vectors/close_Vector_right.svg';
import xInsideIcon from '../img/vectors/X_Vector_left.svg';

const gallery = document.querySelector('#gallery');
const loader = document.querySelector('#loader');

let lightbox = null;

export function clearGallery() {
  gallery.innerHTML = '';
}

export function renderImages(images) {
  const markup = images
    .map(
      img => `
      <div class="card">
        <a class="gallery__item" href="${img.largeImageURL}">
          <img
            class="gallery__image"
            src="${img.webformatURL}"
            alt="${img.tags}"
            loading="lazy"
          />
        </a>

        <div class="info">
          <div class="info-item">
            <span class="label">Likes</span>
            <span class="value">${img.likes}</span>
          </div>
          <div class="info-item">
            <span class="label">Views</span>
            <span class="value">${img.views}</span>
          </div>
          <div class="info-item">
            <span class="label">Comments</span>
            <span class="value">${img.comments}</span>
          </div>
          <div class="info-item">
            <span class="label">Downloads</span>
            <span class="value">${img.downloads}</span>
          </div>
        </div>
      </div>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('#gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function showLoader() {
  if (loader) {
    loader.style.display = 'block';
  }
}

export function hideLoader() {
  if (loader) {
    loader.style.display = 'none';
  }
}

export function showError(message) {
  document.documentElement.style.setProperty(
    '--x-inside-icon',
    `url(${xInsideIcon})`
  );
  document.documentElement.style.setProperty(
    '--close-icon',
    `url(${closeIcon})`
  );

  iziToast.error({
    message,
    position: 'topRight',
    timeout: 4000,
    close: true,
    closeOnClick: true,
    progressBar: true,
    drag: false,
    maxWidth: 432,
    layout: 2,
    iconUrl: errorIcon,
  });
}

export function showInfo(message) {
  iziToast.info({
    message,
    position: 'topRight',
  });
}