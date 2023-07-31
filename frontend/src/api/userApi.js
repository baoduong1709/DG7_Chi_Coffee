import axiosClient from '~/api/axiosClient';

const userApi = {
    get: (params) => {
        const url = '/customer/details';
        return axiosClient.get(url, { params });
    },
    update: (data) => {
        const url = '/customer/details/update';
        return axiosClient.patch(url, data);
    },
};

export default userApi;
