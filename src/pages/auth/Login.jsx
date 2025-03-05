import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useShopStore from "../../store/shop-store.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css"; // Import CSS ของ AOS

const Login = () => {
    const navigate = useNavigate();
    const actionLogin = useShopStore((state) => state.actionLogin);
    console.log("🔍 useShopStore actionLogin:", actionLogin);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    // ใช้ AOS เมื่อ component โหลด
    useEffect(() => {
        AOS.init({
            duration: 800, // ระยะเวลาการเล่น animation (มิลลิวินาที)
            easing: "ease-in-out", // รูปแบบการเคลื่อนไหว
            once: true, // เล่น animation แค่ครั้งเดียว
        });
    }, []);

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await actionLogin(form);
            console.log("✅ Login Response:", res); // Debugging response
    
            if (!res || !res.data || !res.data.payload) {
                throw new Error("Invalid response from server");
            }
    
            const role = res.data.payload.role;
            console.log("🔄 Redirecting to:", role); // Debugging role
            roleRedirect(role);
    
            Swal.fire({
                icon: "success",
                title: "เข้าสู่ระบบสำเร็จ!",
                text: "ยินดีต้อนรับเข้าสู่ระบบ",
                confirmButtonText: "OK",
            });
        } catch (err) {
            console.error("❌ Login Error:", err.response?.data || err.message);
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
                text: `${err.response?.data?.message || err.message}`,
            });
        }
    };

    const roleRedirect = (role) => {
        if (role === "admin") {
            console.log("🔄 Navigating to /admin...");
            navigate("/admin");
        } else {
            console.log("🔄 Navigating to Home...");
            navigate("/home"); // เปลี่ยนจาก navigate(-1) เป็นหน้าหลักที่ชัดเจน
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black">
            <div
                className="bg-[#101010] p-8 rounded-2xl shadow-2xl max-w-md w-full"
                data-aos="fade-up"
            >
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Email Input */}
                    <div className="relative" data-aos="fade-right">
                        <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-white/50" />
                        <input
                            className="w-full py-2 pl-10 pr-3 rounded-xl bg-white/10 text-white border border-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative" data-aos="fade-left">
                        <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-white/50" />
                        <input
                            className="w-full py-2 pl-10 pr-3 rounded-xl bg-white/10 text-white border border-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        className="w-full py-2 px-5 rounded-xl bg-white/20 text-white hover:bg-white/30 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                        type="submit"
                        data-aos="zoom-in"
                    >
                        <FontAwesomeIcon icon={faSignInAlt} />
                        เข้าสู่ระบบ
                    </button>

                    <p className="text-center text-white/70 my-3">หรือ</p>

                    {/* Register Button */}
                    <a
                        href="/register"
                        className="block w-full py-2 px-5 rounded-xl bg-white/10 text-white text-center hover:bg-white/20 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                        data-aos="fade-up"
                    >
                        <FontAwesomeIcon icon={faUserPlus} />
                        ฉันยังไม่มีบัญชี?
                    </a>
                </form>
            </div>
        </div>
    );
};

export default Login;
