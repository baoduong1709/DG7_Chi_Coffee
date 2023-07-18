import { Fragment } from 'react';
import { SideBarAdmin } from './sidebar_admin';

function PrivateLayout({ children }) {
    return (
        <Fragment>
            <SideBarAdmin />
            <div>
                <div>{children}</div>
            </div>
        </Fragment>
    );
}

export default PrivateLayout;