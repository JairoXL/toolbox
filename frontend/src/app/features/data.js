import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: 'data',
    initialState: {},
    reducers: {
        dataAction: {
            reducer(state, action) {
                state.push(action.payload);
            }
        }
    }
});

export const { dataAction } = dataSlice.actions;

export default dataSlice.reducer;