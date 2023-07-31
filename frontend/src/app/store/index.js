import { configureStore } from '@reduxjs/toolkit';
import dataSlice from '../features/data';

// Set up store for Redux
export const store = configureStore({
    reducer: {
        tableData: dataSlice
    }
});