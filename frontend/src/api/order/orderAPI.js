import axiosClient from "../axiosClient";

export const orderAPI = {
    update: (id) => {
        const url = `/order/${id}/update`;
        return axiosClient.put(url);
    },
}