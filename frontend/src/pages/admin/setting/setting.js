import React from "react";
import { Box, Container, Typography, Grid, TextField } from "@mui/material";

export default function Setting() {
    return(
        <Container sx={{ alignItems: "center", width: "100%" }}>
            <Box sx={{marginY:5}}>
                <Typography variant='h3'>Chỉnh sửa thông tin</Typography>
            </Box>
            <Box>
                <Grid container direction="column">
                    <Grid item>
                        <TextField id="username" variant='standard' value="bao1709" />
                        <TextField id="role" variant='standard' value="manager" />
                    </Grid>
                    <Grid item>
                        <TextField id="fullname" variant='standard' value="name" />
                    </Grid>
                    <Grid item>
                        <TextField id="dateofbirth" variant='standard' value="17/06/2002" />
                        <TextField id="gender" variant='standard' value="nam" />
                    </Grid>
                    <Grid item>
                        <TextField id="ssn" variant='standard' value="0123456789012" />
                    </Grid>
                    <Grid item>
                        <TextField id="ssn" variant='standard' value="0123456789012" />
                    </Grid>
                    <Grid item>
                        <TextField id="address" variant='standard' value="33 Tran Quang Dieu, Geng Rang, Quy Nhon, ABC XYZKLAJHDKJLASD" />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}