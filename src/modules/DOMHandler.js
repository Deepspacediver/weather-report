import { getWeatherData, determineDayOrNight, } from './weatherReport';
import { createCurrentDay, createRemainderDays, generateCompleteWeather } from './weatherDOM';
import checkForFarenheit from './degreeUnitConversion';

const searchField = document.querySelector('#search-wrapper__search-bar');

searchField.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter' && e.keyCode === 13 && e.target.value !== '') {
    const cityName = e.target.value;
    const weatherData= await getWeatherData(cityName);
    console.log(weatherData);
    checkForFarenheit(weatherData)
    generateCompleteWeather(weatherData)
    searchField.value = '';
  }
});

