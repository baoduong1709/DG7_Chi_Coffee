import axiosClient from '~/api/axiosClient';

const OrderApi = {
    getAll: (params) => {
        const url = '/order';
        return axiosClient.get(url, { params });
    },
    Update: (data) => {
        const url = '/order';
        return axiosClient.patch(url, data);
    },
};

export default OrderApi;
