import React from 'react';
import { DialogActions, DialogContent, DialogContentText, Button } from '@mui/material';
import { StyledDialog, NumericFormatCustom } from '~/components/private_layout/theme';
import dayjs from 'dayjs';

import { ToastOption } from '~/components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { orderAPI } from '~/api/order';

export const FormConfirmDialog = ({ isDialogOpened, item, handleCloseDialog }) => {
    const id = item?._id;
    const handleConfirm = async (event) => {
        event.preventDefault();
        try {
            const res = await orderAPI.update(id);
            toast.success(res, ToastOption);
            setTimeout(handleCloseDialog, 3000);
        } catch (err) {
            let status = err.status;
            let data = err.data;
            toast.error('Lỗi ' + status + ': ' + data, ToastOption);
        }
    }
    return (
        <React.Fragment>
            <StyledDialog open={isDialogOpened} onClose={handleCloseDialog} maxWidth={"xs"} fullWidth={true}>
                <DialogContent sx={{marginY: "20px"}}>
                    <DialogContentText textAlign="center">
                        Xác nhận đơn hàng <br />của {item?.customer_name} <br />vào lúc {item.createdAt? dayjs(item.createdAt).format("HH:mm:ss ngày DD/MM/YYYY").toString() : ""}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Huỷ bỏ
                    </Button>
                    <Button variant="contained" onClick={(e) => handleConfirm(e)} color="primary">
                        Đồng ý
                    </Button>
                </DialogActions>
            </StyledDialog>
            <ToastContainer />
        </React.Fragment>
    );
}