import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchGallery } from './fetchGallery';

const searchForm = document.querySelector('#search-form');
const galleryElement = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault();

    const formSearchQuery = event.currentTarget.elements.searchQuery.value;
}

function renderGalleryMarkup(elements) {
  return elements
    .map(({}) => {
      return `<div class="photo-card">
      <img src="${photo}" alt="" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
        </p>
        <p class="info-item">
          <b>Views</b>
        </p>
        <p class="info-item">
          <b>Comments</b>
        </p>
        <p class="info-item">
          <b>Downloads</b>
        </p>
      </div>
    </div>`;
    })
    .join('');
}
