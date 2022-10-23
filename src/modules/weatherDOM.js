

const createCurrentDay = ({ firstDay }) => {
  const {
    locationInfo: { cityName, convertedDateDay1 },
    weatherInfo: { description, humidity, iconId, temp, wind },
  } = firstDay;

  console.log(
    cityName,
    convertedDateDay1,
    description,
    humidity,
    iconId,
    temp,
    wind
  );
};

export { createCurrentDay };
