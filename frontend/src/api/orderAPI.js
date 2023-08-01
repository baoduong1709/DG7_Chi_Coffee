import axiosClient from '~/api/axiosClient';

const OrderApi = {
    getAll: (params) => {
        const url = '/order/history';
        return axiosClient.get(url, { params });
    },
};
export default OrderApi;
