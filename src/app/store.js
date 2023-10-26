import {configureStore} from '@reduxjs/toolkit';

import loginReducer from "../pages/Login/loginSlice";
import signupReducer from "../pages/Signup/signupSlice";
import homeReducer from "../pages/Home/homeSlice";
import cartReducer from "../components/Cart/cartSlice";
import adminSlice from "../pages/Admin/adminSlice";
import orderSlice from "../pages/Orders/orderSlice";

export const store = configureStore({
    reducer: {
        signup: signupReducer,
        login: loginReducer,
        home: homeReducer,
        cart: cartReducer,
        admin: adminSlice,
        order: orderSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});