import { useEffect, useState } from 'react';
import card from '~/api/dashboard/card';

function CardUnConfirmOrder() {
    const [totalBillsFalse, setTotalBillsFalse] = useState([]);
    useEffect(() => {
        const fetchTotalBillOneDay = async () => {
            try {
                const response = await card.getAll();
                setTotalBillsFalse(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTotalBillOneDay();
    }, []);

    return (
        <div className="col-xl-3 col-md-6 mb-4 hang">
            <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                Tổng hóa đơn chưa xác nhận
                            </div>
                            {totalBillsFalse.map((TotalBillsFalse, index) => (
                                <div key={index} className="h5 mb-0 font-weight-bold text-gray-800">
                                    {TotalBillsFalse.tongDonHangChuaXacNhanTrongNgay}
                                </div>
                            ))}
                        </div>
                        <div className="col-auto">
                            <i className="fas fa-file-invoice fa-2x"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardUnConfirmOrder;
