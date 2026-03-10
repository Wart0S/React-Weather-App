import { weatherCodes } from "../constans";

const HourlyWeatherItem = ({ hourlyWeather }) => {
  const temperature = Math.floor(hourlyWeather.temp_c);
  const time = hourlyWeather.time.split(" ")[1].substring(0, 5);
  const hour = parseInt(time.split(":")[0]);

  const isNight = hour >= 19 || hour <= 6;

  let iconName = Object.keys(weatherCodes).find((icon) =>
    weatherCodes[icon].includes(hourlyWeather.condition.code)
  );

  const weatherIcon = Object.keys(weatherCodes).find((clear) =>
    weatherCodes[clear].includes(hourlyWeather.condition.code),
  );


if (isNight && (iconName === "clear" || iconName === "clouds" || iconName === "rain" || iconName === "mist" || iconName === "snow" || iconName === "thunder")) {
    iconName = "night";
}

  return (
    <li className="weather-item">
      <p className="time">{time}</p>
      <img
        src={`src/assets/${iconName}${iconName === "night" ? ".png" : ".svg"}`}
        className="weather-icon"
        alt="clouds"
      />
      <p className="temperature">{temperature}°</p>
    </li>
  );
};

export default HourlyWeatherItem;
