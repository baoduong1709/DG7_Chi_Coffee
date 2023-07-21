import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#34618E',
            hover: '#365C82',
        },
        secondary: {
            main: '#40A5F2',
            hover: '#3C9DE7',
        },
        warning: {
            main: '#F4DF58',
            hover: '#EBD650',
        },
        error: {
            main: '#F4616B',
            hover: '#EC5963',
        },
        success: {
            main: '#00692B',
            hover: '#05613B',
        },
        light: {
            main: '#FFFFFF',
            hover: '#F2F2F2',
        },
    },
});