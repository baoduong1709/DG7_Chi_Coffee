import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faAnglesLeft, faBars, faGear, faHouse, faMoneyBills, faMugHot, faMugSaucer, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Box, Typography, IconButton } from "@mui/material";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

import { theme } from "../theme";

const themes = {
    sidebar: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.light.main,
    },
    menu: {
        menuContent: theme.palette.primary.main,
        menuText: theme.palette.light.main,
        icon: theme.palette.light.main,
        hover: {
            backgroundColor: theme.palette.primary.hover,
            color: theme.palette.light.hover,
        },
    },
}

const menu_item_styles = {
    root: {
        fontSize: '18px',
        fontWeight: 500,
        color: themes.menu.menuText,
    },
    icon: {
        color: themes.menu.icon,
    },
    button: {
        '&:hover': {
        backgroundColor: themes.menu.hover.backgroundColor,
        color: themes.menu.hover.color,
        },
    },
};

const AdminSide = [
    {
        id: 1,
        svg: faHouse,
        route: "../admin/dashboard",
        name: "Tổng quan"
    },
    {
        id: 2,
        svg: faUser,
        route: "../admin/employee",
        name: "Nhân viên"
    },
    {
        id: 3,
        svg: faMugHot,
        route: "../admin/product",
        name: "Sản phẩm"
    },
    {
        id: 4,
        svg: faMoneyBills,
        route: "../admin/dashboard",
        name: "Hoá đơn"
    },
    {
        id: 5,
        svg: faGear,
        route: "../admin/setting",
        name: "Cài đặt"
    },
    {
        id: 6,
        svg: faRightFromBracket,
        route: "../logout",
        name: "Đăng xuất"
    }
];

const EmployeeSide = [
    {
        id: 7,
        svg: faMugSaucer,
        route: "../admin/dashboard",
        name: "Đặt hàng"
    },
    {
        id: 4,
        svg: faMoneyBills,
        route: "../admin/dashboard",
        name: "Hoá đơn"
    },
    {
        id: 5,
        svg: faGear,
        route: "../admin/dashboard",
        name: "Cài đặt"
    },
    {
        id: 6,
        svg: faRightFromBracket,
        route: "../admin/dashboard",
        name: "Đăng xuất"
    }
];

export default function SideBarAdmin() {
    const [userData, setUserData] = useState('');
    const [selected, setSelected] = useState("Tổng quan");
    // const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();

    const [ collapsed, setCollapsed ] = useState(false);
    const [ toggled, setToggled ] = useState(false);
    const [ broken, setBroken ] = useState(false);

    
    useEffect(()=>{
        setUserData(() => JSON.parse(localStorage.getItem("user")))
    },[])

    let routeSide = userData.isAdmin === "true"?AdminSide:EmployeeSide;
    // console.log(routeSide);

    return(
        <Box
            sx={{
                position: "sticky",
                display: "flex",
                height: "100vh",
                top: 0,
                bottom: 0,
                zIndex: 10000,
                backgroundColor: themes.sidebar.backgroundColor,
                "& .sidebar": {
                border: "none",
                },
                "& .menu-icon": {
                backgroundColor: "transparent !important",
                },
                "& .menu-item": {
                // padding: "5px 35px 5px 20px !important",
                backgroundColor: "transparent !important",
                },
                "& .menu-anchor": {
                color: "inherit !important",
                backgroundColor: "transparent !important",
                },
                "& .menu-item:hover": {
                color: "primary.main !important",
                backgroundColor: "transparent !important",
                },
                "& .menu-item.active": {
                color: "primary.main !important",
                backgroundColor: "transparent !important",
                },
            }}
            >
            <Sidebar
                breakPoint="md"
                backgroundColor="secondary.main"
                collapsed={collapsed}
                toggled={toggled}
                onBackdropClick={() => setToggled(false)}
                onBreakPoint={setBroken}
            >
                <Menu menuItemStyles={menu_item_styles}>
                    <MenuItem
                        icon={
                            collapsed?
                            (<FontAwesomeIcon icon={faBars} onClick={() => setCollapsed(!collapsed)}/>):(<div hidden></div>)
                        }
                        color="primary.main"
                        style={{
                            margin: "10px 0 20px 0",
                            // color: colors.grey[100],
                        }}
                        >
                        {!collapsed && (
                            <Box
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="center"
                            ml="15px">
                                <IconButton
                                    onClick={
                                        broken ? () => setToggled(!toggled) : () => setCollapsed(!collapsed)
                                    }
                                    >
                                    <FontAwesomeIcon color={themes.menu.icon} icon={faAnglesLeft} />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>
                    <Box paddingLeft={collapsed ? undefined : "10%"}>
                        {routeSide.map((item) => {
                            return <MenuItem
                                key={item.id}
                                active={selected === item.name}
                                onClick={() => setSelected(item.name)}
                                icon={<FontAwesomeIcon icon={item.svg} />}
                                component={<Link to={item.route} />}
                                menuItemStyles={menu_item_styles}
                                >
                                <Typography fontStyle={menu_item_styles.root}>{item.name}</Typography>
                            </MenuItem>
                        })}
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    );
}