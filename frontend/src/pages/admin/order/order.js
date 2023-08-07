import React, { useEffect } from 'react';
import { Box, Grid, Button, Typography, Stack } from '@mui/material';
import Card, { CardClasses } from '@mui/material/Card';
import { StyledButton } from '~/components/private_layout/theme';

import productApi from '~/api/customer/productApi';

const ItemPicker = ({ item }) => {
    const [count, setCount] = React.useState(0);
    const decrease = () => {
        if (count < 1) {
            setCount(0);
        } else {
            setCount(count - 1);
        }
    };
    const increase = () => {
        setCount(count + 1);
    };
    return (
        <Card sx={{ display: 'flex', direction: 'collumn', paddingX: 1, paddingY: 1, border: 1 }}>
            <Grid container direction="column">
                <Grid item direction="row" justifyContent="flex-start">
                    <Typography variant="h5">{item.product_name}</Typography>
                </Grid>
                <Grid item container direction="row" justifyContent="flex-end" alignItems="center">
                    <Button sx={{ fontSize: 14, padding: 0, marginX: 1 }} variant="outlined" onClick={decrease}>
                        -
                    </Button>
                    <Typography variant="h5">{count}</Typography>
                    <Button sx={{ fontSize: 14, padding: 0, marginX: 1 }} variant="outlined" onClick={increase}>
                        +
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
};
export default function EmployeeOrder() {
    const [items, setItems] = React.useState([]);

    useEffect(() => {
        const getProductList = async () => {
            try {
                const res = await productApi.getAll();
                setItems(res);
            } catch (err) {
                console.log(err);
            }
        };
        getProductList();
    }, []);
    return (
        <Box m="1.5rem 2.5rem" width="95%">
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h2">Đặt hàng</Typography>
                <Button variant="contained">Thêm mới</Button>
            </Grid>
            <Grid container direction="row">
                <Grid item container direction="row" xs={8} columns={3} spacing={2}>
                    {items.map((item) => {
                        return (
                            <Grid item xs={1}>
                                <ItemPicker key={item._id} item={item} />
                            </Grid>
                        );
                    })}
                </Grid>
                <Grid item xs={4} direction="column" alignItems="stretch">
                    <Typography>Đặt hàng</Typography>
                    <Stack></Stack>
                    <Box></Box>
                </Grid>
            </Grid>
        </Box>
    );
}
