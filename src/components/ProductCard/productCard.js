import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {Card, CardMedia, Typography} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import "./productCard.css";
import {addToCart} from "../Cart/cartSlice";
import UpdateProduct from "../UpadateProduct/updateProduct";

const ProductCard = ({product}) => {
    const dispatch = useDispatch();

    const isAdmin = localStorage.getItem("user") && localStorage.getItem("admin") === "true";

    const [editing, setEditing] = useState(false);

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            qty: 1,
            price: product.price,
            image: product.image
        }));
    }

    const handleCancelEditing = () => {
        setEditing(false);
    }

    const handleStartEditing = () => {
        setEditing(true);
    }

    return (
        <React.Fragment>
            <Card className={"product-card-container"} sx={{maxWidth: 200, position: "relative"}} variant={"outlined"}>
                <CardContent>
                    <CardMedia component={"img"} height={"140"} image={product.image}/>
                    <Typography variant={"h5"} component={"div"}>
                        {product.name}
                    </Typography>
                    <Typography>
                        ${product.price}
                    </Typography>
                    <Typography>
                        {product.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    {isAdmin && <Button onClick={handleStartEditing}>Edit</Button>}
                    <Button onClick={handleAddToCart}>Add to Cart</Button>
                </CardActions>
            </Card>
            <UpdateProduct product={product} editing={editing} cancel={handleCancelEditing}/>
        </React.Fragment>
    );
}

export default ProductCard;