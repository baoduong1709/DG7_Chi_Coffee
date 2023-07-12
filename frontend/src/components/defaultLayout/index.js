import { Fragment } from 'react';


function DefaultLayout({ children }) {
    return (
        <Fragment>
            <h3>Header</h3>
            <div>
                <div>{children}</div>
            </div>
        </Fragment>
    );
}

export default DefaultLayout;