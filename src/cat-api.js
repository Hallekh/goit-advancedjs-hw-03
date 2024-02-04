import axios from 'axios';

const apiKey =
  'live_n3WinCNEhIzDrfw6jESAPNolxerre1jDMGddp8KKRb0d6tPapfjNXTj69MMEqHQ1';

axios.defaults.headers.common['x-api-key'] = apiKey;

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return axios
    .get(url)
    .then(response => response.data[0])
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}
