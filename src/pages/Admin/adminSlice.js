import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({withCredentials: true, baseURL: "http://ec2-54-89-68-55.compute-1.amazonaws.com:8080"});

const initialState = {
    orders: [],
    users: []
}

export const getAllUsers = createAsyncThunk("admin/getAllUsers",
    async (_, {rejectWithValue}) => {
        try {
            const res = await API.get(`/users`);
            console.log(res);
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

export const deleteUser = createAsyncThunk("admin/deleteUser",
    async (userId, {rejectWithValue}) => {
        try {
            const res = await API.delete(`/users/${userId}`);
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

export const updateProduct = createAsyncThunk("admin/updateProduct",
    async (productInfo, {rejectWithValue}) => {

        try {
            const res = await API.put(`/products/${productInfo.id}`, productInfo);
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

export const addProduct = createAsyncThunk("admin/addProduct",
    async (productInfo, {rejectWithValue}) => {
        try {
            const res = await API.post("/products", productInfo);
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

export const getAllOrders = createAsyncThunk("admin/getAllOrders",
    async (_, {rejectWithValue}) => {
        try {
            const res = await API.get("/orders/all");
            console.log(res);
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

export const deleteOrder = createAsyncThunk("admin/deleteOrder",
    async (orderId, {rejectWithValue}) => {
        try {
            const res = await API.delete(`/orders/${orderId}`);
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

export const deleteProduct = createAsyncThunk("admin/deleteProduct",
    async (productId, {rejectWithValue}) => {
        try {
            const res = await API.delete(`/products/${productId}`);
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

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateProduct.rejected, (state, action) => {
                console.log(action);
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                console.log(action.payload);
                state.orders = action.payload;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            });
    }
});

export const {} = adminSlice.actions;

export const selectOrders = (state) => state.admin.orders;
export const selectUsers = (state) => state.admin.users;

export default adminSlice.reducer;