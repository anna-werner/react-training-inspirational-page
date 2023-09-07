import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getQuote, quoteSlice } from './quoteSlice';
import quotesApi from "../../api/quotes";

jest.mock('../../api/quotes');

describe('Quote slice', () => {
    let store;
    const mockStore = configureMockStore([thunk]);
  
    beforeEach(() => {
        store = mockStore({
            quote: {
                quote: '',
                author: '',
            },
        });
    });
    
    it('should dispatch getQuote.fulfilled action', async () => {
        const mockQuote = 'Test Quote';
        const mockAuthor = 'Test Author';
  
        quotesApi.getQuote.mockResolvedValue({quote: mockQuote, author: mockAuthor});
  
        await store.dispatch(getQuote());
  
        const actions = store.getActions();
  
        expect(actions[0].type).toEqual(getQuote.pending.type);
        expect(actions[1].type).toEqual(getQuote.fulfilled.type);
        expect(actions[1].payload).toEqual({quote: mockQuote, author: mockAuthor});
    });
});
