import fetchGallery from './news-service';
// import cardArticles from './templates/card-articles.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const endCollectionText = document.querySelector('.end-collection-text');

loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);

let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

let currentPage = 1;
let currentHits = 0;
let searchQuery = '';

searchForm.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();

  searchQuery = event.currentTarget.searchQuery.value;
  currentPage = 1;

  if (searchQuery === '') {
    return;
  }

  const response = await fetchGallery(searchQuery, currentPage);
  currentPage = response.hits.length;

  if (response.totalHits > 40) {
    loadMoreBtn.classList.remove('.is-hidden');
  } else {
    loadMoreBtn.classList.add('.is-hidden');
  }

  try {
    if (response.totalHits > 0) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
      galleryContainer.innerHTML = '';
      renderGalleryMarkup(response.hits);
      lightbox.refresh();
      endCollectionText.classList.add('.is-hidden');

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * -100,
        behavior: 'smooth',
      });
    }

    if (response.totalHits === 0) {
      galleryContainer.innerHTML = '';
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.classList.add('.is-hidden');
      endCollectionText.classList.add('.is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

async function onClickLoadMoreBtn() {
  currentPage += 1;
  const response = await fetchGallery(searchQuery, currentPage);
  renderGalleryMarkup(response.hits);
  lightbox.refresh();
  currentHits += response.hits.length;

  if (currentHits === response.totalHits) {
    loadMoreBtn.classList.add('.is-hidden');
    endCollectionText.classList.remove('.is-hidden');
  }
}

function renderGalleryMarkup(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
    <div class="photo-card">
      <a href="${largeImageURL}">
        <img
          class="photo-card__img"
          src="${webformatURL}" 
          alt="${tags}" 
          loading="lazy" 
          width="320"
          height="212"
        />
      </a>
      <div class="info">
        <p class="info__item">
          <b>Likes</b>
          <span>${likes}</span>
        </p>
        <p class="info__item">
          <b>Views</b>
          <span>${views}</span>
        </p>
        <p class="info__item">
          <b>Comments</b>
          <span>${comments}</span>
        </p>
        <p class="info__item">
          <b>Downloads</b>
          <span>${downloads}</span>
        </p>
      </div>
    </div>
    `;
      }
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
}







