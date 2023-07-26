import Home from '~/pages/customer/home';
import { AdminLogin, AdminDashBoard, EmployeeManaging, Bill, Logout, EmployeeOrder, ProductManaging, Setting } from '~/pages/admin';
import Product from '~/pages/customer/product';
import Details from '~/pages/customer/product/detailsProduct';
import Login from '~/pages/customer/login';
import Register from '~/pages/customer/register';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/product/:id', component: Product },
    { path: '/product/details/:id', component: Details },
    { path: '/admin/login', component: AdminLogin, layout: null },
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
