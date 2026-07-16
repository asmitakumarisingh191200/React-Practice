import { useEffect, useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import WeatherHero from './components/WeatherHero'
import SuggestionsList from './components/SuggestionsList'
import ForecastList from './components/ForecastList'

const getWeatherDescription = (code, isDay) => {
  const descriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Light rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Light snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Severe thunderstorm',
  }

  return descriptions[code] || 'Variable conditions'
}

const getWeatherIcon = (code, isDay) => {
  const icons = {
    0: isDay ? '☀️' : '🌙',
    1: isDay ? '🌤️' : '🌙',
    2: '⛅',
    3: '☁️',
    45: '🌫️',
    48: '🌫️',
    51: '🌦️',
    53: '🌦️',
    55: '🌧️',
    61: '🌦️',
    63: '🌧️',
    65: '⛈️',
    71: '🌨️',
    73: '❄️',
    75: '❄️',
    95: '⛈️',
    96: '⛈️',
    99: '⛈️',
  }

  return icons[code] || '🌦️'
}

const formatTime = (value) => {
  return new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}

const formatDay = (value) => {
  return new Intl.DateTimeFormat('en', { weekday: 'short' }).format(new Date(value))
}

const getFallbackWeather = () => ({
  location: 'London, United Kingdom',
  temperature: 22,
  feelsLike: 24,
  humidity: 55,
  wind: 12,
  precipitation: 20,
  description: 'Partly cloudy',
  icon: '⛅',
  sunrise: '05:40',
  sunset: '21:20',
  forecast: [
    { day: 'Mon', high: 24, low: 16, icon: '☀️', rain: 10 },
    { day: 'Tue', high: 23, low: 15, icon: '🌤️', rain: 15 },
    { day: 'Wed', high: 21, low: 14, icon: '☁️', rain: 35 },
    { day: 'Thu', high: 20, low: 13, icon: '🌦️', rain: 45 },
    { day: 'Fri', high: 22, low: 15, icon: '☀️', rain: 12 },
  ],
})

function App() {
  const [search, setSearch] = useState('London')
  const [city, setCity] = useState('London')
  const [weather, setWeather] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async (query, shouldUpdateInput = true) => {
    if (!query.trim()) {
      return
    }

    setLoading(true)
    setError('')

    let timeoutId

    try {
      const controller = new AbortController()
      timeoutId = window.setTimeout(() => controller.abort(), 8000)

      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`,
        { signal: controller.signal },
      )

      if (!geoResponse.ok) {
        throw new Error('The weather service is temporarily unavailable.')
      }

      const geoData = await geoResponse.json()

      if (!geoData.results?.length) {
        throw new Error(`No weather results found for "${query}".`)
      }

      const selectedCity = geoData.results[0]
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation_probability,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=auto`,
        { signal: controller.signal },
      )

      if (!weatherResponse.ok) {
        throw new Error('The weather service is temporarily unavailable.')
      }

      const weatherData = await weatherResponse.json()
      const current = weatherData.current
      const daily = weatherData.daily

      const nextWeather = {
        location: `${selectedCity.name}${selectedCity.country ? `, ${selectedCity.country}` : ''}`,
        temperature: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        humidity: current.relative_humidity_2m,
        wind: Math.round(current.wind_speed_10m),
        precipitation: current.precipitation_probability,
        description: getWeatherDescription(current.weather_code, current.is_day),
        icon: getWeatherIcon(current.weather_code, current.is_day),
        sunrise: formatTime(daily.sunrise[0]),
        sunset: formatTime(daily.sunset[0]),
        forecast: daily.time.slice(0, 5).map((day, index) => ({
          day: formatDay(day),
          high: Math.round(daily.temperature_2m_max[index]),
          low: Math.round(daily.temperature_2m_min[index]),
          icon: getWeatherIcon(daily.weather_code[index], true),
          rain: daily.precipitation_probability_max[index],
        })),
      }

      setWeather(nextWeather)
      setCity(selectedCity.name)
      if (shouldUpdateInput) {
        setSearch(selectedCity.name)
      }
      setSuggestions(geoData.results.slice(0, 5))
    } catch (err) {
      const fallback = getFallbackWeather()
      setWeather(fallback)
      setCity('London')
      setSuggestions([])
      setError(err.message || 'Unable to fetch weather right now. Showing sample data instead.')
    } finally {
      window.clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather('London')
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchWeather(search, true)
  }

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div>
          <p className="eyebrow">Live weather</p>
          <h1>Weather around the world</h1>
          <p className="subtitle">
            Search any city for today&apos;s weather and a simple 5-day outlook.
          </p>
        </div>

        <SearchBar
          search={search}
          setSearch={setSearch}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </header>

      {error ? <p className="error">{error}</p> : null}

      {loading && !weather ? <p className="status">Loading weather…</p> : null}

      {weather ? (
        <>
          <WeatherHero weather={weather} city={city} />

          {suggestions.length > 1 ? (
            <SuggestionsList
              suggestions={suggestions}
              onSelect={(name) => fetchWeather(name, true)}
            />
          ) : null}

          <ForecastList forecast={weather.forecast} city={city} />
        </>
      ) : null}
    </div>
  )
}

export default App
