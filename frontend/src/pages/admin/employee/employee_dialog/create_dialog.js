import React from 'react';
import { DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { StyledDialog } from '~/components/private_layout/theme';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { ToastOption } from '~/components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { employeeAPI } from '~/api/employee';
import { onSubmitValidate } from './validate';

export const FormCreateDialog = ({ isDialogOpened, handleCloseDialog}) => {
    const [item, setItem] = React.useState({
        name: "",
        username: "",
        password: "",
        gender: "",
        date_of_birth: dayjs("2002-01-13").format("DD/MM/YYYY").toString(),
        ssn: "",
        phone_number: "",
        gmail: "",
        address: "",
        position: "",
    });
    let today = dayjs();
    const handleChange = (event) => {
        event.preventDefault();
        setItem({
            ...item,
            [event.target.name]: event.target.value,
        });
    }
    const handleSelectGender = (event) => {
        event.preventDefault();
        setItem({
            ...item,
            gender: event.target.value,
        });
    }
    const handleSelectPosition = (event) => {
        event.preventDefault();
        setItem({
            ...item,
            position: event.target.value,
        });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(onSubmitValidate(item).state == true){
            try {
                const res = await employeeAPI.create(item);
                toast.success(res, ToastOption);
                setTimeout(handleCloseDialog, 0);
            } catch (err) {
                let status = err.status;
                let data = err.data;
                toast.error('Lỗi ' + status + ': ' + data, ToastOption);
            }
        }
        else {
            toast.warning(onSubmitValidate(item).message, ToastOption); 
        }
    }
    return (
        <React.Fragment>
            <StyledDialog open={isDialogOpened} onClose={handleCloseDialog} maxWidth={"sm"} fullWidth={true}>
                <DialogTitle>Thêm tài khoản</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Họ và tên"
                        defaultValue={item.name}
                        onChange={(e) => handleChange(e)}
                        variant="outlined"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="username"
                        label="Tên đăng nhập"
                        defaultValue={item.username}
                        onChange={(e) => handleChange(e)}
                        variant="outlined"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="password"
                        label="Mật khẩu"
                        defaultValue={item.password}
                        onChange={(e) => handleChange(e)}
                        variant="outlined"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        select
                        autoFocus
                        margin="dense"
                        name="gender"
                        defaultValue="male"
                        value={item.gender}
                        label="Giới tính"
                        variant="outlined"
                        type="text"
                        onChange={(e) => handleSelectGender(e)}
                        fullWidth
                    >
                        <MenuItem id="gender" value={"male"}>Nam</MenuItem>
                        <MenuItem id="gender" value={"female"}>Nữ</MenuItem>
                    </TextField>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'> 
                        <DesktopDatePicker 
                            value={dayjs(item.date_of_birth, "DD/MM/YYYY")}
                            maxDate={today}
                            onChange={(newValue) => {
                                setItem({
                                    ...item,
                                    date_of_birth: newValue.format("DD/MM/YYYY").toString(),
                                });
                            }}
                        />
                    </LocalizationProvider>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="ssn"
                        label="CCCD"
                        defaultValue={item.ssn}
                        onChange={(e) => handleChange(e)}
                        variant="outlined"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="phone_number"
                        label="Số điện thoại"
                        defaultValue={item.phone_number}
                        onChange={(e) => handleChange(e)}
                        variant="outlined"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="gmail"
                        label="Địa chỉ email"
                        defaultValue={item.gmail}
                        onChange={(e) => handleChange(e)}
                        variant="outlined"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="address"
                        label="Địa chỉ"
                        defaultValue={item.address}
                        onChange={(e) => handleChange(e)}
                        variant="outlined"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        select
                        autoFocus
                        margin="dense"
                        defaultValue="employee"
                        value={item.position}
                        label="Vị trí"
                        variant="outlined"
                        type="text"
                        onChange={(e) => handleSelectPosition(e)}
                        fullWidth
                    >
                        <MenuItem  id="position" value={"employee"}>Nhân viên</MenuItem>
                        <MenuItem  id="position" value={"admin"}>Quản lí</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="contained" color="error">Huỷ bỏ</Button>
                    <Button onClick={(event) => {handleSubmit(event)}} color="primary">Thêm mới</Button>
                </DialogActions>
            </StyledDialog>
            <ToastContainer />
        </React.Fragment>
    );
}