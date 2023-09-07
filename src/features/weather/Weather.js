import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "./weatherSlice";
import "./weather.css";

const Weather = () => {
  const { metadata, temperature, city, state, country } = useSelector(
    (state) => state.weather
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeather({ city, state, country }));
  }, [dispatch, city, state, country]);

  let weatherOutput = null;
  if (metadata) {
    weatherOutput = (
      <div className="temperature-container">
        <div className="weather-image">
          <img
            src={`http://openweathermap.org/img/wn/${metadata.icon}.png`}
            alt=""
          />
        </div>
        <div className="weather-text">
          <p className="temperature">{temperature}°</p>
          <p className="weather-description">{metadata.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="weather">
      { weatherOutput }
    </div>
  );
};

export default Weather;
