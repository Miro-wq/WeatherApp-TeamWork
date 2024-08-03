import { initializeSearch } from './partials/searchBar-bckImg.js'; // Calea corectă
import { initializeWeatherCard } from './partials/weathercard.js'; // Calea corectă

document.addEventListener('DOMContentLoaded', async () => {
  // Inițializează bara de căutare
  initializeSearch((weatherData) => {
    initializeWeatherCard(weatherData);
  });
});
