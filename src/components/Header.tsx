"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Header = () => {
    const router = useRouter();
     const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/Login");
  };

    return (
        <div className="flex items-center justify-between flex-wrap px-3 py-1 bg-[#111d35] text-[#ffffffa2] text-xs font-medium py-3">
            <div className="flex items-center gap-1 max-w-full lg:flex">
                <Image src="/hand-emoji.svg" alt="Hand Emoji" width={16} height={16} />
                <b className="font-weight-bold text-sm">
                    Welcome to Vidyarthi Vigyan Manthan – Unlocking the Power of
                    Education!
                </b>

 
            </div>

            <div className="flex gap-2 w-full lg:w-auto justify-end mt-1 lg:mt-0 pr-5">
              

                 <button
        onClick={() =>
          isLoggedIn
            ? handleLogout()
            : router.push("/Login")
        }
        className="border-2 border-[#b57edc] text-white text-xs font-semibold px-3 py-1 rounded-full transition duration-200 hover:text-yellow-200 hover:bg-[#485e94] hover:font-bold   px-2 py-2 fornt-weight-bold-text-sm" 
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>

      <button
        onClick={() =>
          isLoggedIn
            ? router.push("/studentDashboard")
            : router.push("/registration/individual-student-registration")
        }
        className="border-2 border-[#b57edc] text-white text-xs font-semibold px-3 py-1 rounded-full transition duration-200 hover:text-yellow-200 hover:bg-[#485e94] hover:font-bold py-2 px-2  font-weight-bold-text-sm "
      >
        {isLoggedIn ? "User Profile" : "Register"}
      </button>

            </div>
        </div>
    );
};

export default Header;
