import { configureStore } from '@reduxjs/toolkit';

import dataReducer from '../features/data';

export default configureStore({
    reducer: { data: dataReducer }
});