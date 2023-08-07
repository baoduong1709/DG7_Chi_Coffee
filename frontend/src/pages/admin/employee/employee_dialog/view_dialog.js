import React from 'react';
import { DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { StyledDialog } from '~/components/private_layout/theme';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const FormDialog = ({ isDialogOpened, item, handleCloseDialog }) => {
    return (
        <React.Fragment>
            <StyledDialog open={isDialogOpened} onClose={handleCloseDialog}>
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
                        id="username"
                        label="Tên đăng nhập"
                        variant="outlined"
                        type="text"
                        defaultValue={item.username}
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
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'> 
                        <DesktopDatePicker
                            defaultValue={dayjs(item.date_of_birth, "DD/MM/YYYY")}
                            readOnly
                        />
                    </LocalizationProvider>
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
                        id="address"
                        label="Địa chỉ"
                        variant="outlined"
                        type="text"
                        defaultValue={item.address}
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
            </StyledDialog>
        </React.Fragment>
    );
}