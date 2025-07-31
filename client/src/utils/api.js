import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthHeader = (token) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const authApi = {
  signup: (userData) => api.post("/auth/signup", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  getMe: async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    return api.get("/auth/me", setAuthHeader(token));
  },
};

export const projectApi = {
  getAllProjects: async () => api.get("/projects"),
  getProjectById: async (id) => api.get(`/projects/${id}`),
  createProject: async (projectData) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Authentication required to create project");
    return api.post("/projects", projectData, setAuthHeader(token));
  },
  addComment: async (projectId, commentData) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Authentication required to add comment");
    return api.post(
      `/projects/${projectId}/comments`,
      commentData,
      setAuthHeader(token),
    );
  },
  toggleLike: async (projectId) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Authentication required to like project");
    return api.post(`/projects/${projectId}/like`, {}, setAuthHeader(token));
  },
  searchProjects: async (query) => api.get(`/projects/search?q=${query}`),
  deleteProject: async (projectId) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Authentication required to delete project");
    return api.delete(`/projects/${projectId}`, setAuthHeader(token));
  },
};

export const userApi = {
  searchUsers: async (query) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Authentication required to search users");
    return api.get(`/users/search?q=${query}`, setAuthHeader(token));
  },
  getProfile: async (userId) => {
    const token = localStorage.getItem("token");
    return api.get(`/users/${userId}`, token ? setAuthHeader(token) : {});
  },
  updateProfile: async (profileData) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Authentication required to update profile");
    return api.patch("/users/me", profileData, setAuthHeader(token));
  },
};

export default api;
