import './App.css';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Signup} from "./pages/Signup/signup";
import Login from "./pages/Login/login";
import Home from "./pages/Home/home";
import Admin from "./pages/Admin/admin";
import UserOrders from "./pages/Orders/userOrders";
import UploadProduct from "./pages/UploadProduct/UploadProduct";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={"/signup"} element={<Signup />}/>
                <Route path={"/login"} element={<Login />}/>
                <Route path={"/"} element={<Home />}/>
                <Route path={"/admin"} element={<Admin />}/>
                <Route path={"/orders"} element={<UserOrders/>}/>
                <Route path={"/upload"} element={<UploadProduct/>}/>
            </Routes>
        </div>
    );
}

export default App;
