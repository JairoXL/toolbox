import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTableData } from '../../api/server';

export const fetchTableFiles = createAsyncThunk('table/getTableFiles', async () => {
    const response = await getTableData();
    return response.data;
});

export const dataSlice = createSlice({
    name: 'table',
    initialState: {
        tableFiles: {},
        loading: 'idle',
    },
    extraReducers: (builder ) => {
        builder
            .addCase(fetchTableFiles.pending, (state, action) => {
                state.loading = 'loading';
            })
            .addCase(fetchTableFiles.fulfilled, (state, action) => {
                state.loading = 'success';
                state.tableFiles = action.payload;
            })
            .addCase(fetchTableFiles.rejected, (state, action) => {
                state.loading = 'failed';
                state.tableFiles = action.payload;
            })
    },
    reducers: {
        getTableState(state, action) {
            return state;
        },
    }
});

const { actions, reducer } = dataSlice;
export default reducer;