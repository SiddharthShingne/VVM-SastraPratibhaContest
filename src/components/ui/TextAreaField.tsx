"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

export default function TextAreaField({
  label,
  error,
  registration,
  required,
  ...props
}: TextAreaFieldProps) {
  return (
    <div className="w-full">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <textarea
        {...registration}
        {...props}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition resize-none ${
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-300"
            : "border-gray-300 focus:ring-2 focus:ring-blue-300"
        }`}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  );
}