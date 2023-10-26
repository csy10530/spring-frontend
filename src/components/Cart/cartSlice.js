import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    open: false,
    items: JSON.parse(localStorage.getItem("cart")) || []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        toggleCart: (state, action) => {
          state.open = action.payload;
        },
        addToCart: (state, action) => {
            for (let item of state.items) {
                if (item.name === action.payload.name) return;
            }
            state.items.push(action.payload);
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        emptyCart: (state, action) => {
            state.items = [];
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.name !== action.payload.name);
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        incrementAmount: (state, action) => {
            state.items = state.items.map(item => {
                if (item.name === action.payload.name) {
                    return {...item, qty: item.qty + 1};
                }
                return item;
            });
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        decrementAmount: (state, action) => {
            state.items = state.items.map(item => {
                if (item.name === action.payload.name) {
                    return {...item, qty: item.qty - 1};
                }
                return item;
            });
            localStorage.setItem("cart", JSON.stringify(state.items));
        }
    }
});

export const {toggleCart, addToCart, emptyCart, removeFromCart, incrementAmount, decrementAmount} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartOpen = (state) => state.cart.open;
export default cartSlice.reducer;