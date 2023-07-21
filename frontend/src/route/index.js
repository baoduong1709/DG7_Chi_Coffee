import Home from '~/pages/customer/home';
import { AdminLogin, AdminDashBoard } from '~/pages/admin';
import Product from '~/pages/customer/product';
import Details from '~/pages/customer/product/detailsProduct';
import Login from '~/pages/customer/login';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: null },
    { path: '/product/:id', component: Product },
    { path: '/product/details/:id', component: Details },
    { path: '/admin/login', component: AdminLogin, layout: null },
];

//Public dùng cho route không cần đăng nhập vẫn xem được
// Private dùng cho route đăng nhập mới xem được, nếu không đăng nhập được thì sẽ chuyển qua trang login
const privateRoutes = [{ path: 'admin/dashboard', component: AdminDashBoard }];

export { publicRoutes, privateRoutes };
