import { initializeSearch } from './partials/searchBar';
import { initializeWeatherCard } from './partials/weathercard.js';

document.addEventListener('DOMContentLoaded', async () => {
  initializeSearch(); // Inițializează bara de căutare
  initializeWeatherCard(); // Inițializează cardul meteo și afișează datele pentru București
});
