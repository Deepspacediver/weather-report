import getWeather from "./weatherReport"

const searchField = document.querySelector('#search-bar')

searchField.addEventListener('keydown', (e) => {
  if(e.key === "Enter" && e.keyCode === 13 && e.target.value !=='') {
    const cityName = e.target.value
    getWeather(cityName)
    searchField.value =''
  }
})

// WeatherReport.getWeather(e.target.value)
