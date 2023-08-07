import axiosClient from "../axiosClient";

export const productAPI = {
    get: (id) => {
        const url = `/product/${id}`;
        return axiosClient.get(url);
    },
    create: (value) => {
        const url = `/product/create`;
        return axiosClient.post(url, value);
    },
    update: (value, id) => {
        const url = `/product/${id}/update`;
        return axiosClient.put(url, value);
    },
    delete: (id) => {
        const url = `/product/${id}/delete`;
        return axiosClient.delete(url);
    }
}