import axios from 'axios';
import { API_BASE } from './config';

const axiosClient = axios.create({
    baseURL: API_BASE,
    headers: {
        'content-type': 'application/json',
    },
});
<<<<<<< HEAD
axiosClient.interceptors.request.use(async function (config){
        const token = JSON.parse(localStorage.getItem("user"))["token"];
        if(token) {
            config.headers["Authorization"] = `${token}`;
            config.headers["Access-Control-Allow-Origin"] = "* ";
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
);
=======
axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `${JSON.parse(token)['token']}`;
    }
    return config;
});
>>>>>>> 55a148fcb9580362549b36f389e060d34614fe89
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
