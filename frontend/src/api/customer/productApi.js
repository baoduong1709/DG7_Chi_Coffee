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
    getIdAll: (name, params) => {
        const url = `/product-type/${name}`;
        return axiosClient.get(url, { params });
    },
    get: (id) => {
        const url = `/product/${id}`;
        return axiosClient.get(url);
    },
};

export default productApi;
