import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import NewsApiService from './news-service';
import LoadMoreBtn from './load-more-btn';

const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
// const buttonLoadMore = document.querySelector('.load-more');

const LoadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});
const NewsApiService = new NewsApiService();

searchForm.addEventListener('submit', onSearch);
LoadMoreBtn.refs.button.addEventListener('click', fetchBoxGallery);

async function onSearch(event) {
  event.preventDefault();

  NewsApiService.query = event.currentTarget.elements.searchQuery.value.trim();

  if (NewsApiService.query === '') {
    CleareGalleryContainer();
    return Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  LoadMoreBtn.show();
  NewsApiService.resetPage();
  CleareGalleryContainer();
  fetchBoxGallery();
}

async function fetchBoxGallery() {
  LoadMoreBtn.disable();
  NewsApiService.fetchGallery().then(images => {
    renderGalleryMarkup(images);
    LoadMoreBtn.enable();
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
