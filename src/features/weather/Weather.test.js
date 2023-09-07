import React from "react";
import { Provider, useDispatch } from "react-redux";
import { render, waitFor, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import Weather from "./Weather";
import { getWeather } from "./weatherSlice";

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  const actualModule = jest.requireActual('react-redux');
  return {
    ...actualModule,
    useSelector: (selector) => selector({
      weather: {
        metadata: {
          icon: 'test-icon',
          description: 'test-description'
        },
        temperature: '22',
        city: 'TestCity',
        state: 'TestState',
        country: 'TestCountry'
      }
    }),
    useDispatch: () => mockDispatch,
  };
});

jest.mock('./weatherSlice', () => {
  return {
    getWeather: jest.fn(),
  };
});

const mockStore = configureStore([]);

describe("Weather", () => {
  let store;
  beforeEach(() => {
    mockDispatch.mockClear();

    store = mockStore({
      weather: {
        metadata: {
          icon: 'test-icon',
          description: 'test-description'
        },
        temperature: '22',
        city: 'TestCity',
        state: 'TestState',
        country: 'TestCountry'
      }
    });

    jest.clearAllMocks();
  });

  it("should render temperature", () => {
    render(
      <Provider store={store}>
        <Weather />
      </Provider>
    );
    expect(screen.getByText('22°')).toBeInTheDocument();
  });

  it("should render weather description", () => {
    render(
      <Provider store={store}>
        <Weather />
      </Provider>
    );
    expect(screen.getByText('test-description')).toBeInTheDocument();
  });

  it('should dispatch getWeather action on component mount', async () => {
    render(
      <Provider store={store}>
        <Weather />
      </Provider>
    );

    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith(
        getWeather({
          city: 'TestCity',
          state: 'TestState',
          country: 'TestCountry'
        })
      )
    );
  });
});
