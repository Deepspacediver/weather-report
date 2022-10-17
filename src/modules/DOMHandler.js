import { getWeatherData, determineDayOrNight } from './weatherReport';

const searchField = document.querySelector('#search-bar');

searchField.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter' && e.keyCode === 13 && e.target.value !== '') {
    const cityName = e.target.value;
    /* const weatherData = getWeather(cityName)
    console.log(weatherData) */
    const DATAWEATHER = await getWeatherData(cityName);
    console.log(DATAWEATHER);
    const dayValue = determineDayOrNight(DATAWEATHER)
    console.log(dayValue)
    // console.log(determineDayOrNight(DATAWEATHER))
    searchField.value = '';
  }
});

// WeatherReport.getWeather(e.target.value)
