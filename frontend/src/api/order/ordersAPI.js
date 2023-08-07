import axiosClient from "../axiosClient";

export const ordersAPI = {
    getAll: (status) => {
        const url = status === null? `/order`:`order?status=${status}`;
        console.log("url", url);
        return axiosClient.get(url);
    },
}