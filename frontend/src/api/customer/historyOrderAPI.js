import axiosClient from '~/api/axiosClient';

const HistoryOrderApi = {
    getAll: (params) => {
        const url = '/order/history';
        return axiosClient.get(url, { params });
    },
};
export default HistoryOrderApi;
