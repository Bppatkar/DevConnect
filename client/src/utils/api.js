// client/src/utils/api.js
import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Ensure this matches your .env
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to set Authorization header for a request
const setAuthHeader = (token) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };
};

// --- Authentication API Calls ---
export const authApi = {
  signup: (userData) => api.post('/auth/signup', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  // For getMe, the token needs to be passed explicitly or retrieved here
  getMe: async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    return api.get('/auth/me', setAuthHeader(token));
  },
};

// --- Project API Calls ---
export const projectApi = {
  getAllProjects: async () => {
    // Projects list is public, no token needed
    return api.get('/projects');
  },
  getProjectById: async (id) => {
    // Project details are public
    return api.get(`/projects/${id}`);
  },
  createProject: async (projectData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication required to create project');
    return api.post('/projects', projectData, setAuthHeader(token));
  },
  addComment: async (projectId, commentData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication required to add comment');
    return api.post(`/projects/${projectId}/comments`, commentData, setAuthHeader(token));
  },
  toggleLike: async (projectId) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication required to like project');
    // Assuming backend handles likes on this endpoint, e.g., POST /api/projects/:id/like
    return api.post(`/projects/${projectId}/like`, {}, setAuthHeader(token));
  },
  searchProjects: async (query) => {
    // Project search is public
    return api.get(`/projects/search?q=${query}`);
  },
};

// --- User API Calls ---
export const userApi = {
  searchUsers: async (query) => {
    // User search is public
    return api.get(`/users/search?q=${query}`);
  },
  getProfile: async (userId) => {
    // Profile view can be public, but if it's the current user, token might be needed for full data
    const token = localStorage.getItem('token');
    return api.get(`/users/${userId}`, token ? setAuthHeader(token) : {});
  },
  updateProfile: async (profileData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication required to update profile');
    return api.patch('/users/me', profileData, setAuthHeader(token)); // Assuming PATCH /api/users/me route
  },
};

export default api; // Export the default axios instance if needed elsewhere
