import WeatherReport from "./weatherReport"

const searchField = document.querySelector('#search-bar')


searchField.addEventListener('keydown', (e) => {
  if(e.key === "Enter" && e.keyCode === 13) {
    const cityName = e.target.value
    WeatherReport.getWeather(cityName)
    searchField.value =''
  }
})

// WeatherReport.getWeather(e.target.value)
