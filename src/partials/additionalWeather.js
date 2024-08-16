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

    // Ascundem cardurile înainte de a actualiza datele
    hideAdditionalWeatherCard(() => {
      updateAdditionalWeatherCard(weatherData); // Actualizăm cardul meteo suplimentar cu datele meteo.

      // Obținem un citat aleatoriu după ascunderea cardurilor
      fetchRandomQuote().then(quoteData => {
        if (!quoteData) {
          updateQuote('Quote not found', 'Author not found');
        } else {
          updateQuote(quoteData.content, quoteData.author);
        }

        // Afișăm din nou cardurile după actualizarea datelor
        showAdditionalWeatherCard();
      });
    });
  } catch (error) {
    console.error('Error fetching additional weather data:', error);
    updateQuote('Quote not found', 'Author not found');
    showAdditionalWeatherCard();
  }
}

// Funcție pentru a obține citate random.
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

// Funcție care actualizează citatul în interfață
function updateQuote(quote, author) {
  const quoteCard = document.getElementById('quote-card');

  if (quoteCard) {
    quoteCard.querySelector('.quote-text').textContent = quote;
    quoteCard.querySelector('.quote-author').textContent = `— ${author}`;
  } else {
    console.error('Quote card element not found in the DOM');
  }
}

// Funcție pentru a calcula și afisa datele meteo.
function updateAdditionalWeatherCard(weatherData) {
  const weatherCard = document.getElementById('additional-weather-card');

  if (weatherCard) {
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

// Animația pentru intrare (vizibilă) și ieșire (ascunsă)
export function showAdditionalWeatherCard() {
  const additionalWeatherCard = document.getElementById(
    'additional-weather-card'
  );
  const quoteCard = document.getElementById('quote-card');

  if (additionalWeatherCard && quoteCard) {
    additionalWeatherCard.classList.remove('animate__fadeOutLeft');
    quoteCard.classList.remove('animate__fadeOutRight');

    additionalWeatherCard.style.display = 'block';
    quoteCard.style.display = 'block';

    void additionalWeatherCard.offsetWidth;
    void quoteCard.offsetWidth;

    additionalWeatherCard.classList.add(
      'animate__animated',
      'animate__fadeInLeft'
    );
    quoteCard.classList.add('animate__animated', 'animate__fadeInRight');
  }
}

// Funcție pentru a ascunde cardul de vreme suplimentară cu callback
export function hideAdditionalWeatherCard(callback) {
  const additionalWeatherCard = document.getElementById(
    'additional-weather-card'
  );
  const quoteCard = document.getElementById('quote-card');

  if (additionalWeatherCard && quoteCard) {
    additionalWeatherCard.classList.remove('animate__fadeInLeft');
    additionalWeatherCard.classList.add('animate__fadeOutLeft');

    quoteCard.classList.remove('animate__fadeInRight');
    quoteCard.classList.add('animate__fadeOutRight');

    setTimeout(() => {
      additionalWeatherCard.style.display = 'none';
      quoteCard.style.display = 'none';

      if (callback && typeof callback === 'function') {
        callback(); // Apelăm callback-ul după animația de ieșire
      }
    }, 1000); // Animația durează 1 secundă (1000ms)
  } else if (callback && typeof callback === 'function') {
    callback();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const additionalWeatherCard = document.getElementById(
    'additional-weather-card'
  );
  const quoteCard = document.getElementById('quote-card');

  if (additionalWeatherCard && quoteCard) {
    additionalWeatherCard.style.display = 'none';
    quoteCard.style.display = 'none';
  }
});
