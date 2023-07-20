import { Fragment } from 'react';
import { SideBarAdmin } from './sidebar_admin';
import { Grid } from '@mui/material';

import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

function PrivateLayout({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <Fragment>
                <Grid container spacing={0.5}>
                    <Grid item>
                        <SideBarAdmin />
                    </Grid>
                    <Grid item>
                        {children}
                    </Grid>
                </Grid>
            </Fragment>
        </ThemeProvider>
    );
}

export default PrivateLayout;