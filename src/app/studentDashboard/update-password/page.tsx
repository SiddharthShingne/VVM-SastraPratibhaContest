/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { changePassword } from "@/services/importantDatesService";

export default function UpdateProfile() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validate = () => {
    const newErrors: any = {};

    if (!oldPassword) {
      newErrors.oldPassword = "Please enter your current password.";
    }

    if (!newPassword) {
      newErrors.newPassword = "Please enter a new password.";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters.";
    } else if (newPassword.length > 10) {
      newErrors.newPassword = "Password cannot exceed 10 characters.";
    } else if (!/[A-Z]/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one special character.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password.";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setMessage("");

    if (!validate()) return;

    try {
      setLoading(true);

      await changePassword(oldPassword, newPassword, confirmPassword);

      setMessage("Password updated successfully.");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong";
      setErrors({ api: msg });
    
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center px-4 py-10 ">

  <div
    className="w-full max-w-3xl rounded-[28px] border backdrop-blur-md relative overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.78)", border: "1px solid rgba(23,57,92,0.18)", boxShadow: ` 0 24px 60px rgba(23,57,92,0.18),
    0 6px 18px rgba(23,57,92,0.10),
    inset 0 1px 0 rgba(255,255,255,0.9),
    inset 0 0 0 1px rgba(255,255,255,0.35)
  `,          // glass effect clarity
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
  >

    {/* Top Gradient Bar */}
    <div className="absolute top-0 left-0 w-full h-1.25 bg-[linear-gradient(90deg,#17395c_0%,#f4df17_50%,#17395c_100%)]" />

    <div className="p-8">

      {/* TITLE */}
      <h2 className="text-[26px] font-extrabold text-[#17395c] text-center mb-6">
        Update Student Password
      </h2>

      {/* Success */}
      {message && (
        <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 text-sm text-center">
          {message}
        </div>
      )}

      {/* API Error */}
      {errors.api && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-800 text-sm text-center">
          {errors.api}
        </div>
      )}

      <div className="space-y-6">

        {/* OLD PASSWORD */}
        <div>
          <label className="block text-sm font-semibold text-[#4f6480] mb-1">
            Old Password
          </label>

          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={`w-full rounded-lg px-4 py-3 pr-12 outline-none border transition-all ${
                errors.oldPassword
                  ? "border-red-500 focus:ring-2 focus:ring-red-300"
                  : "border-[#d0dde9] focus:ring-2 focus:ring-[#17395c]"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.oldPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.oldPassword}
            </p>
          )}
        </div>

        {/* NEW PASSWORD */}
        <div>
          <label className="block text-sm font-semibold text-[#4f6480] mb-1">
            New Password
          </label>

          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
                  value={newPassword}
                  maxLength={10}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`w-full rounded-lg px-4 py-3 pr-12 outline-none border transition-all ${
                errors.newPassword
                  ? "border-red-500 focus:ring-2 focus:ring-red-300"
                  : "border-[#d0dde9] focus:ring-2 focus:ring-[#17395c]"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.newPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.newPassword}
            </p>
              )}
              {/* ADD THIS hint below */}
              {!errors.newPassword && (
                <p className="text-[11px] text-[#9fb0c2] mt-1">
                  6–10 characters · uppercase · lowercase · number · special character (!@#$%...)
                </p>
              )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="block text-sm font-semibold text-[#4f6480] mb-1">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full rounded-lg px-4 py-3 pr-12 outline-none border transition-all ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-2 focus:ring-red-300"
                  : "border-[#d0dde9] focus:ring-2 focus:ring-[#17395c]"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-8 py-3 rounded-[14px] font-extrabold text-[15px] transition-all duration-200 ${
              loading
                ? "bg-[#dbe3ec] text-[#9fb0c2] cursor-not-allowed"
                : "text-white"
            }`}
            style={
              !loading
                ? {
                    background:
                      "linear-gradient(135deg,#17395c 0%,#1f4e7a 100%)",
                    boxShadow:
                      "0 6px 20px rgba(23,57,92,.30), inset 0 1px 0 rgba(255,255,255,.18)",
                  }
                : {}
            }
          >
            {loading ? "Updating..." : "Submit"}
          </button>
        </div>

      </div>
    </div>
  </div>
</div>
  );
}