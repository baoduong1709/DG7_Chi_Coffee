import { Fragment } from 'react';

function DefaultLayout({ children }) {
    return (
        <Fragment>
            <div>
                <div>{children}</div>
            </div>
        </Fragment>
    );
}

export default DefaultLayout;