function ForecastList({ forecast, city }) {
  return (
    <section className="forecast-card">
      <div className="forecast-heading">
        <h2>Next 5 days</h2>
        <p>{city}</p>
      </div>
      <div className="forecast-grid">
        {forecast.map((item) => (
          <article key={item.day} className="forecast-item">
            <p>{item.day}</p>
            <span className="forecast-icon">{item.icon}</span>
            <strong>
              {item.high}° / {item.low}°
            </strong>
            <span>{item.rain}% rain</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ForecastList
