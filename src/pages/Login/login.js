import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import {createTheme} from "@mui/material";
import {useFormik} from "formik";
import {loginFailed, loginSuccess, selectError, selectHelperText, selectStatus, userLogin} from "./loginSlice";

const Login = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const theme = createTheme();

    const loginHelperText = useSelector(selectHelperText);
    const loginError = useSelector(selectError);
    const loginStatus = useSelector(selectStatus);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: async (value, {setSubmitting}) => {
            await dispatch(userLogin(value));
            setSubmitting(false);
        },
    });

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
            if (loginStatus === "success") {
                dispatch(loginSuccess('Login Successfully'));
                navigate("/");
            } else if (loginStatus === "failed") {
                dispatch(loginFailed("Incorrect username or password"));
            }
    }, [loginStatus]);

    return (
        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off"
              style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  width: 400,
                  margin: `${theme.spacing(0)} auto`
              }}>
            <Card sx={{
                marginTop: theme.spacing(10)
            }}>
                <CardHeader title="Login" sx={{
                    textAlign: 'center',
                    background: '#212121',
                    color: '#fff'
                }}/>
                <CardContent>
                    <div>
                        <TextField
                            fullWidth
                            error={loginError}
                            id="username"
                            type="text"
                            label="Username"
                            placeholder="Username"
                            margin="normal"
                            onChange={formik.handleChange}
                        />
                        <TextField
                            fullWidth
                            error={loginError}
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="Password"
                            margin="normal"
                            helperText={loginHelperText}
                            onChange={formik.handleChange}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        type="submit"
                        disabled={!formik.values.username || !formik.values.password}
                        sx={{
                            marginTop: theme.spacing(2),
                            flexGrow: 1
                        }}
                    >
                        Login
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}

export default Login;