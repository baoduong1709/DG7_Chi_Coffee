import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Grid, MenuItem } from '@mui/material';
import { StyledDialog } from '~/components/private_layout/theme';

export const FormDialog = ({ isDialogOpened, item, handleCloseDialog }) => {
    return (
        <React.Fragment>
            <Dialog open={isDialogOpened} onClose={handleCloseDialog}>
                <DialogTitle>{item.product_name}</DialogTitle>
                <DialogContent>
                    <Grid container style={{display: "flex", justifyContent: "center"}}>
                        <img
                            src={item.product_image}
                            style={{maxHeight: "100px", maxWidth: "100px"}}
                        />
                    </Grid>
                    <Grid container>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="old_price"
                            label="Giá cũ"
                            variant="outlined"
                            type="text"
                            defaultValue={item.old_price}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="new_price"
                            label="Giá mới"
                            variant="outlined"
                            type="text"
                            defaultValue={item.new_price}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="product_status"
                            label="Trạng thái"
                            variant="outlined"
                            type="text"
                            defaultValue={item.product_status === "true"? "Đang bán": "Đã ngừng bán"}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            multiline
                            minRows={3}
                            maxRows={6}
                            id="description"
                            label="Mô tả"
                            variant="outlined"
                            type="text"
                            defaultValue={item.description}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Đóng lại</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export const FormCreateDialog = ({ isDialogOpened, handleCloseDialog, names}) => {
    return (
        <React.Fragment>
            <StyledDialog open={isDialogOpened} onClose={handleCloseDialog} maxWidth={"sm"} fullWidth={true}>
            <DialogTitle>Thêm sản phẩm</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="product_name"
                            label="Tên"
                            variant="outlined"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            id="outlined-select-currency"
                            select
                            margin="dense"
                            variant="outlined"
                            label="Loại hàng"
                            fullWidth
                        >
                        {names.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                            {option.name_display.toLowerCase()}
                            </MenuItem>
                        ))}
                        </TextField>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="old_price"
                            label="Giá cũ"
                            variant="outlined"
                            defaultValue={0}
                            type="text"
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="new_price"
                            label="Giá mới"
                            variant="outlined"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            id="outlined-select-currency"
                            select
                            margin="dense"
                            variant="outlined"
                            label="Trạng thái"
                            fullWidth
                        >
                        </TextField>
                        <TextField
                            autoFocus
                            margin="dense"
                            multiline
                            minRows={3}
                            maxRows={6}
                            id="description"
                            label="Mô tả"
                            variant="outlined"
                            type="text"
                            fullWidth
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="contained" color="error">Huỷ bỏ</Button>
                    <Button onClick={handleCloseDialog} color="primary">Thêm mới</Button>
                </DialogActions>
            </StyledDialog>
        </React.Fragment>
    );
}

export const FormEditDialog = ({ isDialogOpened, handleCloseDialog, item, names}) => {
    function convertName (_id) {
        let length = names.length;
        for( let i = 0; i < length; i++) {
            if(names[i]._id === _id){
                return names[i].name_display.toLowerCase();
            }
        }
        return "null";
    }
    return (
        <React.Fragment>
            <StyledDialog open={isDialogOpened} onClose={handleCloseDialog} maxWidth={"sm"} fullWidth={true}>
            <DialogTitle>Thêm sản phẩm</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="product_name"
                            label="Tên"
                            variant="outlined"
                            defaultValue={item.product_name}
                            type="text"
                            fullWidth
                        />
                        <TextField
                            id="outlined-select-currency"
                            select
                            margin="dense"
                            defaultValue={item.id_product_type}
                            placeholder={convertName(item.id_product_type)}
                            variant="outlined"
                            label="Loại hàng"
                            fullWidth
                        >
                        {names.map((option) => (
                            <MenuItem key={option._id} value={option._id}>
                            {option.name_display.toLowerCase()}
                            </MenuItem>
                        ))}
                        </TextField>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="old_price"
                            label="Giá cũ"
                            variant="outlined"
                            defaultValue={item.old_price}
                            type="text"
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="new_price"
                            label="Giá mới"
                            variant="outlined"
                            defaultValue={item.new_price}
                            type="text"
                            fullWidth
                        />
                        <TextField
                            id="outlined-select-currency"
                            select
                            margin="dense"
                            variant="outlined"
                            label="Trạng thái"
                            fullWidth
                        >
                        </TextField>
                        <TextField
                            autoFocus
                            margin="dense"
                            multiline
                            minRows={3}
                            maxRows={6}
                            id="description"
                            label="Mô tả"
                            variant="outlined"
                            defaultValue={item.description}
                            type="text"
                            fullWidth
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="contained" color="error">Huỷ bỏ</Button>
                    <Button onClick={handleCloseDialog} color="primary">Thêm mới</Button>
                </DialogActions>
            </StyledDialog>
        </React.Fragment>
    );
}

export const FormDeleteDialog = ({ isDialogOpened, handleCloseDialog, item }) => {
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
                    <Button variant="contained" onClick={handleCloseDialog} color="error">
                        Đồng ý
                    </Button>
                </DialogActions>
            </StyledDialog>
        </React.Fragment>
    );
}