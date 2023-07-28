import { createTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import Button, { ButtonClasses, buttonClasses } from "@mui/material/Button";
import TablePagination, { tablePaginationClasses as classes } from '@mui/material/TablePagination';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#34618E',
            hover: '#365C82',
            lighter: '#F1F9FE'
        },
        secondary: {
            main: '#40A5F2',
            hover: '#3C9DE7',
            lighter: '#F1F9FE'
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

export const StyledDialog = styled(Dialog) (() => ({
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

export const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.light.main,
    fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [`&.${tableRowClasses.root}`]: {
    maxHeight: "50px"
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.secondary.lighter,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
    height: 20,
  }
}));

export const CustomTablePagination = styled(TablePagination)(
    ({ theme }) => 
    `
    & .${classes.spacer} {
      display: none;
    }
    & .${classes.toolbar}  {
      display: flex;
      font-size: 14px;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      background-color: theme.palette.light.main;
  
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
  
    & .${classes.selectLabel} {
      margin: 0;
      font-size: 14px;
    }
  
    & .${classes.select}{
        font-size: 14px;
      padding: 2px 6px;
      border: 1px solid;
      border-radius: 50px;
      background-color: transparent;
      color: theme.palette.primary.main;
  
      &:hover {
        background-color: theme.palette.main.hover;
      }
  
      &:focus {
        outline: 1px solid theme.palette.secondary.hover;
      }
    }
  
    & .${classes.displayedRows} {
      margin: 0;
      font-size: 14px;
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
  
    & .${classes.actions} {
      padding: 2px;
      border: 1px solid;
      border-radius: 50px;
      text-align: center;
    }
  
    & .${classes.actions} > button {
      margin: 0 8px;
      border: transparent;
      border-radius: 4px;
      background-color: transparent;
      color: theme.palette.primary.main;
  
      &:hover {
        background-color: theme.palette.light.hover;
      }
  
      &:focus {
        outline: 1px solid theme.palette.light.main;
      }
    }
    `,
  );

export const StyledButton = styled(Button) ((theme) => ({
  [`&.${buttonClasses.root}`]: {
    fontSize: 14,
    paddingX: 2,
    paddingY: 1,
    marginX: 1,
    marginY: 1,
  }
}));