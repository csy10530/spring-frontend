import {AppBar, Badge, Stack, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {Link as RouterLink} from "react-router-dom";
import React from "react";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useDispatch, useSelector} from "react-redux";
import {userLogout} from "../../pages/Login/loginSlice";
import {selectCartItems, selectCartOpen, toggleCart} from "../Cart/cartSlice";

const NavigationBar = () => {
    const dispatch = useDispatch();

    const isAdmin = localStorage.getItem("admin") === "true";
    const currentUser = localStorage.getItem("user") || null;
    const isLoggedIn = !!currentUser;

    const cartOpen = useSelector(selectCartOpen);
    const cartItems = useSelector(selectCartItems);

    const handleLogout = async () => {
        await dispatch(userLogout());
        window.location.reload();
    }

    const handleCartOpen = () => {
        dispatch(toggleCart(!cartOpen));
    }

    return (
        <AppBar position={"static"} color="transparent">
            <Toolbar>
                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    color="inherit"
                    sx={{
                        flexGrow: 1,
                        textTransform: "none",
                        textDecoration: "none"
                    }}>
                    Home
                </Typography>

                <Stack direction="row" spacing={2}>
                    <Badge badgeContent={cartItems.length} color={"primary"}>
                        <ShoppingCartOutlinedIcon fontSize={"large"} onClick={handleCartOpen}/>
                    </Badge>

                    <Button
                        component={RouterLink}
                        to="/upload"
                        color="inherit"
                        sx={{
                            textTransform: "none",
                            display: isAdmin ? "" : "none"
                        }}
                    >
                        Upload Product
                    </Button>

                    {isAdmin && <Button
                        component={RouterLink}
                        to="/admin"
                        color="inherit"
                        sx={{
                            textTransform: "none"
                        }}
                    >
                        Admin
                    </Button>}

                    {isLoggedIn && <Button
                        component={RouterLink}
                        to="/orders"
                        color="inherit"
                        sx={{
                            textTransform: "none"
                        }}
                    >
                        MyOrders
                    </Button>}

                    {!isLoggedIn &&
                        <Button
                            component={RouterLink}
                            to="/signup"
                            color="inherit"
                            sx={{textTransform: "none"}}
                        >
                            Signup
                        </Button>}

                    {isLoggedIn && currentUser ?
                        <Button
                            color="inherit"
                            onClick={handleLogout}
                            sx={{textTransform: "none"}}
                        >
                            {currentUser}
                        </Button> :
                        <Button
                            component={RouterLink}
                            to="/login"
                            color="inherit"
                            sx={{textTransform: "none"}}
                        >
                            Login
                        </Button>}
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default NavigationBar;