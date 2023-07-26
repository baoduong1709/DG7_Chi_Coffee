import axios from 'axios';
import { API_BASE } from '../config';

export const getEmployeeList = async (value, callback) => {
    try {
        const url = `${API_BASE}/employee`
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