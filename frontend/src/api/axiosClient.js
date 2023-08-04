import axios from 'axios';
import { API_BASE } from './config';

const axiosClient = axios.create({
    baseURL: API_BASE,
    headers: {
        'content-type': 'application/json',
    },
});
axiosClient.interceptors.request.use(async (config) => {
    //Handle token here ...
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `${JSON.parse(token)['token']}`;
    }
    const token_admin = localStorage.getItem('user-admin');
    if (token_admin) {
        config.headers['Token-Admin'] = `${JSON.parse(token_admin)['token']}`;
        config.headers['Access-Control-Allow-Origin'] = '* ';
        config.headers['Content-Type'] = 'multipart/form-data';
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
