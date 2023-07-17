import axiosClient from '~/api/axiosClient';

const productApi = {
    getAll: (params) => {
        const url = '/productType';
        return axiosClient.get(url, { params });
    },
};
export default productApi;
