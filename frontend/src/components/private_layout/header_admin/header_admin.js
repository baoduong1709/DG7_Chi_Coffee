import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { theme } from "../theme";

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

export default function HeaderAdmin({ userData }) {
    function handleLogout(){
        return;
    }
    return(
        <Grid 
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ height: "8vh",
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
        </Grid>
    );
}