"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string }[];
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

export default function SelectField({
  label,
  options,
  error,
  registration,
  required,
  ...props
}: SelectFieldProps)

{
  return (
    <div className="w-full">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <select
        {...registration}
        {...props}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-300"
            : "border-gray-300 focus:ring-2 focus:ring-blue-300"
        }`}
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      

      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  );
}