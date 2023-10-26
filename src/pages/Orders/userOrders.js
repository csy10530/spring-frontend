import React, {useEffect} from "react";
import NavigationBar from "../../components/NavBar/nav";
import {useDispatch, useSelector} from "react-redux";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Cart from "../../components/Cart/cart";
import {getUserOrders, selectUserOrders} from "./orderSlice";
import {useNavigate} from "react-router-dom";

const UserOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userOrders = useSelector(selectUserOrders);

    const fetchUserOrders = async () => {
        await dispatch(getUserOrders(
            localStorage.getItem("user")
        ));
    }

    useEffect(() => {
        if (!localStorage.getItem("user")) {
            navigate("/login");
        }
        fetchUserOrders();
    }, []);

    return (
        <React.Fragment>
            <NavigationBar/>
            <Cart/>
            <div className="table-container">
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} size={"medium"}>
                        {(!userOrders || userOrders.length === 0) &&
                            <div>
                                You don't have any orders
                            </div>}
                        {userOrders && userOrders.map(o => {
                            return (
                                <React.Fragment key={o.id}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align={"center"} colSpan={4}>
                                                ID: {o.id}, Date: {o.purchaseDate}
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {o.purchases && o.purchases.map(p => {
                                            return (
                                                <TableRow key={p.id}>
                                                    <TableCell>ID: {p.id}</TableCell>
                                                    <TableCell>Name: {p.product.name}</TableCell>
                                                    <TableCell>Quantity: {p.qty}</TableCell>
                                                    <TableCell>Price: {p.product.price}</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                        <TableRow>
                                            <TableCell align={"center"} colSpan={4}>
                                                Order Total: ${o.purchases.reduce((total, item) => {
                                                total += item.qty * item.product.price;
                                                return total;
                                            }, 0)}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </React.Fragment>
                            )
                        })}
                    </Table>
                </TableContainer>
            </div>
        </React.Fragment>
    )
}

export default UserOrders;