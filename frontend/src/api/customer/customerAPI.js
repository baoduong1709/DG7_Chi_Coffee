import axiosClient from "../axiosClient";

export const customerAPI = {
    get: (id) => {
        const url = `/customer/${id}`;
        return axiosClient.get(url);
    },
}