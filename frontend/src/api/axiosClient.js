import axios from 'axios';
import { API_BASE } from './config';

const axiosClient = axios.create({
    baseURL: API_BASE,
    headers: {
        'content-type': 'application/json',
    },
});
axiosClient.interceptors.request.use(async function (config){
        const token_admin = JSON.parse(localStorage.getItem("user"))["token"];
        // if(token) {
        //     config.headers["Authorization"] = `${token}`;
        //     config.headers["Access-Control-Allow-Origin"] = "* ";
        // }
        if(token_admin) {
            config.headers["Token-Admin"] = `${token_admin}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
);
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
