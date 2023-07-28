import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../features/data';

// Set up store for Redux
export const store = configureStore({
    reducer: {
        data: dataReducer
    }
});