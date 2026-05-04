"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   // ✅ run after render (no warning)
  //   const timer = setTimeout(() => {
  //     const token = localStorage.getItem("token");
  //     setIsLoggedIn(!!token);
  //     setMounted(true);
  //   }, 0);

  //   const syncAuth = () => {
  //     setIsLoggedIn(!!localStorage.getItem("token"));
  //   };

  //   window.addEventListener("auth-change", syncAuth);

  //   return () => {
  //     clearTimeout(timer);
  //     window.removeEventListener("auth-change", syncAuth);
  //   };
  // }, []);


  useEffect(() => {
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setMounted(true);
  };

  checkAuth(); // initial run

  window.addEventListener("auth-change", checkAuth);

  return () => {
    window.removeEventListener("auth-change", checkAuth);
  };
}, []);





  const handleLogout = () => {
    localStorage.removeItem("token");

      setIsLoggedIn(false); // ✅ YAHI ADD KARNA HAI
    window.dispatchEvent(new Event("auth-change"));
    router.push("/Login");
  };

  // ✅ hydration safe
  if (!mounted) return null;

  return (
    <div className="flex items-center justify-between px-3 bg-[#111d35] text-white text-xs py-3">
      
      <div className="flex items-center gap-1">
        <Image src="/hand-emoji.svg" alt="Hand Emoji" width={16} height={16} />
        <b className="text-sm">
          Welcome to Vidyarthi Vigyan Manthan
        </b>
      </div>

      <div className="flex gap-2 pr-5">

        <button
          onClick={() =>
            isLoggedIn ? handleLogout() : router.push("Login")
          }
          className="bg-yellow-200 text-[#17395c] px-4 py-2 rounded-full"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>

        <button
          onClick={() => {
            if (!isLoggedIn) {
              router.push("/registration/individual-student-registration");
              return;
            }

            const role = localStorage.getItem("role");

            if (role === "STATE") {
              router.push("/state-dashboard");
            } else {
              router.push("/studentDashboard");
            }
          }}
          className="bg-[#fff8dc] text-[#17395c] px-4 py-2 rounded-full"
        >
          {isLoggedIn ? "User Profile" : "Register"}
        </button>

      </div>
    </div>
  );
};

export default Header;