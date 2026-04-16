/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { forgotPassword } from "@/services/authService";
import Image from "next/image";
export default function ForgotPassword() {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState<DialogType | null>(null);
    const cleanUsername = username.trim();
        type DialogType = {
        type: "success" | "error";
        message: string;
    };
    const maskEmail = (email: string) => {
        const [name, domain] = email.split("@");
        return name.slice(0, 2) + "***@" + domain;
    };

    const sendResetLink = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim()) {
            setDialog({
                type: "error",
                message: "Please enter your username",
            });
            return;
        }
        try {
            setLoading(true);
            const res = await forgotPassword({
                username: username.trim(),
                frontend_url: "https://www.vvmstage.cloud/reset-password",
            });
            if (!res?.status || !res?.data?.email) {
                throw new Error(res?.message || "Something went wrong");
            }
            setDialog({
                type: "success",
                message: `Reset link sent to ${maskEmail(res.data.email)}`,
            });
        } catch (err: any) {
            setDialog({
                type: "error",
                message: err?.message || "Failed to send reset link",
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
                            onClick={() => setDialog(null)}
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

                {/* 🔥 Glass Card */}
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
                                Forgot Password
                            </h2>

                            <p className="text-center text-sm text-gray-500 mb-6">
                                Enter your username to receive reset link
                            </p>

                            {/* FORM */}
                            <form onSubmit={sendResetLink} className="space-y-5">

                                {/* Username Field (Floating) */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder=" "
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="peer w-full px-10 py-3 border border-gray-300 rounded-xl 
                bg-[#f8fbff] text-sm focus:outline-none focus:border-[#1f4e7a] 
                focus:bg-white focus:ring-2 focus:ring-[#1f4e7a]/20"
                                    />

                                    <label className="absolute left-10 text-gray-500 text-sm transition-all px-1
                top-3 
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#162a4a] peer-focus:bg-white
                peer-not-placeholder-shown:-top-2 
                peer-not-placeholder-shown:text-xs 
                peer-not-placeholder-shown:bg-white">
                                        Username
                                    </label>
                                </div>

                                {/* Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 rounded-xl font-semibold text-white  bg-linear-to-r from-[#17395c] to-[#1f4e7a] hover:-translate-y-0.5 hover:text-yellow-300 
                                        hover:shadow-[0_10px_30px_rgba(23,57,92,0.35)]           transition disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                                            Please wait...
                                        </>
                                    ) : (
                                        <>Send Reset Link →</>
                                    )}
                                </button>

                            </form>
                        </div>
                    </div>

                    {/* ================= RIGHT: HERO ================= */}
                    <div className="hidden md:flex items-center justify-center relative    bg-linear-to-br from-[#162a4a] via-[#1f4e7a] to-[#2f6fa3] p-10">

                        {/* Decorative blobs */}
                        <div className="absolute w-64 h-64 bg-white/10 rounded-full -top-16 -right-16" />
                        <div className="absolute w-40 h-40 bg-white/10 rounded-full -bottom-10 -left-10" />

                        {/* Logo */}
                        <div className="relative w-44 h-44 rounded-full  border-4 border-white/40 bg-white/10 backdrop-blur-md    flex items-center justify-center shadow-2xl animate-[float_4s_ease-in-out_infinite]">

                            <Image width={176} height={176} src="/gcc/logo.png" alt="Logo"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}
