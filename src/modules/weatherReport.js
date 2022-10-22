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
    console.log(err);
  }
};

const getDataForFirstDay = (weatherResponse) => {
  const firstDayData = weatherResponse.list[0];
  const firstDay = {
    locationInfo: {
      country: weatherResponse.city.country,
      cityName: weatherResponse.city.name,
      sunrise: weatherResponse.city.sunrise,
      sunset: weatherResponse.city.sunset,
      date_txt: firstDayData.dt_txt,
      date: firstDayData.dt,
      timezone: weatherResponse.city.timezone,
      convertedDateDay1: convertToLocalTime(
        firstDayData.dt,
        weatherResponse.city.timezone
      ),
    },
    weatherInfo: {
      temp: firstDayData.main.temp,
      humidity: firstDayData.main.humidity,
      description: firstDayData.weather[0].description,
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
  let validDaysArray = [];
  const zoneOffset = timezone;
  const currentDateDayValue = convertedDateDay1.getUTCDay();
  const weekRemainder = list.slice(1);
  weekRemainder.forEach((date) => {
    const dateDayValue = convertToLocalTime(date.dt, zoneOffset).getUTCDay();
    const dateHourValue = convertToLocalTime(date.dt, zoneOffset).getUTCHours();
    // Return a day with close to noon value
    if (
      dateDayValue !== currentDateDayValue &&
      dateHourValue >= 11 &&
      dateHourValue <= 13
    ) {
      const dayObject = {
        date_txt: date.dt_txt,
        date: date.dt,
        convertedDate: convertToLocalTime(date.dt, zoneOffset),
        temp: date.main.temp,
        description: date.weather[0].description,
        iconId: date.weather[0].icon,
      }
      validDaysArray.push(dayObject);
    }
  });
  /* const nextValidDaysArray = weekRemainder.filter(
    (day) =>
      convertToLocalTime(day.dt, zoneOffset).getUTCDay() !==
        firstDayDate.getUTCDay() &&
      (convertToLocalTime(day.dt, zoneOffset).getUTCHours() ===11 ||
      convertToLocalTime(day.dt, zoneOffset).getUTCHours() ===12||
      convertToLocalTime(day.dt, zoneOffset).getUTCHours() ===13) 
  );
  /* arrayOfDays.forEach((day) => {
    const dayObject = {
      date_txt: day.dt_txt,
      date: day.dt,
      temp: day.main.temp,
      description: day.weather[0].description,
      iconId: day.weather[0].icon,
    };
    dataFor6Days.push(dayObject);
  }); 
  return dataFor6Days; */
  console.log(validDaysArray);
  return validDaysArray;
};

const getWeatherData = async (cityName) => {
  try {
    const weatherResponse = await getCurrentWeather(cityName);
    const weatherData = await weatherResponse.json();
    console.log({ weatherData });
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

const determineDayOrNight = (weatherData) => {
  if (weatherData === undefined) return;
  const sunsetValue = weatherData.firstDay.locationInfo.sunset;
  console.log({ sunsetValue });

  let timeOfDay;
  if (new Date().valueOf() / 1000 < sunsetValue) timeOfDay = 'day';
  else timeOfDay = 'night';
  return timeOfDay;
};
export { getCurrentWeather, getWeatherData, determineDayOrNight };

const convertToLocalTime = (dt, offset) => {
  const UTCInMiliSeconds = dt * 1000;
  const timezoneOffsetInMiliSeconds = offset * 1000;
  const systemOffsetInMiliSeconds = new Date().getTimezoneOffset() * 60 * 1000;
  const converetedUTCDate = new Date(
    UTCInMiliSeconds + systemOffsetInMiliSeconds + timezoneOffsetInMiliSeconds
  );
  /* const converetedTime = converetedDate.toUTCString();
  const day = new Date(
    (UTCSeconds + systemOffsetInSeconds + timezoneOffset) * 1000
  ).getUTCDay();

  const hour = new Date(
    (UTCSeconds + systemOffsetInSeconds + timezoneOffset) * 1000
  ).getUTCHours(); */
  // console.log(converetedUTCDate.getUTCDay(), converetedUTCDate.getUTCHours());
  return converetedUTCDate;
};
