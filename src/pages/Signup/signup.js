import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useNavigate} from "react-router-dom";
import {createTheme} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Button from "@mui/material/Button"
import TextField from '@mui/material/TextField';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import {registerUser} from "./signupSlice";

const SignupSchema = yup.object().shape({
    username: yup.string().required("Required"),
    password: yup.string()
        .min(4, "Too short")
        .max(15, "Too long")
        .required("Required")
});

export const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = createTheme();

    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: SignupSchema,
        onSubmit: async (value, {setSubmitting}) => {
            await dispatch(registerUser(value));
            setSubmitting(false);
            navigate("/login");
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}
              style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  width: 400,
                  margin: `${theme.spacing(0)} auto`
              }}>
            <Card sx={{
                marginTop: theme.spacing(10)
            }}>
                <CardHeader title="Signup" sx={{
                    textAlign: 'center',
                    background: '#212121',
                    color: '#fff'
                }}/>
                <CardContent>
                    <TextField
                        id="username"
                        name="username"
                        label="Username"
                        margin="normal"
                        fullWidth
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />

                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        margin="normal"
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    onClick={() => {
                                        setShowPassword(!showPassword)
                                    }}
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                </CardContent>

                <CardActions>
                    <Button
                        color="secondary"
                        size="large"
                        variant="contained"
                        type="submit"

                        sx={{
                            marginTop: theme.spacing(2),
                            flexGrow: 1
                        }}>
                        Create Account
                    </Button>
                </CardActions>
            </Card>

        </form>
    );
}