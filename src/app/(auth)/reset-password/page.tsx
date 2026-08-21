/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPassword } from "@/services/authService";
import Image from "next/image";

function ResetPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState<DialogType | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password_confirmation: "",
        token: "",
        username: ""
    });

    // ✅ CHANGE 2: validatePassword — length 6-10 AND number mandatory (was missing .test())
    const validatePassword = (password: string) => {
        const hasNumber = /\d/.test(password);
        const isValidLength = password.length >= 6 && password.length <= 10;

        return isValidLength && hasNumber;
    };

    type DialogType = {
        type: "success" | "error";
        message: string;
    };

    // Get token and other params from URL when component mounts
    useEffect(() => {
        const token = searchParams.get("token");
        const email = searchParams.get("email");
        const username = searchParams.get("username");

        if (token) {
            setFormData(prev => ({ ...prev, token }));
        }
        if (email) {
            setFormData(prev => ({ ...prev, email }));
        }
        if (username) {
            setFormData(prev => ({ ...prev, username }));
        }
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.password) {
            setDialog({
                type: "error",
                message: "Please enter a new password",
            });
            return;
        }

        if (formData.password.length < 6) {
            setDialog({
                type: "error",
                message: "Password must be at least 6 characters long",
            });
            return;
        }

        // ✅ CHANGE 3: validatePassword check added after length check
        if (!validatePassword(formData.password)) {
            setDialog({
                type: "error",
                message: "Password must be 6-10 characters long and contain numbers and symbols",
            });
            return;
        }

        if (formData.password !== formData.password_confirmation) {
            setDialog({
                type: "error",
                message: "Passwords do not match",
            });
            return;
        }

        if (!formData.token) {
            setDialog({
                type: "error",
                message: "Invalid reset token. Please request a new reset link.",
            });
            return;
        }

        try {
            setLoading(true);
            const res = await resetPassword({
                token: formData.token,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.password_confirmation,
                username: formData.username
            });

            if (!res?.status) {
                throw new Error(res?.message || "Something went wrong");
            }

            setDialog({
                type: "success",
                message: "Password reset successfully! Redirecting to login...",
            });

            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push("/login");
            }, 2000);

        } catch (err: any) {
            setDialog({
                type: "error",
                message: err?.message || "Failed to reset password. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-[#e8eef5] to-[#f5f0d0] relative">
            {dialog && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
                    <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-8 text-center animate-fadeIn">
                        {/* Icon */}
                        <div className="mb-4 flex justify-center">
                            {dialog.type === "success" ? (
                                <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">
                            {dialog.type === "success" ? "Success" : "Error"}
                        </h3>

                        {/* Message */}
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                            {dialog.message}
                        </p>

                        {/* Button */}
                        <button
                            onClick={() => {
                                setDialog(null);
                                if (dialog.type === "success") {
                                    router.push("/login");
                                }
                            }}
                            className="px-6 py-2.5 bg-linear-to-r from-[#17395c] to-[#1f4e7a] 
                                text-white rounded-lg text-sm font-medium 
                                hover:shadow-lg hover:-translate-y-0.5 transition"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            <div className="flex justify-center items-start py-16 px-4">
                {/* Glass Card */}
                <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-2xl overflow-hidden 
                    backdrop-blur-md bg-white/60 border border-white/40 
                    shadow-[0_30px_80px_rgba(23,57,92,0.18)]">

                    {/* ================= LEFT: FORM ================= */}
                    <div className="bg-white p-10 flex items-center justify-center relative">
                        {/* Top gradient stripe */}
                        <div className="absolute top-0 left-0 w-full h-1 
                            bg-linear-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

                        <div className="w-full max-w-sm">
                            {/* Heading */}
                            <h2 className="text-3xl font-extrabold text-center mb-2 
                                bg-linear-to-r from-[#162a4a] via-[#1f6fa3] to-[#f4df17] 
                                bg-clip-text text-transparent">
                                Reset Password
                            </h2>

                            <p className="text-center text-sm text-gray-500 mb-6">
                                Create a new password for your account
                            </p>

                            {/* Show username if available */}
                            {formData.username && (
                                <div className="mb-4 text-center text-sm text-gray-600">
                                    Resetting password for: <span className="font-semibold">{formData.username}</span>
                                </div>
                            )}

                            {/* FORM */}
                            <form onSubmit={handleResetPassword} className="space-y-5">
                                {/* New Password Field */}
                                <div>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder=" "
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="peer w-full px-10 py-3 border border-gray-300 rounded-xl 
                                                bg-[#f8fbff] text-sm focus:outline-none focus:border-[#1f4e7a] 
                                                focus:bg-white focus:ring-2 focus:ring-[#1f4e7a]/20"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-gray-500"
                                        >
                                            {showPassword ? "👁️" : "🔒"}
                                        </button>

                                        <label className="absolute left-10 text-gray-500 text-sm transition-all px-1
                                            top-3 
                                            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#162a4a] peer-focus:bg-white
                                            peer-not-placeholder-shown:-top-2 
                                            peer-not-placeholder-shown:text-xs 
                                            peer-not-placeholder-shown:bg-white">
                                            New Password
                                        </label>
                                    </div>
                                    {/* ✅ CHANGE 4: Helper hint added below password field */}
                                    <p className="text-xs text-gray-500 mt-1 ml-2">
                                        Password must be 6-10 characters long and contains numbers and symbols.
                                    </p>
                                </div>

                                {/* Confirm Password Field */}
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="password_confirmation"
                                        placeholder=" "
                                        value={formData.password_confirmation}
                                        onChange={handleChange}
                                        className="peer w-full px-10 py-3 border border-gray-300 rounded-xl 
                                            bg-[#f8fbff] text-sm focus:outline-none focus:border-[#1f4e7a] 
                                            focus:bg-white focus:ring-2 focus:ring-[#1f4e7a]/20"
                                    />
                                    {/* ✅ CHANGE 1: showConfirmPassword use ho raha hai (pehle showPassword tha — bug fix) */}
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-3 text-gray-500"
                                    >
                                        {showConfirmPassword ? "👁️" : "🔒"}
                                    </button>

                                    <label className="absolute left-10 text-gray-500 text-sm transition-all px-1
                                        top-3 
                                        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#162a4a] peer-focus:bg-white
                                        peer-not-placeholder-shown:-top-2 
                                        peer-not-placeholder-shown:text-xs 
                                        peer-not-placeholder-shown:bg-white">
                                        Confirm Password
                                    </label>
                                </div>

                                {/* Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 rounded-xl font-semibold text-white 
                                        bg-linear-to-r from-[#17395c] to-[#1f4e7a] 
                                        hover:-translate-y-0.5 hover:text-yellow-300 
                                        hover:shadow-[0_10px_30px_rgba(23,57,92,0.35)] 
                                        transition disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                                            Resetting...
                                        </>
                                    ) : (
                                        <>Reset Password →</>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* ================= RIGHT: HERO ================= */}
                    <div className="hidden md:flex items-center justify-center relative 
                        bg-linear-to-br from-[#162a4a] via-[#1f4e7a] to-[#2f6fa3] p-10">
                        {/* Decorative blobs */}
                        <div className="absolute w-64 h-64 bg-white/10 rounded-full -top-16 -right-16" />
                        <div className="absolute w-40 h-40 bg-white/10 rounded-full -bottom-10 -left-10" />

                        {/* Logo */}
                        <div className="relative w-44 h-44 rounded-full border-4 border-white/40 
                            bg-white/10 backdrop-blur-md flex items-center justify-center 
                            shadow-2xl animate-[float_4s_ease-in-out_infinite]">
                            <Image
                                width={176}
                                height={176}
                                src="/sif-logo.png"
                                alt="Logo"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ResetPassword() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordContent />
        </Suspense>
    );
}