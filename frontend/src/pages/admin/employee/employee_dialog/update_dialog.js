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

export const FormEditDialog = ({ isDialogOpened, item, handleCloseDialog}) => {
    const [values, setValues] = React.useState({
        name: "",
        username: "",
        date_of_birth: "",
        gender: "",
        ssn: "",
        phone_number: "",
        gmail: "",
        address: "",
        position: "",
        _id: "",
    });
    React.useEffect(() => {
        setValues({
            name: item.name,
            username: item.username,
            date_of_birth: item.date_of_birth,
            gender: item.gender,
            ssn: item.ssn,
            phone_number: item.phone_number,
            gmail: item.gmail,
            address: item.address,
            position: item.position,
            _id: item._id,
        });
    },[])
    let today = dayjs();
    const handleChange = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            [event.target.id]: event.target.value,
        });
    }
    const handleSelectGender = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            gender: event.target.value,
        });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(onSubmitValidate(values).state === true){
            try {
                const res = await employeeAPI.update(values, item._id);
                toast.success(res, ToastOption);
                setTimeout(handleCloseDialog, 0);
            } catch (err) {
                let status = err.status;
                let data = err.data;
                toast.error('Lỗi ' + status + ': ' + data, ToastOption);
            }
        }
        else {
            toast.warning(onSubmitValidate(values).message, ToastOption); 
        }
    }

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
                        onChange={(e) => handleChange(e)}
                        type="text"
                        fullWidth
                    />
                    <TextField
                        select
                        autoFocus
                        margin="dense"
                        name="gender"
                        defaultValue={item.gender}
                        label="Giới tính"
                        variant="outlined"
                        type="text"
                        onChange={(e) => {handleSelectGender(e)}}
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
                                setValues({
                                    ...values,
                                    date_of_birth: newValue.format("DD/MM/YYYY").toString(),
                                });
                            }}
                        />
                    </LocalizationProvider>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ssn"
                        label="CCCD"
                        variant="outlined"
                        defaultValue={item.ssn}
                        onChange={(e) => handleChange(e)}
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
                        onChange={(e) => handleChange(e)}
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
                        onChange={(e) => handleChange(e)}
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Địa chỉ"
                        variant="outlined"
                        defaultValue={item.address}
                        onChange={(e) => handleChange(e)}
                        type="text"
                        fullWidth
                    />
                    <TextField
                        select
                        autoFocus
                        margin="dense"
                        value={item.position}
                        label="Vị trí"
                        variant="outlined"
                        type="text"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    >
                        <MenuItem  id="position" value={"employee"}>Nhân viên</MenuItem>
                        <MenuItem  id="position" value={"admin"}>Quản lí</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="contained" color="error">Huỷ bỏ</Button>
                    <Button onClick={(event) => {handleSubmit(event)}} color="primary">Lưu thay đổi</Button>
                </DialogActions>
            </StyledDialog>
            <ToastContainer />
        </React.Fragment>
    );    
}