import axiosClient from '~/api/axiosClient';

const productApi = {
    getAll: (params) => {
        const url = '/product';
        return axiosClient.getAll(url, { params });
    },
    getIdAll: (name) => {
        const url = `/product-type/${name}`;
        return axiosClient.get(url);
    },
    get: (id) => {
        const url = `/product/${id}`;
        return axiosClient.get(url);
    },
};

export default productApi;
