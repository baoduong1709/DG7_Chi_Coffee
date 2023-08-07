import axiosClient from '~/api/axiosClient';

const Card = {
    getAll: (params) => {
        const url = '/dashboard/statistical';
        return axiosClient.get(url, { params });
    },
};
export default Card;
