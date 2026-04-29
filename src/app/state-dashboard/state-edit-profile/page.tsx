/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/services/axiosInstance";
import { FaUser, FaCamera, FaEnvelope, FaPhone, FaUserTag, FaSpinner, FaUpload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import Image from "next/image";

interface ProfileData {
  name: string;
  mobile: string;
  username: string;
  designation: string;
  email: string;
  type: string;
  user_id: number;
  location_id: string;
}

interface DialogState {
  isOpen: boolean;
  type: "success" | "error";
  title: string;
  message: string;
}

export default function UpdateProfilePage() {
  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    mobile: "",
    username: "",
    designation: "",
    email: "",
    type: "",
    user_id: 0,
    location_id: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState<DialogState>({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const parsed = JSON.parse(storedUser);
      const root = parsed?.user || parsed;
      const userDetail = root?.user_detail || root?.student || {};

      // Get email from various possible locations
      let emailValue = userDetail.student_email || userDetail.parent_email || userDetail.email || root?.email || parsed?.email || "";

      // Get mobile from various possible locations
      let mobileValue = userDetail.student_mobile_number || userDetail.parent_phone_number || userDetail.phone || root?.phone || parsed?.phone || "";

      // Determine user type from role
      let userType = "";
      const roleName = root?.role_name || parsed?.role_name || userDetail?.designation || "";
      if (roleName.toLowerCase().includes("state")) userType = "state-coordinator";
      else if (roleName.toLowerCase().includes("district")) userType = "district-coordinator";
      else if (roleName.toLowerCase().includes("block")) userType = "block-coordinator";
      else userType = "coordinator";

      // Get location_id - for state coordinator, use country_id
      let locationId = "";

      // Check assignments first
      if (root?.assignments && root.assignments.length > 0) {
        locationId = String(root.assignments[0]?.coordinatable_id || "");
      }
      // For state coordinator, use country_id from user_detail
      else if (userType === "state-coordinator" && userDetail.country_id) {
        locationId = String(userDetail.country_id);
      }
      // Fallback to other location fields
      else if (userDetail.location_id) {
        locationId = String(userDetail.location_id);
      }
      // Last resort - use country_id from root
      else if (root?.country_id) {
        locationId = String(root.country_id);
      }

      setFormData({
        name: userDetail.name || root?.name || parsed?.name || "",
        mobile: mobileValue,
        username: root?.username || parsed?.username || "",
        designation: roleName,
        email: emailValue,
        type: userType,
        user_id: root?.id || parsed?.id || 0,
        location_id: locationId,
      });

      // Set profile photo preview if exists
      if (userDetail.student_profile && userDetail.student_profile_url) {
        setPreview(`${userDetail.student_profile_url}/${userDetail.student_profile}`);
      } else if (userDetail.profile_photo) {
        setPreview(userDetail.profile_photo);
      }
    } catch (err) {
      console.error("LocalStorage parse error", err);
    }
  }, []);

  const showDialog = (type: "success" | "error", title: string, message: string) => {
    setDialog({
      isOpen: true,
      type,
      title,
      message,
    });
  };

  const closeDialog = () => {
    setDialog({ ...dialog, isOpen: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Prepare payload for coordinator update API
      const payload = {
        name: formData.name,
        username: formData.username,
        designation: formData.designation,
        phone: formData.mobile,
        email: formData.email,
        type: formData.type,
        user_id: formData.user_id,
        location_id: String(formData.location_id),
      };

      console.log("Updating profile with payload:", payload);

      // Call the coordinator update API
      const response = await axiosInstance.post("/coordinators/update", payload);

      if (response.data.status === true) {
        // Update localStorage with new data
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        const root = storedUser?.user || storedUser;
        const userDetail = root?.user_detail || root?.student || {};

        const updatedUserDetail = {
          ...userDetail,
          name: formData.name,
          student_mobile_number: formData.mobile,
          parent_phone_number: formData.mobile,
          phone: formData.mobile,
          student_email: formData.email,
          parent_email: formData.email,
          email: formData.email,
        };

        const updatedRoot = {
          ...root,
          name: formData.name,
          phone: formData.mobile,
          email: formData.email,
          user_detail: updatedUserDetail,
        };

        const updatedStored = storedUser?.user
          ? { ...storedUser, user: updatedRoot }
          : updatedRoot;

        localStorage.setItem("user", JSON.stringify(updatedStored));
        window.dispatchEvent(new Event("auth-change"));

        showDialog("success", "Success!", response.data.message || "Profile updated successfully!");
      } else {
        showDialog("error", "Update Failed", response.data.message || "Profile update failed");
      }
    } catch (err: any) {
      console.error("Update error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Update failed. Please try again.";
      showDialog("error", "Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fadeInUp 0.4s ease-out; }
        
        @keyframes dialogFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .dialog-animate { animation: dialogFadeIn 0.2s ease-out; }
      `}</style>

      {/* Dialog Modal */}
      {dialog.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl max-w-sm w-full px-8 py-10 text-center">

            {/* Icon */}
            <div className={`mx-auto mb-5 w-16 h-16 rounded-full flex items-center justify-center
        ${dialog.type === "success" ? "bg-emerald-50 dark:bg-emerald-950" : "bg-red-50 dark:bg-red-950"}`}>
              {dialog.type === "success"
                ? <FaCheckCircle className="text-emerald-500 dark:text-emerald-400 text-3xl" />
                : <FaTimesCircle className="text-red-500 dark:text-red-400 text-3xl" />}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              {dialog.title}
            </h3>

            {/* Message */}
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8">
              {dialog.message}
            </p>

            {/* Button */}
            <button
              onClick={closeDialog}
              className={`px-10 py-2.5 rounded-lg text-sm font-medium text-white transition-colors
          ${dialog.type === "success"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-red-500 hover:bg-red-600"}`}
            >
              OK
            </button>

          </div>
        </div>
      )}

      <div className="fade-in-up max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-[#162a4a] via-[#1f6fa3] to-[#f4df17] bg-clip-text text-transparent">
            Edit Profile
          </h2>
          <p className="text-sm text-gray-500 mt-2">Update your personal information</p>
          <div className="mt-3 h-0.5 w-20 bg-linear-to-r from-[#17395c] to-[#f4df17] rounded-full" />
        </div>

        {/* Profile Photo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative group">
            <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl overflow-hidden border-4 border-white ring-2 ring-[#17395c]/20 transition-all duration-300 group-hover:ring-4 group-hover:ring-[#17395c]/40 ${!preview && "bg-linear-to-br from-[#17395c] to-[#1f4e7a]"
              }`}>
              {preview ? (
                <img src={preview} alt="Profile" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              ) : (
                <FaUser className="transition-transform duration-300 group-hover:scale-110" />
              )}
            </div>
            <label htmlFor="photo-upload" className="absolute bottom-0 right-0 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 hover:scale-110 bg-linear-to-r from-[#17395c] to-[#1f4e7a] hover:shadow-xl">
              <FaCamera className="text-white text-sm" />
            </label>
            <input id="photo-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>
          <p className="text-xs text-gray-400 mt-3">Click camera to change photo (optional)</p>
        </div>

        {/* Form Fields - 2 columns on medium screens and above */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name - Editable */}
          <div className="group">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center gap-1 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-colors duration-300 group-focus-within:text-[#1f4e7a]" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-base transition-all duration-300 focus:outline-none focus:border-[#1f4e7a] focus:bg-white focus:ring-2 focus:ring-[#1f4e7a]/20 hover:border-gray-300"
              />
            </div>
          </div>

          {/* Mobile Number - Editable */}
          <div className="group">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center gap-1 mb-2">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-colors duration-300 group-focus-within:text-[#1f4e7a]" />
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-base transition-all duration-300 focus:outline-none focus:border-[#1f4e7a] focus:bg-white focus:ring-2 focus:ring-[#1f4e7a]/20 hover:border-gray-300"
              />
            </div>
          </div>

          {/* Username - Read Only */}
          <div className="group">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2 block">
              Username
            </label>
            <div className="relative">
              <FaUserTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                value={formData.username}
                readOnly
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 text-base cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Username cannot be changed</p>
          </div>

          {/* Designation - Read Only */}
          <div className="group">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2 block">
              Designation
            </label>
            <div className="relative">
              <FaUserTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                value={formData.designation}
                readOnly
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 text-base cursor-not-allowed"
              />
            </div>
          </div>

          {/* Email - Editable (spanning full width on mobile, normal on desktop) */}
          <div className="group md:col-span-2">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center gap-1 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm transition-colors duration-300 group-focus-within:text-[#1f4e7a]" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-base transition-all duration-300 focus:outline-none focus:border-[#1f4e7a] focus:bg-white focus:ring-2 focus:ring-[#1f4e7a]/20 hover:border-gray-300"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">You can update your email address</p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent" />

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="group relative px-8 py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #17395c 0%, #1f4e7a 100%)" }}
          >
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <FaUpload className="text-sm transition-transform duration-300 group-hover:scale-110" />
                  Save Changes
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-[#f4df17] to-[#f4df17]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
          </button>
        </div>
      </div>
    </>
  );
}