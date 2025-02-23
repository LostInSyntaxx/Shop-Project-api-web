import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from  '../pages/Home.jsx'
import Shop from  '../pages/Shop.jsx'
import Cart from "../pages/Cart.jsx";
import History from "../pages/user/History.jsx";
import Checkout from "../pages/Checkout.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import Layout from "../layouts/Layout.jsx";
import LayoutAdmin from "../layouts/LayoutAdmin.jsx";
import Dashboard from '../pages/admin/Dashboard.jsx';
import Category from "../pages/admin/Category.jsx";
import Product from "../pages/admin/Product.jsx";
import Manage from "../pages/admin/Manage.jsx";
import LayoutUser from "../layouts/LayoutUser.jsx";
import HomeUser from "../pages/user/HomeUser.jsx";
import ProtectRouteUser from "./ProtectRouteUser.jsx";
import ProtectRouteAdmin from "./ProtectRouteAdmin.jsx";
import Logout from "../pages/admin/Logout.jsx";
import EditProduct from "../pages/admin/EditProduct.jsx";
import Payment from "../pages/user/Payment.jsx";
import ManageOrders from "../pages/admin/ManageOrders.jsx";



//import ProtectRouteAdmin from "./ProtectRouteAdmin.jsx";
const AppRoutes = () => {
    const router = createBrowserRouter([
        {   path: '/',
            element: <Layout/>,
            children:[
                { index: true, element:<Home/> },
                { path: 'shop', element:<Shop/> },
                { path: 'cart', element:<Cart/> },
                { path: 'checkout', element:<Checkout/> },
                { path: 'login', element:<Login/> },
                { path: 'register', element:<Register/> },
            ]
        },
        {
            path: '/admin',
            element: <ProtectRouteAdmin element={<LayoutAdmin/>} />,
            children: [
                { index: true, element:<Dashboard/> },
                { path: 'category', element: <Category/> },
                { path: 'product', element: <Product/> },
                { path: 'product/:id', element: <EditProduct/> },
                { path: 'manage', element: <Manage/> },
                { path: 'orders', element: <ManageOrders/> },
            ]
        },
        {
            path: '/user',
            element: <ProtectRouteUser element={<LayoutUser/>}/>,
            children: [
                { index: true, element:<HomeUser/> },
                { path: 'payment', element:<Payment/> },
                { path: 'history', element:<History/> },
            ]
        }

    ])
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}
export default AppRoutes
