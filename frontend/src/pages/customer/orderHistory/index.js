import OrderApi from '~/api/orderAPI';
import { useState, useEffect } from 'react';
import ModalHistory from './modalHistory';
import Swal from 'sweetalert2';

import '~/assets/css/orderHistory.css';
import '~/assets/css/loading.css';

function OrderHistory() {
    const [orderHistory, setOrderHistory] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            setLoading(true);
            try {
                const response = await OrderApi.getAll();
                setOrderHistory(response);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Khách hàng chưa có đơn đặt hàng',
                    timer: 3000,
                });
            }
        };
        fetchOrderHistory();
    }, []);
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const [loadingApi, setLoading] = useState(false);

    return (
        <section className="py-5 my-5">
            <h1 className="mb-5 text-uppercase text-danger text-center fw-bold">lịch sử đặt hàng</h1>
            {loadingApi && (
                <div className="follow-the-leader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Số lượng</th>
                        <th>Số tiền</th>
                        <th>Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    {orderHistory.map((history) => (
                        <tr key={history._id}>
                            <td>
                                <a
                                    href="#modalHistory"
                                    data-toggle="modal"
                                    data-target="#modalHistory"
                                    onClick={() => setSelectedOrder(history)}
                                >
                                    {history._id}
                                </a>
                            </td>
                            <td>{history.amount}</td>
                            <td>{formatter.format(history.cost).replace(/₫/g, 'VNĐ')}</td>
                            <td>{history.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalHistory data={orderHistory} selectedOrder={selectedOrder} />
        </section>
    );
}

export default OrderHistory;
