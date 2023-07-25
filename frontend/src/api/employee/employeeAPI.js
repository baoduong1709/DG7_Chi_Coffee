import axios from 'axios';
import { API_BASE } from '../config';

// export const getEmployeeDetail = async (token, employeeId, callback) => {
//     try {
//         const url = `${API_BASE}/employee/${employeeId}`
//         const res = await axios.get(url, {
//             headers: {
//                 Authorization: token
//             }
//         })
//         if (res.status === 200) {
//             callback(res.data.employee)
//         }
//         else {
//             console.log(res.data)
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }