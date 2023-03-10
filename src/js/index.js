import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import NewsApiService from './news-service';
import LoadMoreBtn from './load-more-btn';

const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
// const buttonLoadMore = document.querySelector('.load-more');

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});
const newsApiService = new NewsApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchBoxGallery);

async function onSearch(event) {
  event.preventDefault();

  newsApiService.query = event.currentTarget.elements.searchQuery.value.trim();

  if (newsApiService.query === '') {
    CleareGalleryContainer();
    return Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (data.length > 10) {
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  loadMoreBtn.show();
  newsApiService.resetPage();
  CleareGalleryContainer();
  fetchBoxGallery();
}

async function fetchBoxGallery() {
  loadMoreBtn.disable();
  newsApiService.fetchGallery().then(images => {
    renderGalleryMarkup(images);
    loadMoreBtn.enable();
  });
}

function CleareGalleryContainer() {
  galleryContainer.innerHTML = '';
}

async function renderGalleryMarkup(images) {
  const markup = await images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments }) => {
      return `<div class="photo-card">
      <a href="${webformatURL}">
        <img src="${largeImageURL}" alt="${tags}" loading="lazy"/>
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <span>${likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b>
          <span>${views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b>
          <span>${comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b>
          <span>${downloads}</span>
        </p>
      </div>
    </div>`;
    })
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
}
