import { configureStore } from '@reduxjs/toolkit';
import flowReducer from './slice/flowSlice';
import searchReducer from './slice/searchSlice';
const store = configureStore({
    reducer: {
        flow: flowReducer,
        search: searchReducer,
    },
});

export default store;
