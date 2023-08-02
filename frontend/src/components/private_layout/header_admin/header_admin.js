import React from 'react';
import { Grid, IconButton, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { ThemeProvider, styled } from '@mui/material/styles';

import { theme } from '../theme';
import { useNavigate } from 'react-router-dom';

const themes = {
    header: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.light.main,
    },
    button: {
        icon: theme.palette.light.main,
        text: theme.palette.light.main,
        hover: {
            backgroundColor: theme.palette.primary.hover,
            color: theme.palette.light.hover,
        },
    },
    text: theme.palette.light.main,
};

const header_item_styles = {
    root: {
        fontSize: '18px',
        fontWeight: 500,
        color: themes.text,
    },
    icon: {
        color: themes.button.icon,
    },
};
const StyledDialog = styled(Dialog)(() => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogContentText-root': {
        fontSize: 18,
        marginY: 5,
    },
    '& .MuiTextField': {
        fontSize: 14,
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
        fontSize: 14,
    },
    '& .MuiDialogActions-button': {
        padding: theme.spacing(1),
        marginX: 2,
        fontSize: 14,
    },
}));

function FormLogoutDialog({ isDialogOpened, handleCloseDialog, item }) {
    return (
        <React.Fragment>
            <StyledDialog open={isDialogOpened} onClose={handleCloseDialog} maxWidth={'xs'} fullWidth={true}>
                <DialogContent sx={{ marginY: '20px' }}>
                    <DialogContentText textAlign="center">Đăng xuất khỏi hệ thống?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Quay lại
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            localStorage.removeItem('user-admin');
                            window.location.assign('../admin/login');
                        }}
                        color="error"
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </StyledDialog>
        </React.Fragment>
    );
}

export default function HeaderAdmin({ userData }) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    function handleLogout() {}

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ height: '100%', backgroundColor: themes.header.backgroundColor, paddingX: 2 }}
        >
            <Typography fontStyle={header_item_styles.root} marginX={3}>
                Xin chào, {userData.name}
            </Typography>
            <IconButton onClick={() => setOpen(true)} sx={{ display: 'flex', flexDirection: 'row' }}>
                <FontAwesomeIcon icon={faRightFromBracket} style={header_item_styles.icon} />
            </IconButton>
            <FormLogoutDialog isDialogOpened={open} handleCloseDialog={() => setOpen(false)} />
        </Grid>
    );
}
