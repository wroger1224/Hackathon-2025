import { getCurrentUserToken } from './firebaseService';

const API_BASE_URL = 'http://localhost:3000';

// Helper function to handle API responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        console.log('Error:', error);
        throw new Error(error.error || 'API request failed');
    }
    return response.json();
};

// Helper function to get headers with auth token
const getHeaders = async (includeAuth = true) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (includeAuth) {
        const token = await getCurrentUserToken();
        if (!token) throw new Error('No authentication token available');
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

// Community API calls
export const communityApi = {
    fetchCommunityData: async () => {
        console.log('Fetching community data');
        const response = await fetch(`${API_BASE_URL}/community`, {
            headers: await getHeaders()
        });
        console.log('Response:', response);
        const data = await handleResponse(response);
        return data;
    }
};

// Admin API calls
export const adminApi = {
    fetchInitialData: async () => {
        const response = await fetch(`${API_BASE_URL}/admin/initial-data`, {
            headers: await getHeaders()
        });
        const data = await handleResponse(response);
        return data;
    },

    createCompetition: async (competition) => {
        const response = await fetch(`${API_BASE_URL}/admin/competitions`, {
            method: 'POST',
            headers: await getHeaders(),
            body: JSON.stringify(competition)
        });
        const data = await handleResponse(response);
        return data;
    },

    createTeam: async (teamData) => {
        const response = await fetch(`${API_BASE_URL}/admin/teams`, {
            method: 'POST',
            headers: await getHeaders(),
            body: JSON.stringify(teamData)
        });
        const data = await handleResponse(response);
        return data;
    },

    updateTeam: async (teamId, action, memberId) => {
        const response = await fetch(`${API_BASE_URL}/admin/teams/${teamId}`, {
            method: 'PUT',
            headers: await getHeaders(),
            body: JSON.stringify({ action, memberId })
        });
        const data = await handleResponse(response);
        return data;
    },

    updateCompetition: async (competitionId, competitionData) => {
        const response = await fetch(`${API_BASE_URL}/admin/competitions/${competitionId}`, {
            method: 'PUT',
            headers: await getHeaders(),
            body: JSON.stringify(competitionData)
        });
        const data = await handleResponse(response);
        return data;
    }
};

// User Profile API calls
export const userProfileApi = {
    fetchUserProfile: async (userId) => {
        const response = await fetch(`${API_BASE_URL}/user/profile/${userId}`, {
            headers: await getHeaders()
        });
        const data = await handleResponse(response);
        return data;
    },

    updateUserProfile: async (userId, profile) => {
        const response = await fetch(`${API_BASE_URL}/user/profile/${userId}`, {
            method: 'PUT',
            headers: await getHeaders(),
            body: JSON.stringify(profile)
        });
        const data = await handleResponse(response);
        return data;
    },

    createUserProfile: async (profile) => {
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
            method: 'POST',
            headers: await getHeaders(),
            body: JSON.stringify(profile)
        });
        const data = await handleResponse(response);
        return data;
    }
};
