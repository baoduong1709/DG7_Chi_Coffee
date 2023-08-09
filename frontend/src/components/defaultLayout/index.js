import { Fragment } from 'react';
import Header from '~/components/defaultLayout/header';
import Footer from '~/components/defaultLayout/footer';

import '~/assets/css/defaultLayout.css';

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
