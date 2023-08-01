import { Fragment } from 'react';
import Header from '~/components/defaultLayout/header';
import '~/assets/css/defaultLayout.css';
import Footer from '~/components/defaultLayout/footer';
function DefaultLayout({ children }) {
    return (
        <Fragment>
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default DefaultLayout;
