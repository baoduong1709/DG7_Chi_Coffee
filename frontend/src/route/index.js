import Home from '~/pages/customer/home';
import { AdminLogin, AdminDashBoard, EmployeeManaging } from "../pages/admin";

const publicRoutes = [
    {   
        path: '/',
        component: Home
    },
    {
        path: '/admin/login',
        component: AdminLogin,
        layout: null
    },
];

const privateRoutes = [
    {
        path: 'admin/dashboard',
        component: AdminDashBoard
    },
    {
        path: 'admin/employee',
        component: EmployeeManaging
    }
];

export { publicRoutes, privateRoutes };
