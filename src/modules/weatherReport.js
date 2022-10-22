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
      convertedDate: convertToLocalTime(
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

/* const getDataForRestOfWeek = (arrayOfDays) => {
  const dataFor6Days = [];
  arrayOfDays.forEach((day) => {
    const dayObject = {
      date_txt: day.dt_txt,
      date: day.dt,
      temp: day.main.temp,
      description: day.weather[0].description,
      iconId: day.weather[0].icon,
    };
    dataFor6Days.push(dayObject);
  });
  return dataFor6Days;
}; */

const getWeatherData = async (cityName) => {
  try {
    const weatherResponse = await getCurrentWeather(cityName);
    const weatherData = await weatherResponse.json();
    console.log({ weatherData });
    /* Return data: as an object ->
       General data and info for the current day, 2nd item is an array of 6 days 
    */
    const firstDay = getDataForFirstDay(weatherData);
    /* const remainderOfDays = weatherData.list.slice(1);
    const remainderDaysData = getDataForRestOfWeek(remainderOfDays);

    const dataObject = {
      firstDay,
      remainderDaysData,
    }; */
    return firstDay;
  } catch (err) {
    console.log(err);
  }
};

const determineDayOrNight = (weatherData) => {
  if (weatherData === undefined) return;
  const sunsetValue = weatherData.locationInfo.sunset;
  console.log({ sunsetValue });

  let timeOfDay;
  if (new Date().valueOf() / 1000 < sunsetValue) timeOfDay = 'day';
  else timeOfDay = 'night';
  return timeOfDay;
};
export { getCurrentWeather, getWeatherData, determineDayOrNight };

const convertToLocalTime = (dt, offset) => {
  const systemOffsetInSeconds = new Date().getTimezoneOffset() * 60;
  const UTCSeconds = dt;
  const timezoneOffset = offset;
  const converetedDate = new Date(
    (UTCSeconds + systemOffsetInSeconds + timezoneOffset) * 1000
  )
  const converetedTime = converetedDate.toUTCString()
  const day = new Date(
    (UTCSeconds + systemOffsetInSeconds + timezoneOffset) * 1000
  ).getUTCDay();
  const hour = new Date(
    (UTCSeconds + systemOffsetInSeconds + timezoneOffset) * 1000
  ).getUTCHours();
  console.log(converetedTime, day, hour );
  return converetedTime;
};
