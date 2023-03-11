import axios from 'axios';

const API_KEY = '34171664-962fcc0ca1a314a1660696e5b';
const BASE_URL = 'https://pixabay.com/api/';

export default async function fetchGallery(value, page) {
  return await axios
    .get(
      `${BASE_URL}?key=${API_KEY}&q=${value}&image_type=photo&
        orientation=horizontal
        &safesearch=true&per_page=40&page=${page}`
    )
    .then(response => response.data);
}
