import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { StyledDialog } from '~/components/private_layout/theme';

export const FormDialog = ({ isDialogOpened, item, handleCloseDialog }) => {
    return (
        <React.Fragment>
            <Dialog open={isDialogOpened} onClose={handleCloseDialog}>
                <DialogTitle>Xem thông tin</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Họ và tên"
                        variant="outlined"
                        type="text"
                        defaultValue={item.name}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="gender"
                        label="Giới tính"
                        variant="outlined"
                        type="text"
                        defaultValue={item.gender === "male"?"Nam":"Nữ"}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="dateOfBirth"
                        label="Ngày tháng năm sinh"
                        variant="outlined"
                        type="text"
                        defaultValue={item.date_of_birth}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ssn"
                        label="CCCD"
                        variant="outlined"
                        type="text"
                        defaultValue={item.ssn}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone_number"
                        label="Số điện thoại"
                        variant="outlined"
                        type="text"
                        defaultValue={item.phone_number}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="gmail"
                        label="Địa chỉ email"
                        variant="outlined"
                        type="text"
                        defaultValue={item.gmail}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="position"
                        label="Vị trí"
                        variant="outlined"
                        type="text"
                        defaultValue={item.position === "admin"? "Quản lí":"Nhân viên"}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Đóng lại</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export const FormCreateDialog = ({ isDialogOpened, handleCloseDialog}) => {
    return (
        <React.Fragment>
            <StyledDialog open={isDialogOpened} onClose={handleCloseDialog} maxWidth={"sm"} fullWidth={true}>
                <DialogTitle>Sửa thông tin</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Họ và tên"
                        variant="outlined"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Tên đăng nhập"
                        variant="outlined"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Mật khẩu"
                        defaultValue="chii"
                        variant="outlined"
                        type="text"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="dateOfBirth"
                            label="Ngày tháng năm sinh"
                            variant="outlined"
                            helperText="dd-mm-yyyy"
                            type="text"
                            fullWidth
                        />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ssn"
                        label="CCCD"
                        variant="outlined"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone_number"
                        label="Số điện thoại"
                        variant="outlined"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="gmail"
                        label="Địa chỉ email"
                        variant="outlined"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="position"
                        label="Vị trí"
                        variant="outlined"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="contained" color="error">Huỷ bỏ</Button>
                    <Button onClick={handleCloseDialog} color="primary">Thêm mới</Button>
                </DialogActions>
            </StyledDialog>
        </React.Fragment>
    );
}

export const FormEditDialog = ({ isDialogOpened, item, handleCloseDialog}) => {
    return (
        <React.Fragment>
            <StyledDialog open={isDialogOpened} onClose={handleCloseDialog} maxWidth={"sm"} fullWidth={true}>
                <DialogTitle>Sửa thông tin</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Tên đăng nhập"
                        variant="outlined"
                        defaultValue={item.username}
                        type="text"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Họ và tên"
                        variant="outlined"
                        defaultValue={item.name}
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Mật khẩu"
                        defaultValue="chii"
                        variant="outlined"
                        type="text"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="dateOfBirth"
                            label="Ngày tháng năm sinh"
                            variant="outlined"
                            defaultValue={item.date_of_birth}
                            helperText="dd-mm-yyyy"
                            type="text"
                            fullWidth
                        />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ssn"
                        label="CCCD"
                        variant="outlined"
                        defaultValue={item.ssn}
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone_number"
                        label="Số điện thoại"
                        variant="outlined"
                        defaultValue={item.phone_number}
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="gmail"
                        label="Địa chỉ email"
                        variant="outlined"
                        defaultValue={item.gmail}
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="position"
                        label="Vị trí"
                        variant="outlined"
                        defaultValue={item.position === "admin"? "Quản lí":"Nhân viên"}
                        type="text"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="contained" color="error">Huỷ bỏ</Button>
                    <Button onClick={handleCloseDialog} color="primary">Lưu thay đổi</Button>
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
                        Xoá nhân viên {item?.name}?
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

export const FormConfirmDialog = ({ isDialogOpened, handleCloseDialog, item }) => {
    return (
        <React.Fragment>
            <StyledDialog open={isDialogOpened} onClose={handleCloseDialog} maxWidth={"xs"} fullWidth={true}>
                <DialogContent sx={{marginY: "20px"}}>
                    <DialogContentText textAlign="center">
                        Lưu thay đổi?
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

