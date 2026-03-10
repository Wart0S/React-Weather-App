
const WindWeather = ({windSpeed}) => {
  return (
    <div className="weather-item">
    <p className="time">Wind</p>
    <p className="temperature">{windSpeed} km/h</p>
    </div>
  )
}

export default WindWeather