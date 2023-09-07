import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Quote from './Quote';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import quoteReducer from '../../features/quote/quoteSlice';

jest.mock('react-redux', () => {
    const { useDispatch } = jest.requireActual('react-redux');
    const useEffect = jest.requireActual('react').useEffect;
    return {
        ...jest.requireActual('react-redux'),
        useDispatch: () => {
            const mockDispatch = jest.fn();
            useEffect(() => {
                mockDispatch();
            }, []);
            return mockDispatch;
        },
    };
});

const fakeStore = configureStore({
    reducer: {
        quote: quoteReducer,
    },
    preloadedState: {
        quote: {
            status: 'succeeded',
            quote: 'Great ideas often receive violent opposition from mediocre minds.',
            author: 'Albert Einstein',
            error: null,
        },
    },
});

test('renders quote block', async () => {
    render(
        <Provider store={fakeStore}>
            <Quote />
        </Provider>
    );

    const quoteRegex = new RegExp('Great ideas often receive violent opposition from mediocre minds.', 'i');
    const quoteText = await screen.findByText(quoteRegex);
    expect(quoteText).toBeInTheDocument();

    const authorRegex = new RegExp('Albert Einstein', 'i');
    const authorText = await screen.findByText(authorRegex);
    expect(authorText).toBeInTheDocument();
});
