import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTableData } from '../../api/server';

export const getTableFiles = createAsyncThunk(
    'data/getTableData',
    async (dispatch, getState) => {
        return await getTableData().then(
            (response) => {
                dispatch(dataSlice.actions.getTable(response.data.data));
                console.log('response', response.data.data);
                return response.data.data;
            });
    });

const dataSlice = createSlice({
    name: 'data',
    initialState: [],
    reducers: {
        getTable(data, action) {
            console.log('data', data);
            console.log('action', action);
            return <div>STATUS</div>
        },
        [getTableFiles.pending]: (state, action) => {
            state.status = "loading";
        },
        [getTableFiles.fulfilled]: (state, action) => {
            state.status = 'success';
            state = action.payload;
        },
        [getTableFiles.rejected]: (state, action) => {
            state.status = "failed";
        }
    },
});

const { actions, reducer } = dataSlice;
export const { getTable } = actions;
export default dataSlice.reducer;