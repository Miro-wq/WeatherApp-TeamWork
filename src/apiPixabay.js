const API_KEY = '24587351-f51ecbfdd1a1ed72c58205b43';
const BASE_URL = 'https://pixabay.com/api';

// Funcție generală pentru cereri către Pixabay API
async function fetchFromAPI(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Network response was not ok. Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

// Obține imagini după un cuvânt cheie
async function searchImages(query, page = 1, perPage = 20) {
  const url = `${BASE_URL}/?key=${API_KEY}&q=${query}&image_type=photo&page=${page}&per_page=${perPage}`;
  console.log('Fetching images from URL:', url);
  return await fetchFromAPI(url);
}

// Obține videouri după un cuvânt cheie
async function searchVideos(query, page = 1, perPage = 20) {
  const url = `${BASE_URL}/videos/?key=${API_KEY}&q=${query}&page=${page}&per_page=${perPage}`;
  console.log('Fetching videos from URL:', url);
  return await fetchFromAPI(url);
}

// Obține detalii despre o imagine după ID
async function getImageDetails(imageId) {
  const url = `${BASE_URL}/?key=${API_KEY}&id=${imageId}`;
  console.log('Fetching image details from URL:', url);
  return await fetchFromAPI(url);
}

// Obține detalii despre un video după ID
async function getVideoDetails(videoId) {
  const url = `${BASE_URL}/videos/?key=${API_KEY}&id=${videoId}`;
  console.log('Fetching video details from URL:', url);
  return await fetchFromAPI(url);
}

// Obține imagini populare
async function getPopularImages(
  category = '',
  editorsChoice = false,
  page = 1,
  perPage = 20
) {
  const url = `${BASE_URL}/?key=${API_KEY}&order=popular&category=${category}&editors_choice=${editorsChoice}&page=${page}&per_page=${perPage}`;
  console.log('Fetching popular images from URL:', url);
  return await fetchFromAPI(url);
}

// Obține videouri populare
async function getPopularVideos(
  category = '',
  editorsChoice = false,
  page = 1,
  perPage = 20
) {
  const url = `${BASE_URL}/videos/?key=${API_KEY}&order=popular&category=${category}&editors_choice=${editorsChoice}&page=${page}&per_page=${perPage}`;
  console.log('Fetching popular videos from URL:', url);
  return await fetchFromAPI(url);
}

// Obține imagini aleatorii
async function getRandomImages(query, page = 1, perPage = 3) {
  const url = `${BASE_URL}/?key=${API_KEY}&q=${query}&image_type=photo&per_page=${perPage}&page=${page}`;
  console.log('Fetching image from URL:', url); // Log pentru verificarea URL-ului
  return await fetchFromAPI(url);
}

// Obține videouri aleatorii
async function getRandomVideos(category = '', page = 1, perPage = 20) {
  const url = `${BASE_URL}/videos/?key=${API_KEY}&order=latest&category=${category}&page=${page}&per_page=${perPage}`;
  console.log('Fetching random videos from URL:', url);
  return await fetchFromAPI(url);
}

// Obține imagini după culoare
async function getImagesByColor(color, page = 1, perPage = 20) {
  const url = `${BASE_URL}/?key=${API_KEY}&colors=${color}&image_type=photo&page=${page}&per_page=${perPage}`;
  console.log('Fetching images by color from URL:', url);
  return await fetchFromAPI(url);
}

// Obține videouri după culoare (dacă este suportat)
async function getVideosByColor(color, page = 1, perPage = 20) {
  const url = `${BASE_URL}/videos/?key=${API_KEY}&colors=${color}&page=${page}&per_page=${perPage}`;
  console.log('Fetching videos by color from URL:', url);
  return await fetchFromAPI(url);
}

export {
  searchImages, // Obține imagini după un cuvânt cheie
  searchVideos, // Obține videouri după un cuvânt cheie
  getImageDetails, // Obține detalii despre o imagine după ID
  getVideoDetails, // Obține detalii despre un video după ID
  getPopularImages, // Obține imagini populare
  getPopularVideos, // Obține videouri populare
  getRandomImages, // Obține imagini aleatorii
  getRandomVideos, // Obține videouri aleatorii
  getImagesByColor, // Obține imagini după culoare
  getVideosByColor, // Obține videouri după culoare (dacă este suportat)
};
