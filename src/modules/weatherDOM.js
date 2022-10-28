import format from 'date-fns/format';
import { getCurrentWeather, getWeatherData } from './weatherReport';

const htmlElement = document.querySelector('html');
const windValueEl = document.querySelector('.weather-conditions__wind-value');
const locationEl = document.querySelector('.locale-wrapper__location');
const dateEl = document.querySelector('.locale-wrapper__date');
const currentDayIcon = document.querySelector('.icon-wrapper__weather-icon');
const weekListUl = document.querySelector('.week-list');
const weatherDescriptionEl = document.querySelector(
  '.weather-conditions__weather-description'
);
const temperatureValueEl = document.querySelector(
  '.weather-conditions__temperature-value'
);
const humidityValueEl = document.querySelector(
  '.weather-conditions__humidity-value'
);

const formatDate = (date) => {
  const formatedDate = format(date, 'EEEE, do MMMM');
  return formatedDate;
};
const getSmallIcon = (iconId) => {
  const imgLink = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
  return imgLink;
};

const clearElementChildren = (element) => {
  while (element.lastChild) element.removeChild(element.lastChild);
};

const createCurrentDay = async (weatherResponse) => {
  try {
    const firstDayData = weatherResponse.firstDay;
    const {
      locationInfo: { cityName, convertedDateDay1 },
      weatherInfo: { description, humidity, iconId, temp, wind },
    } = await firstDayData;

    weatherDescriptionEl.textContent = description;
    temperatureValueEl.textContent = temp;
    humidityValueEl.textContent = humidity;
    windValueEl.textContent = wind;
    locationEl.textContent = cityName;
    dateEl.textContent = formatDate(convertedDateDay1);
    currentDayIcon.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
  } catch (err) {
    if (err.code === '404') console.log('404 it is');
    console.log(err);
  }
};

const appendRemainderOfDays = (arrayOfDays) => {
  arrayOfDays.forEach((singleDay) => {
    const itemWrapperLi = document.createElement('li');
    itemWrapperLi.classList.add('week-list__item');

    // Icon and Weather Description
    const weatherWrapperDiv = document.createElement('div');
    weatherWrapperDiv.classList.add('week-list__weather-wrapper');
    const weatherIconImg = document.createElement('img');
    weatherIconImg.classList.add('week-list__item-icon');
    weatherIconImg.src = getSmallIcon(singleDay.iconId);
    const weatherDescrSpan = document.createElement('span');
    weatherDescrSpan.classList.add('week-list__weather-description');
    weatherDescrSpan.textContent = singleDay.description;
    weatherWrapperDiv.append(weatherIconImg, weatherDescrSpan);

    // Temperature and Date
    const weekTemperatureSpan = document.createElement('span');
    weekTemperatureSpan.classList.add(
      'week-list_temperature-value',
      'tempDegree'
    );
    weekTemperatureSpan.textContent = singleDay.temp;
    const weekDateSpan = document.createElement('span');
    weekDateSpan.classList.add('week-list__date');
    weekDateSpan.textContent = formatDate(singleDay.convertedDate);

    weekListUl.appendChild(itemWrapperLi);
    itemWrapperLi.append(weatherWrapperDiv, weekTemperatureSpan, weekDateSpan);
  });
};

const createRemainderDays = async (weatherResponse) => {
  try {
    const remainderDaysData = await weatherResponse.remainderOfDays;
    clearElementChildren(weekListUl);
    appendRemainderOfDays(remainderDaysData);
  } catch (err) {
    console.log(err);
  }
};

const generateCompleteWeather = (weatherAPIObject) => {
   changeBackground(weatherAPIObject);
  createCurrentDay(weatherAPIObject);
  createRemainderDays(weatherAPIObject);
};
const onLoadWeather = async () => {
  // API Response for London
  try {
    const londonBasicResponse = await getWeatherData('London');

    createCurrentDay(londonBasicResponse);
    createRemainderDays(londonBasicResponse);
    changeBackground(londonBasicResponse);
  } catch (err) {
    console.log(err);
  }
};

const changeBackground = (APIresponse) => {
  if (APIresponse === undefined) return
  const dayTime = APIresponse.firstDay.locationInfo.timeOfDay
  console.log(dayTime)
  if (dayTime === 'day') {
    htmlElement.style.backgroundImage = 'url(a48ed727faa35f1b2a93.jpg)';
  } else htmlElement.style.backgroundImage = 'url(2fff627216ea1d684cfa.jpg)';
};

window.addEventListener('load', async () => {
  onLoadWeather();
});

export { createCurrentDay, createRemainderDays, generateCompleteWeather };
