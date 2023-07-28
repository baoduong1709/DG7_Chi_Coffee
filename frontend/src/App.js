import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './route';
import { Fragment } from 'react';
import { DefaultLayout, PrivateLayout } from './components';
import { UserContext } from './context/userContext';

function App() {
    const [userData, setUserData] = useState('');
    useEffect(() => {
        setUserData(() => JSON.parse(localStorage.getItem('user')));
    }, [userData]);
    const { loginContext } = useContext(UserContext);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            loginContext(JSON.parse(localStorage.getItem('token')));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
                                    <Layout>
                                        <Page />
                                    </Layout>
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
