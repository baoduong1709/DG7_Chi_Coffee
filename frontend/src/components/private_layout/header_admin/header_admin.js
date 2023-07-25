import React from "react";
import { Grid, IconButton, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

import { theme } from "../theme";
import { useNavigate } from "react-router-dom";

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
}

const header_item_styles = {
    root: {
        fontSize: '18px',
        fontWeight: 500,
        color: themes.text,
    },
    icon: {
        color: themes.button.icon,
    },
}

function FormDeleteDialog({ isDialogOpened, handleCloseDialog }) {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <Dialog open={isDialogOpened} onClose={handleCloseDialog}>
                <DialogContent>
                    <Typography variant='h6'>Đăng xuất khỏi hệ thống?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                    variant="contained"
                    onClick={handleCloseDialog}
                    color="secondary"
                    >
                    No
                    </Button>
                    <Button
                    variant="contained"
                    onClick={() => {
                        localStorage.removeItem("user");
                        navigate("../admin/login");
                    }}
                    color="default"
                    >
                    Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default function HeaderAdmin({ userData }) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    function handleLogout(){
        localStorage.removeItem("user");
        navigate("../admin/login");
    }

    return(
        <Grid 
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ height: "100%",
                backgroundColor: themes.header.backgroundColor,
                paddingX: 2}}
        >
            <Typography 
                fontStyle={header_item_styles.root}
                marginX={3}
            >Xin chào, {userData.name}</Typography>
            <IconButton
                onClick={handleLogout} 
                sx={{ display: 'flex', flexDirection: 'row'}}
            >
                <FontAwesomeIcon icon={faRightFromBracket} style={header_item_styles.icon}/>
            </IconButton>
            <FormDeleteDialog
            isDialogOpened={open.state}
            handleCloseDialog={() => setOpen(false)}/>
        </Grid>
    );
}