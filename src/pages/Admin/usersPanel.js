import React from "react";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {deleteUser} from "./adminSlice";

const UsersPanel = ({value, index, users}) => {
    const dispatch = useDispatch();

    const handleDeleteUser = (uid) => {
        dispatch(deleteUser(uid))
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
                                    <TableCell align={"left"} colSpan={2}><b>Username</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users && users.map(u => {
                                    return (
                                        <TableRow key={u.id}>
                                            <TableCell>{u.id}</TableCell>
                                            <TableCell>{u.username}</TableCell>
                                            <TableCell align={"right"}>
                                                <Button
                                                    color={"warning"}
                                                    size={"small"}
                                                    onClick={() => handleDeleteUser(u.id)}
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

export default UsersPanel;