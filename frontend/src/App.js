import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './route';
import { Fragment } from 'react';
import { DefaultLayout, PrivateLayout, ToastOption } from './components';
import { UserContext } from './context/userContext';
import { ToastContainer, toast } from 'react-toastify';

function App() {
    const [userData, setUserData] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
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

    useEffect(() => {
        if(userData){
            setIsAdmin(userData.isAdmin);
        }
    }, [userData]);

    const ProtectedRoute = ({ user, isAdmin, allow, redirectPath = '../admin/login', children }) => {
        if (!user && !isSending) {
            return <Navigate to={redirectPath} />;
        }
        if((isAdmin == false) && (allow == true)) {
            toast.error("Không có quyền truy cập trang này", ToastOption);
            return <Navigate to={-1} />
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
                                    <ProtectedRoute user={userData} isAdmin={isAdmin} allow={route.admin}>
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
            <ToastContainer />
        </>
    );
}

export default App;
