import { AdminLogin, AdminDashBoard } from "../pages/admin";

const publicRoutes = [
    {
        path: '/admin/login',
        component: AdminLogin
    },
    {
        path: 'admin/dashboard',
        component: AdminDashBoard
    }
];

const privateRoutes = [
    
];

export {publicRoutes, privateRoutes};