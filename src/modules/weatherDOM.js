import { getCurrentWeather, getWeatherData } from './weatherReport';

const weatherDescriptionEl = document.querySelector(
  '.weather-conditions__weather-description'
);
const temperatureValueEl = document.querySelector(
  '.weather-conditions__temperature-value'
);
const humidityValueEl = document.querySelector(
  '.weather-conditions__humidity-value'
);
const windValueEl = document.querySelector('.weather-conditions__wind-value');
const locationEl = document.querySelector('.locale-wrapper__location');
const dateEl = document.querySelector('.locale-wrapper__date');
const currentDayIcon = document.querySelector('.icon-wrapper__weather-icon');

const createCurrentDay = async ({ firstDay }) => {
  const {
    locationInfo: { cityName, convertedDateDay1 },
    weatherInfo: { description, humidity, iconId, temp, wind },
  } = await firstDay;

  weatherDescriptionEl.textContent = description;
  temperatureValueEl.textContent = temp;
  humidityValueEl.textContent = humidity;
  windValueEl.textContent = wind;
  locationEl.textContent = cityName;
  dateEl.textContent = convertedDateDay1.getUTCMonth();
  currentDayIcon.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
};

const onLoadWeather = async () => {
  const londonBasicResponse = await getWeatherData('London');
  const {
    firstDay: {
      locationInfo: { cityName, convertedDateDay1 },
      weatherInfo: { description, humidity, iconId, temp, wind },
    },
  } = londonBasicResponse;
  console.log(cityName);
  /* const {
    firstDay: { locationInfo: cityName, convertedDateDay1 },
    firstDay: { weatherInfo: description, humidity, iconId, temp, wind },
  } = londonBasicResponse; */
  weatherDescriptionEl.textContent = description;
  temperatureValueEl.textContent = temp;
  humidityValueEl.textContent = humidity;
  windValueEl.textContent = wind;
  locationEl.textContent = cityName;
  currentDayIcon.src = `http://openweathermap.org/img/wn/${iconId}@4x.png`;
  dateEl.textContent = convertedDateDay1.toUTCString().substring(0,14);
};
export { createCurrentDay };

 window.addEventListener('load', async () => {
  onLoadWeather();
}); 
