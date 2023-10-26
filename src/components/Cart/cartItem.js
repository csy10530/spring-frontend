import React from "react";
import Button from "@mui/material/Button";
import {decrementAmount, incrementAmount, removeFromCart} from "./cartSlice";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./cart.css";
import {useDispatch} from "react-redux";

const CartItem = ({item}) => {
    const dispatch = useDispatch();


    const handleAddAmount = () => {
        dispatch(incrementAmount(item))
    }

    const handleReduceAmount = () => {
        if (item.qty > 1) {
            dispatch(decrementAmount(item));
        } else {
            dispatch(removeFromCart(item));
        }
    }

    return (
        <div className={"cartItemWrapper"}>
            <div>
                <h3>{item.name}</h3>

                <div className={"cartItemInfo"}>
                    <p>Price: ${item.price}</p>
                    <p>Total Price: ${(item.price * item.qty).toFixed(2)}</p>
                </div>

                <div className={"cartItemButtonGroup"}>
                    <Button size={"small"} onClick={handleReduceAmount} disableElevation>
                        <RemoveIcon fontSize={"small"}/>
                    </Button>

                    <p>{item.qty}</p>

                    <Button size={"small"} onClick={handleAddAmount} disableElevation>
                        <AddIcon fontSize={"small"}/>
                    </Button>

                    <Button size={"small"} onClick={() => dispatch(removeFromCart(item))} disableElevation>
                        <DeleteOutlineIcon fontSize={"small"}/>
                    </Button>
                </div>
            </div>

            <img src={item.image} alt={item.name}/>
        </div>
    )
}

export default CartItem;
