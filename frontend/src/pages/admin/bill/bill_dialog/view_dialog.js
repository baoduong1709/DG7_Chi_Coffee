import React from 'react';
import {
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Grid,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import { NumericFormatCustom, StyledDialog } from '~/components/private_layout/theme';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { NumericFormat } from 'react-number-format';
import { customerAPI } from '~/api/customer';
import { ToastOption } from '~/components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FormDialog = ({ isDialogOpened, item, handleCloseDialog }) => {
    dayjs.extend(utc);
    const [rows, setRows] = React.useState([]);
    const [customer, setCustomer] = React.useState({});
    React.useEffect(() => {
        if (item.table_id == undefined) {
            const customer_id = item.customer_id ? item.customer_id : null;
            const getCustomerDetail = async () => {
                try {
                    const res = await customerAPI.get(customer_id);
                    setCustomer(res);
                } catch (err) {
                    let status = err.status;
                    let data = err.data;
                    toast.error('Lỗi ' + status + ': ' + data, ToastOption);
                }
            };
            if (customer_id) {
                getCustomerDetail();
            }
        }
    }, [item]);
    React.useEffect(() => {
        setRows(item.product);
    }, [item]);
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <React.Fragment>
            <StyledDialog open={isDialogOpened} onClose={handleCloseDialog} fullWidth maxWidth={'sm'}>
                <DialogTitle>
                    {item.customer_name} - {item._id}
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="stretch">
                        <Grid item container direction="row">
                            <Typography variant="subtitle1">{'Tên khách hàng:  '}</Typography>
                            <Typography variant="subtitle1" marginLeft={2}>
                                {item.customer_name}
                            </Typography>
                        </Grid>
                        <Grid item container direction="row">
                            <Typography variant="subtitle1">{'Thời gian đến:  '}</Typography>
                            <Typography variant="subtitle1" marginLeft={3.5}>
                                {dayjs.utc(item.createdAt).format('HH:mm:ss DD/MM/YYYY').toString()}
                            </Typography>
                        </Grid>
                        <Grid item container direction="row">
                            <Typography variant="subtitle1">{'Xác nhận lúc:  '}</Typography>
                            <Typography variant="subtitle1" marginLeft={4.2}>
                                {item.updatedAt
                                    ? dayjs.utc(item.updatedAt).format('HH:mm:ss DD/MM/YYYY').toString()
                                    : ''}
                            </Typography>
                        </Grid>
                        {item.table_id ? (
                            <Grid item container direction="row">
                                <Typography variant="subtitle1">{'Bàn:  '}</Typography>
                                <Typography variant="subtitle1" marginLeft={11.5}>
                                    {item.table_id}
                                </Typography>
                            </Grid>
                        ) : (
                            <Grid item container direction="row">
                                <Typography variant="subtitle1">{'Địa chỉ giao:  '}</Typography>
                                <Typography variant="subtitle1" marginLeft={5}>
                                    {customer.address}
                                </Typography>
                            </Grid>
                        )}
                        <Grid item container direction="row">
                            <TableContainer>
                                <Table aria-label="products-table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell component="th">Mặt hàng</TableCell>
                                            <TableCell style={{ width: 70 }}>SL</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows?.map((row) => {
                                            return (
                                                <TableRow
                                                    key={row._id}
                                                    hover={false}
                                                    sx={{
                                                        '&:hover': {
                                                            color: 'primary',
                                                        },
                                                    }}
                                                >
                                                    <TableCell component="th">{row.product_name}</TableCell>
                                                    <TableCell>{row.quanlity}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid
                            item
                            container
                            direction="row"
                            justifyContent={'flex-end'}
                            marginTop={3}
                            alignItems={'center'}
                        >
                            <Typography variant="subtitle1">{'Tổng tiền:  '}</Typography>
                            <Typography variant="subtitle1" marginLeft={2}>
                                {formatter.format(item.cost).replace(/₫/g, 'VNĐ')}
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Đóng lại</Button>
                </DialogActions>
            </StyledDialog>
            <ToastContainer />
        </React.Fragment>
    );
};
