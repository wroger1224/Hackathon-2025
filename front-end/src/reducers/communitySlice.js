import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { communityApi } from '../services/Firebase/apiService';

// Async thunk for fetching community data
export const fetchCommunityData = createAsyncThunk(
    'community/fetchCommunityData',
    async () => {
        console.log('Fetching community data...');
        return communityApi.fetchCommunityData();
    }
);

const communitySlice = createSlice({
    name: 'community',
    initialState: {
        competition: null,
        teams: [],
        users: [],
        milestones: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommunityData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCommunityData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.competition = action.payload.competition;
                state.teams = action.payload.teams;
                state.users = action.payload.users;
                state.milestones = action.payload.milestones;
            })
            .addCase(fetchCommunityData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default communitySlice.reducer; 