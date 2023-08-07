import React from 'react';
import { Box, IconButton, Typography, Button, Table, TableBody, TableContainer, TableHead, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { StyledTableRow, StyledTableCell, CustomTablePagination } from '~/components/private_layout/theme';
import { FormDialog, FormCreateDialog, FormDeleteDialog, FormEditDialog } from './employee_dialog';

import { ToastOption } from '../../../components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { employeesAPI } from '~/api/employee';

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [viewOpen, setViewOpen] = React.useState({state: false, item:{}});
    const [createOpen, setCreateOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState({state: false, item:{}});
    const [deleteOpen, setDeleteOpen] = React.useState({state: false, item:{}});

    const [rows, setRows] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const columns = [
        { id: 'name', label: 'Họ và tên', flex: 3, minWidth: 240 },
        { id: 'phone_number', label: 'Số điện thoại', flex: 2, minWidth: 160 },
        { id: 'position', label: 'Vị trí', flex: 1, minWidth: 80}
    ];
    const dialogOpenId = React.useRef(0);
    React.useEffect(() => {
        if(createOpen || editOpen.state || deleteOpen.state) {
            dialogOpenId.current = dialogOpenId.current + 1;
        }
    },[createOpen, editOpen, deleteOpen])

    React.useEffect(() => {
        const getEmployeeList = async () => {
            try {
                const res = await employeesAPI.getAll();
                setRows(res);
                setIsLoading(false);
            } catch (err) {
                let status = err.status;
                let data = err.data;
                toast.error('Lỗi ' + status + ': ' + data, ToastOption);
                setIsLoading(false);
            }
        };
        getEmployeeList();
    },[dialogOpenId.current])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box m="1.5rem 2.5rem" width="95%" >
            <Box sx={{marginTop:2, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Typography variant='h3'>Nhân viên</Typography>
                <Button variant='contained' color='secondary' onClick={() => setCreateOpen(true)}>
                    Thêm tài khoản
                </Button>
            </Box>
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
                            {isLoading?
                             <StyledTableRow>
                                <StyledTableCell>
                                <Typography variant='h5'>Đang tải...</Typography>
                                </StyledTableCell>
                             </StyledTableRow>
                            :rows
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
                                        <IconButton onClick={(event) => setEditOpen({state: true, item: row, event: event})}>
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
                key={"view"+dialogOpenId.current.toString()}
                isDialogOpened={viewOpen.state}
                item = {viewOpen.item}
                handleCloseDialog={() => setViewOpen({state: false, item: {}})}/>
                <FormCreateDialog
                key={"edit"+dialogOpenId.current.toString()}
                isDialogOpened={createOpen}
                handleCloseDialog={() => setCreateOpen(false)} />
                {editOpen.state && <FormEditDialog
                key={"dele"+dialogOpenId.current.toString()}
                isDialogOpened={editOpen.state}
                item = {editOpen.item}
                handleCloseDialog={() => setEditOpen({state: false, item: {}})}/>}
                <FormDeleteDialog
                key={"crea"+dialogOpenId.current.toString()}
                isDialogOpened={deleteOpen.state}
                item = {deleteOpen.item}
                handleCloseDialog={() => setDeleteOpen({state: false, item: {}})}/>
            </Box>
            <ToastContainer />
        </Box>  
    );
}