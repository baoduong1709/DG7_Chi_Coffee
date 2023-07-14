import Home from '~/pages/customer/home';

//Public dùng cho route không cần đăng nhập vẫn xem được
const publicRoutes = [{ path: '/', component: Home }];
// Private dùng cho route đăng nhập mới xem được, nếu không đăng nhập được thì sẽ chuyển qua trang login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
