import axios from 'axios';
import { API_BASE } from './config';

const axiosClient = axios.create({
    baseURL: API_BASE,
    headers: {
        'content-type': 'application/json',
    },
});
axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `${JSON.parse(token)['token']}`;
        config.headers['Access-Control-Allow-Origin'] = '* ';
    }
    return config;
});
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        return Promise.reject(error.response || error.message);
    },
);
export default axiosClient;
