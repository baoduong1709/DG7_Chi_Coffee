import React from 'react';
import { Box, IconButton, Typography, Button, Grid, TextField, Table, TableBody, TableContainer, TableHead, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faMagnifyingGlass, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { StyledTableRow, StyledTableCell, CustomTablePagination } from '~/components/private_layout/theme';
import { FormDialog, FormCreateDialog, FormDeleteDialog, FormEditDialog } from './employee_dialog';

import { employeesAPI } from '~/api/employee/employeesAPI';

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [viewOpen, setViewOpen] = React.useState({state: false, item:{}});
    const [createOpen, setCreateOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState({state: false, item:{}});
    const [deleteOpen, setDeleteOpen] = React.useState({state: false, item:{}});

    const [rows, setRows] = React.useState([]);

    const columns = [
        { id: 'name', label: 'Họ và tên', flex: 3, minWidth: 240 },
        { id: 'phone_number', label: 'Số điện thoại', flex: 2, minWidth: 160 },
        { id: 'position', label: 'Vị trí', flex: 1, minWidth: 80}
    ];

    React.useEffect(() => {
        const getEmployeeList = async () => {
            try {
                const res = await employeesAPI.getAll();
                setRows(res);
            } catch (err) {}
        };
        getEmployeeList();
    },[])

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
                    Thêm tài khoản
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
                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row._id}>
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
                                        <IconButton onClick={() => setViewOpen({state: true, item: row})}>
                                        <FontAwesomeIcon icon={faEye} />
                                        </IconButton>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton onClick={() => setEditOpen({state: true, item: row})}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                        </IconButton>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton onClick={() => setDeleteOpen({state: true, item: row})}>
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
                        rowsPerPageOptions={[10]}
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
                <FormEditDialog
                isDialogOpened={editOpen.state}
                item = {editOpen.item}
                handleCloseDialog={() => setEditOpen({state: false, item: {}})}/>
                <FormDeleteDialog
                isDialogOpened={deleteOpen.state}
                item = {deleteOpen.item}
                handleCloseDialog={() => setDeleteOpen({state: false, item: {}})}/>
            </Box>
        </Box>  
    );
}