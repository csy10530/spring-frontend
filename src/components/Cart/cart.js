import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {emptyCart, selectCartItems, selectCartOpen, toggleCart} from "./cartSlice";
import {Divider, Drawer} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import CartItem from "./cartItem";
import "./cart.css";
import {createOrder} from "../../pages/Orders/orderSlice";
import {useNavigate} from "react-router-dom";

const Cart = () => {
    const cartOpen = useSelector(selectCartOpen);
    const cartItems = useSelector(selectCartItems);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCartClose = () => {
        dispatch(toggleCart(false));
    }

    const handlePlaceOrder = () => {
        if (!localStorage.getItem("user")) {
            localStorage.removeItem("cart");
            dispatch(emptyCart());
            navigate("/login");
            return;
        }
        const orderProducts = [];
        cartItems.forEach(i => {
            const item = {
                qty: i.qty,
                product: {id: i.id}
            }
            orderProducts.push(item);
        });
        dispatch(createOrder({purchases: orderProducts}))
            .then((res) => {
                localStorage.removeItem("cart");
                dispatch(emptyCart());
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Drawer className={"cart-drawer"} anchor={"right"} open={cartOpen} onClose={handleCartClose}>
            <div className={"cartHeader"}>
                <IconButton onClick={handleCartClose}>
                    <CloseIcon/>
                </IconButton>
            </div>
            <div className={"cartWrapper"}>
                <h2>Your Shopping Cart</h2>
                {cartItems.length === 0 ? <div>Cart is empty</div> : null}
                {cartItems && cartItems.map((item, idx) => {
                    return (
                        <>
                            <CartItem key={idx} item={item}/>
                            <Divider/>
                        </>
                    );
                })}
                {cartItems.length > 0 && <p id={"order-total"}>
                    Order Total: ${cartItems.length > 0
                    ? cartItems.reduce((total, item) => total + item.price * item.qty, 0)
                    : 0}
                </p>}
            </div>

            {
                cartItems.length > 0
                && <button
                    className={"place-order-btn"}
                    onClick={handlePlaceOrder}>
                    Place Order
                </button>
            }
        </Drawer>
    )
}

export default Cart;