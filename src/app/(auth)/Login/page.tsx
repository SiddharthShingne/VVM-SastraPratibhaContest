"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [showNotice, setShowNotice] = useState(true);
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
      return "Username must be 3–20 characters and can contain letters, numbers, symbols and underscore only.";
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
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    const userErr = validateUsername(trimmedUsername);
    const passErr = validatePassword(trimmedPassword);

    setUsernameError(userErr);
    setPasswordError(passErr);

    if (userErr || passErr) return;

    setLoading(true);

    try {
      const data = await loginUser(trimmedUsername, trimmedPassword);

      // ✅ Store full user object — this fixes name, profile, dashboard data
      localStorage.setItem("user", JSON.stringify(data));

      // ✅ Store token only if backend returns one
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // ✅ Prefer role from API response, fallback to username prefix check
      localStorage.setItem(
        "role",
        data.role_name?.toLowerCase() ||
        (trimmedUsername.toUpperCase().startsWith("STC") ||
          trimmedUsername.toUpperCase().startsWith("ZOC")
          ? "state-coordinator"
          : "student")
      );
      window.dispatchEvent(new Event("auth-change"));

      setDialog({
        type: "success",
        message: "Login successful. Redirecting to dashboard...",
      });

      setTimeout(() => {
        const role =
          data.role_name?.toLowerCase() ||
          (trimmedUsername.toUpperCase().startsWith("STC") ||
            trimmedUsername.toUpperCase().startsWith("ZOC")
            ? "state-coordinator"
            : "student");

        if (role === "state-coordinator") {
          router.replace("/state-dashboard");
        } else {
          router.replace("/studentDashboard");
        }
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

  useEffect(() => {
    setUsername("");
    setPassword("");

    // Force clear in case browser bypasses React state
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#e8eef5] to-[#f5f0d0] relative">
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
      {/* ---------------- SIF NOTICE DIALOG ---------------- */}
      {showNotice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-8 text-center">
            <div className="text-5xl mb-4">⚠️</div>

            <h3 className="text-xl font-bold text-[#17395c] mb-3">
              Important Notice
            </h3>

            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              <strong>    This site is accessible only for SIF Students Not Indian Students</strong>.
                        </p>

            <button
              onClick={() => setShowNotice(false)}
              className="px-6 py-2.5 bg-[#17395c] text-white rounded-lg text-sm font-semibold hover:bg-[#0f2742] transition"
            >
            OK 
            </button>
          </div>
        </div>
      )}
      {/* ---------------- LOGIN SECTION ---------------- */}

      <div className="flex justify-center items-start py-16 px-4">
        <div
          className="grid md:grid-cols-2 w-full max-w-5xl rounded-2xl overflow-hidden 
      backdrop-blur-md bg-white/60 border border-white/40 shadow-[0_30px_80px_rgba(23,57,92,0.18)]"
        >
          {/* ================= LEFT: FORM ================= */}
          <div className="bg-white p-10 flex items-center justify-center relative">
            {/* top gradient stripe */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

            <div className="w-full max-w-sm">
              {/* HEADING */}
              <h2
                className="text-3xl font-extrabold text-center mb-2 
            bg-linear-to-r from-[#162a4a] via-[#1f6fa3] to-[#f4df17] 
            bg-clip-text text-transparent"
              >
                Login
              </h2>

              <p className="text-center text-sm text-gray-500 mb-6">
                Login to continue your journey
              </p>

              {/* FORM */}
              <form
                onSubmit={handleLogin}
                autoComplete="off"
                className="space-y-5"
              >
                {/* USERNAME */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder=" "
                    autoComplete="off"
                    name="vvm_user_field"
                    readOnly
                    onFocus={(e) => e.currentTarget.removeAttribute("readOnly")}
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setUsernameError("");
                    }}
                    className="peer w-full px-10 py-3 border border-gray-300 rounded-xl 
    bg-[#f8fbff] text-sm focus:outline-none focus:border-[#1f4e7a] 
    focus:bg-white focus:ring-2 focus:ring-[#1f4e7a]/20"
                  />

                  <label
                    className="absolute left-10 text-gray-500 text-sm transition-all px-1  top-3 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#162a4a] peer-focus:bg-white
                                          peer-not-placeholder-shown:-top-2  peer-not-placeholder-shown:text-xs  peer-not-placeholder-shown:bg-white"
                  >
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
                    autoComplete="new-password"
                    name="vvm_pass_field"
                    readOnly
                    onFocus={(e) => e.currentTarget.removeAttribute("readOnly")}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                    className="peer w-full px-10 py-3 border border-gray-300 rounded-xl    bg-[#f8fbff] text-sm focus:outline-none focus:border-[#1f4e7a]     focus:bg-white focus:ring-2 focus:ring-[#1f4e7a]/20"
                  />

                  <label
                    className="absolute left-10 text-gray-500 text-sm transition-all px-1
  top-3 
  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#162a4a] peer-focus:bg-white
  peer-not-placeholder-shown:-top-2 
  peer-not-placeholder-shown:text-xs 
  peer-not-placeholder-shown:bg-white"
                  >
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

                {/* Forgot Password */}
                <div className="flex justify-start">
                  <button
                    type="button"
                    onClick={() => router.push("/forgot-password")}
                    className="text-xs text-[#5bacf8] hover:text-[#1a60a5] font-bold transition"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-white 
              bg-linear-to-r from-[#17395c] to-[#1f4e7a] 
              hover:-translate-y-0.5 hover:text-yellow-300 
              hover:shadow-[0_10px_30px_rgba(23,57,92,0.35)] 
              transition disabled:opacity-60"
                >
                  {loading ? "Logging In..." : "Log In"}
                </button>
              </form>
            </div>
          </div>

          {/* ================= RIGHT: HERO ================= */}
          <div className="hidden md:flex items-center justify-center relative bg-linear-to-br from-[#162a4a] via-[#1f4e7a] to-[#2f6fa3] p-10">
            {/* decorative blobs */}
            <div className="absolute w-64 h-64 bg-white/10 rounded-full -top-16 -right-16" />
            <div className="absolute w-40 h-40 bg-white/10 rounded-full -bottom-10 -left-10" />

            {/* logo */}
            <div
              className="relative w-44 h-44 rounded-full 
  border-4 border-white/40 bg-white/10 backdrop-blur-md 
  flex items-center justify-center shadow-2xl animate-[float_4s_ease-in-out_infinite]"
            >
              <Image
                src="/gcc/logo.png"
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