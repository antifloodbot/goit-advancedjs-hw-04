import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  showLoader,
  hideLoader,
  showError,
  showInfo,
} from './js/render-functions.js';

const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const loadMoreBtn = document.querySelector('#load-more');

const PER_PAGE = 15;

let currentQuery = '';
let page = 1;
let totalHits = 0;
let loadedHits = 0;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

function hideLoadMore() {
  loadMoreBtn.classList.add('is-hidden');
}

function showLoadMore() {
  loadMoreBtn.classList.remove('is-hidden');
}

async function onSearch(e) {
  e.preventDefault();

  const query = input.value.trim();
  if (!query) return;

  currentQuery = query;
  page = 1;
  loadedHits = 0;
  clearGallery();
  hideLoadMore();
  showLoader();

  try {
    await loadImages();
  } catch (err) {
    console.error(err);
    showError('Something went wrong. Please try again later.');
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  showLoader();
  try {
    await loadImages();
  } catch (err) {
    console.error(err);
    showError('Something went wrong. Please try again later.');
  } finally {
    hideLoader();
  }
}

async function loadImages() {
  const data = await fetchImages(currentQuery, page);

  totalHits = data.totalHits;

  if (!data.hits || data.hits.length === 0) {
    if (page === 1) {
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }
    hideLoadMore();
    return;
  }

  renderImages(data.hits);

  loadedHits += data.hits.length;

  if (loadedHits >= totalHits) {
    hideLoadMore();
    showInfo("We're sorry, but you've reached the end of search results.");
  } else {
    showLoadMore();
  }

  if (page > 1) {
    const gallery = document.querySelector('#gallery');
    const firstCard = gallery.firstElementChild;

    if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  }

  page += 1;
}