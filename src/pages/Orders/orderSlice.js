import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({withCredentials: true, baseURL: "http://ec2-54-89-68-55.compute-1.amazonaws.com:8080"});

const initialState = {
    userOrders: []
}

export const getUserOrders = createAsyncThunk("orders/getUserOrders",
    async (username, {rejectWithValue}) => {
        try {
            console.log("username: " + username);
            const res = await API.get(`/orders/user/${username}`);
            console.log(res.data);
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            console.log(err.response);
            return rejectWithValue(err.response);
        }
    }
);

export const createOrder = createAsyncThunk("orders/createOrder",
    async (orderInfo, {rejectWithValue}) => {
        try {
            const res = await API.post("/orders", orderInfo);
            console.log(res);
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

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserOrders.fulfilled, (state, action) => {
                console.log(action.payload);
                state.userOrders = action.payload;
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                console.log(action);
            })
            .addCase(createOrder.rejected, (state, action) => {
                console.log(action);
            });
    }
});

export const {} = orderSlice.actions;

export const selectUserOrders = (state) => state.order.userOrders;

export default orderSlice.reducer;