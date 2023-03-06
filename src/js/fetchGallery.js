const API_KEY = '34171664-962fcc0ca1a314a1660696e5b';
const BASE_URL = 'https://pixabay.com/api/';

fetch(
  `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal
  &safesearch=true&per_page=20&page=1`
).then(response => {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
  if (!response) {
    throw new Error(response.status);
  }
  return response.json();
});

export { fetchGallery };
