import axiosClient from "../axiosClient";

export const employeeAPI = {
    get: (id) => {
        const url = `/employee/${id}`;
        return axiosClient.get(url);
    },
    create: (value) => {
        const url = `/employee/create`;
        return axiosClient.post(url, value, {
            headers: {
                "Content-Type": "application/json",
            }
        });
    },
    update: (value, id) => {
        const url = `/employee/${id}/update`;
        return axiosClient.put(url, value, {
            headers: {
                "Content-Type": "application/json",
            }
        });
    },
    delete: (id) => {
        const url = `/employee/${id}/delete`;
        return axiosClient.delete(url);
    }
}