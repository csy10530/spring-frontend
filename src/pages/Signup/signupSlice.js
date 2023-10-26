import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    success: false,
    error: null
}

const API = axios.create({withCredentials: true, baseURL: "http://ec2-54-89-68-55.compute-1.amazonaws.com:8080"});

export const registerUser = createAsyncThunk("users/register",
    async (userInfo, thunkAPI) => {
        const res = await API.post("/users", userInfo);
        console.log(res);
        return res;
    });

export const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log(action.payload);
                state.success = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log(action.payload, action.error);
                state.success = false;
                state.error = action.error;
            })
    }
});

export default signupSlice.reducer;