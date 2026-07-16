function WeatherHero({ weather, city }) {
  return (
    <section className="hero-card">
      <div>
        <p className="eyebrow">Now in {weather.location}</p>
        <div className="temperature-row">
          <span className="temp">{weather.temperature}°C</span>
          <span className="icon-large">{weather.icon}</span>
        </div>
        <p className="description">{weather.description}</p>
        <div className="stats-grid">
          <div>
            <strong>Feels like</strong>
            <span>{weather.feelsLike}°C</span>
          </div>
          <div>
            <strong>Humidity</strong>
            <span>{weather.humidity}%</span>
          </div>
          <div>
            <strong>Wind</strong>
            <span>{weather.wind} km/h</span>
          </div>
          <div>
            <strong>Rain</strong>
            <span>{weather.precipitation}%</span>
          </div>
        </div>
      </div>
      <div className="sun-card">
        <p>Sunrise</p>
        <strong>{weather.sunrise}</strong>
        <p>Sunset</p>
        <strong>{weather.sunset}</strong>
        <p>City</p>
        <strong>{city}</strong>
      </div>
    </section>
  )
}

export default WeatherHero
