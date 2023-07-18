import Home from '~/pages/customer/home';
import Product from '~/pages/customer/product';
import Details from '~/pages/customer/product/detailsProduct';

//Public dùng cho route không cần đăng nhập vẫn xem được
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/product/:id', component: Product },
    { path: '/product/details/:id', component: Details },
];
// Private dùng cho route đăng nhập mới xem được, nếu không đăng nhập được thì sẽ chuyển qua trang login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
