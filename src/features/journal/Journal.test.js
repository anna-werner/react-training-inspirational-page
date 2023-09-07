import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, fireEvent, screen } from '@testing-library/react';
import { addJournalEntry, journalSlice } from './journalSlice';
import Journal from './Journal';

const INITIAL_STATE = journalSlice.getInitialState();
const mockStore = configureStore([]);

describe("Journal", () => {
  let store;

  beforeEach(() => {
    store = mockStore({ journal: INITIAL_STATE });
    store.dispatch = jest.fn();
  });
  
  it("submits form and dispatches addJournalEntry action", () => {
    render(
      <Provider store={store}>
        <Journal />
      </Provider>
    );
    
    const newEntry = "My new entry";
    fireEvent.change(screen.getByLabelText(/new journal entry/i), {
      target: { value: newEntry },
    });
    
    fireEvent.submit(screen.getByRole('textbox'));
    
    expect(store.dispatch).toHaveBeenCalledWith(addJournalEntry(newEntry));
  });

  it("submits form and clears the input", () => {
    render(
      <Provider store={store}>
        <Journal />
      </Provider>
    );
    
    const newEntry = "My new entry";
    const inputElement = screen.getByLabelText(/new journal entry/i);
    
    fireEvent.change(inputElement, {
      target: { value: newEntry },
    });
    fireEvent.submit(screen.getByRole('textbox'));
    
    expect(inputElement.value).toBe(""); 
  });

  it("does not dispatch addJournalEntry when input is empty", () => {
    render(
      <Provider store={store}>
        <Journal />
      </Provider>
    );

    fireEvent.submit(screen.getByRole('textbox'));
    
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
