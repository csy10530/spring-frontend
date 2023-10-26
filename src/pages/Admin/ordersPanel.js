import {useDispatch} from "react-redux";
import {deleteOrder} from "./adminSlice";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";

const OrdersPanel = ({value, index, orders}) => {
    const dispatch = useDispatch();

    const handleDeleteOrder = (oid) => {
        dispatch(deleteOrder(oid))
            .then(res => window.location.reload())
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div
            hidden={value !== index}
        >
            {value === index && (
                <Box>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} size={"medium"}>
                            {(!orders || orders.length === 0) &&
                                <div>
                                    You don't have any orders
                                </div>}
                            {orders && orders.map(o => {
                                return (
                                    <React.Fragment key={o.id}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align={"center"} colSpan={3}>
                                                    <b>
                                                        ID: {o.id}, Date: {o.purchaseDate}, BuyerId: {o.user.id},
                                                        BuyerName: {o.user.username},
                                                        Role: {o.user.profiles[0].authority}
                                                    </b>
                                                </TableCell>
                                                <TableCell>
                                                    <Button color={"warning"} size={"small"}
                                                            onClick={() => handleDeleteOrder(o.id)}>
                                                        Delete
                                                    </Button>
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
                </Box>
            )}
        </div>
    )
}

export default OrdersPanel;