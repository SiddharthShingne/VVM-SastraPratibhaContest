"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import HeaderTag from "@/components/ui/Header-tag";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [dialog, setDialog] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  /* ---------------- VALIDATIONS ---------------- */

  const validateUsername = (value: string) => {
    if (!value.trim()) {
      return "Username is required.";
    }

    const regex = /^[a-zA-Z0-9_]{3,20}$/;

    if (!regex.test(value)) {
      return "Username must be 3–20 characters and can contain letters, numbers, and underscore only.";
    }

    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) {
      return "Password is required.";
    }

    if (value.length < 6) {
      return "Password must contain at least 6 characters.";
    }

    if (value.length > 20) {
      return "Password cannot exceed 20 characters.";
    }

    return "";
  };

  /* ---------------- LOGIN ---------------- */

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userErr = validateUsername(username);
    const passErr = validatePassword(password);

    setUsernameError(userErr);
    setPasswordError(passErr);

    if (userErr || passErr) return;

    setLoading(true);

    try {
      const data = await loginUser(username, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setDialog({
        type: "success",
        message: "Login successful. Redirecting to dashboard...",
      });

      setTimeout(() => {
        router.replace("/studentDashboard");
      }, 1500);
    } catch (err) {
      setDialog({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Invalid username or password. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen bg-[#f4f6fb] relative">
    //   <HeaderTag title="Login" breadcrumb="Login" />

    //   {/* ---------------- MODAL ---------------- */}

    //   {dialog && (
    //     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
    //       <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-8 text-center">

    //         {dialog.type === "success" ? (
    //           <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
    //         ) : (
    //           <XCircle className="mx-auto text-red-500 mb-4" size={48} />
    //         )}

    //         <h3 className="text-xl font-semibold mb-3">
    //           {dialog.type === "success" ? "Login Successful" : "Login Failed"}
    //         </h3>

    //         <p className="text-gray-600 text-sm mb-6 leading-relaxed">
    //           {dialog.message}
    //         </p>

    //         <button
    //           onClick={() => setDialog(null)}
    //           className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
    //         >
    //           OK
    //         </button>
    //       </div>
    //     </div>
    //   )}

    //   {/* ---------------- LOGIN CARD ---------------- */}

    //   <div className="flex justify-center py-10 px-4">
    //     <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

    //       <h2 className="text-3xl font-bold text-[#1f2a44] mb-6 text-center">
    //         Log In
    //       </h2>

    //       <form onSubmit={handleLogin} className="space-y-5">

    //         {/* USERNAME */}

    //         <div>
    //           <label className="block text-sm font-medium text-gray-700 mb-1">
    //             Username
    //           </label>

    //           <input
    //             type="text"
    //             className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
    //             value={username}
    //             onChange={(e) => {
    //               setUsername(e.target.value);
    //               setUsernameError("");
    //             }}
    //           />

    //           {usernameError && (
    //             <p className="text-red-600 text-xs mt-1">{usernameError}</p>
    //           )}
    //         </div>

    //         {/* PASSWORD */}

    //         <div className="relative">
    //           <label className="block text-sm font-medium text-gray-700 mb-1">
    //             Password
    //           </label>

    //           <input
    //             type={showPassword ? "text" : "password"}
    //             className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
    //             value={password}
    //             onChange={(e) => {
    //               setPassword(e.target.value);
    //               setPasswordError("");
    //             }}
    //           />

    //           <button
    //             type="button"
    //             onClick={() => setShowPassword((v) => !v)}
    //             className="absolute right-3 top-9 text-gray-500"
    //           >
    //             {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    //           </button>
    //           {passwordError && (
    //             <p className="text-red-600 text-xs mt-1">{passwordError}</p>
    //           )}
    //         </div>
    //         {/* LOGIN BUTTON */}
    //         <button
    //           type="submit"
    //           disabled={loading}
    //           className="w-full py-2.5 rounded-lg text-white text-sm font-medium bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 transition disabled:opacity-60"
    //         >
    //           {loading ? "Logging In..." : "Log In"}
    //         </button>
    //       </form>
    //     </div>

    //   </div>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-[#e8eef5] to-[#f5f0d0] relative">
      <HeaderTag title="Login" breadcrumb="Login" />

      {/* ---------------- MODAL ---------------- */}
      {dialog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-8 text-center">

            {dialog.type === "success" ? (
              <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
            ) : (
              <XCircle className="mx-auto text-red-500 mb-4" size={48} />
            )}

            <h3 className="text-xl font-semibold mb-3">
              {dialog.type === "success" ? "Login Successful" : "Login Failed"}
            </h3>

            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              {dialog.message}
            </p>

            <button
              onClick={() => setDialog(null)}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ---------------- LOGIN SECTION ---------------- */}

      <div className="flex justify-center items-start py-16 px-4">
        <div className="grid md:grid-cols-2 w-full max-w-5xl rounded-2xl overflow-hidden 
      backdrop-blur-md bg-white/60 border border-white/40 shadow-[0_30px_80px_rgba(23,57,92,0.18)]">

          {/* ================= LEFT: FORM ================= */}
          <div className="bg-white p-10 flex items-center justify-center relative">

            {/* top gradient stripe */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

            <div className="w-full max-w-sm">

              {/* LOGO */}
              <div className="text-center mb-3">
                <img src="/logo.png" className="h-14 mx-auto" />
              </div>

              {/* HEADING */}
              <h2 className="text-3xl font-extrabold text-center mb-2 
            bg-gradient-to-r from-[#162a4a] via-[#1f6fa3] to-[#f4df17] 
            bg-clip-text text-transparent">
                Welcome Back
              </h2>

              <p className="text-center text-sm text-gray-500 mb-6">
                Login to continue your journey
              </p>

              {/* FORM */}
              <form onSubmit={handleLogin} className="space-y-5">

                {/* USERNAME */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder=" "
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setUsernameError("");
                    }}
                    className="peer w-full px-10 py-3 border border-gray-300 rounded-xl 
                bg-[#f8fbff] text-sm focus:outline-none focus:border-[#1f4e7a] 
                focus:bg-white focus:ring-2 focus:ring-[#1f4e7a]/20"
                  />

                  <label className="absolute left-10 top-3 text-gray-500 text-sm 
                transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#162a4a] 
                peer-focus:bg-white px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
                    Username
                  </label>

                  {usernameError && (
                    <p className="text-red-500 text-xs mt-1">{usernameError}</p>
                  )}
                </div>

                {/* PASSWORD */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder=" "
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                    className="peer w-full px-10 py-3 border border-gray-300 rounded-xl 
                bg-[#f8fbff] text-sm focus:outline-none focus:border-[#1f4e7a] 
                focus:bg-white focus:ring-2 focus:ring-[#1f4e7a]/20"
                  />

                  <label className="absolute left-10 top-3 text-gray-500 text-sm 
                transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#162a4a] 
                peer-focus:bg-white px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
                    Password
                  </label>

                  {/* eye icon */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-[#162a4a]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>

                  {passwordError && (
                    <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                  )}
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-white 
              bg-gradient-to-r from-[#17395c] to-[#1f4e7a] 
              hover:-translate-y-[2px] hover:text-yellow-300 
              hover:shadow-[0_10px_30px_rgba(23,57,92,0.35)] 
              transition disabled:opacity-60"
                >
                  {loading ? "Logging In..." : "Log In"}
                </button>
              </form>
            </div>
          </div>

          {/* ================= RIGHT: HERO ================= */}
          <div className="hidden md:flex items-center justify-center relative 
bg-linear-to-br from-[#162a4a] via-[#1f4e7a] to-[#2f6fa3] p-10">

            {/* decorative blobs */}
            <div className="absolute w-64 h-64 bg-white/10 rounded-full -top-16 -right-16" />
            <div className="absolute w-40 h-40 bg-white/10 rounded-full -bottom-10 -left-10" />

            {/* logo */}
            <div className="relative w-44 h-44 rounded-full 
  border-4 border-white/40 bg-white/10 backdrop-blur-md 
  flex items-center justify-center shadow-2xl animate-[float_4s_ease-in-out_infinite]">

              <Image
                src="/gcc/logo-latest.jpeg"
                alt="VVM Logo"
                width={180}
                height={180}
                className="w-full h-full object-cover rounded-full"
              />

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}