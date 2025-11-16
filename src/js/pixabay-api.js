import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '53246584-28feabd4215ec3afc796f885c';

export const PER_PAGE = 15;

const DEFAULT_PARAMS = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: PER_PAGE,
};

export async function fetchImages(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    page,
    ...DEFAULT_PARAMS,
  };

  const response = await axios.get(BASE_URL, { params });

  if (!response.data) {
    throw new Error('Empty response from API');
  }

  return response.data;
}