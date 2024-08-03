import { getWeatherByCityName } from './apiOpenWAther.js';
import { initializeWeatherCard } from './partials/weathercard.js';

document.addEventListener('DOMContentLoaded', async () => {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  if (searchInput && searchButton) {
    searchButton.addEventListener('click', async () => {
      const city = searchInput.value.trim();
      if (city) {
        try {
          const weatherData = await getWeatherByCityName(city);
          initializeWeatherCard(weatherData);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }
    });
  } else {
    console.error('Search input or button not found.');
  }
});
