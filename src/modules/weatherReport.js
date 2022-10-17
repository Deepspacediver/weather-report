
const getCurrentWeather = async (city) => {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c6a89bb93d1f609fa31e7a649c08ea66&cnt=7&units=metric`,
      /* `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c6a89bb93d1f609fa31e7a649c08ea66&units=metric` */ {
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
      date: firstDayData.dt,
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
}

/* const getDataFor6Days = (arrayOfDays) => {
  const dataFor6Days = []
  arrayOfDays.forEach((day, index) => {

  })   
} */
const getWeatherData = async (cityName) => {
  try {
    const weatherResponse = await getCurrentWeather(cityName);
    const weatherData = await weatherResponse.json();
    // Return data: as an array ->
    // General data with info for the current day, 2nd item is an array of 6 days
    const firstDay = getDataForFirstDay(weatherData)

    const remainderOfDays = weatherData.list.slice(1);
    // const remainderDaysDataArray = []
    console.log(remainderOfDays, firstDay);

    /* const specificWeatherData = {
      name: weatherData.name,
    }; */
    console.log(weatherData);
    // ({specificWeatherData:main.temp_max} = await weatherInfo)
  } catch (err) {
    console.log(err);
  }
};

export { getCurrentWeather, getWeatherData };
