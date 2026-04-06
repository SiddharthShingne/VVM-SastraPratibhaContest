"use client";
import { use,useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import DashboardPage from "../page";
export default function UpdateProfile() {
      const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
    return (
        <>
            <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-8">

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 uppercase tracking-wide mb-6">
          UPDATE STUDENT PASSWORD
        </h2>

        <div className="space-y-5">

          {/* Old Password */}
          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              placeholder="Old Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              placeholder="New Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit Button */}
          <button className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold shadow hover:opacity-90 transition">
            Submit
          </button>

        </div>
      </div>
    </div>
        </>
    )}