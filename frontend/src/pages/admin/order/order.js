import React from 'react';
import { OrderContext } from '~/context/ordersContext';
import { Box, Grid, Button, Typography, Stack, Paper, Tabs, Tab, CardMedia, Autocomplete, TextField, DialogContent, DialogTitle } from '@mui/material';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import { StyledDialog, StyledTableRow, StyledTableCell, theme } from '~/components/private_layout/theme';

import { productsAPI } from '~/api/product';
import { tablesAPI } from '~/api/table';
import { customersAPI } from '~/api/customer';
import { orderAPI } from '~/api/order';
import { ToastContainer, toast } from 'react-toastify';
import { ToastOption } from '~/components';

const ItemPicker = ({ item }) => {
    const { addToOrder } = React.useContext(OrderContext);

    const handleAddOrder = (event) => {
        event.preventDefault();
        addToOrder(item);
    }
    return (
        <React.Fragment>
            <Card sx={{ display: 'flex', direction: 'row', paddingX: 1, paddingY: 1, border: 1, cursor:"pointer" }} onClick={(e)=> handleAddOrder(e)}>
                <CardMedia
                    component={"img"}
                    image={item.product_image}
                    height={"80"}
                    sx={{objectFit: "scale-down", width: "30%"}}
                    alt=""    
                />        
                <Typography variant="subtitle1" marginTop={3}>{item.product_name}</Typography>
            </Card>
        </React.Fragment>
        
    );
};

const OrderedItem = ({ item }) => {
    const { addToOrder, removeItemOrder } = React.useContext(OrderContext);

    const handleAddItem = (event) => {
        event.preventDefault();
        addToOrder(item);
    }
    const handleSubtractItem = (event) => {
        event.preventDefault();
        removeItemOrder(item);
    }
    return (
        <Card sx={{ display: "table-row", direction: "column", paddingX: 1, paddingY: 1, border: 1, minHeight: 60, marginTop: 1, borderColor:theme.palette.primary.main }}>       
            <Typography variant="subtitle1" width={"100%"}>{item.product_name}</Typography>
            <Grid 
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
            >
                <Button variant='outlined' size="small" onClick={(e) => handleSubtractItem(e)}>-</Button>
                <Typography variant="subtitle1" marginX={1}>{item.quantity}</Typography>
                <Button variant="outlined" size="small" onClick={(e) => handleAddItem(e)}>+</Button>
            </Grid>
        </Card>
    );
};

function CustomTabPanel({ value, index, id }) {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        const getProductListByType = async () => {
            try {
                const res = await productsAPI.getAllByType(id);
                setItems(res);
                setIsLoading(false);
            } catch (err) {
                let status = err.status;
                let data = err.data;
                toast.error('Lỗi ' + status + ': ' + data, ToastOption);
                setIsLoading(false);
            }
        };
        getProductListByType();
    }, []);
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
            <Box>
                <Grid container direction="row" columns={3} spacing={2}>
                    
                    {isLoading?
                        <Box marginTop={2} marginX={5}>
                            <Typography variant='h5'>Đang tải...</Typography>
                        </Box>
                    :items.filter((item) => item.product_status === true).map((item) => {
                        return (
                            <Grid item xs={1} key={item._id}>
                                <ItemPicker key={item._id} item={item} />
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
            )}
        </div>
    );
}
  
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function EmployeeOrder() {
    const [value, setValue] = React.useState(0);
    const [customers, setCustomers] = React.useState([]);
    const [tables, setTables] = React.useState([]);
    const [table, setTable] = React.useState("");
    const [gmail, setGmail] = React.useState(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const { orderItems, clearOrder, getOrderTotal } = React.useContext(OrderContext);

    const tabs = [
        {
            key: 0,
            index: 0,
            label: "Cà phê",
            id:"coffee",
        },
        {
            key: 1,
            index: 1,
            label: "Frezee",
            id:"frezee",
        },
        {
            key: 2,
            index: 2,
            label: "Trà",
            id:"tea",
        },
        {
            key: 3,
            index: 3,
            label: "Bánh ngọt",
            id:"cake",
        }
    ];
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const TableDialog = ({isDialogOpened, handleCloseDialog}) => {
        const handleTable = (event, name) => {
            event.preventDefault();
            setTable(name);
            setTimeout(handleCloseDialog, 0);
        }
        return(
            <React.Fragment>
                <StyledDialog open={isDialogOpened} onClose={handleCloseDialog} maxWidth={"xs"} fullWidth={true}>
                    <DialogTitle>Chọn bàn</DialogTitle>
                    <DialogContent>
                    {tables.map((table) => {
                            return (
                                <Button 
                                    key={table._id} 
                                    variant="outlined" 
                                    sx={{margin: 2}} 
                                    disabled={table.status}
                                    onClick={(e) => handleTable(e, table.name)}
                                    >{table.name}</Button>
                            );
                        })}
                    </DialogContent>
                </StyledDialog>
            </React.Fragment>
        );
    } 

    React.useEffect(() => {
        const getCustomerList = async () => {
            try {
                const res = await customersAPI.getAll();
                setCustomers(res);
            } catch (err) {
                let status = err.status;
                let data = err.data;
                toast.error('Lỗi ' + status + ': ' + data, ToastOption);
            }
        };
        getCustomerList();
    }, []);

    React.useEffect(() => {
        const getTableList = async () => {
            try {
                const res = await tablesAPI.getAll();
                setTables(res);
            } catch (err) {
                let status = err.status;
                let data = err.data;
                toast.error('Lỗi ' + status + ': ' + data, ToastOption);
            }
        };
        getTableList();
    }, []);

    const handleOrdering = async (event) => {
        event.preventDefault();
        if(orderItems.length === 0) {
            toast.warning("Đơn hàng trống", ToastOption);
        }
        else if(table === "") {
            toast.warning("Chưa chọn bàn", ToastOption);
        } else {
            const data = orderItems?.map((item) => ({
                product_id: item._id,
                product_name: item.product_name,
                quanlity: item.quantity,
            }));

            const ordered_item = {
                product: data,
                cost: getOrderTotal(),
                amount: orderItems.length,
                table_name: table,
                status: false,
                customer_gmail: gmail,
            }

            try {
                const res = await orderAPI.create(ordered_item);
                toast.success(res, ToastOption);
                clearOrder();
                setGmail(null);
                setTable("");
            } catch (err) {
                let status = err.status;
                let data = err.data;
                toast.error('Lỗi ' + status + ': ' + data, ToastOption);
            }
        }
    }

    const handleOrderingConfirmed = async (event) => {
        event.preventDefault();
        if(orderItems.length === 0) {
            toast.warning("Đơn hàng trống", ToastOption);
        } else if(table === "") {
            toast.warning("Chưa chọn bàn", ToastOption);
        } else {
            const data = orderItems?.map((item) => ({
                product_id: item._id,
                product_name: item.product_name,
                quanlity: item.quantity,
            }));

            const ordered_item = {
                product: data,
                cost: getOrderTotal(),
                amount: orderItems.length,
                table_name: table,
                status: true,
                customer_gmail: gmail,
            }

            try {
                const res = await orderAPI.create(ordered_item);
                toast.success(res, ToastOption);
                clearOrder();
                setGmail(null);
                setTable("");
            } catch (err) {
                let status = err.status;
                let data = err.data;
                toast.error('Lỗi ' + status + ': ' + data, ToastOption);
            }
        }
    }

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };

    return (
        <Box m="1.5rem 2.5rem" width="95%">
            <Box sx={{marginTop:2, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Typography variant='h3'>Đặt hàng tại chỗ</Typography>
                <Box display={"flex"} flexDirection={"row"}>
                    <Button variant={table === ""?"outlined":"contained"} sx={{marginX: 2}} onClick={() => setDialogOpen(true)} color={"secondary"}>{table === ""? "Chọn bàn": table}</Button>
                    <Box sx={{width:250}}>
                        <Autocomplete
                            id="free-solo-demo"
                            size='small'
                            freeSolo
                            onChange={(e, value)=> setGmail(value)}
                            options={customers.map((option) => option.gmail)}
                            renderInput={(params) => <TextField {...params} label="Tìm kiếm gmail" />}
                        />
                    </Box> 
                </Box>
                
            </Box>
            <Box mt="40px" height="75vh" display={"flex"} flexDirection={"row"}>
                <Paper sx={{ width: '70%', marginRight: 2, overflow: "auto" }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            {tabs?.map((aTab) => {
                                return(
                                    <Tab sx={{fontSize: 14}} label={aTab.label} key={aTab.key} {...a11yProps(aTab.index)} />
                                );
                            })}
                        </Tabs>
                    </Box>
                    {tabs?.map((child) => {
                        return(
                            <CustomTabPanel key={child.id} value={value} index={child.index} id={child.id} />
                        );
                    })}
                </Paper>
                <Paper sx={{ width: '30%', overflow: "inherit" }}>
                    <Box height={"85%"} overflow={"auto"}>
                        <Grid 
                            container
                            direction="column"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <Grid item borderBottom={2}>
                                <Box marginBottom={1} width={"100%"}>
                                    <Typography variant="h3" fontWeight={500} color={"primary"}>Đơn hàng</Typography>
                                </Box>
                            </Grid>
                            <Grid item sx={{width: "100%"}}> 
                                <Stack>
                                {orderItems?.map((item) => {
                                    return(
                                        <OrderedItem key={item._id} item={item} />
                                    );
                                })}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box marginTop={1} height={"15%"}>
                        <Grid container
                            direction="column"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <Grid item>
                                <Box marginY={1} display={"flex"} flexDirection={"row"}>
                                    <Typography variant="subtitle1" fontSize={18} marginRight={1}>Tổng:</Typography>
                                    <Typography variant="subtitle1" fontSize={18} color={"primary"}>{formatter.format(getOrderTotal()).replace(/₫/g, 'VND')}</Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box>
                                    <Button variant="outlined" color="error" onClick={() => clearOrder()}>Huỷ đơn</Button>
                                    <Button variant="contained" color="secondary" sx={{marginX: 2}} onClick={(e) => handleOrdering(e)}>Đặt hàng</Button>
                                    <Button variant="contained" color="primary" onClick={(e) => handleOrderingConfirmed(e)}>Xác nhận</Button>
                                </Box>
                            </Grid>
                        </Grid> 
                    </Box>
                </Paper>
            </Box>
            <TableDialog
            key={"table"}
            isDialogOpened={dialogOpen}
            handleCloseDialog={() => setDialogOpen(false)} />
            <ToastContainer />
        </Box>
    );
}
