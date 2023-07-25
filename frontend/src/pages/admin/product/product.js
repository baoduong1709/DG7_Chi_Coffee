import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Container, IconButton, Typography, Button, Grid } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faRightFromBracket, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { ThemeProvider, styled } from '@mui/material/styles';
import { theme } from '~/components/private_layout/theme';

import productApi from '~/api/productApi';

const columns = [
    { id: 'name', label: 'Tên sản phẩm', flex: 3, minWidth: 300 },
    { id: 'idproducttype', label: 'Loại sản phẩm', flex: 2, minWidth: 200 },
    { id: 'newprice', label: 'Giá (VND)', flex: 2, minWidth: 200, format: (value) => value.toLocaleString('en-US')}
];

function createData(name, idproducttype, newprice) {
  return { name, idproducttype, newprice };
}

// const rows = [
//     createData("Tra o long", "1", 27000),
//     createData("Tra hat vai", "2", 14000)
// ];

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
    // hide last border
}));

function FormDialog({ isDialogOpened, name, handleCloseDialog }) {
    return (
        <React.Fragment>
            <Dialog open={isDialogOpened} onClose={handleCloseDialog}>
                <DialogTitle>Xem thông tin</DialogTitle>
                <DialogContent>
                    <Grid container direction="column">
                        <Grid item>
                            <TextField id="username" variant='standard' value="bao1709" aria-readonly />
                            <TextField id="role" variant='standard' value="manager" aria-readonly />
                        </Grid>
                        <Grid item>
                            <TextField id="fullname" variant='standard' value={name} aria-readonly />
                        </Grid>
                        <Grid item>
                            <TextField id="dateofbirth" variant='standard' value="17/06/2002" aria-readonly />
                            <TextField id="gender" variant='standard' value="nam" aria-readonly />
                        </Grid>
                        <Grid item>
                            <TextField id="ssn" variant='standard' value="0123456789012" aria-readonly />
                        </Grid>
                        <Grid item>
                            <TextField id="ssn" variant='standard' value="0123456789012" aria-readonly />
                        </Grid>
                        <Grid item>
                            <TextField id="address" variant='standard' value="33 Tran Quang Dieu, Geng Rang, Quy Nhon, ABC XYZKLAJHDKJLASD" aria-readonly />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Đóng lại</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

function FormEditDialog({ isDialogOpened, handleCloseDialog, name }) {
    return (
        <React.Fragment>
            <Dialog open={isDialogOpened} onClose={handleCloseDialog}>
                <DialogTitle>Sửa thông tin</DialogTitle>
                <DialogContent>
                    <Grid container direction="column">
                        <Grid item>
                            <TextField id="username" variant='standard' value="bao1709" />
                            <TextField id="role" variant='standard' value="manager" />
                        </Grid>
                        <Grid item>
                            <TextField id="fullname" variant='standard' value={name} />
                        </Grid>
                        <Grid item>
                            <TextField id="dateofbirth" variant='standard' value="17/06/2002" />
                            <TextField id="gender" variant='standard' value="nam" />
                        </Grid>
                        <Grid item>
                            <TextField id="ssn" variant='standard' value="0123456789012" />
                        </Grid>
                        <Grid item>
                            <TextField id="ssn" variant='standard' value="0123456789012" />
                        </Grid>
                        <Grid item>
                            <TextField id="address" variant='standard' value="33 Tran Quang Dieu, Geng Rang, Quy Nhon, ABC XYZKLAJHDKJLASD" />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Huỷ bỏ</Button>
                    <Button onClick={handleCloseDialog}>Xác nhận</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

function FormDeleteDialog({ isDialogOpened, handleCloseDialog, name }) {
    return (
        <React.Fragment>
            <Dialog open={isDialogOpened} onClose={handleCloseDialog}>
                <DialogTitle>Xoá sản phẩm</DialogTitle>
                <DialogContent>
                    <Typography variant='h6'>Xoá sản phẩm này?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Huỷ bỏ</Button>
                    <Button onClick={handleCloseDialog}>Xác nhận</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [viewOpen, setViewOpen] = React.useState({state: false, name:""});
    const [editOpen, setEditOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await productApi.getAll();
                console.log(res);
                setRows(res);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProduct();
        setRows([]);
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Container sx={{ alignItems: "center", width: "100%" }}>
            <Box sx={{marginY:5}}>
                <Typography variant='h3'>Sản phẩm</Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
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
                                        <StyledTableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : value}
                                        </StyledTableCell>
                                    );
                                    })}
                                    <StyledTableCell>
                                        <IconButton onClick={() => setViewOpen({state: true, name: "abc"})}>
                                        <FontAwesomeIcon icon={faEye} />
                                        </IconButton>
                                        {console.log(viewOpen)}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton onClick={() => setEditOpen({state: true, name: "abc"})}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                        </IconButton>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton onClick={() => setDeleteOpen({state: true, name: "abc"})}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                                );
                            })}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={rows.length}
                        sx={{}}
                        rowsPerPage={10}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <FormDialog
                isDialogOpened={viewOpen.state}
                name = {viewOpen.name}
                handleCloseDialog={() => setViewOpen({state: false, name: ""})}/>
                <FormEditDialog
                isDialogOpened={editOpen.state}
                name = {editOpen.name}
                handleCloseDialog={() => setEditOpen({state: false, name: ""})}/>
                <FormDeleteDialog
                isDialogOpened={deleteOpen.state}
                name = {deleteOpen.name}
                handleCloseDialog={() => setDeleteOpen({state: false, name: ""})}/>
            </Box>
        </Container>
    );
}