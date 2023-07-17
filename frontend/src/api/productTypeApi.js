import axiosClient from '~/api/axiosClient';

const productTypeApi = {
    getAll: (params) => {
        const url = '/productType';
        return axiosClient.get(url, { params });
    },
};
export default productTypeApi;
