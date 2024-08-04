import {
  getWeatherByCoordinates,
  getReverseGeocoding,
  getWeatherByCityName,
} from '../apiOpenWeather.js';
import { setBackgroundForCity } from './backgroundImage.js';
import { fetchAdditionalWeatherData } from './additionalWeather.js';

export function displayWeatherDataOnCard(data) {
  const cityNameElement = document.getElementById('city-name');
  const temperatureElement = document.getElementById('temperature');
  const descriptionElement = document.getElementById('description');
  const humidityElement = document.getElementById('humidity');
  const weatherCardElement = document.getElementById('weather-card');

  if (
    cityNameElement &&
    temperatureElement &&
    descriptionElement &&
    humidityElement &&
    weatherCardElement
  ) {
    cityNameElement.textContent = data.name;
    temperatureElement.textContent = `Temperature: ${data.main.temp} °C`;
    descriptionElement.textContent = `Description: ${data.weather[0].description}`;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;

    setBackgroundForCity(data.name);
  } else {
    console.error('One or more elements not found in the DOM');
  }
  fetchAdditionalWeatherData(data.name); // Afișează și datele adiționale
}

export async function fetchAndDisplayWeatherForCity(city) {
  try {
    const data = await getWeatherByCityName(city);
    displayWeatherDataOnCard(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

export async function fetchAndDisplayWeatherForLocation(lat, lon) {
  try {
    const data = await getWeatherByCoordinates(lat, lon);
    const locationData = await getReverseGeocoding(lat, lon);
    data.name = locationData[0].name;
    displayWeatherDataOnCard(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

export function initializeWeatherCard() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchAndDisplayWeatherForLocation(latitude, longitude);
      },
      error => {
        console.error('Error getting location:', error);
        fetchAndDisplayWeatherForCity('București');
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser');
    fetchAndDisplayWeatherForCity('București');
  }
}
