import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import qs from "qs";

const initialState = {
    helperText: "",
    error: false,
    status: "pending"
}

const API = axios.create({withCredentials: true, baseURL: "http://ec2-54-89-68-55.compute-1.amazonaws.com:8080"});

export const userLogin = createAsyncThunk("users/login",
    async (userInfo, {rejectWithValue}) => {

        try {
            const res = await API.post("/login", qs.stringify(userInfo));
            //console.log(JSON.stringify(res.data.message));
            localStorage.setItem("user", userInfo.username);
            localStorage.setItem("admin", res.data.message)
            return res;
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            console.log(err.response);
            return rejectWithValue(err.response);
        }
    }
);

export const userLogout = createAsyncThunk("users/logout",
    async () => {
        const res = await API.post("/logout");

        localStorage.removeItem("user");
        localStorage.removeItem("admin");
        localStorage.removeItem("cart");
        console.log(res);
        return res;
    }
);

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.helperText = action.payload;
            state.error = false;
        },
        loginFailed: (state, action) => {
            console.log(action)
            state.helperText = action.payload;
            state.error = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                console.log(action);
                state.status = "success"
            })
            .addCase(userLogin.rejected, (state, action) => {
                console.log("err: " + action.error);
                state.status = "failed";
            })
    }
});

export const {
    loginSuccess,
    loginFailed,
} = loginSlice.actions;

export const selectHelperText = (state) => state.login.helperText;
export const selectError = (state) => state.login.error;
export const selectStatus = (state) => state.login.status;

export default loginSlice.reducer;