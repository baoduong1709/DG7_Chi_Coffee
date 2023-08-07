import axiosClient from "../axiosClient";

export const productAPI = {
    get: (id) => {
        const url = `/product/${id}`;
        return axiosClient.get(url);
    },
    create: (value) => {
        const url = `/product/create`;
        return axiosClient.post(url, value, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    },
    update: (value, id) => {
        const url = `/product/${id}/update`;
        return axiosClient.put(url, value, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    },
    delete: (id) => {
        const url = `/product/${id}/delete`;
        return axiosClient.delete(url);
    }
}