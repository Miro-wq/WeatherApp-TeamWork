# Documentație pentru Funcțiile din apiOpenWeather.js

Acest fișier conține funcții care interacționează cu API-ul OpenWeather pentru a
obține date meteo pentru diverse locații. Mai jos este o descriere detaliată a
fiecărei funcții, modul de utilizare și exemple de integrare în alte fișiere.

## Cum să Folosești Funcțiile din apiOpenWeather.js

### Import și Export

Pentru a utiliza funcțiile din `apiOpenWeather.js` în alte fișiere, trebuie mai
întâi să le exporți și să le imporți corespunzător.

### Export

În `apiOpenWeather.js`, funcțiile sunt exportate astfel:

```javascript
export {
  getWeatherByCityName,
  getWeatherByCoordinates,
  getWeatherForecastByCityName,
  getWeatherForecastByCoordinates,
  get16DayForecastByCityName,
  get16DayForecastByCoordinates,
  getHourlyForecastByCityName,
  getHourlyForecastByCoordinates,
  getUVIndex,
  getAirPollution,
  getGeocoding,
  getReverseGeocoding,
  getHistoricalWeather,
  getWeatherAlerts,
  getWeatherMap,
  getCurrentAndForecast,
  getAirPollutionForecast,
  getAirPollutionHistory,
  getWeatherStations,
  getClimateForecast30Days,
  getHistoricalWeatherByCityName,
};
```

### Import

Pentru a importa și utiliza aceste funcții în alte fișiere, folosește `import`:

```javascript
import {
  getWeatherByCityName,
  getWeatherForecastByCityName,
} from './apiOpenWeather.js';
```

## Descrierea Funcțiilor și Modul de Utilizare

### 1. fetchFromAPI(url)

#### Descriere

Funcție auxiliară pentru a face cereri HTTP și a obține date de la API.

#### Parametri

- `url` (string): URL-ul pentru cererea API.

#### Returnează

Un Promise care se rezolvă cu datele obținute de la API.

#### Exemplu de Utilizare

```javascript
const API_KEY = 'c28b86768a874c70b1ecd1343e8f0f24';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function fetchFromAPI(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
```

#### Detalii Importante

Această funcție este folosită intern de toate celelalte funcții pentru a trimite
cereri API și a prelua date. Nu este destinată utilizării directe.

### 2. getWeatherByCityName(city)

#### Descriere

Obține datele meteo actuale pentru un oraș specificat.

#### Parametri

- `city` (string): Numele orașului.

#### Returnează

Un Promise care se rezolvă cu datele meteo pentru orașul specificat.

#### Exemplu de răspuns

```json
{
  "coord": { "lon": 26.1025, "lat": 44.4268 },
  "weather": [
    { "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }
  ],
  "base": "stations",
  "main": {
    "temp": 28.02,
    "feels_like": 27.79,
    "temp_min": 26.1,
    "temp_max": 30.56,
    "pressure": 1012,
    "humidity": 60
  },
  "visibility": 10000,
  "wind": { "speed": 2.68, "deg": 305, "gust": 3.66 },
  "clouds": { "all": 0 },
  "dt": 1623244323,
  "sys": {
    "type": 2,
    "id": 2038501,
    "country": "RO",
    "sunrise": 1623193180,
    "sunset": 1623251100
  },
  "timezone": 10800,
  "id": 683506,
  "name": "Bucharest",
  "cod": 200
}
```

#### Exemplu de Utilizare

```javascript
import { getWeatherByCityName } from './apiOpenWeather.js';

getWeatherByCityName('București')
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- `name`: Numele orașului.
- `main.temp`: Temperatura curentă.
- `weather[0].description`: Descrierea vremii.
- `main.humidity`: Umiditatea.

### 3. getWeatherByCoordinates(lat, lon)

#### Descriere

Obține datele meteo actuale pentru coordonate geografice specificate.

#### Parametri

- `lat` (number): Latitudinea locației.
- `lon` (number): Longitudinea locației.

#### Returnează

Un Promise care se rezolvă cu datele meteo pentru coordonatele specificate.

#### Exemplu de răspuns

Vezi [getWeatherByCityName](#getweatherbycityname).

#### Exemplu de Utilizare

```javascript
import { getWeatherByCoordinates } from './apiOpenWeather.js';

getWeatherByCoordinates(44.4268, 26.1025)
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- Format similar cu cel al funcției `getWeatherByCityName`.

### 4. getWeatherForecastByCityName(city)

#### Descriere

Obține prognoza meteo pe 5 zile la intervale de 3 ore pentru un oraș specificat.

#### Parametri

- `city` (string): Numele orașului.

#### Returnează

Un Promise care se rezolvă cu datele meteo pentru orașul specificat.

#### Exemplu de răspuns

```json
{
  "cod": "200",
  "message": 0,
  "cnt": 40,
  "list": [
    {
      "dt": 1623253200,
      "main": {
        "temp": 28.52,
        "feels_like": 28.65,
        "temp_min": 28.52,
        "temp_max": 28.52,
        "pressure": 1013,
        "sea_level": 1013,
        "grnd_level": 1007,
        "humidity": 54
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": { "all": 1 },
      "wind": { "speed": 2.68, "deg": 305 },
      "visibility": 10000,
      "pop": 0,
      "sys": { "pod": "d" },
      "dt_txt": "2021-06-09 15:00:00"
    }
    // ...alte date
  ],
  "city": {
    "id": 683506,
    "name": "Bucharest",
    "coord": { "lat": 44.4268, "lon": 26.1025 },
    "country": "RO",
    "population": 1877155,
    "timezone": 10800,
    "sunrise": 1623193180,
    "sunset": 1623251100
  }
}
```

#### Exemplu de Utilizare

```javascript
import { getWeatherForecastByCityName } from './apiOpenWeather.js';

getWeatherForecastByCityName('București')
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- `list`: O listă de date meteo pentru intervale de 3 ore.
- `city.name`: Numele orașului.
- `list[0].main.temp`: Temperatura la un anumit interval.
- `list[0].weather[0].description`: Descrierea vremii la un anumit interval.

### 5. getWeatherForecastByCoordinates(lat, lon)

#### Descriere

Obține prognoza meteo pe 5 zile la intervale de 3 ore pentru coordonate
geografice specificate.

#### Parametri

- `lat` (number): Latitudinea locației.
- `lon` (number): Longitudinea locației.

#### Returnează

Un Promise care se rezolvă cu datele meteo pentru coordonatele specificate.

#### Exemplu de răspuns

Vezi [getWeatherForecastByCityName](#getweatherforecastbycityname).

#### Exemplu de Utilizare

```javascript
import { getWeatherForecastByCoordinates } from './apiOpenWeather.js';

getWeatherForecastByCoordinates(44.4268, 26.1025)
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });
```

#### Detalii Importante

Elemente Che

ie ale Răspunsului:

- Format similar cu cel al funcției `getWeatherForecastByCityName`.

### 6. get16DayForecastByCityName(city)

#### Descriere

Obține prognoza meteo pe 16 zile pentru un oraș specificat.

#### Parametri

- `city` (string): Numele orașului.

#### Returnează

Un Promise care se rezolvă cu datele meteo pentru orașul specificat.

#### Exemplu de răspuns

```json
{
  "city": {
    "id": 683506,
    "name": "Bucharest",
    "coord": { "lat": 44.4268, "lon": 26.1025 },
    "country": "RO",
    "population": 1877155,
    "timezone": 10800
  },
  "cod": "200",
  "message": 0.0139,
  "cnt": 16,
  "list": [
    {
      "dt": 1623253200,
      "temp": {
        "day": 28.52,
        "min": 18.54,
        "max": 29.13,
        "night": 20.13,
        "eve": 27.45,
        "morn": 19.56
      },
      "feels_like": {
        "day": 28.65,
        "night": 20.13,
        "eve": 27.45,
        "morn": 19.56
      },
      "pressure": 1013,
      "humidity": 54,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "speed": 2.68,
      "deg": 305,
      "clouds": 1,
      "pop": 0
    }
    // ...alte date
  ]
}
```

#### Exemplu de Utilizare

```javascript
import { get16DayForecastByCityName } from './apiOpenWeather.js';

get16DayForecastByCityName('București')
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- `list`: O listă de date meteo zilnice pentru următoarele 16 zile.
- `city.name`: Numele orașului.
- `list[0].temp.day`: Temperatura zilnică.
- `list[0].weather[0].description`: Descrierea vremii.

### 7. get16DayForecastByCoordinates(lat, lon)

#### Descriere

Obține prognoza meteo pe 16 zile pentru coordonate geografice specificate.

#### Parametri

- `lat` (number): Latitudinea locației.
- `lon` (number): Longitudinea locației.

#### Returnează

Un Promise care se rezolvă cu datele meteo pentru coordonatele specificate.

#### Exemplu de răspuns

Vezi [get16DayForecastByCityName](#get16dayforecastbycityname).

#### Exemplu de Utilizare

```javascript
import { get16DayForecastByCoordinates } from './apiOpenWeather.js';

get16DayForecastByCoordinates(44.4268, 26.1025)
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- Format similar cu cel al funcției `get16DayForecastByCityName`.

### 8. getHourlyForecastByCityName(city)

#### Descriere

Obține prognoza meteo orară pentru un oraș specificat.

#### Parametri

- `city` (string): Numele orașului.

#### Returnează

Un Promise care se rezolvă cu datele meteo pentru orașul specificat.

#### Exemplu de răspuns

```json
{
  "cod": "200",
  "message": 0.0139,
  "cnt": 48,
  "list": [
    {
      "dt": 1623253200,
      "main": {
        "temp": 28.52,
        "feels_like": 28.65,
        "temp_min": 28.52,
        "temp_max": 28.52,
        "pressure": 1013,
        "sea_level": 1013,
        "grnd_level": 1007,
        "humidity": 54
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": { "all": 1 },
      "wind": { "speed": 2.68, "deg": 305 },
      "visibility": 10000,
      "pop": 0,
      "sys": { "pod": "d" },
      "dt_txt": "2021-06-09 15:00:00"
    }
    // ...alte date
  ],
  "city": {
    "id": 683506,
    "name": "Bucharest",
    "coord": { "lat": 44.4268, "lon": 26.1025 },
    "country": "RO",
    "population": 1877155,
    "timezone": 10800,
    "sunrise": 1623193180,
    "sunset": 1623251100
  }
}
```

#### Exemplu de Utilizare

```javascript
import { getHourlyForecastByCityName } from './apiOpenWeather.js';

getHourlyForecastByCityName('București')
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- `list`: O listă de date meteo pentru fiecare oră din următoarele 48 de ore.
- `city.name`: Numele orașului.
- `list[0].main.temp`: Temperatura la un anumit interval.
- `list[0].weather[0].description`: Descrierea vremii la un anumit interval.

### 9. getHourlyForecastByCoordinates(lat, lon)

#### Descriere

Obține prognoza meteo orară pentru coordonate geografice specificate.

#### Parametri

- `lat` (number): Latitudinea locației.
- `lon` (number): Longitudinea locației.

#### Returnează

Un Promise care se rezolvă cu datele meteo pentru coordonatele specificate.

#### Exemplu de răspuns

Vezi [getHourlyForecastByCityName](#gethourlyforecastbycityname).

#### Exemplu de Utilizare

```javascript
import { getHourlyForecastByCoordinates } from './apiOpenWeather.js';

getHourlyForecastByCoordinates(44.4268, 26.1025)
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- Format similar cu cel al funcției `getHourlyForecastByCityName`.

### 10. getUVIndex(lat, lon)

#### Descriere

Obține indicele UV pentru coordonate geografice specificate.

#### Parametri

- `lat` (number): Latitudinea locației.
- `lon` (number): Longitudinea locației.

#### Returnează

Un Promise care se rezolvă cu indicele UV pentru coordonatele specificate.

#### Exemplu de răspuns

```json
{
  "lat": 44.4268,
  "lon": 26.1025,
  "date_iso": "2021-06-09T12:00:00Z",
  "date": 1623244800,
  "value": 7.15
}
```

#### Exemplu de Utilizare

```javascript
import { getUVIndex } from './apiOpenWeather.js';

getUVIndex(44.4268, 26.1025)
  .then(data => {
    console.log(`Indicele UV pentru coordonatele [44.4268, 26.1025]:`, data);
  })
  .catch(error => {
    console.error('Error fetching UV index:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- `lat`: Latitudinea.
- `lon`: Longitudinea.
- `date_iso`: Data și ora pentru care a fost calculat indicele UV.
- `value`: Valoarea indicele UV.

### 11. getAirPollution(lat, lon)

#### Descriere

Obține datele despre poluarea aerului pentru coordonate geografice specificate.

#### Parametri

- `lat` (number): Latitudinea locației.
- `lon` (number): Longitudinea locației.

#### Returnează

Un Promise care se rezolvă cu datele despre poluarea aerului pentru coordonatele
specificate.

#### Exemplu de răspuns

```json
{
  "coord": { "lon": 26.1025, "lat": 44.4268 },
  "list": [
    {
      "main": { "aqi": 3 },
      "components": {
        "co": 201.94,
        "no": 0.0,
        "no2": 0.0,
        "o3": 68.78,
        "so2": 0.64,
        "pm2_5": 15.46,
        "pm10": 20.23,
        "nh3": 0.0
      },
      "dt": 1623244800
    }
  ]
}
```

#### Exemplu de Utilizare

```javascript
import { getAirPollution } from './apiOpenWeather.js';

getAirPollution(44.4268, 26.1025)
  .then(data => {
    console.log(
      `Poluarea aerului pentru coordonatele [44.4268, 26.1025]:`,
      data
    );
  })
  .catch(error => {
    console.error('Error fetching air pollution data:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- `coord`: Coordonatele pentru care s-au obținut datele.
- `list[0].main.aqi`: Indexul calității aerului.
- `list[0].components`: Componentele poluării (CO, NO, NO2, O3, SO2, PM2.5,
  PM10, NH3).

### 12. getGeocoding(city)

#### Descriere

Obține coordonatele geografice pentru un oraș specificat.

#### Parametri

- `city` (string): Numele orașului.

#### Returnează

Un Promise care se rezolvă cu coordonatele geografice pentru orașul specificat.

#### Exemplu de răspuns

```json
[
  {
    "name": "Bucharest",
    "local_names": { "ro": "București" },
    "lat": 44.4268,
    "lon": 26.1025,
    "country": "RO"
  }
]
```

#### Exemplu de Utilizare

```javascript
import { getGeocoding } from './apiOpenWeather.js';

getGeocoding('București')
  .then(data => {
    console.log(`Coordonatele pentru București:`, data);
  })
  .catch(error => {
    console.error('Error fetching geocoding data:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- `name`: Numele orașului.
- `lat`: Latitudinea.
- `lon`: Longitudinea.
- `country`: Codul țării.

### 13. getReverseGeocoding(lat, lon)

#### Descriere

Obține numele locației pentru coordonate geografice specificate (geocodare
inversă).

#### Parametri

- `lat` (number): Latitudinea locației.
- `lon` (number): Longitudinea locației.

#### Returnează

Un Promise care se rezolvă cu numele locației pentru coordonatele specificate.

#### Exemplu de răspuns

```json
[
  {
    "name": "Bucharest",
    "local_names": { "ro": "București" },
    "lat": 44.4268,
    "lon": 26.1025,
    "country": "RO"
  }
]
```

#### Exemplu de Utilizare

```javascript
import { getReverseGeocoding } from './apiOpenWeather.js';

getReverseGeocoding(44.4268, 26.1025)
  .then(data => {
    console.log(
      `Numele locației pentru coordonatele [44.4268, 26.1025]:`,
      data
    );
  })
  .catch(error => {
    console.error('Error fetching reverse geocoding data:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- `name`: Numele locației.
- `lat`: Latitudinea.
- `lon`: Longitudinea.
- `country`: Codul țării.

### 14. getHistoricalWeather(lat, lon, date)

#### Descriere

Obține datele meteo istorice pentru coordonate geografice specificate și o dată
specificată.

#### Parametri

- `lat` (number): Latitudinea locației.
- `lon` (number): Longitudinea locației.
- `date` (number): Data în format UNIX timestamp.

#### Returnează

Un Promise care se rezolvă cu datele meteo istorice pentru coordonatele
specificate.

#### Exemplu de răspuns

```json
{
  "lat": 44.4268,
  "lon": 26.1025,
  "timezone": "Europe/Bucharest",
  "timezone_offset": 10800,
  "current": {
    "dt": 1623244323,
    "temp": 28.02,
    "feels_like": 27.79,
    "pressure": 1012,
    "humidity": 60,
    "dew_point": 19.46,
    "uvi": 7.15,
    "clouds": 0,
    "visibility": 10000,
    "wind_speed": 2.68,
    "wind_deg": 305,
    "weather": [
      { "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }
    ]
  },
  "hourly": [
    {
      "dt": 1623241200,
      "temp": 28.02,
      "feels_like": 27.79,
      "pressure": 1012,
      "humidity": 60,
      "dew_point": 19.46,
      "uvi": 7.15,
      "clouds": 0,
      "visibility": 10000,
      "wind_speed": 2.68,
      "wind_deg": 305,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ]
    }
  ]
}
```

#### Exemplu de Utilizare

```javascript
import { getHistoricalWeather } from './apiOpenWeather.js';

getHistoricalWeather(44.4268, 26.1025, 1623244323)
  .then(data => {
    console.log(
      `Date meteo istorice pentru coordonatele [44.4268, 26.1025]:`,
      data
    );
  })
  .catch(error => {
    console.error('Error fetching historical weather data:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- `current`: Datele meteo curente pentru data specificată.
- `hourly`: Datele meteo pentru fiecare oră din ziua specificată.

### 15. getWeatherAlerts(lat, lon)

#### Descriere

Obține alertele meteo pentru coordonate geografice specificate.

#### Parametri

- `lat` (number): Latitudinea locației.
- `lon` (number): Longitudinea locației.

#### Returnează

Un Promise care se rezolvă cu alertele meteo pentru coordonatele specificate.

#### Exemplu de răspuns

```json
{
  "lat": 44.4268,
  "lon": 26.1025,
  "timezone": "Europe/Bucharest",
  "timezone_offset": 10800,
  "alerts": [
    {
      "sender_name": "National Weather Service",
      "event": "Heat Wave",
      "start": 1623241200,
      "end": 1623262800,
      "description": "A heat wave is expected in the area...",
      "tags": ["Extreme temperature"]
    }
  ]
}
```

#### Exemplu de Utilizare

```javascript
import { getWeatherAlerts } from './apiOpenWeather.js';

getWeatherAlerts(44.4268, 26.1025)
  .then(data => {
    console.log(`Alerte meteo pentru coordonatele [44.4268, 26.1025]:`, data);
  })
  .catch(error => {
    console.error('Error fetching weather alerts:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- `alerts`: O listă de alerte meteo active pentru locația specificată.
- `alerts[0].event`: Tipul alertei (ex. Heat Wave).
- `alerts[0].description`: Descrierea alertei.
- `alerts[0].start` și `alerts[0].end`: Timpul de început și sfârșit al alertei
  în format UNIX timestamp.

### 16. getWeatherMap(layer, zoom, x, y)

#### Descriere

Obține hărți meteo pentru straturi specifice (precipitații, nori, temperatură
etc.).

#### Parametri

- `layer` (string): Tipul stratului de hartă (ex. precipitații, temperatură).
- `zoom` (number): Nivelul de zoom al hărții.
- `x` (number): Coordonata X a hărții.
- `y` (number): Coordonata Y a hărții.

#### Returnează

Un Promise care se rezolvă cu răspunsul HTTP pentru imaginea stratului de hartă.

#### Exemplu de Utilizare

```javascript
import { getWeatherMap } from './apiOpenWeather.js';

getWeatherMap('precipitation', 10, 523, 256)
  .then(response => {
    console.log(`Harta meteo pentru stratul de precipitații:`, response);
  })
  .catch(error => {
    console.error('Error fetching weather map:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- Răspunsul este o imagine care poate fi afișată într-un element HTML `<img>`
  sau salvată pe disc.

### 17. getCurrentAndForecast(lat, lon)

#### Descriere

Obține datele meteo curente și prognoza pentru coordonate specifice.

#### Parametri

- `lat` (number): Latitudinea locației.
- `lon` (number): Longitudinea locației.

#### Returnează

Un Promise care se rezolvă cu datele meteo curente și prognoza pentru
coordonatele specificate.

#### Exemplu de răspuns

```json
{
  "lat": 44.4268,
  "lon": 26.1025,
  "timezone": "Europe/Bucharest",
  "timezone_offset": 10800,
  "current": {
    "dt": 1623244323,
    "temp": 28.02,
    "feels_like": 27.79,
    "pressure": 1012,
    "humidity": 60,
    "dew_point": 19.46,
    "uvi": 7.15,
    "clouds": 0,
    "visibility": 10000,
    "wind_speed": 2.68,
    "wind_deg": 305,
    "weather": [
      { "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }
    ]
  },
  "hourly": [
    {
      "dt": 1623241200,
      "temp": 28.02,
      "feels_like": 27.79,
      "pressure": 1012,
      "humidity": 60,
      "dew_point": 19.46,
      "uvi": 7.15,
      "clouds": 0,
      "visibility": 10000,
      "wind_speed": 2.68,
      "wind_deg": 305,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ]
    }
  ],
  "daily": [
    {
      "dt": 1623253200,
      "sunrise": 1623193180,
      "sunset": 1623251100,
      "temp": {
        "day": 28.52,
        "min": 18.54,
        "max": 29.13,
        "night": 20.13,
        "eve": 27.45,
        "morn": 19.56
      },
      "feels_like": {
        "day": 28.65,
        "night": 20.13,
        "eve": 27.45,
        "morn": 19.56
      },
      "pressure": 1013,
      "humidity": 54,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "speed": 2.68,
      "deg": 305,
      "clouds": 1,
      "pop": 0
    }
  ]
}
```

#### Exemplu de Utilizare

```javascript
import { getCurrentAndForecast } from './apiOpenWeather.js';

getCurrentAndForecast(44.4268, 26.1025)
  .then(data => {
    console.log(
      `Date meteo curente și prognoza pentru coordonatele [44.4268, 26.1025]:`,
      data
    );
  })
  .catch(error => {
    console.error('Error fetching current and forecast weather data:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- `current`: Datele meteo curente.
- `hourly`: Prognoza meteo orară.
- `daily`: Prognoza meteo zilnică.

### 18. getAirPollutionForecast(lat, lon)

#### Descriere

Obține prognoza pentru poluarea aerului pentru coordonate geografice
specificate.

#### Parametri

- `lat` (number): Latitudinea locației.
- `lon` (number): Longitudinea locației.

#### Returnează

Un Promise care se rezolvă cu prognoza pentru poluarea aerului pentru
coordonatele specificate.

#### Exemplu de răspuns

```json
{
  "coord": { "lon": 26.1025, "lat": 44.4268 },
  "list": [
    {
      "main": { "aqi": 3 },
      "components": {
        "co": 201.94,
        "no": 0.0,
        "no2": 0.0,
        "o3": 68.78,
        "so2": 0.64,
        "pm2_5": 15.46,
        "pm10": 20.23,
        "nh3": 0.0
      },
      "dt": 1623244800
    }
  ]
}
```

#### Exemplu de Utilizare

```javascript
import { getAirPollutionForecast } from './apiOpenWeather.js';

getAirPollutionForecast(44.4268, 26.1025)
  .then(data => {
    console.log(
      `Prognoza poluării aerului pentru coordonatele [44.4268, 26.1025]:`,
      data
    );
  })
  .catch(error => {
    console.error('Error fetching air pollution forecast:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- `coord`: Coordonatele pentru care s-au obținut datele.
- `list[0].main.aqi`: Indexul calității aerului.
- `list[0].components`: Componentele poluării (CO, NO, NO2, O3, SO2, PM2.5,
  PM10, NH3).

### 19. getAirPollutionHistory(lat, lon, start, end)

#### Descriere

Obține istoricul poluării aerului pentru coordonate geografice specificate între
datele de start și end (în format UNIX timestamp).

#### Parametri

- `lat` (number): Latitudinea locației.
- `lon` (number): Longitudinea locației.
- `start` (number): Timpul de început al perioadei în format UNIX timestamp.
- `end` (number): Timpul de sfârșit al perioadei în format UNIX timestamp.

#### Returnează

Un Promise care se rezolvă cu istoricul poluării aerului pentru coordonatele
specificate.

#### Exemplu de răspuns

```json
{
  "coord": { "lon": 26.1025, "lat": 44.4268 },
  "list": [
    {
      "main": { "aqi": 3 },
      "components": {
        "co": 201.94,
        "no": 0.0,
        "no2": 0.0,
        "o3": 68.78,
        "so2": 0.64,
        "pm2_5": 15.46,
        "pm10": 20.23,
        "nh3": 0.0
      },
      "dt": 1623244800
    }
  ]
}
```

#### Exemplu de Utilizare

```javascript
import { getAirPollutionHistory } from './apiOpenWeather.js';

getAirPollutionHistory(44.4268, 26.1025, 1623244800, 1623331200)
  .then(data => {
    console.log(
      `Istoricul poluării aerului pentru coordonatele [44.4268, 26.1025]:`,
      data
    );
  })
  .catch(error => {
    console.error('Error fetching air pollution history:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- `coord`: Coordonatele pentru care s-au obținut datele.
- `list[0].main.aqi`: Indexul calității aerului.
- `list[0].components`: Componentele poluării (CO, NO, NO2, O3, SO2, PM2.5,
  PM10, NH3).

### 20. getWeatherStations(lat, lon)

#### Descriere

Obține date despre stațiile meteo pentru coordonate geografice specificate.

#### Parametri

- `lat` (number): Latitudinea locației.
- `lon` (number): Longitudinea locației.

#### Returnează

Un Promise care se rezolvă cu datele despre stațiile meteo pentru coordonatele
specificate.

#### Exemplu de răspuns

```json
{
  "station": [
    {
      "station_id": 123,
      "name": "Bucharest",
      "lat": 44.4268,
      "lon": 26.1025,
      "altitude": 50
    }
  ]
}
```

#### Exemplu de Util

izare

```javascript
import { getWeatherStations } from './apiOpenWeather.js';

getWeatherStations(44.4268, 26.1025)
  .then(data => {
    console.log(`Stațiile meteo pentru coordonatele [44.4268, 26.1025]:`, data);
  })
  .catch(error => {
    console.error('Error fetching weather stations:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- `station`: O listă de stații meteo.
- `station[0].name`: Numele stației meteo.
- `station[0].lat`: Latitudinea stației meteo.
- `station[0].lon`: Longitudinea stației meteo.
- `station[0].altitude`: Altitudinea stației meteo.

### 21. getClimateForecast30Days(city)

#### Descriere

Obține prognoza climatică pe 30 de zile pentru un oraș specificat.

#### Parametri

- `city` (string): Numele orașului.

#### Returnează

Un Promise care se rezolvă cu prognoza climatică pe 30 de zile pentru orașul
specificat.

#### Exemplu de răspuns

```json
{
  "city": {
    "id": 683506,
    "name": "Bucharest",
    "coord": { "lat": 44.4268, "lon": 26.1025 },
    "country": "RO",
    "population": 1877155,
    "timezone": 10800
  },
  "cod": "200",
  "message": 0.0139,
  "cnt": 30,
  "list": [
    {
      "dt": 1623253200,
      "temp": {
        "day": 28.52,
        "min": 18.54,
        "max": 29.13,
        "night": 20.13,
        "eve": 27.45,
        "morn": 19.56
      },
      "feels_like": {
        "day": 28.65,
        "night": 20.13,
        "eve": 27.45,
        "morn": 19.56
      },
      "pressure": 1013,
      "humidity": 54,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "speed": 2.68,
      "deg": 305,
      "clouds": 1,
      "pop": 0
    }
  ]
}
```

#### Exemplu de Utilizare

```javascript
import { getClimateForecast30Days } from './apiOpenWeather.js';

getClimateForecast30Days('București')
  .then(data => {
    console.log(`Prognoza climatică pe 30 de zile pentru București:`, data);
  })
  .catch(error => {
    console.error('Error fetching climate forecast:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- `list`: O listă de date meteo zilnice pentru următoarele 30 de zile.
- `city.name`: Numele orașului.
- `list[0].temp.day`: Temperatura zilnică.
- `list[0].weather[0].description`: Descrierea vremii.

### 22. getHistoricalWeatherByCityName(city, start, end)

#### Descriere

Obține date meteo istorice pentru un oraș specificat între datele de start și
end (în format UNIX timestamp).

#### Parametri

- `city` (string): Numele orașului.
- `start` (number): Timpul de început al perioadei în format UNIX timestamp.
- `end` (number): Timpul de sfârșit al perioadei în format UNIX timestamp.

#### Returnează

Un Promise care se rezolvă cu datele meteo istorice pentru orașul specificat.

#### Exemplu de răspuns

```json
{
  "city": {
    "id": 683506,
    "name": "Bucharest",
    "coord": { "lat": 44.4268, "lon": 26.1025 },
    "country": "RO",
    "population": 1877155,
    "timezone": 10800
  },
  "cod": "200",
  "message": 0.0139,
  "cnt": 30,
  "list": [
    {
      "dt": 1623253200,
      "temp": {
        "day": 28.52,
        "min": 18.54,
        "max": 29.13,
        "night": 20.13,
        "eve": 27.45,
        "morn": 19.56
      },
      "feels_like": {
        "day": 28.65,
        "night": 20.13,
        "eve": 27.45,
        "morn": 19.56
      },
      "pressure": 1013,
      "humidity": 54,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "speed": 2.68,
      "deg": 305,
      "clouds": 1,
      "pop": 0
    }
  ]
}
```

#### Exemplu de Utilizare

```javascript
import { getHistoricalWeatherByCityName } from './apiOpenWeather.js';

getHistoricalWeatherByCityName('București', 1623244800, 1623331200)
  .then(data => {
    console.log(
      `Date meteo istorice pentru București între 1623244800 și 1623331200:`,
      data
    );
  })
  .catch(error => {
    console.error('Error fetching historical weather data:', error);
  });
```

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- `list`: O listă de date meteo zilnice pentru perioada specificată.
- `city.name`: Numele orașului.
- `list[0].temp.day`: Temperatura zilnică.
- `list[0].weather[0].description`: Descrierea vremii.

### 23. getWeatherIconUrl(iconCode)

#### Descriere

Obține URL-ul iconiței meteo pentru un cod specific de iconiță furnizat de
API-ul OpenWeather.

#### Parametri

- `iconCode` (string): Codul iconiței meteo (de exemplu, `01d`, `02n`).

#### Returnează

Un URL sub formă de string care poate fi utilizat pentru a descărca și afișa
iconița meteo.

#### Exemplu de răspuns

Nu există un răspuns JSON propriu-zis deoarece funcția returnează direct un URL
sub formă de string. URL-ul poate fi utilizat pentru a încărca imaginea iconiței
meteo.

#### Exemplu de Utilizare

```javascript
import { getWeatherIconUrl } from './apiOpenWeather.js';

const iconCode = '01d';
const iconUrl = getWeatherIconUrl(iconCode);

console.log(`URL pentru iconița meteo cu codul ${iconCode}:`, iconUrl);
// URL pentru iconița meteo cu codul 01d: http://openweathermap.org/img/wn/01d.png
```

Iată ce reprezintă aceste coduri:

- **01d**: Zi însorită (clear sky during the day).
- **01n**: Noapte senină (clear sky during the night).
- **02d**: Zi cu câțiva nori (few clouds during the day).
- **02n**: Noapte cu câțiva nori (few clouds during the night).
- **03d**: Zi parțial înnorată (scattered clouds during the day).
- **03n**: Noapte parțial înnorată (scattered clouds during the night).
- **04d**: Zi foarte înnorată (broken clouds during the day).
- **04n**: Noapte foarte înnorată (broken clouds during the night).
- **09d**: Zi cu ploi (shower rain during the day).
- **09n**: Noapte cu ploi (shower rain during the night).
- **10d**: Zi cu ploaie (rain during the day).
- **10n**: Noapte cu ploaie (rain during the night).
- **11d**: Zi cu furtună (thunderstorm during the day).
- **11n**: Noapte cu furtună (thunderstorm during the night).
- **13d**: Zi cu zăpadă (snow during the day).
- **13n**: Noapte cu zăpadă (snow during the night).
- **50d**: Zi cu ceață (mist during the day).
- **50n**: Noapte cu ceață (mist during the night).

#### Detalii Importante

Elemente Cheie ale Răspunsului:

- URL-ul generat poate fi utilizat într-un element HTML `<img>` pentru a afișa
  iconița meteo.
- URL-ul este generat pe baza unui șablon fix, care include codul iconiței
  meteo.

#### Exemple de afișare a iconiței în HTML

Pentru a afișa iconița meteo în aplicația ta, poți utiliza URL-ul returnat de
funcția `getWeatherIconUrl` într-un element HTML `<img>`:

```html
<img id="weather-icon" src="URL_GENRATED_BY_FUNCTION" alt="Weather Icon" />
```

În JavaScript, poți actualiza dinamically src-ul imaginii:

```javascript
document.getElementById('weather-icon').src = iconUrl;
```

Prin utilizarea acestei funcții, poți îmbunătăți vizualizarea datelor meteo în
aplicația ta prin adăugarea iconițelor relevante pentru condițiile meteo
curente.
