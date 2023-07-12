import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoutes, privateRoutes } from './route';
import { Fragment } from 'react';
import DefaultLayout from './components/defaultLayout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
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
        </Routes>
      </BrowserRouter>
      <h1>Chi Coffee!</h1>
    </>
  );
}

export default App;
