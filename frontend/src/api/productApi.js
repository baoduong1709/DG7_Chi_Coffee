import axiosClient from '~/api/axiosClient';

const productApi = {
    getAll: (params) => {
        const url = '/product';
        return axiosClient.get(url, { params });
    },
    getTypeAll: () => {
        const url = '/product-type';
        return axiosClient.get(url);
    },
    getIdAll: (id) => {
        const url = `/product-type/${id}`;
        return axiosClient.get(url);
    },
    get: (id) => {
        const url = `/product/${id}`;
        return axiosClient.get(url);
    },
};

export default productApi;
