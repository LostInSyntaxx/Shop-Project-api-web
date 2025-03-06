import React from "react";
import { Link } from "react-router-dom";
import useShopStore from "../../store/shopStore";
import { FaHistory, FaCreditCard, FaUser } from "react-icons/fa";

const HomeUser = () => {
    const user = useShopStore((state) => state.user); // ดึงข้อมูลผู้ใช้จาก Zustand

    return (
        <div className="container mx-auto p-6">
            {/* บัตรโปรไฟล์ผู้ใช้ */}
            <div className="card bg-base-100 shadow-lg p-6">
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="avatar">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src="https://i.pravatar.cc/150?img=10" alt="User Avatar" />
                        </div>
                    </div>

                    {/* ข้อมูลผู้ใช้ */}
                    <div>
                        <h2 className="text-xl font-bold">
                            {user ? user.name : "Guest User"}
                        </h2>
                        <p className="text-gray-600">{user ? user.email : "No Email"}</p>
                    </div>
                </div>
            </div>

            {/* เมนูหลัก */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <Link to="/user/payment" className="btn btn-primary flex gap-2 items-center">
                    <FaCreditCard />
                    Payment
                </Link>
                <Link to="/user/history" className="btn btn-secondary flex gap-2 items-center">
                    <FaHistory />
                    Order History
                </Link>
                <Link to="/user/logout" className="btn btn-error flex gap-2 items-center">
                    <FaUser />
                    Logout
                </Link>
            </div>
        </div>
    );  
};

export default HomeUser;
