import axiosClient from "../axiosClient";

export const employeeAPI = {
    get: (id) => {
        const url = `/employee/${id}`;
        return axiosClient.get(url);
    },
    create: (value) => {
        const url = `/employee/create`;
        return axiosClient.post(url, value);
    },
    update: (value, id) => {
        const url = `/employee/${id}/update`;
        return axiosClient.put(url, value);
    },
    delete: (id) => {
        const url = `/employee/${id}/delete`;
        return axiosClient.delete(url);
    }
}