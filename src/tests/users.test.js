import axios from "axios";
import {deleteUserById, findAllUsers, register} from "./mockServices";

jest.mock("axios");

const mockUsers = [
    {username: "test1", password: "test1"},
    {username: "test2", password: "test2"}
];

describe("test axios", () => {
    test("mock axios works", async () => {
        axios.get.mockImplementation(() =>
            Promise.resolve({data: {message: "hello world"}})
        );
        const res = await axios.get();
        expect(res.data.message).toEqual("hello world");
    });
});

describe("test users", () => {
    test("get users works", async () => {
        axios.get.mockImplementation(() =>
            Promise.resolve({data: {users: mockUsers}})
        );
        const res = await findAllUsers();
        const users = res.users;
        expect(users.length).toEqual(mockUsers.length);
        users.forEach((u, i) => {
            expect(u.username).toEqual(mockUsers[i].username);
        })
    });

    test("delete user by ID", async () => {
        axios.delete.mockImplementation(() =>
            Promise.resolve({data: {users: mockUsers.slice(1)}})
        );
        const res = await deleteUserById(0);
        const users = res.users;
        expect(users.length).toEqual(1);
        expect(users[0].username).toEqual("test2");
    });

    test("create user", async () => {
        const newUser = {username: "test3", password: "test3"};
        axios.post.mockImplementation(() =>
            Promise.resolve({data: {users: [...mockUsers, newUser]}})
        );
        const res = await register(newUser);
        const users = res.users;
        expect(users.length).toEqual(3);
        expect(users[2].username).toEqual("test3");
    })
});
