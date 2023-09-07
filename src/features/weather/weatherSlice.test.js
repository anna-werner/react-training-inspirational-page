import { configureStore } from "@reduxjs/toolkit";
import weatherReducer, { setCity, setState, setCountry, getWeather } from './weatherSlice';

jest.mock('../../api/openWeatherMap', () => {
  const mockGetWeather = jest.fn().mockResolvedValue({
    weatherMetadata: { humidity: '65%', pressure: '30in' },
    temperature: '20°C',
  });
  
  return {
    ...jest.requireActual('../../api/openWeatherMap'),
    getWeather: mockGetWeather
  };
});

describe("weather slice", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: { weather: weatherReducer }
    });
  });

  it("should set city", () => {
    store.dispatch(setCity('Hamburg'));
    const state = store.getState();
    expect(state.weather.city).toBe('Hamburg');
  });

  it("should set state", () => {
    store.dispatch(setState('Hamburg'));
    const state = store.getState();
    expect(state.weather.state).toBe('Hamburg');
  });

  it("should set country", () => {
    store.dispatch(setCountry('DE'));
    const state = store.getState();
    expect(state.weather.country).toBe('DE');
  });

  it("should handle getWeather.fulfilled", async () => {
    const action = {
      type: getWeather.fulfilled.type,
      payload: {
        weatherMetadata: { humidity: '65%', pressure: '30in' },
        temperature: '20°C',
      },
    };

    // Dispatch the action
    store.dispatch(action);

    // Get the current state of the store
    const state = store.getState();

    // Assert that the state was updated correctly
    expect(state.weather.metadata).toEqual({ humidity: '65%', pressure: '30in' });
    expect(state.weather.temperature).toEqual('20°C');
  });
});
