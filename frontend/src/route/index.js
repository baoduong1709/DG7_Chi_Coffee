import Home from '~/pages/customer/home';
import { AdminLogin, AdminDashBoard, EmployeeManaging, Bill, Logout, EmployeeOrder, ProductManaging, Setting } from "../pages/admin";

const publicRoutes = [
    {path: '/',component: Home},
    {path: '/admin/login',component: AdminLogin,layout: null},
];

const privateRoutes = [
    {path: 'admin/dashboard',component: AdminDashBoard},
    {path: 'admin/employee',component: EmployeeManaging},
    {path: 'admin/bill',component: Bill},
    {path: '/logout',component: Logout},
    {path: 'admin/order',component: EmployeeOrder},
    {path: 'admin/product',component: ProductManaging},
    {path: 'admin/setting',component: Setting}
];

export { publicRoutes, privateRoutes };
