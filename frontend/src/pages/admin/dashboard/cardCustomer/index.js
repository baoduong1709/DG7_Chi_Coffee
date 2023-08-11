import { useEffect, useState } from 'react';
import card from '~/api/dashboard/card';

function CardCustomer() {
    const [datebase, setDatabase] = useState([]);
    useEffect(() => {
        const fetchTotalBillOneDay = async () => {
            try {
                const response = await card.getAll();
                setDatabase(response);
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
                                Tổng số khách hàng
                            </div>
                            {datebase.map((user, index) => (
                                <div key={index} className="h5 mb-0 font-weight-bold text-gray-800">
                                    {user.soKhachHang}
                                </div>
                            ))}
                        </div>
                        <div className="col-auto">
                            <i className="fas fa-user fa-2x"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardCustomer;
