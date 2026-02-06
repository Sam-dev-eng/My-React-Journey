import {createBrowserRouter} from "react-router"
import Login from "../auth/login/Login"
import Register from "../auth/register/Register"


const Router = createBrowserRouter([
    {
        path:"/",
        element:<Login/>
    },
    {
        path:"/register",
        element: <Register/>
    }
]);

export default Router;