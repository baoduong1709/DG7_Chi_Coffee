import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './route';
import { Fragment } from 'react';
import { DefaultLayout, PrivateLayout } from './components';
import { UserContext } from './context/userContext';

function App() {
    const [userData, setUserData] = useState('');
    const [isSending, setIsSending] = useState(true);
    useEffect(() => {
        if (isSending) {
            setUserData(() => JSON.parse(localStorage.getItem('user-admin')));
        }
        setIsSending(false);
    }, []);
    const { loginContext } = useContext(UserContext);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            loginContext(JSON.parse(localStorage.getItem('token')));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const ProtectedRoute = ({ user, redirectPath = '../admin/login', children }) => {
        if (!user && !isSending) {
            return <Navigate to={redirectPath} />;
        }
        return children ? children : <Outlet />;
    };
    return (
        <>
            <BrowserRouter>
                <Routes>
                    (!userData)?
                    {publicRoutes?.map((route, index) => {
                        const Layout = route.layout === null ? Fragment : DefaultLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    :
                    {privateRoutes?.map((route, index) => {
                        const Layout = route.layout === null ? Fragment : PrivateLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <ProtectedRoute user={userData}>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </ProtectedRoute>
                                }
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
