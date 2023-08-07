import React from 'react';
import { Box, IconButton, Typography, Button, Table, TableBody, TableContainer, TableHead, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faMagnifyingGlass, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { CustomTablePagination, StyledTableCell, StyledTableRow } from '~/components/private_layout/theme';
import { FormDialog, FormCreateDialog, FormEditDialog, FormDeleteDialog } from './product_dialog';

import { ToastOption } from '../../../components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { productsAPI, productTypesAPI } from '~/api/product';

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [viewOpen, setViewOpen] = React.useState({ state: false, item: {} });
    const [createOpen, setCreateOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState({ state: false, item: {} });
    const [deleteOpen, setDeleteOpen] = React.useState({ state: false, item: {} });

    const [names, setNames] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const columns = [
        { id: 'product_name', label: 'Tên sản phẩm', flex: 3, align: 'left', minWidth: 180 },
        {
            id: 'id_product_type',
            label: 'Loại sản phẩm',
            flex: 2,
            minWidth: 120,
            align: 'center',
            format: (value) => convertName(value),
        },
        {
            id: 'new_price',
            label: 'Giá (VND)',
            flex: 2,
            minWidth: 120,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
    ];

    const dialogOpenId = React.useRef(0);
    React.useEffect(() => {
        if (createOpen || editOpen.state || deleteOpen.state) {
            dialogOpenId.current = dialogOpenId.current + 1;
        }
    }, [createOpen, editOpen, deleteOpen]);

    React.useEffect(() => {
        const getProductTypeList = async () => {
            try {
                const res = await productTypesAPI.getAll();
                setNames(res);
            } catch (err) {
                let status = err.status;
                let data = err.data;
                toast.error('Lỗi ' + status + ': ' + data, ToastOption);
            }
        };
        getProductTypeList();
    }, []);

    React.useEffect(() => {
        const getProductList = async () => {
            try {
                const res = await productsAPI.getAll();
                setRows(res);
                setIsLoading(false);
            } catch (err) {
                let status = err.status;
                let data = err.data;
                toast.error('Lỗi ' + status + ': ' + data, ToastOption);
            }
        };
        getProductList();
    }, [dialogOpenId.current]);

    function convertName(_id) {
        let length = names.length;
        for (let i = 0; i < length; i++) {
            if (names[i]._id === _id) {
                const str2 = names[i].name_display.slice(1).toLowerCase();
                return names[i].name_display.charAt(0) + str2;
            }
        }
        return 'null';
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
            <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography variant="h3">Sản phẩm</Typography>
                <Button variant="contained" color="secondary" onClick={() => setCreateOpen(true)}>
                    Thêm sản phẩm
                </Button>
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
                                    <StyledTableCell></StyledTableCell>
                                    <StyledTableCell></StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {isLoading ? (
                                    <StyledTableRow>
                                        <StyledTableCell>
                                            <Typography variant="h5">Đang tải...</Typography>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ) : (
                                    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
                                                    <IconButton onClick={() => setViewOpen({ state: true, item: row })}>
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </IconButton>
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <IconButton onClick={() => setEditOpen({ state: true, item: row })}>
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </IconButton>
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <IconButton
                                                        onClick={() => setDeleteOpen({ state: true, item: row })}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashCan} />
                                                    </IconButton>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        );
                                    })
                                )}
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
                    key={'view' + dialogOpenId.current.toString()}
                    isDialogOpened={viewOpen.state}
                    item={viewOpen.item}
                    handleCloseDialog={() => setViewOpen({ state: false, item: {} })}
                />
                <FormCreateDialog
                    key={'edit' + dialogOpenId.current.toString()}
                    isDialogOpened={createOpen}
                    handleCloseDialog={() => setCreateOpen(false)}
                    names={names}
                />
                {editOpen.state && (
                    <FormEditDialog
                        key={'dele' + dialogOpenId.current.toString()}
                        isDialogOpened={editOpen.state}
                        item={editOpen.item}
                        event={editOpen.event}
                        handleCloseDialog={() => setEditOpen({ state: false, item: {} })}
                        names={names}
                    />
                )}
                <FormDeleteDialog
                    key={'crea' + dialogOpenId.current.toString()}
                    isDialogOpened={deleteOpen.state}
                    item={deleteOpen.item}
                    handleCloseDialog={() => setDeleteOpen({ state: false, item: {} })}
                />
            </Box>
            <ToastContainer />
        </Box>
    );
}
