import React, { useEffect, useState } from "react";
import "./dashboard.css";

const Dashboard = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "2e4c93fe29621068ed40010426944e87";

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  function formatSunsetTime(timestamp) {
    const date = new Date(timestamp * 1000);

    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    let ampm = "AM";
    let formattedHours = hours;

    if (hours >= 12) {
      ampm = "PM";
      formattedHours = hours % 12 || 12;
    }

    return `${formattedHours}:${minutes} ${ampm}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", top: "20px", position: "relative" }}>
          <input
            className="search-box"
            type="text"
            placeholder="Enter Location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </div>
      </form>
      {weatherData && (
        <div className="info-conatiner">
          <div className={`img-${(weatherData.weather[0].id) === 800  ? "9" : Number(String(weatherData.weather[0].id)[0]) }`}></div>
          <div className="city-name">{weatherData.name}</div>
          <div className="temp">{Math.round(weatherData.main.temp)}&deg;C</div>
          <div className="time-temp-conatiner">
            <div className="rise-set-time">
              <div style={{ marginBottom: "10px", marginTop: "10px" }}>
                Sunrise Time: {formatSunsetTime(weatherData.sys.sunrise)}
              </div>
              <div>Sunset Time: {formatSunsetTime(weatherData.sys.sunset)}</div>
            </div>
            <div className="min-max-time">
              <div style={{ marginBottom: "10px", marginTop: "10px" }}>
                Min Temperature: {Math.round(weatherData.main.temp_min)}&deg;C{" "}
              </div>
              <div>
                Max Temperature: {Math.round(weatherData.main.temp_max)}&deg;C
              </div>
            </div>
          </div>
          <div
            style={{ marginTop: "15px", fontSize: "20px", fontStyle: "italic" }}
          >
            Today's Temperature is Mostly {" "}
            <span style={{ fontWeight: "bold" }}>
              {weatherData.weather[0].main === "Clouds"
                ? "Cloudy"
                : weatherData.weather[0].main === "Thunderstorm"
                ? "Thunder Storm"
                : weatherData.weather[0].main === "Drizzle"
                ? "Drizzling"
                : weatherData.weather[0].main === "Rain"
                ? "Rainy"
                : weatherData.weather[0].main === "Snow"
                ? "Snowy"
                : weatherData.weather[0].main === "Clear"
                ? "Sunny"
                : weatherData.weather[0].main}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
