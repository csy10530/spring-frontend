import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: []
}

const API = axios.create({withCredentials: true, baseURL: "http://ec2-54-89-68-55.compute-1.amazonaws.com:8080"});

export const getAllProducts = createAsyncThunk("home/products",
    async () => {
        try {
            const res = await API.get("/products");
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err
            }
        }
    }
);

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                console.log(action);
            })
    }
});

export const selectProducts = (state) => state.home.products;
export default homeSlice.reducer;