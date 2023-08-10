import axiosClient from "../axiosClient";

export const tablesAPI = {
    getAll: (params) => {
        const url = '/table';
        return axiosClient.get(url, { params });
    },
}

