"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "success" | "danger";
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
}

export default function Button({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
  loadingText = "Loading...",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition duration-200 focus:outline-none";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const disabledStyle =
    disabled || loading ? "opacity-50 cursor-not-allowed" : "";

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseStyle} ${variants[variant]} ${disabledStyle} ${widthStyle} ${className}`}
      {...props}
    >
      {loading ? loadingText : children}
    </button>
  );
}