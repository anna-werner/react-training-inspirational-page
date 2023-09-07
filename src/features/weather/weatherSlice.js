import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import openWeatherMapApi from "../../api/openWeatherMap";

export const getWeather = createAsyncThunk(
  "weather/getWeather",
  ({ city, state, country }) => openWeatherMapApi.getWeather(city, state, country)
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    city: "Berlin",
    state: "Berlin",
    country: "DE",
    metadata: {},
    temperature: "",
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getWeather.fulfilled, (state, action) => {
      state.metadata = action.payload.weatherMetadata;
      state.temperature = action.payload.temperature;
    });
  }
});

export const { setCity, setState, setCountry } = weatherSlice.actions;

export default weatherSlice.reducer;
