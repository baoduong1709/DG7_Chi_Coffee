import axios from 'axios';
import { API_BASE } from '../config';

export const getProductList = async (value, callback) => {
    try {
        const url = `${API_BASE}/product`
        const res = await axios.get(url, {})
        if (res.status === 200) {
            callback(res.data)
        }
        else {
            console.log(res.data.message)
        }
    } catch (err) {
        console.log(err);
    }
}  
export const getProductTypeList = async (value, callback) => {
    try {
        const url = `${API_BASE}/product-type`
        const res = await axios.get(url, {})
        if (res.status === 200) {
            callback(res.data)
        }
        else {
            console.log(res.data.message)
        }
    } catch (err) {
        console.log(err);
    }
}  
export const getProductListByType = async (value, callback) => {
    try {
        const url = `${API_BASE}/product`
        const res = await axios.get(url, {})
        if (res.status === 200) {
            callback(res.data)
        }
        else {
            console.log(res.data.message)
        }
    } catch (err) {
        console.log(err);
    }
}   