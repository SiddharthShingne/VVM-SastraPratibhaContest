/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { changePassword } from "@/services/importantDatesService";

export default function UpdatePasswordPage() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});

  const [show, setShow] = useState({ old: false, new: false, confirm: false,});

  const [loading, setLoading] = useState(false);

  const [dialog, setDialog] = useState({
    isOpen: false,
    type: "success", // success | error
    title: "",
    message: "",
  });

  /* ---------------- INPUT ---------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // remove error on typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const newErrors: any = {};

    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!oldPassword) {
      newErrors.oldPassword = "Old password is required";
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else {
      // Strong password regex
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordRegex.test(newPassword)) {
        newErrors.newPassword =
          "Min 8 chars, include uppercase, lowercase, number & special character";
      }

      // ❗ Prevent same password reuse
      if (newPassword === oldPassword) {
        newErrors.newPassword = "New password must be different from old password";
      }
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await changePassword(
        formData.oldPassword,
        formData.newPassword,
        formData.confirmPassword
      );

      setDialog({
        isOpen: true,
        type: "success",
        title: "Password Updated",
        message: res?.message || "Your password has been updated successfully.",
      });

      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      setDialog({
        isOpen: true,
        type: "error",
        title: "Update Failed",
        message: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const closeDialog = () => {
    setDialog({ ...dialog, isOpen: false });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">

      {/* CARD */}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-10">

        <h2 className="text-3xl font-bold text-center text-[#243f5c] mb-10">
          Update Password
        </h2>

        <div className="space-y-6">

          {/* INPUT FIELD COMPONENT */}
          {[
            { label: "Old Password", name: "oldPassword", key: "old" },
            { label: "New Password", name: "newPassword", key: "new" },
            { label: "Confirm Password", name: "confirmPassword", key: "confirm" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold text-[#4b5f75] mb-2">
                {field.label}
              </label>

              <div className="relative">
                <input
                  type={show[field.key as keyof typeof show] ? "text" : "password"}
                  name={field.name}
                  value={(formData as any)[field.name]}
                  onChange={handleChange}
                  className={`w-full bg-[#f2f5f9] border ${errors[field.name] ? "border-red-400" : "border-[#d6e0ea]"
                    } rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#17395c]`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShow({ ...show, [field.key]: !show[field.key as keyof typeof show] })
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {show[field.key as keyof typeof show] ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}

          {/* BUTTON */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-10 py-3 rounded-xl text-white font-semibold bg-linear-to-r from-[#17395c] to-[#2c5b84] shadow-lg hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- DIALOG ---------------- */}
      {dialog.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full px-8 py-10 text-center">

            {/* ICON */}
            <div className={`mx-auto mb-5 w-16 h-16 rounded-full flex items-center justify-center
              ${dialog.type === "success" ? "bg-emerald-50" : "bg-red-50"}`}>

              {dialog.type === "success"
                ? <FaCheckCircle className="text-emerald-500 text-3xl" />
                : <FaTimesCircle className="text-red-500 text-3xl" />}
            </div>

            {/* TITLE */}
            <h3 className="text-xl font-semibold mb-2">
              {dialog.title}
            </h3>

            {/* MESSAGE */}
            <p className="text-sm text-gray-500 mb-8 wrap-break-word whitespace-pre-wrap">
              {dialog.message}
            </p>

            {/* BUTTON */}
            <button
              onClick={closeDialog}
              className={`px-10 py-2.5 rounded-lg text-sm font-medium text-white
                ${dialog.type === "success"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-red-500 hover:bg-red-600"}`}
            >
              OK
            </button>

          </div>
        </div>
      )}
    </div>
  );
}