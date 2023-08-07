import axiosClient from "../axiosClient";

export const ordersAPI = {
    getAll: (status) => {
        const url = status === null? `/order`:`order?status=${status}`;
        return axiosClient.get(url);
    },
}