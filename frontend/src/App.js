import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/route';
import { Fragment } from 'react';
import DefaultLayout from '~/components/defaultLayout';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes?.map((route, index) => {
                        const Layout = route.layout === null ? Fragment : DefaultLayout;
                        //router.layuot là undefined bởi vì routes/index.js không cấu hình layuot gì ở đây cả, mặc định nó sẽ lấy DefaultLayout.
                        // nếu mà layout bằng null dùng Fragment ngược lại thì lấy DefaultLayout.
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        {/* {Page trở thành children của Layuot} */}
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
