import {journalSlice} from './journalSlice';

describe("journalSlice", () => {
  const initialState = {
    entries: [
      { text: "Water plants", isDone: false },
      { text: "Making spaget", isDone: false },
      { text: "Climb a V10", isDone: false },
      { text: "Make some beats", isDone: false }
    ],
    doneEntries: []
  };

  it("adds a new journal entry", () => {
    const newState = journalSlice.reducer(initialState, journalSlice.actions.addJournalEntry("New entry text"));
    expect(newState.entries.length).toBe(5);
    expect(newState.entries[4].text).toBe("New entry text");
    expect(newState.entries[4].isDone).toBe(false);
  });

  it("removes a journal entry", () => {
    const newState = journalSlice.reducer(initialState, journalSlice.actions.removeEntry(0));
    expect(newState.entries.length).toBe(3);
  });

  it("toggles an entry done status", () => {
    const newState = journalSlice.reducer(initialState, journalSlice.actions.toggleEntryDone(0));
    expect(newState.entries[0].isDone).toBe(true);
    const otherNewState = journalSlice.reducer(newState, journalSlice.actions.toggleEntryDone(0));
    expect(otherNewState.entries[0].isDone).toBe(false);
  });
});
