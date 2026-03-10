import { useRef, useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeatherItem from "./components/HourlyWeatherItem";
import SearchSection from "./components/SearchSection";
import { weatherCodes } from "./constans";
import WindWeather from "./components/WindWeather";
import HumidityWeather from "./components/HumidityWeather";
import SuggestionCard from "./components/SuggestionCard";


const App = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const searchInputRef = useRef(null);

  const filterHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;

    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });
    setHourlyForecast(next24HoursData);
  };

  const getWeatherDetails = async (API_URL) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const windSpeed = data.current.wind_kph;
      const humidity = data.current.humidity;
      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const weatherIcon = Object.keys(weatherCodes).find((icon) =>
        weatherCodes[icon].includes(data.current.condition.code),
      );
      

      setCurrentWeather({
        temperature,
        description,
        weatherIcon,
        windSpeed,
        humidity,
      
      isRainy: description.toLowerCase().includes("rain") || description.toLowerCase().includes("yağmur")
});
      const combinedHourlyData = [
        ...data.forecast.forecastday[0].hour,
        ...data.forecast.forecastday[1].hour,
      ];
      searchInputRef.current.value = data.location.name;

      filterHourlyForecast(combinedHourlyData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
     
    {currentWeather.weatherIcon && (
      currentWeather.weatherIcon === "mist" ? (
        <img src="public/videos/mist.jpg" className="background-media" alt="mist" />
      ) : (

        <video
        key={currentWeather.weatherIcon}
        autoPlay
        loop
        muted
        className="background-media"
        >
          <source src={`/videos/${currentWeather.weatherIcon}.mp4`} type="video/mp4" />
        </video>
      )
    )}

      <SearchSection
        getWeatherDetails={getWeatherDetails}
        searchInputRef={searchInputRef}
      />
      {/*  */}
      <CurrentWeather currentWeather={currentWeather} />
      {currentWeather.temperature !== undefined && (
        <SuggestionCard
        temperature={currentWeather.temperature}
        isRainy={currentWeather.isRainy}
           />
      )}

    <div className="extra-details">
      <WindWeather windSpeed={currentWeather.windSpeed || 0} />
      <HumidityWeather humidity={currentWeather.humidity || 0} />
  </div>
      
      <div className="hourly-forecast">
        <ul className="weather-list">
          {hourlyForecast.map((hourlyWeather) => (
            <HourlyWeatherItem
              key={hourlyWeather.time_epoch}
              hourlyWeather={hourlyWeather}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
