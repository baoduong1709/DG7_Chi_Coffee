import { Fragment, useState, useEffect } from 'react';
import { SideBarAdmin } from './sidebar_admin';
import { HeaderAdmin } from './header_admin';
import { Grid } from '@mui/material';

import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { OrderProvider } from '~/context/ordersContext';

function PrivateLayout({ children }) {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        setUserData(() => JSON.parse(localStorage.getItem('user-admin')));
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <OrderProvider>
            <Fragment>
                <Grid container height="8vh">
                    <HeaderAdmin userData={userData} />
                </Grid>
                <Grid container spacing={0.5} height="92vh">
                    <Grid item>
                        <SideBarAdmin userData={userData} />
                    </Grid>
                    <Grid item width="100%" display="flex" flexDirection="column" flex="1">
                        {children}
                    </Grid>
                </Grid>
            </Fragment>
            </OrderProvider>
        </ThemeProvider>
    );
}

export default PrivateLayout;
