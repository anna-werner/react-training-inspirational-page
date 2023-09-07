



import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import JournalEntries from './JournalEntries';
import configureStore from 'redux-mock-store';
import { journalSlice } from '../journalSlice';

const INITIAL_STATE = journalSlice.getInitialState();
const COLORS = [
    "blue",
    "red",
    "green",
    "orange"
];

const mockStore = configureStore([]);

describe("JournalEntries", () => {
  let store;
  
  beforeEach(() => {
    store = mockStore({ journal: INITIAL_STATE });
  });

  it("renders the entries from the state", () => {
    const { getByText } = render(
      <Provider store={store}>
        <JournalEntries />
      </Provider>
    );
    
    store.getState().journal.entries.forEach(({ text }) => {
      expect(getByText(text)).toBeInTheDocument();
    });
  });

  it("displays entry with correct color and style based on index and isDone", () => {
    const { getByText } = render(
      <Provider store={store}>
        <JournalEntries />
      </Provider>
    );
    
    store.getState().journal.entries.forEach(({ isDone }, index) => {
      const element = document.getElementsByClassName(`surface-styles`)[index];
      expect(element).toHaveClass(`surface-${COLORS[index % COLORS.length]}`);
      if (isDone) {
        expect(element).toHaveClass("entry-done");
      }
    });
  });
});