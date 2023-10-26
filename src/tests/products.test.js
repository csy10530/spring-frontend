import axios from "axios";
import {createProduct, deleteProduct, getAllProducts, updateProduct} from "./mockServices";

jest.mock("axios");

const mockProducts = [
    {id: 0, name: "p1", price: 1, stock: 1, image: "p1", description: "p1"},
    {id: 1, name: "p2", price: 1, stock: 1, image: "p2", description: "p2"}
];

describe("test products", () => {
    test("get all products", async () => {
        axios.get.mockImplementation(() =>
            Promise.resolve({data: {products: mockProducts}})
        );
        const res = await getAllProducts();
        const products = res.products;
        expect(products.length).toEqual(2);
        products.forEach((p, i) => {
            expect(p.name).toEqual(mockProducts[i].name);
        });
    });

    test("create product", async () => {
        const newProduct = {id: 2, name: "p3", price: 1, stock: 1, image: "p3", description: "p3"};
        axios.post.mockImplementation(() =>
            Promise.resolve({data: {products: [...mockProducts, newProduct]}})
        );
        const res = await createProduct(newProduct);
        const products = res.products;
        expect(products.length).toEqual(3);
        expect(products[2].name).toEqual("p3");
    });

    test("delete product", async () => {
        axios.delete.mockImplementation(() =>
            Promise.resolve({data: {products: mockProducts.slice(1)}})
        );
        const res = await deleteProduct(0);
        const products = res.products;
        expect(products.length).toEqual(1);
        expect(products[0].name).toEqual("p2");
    });

    test("update product", async () => {
        const updatedProduct = {id: 1, name: "test", price: 1, stock: 1, image: "p2", description: "p2"};
        axios.put.mockImplementation(() =>
            Promise.resolve({data: {products: [mockProducts[0], updatedProduct]}})
        );
        const res = await updateProduct(updatedProduct);
        const products = res.products;
        expect(products[1].name).toEqual("test");
    })
});