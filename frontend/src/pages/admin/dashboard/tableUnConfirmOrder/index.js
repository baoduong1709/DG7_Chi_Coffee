import cardChart from '~/api/dashboard/cardChart';
import { useState, useEffect } from 'react';
import ModalHistory from './modalHistory';
import dayjs from 'dayjs';

function TableUnConfirmOrder() {
    const today = dayjs();
    const [orderHistory, setOrderHistory] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const startDate = today;
                const endDate = today;
                const params = {
                    startDate: startDate.format('YYYY-MM-DDT00:00:00'), // Định dạng ngày bắt đầu thành chuỗi 'YYYY-MM-DD'
                    endDate: endDate.format('YYYY-MM-DDT23:59:59'), // Định dạng ngày kết thúc thành chuỗi 'YYYY-MM-DD'
                    status: false,
                };
                const response = await cardChart.getAll(params);
                setOrderHistory(response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchOrderHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return (
        <section className=" my-5">
            <h3 className="mb-5 text-uppercase text-danger text-center fw-bold">Hóa đơn chưa xác nhận</h3>
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Mã đơn hàng</th>
                        <th>Số lượng</th>
                        <th>Số tiền</th>
                        <th>Thời gian</th>
                        <th>Người đặt</th>
                    </tr>
                </thead>
                <tbody>
                    {orderHistory.map((history) =>
                        history.data.map((data) => (
                            <tr key={data._id}>
                                <td>
                                    {' '}
                                    <a
                                        href="#modalHistory"
                                        data-toggle="modal"
                                        data-target="#modalHistory"
                                        onClick={() => setSelectedOrder(history)}
                                    >
                                        {data._id}
                                    </a>
                                </td>
                                <td>{data.amount}</td>
                                <td>{formatter.format(history.cost).replace(/₫/g, 'VNĐ')}</td>
                                <td>{dayjs(history.createdAt).format('DD/MM/YYYY  hh:mm:ss')}</td>
                                <td>{data.customer_name}</td>
                            </tr>
                        )),
                    )}
                </tbody>
            </table>
            <ModalHistory data={orderHistory} selectedOrder={selectedOrder} />
        </section>
    );
}

export default TableUnConfirmOrder;
