const getCurrentWeather = async (city) => {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c6a89bb93d1f609fa31e7a649c08ea66&units=metric`,
      {
        mode: 'cors',
      }
    );
    if (data.ok === false) console.log('404');
    else {
      return data;
    }
  } catch (err) {
    console.log(err.code);
  }
};
const capitilizeFirstLetter = (string) =>
  string.slice(0, 1).toUpperCase() + string.slice(1);

const getDataForFirstDay = (weatherResponse) => {
  const firstDayData = weatherResponse.list[0];
  const firstDay = {
    locationInfo: {
      cityName: weatherResponse.city.name,
      timeOfDay: determineDayOrNight(weatherResponse.city.sunset),
      timezone: weatherResponse.city.timezone, 
      convertedDateDay1: convertToLocalTime(
        firstDayData.dt,
        weatherResponse.city.timezone
      ),
    },
    weatherInfo: {
      temp: firstDayData.main.temp,
      humidity: firstDayData.main.humidity,
      description: capitilizeFirstLetter(firstDayData.weather[0].description),
      iconId: firstDayData.weather[0].icon,
      wind: firstDayData.wind.speed,
    },
  };
  return firstDay;
};

const getNextValidDays = (
  { locationInfo: { convertedDateDay1, timezone } },
  { list }
) => {
  const validDaysArray = [];
  const zoneOffset = timezone;
  const currentDateDayValue = convertedDateDay1.getUTCDay();
  const weekRemainder = list.slice(1);

  // Loop through the 3 hour dates
  weekRemainder.forEach((date) => {
    const dateConvereted = convertToLocalTime(date.dt, zoneOffset);
    const dateDayValue = dateConvereted.getUTCDay();
    const dateHourValue = dateConvereted.getUTCHours();
    // Return a day with close to noon value which is not of the same day as the current one
    if (
      dateDayValue !== currentDateDayValue &&
      dateHourValue >= 11 &&
      dateHourValue <= 13
    ) {
      const dayObject = {
        convertedDate: convertToLocalTime(date.dt, zoneOffset),
        temp: date.main.temp,
        description: capitilizeFirstLetter(date.weather[0].description),
        iconId: date.weather[0].icon,
      };
      validDaysArray.push(dayObject);
    }
  });

  console.log(validDaysArray);
  return validDaysArray;
};

const getWeatherData = async (cityName) => {
  try {
    const weatherResponse = await getCurrentWeather(cityName);
    const weatherData = await weatherResponse.json();
    /* Return data: as an object ->
       General data and info for the current day, 2nd item is an array of Next days 
    */
    const firstDay = getDataForFirstDay(weatherData);
    const remainderOfDays = getNextValidDays(firstDay, weatherData);
    const dataObject = {
      firstDay,
      remainderOfDays,
    };
    return dataObject;
  } catch (err) {
    console.log(err);
  }
};

const determineDayOrNight = (sunset) => {
  if (sunset === undefined) return;

  let timeOfDay;
  if (new Date().valueOf() < sunset * 1000) timeOfDay = 'day';
  else timeOfDay = 'night';
  return timeOfDay;
};

const convertToLocalTime = (dt, offset) => {
  // Convert dt with localOffset value back to default UTC and
  // apply specific timezone using UTC offset from response
  const UTCInMiliSeconds = dt * 1000;
  const timezoneOffsetInMiliSeconds = offset * 1000;
  const systemOffsetInMiliSeconds = new Date().getTimezoneOffset() * 60 * 1000;
  const converetedUTCDate = new Date(
    UTCInMiliSeconds + systemOffsetInMiliSeconds + timezoneOffsetInMiliSeconds
  );
  return converetedUTCDate;
};

/* const getHoursMinutes = (date) => {
  return 
} */
export { getCurrentWeather, getWeatherData, determineDayOrNight };
