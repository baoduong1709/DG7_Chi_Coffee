import OrderApi from '~/api/orderAPI';
import { useState, useEffect } from 'react';

import '~/assets/css/orderHistory.css';

function OrderHistory() {
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await OrderApi.getAll();
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchOrderHistory();
    }, []);
    return (
        <section className="py-5 my-5">
            <h1 className="mb-5 text-uppercase text-danger text-center fw-bold">lịch sử đặt hàng</h1>
            <table className="table-container">
                <thead>
                    <tr>
                        <th>CODE</th>
                        <th>STOCK</th>
                        <th>CAP</th>
                        <th>INCH</th>
                        <th>BOX TYPE</th>
                    </tr>
                </thead>
                <thead></thead>
                <tbody>
                    <tr>
                        <td>CES-9000</td>
                        <td>50mt</td>
                        <td>9mm</td>
                        <td>1/2"</td>
                        <td>Kangal / Coil</td>
                    </tr>
                    <tr>
                        <td>CES-9000</td>
                        <td>50mt</td>
                        <td>9mm</td>
                        <td>1/2"</td>
                        <td>Kangal / Coil</td>
                    </tr>
                    <tr>
                        <td>CES-9000</td>
                        <td>50mt</td>
                        <td>9mm</td>
                        <td>1/2"</td>
                        <td>Kangal / Coil</td>
                    </tr>
                    <tr>
                        <td>CES-9000</td>
                        <td>50mt</td>
                        <td>9mm</td>
                        <td>1/2"</td>
                        <td>Kangal / Coil</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}

export default OrderHistory;
