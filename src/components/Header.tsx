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
    <div id="announcement-bar">
      <div className="flex items-center justify-between flex-wrap px-3 bg-[#111d35] text-[#ffffffa2] text-xs font-medium py-3">
        <div className="flex items-center gap-1 max-w-full lg:flex">
          <Image src="/hand-emoji.svg" alt="Hand Emoji" width={16} height={16} />
          <b className="text-sm">
            Welcome to Śāstra Pratibhā Contest – Unlocking the Power of Education!
          </b>
        </div>

        <div className="flex gap-2 w-full lg:w-auto justify-end mt-1 lg:mt-0 pr-5">
          <button
            onClick={() =>
              isLoggedIn ? setShowLogoutDialog(true) : router.push("/Login")
            }
            className="bg-linear-to-r from-[#f5f0d0] to-[#efe4b0] text-[#17395c] text-xs font-semibold px-4 py-2 rounded-full border border-[#e6d98c] shadow-sm hover:from-[#efe4b0] hover:to-[#f5e6a0] hover:shadow-md hover:-translate-y-px active:scale-95 transition-all duration-300"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>

          <button
            onClick={() =>
              isLoggedIn
                ? router.push("/studentDashboard")
                : router.push("/registration/individual-student-registration")
            }
            className="bg-[#fff8dc] text-[#17395c] text-xs font-semibold px-4 py-2 rounded-full border border-[#e6d98c] shadow-sm hover:bg-[#f5e6a0] hover:shadow-md hover:-translate-y-px active:scale-95 transition-all duration-300"
          >
            {isLoggedIn ? "User Profile" : "Register"}
          </button>
        </div>
      </div>

      {/* ── LOGOUT CONFIRMATION DIALOG ── */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLogoutDialog(false)}
          />
          <div
            className="relative z-10 w-[90vw] max-w-sm mx-auto rounded-2xl p-6 shadow-2xl"
            style={{
              background: "linear-gradient(145deg, #ffffff, #f4f8fc)",
              border: "1px solid rgba(23,57,92,0.12)",
            }}
          >
            <div
              className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
              style={{
                background: "linear-gradient(90deg, #17395c 0%, #f4df17 50%, #17395c 100%)",
              }}
            />
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl shadow-md"
              style={{ background: "linear-gradient(135deg, #c0392b, #e74c3c)" }}
            >
              <FaSignOutAlt />
            </div>
            <h3 className="text-center text-[17px] font-extrabold text-[#17395c] mb-1">
              Confirm Logout
            </h3>
            <p className="text-center text-[13px] text-[#7a90a8] mb-6">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#d0dde9] text-[#4a6278] text-[13.5px] font-semibold hover:bg-[#f0f4f8] transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 rounded-xl text-white text-[13.5px] font-semibold transition-all duration-200 hover:opacity-90 shadow-md"
                style={{ background: "linear-gradient(135deg, #c0392b, #e74c3c)" }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── LOGGED OUT SUCCESS DIALOG ── */}
      {loggedOut && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative z-10 w-[90vw] max-w-sm mx-auto rounded-2xl p-8 shadow-2xl text-center"
            style={{
              background: "linear-gradient(145deg, #ffffff, #f4f8fc)",
              border: "1px solid rgba(23,57,92,0.12)",
            }}
          >
            <div
              className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
              style={{
                background: "linear-gradient(90deg, #17395c 0%, #f4df17 50%, #17395c 100%)",
              }}
            />
            {/* Animated checkmark */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl shadow-md"
              style={{ background: "linear-gradient(135deg, #17395c, #1f6fa3)" }}
            >
              ✓
            </div>
            <h3 className="text-[18px] font-extrabold text-[#17395c] mb-1">
              Logged Out!
            </h3>
            <p className="text-[13px] text-[#7a90a8]">
              You have been successfully logged out. Redirecting to login…
            </p>
            {/* Progress bar */}
            <div className="mt-5 h-1 rounded-full bg-[#e8eef6] overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #17395c, #f4df17)",
                  animation: "progressBar 2s linear forwards",
                }}
              />
            </div>
            <style>{`
              @keyframes progressBar {
                from { width: 0%; }
                to   { width: 100%; }
              }
            `}</style>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;