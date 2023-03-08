import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewsApiService from './news-service';

const searchForm = document.querySelector('#search-form');
const galleryElement = document.querySelector('.gallery');
const buttonGallery = document.querySelector('.gallery__button');
const NewsApiService = new NewsApiService();

searchForm.addEventListener('submit', onSearch);
buttonGallery.addEventListener('click', onLoadMore);

// let page = 1;
// function onLoadMore(event) {
//   if (event) {
//     page += 1;
//   } else {
//     page === 1;
//   }
// }

function onSearch(event) {
  event.preventDefault();

  NewsApiService.searchQuery =
    event.currentTarget.elements.searchQuery.value.trim();
  NewsApiService.resetPage();
  NewsApiService.fetchGallery();
  // fetchGallery(formSearchQuery, page).then(response.length === 0);

  // if (!formSearchQuery) {
  //   clearTemplate();
  //   return;
  // }
}

function onLoadMore(event) {
  NewsApiService.fetchGallery();
}

// function clearTemplate() {
//   countryInfo.innerHTML = '';
//   countryList.innerHTML = '';
// }

// function renderGalleryMarkup(elements) {
//   return elements
//     .map(({}) => {
//       return `<div class="photo-card">
//       <img src="${photo}" alt="" loading="lazy" />
//       <div class="info">
//         <p class="info-item">
//           <b>Likes</b>
//         </p>
//         <p class="info-item">
//           <b>Views</b>
//         </p>
//         <p class="info-item">
//           <b>Comments</b>
//         </p>
//         <p class="info-item">
//           <b>Downloads</b>
//         </p>
//       </div>
//     </div>`;
//     })
//     .join('');
// }
