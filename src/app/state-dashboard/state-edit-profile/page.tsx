
"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/services/axiosInstance";

interface ProfileData {
  name: string;
  username: string;
  designation: string;
  email: string;
  mobile: string;
  profilePhoto?: string;
}

export default function UpdateProfilePage() {
  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    username: "",
    designation: "",
    email: "",
    mobile: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH PROFILE ---------------- */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/profile"); // <-- change API
        const data = res.data;

        setFormData({
          name: data.name || "",
          username: data.username || "",
          designation: data.designation || "",
          email: data.email || "",
          mobile: data.mobile || "",
        });
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ---------------- HANDLE FILE ---------------- */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  /* ---------------- UPDATE PROFILE ---------------- */
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("mobile", formData.mobile);

      if (file) {
        payload.append("profilePhoto", file);
      }

      await axiosInstance.post("/update-profile", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen p-6">
      <div className=" min-h-screen bg-white rounded-2xl shadow-md p-6">
        <div className="grid md:grid-cols-2 gap-6">

          {/* NAME */}
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          {/* USERNAME */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              User Name
            </label>
            <input
              type="text"
              value={formData.username}
              disabled
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-gray-500"
            />
          </div>

          {/* DESIGNATION */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Designation
            </label>
            <input
              type="text"
              value={formData.designation}
              disabled
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-gray-500"
            />
          </div>

          {/* MOBILE */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Mobile
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-gray-500"
            />
          </div>

          {/* PROFILE PHOTO */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Profile Photo (Image only)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full bg-gray-100 rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* BUTTON */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}