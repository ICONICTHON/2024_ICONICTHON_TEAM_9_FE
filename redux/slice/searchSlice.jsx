// src/redux/slice/searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../src/services/api';

export const fetchSearchResults = createAsyncThunk('search/fetchSearchResults', async (query, { rejectWithValue }) => {
    try {
        const response = await fetchData(`/api/mandatorys/search`, { name: query });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        results: [],
        majorBubbles: [],
        generalBubbles: [],
        loading: false,
        error: null,
    },
    reducers: {
        addMajorBubble: (state, action) => {
            state.majorBubbles.push(action.payload);
        },
        addGeneralBubble: (state, action) => {
            state.generalBubbles.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { addMajorBubble, addGeneralBubble } = searchSlice.actions;
export default searchSlice.reducer;
