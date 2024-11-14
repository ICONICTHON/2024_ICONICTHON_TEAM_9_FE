import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bubbles: [], // 버블 리스트 초기 상태
};

const bubbleSlice = createSlice({
    name: 'bubbles',
    initialState,
    reducers: {
        addBubble: (state, action) => {
            state.bubbles.push(action.payload);
        },
        removeBubble: (state, action) => {
            state.bubbles = state.bubbles.filter((bubble) => bubble.id !== action.payload);
        },
        updateBubble: (state, action) => {
            const index = state.bubbles.findIndex((bubble) => bubble.id === action.payload.id);
            if (index >= 0) {
                state.bubbles[index] = { ...state.bubbles[index], ...action.payload.updates };
            }
        },
    },
});

export const { addBubble, removeBubble, updateBubble } = bubbleSlice.actions;
export default bubbleSlice.reducer;
