import { configureStore } from "@reduxjs/toolkit";
import { waitFor } from '@testing-library/react';
import backgroundImageSlice, { getBackgroundImage, switchToNextBackgroundImage, switchToPreviousBackgroundImage } from "./backgroundImageSlice";
import unsplashApi from "../../api/unsplash";

const expectedImageUrls = ['url1', 'url2', 'url3'];

jest.mock('../../api/unsplash', () => {
    const mockGetImage = jest.fn().mockResolvedValue({
      backgroundImageUrls: expectedImageUrls
    });
    
    return {
      ...jest.requireActual('../../api/unsplash'),
      getImage: mockGetImage
    };
  });

describe("backgroundImageSlice", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: { backgroundImage: backgroundImageSlice }
    });
  });

  it("should handle initial state", () => {
    const { backgroundImage } = store.getState();
    expect(backgroundImage.imageUrls).toEqual([]);
    expect(backgroundImage.currentImageUrlIndex).toBe(0);
  });

  it("should handle switchToNextBackgroundImage", async () => {
    jest.spyOn(unsplashApi, "getImage").mockResolvedValue(expectedImageUrls);
    
    store.dispatch(getBackgroundImage());
  
    await waitFor(() => {
      store.dispatch(switchToNextBackgroundImage());
      const { backgroundImage } = store.getState();
      expect(backgroundImage.currentImageUrlIndex).toBe(1);
    });
  });

  it("should handle switchToPreviousBackgroundImage", async () => {
    jest.spyOn(unsplashApi, "getImage").mockResolvedValue(expectedImageUrls);
    
    store.dispatch(getBackgroundImage());

    await waitFor(() => {
      store.dispatch(switchToNextBackgroundImage());
      store.dispatch(switchToPreviousBackgroundImage());
      const { backgroundImage } = store.getState();
      expect(backgroundImage.currentImageUrlIndex).toBe(0);
    });
  });

  it("should fetch imageUrls from getBackgroundImage", async () => {
    jest.spyOn(unsplashApi, "getImage").mockResolvedValue(expectedImageUrls);

    store.dispatch(getBackgroundImage());

    await waitFor(() => {
      const { backgroundImage } = store.getState();
      expect(backgroundImage.imageUrls).toEqual(expectedImageUrls);
      expect(backgroundImage.currentImageUrlIndex).toBe(0);
    });
  });
});



