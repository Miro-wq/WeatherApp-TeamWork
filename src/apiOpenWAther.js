const API_KEY = 'c28b86768a874c70b1ecd1343e8f0f24';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_BASE_URL = 'http://api.openweathermap.org/geo/1.0';
const MAP_BASE_URL = 'https://tile.openweathermap.org/map';

async function fetchFromAPI(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Obține datele meteo actuale pentru un oraș specificat
async function getWeatherByCityName(city) {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  return await fetchFromAPI(url);
}

// Obține datele meteo actuale pentru coordonate geografice specificate
async function getWeatherByCoordinates(lat, lon) {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  return await fetchFromAPI(url);
}

// Obține prognoza meteo pe 5 zile la intervale de 3 ore pentru un oraș specificat
async function getWeatherForecastByCityName(city) {
  const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  return await fetchFromAPI(url);
}

// Obține prognoza meteo pe 5 zile la intervale de 3 ore pentru coordonate geografice specificate
async function getWeatherForecastByCoordinates(lat, lon) {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  return await fetchFromAPI(url);
}

// Obține prognoza meteo pe 16 zile pentru un oraș specificat
async function get16DayForecastByCityName(city) {
  const url = `${BASE_URL}/forecast/daily?q=${city}&cnt=16&appid=${API_KEY}&units=metric`;
  return await fetchFromAPI(url);
}

// Obține prognoza meteo pe 16 zile pentru coordonate geografice specificate
async function get16DayForecastByCoordinates(lat, lon) {
  const url = `${BASE_URL}/forecast/daily?lat=${lat}&lon=${lon}&cnt=16&appid=${API_KEY}&units=metric`;
  return await fetchFromAPI(url);
}

// Obține prognoza meteo orară pentru un oraș specificat
async function getHourlyForecastByCityName(city) {
  const url = `${BASE_URL}/forecast/hourly?q=${city}&appid=${API_KEY}&units=metric`;
  return await fetchFromAPI(url);
}

// Obține prognoza meteo orară pentru coordonate geografice specificate
async function getHourlyForecastByCoordinates(lat, lon) {
  const url = `${BASE_URL}/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  return await fetchFromAPI(url);
}

// Obține indicele UV pentru coordonate geografice specificate
async function getUVIndex(lat, lon) {
  const url = `${BASE_URL}/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  return await fetchFromAPI(url);
}

// Obține datele despre poluarea aerului pentru coordonate geografice specificate
async function getAirPollution(lat, lon) {
  const url = `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  return await fetchFromAPI(url);
}

// Obține coordonatele geografice pentru un oraș specificat
async function getGeocoding(city) {
  const url = `${GEO_BASE_URL}/direct?q=${city}&appid=${API_KEY}`;
  return await fetchFromAPI(url);
}

// Obține numele locației pentru coordonate geografice specificate (geocodare inversă)
async function getReverseGeocoding(lat, lon) {
  const url = `${GEO_BASE_URL}/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  return await fetchFromAPI(url);
}

// Obține datele meteo istorice pentru coordonate geografice specificate și o dată specificată
async function getHistoricalWeather(lat, lon, date) {
  const url = `${BASE_URL}/timemachine?lat=${lat}&lon=${lon}&dt=${date}&appid=${API_KEY}&units=metric`;
  return await fetchFromAPI(url);
}

// Obține alertele meteo pentru coordonate geografice specificate
async function getWeatherAlerts(lat, lon) {
  const url = `${BASE_URL}/alerts?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  return await fetchFromAPI(url);
}

// Obține hărți meteo pentru straturi specifice (precipitații, nori, temperatură etc.)
async function getWeatherMap(layer, zoom, x, y) {
  const url = `${MAP_BASE_URL}/${layer}/${zoom}/${x}/${y}.png?appid=${API_KEY}`;
  const response = await fetch(url);
  return response;
}

// Obține datele meteo curente și prognoza pentru coordonate specifice
async function getCurrentAndForecast(lat, lon) {
  const url = `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  return await fetchFromAPI(url);
}

// Obține prognoza pentru poluarea aerului pentru coordonate geografice specificate
async function getAirPollutionForecast(lat, lon) {
  const url = `${BASE_URL}/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  return await fetchFromAPI(url);
}

// Obține istoricul poluării aerului pentru coordonate geografice specificate între datele de start și end (în format UNIX timestamp)
async function getAirPollutionHistory(lat, lon, start, end) {
  const url = `${BASE_URL}/air_pollution/history?lat=${lat}&lon=${lon}&start=${start}&end=${end}&appid=${API_KEY}`;
  return await fetchFromAPI(url);
}

// Obține date despre stațiile meteo pentru coordonate geografice specificate
async function getWeatherStations(lat, lon) {
  const url = `${BASE_URL}/stations?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  return await fetchFromAPI(url);
}

// Obține prognoza climatică pe 30 de zile pentru un oraș specificat
async function getClimateForecast30Days(city) {
  const url = `${BASE_URL}/forecast/climate?q=${city}&appid=${API_KEY}&units=metric`;
  return await fetchFromAPI(url);
}

// Obține date meteo istorice pentru un oraș specificat între datele de start și end (în format UNIX timestamp)
async function getHistoricalWeatherByCityName(city, start, end) {
  const url = `${BASE_URL}/timemachine?q=${city}&start=${start}&end=${end}&appid=${API_KEY}&units=metric`;
  return await fetchFromAPI(url);
}

// Obține URL-ul iconiței meteo
function getWeatherIconUrl(iconCode) {
  return `http://openweathermap.org/img/wn/${iconCode}.png`;
}

export {
  getWeatherByCityName, // Obține datele meteo actuale pentru un oraș specificat
  getWeatherByCoordinates, // Obține datele meteo actuale pentru coordonate geografice specificate
  getWeatherForecastByCityName, // Obține prognoza meteo pe 5 zile la intervale de 3 ore pentru un oraș specificat
  getWeatherForecastByCoordinates, // Obține prognoza meteo pe 5 zile la intervale de 3 ore pentru coordonate geografice specificate
  get16DayForecastByCityName, // Obține prognoza meteo pe 16 zile pentru un oraș specificat
  get16DayForecastByCoordinates, // Obține prognoza meteo pe 16 zile pentru coordonate geografice specificate
  getHourlyForecastByCityName, // Obține prognoza meteo orară pentru un oraș specificat
  getHourlyForecastByCoordinates, // Obține prognoza meteo orară pentru coordonate geografice specificate
  getUVIndex, // Obține indicele UV pentru coordonate geografice specificate
  getAirPollution, // Obține datele despre poluarea aerului pentru coordonate geografice specificate
  getGeocoding, // Obține coordonatele geografice pentru un oraș specificat
  getReverseGeocoding, // Obține numele locației pentru coordonate geografice specificate (geocodare inversă)
  getHistoricalWeather, // Obține datele meteo istorice pentru coordonate geografice specificate și o dată specificată
  getWeatherAlerts, // Obține alertele meteo pentru coordonate geografice specificate
  getWeatherMap, // Obține hărți meteo pentru straturi specifice (precipitații, nori, temperatură etc.)
  getCurrentAndForecast, // Obține datele meteo curente și prognoza pentru coordonate specifice
  getAirPollutionForecast, // Obține prognoza pentru poluarea aerului pentru coordonate geografice specificate
  getAirPollutionHistory, // Obține istoricul poluării aerului pentru coordonate geografice specificate între datele de start și end (în format UNIX timestamp)
  getWeatherStations, // Obține date despre stațiile meteo pentru coordonate geografice specificate
  getClimateForecast30Days, // Obține prognoza climatică pe 30 de zile pentru un oraș specificat
  getHistoricalWeatherByCityName, // Obține date meteo istorice pentru un oraș specificat între datele de start și end (în format UNIX timestamp)
  getWeatherIconUrl, // Obține URL-ul iconiței meteo
};
