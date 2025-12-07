import { createBrowserRouter } from "react-router";
import Login from "../auth/login/Login"
import Register from "../auth/register/Register"
//  takes an array of objects of type router
const router = createBrowserRouter([
{
    path: "/",
    element: <Login/>
},
{ 
    path:"/register",
    element: <Register/>
}
])                                                                                              
export default router;
