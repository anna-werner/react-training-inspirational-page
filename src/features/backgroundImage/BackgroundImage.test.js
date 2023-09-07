import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import BackgroundImage from './BackgroundImage';
import { getBackgroundImage } from './backgroundImageSlice';

const mockStore = configureStore([]);
jest.mock('./backgroundImageSlice');

describe('BackgroundImage', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      backgroundImage: {
        imageUrls: ['https://test.com/image1.jpg', 'https://test.com/image2.jpg'],
        currentImageUrlIndex: 1,
      },
    });

    getBackgroundImage.mockReturnValue({ type: 'mockAction' });

    render(
      <Provider store={store}>
        <BackgroundImage />
      </Provider>,
    );
  });

  it('displays the correct image from the props', () => {
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://test.com/image2.jpg');
  });

  it('dispatches getBackgroundImage on component mount', () => {
    expect(store.getActions()).toContainEqual({ type: 'mockAction' });
  });
});
