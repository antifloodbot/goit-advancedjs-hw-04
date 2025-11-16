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

form.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();

  const query = input.value.trim();

  if (!query) {
    showInfo('Please enter a search term.');
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await fetchImages(query);

    if (!data.hits || data.hits.length === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }

    renderImages(data.hits);
  } catch (err) {
    console.error(err);
    showError('Something went wrong. Please try again later.');
  } finally {
    hideLoader();
  }
}