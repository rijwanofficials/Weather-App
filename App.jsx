import styles from "./App.module.css";
import { useEffect } from "react";
import { useState } from "react";
import SearchBox from "./components/SearchBox/Searchbox";
function App() {
  const [city, setCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // Location fethching logic
  const getData = (city) => {
    const API_KEY = "23f0bdbaedcbde03b31f4b51a806065a";
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setError(null);
        console.log("Weather data:", data);
      })
      .catch((err) => {
        console.error("Error:", err.message);
        setWeatherData(null);
        setError(err.message);
      });
  };

  useEffect(() => {
    if (city) {
      getData(city);
    }
  }, [city]);
  const now = new Date();
  const currentTime = now.toLocaleTimeString();
  return (
    <div>
      <SearchBox onEnter={setCity} />

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
      )}

      {weatherData ? (
        <div className={styles.card_container}>
          <h2 className={styles.temp}>
            📍 {weatherData.name} - <span>{currentTime}</span>
          </h2>
          <h2 className={styles.temp}>
            🌡️ {Math.round(weatherData.main.temp)} °C
          </h2>
          <h3>🌥️ {weatherData.weather[0].description}</h3>
          <p>🥵 Feels Like: {Math.round(weatherData.main.feels_like)} °C</p>
          <p>🔥 Max Temp: {Math.round(weatherData.main.temp_max)} °C</p>
          <p>💧 Humidity: {weatherData.main.humidity}%</p>
          <p>🧭 Pressure: {weatherData.main.pressure} hPa</p>
          <p>💨 Wind Speed: {weatherData.wind.speed.toFixed(1)} m/s</p>
        </div>
      ) : (
        !error && <p className="hint">Enter a city to get weather data.</p>
      )}
    </div>
  );
};


export default App;




// const data = {
//   "coord": {
//     "lon": 77.2167,
//     "lat": 28.6667
//   },
//   "weather": [
//     {
//       "id": 802,
//       "main": "Clouds",
//       "description": "scattered clouds",
//       "icon": "03n"
//     }
//   ],
//   "base": "stations",
//   "main": {
//     "temp": 32.89,
//     "feels_like": 39.89,
//     "temp_min": 32.89,
//     "temp_max": 32.89,
//     "pressure": 997,
//     "humidity": 74,
//     "sea_level": 997,
//     "grnd_level": 971
//   },
//   "visibility": 10000,
//   "wind": {
//     "speed": 5.34,
//     "deg": 196,
//     "gust": 5.2
//   },
//   "clouds": {
//     "all": 33
//   },
//   "dt": 1751123863,
//   "sys": {
//     "country": "IN",
//     "sunrise": 1751068535,
//     "sunset": 1751118776
//   },
//   "timezone": 19800,
//   "id": 1273294,
//   "name": "Delhi",
//   "cod": 200
// }
// console.log(data);
// export default App
