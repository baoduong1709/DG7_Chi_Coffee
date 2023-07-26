import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination, { tablePaginationClasses as classes } from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Container, IconButton, Typography, Button, Grid } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faMagnifyingGlass, faPenToSquare, faRightFromBracket, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { ThemeProvider, styled } from '@mui/material/styles';
import { theme } from '~/components/private_layout/theme';

import { getProductList, getProductTypeList } from '~/api/product/productsAPI';


const StyledDialog = styled(Dialog) (() => ({
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

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.light.main,
    fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.light.main,
    },
}));

function FormDialog({ isDialogOpened, item, handleCloseDialog }) {
    return (
        <React.Fragment>
            <Dialog open={isDialogOpened} onClose={handleCloseDialog}>
                <DialogTitle>Xem thông tin</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Họ và tên"
                        variant="outlined"
                        type="text"
                        defaultValue={item.name}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="gender"
                        label="Giới tính"
                        variant="outlined"
                        type="text"
                        defaultValue={item.gender === "male"?"Nam":"Nữ"}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="dateOfBirth"
                        label="Ngày tháng năm sinh"
                        variant="outlined"
                        type="text"
                        defaultValue={item.date_of_birth}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ssn"
                        label="CCCD"
                        variant="outlined"
                        type="text"
                        defaultValue={item.ssn}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone_number"
                        label="Số điện thoại"
                        variant="outlined"
                        type="text"
                        defaultValue={item.phone_number}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="gmail"
                        label="Địa chỉ email"
                        variant="outlined"
                        type="text"
                        defaultValue={item.gmail}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="position"
                        label="Vị trí"
                        variant="outlined"
                        type="text"
                        defaultValue={item.position === "admin"? "Quản lí":"Nhân viên"}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Đóng lại</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

function FormCreateDialog({ isDialogOpened, handleCloseDialog}) {
    return (
        <React.Fragment>
            <StyledDialog open={isDialogOpened} onClose={handleCloseDialog} maxWidth={"sm"} fullWidth={true}>
                <DialogTitle>Sửa thông tin</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Họ và tên"
                        variant="outlined"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Tên đăng nhập"
                        variant="outlined"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Mật khẩu"
                        defaultValue="chii"
                        variant="outlined"
                        type="text"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="dateOfBirth"
                            label="Ngày tháng năm sinh"
                            variant="outlined"
                            helperText="dd-mm-yyyy"
                            type="text"
                            fullWidth
                        />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ssn"
                        label="CCCD"
                        variant="outlined"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone_number"
                        label="Số điện thoại"
                        variant="outlined"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="gmail"
                        label="Địa chỉ email"
                        variant="outlined"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="position"
                        label="Vị trí"
                        variant="outlined"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="contained" color="error">Huỷ bỏ</Button>
                    <Button onClick={handleCloseDialog} color="primary">Thêm mới</Button>
                </DialogActions>
            </StyledDialog>
        </React.Fragment>
    );
}

function FormDeleteDialog({ isDialogOpened, handleCloseDialog, item }) {
    return (
        <React.Fragment>
            <StyledDialog open={isDialogOpened} onClose={handleCloseDialog} maxWidth={"xs"} fullWidth={true}>
                <DialogContent sx={{marginY: "20px"}}>
                    <DialogContentText textAlign="center">
                        Xoá sản phẩm này?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Huỷ bỏ
                    </Button>
                    <Button variant="contained" onClick={handleCloseDialog} color="error">
                        Đồng ý
                    </Button>
                </DialogActions>
            </StyledDialog>
        </React.Fragment>
    );
}

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [viewOpen, setViewOpen] = React.useState({state: false, item:{}});
    const [createOpen, setCreateOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);

    const [userData, setUserData] = React.useState('');
    const [names, setNames] = React.useState([]);
    const [rows, setRows] = React.useState([]);

    const columns = [
        { id: 'product_name', label: 'Tên sản phẩm', flex: 3, minWidth: 300 },
        { id: 'id_product_type', label: 'Loại sản phẩm', flex: 2, minWidth: 200, format: (value) => convertName(value) },
        { id: 'new_price', label: 'Giá (VND)', flex: 2, minWidth: 200, format: (value) => value.toLocaleString('en-US')}
    ];

    React.useEffect(() => {
        setUserData(() => JSON.parse(localStorage.getItem("user")));
        getProductTypeList(
            userData,
            (product_types) => {
                setNames(product_types);
            }
        );
        getProductList(
            userData,
            (products) => {
                setRows(products);
            }
        );
    },[userData])

    function convertName (_id) {
        let length = names.length;
        for( let i = 0; i < length; i++) {
            if(names[i]._id === _id){
                return names[i].name_display;
            }
        }
        return "null";
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box m="1.5rem 2.5rem" width="95%" >
            <Box sx={{marginTop:2}}>
                <Typography variant='h3'>Nhân viên</Typography>
            </Box>
            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                <TextField 
                    autoFocus
                    margin="dense"
                    id="position"
                    label="Tìm kiếm"
                    variant="standard"
                    type="text"
                    sx={{minWidth: 200}}>
                </TextField>
                <IconButton sx={{marginX: 1}}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </IconButton>
                <Button variant='contained' color='secondary' onClick={() => setCreateOpen(true)}>
                    Thêm sản phẩm
                </Button>
            </Grid>
            <Box 
                mt="40px"
                height="75vh">
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table" size='medium'>
                        <TableHead>
                            <StyledTableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                >
                                {column.label}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <StyledTableCell style={{maxHeight: 40}} key={column.id} align={column.align}>
                                        {column.format || typeof value === 'number'
                                            ? column.format(value)
                                            : value}
                                        </StyledTableCell>
                                    );
                                    })}
                                    <StyledTableCell>
                                        <IconButton onClick={() => setViewOpen({state: true, item: row})}>
                                        <FontAwesomeIcon icon={faEye} />
                                        </IconButton>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton onClick={() => setDeleteOpen({state: true, item: "abc"})}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                                );
                            })}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <CustomTablePagination
                        component="div"
                        count={rows.length}
                        rowsPerPage={10}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <FormDialog
                isDialogOpened={viewOpen.state}
                item = {viewOpen.item}
                handleCloseDialog={() => setViewOpen({state: false, item: {}})}/>
                <FormCreateDialog
                isDialogOpened={createOpen}
                handleCloseDialog={() => setCreateOpen(false)} />
                <FormDeleteDialog
                isDialogOpened={deleteOpen.state}
                item = {deleteOpen.item}
                handleCloseDialog={() => setDeleteOpen({state: false, item: {}})}/>
            </Box>
        </Box>  
    );
}

const CustomTablePagination = styled(TablePagination)(
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