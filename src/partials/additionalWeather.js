import moment from 'moment'; // Biblioteca pentru manipularea timpului.
import { getWeatherByCityName } from '../apiOpenWeather.js';
import 'animate.css';

// Funcție pentru a obține datele suplimentare meteo.
export async function fetchAdditionalWeatherData(city) {
  if (!city) {
    console.error('City is not defined');
    return;
  }

  try {
    const weatherData = await getWeatherByCityName(city); // Obținem datele meteo pentru orașul dat.
    if (!weatherData || !weatherData.coord) {
      console.error('Invalid weather data received');
      return;
    }

    // Eliminăm apelul către TimeZoneDB și lucrăm doar cu datele OpenWeather.
    updateAdditionalWeatherCard(weatherData); // Actualizăm cardul meteo suplimentar cu datele meteo.

    const quoteData = await fetchRandomQuote(); // Obținem un citat aleatoriu.
    if (!quoteData) {
      updateQuote('Quote not found', 'Author not found');
      showAdditionalWeatherCard();
      return;
    }
    updateQuote(quoteData.content, quoteData.author); // Actualizăm cardul cu citate.
    showAdditionalWeatherCard();
  } catch (error) {
    console.error('Error fetching additional weather data:', error);
    updateQuote('Quote not found', 'Author not found');
    showAdditionalWeatherCard();
  }
}

async function fetchRandomQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching quote:', error);
    return null;
  }
}

// Funcție actualizată pentru a calcula și afisa datele fără TimeZoneDB.
function updateAdditionalWeatherCard(weatherData) {
  const weatherCard = document.getElementById('additional-weather-card');

  if (weatherCard) {
    // Calculăm timpul local în baza UTC și fusul orar al locației.
    const timezoneOffsetInSeconds = weatherData.timezone; // Offset-ul de fus orar în secunde față de UTC.
    const timezoneOffsetInMilliseconds = timezoneOffsetInSeconds * 1000;

    // Ora locală curentă bazată pe offset-ul de fus orar
    const localTime = new Date(
      new Date().getTime() + timezoneOffsetInMilliseconds
    );

    // Funcție pentru a obține sufixul ordinal al zilei.
    function getOrdinalSuffix(day) {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    }

    const day = localTime.getUTCDate();
    const dayOfWeek = localTime.toLocaleString('en-US', { weekday: 'short' });
    const month = localTime.toLocaleString('en-US', { month: 'long' });
    const formattedDate = `${day}<sup>${getOrdinalSuffix(
      day
    )}</sup> ${dayOfWeek}`;

    // Actualizăm elementele cardului meteo cu datele obținute.
    weatherCard.querySelector('.current-date').innerHTML = formattedDate;
    weatherCard.querySelector('.current-month').textContent = month;
    weatherCard.querySelector('.current-time').textContent = localTime
      .toUTCString()
      .split(' ')[4]; // Ora locală

    // Calculăm orele de răsărit și apus folosind datele returnate de OpenWeather.
    const sunriseTime = new Date(
      (weatherData.sys.sunrise + timezoneOffsetInSeconds) * 1000
    )
      .toUTCString()
      .split(' ')[4];
    const sunsetTime = new Date(
      (weatherData.sys.sunset + timezoneOffsetInSeconds) * 1000
    )
      .toUTCString()
      .split(' ')[4];

    weatherCard.querySelector('.sunrise-time').innerHTML = sunriseTime;
    weatherCard.querySelector('.sunset-time').innerHTML = sunsetTime;
  } else {
    console.error('Additional weather card element not found in the DOM');
  }
}

function updateQuote(quote, author) {
  const quoteCard = document.getElementById('quote-card');

  if (quoteCard) {
    quoteCard.querySelector('.quote-text').textContent = quote;
    quoteCard.querySelector('.quote-author').textContent = `— ${author}`;
  } else {
    console.error('Quote card element not found in the DOM');
  }
}

export function showAdditionalWeatherCard() {
  const additionalWeatherCard = document.getElementById(
    'additional-weather-card'
  );
  const quoteCard = document.getElementById('quote-card');

  if (additionalWeatherCard && quoteCard) {
    additionalWeatherCard.style.display = 'block';
    quoteCard.style.display = 'block';

    additionalWeatherCard.classList.remove(
      'animate__animated',
      'animate__fadeOutLeft'
    );
    quoteCard.classList.remove('animate__animated', 'animate__fadeOutRight');

    void additionalWeatherCard.offsetWidth;
    void quoteCard.offsetWidth;

    additionalWeatherCard.classList.add(
      'animate__animated',
      'animate__fadeInLeft'
    );
    quoteCard.classList.add('animate__animated', 'animate__fadeInRight');
  }
}

export function hideAdditionalWeatherCard() {
  const additionalWeatherCard = document.getElementById(
    'additional-weather-card'
  );
  const quoteCard = document.getElementById('quote-card');

  if (additionalWeatherCard && quoteCard) {
    additionalWeatherCard.style.display = 'none';
    quoteCard.style.display = 'none';

    additionalWeatherCard.classList.remove(
      'animate__animated',
      'animate__fadeInLeft'
    );
    quoteCard.classList.remove('animate__animated', 'animate__fadeInRight');
  }
}

hideAdditionalWeatherCard();
