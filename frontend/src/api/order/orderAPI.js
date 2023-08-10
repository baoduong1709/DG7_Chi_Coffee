import axiosClient from "../axiosClient";

export const orderAPI = {
    update: (id) => {
        const url = `/order/${id}/update`;
        return axiosClient.put(url,{
            headers: {
                "Content-Type": "application/json",
            }
        });
    },
    create: (values) => {
        const url = `/order/employee/create`;
        return axiosClient.post(url, values);
    }
}