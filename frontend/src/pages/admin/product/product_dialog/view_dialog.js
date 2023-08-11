import React from 'react';
import { DialogActions, DialogContent, DialogTitle, TextField, Button, Grid } from '@mui/material';
import { StyledDialog, NumericFormatCustom } from '~/components/private_layout/theme';
import { convertName } from './convert_name';

export const FormDialog = ({ isDialogOpened, item, handleCloseDialog }) => {
    return (
        <React.Fragment>
            <StyledDialog open={isDialogOpened} onClose={handleCloseDialog} fullWidth maxWidth={'lg'}>
                <DialogTitle>{item.product_name}</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Grid item xs={5} style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={item.product_image} style={{ maxHeight: '300px', maxWidth: '300px' }} />
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="product-type"
                            label="Loại"
                            variant="outlined"
                            type="text"
                            defaultValue={convertName(item.id_product_type)}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        {item.old_price !== '0' ? (
                            <TextField
                                autoFocus
                                margin="dense"
                                id="old_price"
                                label="Giá cũ"
                                variant="outlined"
                                defaultValue={item.old_price}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                    inputComponent: NumericFormatCustom,
                                }}
                            />
                        ) : (
                            <></>
                        )}
                        <TextField
                            autoFocus
                            margin="dense"
                            id="new_price"
                            label="Giá mới"
                            variant="outlined"
                            defaultValue={item.new_price}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                                inputComponent: NumericFormatCustom,
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="product_status"
                            label="Trạng thái"
                            variant="outlined"
                            type="text"
                            defaultValue={item.product_status === true ? 'Đang bán' : 'Đã ngừng bán'}
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
                                style: { fontSize: 14 },
                            }}
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Đóng lại</Button>
                </DialogActions>
            </StyledDialog>
        </React.Fragment>
    );
};
