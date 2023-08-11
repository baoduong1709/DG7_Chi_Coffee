import React from 'react';
import { Box, Typography, Table, TableBody, TableContainer, TableHead, Paper } from '@mui/material';

import { StyledTableRow, StyledTableCell, CustomTablePagination } from '~/components/private_layout/theme';

import { ToastOption } from '../../../components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { customersAPI } from '~/api/customer';

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [rows, setRows] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const columns = [
        { id: 'gmail', label: 'Gmail', flex: 3, minWidth: 180 },
        { id: 'name', label: 'Tên khách hàng', flex: 3, minWidth: 180 },
        { id: 'phone_number', label: 'Số điện thoại', flex: 2, minWidth: 120},
        { id: 'address', label: 'Địa chỉ', flex: 4, minWidth: 240}
    ];

    React.useEffect(() => {
        const getCustomerList = async () => {
            try {
                const res = await customersAPI.getAll();
                setRows(res);
                setIsLoading(false);
            } catch (err) {
                let status = err.status;
                let data = err.data;
                toast.error('Lỗi ' + status + ': ' + data, ToastOption);
                setIsLoading(false);
            }
        };
        getCustomerList();
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
            <Box sx={{marginTop:2, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Typography variant='h3'>Danh sách khách hàng</Typography>
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
            </Box>
            <ToastContainer />
        </Box>  
    );
}