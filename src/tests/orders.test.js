import axios from "axios";
import {createOrder, deleteOrder, getAllOrders, getOrdersByUser} from "./mockServices";

jest.mock("axios");

const mockUsers = [
    {username: "test1", password: "test1"},
    {username: "test2", password: "test2"}
];

const mockProducts = [
    {id: 0, name: "p1", price: 1, stock: 1, image: "p1", description: "p1"},
    {id: 1, name: "p2", price: 1, stock: 1, image: "p2", description: "p2"}
];

const orderProducts = [
    [
        {qty: 1, product: mockProducts[0]},
        {qty: 2, product: mockProducts[1]}
    ],
    [
        {qty: 3, product: mockProducts[0]}
    ]
];

const mockOrders = [
    {id: 0, user: mockUsers[0], purchases: orderProducts[0]},
    {id: 1, user: mockUsers[1], purchases: orderProducts[1]}
];

describe("test orders", () => {
    test("getAllOrders", async () => {
        axios.get.mockImplementation(() =>
            Promise.resolve({data: {orders: mockOrders}})
        );
        const res = await getAllOrders();
        const orders = res.orders;
        expect(orders.length).toEqual(2);
        mockOrders.forEach((o, i) => {
            expect(o.user.username).toEqual(mockUsers[i].username);
        });
        expect(mockOrders[0].purchases[0].product.name).toEqual(orderProducts[0][0].product.name);
    });

    test("get user orders", async () => {
        axios.get.mockImplementation(() =>
            Promise.resolve({data: {orders: [mockOrders[0]]}})
        );
        const res = await getOrdersByUser("test1");
        const orders = res.orders;
        expect(orders.length).toEqual(1);
        expect(orders[0].user.username).toEqual("test1");
    });

    test("delete order", async () => {
        axios.delete.mockImplementation(() =>
            Promise.resolve({data: {orders: mockOrders.slice(1)}})
        );
        const res = await deleteOrder(0);
        const orders = res.orders;
        expect(orders.length).toEqual(1);
        expect(orders[0].user.username).toEqual("test2");
    });

    test("create order", async () => {
        const newOrder = {id: 2, user: mockUsers[1], purchases: [{qty: 2, product: mockProducts[1]}]};
        axios.post.mockImplementation(() =>
            Promise.resolve({data: {orders: [...mockOrders, newOrder]}})
        );
        const res = await createOrder(newOrder);
        const orders = res.orders;
        expect(orders.length).toEqual(3);
        expect(orders[2].user.username).toEqual("test2");
        expect(orders[2].purchases[0].product.name).toEqual("p2");
    });
});