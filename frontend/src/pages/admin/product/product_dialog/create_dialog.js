import React from 'react';
import { DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, MenuItem, Input } from '@mui/material';
import { StyledDialog, NumericFormatCustom } from '~/components/private_layout/theme';
import { onSubmitValidate } from './validate';

import { ToastOption } from '~/components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { productAPI } from '~/api/product';

export const FormCreateDialog = ({ isDialogOpened, handleCloseDialog, names}) => {
    const [item, setItem] = React.useState({
        product_name: "",
        id_product_type: "",
        old_price: "",
        new_price: "",
        product_image: "",
        product_status: true,
        description: ""
    });

    const [file, setFile] = React.useState(null);

    const handleChange = (event) => {
        setItem({
            ...item,
            [event.target.name]: event.target.value,
        });
    }
    const handleSelectProductType = (event) => {
        event.preventDefault();
        setItem({
            ...item,
            id_product_type: event.target.value,
        });
    }
    const handleSelectStatus = (event) => {
        event.preventDefault();
        setItem({
            ...item,
            product_status: event.target.value,
        });
    }
    const handleUploadImage = (event) => {
        event.preventDefault();
        const image = event.target.files[0];
        setFile(image);
        const reader = new FileReader();
        reader.onloadend = () => {
            setItem({
                ...item,
                product_image: reader.result,
            })
        };
        reader.readAsDataURL(image);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(onSubmitValidate(item).state === true){
            try {
                const formData = new FormData();
                formData.append("product_name", item.product_name);
                formData.append("id_product_type", item.id_product_type);
                formData.append("old_price", item.old_price);
                formData.append("new_price", item.new_price);
                formData.append('product_image', file);
                formData.append("product_status", item.product_status);
                formData.append("description", item.description);
                const res = await productAPI.create(formData);
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
            <StyledDialog open={isDialogOpened} onClose={handleCloseDialog} maxWidth={"md"} fullWidth={true}>
            <DialogTitle>Thêm sản phẩm</DialogTitle>
                <DialogContent sx={{display: "flex", flexDirection: "row"}}>
                        <Grid item xs={5} style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <img src={item.product_image ? item.product_image : null} alt="" style={{maxHeight: "300px", maxWidth: "300px"}} />
                            <Input 
                                name="product_image"
                                type="file"
                                onChange={(e) => handleUploadImage(e)}
                            />
                        </Grid>
                        <Grid item xs={6} marginLeft={5}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="product_name"
                            label="Tên sản phẩm"
                            defaultValue={item.product_name}
                            onChange={(e) => handleChange(e)}
                            variant="outlined"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            select
                            autoFocus
                            margin="dense"
                            name="id_product_type"
                            value={item.id_product_type}
                            defaultValue={item.id_product_type}
                            label="Loại sản phẩm"
                            variant="outlined"
                            type="text"
                            onChange={(e) => handleSelectProductType(e)}
                            fullWidth
                        >
                        {names.map((option) => (
                            <MenuItem id={"id_product_type"} key={option._id} value={option._id}>
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
                            defaultValue={item.old_price = "0"}
                            value={item.old_price}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                                inputComponent: NumericFormatCustom,
                            }}
                            hidden
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="new_price"
                            label="Giá mới"
                            defaultValue={item.new_price}
                            onChange={(e) => handleChange(e)}
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{
                                disableAnimation: true,
                            }}
                            InputProps={{
                                inputComponent: NumericFormatCustom,
                            }}
                        />
                        <TextField
                            select
                            autoFocus
                            margin="dense"
                            name="product_status"
                            defaultValue={true}
                            value={item.product_status}
                            label="Trạng thái"
                            variant="outlined"
                            type="text"
                            onChange={(e) => handleSelectStatus(e)}
                            fullWidth
                        >
                            <MenuItem id="product_status" value={true}>Đang bán</MenuItem>
                            <MenuItem id="product_status" value={false}>Đã ngừng bán</MenuItem>
                        </TextField>
                        <TextField
                            autoFocus
                            margin="dense"
                            multiline
                            minRows={3}
                            maxRows={6}
                            name="description"
                            label="Mô tả"
                            defaultValue={item.description}
                            onChange={(e) => handleChange(e)}
                            variant="outlined"
                            type="text"
                            fullWidth
                            InputProps={{
                                style: {
                                    fontSize: 14,
                                }
                            }}
                        />
                        </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="contained" color="error">Huỷ bỏ</Button>
                    <Button type="submit" onClick={(e) => handleSubmit(e)} color="primary">Thêm mới</Button>
                </DialogActions>
            </StyledDialog>
            <ToastContainer />
        </React.Fragment>
    );
}