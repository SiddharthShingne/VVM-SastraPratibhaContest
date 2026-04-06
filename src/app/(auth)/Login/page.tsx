// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { loginUser } from "@/services/authService";
// import HeaderTag from "@/components/ui/Header-tag";
// import { Eye, EyeOff } from "lucide-react";

// export default function LoginPage() {
//   const router = useRouter();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [localError, setLocalError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLocalError("");
//     setLoading(true);

//     try {
//       const data = await loginUser(username, password);

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("username", data.username);

//       router.replace("/studentDashboard");
//     } catch (err) {
//       setLocalError(err instanceof Error ? err.message : "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f4f6fb]">
//       <HeaderTag title="Login" breadcrumb="Login" />

//       <div className="flex justify-center py-10 px-4">
//         <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
//           <h2 className="text-3xl font-bold text-[#1f2a44] mb-6 text-center">
//             Log In
//           </h2>

//           {localError && (
//             <p className="text-red-500 text-sm mb-4 text-center">{localError}</p>
//           )}

//           <form onSubmit={handleLogin} className="space-y-5">
//             <div>
//               <label className="block text-sm text-gray-600 mb-1">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="relative">
//               <label className="block text-sm text-gray-600 mb-1">
//                 Password
//               </label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((v) => !v)}
//                 className="absolute right-3 top-9 text-gray-500"
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-2.5 rounded-lg text-white text-sm font-medium bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 transition disabled:opacity-60"
//             >
//               {loading ? "Logging In..." : "Log In"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import HeaderTag from "@/components/ui/Header-tag";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

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
    <div className="min-h-screen bg-[#f4f6fb] relative">
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

      {/* ---------------- LOGIN CARD ---------------- */}

      <div className="flex justify-center py-10 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-3xl font-bold text-[#1f2a44] mb-6 text-center">
            Log In
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* USERNAME */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>

              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError("");
                }}
              />

              {usernameError && (
                <p className="text-red-600 text-xs mt-1">{usernameError}</p>
              )}
            </div>

            {/* PASSWORD */}

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {passwordError && (
                <p className="text-red-600 text-xs mt-1">{passwordError}</p>
              )}
            </div>
            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-white text-sm font-medium bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}