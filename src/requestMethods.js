import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Safely grab the latest JWT from persisted Redux
const getToken = () => {
  try {
    const persistRoot = JSON.parse(localStorage.getItem("persist:root"));
    if (!persistRoot?.user) return null;
    const { currentUser } = JSON.parse(persistRoot.user);
    return currentUser?.accessToken || null;
  } catch {
    return null;
  }
};

// Public (no auth) client
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// Authenticated client
export const userRequest = axios.create({
  baseURL: BASE_URL,
});

// Interceptor to inject the Bearer token under the Authorization header
userRequest.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      // Note: capital “A” in Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
