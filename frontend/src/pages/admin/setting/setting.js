import React from "react";
import { Box, Container, Typography, Grid, TextField, Button } from "@mui/material";

export default function Setting() {
    const [open, setOpen] = React.useState(false);
    return(
        <Container sx={{ alignItems: "center", width: "100%" }}>
            <Box sx={{marginY:5}}>
                <Typography variant='h3'>Chỉnh sửa thông tin</Typography>
            </Box>
            <Box>
                <Grid container direction="column">
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
                </Grid>
                <Grid container>
                    <Button variant="contained" color="primary">
                        Xác nhận
                    </Button>
                </Grid>
            </Box>
        </Container>
    );
}