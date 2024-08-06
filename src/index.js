import { initializeSearch } from './partials/searchBar';
import {
  initializeWeatherCard,
  fetchAndDisplayWeatherForCity,
} from './partials/weathercard.js';
import { loadAndRenderChart } from './partials/graphic.js';

document.addEventListener('DOMContentLoaded', async () => {
  initializeSearch();
  initializeWeatherCard();
});
