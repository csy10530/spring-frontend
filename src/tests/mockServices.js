import axios from "axios";

const BASE = "http://localhost:8080";
const userURL = `${BASE}/users`;
const productURL = `${BASE}/products`;
const orderURL = `${BASE}/orders`;

export const register = (user) =>
    axios.post(userURL, user)
        .then(response => response.data);

export const findAllUsers = () =>
    axios.get(userURL)
        .then(response => response.data);

export const deleteUserById = (uid) =>
    axios.delete(`${userURL}/${uid}`)
        .then(response => response.data);

export const getAllProducts = () =>
    axios.get(productURL)
        .then(response => response.data);

export const createProduct = (product) =>
    axios.post(productURL, product)
        .then(response => response.data);

export const deleteProduct = (pid) =>
    axios.delete(`${productURL}/pid`)
        .then(response => response.data);

export const updateProduct = (product) =>
    axios.put(`${productURL}/${product.id}`, product)
        .then(response => response.data);

export const createOrder = (order) =>
    axios.post(orderURL, order)
        .then(response => response.data);

export const getAllOrders = () =>
    axios.get(orderURL)
        .then(response => response.data);

export const getOrdersByUser = (username) =>
    axios.get(`${orderURL}/user/${username}`)
        .then(response => response.data)

export const deleteOrder = (oid) =>
    axios.delete(`${orderURL}/${oid}`)
        .then(response => response.data);
