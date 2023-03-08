export default class NewsApiService {
  constructor() {
      this.searchQuery = '';
      this.page = 1;
  }

  fetchGallery() {
    const API_KEY = '34171664-962fcc0ca1a314a1660696e5b';
    const BASE_URL = 'https://pixabay.com/api/';
    fetch(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal
  &safesearch=true&per_page=40&page=${this.page}`
      ).then(response => response.json())
      .then(data => {
          this.page += 1;
      })
    }
    
    resetPage() {
        this.page = 1;
    }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
