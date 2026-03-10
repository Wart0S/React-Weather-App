
const HumidityWeather = ({humidity}) => {
  return (
    <div className="weather-item">
        <p className="time">Humidity</p>
        <p className="temperature">%{humidity}</p>
    </div>
  )
}

export default HumidityWeather