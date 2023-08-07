import axiosClient from "../axiosClient";

export const productsAPI = {
    getAll: (params) => {
        const url = '/product';
        return axiosClient.get(url, { params });
    },
    get: (id) => {
        const url = `/product/${id}`;
        return axiosClient.get(url);
    },
    getAllByType: (name) => {
        const url = `/product-type/${name}`;
        return axiosClient.get(url);
    },
}

export const productTypesAPI = {
    getAll: () => {
        const url = '/product-type';
        return axiosClient.get(url);
    },
}

