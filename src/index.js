import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SlimSelect from 'slim-select';
import 'slim-select/styles';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const catInfoDiv = document.querySelector('.cat-info');

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message || 'Oops! Something went wrong!',
    position: 'topRight',
  });
}

function hideError() {
  errorElement.style.display = 'none';
}

function updateCatInfo(cat) {
  catInfoDiv.innerHTML = `
    <img src="${cat.url}" alt="Cat Image" width=600 heigh=600>
    <p>Breed: ${cat.breeds[0].name}</p>
    <p>Description: ${cat.breeds[0].description}</p>
    <p>Temperament: ${cat.breeds[0].temperament}</p>
  `;
}

function populateBreedsSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.appendChild(option);
  });

  new SlimSelect({
    select: breedSelect,
  });
}

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    showLoader();
    hideError();

    fetchCatByBreed(selectedBreedId)
      .then(cat => {
        updateCatInfo(cat);
        hideLoader();
      })
      .catch(() => {
        showError();
        hideLoader();
      });
  }
});

// Load breeds on page load
showLoader();
hideError();

fetchBreeds()
  .then(breeds => {
    populateBreedsSelect(breeds);
    hideLoader();
  })
  .catch(() => {
    showError();
    hideLoader();
  });
