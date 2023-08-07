import CardChart from './cardChart';
import CardCustomer from './cardCustomer';
import CardRevenueOneDay from './cardRevenueOneDay';
import CardTotalBillOneDay from './cardTotalBillOneDay';
import CardUnConfirmOrder from './cardUnConfirmOrder';
import TableUnConfirmOrder from './tableUnConfirmOrder';

import '~/assets/css/dashboardAdmin.css';

export default function AdminDashBoard() {
    return (
        <section className="py-5 my-5">
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 text-danger text-uppercase fs-1">Tổng quan</h1>
                </div>
            </div>
            <div className="column">
                <div className="column-1">
                    <CardCustomer />
                    <CardRevenueOneDay />
                    <CardTotalBillOneDay />
                    <CardUnConfirmOrder />
                </div>
                <div className="column-2">
                    <CardChart />
                </div>
            </div>
            <div className="column">
                <TableUnConfirmOrder />
            </div>
        </section>
    );
}
