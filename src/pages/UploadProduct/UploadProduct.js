import React from "react";
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import {createTheme, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {addProduct} from "../Admin/adminSlice";
import NavigationBar from "../../components/NavBar/nav";
import {useDispatch} from "react-redux";
import Cart from "../../components/Cart/cart";

const UploadProduct = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const theme = createTheme();

    const formik = useFormik({
        initialValues: {
            name: "",
            price: 1.0,
            stock: 1,
            description: "",
            image: "",
        },
        onSubmit: (values) => {
            dispatch(addProduct({
                name: values.name,
                price: values.price,
                stock: 1,
                description: values.description,
                image: values.image
            }))
                .then(res => navigate("/"))
                .catch(err => {
                    console.log(err);
                });
        },
    });

    return (
        <>
            <NavigationBar/>
            <Cart/>
            <Box className="container">
                <Typography variant={"h3"} style={{
                    margin: `${theme.spacing(5)} auto`
                }}>
                    Upload Product
                </Typography>
                <form onSubmit={formik.handleSubmit}
                      style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          width: 400,
                          margin: `${theme.spacing(0)} auto`
                      }}>
                    <TextField
                        id="name"
                        name="name"
                        label="Product Name"
                        margin="normal"
                        fullWidth
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        id="price"
                        name="price"
                        label="Price ($)"
                        type="number"
                        margin="normal"
                        fullWidth
                        value={formik.values.price}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        id="description"
                        name="description"
                        label="Product Description"
                        margin="normal"
                        fullWidth
                        multiline
                        rows={5}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        id="image"
                        name="image"
                        label="Product Image"
                        margin="normal"
                        fullWidth
                        multiline
                        rows={5}
                        value={formik.values.image}
                        onChange={formik.handleChange}
                    />
                    <Button type={"submit"}>Submit</Button>
                </form>
            </Box>
        </>
    )
}

export default UploadProduct;