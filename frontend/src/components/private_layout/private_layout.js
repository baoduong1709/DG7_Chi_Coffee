import { Fragment, useState, useEffect } from 'react';
import { SideBarAdmin } from './sidebar_admin';
import { HeaderAdmin } from './header_admin';
import { Grid } from '@mui/material';

import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

function PrivateLayout({ children }) {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        setUserData(() => JSON.parse(localStorage.getItem('user-admin')));
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Fragment>
                <Grid container height="8vh">
                    <HeaderAdmin userData={userData} />
                </Grid>
                <Grid container spacing={0.5} height="92vh">
                    <Grid item sx={2}>
                        <SideBarAdmin userData={userData} />
                    </Grid>
                    <Grid item width="100%" display="flex" flexDirection="column" flex="1">
                        {children}
                    </Grid>
                </Grid>
            </Fragment>
        </ThemeProvider>
    );
}

export default PrivateLayout;
