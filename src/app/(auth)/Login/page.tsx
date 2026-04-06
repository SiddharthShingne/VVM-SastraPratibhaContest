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
import { Eye, EyeOff, Link } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");
    setLoading(true);

    try {
      const data = await loginUser(username, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      router.replace("/studentDashboard");
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8eef5] to-[#f5f0d0] flex items-start justify-center p-10 font-sans">

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full h-[550px] rounded-2xl overflow-hidden backdrop-blur-xl bg-white/60 border border-white/50 shadow-[0_30px_80px_rgba(23,57,92,0.18)]">

        {/* LEFT PANEL */}
        <div className="bg-white flex items-center justify-center px-10 py-12 relative">
          
          {/* Top Gradient Strip */}
          <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

          <div className="w-full max-w-sm">

            {/* Heading */}
            <h1 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-[#162a4a] via-[#1f6fa3] to-[#f4df17] bg-clip-text text-transparent animate-[shine_4s_linear_infinite]">
              Welcome Back
            </h1>

            <p className="text-center text-sm text-gray-500 mb-6">
              Login to your account
            </p>

            {/* Error */}
            {localError && (
              <div className="flex items-center gap-2 mt-4 p-3 rounded-lg text-sm font-medium bg-red-50 border border-red-400 text-red-700">
                {localError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">

              {/* Username */}
              <div className="relative">
                <input
                  type="text"
                  placeholder=" "
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-10 py-3 border border-gray-300 rounded-xl bg-[#f8fbff] text-sm focus:border-[#1f4e7a] focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none peer"
                />
                <label className="absolute left-10 top-3 text-sm text-gray-500 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#162a4a] peer-focus:bg-white px-1 peer-valid:-top-2 peer-valid:text-xs">
                  Username
                </label>
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-10 py-3 pr-10 border border-gray-300 rounded-xl bg-[#f8fbff] text-sm focus:border-[#1f4e7a] focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none peer"
                />
                <label className="absolute left-10 top-3 text-sm text-gray-500 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#162a4a] peer-focus:bg-white px-1 peer-valid:-top-2 peer-valid:text-xs">
                  Password
                </label>

                {/* Eye Icon */}
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-[#162a4a]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-[#17395c] to-[#1f4e7a] hover:translate-y-[-2px] hover:text-yellow-300 hover:shadow-lg transition disabled:opacity-60"
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
              {/* import Link from "next/link"; */}


            </form>

          </div>

        </div>
        

        {/* RIGHT PANEL (HERO) */}
        <div className="hidden md:flex relative items-center justify-center bg-gradient-to-br from-[#162a4a] via-[#1f4e7a] to-[#2f6fa3] overflow-hidden">

          {/* Decorative blobs */}
          <div className="absolute w-[260px] h-[260px] bg-white/10 rounded-full -top-20 -right-20" />
          <div className="absolute w-[160px] h-[160px] bg-white/10 rounded-full -bottom-10 -left-10" />

          {/* Logo */}
          <div className="w-40 h-40 rounded-full overflow-hidden bg-white/20 border-4 border-white/50 shadow-xl flex items-center justify-center animate-bounce">
            <img
              src="/gcc/logo-latest.jpeg" // replace with your logo
              alt="logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

      </div>
    </div>
  );
}