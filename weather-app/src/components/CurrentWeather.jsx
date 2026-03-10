
const CurrentWeather = ({currentWeather}) => {
  return (
          <div className="weather-section">
          <div className="current-weather">
            <img src={`src/assets/${currentWeather.weatherIcon}.svg`} className="weather-icon" alt="" />
            <h2 className="temperature">
              {currentWeather.temperature}<span>°C</span>
            </h2>
            <p className="description">{currentWeather.description}</p>
          </div>
        </div>
  )
}

export default CurrentWeather