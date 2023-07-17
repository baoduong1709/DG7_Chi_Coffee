import Home from '~/pages/customer/home';
import Coffee from '~/pages/customer/product/coffee';
// import Cake from '~/pages/customer/product/cake';

//Public dùng cho route không cần đăng nhập vẫn xem được
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/product/:id', component: Coffee },
    // { path: '/product/:id', component: Cake },
];
// Private dùng cho route đăng nhập mới xem được, nếu không đăng nhập được thì sẽ chuyển qua trang login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
