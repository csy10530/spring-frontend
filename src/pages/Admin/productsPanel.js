import React from "react";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {deleteProduct} from "./adminSlice";

const ProductsPanel = ({value, index, products}) => {
    const dispatch = useDispatch();

    const handleDeleteProduct = (pid) => {
        dispatch(deleteProduct(pid))
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
                            <TableHead stickyHeader>
                                <TableRow>
                                    <TableCell align={"left"}><b>ID</b></TableCell>
                                    <TableCell align={"left"}><b>Name</b></TableCell>
                                    <TableCell align={"left"}><b>Price</b></TableCell>
                                    <TableCell align={"left"}><b>Stock</b></TableCell>
                                    <TableCell align={"left"}><b>Description</b></TableCell>
                                    <TableCell align={"left"} colSpan={2}><b>Image</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products && products.map(p => {
                                    return (
                                        <TableRow key={p.id}>
                                            <TableCell>{p.id}</TableCell>
                                            <TableCell>{p.name}</TableCell>
                                            <TableCell>{p.price}</TableCell>
                                            <TableCell>{p.stock}</TableCell>
                                            <TableCell>{p.description}</TableCell>
                                            <TableCell>{p.image}</TableCell>
                                            <TableCell align={"right"}>
                                                <Button
                                                    color={"warning"}
                                                    size={"small"}
                                                    onClick={() => handleDeleteProduct(p.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </div>
    )
}

export default ProductsPanel;