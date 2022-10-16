const getWeather = async (city) => {
    try {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c6a89bb93d1f609fa31e7a649c08ea66&units=metric`,
        { mode: 'cors' }
      );
      const weather = await data.json();
      console.log(weather)

    } catch (err) {
      console.log(err);
    }
  }


export default getWeather
