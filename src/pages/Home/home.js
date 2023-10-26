import React, {useEffect} from "react";
import NavigationBar from "../../components/NavBar/nav";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts, selectProducts} from "./homeSlice";
import ProductCard from "../../components/ProductCard/productCard";
import {Grid} from "@mui/material";
import "./home.css";
import Cart from "../../components/Cart/cart";

const Home = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector(selectProducts);

    const fetchProducts = async () => {
        await dispatch(getAllProducts());
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <React.Fragment>
            <NavigationBar/>
            <Cart/>
            <div className="grid-container">
                <Grid container spacing={2} columns={{xs: 2, sm: 3, md: 4}}>
                    {allProducts && allProducts.map(p => {
                        return (
                            <Grid item key={p.id} className="grid-item">
                                <ProductCard product={p}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </React.Fragment>
    )
}

export default Home;