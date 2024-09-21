import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import ForgotPassword from "../Pages/ForgotPassword";
import SignUp from "../Pages/SignUp";
import AdminPannel from "../Pages/AdminPannel";
import AllUsers from "../Pages/AllUsers";
import AllProduct from "../Pages/AllProduct";
import CategoryProduct from "../Pages/CategoryProduct";
import ProdcutDetails from "../Pages/ProdcutDetails";
import Cart from "../Pages/Cart";
import SearchProduct from "../Pages/SearchProduct";
import SuccessPage from "../Pages/SuccessPage";
import CancelPage from "../Pages/CancelPage";
import OrderPage from "../Pages/OrderPage";
import AllOrder from "../Pages/AllOrder";

const router = createBrowserRouter([{
    path:"/",
    element: <App />,
    children:[
        {
            path:"",
            element:<Home />
        },
        {
            path:"login",
            element:<Login />
        },
        {
            path:"Forgot-Password",
            element:<ForgotPassword />
        },
        {
            path:"signup",
            element:<SignUp />
        },
        {
            path:"product-category/",
            element:<CategoryProduct />
        },
        {
            path:"product/:id",
            element:<ProdcutDetails />
        },
        {
            path:"cart",
            element:<Cart/>
        },
        {
            path:"Serch",
            element:<SearchProduct/>
        },
        {
            path:"success",
            element:<SuccessPage/>
        },
        {
            path:"order",
            element:<OrderPage/>
        },
        {
            path:"cancel",
            element:<CancelPage/>
        },
        {
            path:"admin-panel",
            element:<AdminPannel />,
            children:[
                {
                    path:"all-users",
                    element: <AllUsers />
                },
                {
                    path:"all-products",
                    element: <AllProduct />
                },
                {
                    path:"all-orders",
                    element: <AllOrder />
                },
            ]
        },
       
    ]
}]);

export default router;