import axiosClient from '~/api/axiosClient';

const CardChart = {
    getAll: (params) => {
        const url = '/dashboard/revenue';
        return axiosClient.get(url, { params });
    },
};
export default CardChart;
