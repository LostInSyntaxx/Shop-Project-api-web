import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectRouteUser from "./ProtectRouteUser.jsx";
import ProtectRouteAdmin from "./ProtectRouteAdmin.jsx";
import NotFound from "../pages/NotFound.jsx"; // หน้า 404

// 📦 Lazy Loading Pages
const Layout = lazy(() => import("../layouts/Layout.jsx"));
const Home = lazy(() => import("../pages/Home.jsx"));
const Shop = lazy(() => import("../pages/Shop.jsx"));
const Cart = lazy(() => import("../pages/Cart.jsx"));
const Checkout = lazy(() => import("../pages/Checkout.jsx"));
const Login = lazy(() => import("../pages/auth/Login.jsx"));
const Register = lazy(() => import("../pages/auth/Register.jsx"));

const LayoutAdmin = lazy(() => import("../layouts/LayoutAdmin.jsx"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard.jsx"));
const Category = lazy(() => import("../pages/admin/Category.jsx"));
const Product = lazy(() => import("../pages/admin/Product.jsx"));
const EditProduct = lazy(() => import("../pages/admin/EditProduct.jsx"));
const Manage = lazy(() => import("../pages/admin/Manage.jsx"));
const ManageOrders = lazy(() => import("../pages/admin/ManageOrders.jsx"));
const LogoutAdmin = lazy(() => import("../pages/admin/Logout.jsx"));

const LayoutUser = lazy(() => import("../layouts/LayoutUser.jsx"));
const HomeUser = lazy(() => import("../pages/user/HomeUser.jsx"));
const Payment = lazy(() => import("../pages/user/Payment.jsx"));
const History = lazy(() => import("../pages/user/History.jsx"));
const LogoutUser = lazy(() => import("../pages/user/Logout.jsx")); // เพิ่มหน้า Logout สำหรับ User

// 🔥 Router Configuration
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "shop", element: <Shop /> },
            { path: "cart", element: <Cart /> },
            { path: "checkout", element: <Checkout /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
        ],
    },
    {
        path: "/admin",
        element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: "category", element: <Category /> },
            { path: "product", element: <Product /> },
            { path: "product/:id", element: <EditProduct /> },
            { path: "manage", element: <Manage /> },
            { path: "orders", element: <ManageOrders /> },
            { path: "logout", element: <LogoutAdmin /> }, // ✅ เพิ่มหน้า Logout Admin
        ],
    },
    {
        path: "/user",
        element: <ProtectRouteUser element={<LayoutUser />} />,
        children: [
            { index: true, element: <HomeUser /> },
            { path: "payment", element: <Payment /> },
            { path: "history", element: <History /> },
            { path: "logout", element: <LogoutUser /> }, // ✅ เพิ่มหน้า Logout User
        ],
    },
    { path: "*", element: <NotFound /> }, // ✅ หน้า 404 สำหรับเส้นทางที่ไม่มี
]);

// 🚀 ใช้ Suspense เพื่อแสดง Loading ตอนโหลดหน้าแบบ Lazy
const AppRoutes = () => {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen text-lg">Loading...</div>}>
            <RouterProvider router={router} />
        </Suspense>
    );
};

export default AppRoutes;
