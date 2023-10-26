import React, {useEffect, useState} from "react";
import NavigationBar from "../../components/NavBar/nav";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllOrders, getAllUsers, selectOrders, selectUsers} from "./adminSlice";
import {Box, Tab, Tabs} from "@mui/material";
import UsersPanel from "./usersPanel";
import {getAllProducts, selectProducts} from "../Home/homeSlice";
import OrdersPanel from "./ordersPanel";
import ProductsPanel from "./productsPanel";
import Cart from "../../components/Cart/cart";

const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const orders = useSelector(selectOrders);
    const users = useSelector(selectUsers);
    const products = useSelector(selectProducts);

    const [idx, setIdx] = useState(0);

    useEffect(() => {
        if (!localStorage.getItem("user") || !localStorage.getItem("admin")
            || localStorage.getItem("admin") !== "true") {
            navigate("/login");
        }
        dispatch(getAllUsers());
        dispatch(getAllOrders());
        dispatch(getAllProducts());
    }, []);

    const handleTabSwitch = (e, i) => {
        setIdx(i);
    }

    return (
        <React.Fragment>
            <NavigationBar/>
            <Cart/>
            <Box sx={{width: "100%"}}>
                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                    <Tabs value={idx} onChange={handleTabSwitch}>
                        <Tab label={"Users"}/>
                        <Tab label={"Orders"}/>
                        <Tab label={"Products"}/>
                    </Tabs>
                </Box>
                <UsersPanel value={idx} index={0} users={users}/>
                <OrdersPanel value={idx} index={1} orders={orders}/>
                <ProductsPanel value={idx} index={2} products={products}/>
            </Box>
        </React.Fragment>
    )
}

export default Admin;