import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";
import NewsApiService from './news-service';

const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more');

const NewsApiService = new NewsApiService();

searchForm.addEventListener('submit', onSearch);
buttonLoadMore.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();

  NewsApiService.query =
    event.currentTarget.elements.searchQuery.value.trim();
  
  // if (!NewsApiService.searchQuery) {
  //   CleareGalleryContainer();
  //   return;
  // }
  
  if (NewsApiService.searchQuery === '') {
    return alert('введите то - то нормальное');
  }
  
  NewsApiService.resetPage();
  NewsApiService.fetchGallery().then(images => {
    CleareGalleryContainer();
    renderGalleryMarkup(images);
  });
  }

function onLoadMore() {
  NewsApiService.fetchGallery().then(renderGalleryMarkup(images));
}

function CleareGalleryContainer() {
  galleryContainer.innerHTML = '';
}

function renderGalleryMarkup(images) {
  const markup = images
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



