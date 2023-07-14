import { AdminLogin, AdminDashBoard } from "../pages/admin";

const publicRoutes = [
    {
        path: '/admin/login',
        component: AdminLogin
    },
];

const privateRoutes = [
    {
        path: 'admin/dashboard',
        component: AdminDashBoard
    }
];

export {publicRoutes, privateRoutes};