import axiosClient from '~/api/axiosClient';

const productTypeApi = {
    getAll: (params) => {
        const url = '/product-type';
        return axiosClient.get(url, { params });
    },
};
export default productTypeApi;
