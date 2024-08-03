function initializeWeatherCard(weatherData) {
    const weatherDataContainer = document.getElementById('weather-data');
    displayWeatherData(weatherData);
  
    function displayWeatherData(data) {
      const { name, main, weather } = data;
      weatherDataContainer.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Weather: ${weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${weather[0].icon}.png" alt="Weather icon" />
      `;
    }
  }
  
  export { initializeWeatherCard };
  