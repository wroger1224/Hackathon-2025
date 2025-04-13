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
        const response = await fetch(`${API_BASE_URL}/community`, {
            headers: await getHeaders()
        });
        return handleResponse(response);
    }
};

// Admin API calls
export const adminApi = {
    fetchInitialData: async () => {
        const response = await fetch(`${API_BASE_URL}/admin/initial-data`, {
            headers: await getHeaders()
        });
        return handleResponse(response);
    },

    createCompetition: async (competition) => {
        const response = await fetch(`${API_BASE_URL}/admin/competitions`, {
            method: 'POST',
            headers: await getHeaders(),
            body: JSON.stringify(competition)
        });
        return handleResponse(response);
    },

    createTeam: async (teamData) => {
        const response = await fetch(`${API_BASE_URL}/admin/teams`, {
            method: 'POST',
            headers: await getHeaders(),
            body: JSON.stringify(teamData)
        });
        return handleResponse(response);
    },

    updateTeam: async (teamId, action, memberId) => {
        const response = await fetch(`${API_BASE_URL}/admin/teams/${teamId}`, {
            method: 'PUT',
            headers: await getHeaders(),
            body: JSON.stringify({ action, memberId })
        });
        return handleResponse(response);
    },

    updateCompetition: async (competitionId, competitionData) => {
        const response = await fetch(`${API_BASE_URL}/admin/competitions/${competitionId}`, {
            method: 'PUT',
            headers: await getHeaders(),
            body: JSON.stringify(competitionData)
        });
        return handleResponse(response);
    }
};

// User Profile API calls
export const userProfileApi = {
    fetchUserProfile: async (userId) => {
        const response = await fetch(`${API_BASE_URL}/user/profile/${userId}`, {
            headers: await getHeaders()
        });
        return handleResponse(response);
    },

    updateUserProfile: async (userId, profile) => {
        const response = await fetch(`${API_BASE_URL}/user/profile/${userId}`, {
            method: 'PUT',
            headers: await getHeaders(),
            body: JSON.stringify(profile)
        });
        return handleResponse(response);
    },

    createUserProfile: async (profile) => {
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
            method: 'POST',
            headers: await getHeaders(),
            body: JSON.stringify(profile)
        });
        return handleResponse(response);
    }
};
