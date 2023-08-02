import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, MenuItem, Select } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { StyledDialog } from '~/components/private_layout/theme';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { ToastOption } from '../../../components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { employeeAPI } from '~/api/employee';

const onSubmitValidate = (item) => {  
    const phoneRegex = /^\d+$/;
    if(!item.name)
        return {state: false, message: "Chưa nhập tên"};
    else if(!item.username)
        return {state: false, message: "Chưa nhập tên đăng nhập"};
    else if(!item.ssn)
        return {state: false, message: "Chưa nhập CCCD"};
    else if(!item.phone_number)
        return {state: false, message: "Chưa nhập số điện thoại"};
    else if(!phoneRegex.test(item.phone_number) || item.phone_number.length != 10)
        return {state: false, message: "Số điện thoại không hợp lệ"};
    else if(item.ssn.length != 12)
        return {state: false, message: "Căn cước công dân không hợp lệ"};
    else {
        return {state: true, message: null}
    }
}

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
            </Dialog>
        </React.Fragment>
    );
}

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
    const [msg, setMsg] = React.useState({state: false, message:""});
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
                setTimeout(handleCloseDialog, 3000);
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
        if(onSubmitValidate(values).state == true){
            try {
                const res = await employeeAPI.update(values, item._id);
                toast.success(res, ToastOption);
                setTimeout(handleCloseDialog, 3000);
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
        </React.Fragment>
    );    
}

export const FormDeleteDialog = ({ isDialogOpened, handleCloseDialog, item }) => {
    const id = item?._id;
    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            const res = await employeeAPI.delete(id);
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
                        Xoá nhân viên {item?.name}?
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

