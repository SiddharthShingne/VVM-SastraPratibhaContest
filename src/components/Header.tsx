"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  
  
  // localStorage.setItem("username", Response.username:any  );
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("token");
    }
    return false;
  });

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false); // success state

  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("auth-change", syncAuth);
    return () => window.removeEventListener("auth-change", syncAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-change"));
    setShowLogoutDialog(false);
    setLoggedOut(true); // show success dialog

    // After 2s, redirect to login
    setTimeout(() => {
      setLoggedOut(false);
      router.push("/Login");
    }, 2000);
  };

  return (
    <>
      <div className="flex items-center justify-between flex-wrap px-3 bg-[#111d35] text-[#ffffffa2] text-xs font-medium py-3">
        <div className="flex items-center gap-1 max-w-full lg:flex">
          <Image src="/hand-emoji.svg" alt="Hand Emoji" width={16} height={16} />
          <b className="text-sm">
            Welcome to Vidyarthi Vigyan Manthan – Unlocking the Power of Education!
          </b>
        </div>

      <div className="flex gap-2 w-full lg:w-auto justify-end mt-1 lg:mt-0 pr-5">

        {/* <button
          onClick={() =>
            isLoggedIn
              ? handleLogout()
              : router.push("/Login")
          }
          className="border-2 border-[#b57edc] text-white text-xs font-semibold rounded-full transition duration-200 hover:text-yellow-200 hover:bg-[#485e94] hover:font-bold py-2 px-3"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button> */}

        {/* <button
          onClick={() =>
            isLoggedIn
              ? router.push("/studentDashboard")
              : router.push("/registration/individual-student-registration")
          }
          className="border-2 border-[#b57edc] text-white text-xs font-semibold px-3 rounded-full transition duration-200 hover:text-yellow-200 hover:bg-[#485e94] hover:font-bold py-2"
        >
          {isLoggedIn ? "User Profile" : "Register"}
        </button> */}


        <button
          onClick={() =>
            
            isLoggedIn
              ? handleLogout()
              : router.push("/Login")
          }
          className="
    bg-linear-to-r from-[#f5f0d0] to-[#efe4b0]    text-[#17395c] text-xs font-semibold    px-4 py-2 rounded-full    border border-[#e6d98c]    shadow-sm
    hover:from-[#efe4b0] hover:to-[#f5e6a0]    hover:shadow-md hover:-translate-y-px    active:scale-95    transition-all duration-300
  "
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>

        {/* <button
          onClick={() =>
            isLoggedIn
              ? router.push("/studentDashboard")
              : router.push("/registration/individual-student-registration")
          }
          className="     bg-[#fff8dc]    text-[#17395c] text-xs font-semibold    px-4 py-2 rounded-full    border border-[#e6d98c]    shadow-sm    hover:bg-[#f5e6a0]
    hover:shadow-md hover:-translate-y-px    active:scale-95    transition-all duration-300
  "
        >
          {isLoggedIn ? "User Profile" : "Register"}
        </button> */}

        
        <button
  // onClick={() => {
  //   if (!isLoggedIn) {
  //     router.push("/registration/individual-student-registration");
  //     return;
  //   }

  //   const username = localStorage.getItem("username");

  //   if (username?.startsWith("STC") || username?.startsWith("ZOC")) {
  //     router.push("/state-dashboard"); // ✅ State users
  //   } else {
  //     router.push("/studentDashboard"); // ✅ Normal students
  //   }
  // }}

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
  className="bg-[#fff8dc] text-[#17395c] text-xs font-semibold px-4 py-2 rounded-full border border-[#e6d98c] shadow-sm hover:bg-[#f5e6a0] hover:shadow-md hover:-translate-y-px active:scale-95 transition-all duration-300"
>
  {isLoggedIn ? "User Profile" : "Register"}
</button>

      </div>
    </div>
  );
};

export default Header;