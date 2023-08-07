import { useEffect, useState } from 'react';
import card from '~/api/dashboard/card';

function CardRevenueOneDay() {
    const [totalBills, setTotalBills] = useState([]);
    useEffect(() => {
        const fetchTotalBillOneDay = async () => {
            try {
                const response = await card.getAll();
                setTotalBills(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTotalBillOneDay();
    }, []);
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    return (
        <div className="col-xl-3 col-md-6 mb-4 hang">
            <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                Tổng doanh thu trong ngày
                            </div>
                            {totalBills.map((TotalBills, index) => (
                                <div key={index} className="h5 mb-0 font-weight-bold text-gray-800">
                                    {/* {formatter.format(TotalBills.tongDoanhThuTrongNgay).replace(/₫/g, 'VNĐ')} */}
                                    {typeof TotalBills.tongDoanhThuTrongNgay === 'number' &&
                                    !Number.isNaN(TotalBills.tongDoanhThuTrongNgay)
                                        ? formatter.format(TotalBills.tongDoanhThuTrongNgay).replace(/₫/g, 'VNĐ')
                                        : ''}
                                </div>
                            ))}
                        </div>
                        <div className="col-auto">
                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardRevenueOneDay;
