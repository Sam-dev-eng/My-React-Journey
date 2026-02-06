import { createBrowserRouter } from "react-router";
import Login from "../auth/login/Login"
import Register from "../auth/register/Register"
import Products from "../component/Products"
const router = createBrowserRouter([
{
    path: "/",
    element: <Login/>
},
{ 
    path:"/register",
    element: <Register/>
},
{
    path: "/products",
    element: <Products/>
},
])                                                                                              
export default router;
