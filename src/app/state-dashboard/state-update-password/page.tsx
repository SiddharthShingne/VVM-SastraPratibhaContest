
"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "@/services/axiosInstance";

export default function UpdatePasswordPage() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  /* ---------------- HANDLE INPUT ---------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await axiosInstance.post("/update-password", {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      alert("Password updated successfully");

      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="  min-h-screen flex items-center justify-center bg-[#eef3f9] p-4">
      
      {/* CARD */}
      <div className="w-full max-w-3xl bg-white rounded-[30px] shadow-xl relative overflow-hidden p-10">

        {/* TOP GRADIENT BORDER */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

        {/* TITLE */}
        <h2 className="text-3xl font-extrabold text-center text-[#243f5c] mb-10">
          Update Student Password
        </h2>

        <div className="space-y-6">

          {/* OLD PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-[#4b5f75] mb-2">
              Old Password
            </label>

            <div className="relative">
              <input
                type={show.old ? "text" : "password"}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="w-full bg-[#f2f5f9] border border-[#d6e0ea] rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#17395c]"
              />

              <button
                type="button"
                onClick={() => setShow({ ...show, old: !show.old })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {show.old ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* NEW PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-[#4b5f75] mb-2">
              New Password
            </label>

            <div className="relative">
              <input
                type={show.new ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full bg-[#f2f5f9] border border-[#d6e0ea] rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#17395c]"
              />

              <button
                type="button"
                onClick={() => setShow({ ...show, new: !show.new })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {show.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-[#4b5f75] mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={show.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-[#f2f5f9] border border-[#d6e0ea] rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#17395c]"
              />

              <button
                type="button"
                onClick={() =>
                  setShow({ ...show, confirm: !show.confirm })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {show.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-10 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#17395c] to-[#2c5b84] shadow-lg hover:scale-105 transition"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}