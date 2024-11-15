// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import flowReducer from './slice/flowSlice';
import searchReducer from './slice/searchSlice';
import bubbleReducer from './slice/bubbleSlice';

const store = configureStore({
    reducer: {
        flow: flowReducer,
        search: searchReducer,
        bubbles: bubbleReducer,
    },
});

export default store;
