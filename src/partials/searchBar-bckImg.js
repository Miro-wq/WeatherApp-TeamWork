import { getWeatherByCityName } from '../apiOpenWAther.js'; // Calea corectă

async function loadSearchBarHTML() {
  try {
    const response = await fetch('./partials/searchBar-bckImg.html');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  } catch (error) {
    console.error('Error loading search bar HTML:', error);
  }
}

function initializeSearch(onSearch) {
  let searchBarContainer = document.getElementById('search-bar-container');

  // Dacă elementul nu există, creează-l și adaugă-l în document
  if (!searchBarContainer) {
    searchBarContainer = document.createElement('div');
    searchBarContainer.id = 'search-bar-container';
    document.body.appendChild(searchBarContainer); // Adaugă-l la finalul body-ului
  }

  // Verifică dacă bara de căutare este deja prezentă
  if (!searchBarContainer.querySelector('#search-input')) {
    // Încarcă HTML-ul pentru bara de căutare și adaugă-l în container
    loadSearchBarHTML().then(html => {
      if (searchBarContainer) {
        searchBarContainer.innerHTML = html;

        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');

        if (searchInput && searchButton) {
          searchButton.addEventListener('click', async () => {
            const city = searchInput.value.trim();
            if (city) {
              try {
                const weatherData = await getWeatherByCityName(city);
                onSearch(weatherData);
              } catch (error) {
                console.error('Error fetching weather data:', error);
              }
            }
          });
        } else {
          console.error('Search input or button not found.');
        }
      }
    }).catch(error => {
      console.error('Error processing search bar HTML:', error);
    });
  }
}

export { initializeSearch };
