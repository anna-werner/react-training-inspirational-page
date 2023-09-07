import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import JournalEntry from "./JournalEntry";

const mockStore = configureStore([]);
const entryId = "testId";
const isDone = false;
const children = "test child";

describe("JournalEntry", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      journal: {
        entries: [{ id: entryId, isDone: isDone, children: children }],
      },
    });
  });

  it("Dispatches remove event when Remove button is clicked", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <JournalEntry id={entryId} isDone={isDone}>
          {children}
        </JournalEntry>
      </Provider>
    );
    fireEvent.click(getByLabelText("Remove"));
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: "journal/removeEntry", payload: entryId },
    ]);
  });

  it("Dispatches toggle event when Done/Redo button is clicked", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <JournalEntry id={entryId} isDone={isDone}>
          {children}
        </JournalEntry>
      </Provider>
    );
    fireEvent.click(getByLabelText("Mark Done"));
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: "journal/toggleEntryDone", payload: entryId },
    ]);
  });

  it("Renders the correct text based on the isDone prop", () => {
    const { getByText, rerender } = render(
      <Provider store={store}>
        <JournalEntry id={entryId} isDone={isDone}>
          {children}
        </JournalEntry>
      </Provider>
    );
    expect(getByText("Done")).toBeTruthy();
    rerender(
      <Provider store={store}>
        <JournalEntry id={entryId} isDone={!isDone}>
          {children}
        </JournalEntry>
      </Provider>
    );
    expect(getByText("Redo")).toBeTruthy();
  });
});
