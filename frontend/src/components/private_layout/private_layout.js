import { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SideBarAdmin } from './sidebar_admin';
import { HeaderAdmin } from './header_admin';
import { Grid } from '@mui/material';

import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

function PrivateLayout({ children }) {
    const [userData, setUserData] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        setUserData(() => JSON.parse(localStorage.getItem("user")))
    },[])

    return (
        <ThemeProvider theme={theme}>
            <Fragment>
                <Grid container>
                    <HeaderAdmin userData={userData} />
                </Grid>
                <Grid container spacing={0.5}>
                    <Grid item>
                        <SideBarAdmin userData={userData}/>
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