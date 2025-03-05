import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash, faUserPlus, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";

const passwordSchema = z
    .string()
    .min(6, { message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" })
    .refine((value) => (value.match(/[!@#$%^&*()_+{}[\]:;<>,.?~]/g) || []).length >= 2, {
        message: "รหัสผ่านต้องมีอักขระพิเศษอย่างน้อย 2 ตัว (!@#$%^&*)",
    });

const schema = z
    .object({
        email: z.string().email({ message: "กรุณากรอกอีเมลที่ถูกต้อง" }),
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "รหัสผ่านไม่ตรงกัน",
        path: ["confirmPassword"],
    });

const Register = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const recaptchaRef = useRef(null);

    useEffect(() => {
        AOS.init({ duration: 800, easing: "ease-in-out", once: true });
    }, []);

    const onSubmit = async (data) => {
        const recaptchaValue = recaptchaRef.current?.getValue();
        if (!recaptchaValue) {
            Swal.fire("โปรดยืนยันว่าไม่ใช่บอท", "", "warning");
            return;
        }

        try {
            await axios.post("https://shop-main-api.vercel.app/api/register", {
                ...data,
                recaptcha: recaptchaValue,
            });

            Swal.fire({
                title: "สมัครสมาชิกสำเร็จ!",
                text: "ยินดีต้อนรับเข้าสู่ระบบ",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            Swal.fire("เกิดข้อผิดพลาด!", err.response?.data?.message || "ลองใหม่อีกครั้ง", "error");
        }
    };

    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setValue("password", passwordValue);
        setPasswordStrength(passwordValue ? zxcvbn(passwordValue).score : -1);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black px-4">
            <div className="bg-[#101010] p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl" data-aos="fade-up">
                <h2 className="text-3xl font-bold text-center mb-6 text-white">
                    <FontAwesomeIcon icon={faUserPlus} /> สมัครสมาชิก
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email Input */}
                    <div className="relative">
                        <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-white/50" />
                        <input
                            {...register("email")}
                            className="input input-bordered w-full pl-10 bg-white/10 text-white"
                            type="email"
                            placeholder="อีเมลของคุณ"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-white/50" />
                        <input
                            {...register("password")}
                            className="input input-bordered w-full pl-10 pr-10 bg-white/10 text-white"
                            type={showPassword ? "text" : "password"}
                            placeholder="รหัสผ่าน"
                            onChange={handlePasswordChange}
                        />
                        <button type="button" className="absolute right-3 top-2.5 text-white/50" onClick={() => setShowPassword(!showPassword)}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                        {/* Strength Bar */}
                        <div className="mt-1 flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <span
                                    key={i}
                                    className={`w-1/5 h-[6px] rounded-lg transition-all ${
                                        passwordStrength === -1 ? "bg-gray-500"   
                                            : passwordStrength >= 4 ? "bg-green-400"  
                                                : passwordStrength >= 2 ? "bg-yellow-400" 
                                                    : "bg-red-400" 
                                    }`}
                                ></span>
                            ))}
                        </div>
                        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password Input */}
                    <div className="relative">
                        <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-white/50" />
                        <input
                            {...register("confirmPassword")}
                            className="input input-bordered w-full pl-10 pr-10 bg-white/10 text-white"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="ยืนยันรหัสผ่าน"
                        />
                        <button type="button" className="absolute right-3 top-2.5 text-white/50" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </button>
                        {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* ReCAPTCHA */}
                    <div className="flex justify-center">
                        <ReCAPTCHA ref={recaptchaRef} sitekey="6LfkIeAqAAAAAPfJ9mnmWYR4-OSct2m_2qAwheSt" />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-success w-full flex items-center gap-2">
                        <FontAwesomeIcon icon={faCheckCircle} />
                        {isSubmitting ? "กำลังสมัคร..." : "สมัครสมาชิก"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
