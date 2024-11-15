// src/redux/slice/bubbleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const bubbleSlice = createSlice({
    name: 'bubbles',
    initialState: {
        bubbles: [], // Initialize bubbles as an empty array
    },
    reducers: {
        addBubble: (state, action) => {
            state.bubbles.push(action.payload);
        },
        removeBubble: (state, action) => {
            state.bubbles = state.bubbles.filter((bubble) => bubble.id !== action.payload);
        },
    },
});

export const { addBubble, removeBubble } = bubbleSlice.actions;
export default bubbleSlice.reducer;
