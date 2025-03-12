import axios, { InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

// Hardcoded API base URL and version
const API_BASE_URL = 'https://frecord.dev.chickbrain.com/api';
const API_VERSION = 'v1';

const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}/${API_VERSION}`,
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get('access_token');
        const refreshToken = Cookies.get('refresh_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers["Access-Control-Allow-Origin"] = "*";
            if (refreshToken) {
                config.headers["x-refresh-token"] = refreshToken;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized request - please log in again.');
            // Optionally implement redirection to a login page here
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
