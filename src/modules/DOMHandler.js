import convertWeatherData from './weatherReport';
import generateCompleteWeather from './weatherDOM';
import checkForFarenheit from './degreeUnitConversion';

const searchButton = document.querySelector('.search-wrapper__search-btn');
const searchField = document.querySelector('#search-wrapper__search-bar');

searchField.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter' && e.keyCode === 13 && e.target.value !== '') {
    const cityName = e.target.value;
    const weatherData = await convertWeatherData(cityName);
    console.log(weatherData);
    checkForFarenheit(weatherData);
    generateCompleteWeather(weatherData);
    searchField.value = '';
  }
});

searchButton.addEventListener('click', async () => {
  if (searchField.value === '') return;
  const cityName = searchField.value;
  const weatherData = await convertWeatherData(cityName);

  checkForFarenheit(weatherData);
  generateCompleteWeather(weatherData);
  searchField.value = '';
});
