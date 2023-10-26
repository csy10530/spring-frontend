import React from "react";
import {useDispatch} from "react-redux";

import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import {createTheme} from "@mui/material";
import {useFormik} from "formik";
import {updateProduct} from "../../pages/Admin/adminSlice";

import "./updateProduct.css";

const UpdateProduct = ({product, editing, cancel}) => {
    const dispatch = useDispatch();
    const theme = createTheme();

    const formik = useFormik({
        initialValues: {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image
        },
        onSubmit: async (value, {setSubmitting}) => {
            console.log(value);
            await dispatch(updateProduct(value));
            setSubmitting(false);
            window.location.reload();
        },
    });
    return (
        <form className={"update-product-form"} onSubmit={formik.handleSubmit} noValidate autoComplete="off"
              style={{
                  display: editing ? 'flex' : "none",
                  flexWrap: 'wrap',
                  width: 400,
                  margin: `${theme.spacing(0)} auto`
              }}>
            <Card sx={{
                marginTop: theme.spacing(10)
            }}>
                <CardHeader title="Edit Product" sx={{
                    textAlign: 'center',
                    background: '#212121',
                    color: '#fff'
                }}/>
                <CardContent>
                    <div>
                        <TextField
                            fullWidth
                            id="name"
                            type="text"
                            label="Name"
                            margin="normal"
                            defaultValue={product.name}
                            InputLabelProps={{shrink: true}}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            fullWidth
                            id="price"
                            type="number"
                            label="Price"
                            margin="normal"
                            defaultValue={product.price}
                            InputLabelProps={{shrink: true}}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            fullWidth
                            id="description"
                            type="text"
                            label="Description"
                            margin="normal"
                            defaultValue={product.description}
                            InputLabelProps={{shrink: true}}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            fullWidth
                            id="image"
                            type="text"
                            label="Image Link"
                            margin="normal"
                            defaultValue={product.image}
                            InputLabelProps={{shrink: true}}
                            onChange={formik.handleChange}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        sx={{
                            marginTop: theme.spacing(2),
                            flexGrow: 1
                        }}
                        onClick={cancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        type="submit"
                        sx={{
                            marginTop: theme.spacing(2),
                            flexGrow: 1
                        }}
                    >
                        Submit
                    </Button>
                </CardActions>
            </Card>
        </form>
    )
}

export default UpdateProduct;