// src/slice/flowSlice.js
import { createSlice } from '@reduxjs/toolkit';

const flowSlice = createSlice({
    name: 'flow',
    initialState: {
        courseBubbles: [],
    },
    reducers: {
        addCourseBubble: (state, action) => {
            state.courseBubbles.push(action.payload);
        },
    },
});

export const { addCourseBubble } = flowSlice.actions;
export default flowSlice.reducer;
