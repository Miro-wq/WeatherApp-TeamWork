function initializeWeatherCard(weatherData) {
  const weatherDataContainer = document.getElementById(
    'weather-data-container'
  );
  if (weatherDataContainer) {
    weatherDataContainer.innerHTML = `
      <div class="weather-today-card">
        <div class="city-card">
          <div class="today-icon">
            <h3 class="current-city">${weatherData.name}</h3>
            <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" alt="Weather Icon" class="weather-icon">
          </div>
          <div class="today-degrees">
            <span class="temp">${weatherData.main.temp}°C</span>
          </div>
          <div class="minmax-temp">
            <div class="min">Min: ${weatherData.main.temp_min}°C</div>
            <span class="divide-line">|</span>
            <div class="max">Max: ${weatherData.main.temp_max}°C</div>
          </div>
        </div>
      </div>
    `;
  }
}

export { initializeWeatherCard };
