/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle, FaLock, FaShieldAlt } from "react-icons/fa";
import { changePassword } from "@/services/importantDatesService";

export default function UpdatePasswordPage() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [show, setShow] = useState({ old: false, new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  /* ---------------- INPUT ---------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const newErrors: any = {};
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!oldPassword) newErrors.oldPassword = "Old password is required";

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        newErrors.newPassword =
          "Min 8 chars, include uppercase, lowercase, number & special character";
      }
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
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
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

  const closeDialog = () => setDialog({ ...dialog, isOpen: false });

  const fields = [
    { label: "Old Password", name: "oldPassword", key: "old" },
    { label: "New Password", name: "newPassword", key: "new" },
    { label: "Confirm Password", name: "confirmPassword", key: "confirm" },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shine {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .anim-up { animation: fadeSlideUp 0.4s cubic-bezier(.22,1,.36,1) both; }
        .shine-title {
          background: linear-gradient(90deg, #162a4a 0%, #1f6fa3 40%, #f4df17 60%, #162a4a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 4s linear infinite;
        }
      `}</style>

      <div className="min-h-[70vh] flex items-center justify-center p-3 sm:p-6">
        <div
          className="w-full max-w-lg rounded-3xl overflow-hidden anim-up"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(23,57,92,0.09)",
            boxShadow: "0 10px 40px rgba(23,57,92,0.12), 0 2px 8px rgba(23,57,92,0.07)",
          }}
        >
          {/* Top accent bar — same as sidebar */}
          <div
            className="h-1 w-full"
            style={{
              background: "linear-gradient(90deg, #17395c 0%, #f4df17 50%, #17395c 100%)",
            }}
          />

          {/* Header */}
          <div className="px-6 sm:px-8 pt-7 pb-5 flex items-center gap-4 border-b border-slate-100">
            {/* <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
              style={{ background: "linear-gradient(135deg, #17395c 0%, #1f4e7a 100%)" }}
            >
              <FaShieldAlt className="text-[#f4df17] text-lg" />
            </div> */}
                        <div className="text-center">
              <h2 className="text-lg sm:text-xl font-extrabold shine-title inline-block">
                Update Password
              </h2>
            </div>
          </div>

          {/* Form */}
          <div className="px-6 sm:px-8 py-6 space-y-5">
            {fields.map((field, i) => (
              <div
                key={field.name}
                className="anim-up"
                style={{ animationDelay: `${(i + 1) * 80}ms` }}
              >
                <label className="block text-xs font-bold text-[#4a6278] uppercase tracking-wider mb-2">
                  {field.label}
                </label>

                <div className="relative">
                  {/* Lock icon left */}
                  <FaLock
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0bec9] text-sm pointer-events-none"
                  />

                  <input
                    type={show[field.key as keyof typeof show] ? "text" : "password"}
                    name={field.name}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    className={`w-full pl-10 pr-11 py-3 rounded-xl text-sm text-slate-700 outline-none transition-all duration-200
                      bg-[#f4f7fb] placeholder:text-slate-300
                      border ${errors[field.name]
                        ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-[#dce6f0] focus:border-[#17395c] focus:ring-2 focus:ring-[#17395c]/10"
                      }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShow({ ...show, [field.key]: !show[field.key as keyof typeof show] })
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7a8fa6] hover:text-[#17395c] transition-colors"
                  >
                    {show[field.key as keyof typeof show] ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                  </button>
                </div>

                {errors[field.name] && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <FaTimesCircle size={11} />
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            {/* Password rules hint */}
            <div
              className="rounded-xl px-4 py-3 text-[10px] text-[#5a7a96] leading-relaxed anim-up"
              style={{
                background: "linear-gradient(135deg, #eef4fb, #f5f8fc)",
                border: "1px solid #dce6f0",
                animationDelay: "320ms",
              }}
            >
              <span className="font-bold text-[#17395c]">Password should be </span>
              Min 6 characters · Uppercase & lowercase and include numbers and special characters
              <span className="text-[#7a90a8]"> (@$!%*?&)</span>
            </div>

            {/* Submit button */}
            <div
              className="pt-1 anim-up"
              style={{ animationDelay: "400ms" }}
            >
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 rounded-xl text-white text-sm font-semibold
                  hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(23,57,92,0.30)]
                  hover:text-yellow-300
                  transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #17395c 0%, #1f4e7a 100%)",
                }}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    {/* <FaShieldAlt size={13} /> */}
                    Update Password
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- DIALOG — same style as layout dialogs ---------------- */}
      {dialog.isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
          <div
            className="relative bg-white w-[90vw] max-w-sm rounded-2xl shadow-2xl p-6 text-center"
            style={{ border: "1px solid rgba(23,57,92,0.12)" }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
              style={{
                background: "linear-gradient(90deg, #17395c 0%, #f4df17 50%, #17395c 100%)",
              }}
            />

            {/* Icon */}
            <div
              className={`mx-auto mb-4 w-14 h-14 rounded-full flex items-center justify-center shadow-md
                ${dialog.type === "success" ? "bg-emerald-50" : "bg-red-50"}`}
            >
              {dialog.type === "success"
                ? <FaCheckCircle className="text-emerald-500 text-2xl" />
                : <FaTimesCircle className="text-red-500 text-2xl" />}
            </div>

            <h3 className="text-[17px] font-extrabold text-[#17395c] mb-1">
              {dialog.title}
            </h3>
            <p className="text-[13px] text-[#7a90a8] mb-6 leading-relaxed break-words whitespace-pre-wrap">
              {dialog.message}
            </p>

            <button
              onClick={closeDialog}
              className="w-full py-2.5 rounded-xl text-white text-[13.5px] font-semibold
                hover:opacity-90 transition-all shadow-md"
              style={{
                background: dialog.type === "success"
                  ? "linear-gradient(135deg, #17395c, #1f4e7a)"
                  : "linear-gradient(135deg, #c0392b, #e74c3c)",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}