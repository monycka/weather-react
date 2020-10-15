import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [prediction, setPrediction] = useState("");

  function searchWeather(event) {
    event.preventDefault();
    let apiKey = `43d48c14e180f75f558e0def6bf829b0`;
    let units = `imperial`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
  }

  function newCity(event) {
    setCity(event.target.value);
  }

  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let description = response.data.weather[0].description;
    let humidity = response.data.main.humidity;
    let wind = Math.round(response.data.wind.speed);
    let image = (
      <img
        src={`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
        alt="Weather icon"
      />
    );
    setPrediction(
      <ul className="setPrediction">
        <li>Temperature: {Math.round(temperature)}°F</li>
        <li>Description: {description}</li>
        <li>Humidity: {humidity}%</li>
        <li>Wind: {wind} mph</li>
        <li>{image}</li>
      </ul>
    );
  }

  return (
    <div className="Search">
      <form onSubmit={searchWeather}>
        <input type="search" placeholder="Type a city..." onChange={newCity} />
        <input type="submit" value="Search" />
      </form>
      {prediction}
    </div>
  );
}
