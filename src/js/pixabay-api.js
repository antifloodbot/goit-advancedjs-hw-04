const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '53246584-28feabd4215ec3afc796f885c';

const DEFAULT_PARAMS = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: 40,
};

export async function fetchImages(query, page = 1) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    page,
    ...DEFAULT_PARAMS,
  });

  const url = `${BASE_URL}?${searchParams.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}