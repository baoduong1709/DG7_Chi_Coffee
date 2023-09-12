import Home from '~/pages/customer/home';
import {
    AdminLogin,
    AdminDashBoard,
    EmployeeManaging,
    Bill,
    Logout,
    EmployeeOrder,
    ProductManaging,
    Customer,
} from '~/pages/admin';
import Product from '~/pages/customer/product';
import Details from '~/pages/customer/product/detailsProduct';
import Login from '~/pages/customer/login';
import Register from '~/pages/customer/register';
import Cart from '~/pages/customer/cart';
import NotFound from '~/pages/notFound/NotFound';
import Information from '~/pages/customer/information';
import OrderHistory from '~/pages/customer/orderHistory';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/product/:id', component: Product },
    { path: '/product/details/:id', component: Details },
    { path: '/cart', component: Cart },
    { path: '/admin/login', component: AdminLogin, layout: null },
    { path: '*', component: NotFound, layout: null },
    { path: '/customer/information', component: Information },
    { path: '/orderHistory', component: OrderHistory },
];

const privateRoutes = [
    { path: 'admin/dashboard', component: AdminDashBoard, admin: true },
    { path: 'admin/employee', component: EmployeeManaging, admin: true },
    { path: 'admin/bill', component: Bill, admin: false },
    { path: '/logout', component: Logout, admin: false },
    { path: 'admin/order', component: EmployeeOrder, admin: false },
    { path: 'admin/product', component: ProductManaging, admin: true },
    { path: 'admin/customer', component: Customer, admin: true },
];

export { publicRoutes, privateRoutes };
