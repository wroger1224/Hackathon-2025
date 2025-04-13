import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminApi } from '../services/Firebase/apiService';

const initialState = {
    competitions: [],
    teams: [],
    users: [],
    loading: false,
    error: null,
    needsRefresh: false
};

export const fetchInitialData = createAsyncThunk('admin/fetchInitialData', async (_, { rejectWithValue }) => {
    try {
        return adminApi.fetchInitialData();
    } catch (error) {
        console.error('Error fetching initial data:', error);
        return rejectWithValue(error.message);
    }
});

export const createCompetition = createAsyncThunk('admin/createCompetition', async (competition, { rejectWithValue }) => {
    try {
        return adminApi.createCompetition(competition);
    } catch (error) {
        console.error('Error creating competition:', error);
        return rejectWithValue(error.message);
    }
});

export const createTeam = createAsyncThunk('admin/createTeam', async (teamData, { rejectWithValue }) => {
    try {
        console.log('Creating team:', teamData);
        return adminApi.createTeam(teamData);
    } catch (error) {
        console.error('Error creating team:', error);
        return rejectWithValue(error.message);
    }
});

export const updateTeam = createAsyncThunk('admin/updateTeam', async ({ teamId, action, memberId }, { rejectWithValue }) => {
    try {
        return adminApi.updateTeam(teamId, action, memberId);
    } catch (error) {
        console.error('Error updating team:', error);
        return rejectWithValue(error.message);
    }
});

export const updateCompetition = createAsyncThunk('admin/updateCompetition', async ({ competitionId, competitionData }, { rejectWithValue }) => {
    try {
        return adminApi.updateCompetition(competitionId, competitionData);
    } catch (error) {
        console.error('Error updating competition:', error);
        return rejectWithValue(error.message);
    }
});

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInitialData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInitialData.fulfilled, (state, action) => {
                state.loading = false;
                state.competitions = action.payload.competitions;
                state.teams = action.payload.teams;
                state.users = action.payload.users;
            })
            .addCase(fetchInitialData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createCompetition.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCompetition.fulfilled, (state, action) => {
                state.loading = false;
                state.competitions = [...state.competitions, action.payload];
            })
            .addCase(createCompetition.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTeam.fulfilled, (state, action) => {
                state.loading = false;
                // Refresh teams data by setting a flag that will trigger a refetch
                state.needsRefresh = true;
            })
            .addCase(createTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTeam.fulfilled, (state, action) => {
                state.loading = false;
                // Refresh teams data by setting a flag that will trigger a refetch
                state.needsRefresh = true;
            })
            .addCase(updateTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCompetition.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCompetition.fulfilled, (state, action) => {
                state.loading = false;
                const updatedCompetition = action.payload;
                // Update the competition in the state
                const updatedCompetitions = state.competitions.map(comp => 
                    comp.CompetitionID === updatedCompetition.CompetitionID
                        ? { ...comp, ...updatedCompetition }
                        : comp
                );
                state.competitions = updatedCompetitions;
            })
            .addCase(updateCompetition.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { setAdmin, setAdminData, setLoading, setError } = adminSlice.actions;
export default adminSlice.reducer; 