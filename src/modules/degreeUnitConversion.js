const unitButton = document.querySelector('.unit-btn');

const applyConversion = (tempArray, conversion) => {
  tempArray.forEach((temp) => {
    temp.textContent = conversion(temp.textContent);
  });

  console.log(allTemperatureElements);
};
const convertToCelsius = (farenheitValue) => {
  const newCelsiusValue = ((farenheitValue - 32) * 5) / 9;
  return newCelsiusValue.toFixed(2);
};
const convertToFarenheit = (celsiusValue) => {
  const newFarenheitValue = celsiusValue * 1.8 + 32;
  return newFarenheitValue.toFixed(2);
};

unitButton.addEventListener('click', (e) => {
  const allTemperatureElArray = Array.from(
    document.querySelectorAll('.tempDegree')
  );
  if (unitButton.classList.contains('celsius')) {
    allTemperatureElArray.forEach((temp) => {
      temp.textContent = convertToFarenheit(Number(temp.textContent));
    });
    unitButton.classList.remove('celsius');
    unitButton.classList.add('farenheit');
  } else {
    allTemperatureElArray.forEach((temp) => {
      temp.textContent = convertToCelsius(Number(temp.textContent));
    });
    unitButton.classList.remove('farenheit');
    unitButton.classList.add('celsius');
  }
});

const checkForFarenheit = (weatherResponse) => {
  if (unitButton.classList.contains('farenheit') === true) {
    weatherResponse.firstDay.weatherInfo.temp = convertToFarenheit(
      weatherResponse.firstDay.weatherInfo.temp
    );
    weatherResponse.remainderOfDays.forEach((day) => {
      day.temp = convertToFarenheit(day.temp);
    });
  }
};
export default checkForFarenheit
// Fix conversion when changing Measuring Unit and inputting new Location
