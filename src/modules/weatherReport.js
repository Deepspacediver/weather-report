import pick from 'lodash.pick';

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

const getWeatherData = async (cityName) => {
  try {
    const weatherResponse = await getCurrentWeather(cityName);
    const weatherData = await weatherResponse.json();
    // Return data: as an array of object ->
    // Basic Data, Data for the current day, Use for loop for next 6 days

    const specificWeatherData = {
      name: weatherData.name,
    };
    console.log(weatherData);
    // ({specificWeatherData:main.temp_max} = await weatherInfo)
    console.log({ specificWeatherData });
    return specificWeatherData;
  } catch (err) {
    console.log(err);
  }
};

export { getCurrentWeather, getWeatherData };
