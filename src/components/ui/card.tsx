"use client";

import { FaUserCircle, FaEnvelope, FaCircle } from "react-icons/fa";

type ProfileCardProps = {
  name: string;
  role: string;
  email: string;
  phone: string;
};

export default function ProfileCard({
  name,
  role,
  email,
  phone,
}: ProfileCardProps) {
  return (
    <div className="bg-gray-100 rounded-2xl p-6 flex items-center gap-6 shadow-sm hover:shadow-md transition">
      
      {/* Avatar */}
      <div className="text-gray-500 text-5xl">
        <FaUserCircle />
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-blue-900">
          {name}
        </h2>

        <p className="text-gray-500 text-sm">{role}</p>

        <div className="flex items-center gap-2 text-gray-700 text-sm mt-2">
          <FaEnvelope />
          <span>{email}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-800 text-sm">
          <FaCircle className="text-green-500 text-xs" />
          <span>{phone}</span>
        </div>
      </div>
    </div>
  );
}