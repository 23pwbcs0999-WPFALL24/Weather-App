import React, { useState } from 'react';
import './index.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(''); // Add error state

  const apiKey = '708198893596b1a9da7c09c4e556c0e9';

  const getWeather = async () => {
    setError(''); // Clear previous errors
    setWeather(null); // Clear previous weather
    if (!city) {
      setError('Please enter a city name.');

      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.message || 'City not found.');
      }
    } catch (err) {
      setError('Network error. Please try again.',err);
    }
  };

  return (
    <div className="app">
      <h1>🌤️ Simple Weather App</h1>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {weather && weather.main && (
        <div className="weather-box">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>🌡️ Temp: {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind: {weather.wind.speed} m/s</p>
          <p>⛅ Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
