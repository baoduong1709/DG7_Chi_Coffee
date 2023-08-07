import React from 'react';
import { DialogActions, DialogContent, DialogContentText, Button } from '@mui/material';
import { StyledDialog } from '~/components/private_layout/theme';

import { ToastOption } from '~/components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { productAPI } from '~/api/product';

export const FormDeleteDialog = ({ isDialogOpened, handleCloseDialog, item }) => {
    const id = item?._id;
    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            const res = await productAPI.delete(id);
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
                        Xoá sản phẩm {item?.product_name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Huỷ bỏ
                    </Button>
                    <Button variant="contained" onClick={(e) => handleDelete(e)} color="error">
                        Đồng ý
                    </Button>
                </DialogActions>
            </StyledDialog>
            <ToastContainer />
        </React.Fragment>
    );
}