import axiosClient from "../axiosClient";

export const customersAPI = {
    getAll: (params) => {
        const url = '/customer';
        return axiosClient.get(url, { params });
    },
}