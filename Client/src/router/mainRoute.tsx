import { createBrowserRouter } from "react-router-dom";
import Username from "../pages/auth/Username";
import Register from "../pages/auth/Register";
import Profile from "../pages/auth/Profile";
import PageNotFound from "../pages/error/PageNotFound";
import Password from "../pages/auth/Password";
import Recovery from "../pages/auth/Recovery";
import Reset from "../pages/auth/Reset";


export const mainRoute = createBrowserRouter([
    {
        path: "/",
        index : true,
        element: <Username/>
    },
    {
        path: "/register",
        index : true,
        element: <Register/>
    },
    {
        path: "/password",
      index : true,
      element: <Password/>
    },
    {
        path: "/recovery",
        element: <Recovery/>
    },
    {
        path: "/profile",
        index: true,
        element: <Profile/>
    },
    {
        path: "/reset",
        index: true,
        element: <Reset/>
    },
    {
        path: "*",
        index:true,
        element: <PageNotFound/>
    }

])