// src/redux/searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../src/services/api';

export const fetchSearchResults = createAsyncThunk('search/fetchSearchResults', async (query) => {
    const response = await api.get(`/api/mandatorys/search?name=${query}`);
    return response.data; // response.data가 배열인지 확인하세요
});

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        results: [], // 배열로 초기화
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.loading = false;
                state.results = Array.isArray(action.payload) ? action.payload : []; // 배열로 설정
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default searchSlice.reducer;
