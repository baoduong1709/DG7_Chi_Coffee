import React from 'react';
import {
    Box,
    IconButton,
    Typography,
    Button,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    Paper,
} from '@mui/material';
import dayjs from 'dayjs';
import { CustomTablePagination, StyledTableCell, StyledTableRow, theme } from '~/components/private_layout/theme';
import { FormDialog, FormConfirmDialog } from './bill_dialog';

import { ToastOption } from '../../../components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { orderAPI, ordersAPI } from '~/api/order';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';


export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [viewOpen, setViewOpen] = React.useState({state: false, item:{}});
    const [confirmOpen, setConfirmOpen] = React.useState({state: false, item:{}});
    const [stateParam, setStateParam] = useSearchParams();

    const [rows, setRows] = React.useState([]);
    const [isfilter, setIsFilter] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    const columns = [
        { 
            id: 'customer_name',
            label: 'Khách hàng', 
            flex: 3, 
            minWidth: 150,
            align: "left",  
        },
        {
            id: 'createdAt',
            label: 'Thời gian',
            flex: 2,
            minWidth: 100,
            align: "center",
            format: (value) => dayjs(value).format("HH:mm:ss DD/MM/YYYY").toString(),
        },
        {
            id: 'status',
            label: 'Tình trạng',
            flex: 2,
            minWidth: 100,
            align: "center",
            format: (value) => convertName(value),
        },
        {
            id: 'employee_name',
            label: 'Nhân viên xác nhận',
            flex: 3,
            minWidth: 150,
            align: "left",
        },
    ];

    React.useEffect(() => {
        const getProductTypeList = async () => {
            try {
                const param = stateParam.get("status");
                param? setIsFilter(true): setIsFilter(false);
                const res = await ordersAPI.getAll(param);
                setRows(res);
                setIsLoading(false);
            } catch (err) {
                let status = err.status;
                let data = err.data;
                toast.error('Lỗi ' + status + ': ' + data, ToastOption);
            }
        };
        getProductTypeList();
    }, [confirmOpen]);

    function convertName(status) {
        if(status === true) return "Đã xác nhận";
        else if(status === false) return "Chưa xác nhận";
        else return 'null';
    }
    const handleChangeParam = (event) => {
        event.preventDefault();
        if(!stateParam.get("status")) {
            window.location.assign("./bill?status=false");
        } else {
            window.location.assign("./bill");
        }
        return;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box m="1.5rem 2.5rem" width="95%">
            <Box sx={{marginTop:2, display: "flex", flexDirection: "row"}}>
                <Typography variant='h3'>Hoá đơn</Typography>
            </Box>
            <Box mt="40px" height="75vh">
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table" size="medium">
                            <TableHead>
                                <StyledTableRow>
                                    {columns.map((column) => (
                                        <StyledTableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, textAlign: column.align }}
                                        >
                                            {column.label}
                                        </StyledTableCell>
                                    ))}
                                    <StyledTableCell></StyledTableCell>
                                    <StyledTableCell align='center'>
                                        <IconButton onClick={handleChangeParam}>
                                            <FontAwesomeIcon 
                                                icon={faFilter} 
                                                color={isfilter? theme.palette.warning.main :theme.palette.light.main}
                                            />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {isLoading?
                                <StyledTableRow>
                                    <StyledTableCell>
                                    <Typography variant='h5'>Đang tải...</Typography>
                                    </StyledTableCell>
                                </StyledTableRow>
                                :rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <StyledTableRow hover key={row._id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <StyledTableCell key={column.id} align={column.align}>
                                                        {column.format ? column.format(value) : value}
                                                    </StyledTableCell>
                                                );
                                            })}
                                            <StyledTableCell>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => setViewOpen({ state: true, item: row })}
                                                    color='primary'
                                                >
                                                    Chi tiết
                                                </Button>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => setConfirmOpen({ state: true, item: row })}
                                                    color='warning'
                                                    disabled={row.status === true}
                                                >
                                                    Xác nhận
                                                </Button>
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
                key={"view"+viewOpen.item["_id"]}
                isDialogOpened={viewOpen.state}
                item = {viewOpen.item}
                handleCloseDialog={() => setViewOpen({state: false, item: {}})}/>
                <FormConfirmDialog
                key={"conf"+confirmOpen.item["_id"]}
                isDialogOpened={confirmOpen.state}
                item = {confirmOpen.item}
                handleCloseDialog={() => setConfirmOpen({state: false, item: {}})}/>
            </Box>
            <ToastContainer />
        </Box>
    );
}
