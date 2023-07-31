import axiosClient from "../axiosClient";

export const employeesAPI = {
    getAll: (params) => {
        const url = '/employee';
        return axiosClient.get(url, { params });
    },
    get: (id) => {
        const url = `/employee/${id}`;
        return axiosClient.get(url);
    },
}

