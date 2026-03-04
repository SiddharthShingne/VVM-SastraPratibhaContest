"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect, ChangeEvent, KeyboardEvent, WheelEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  label?: string;
  name?: string;
  type?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  error?: string;
  validator?: (value: string | number | undefined) => string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  submitAttempted?: boolean;
}

export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  className = "",
  inputClassName = "",
  error,
  validator,
  minLength,
  maxLength,
  pattern,
  submitAttempted,
  ...props
}: InputFieldProps & React.InputHTMLAttributes<HTMLInputElement>) {

  const [touched, setTouched] = useState<boolean>(false);
  // const [internalError, setInternalError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isPassword = type === "password";

  // useEffect(() => {
  //   if (!touched && !submitAttempted) return;

  //   let err = "";

  //   if (required && !value) {
  //     err = `${label} is required`;
  //   }

  //   if (!err && minLength && String(value)?.length < minLength) {
  //     err = `Minimum ${minLength} characters required`;
  //   }

  //   if (!err && maxLength && String(value)?.length > maxLength) {
  //     err = `Maximum ${maxLength} characters allowed`;
  //   }

  //   if (!err && pattern && value && !pattern.test(String(value))) {
  //     err = `Invalid ${label}`;
  //   }

  //   if (!err && validator) {
  //     err = validator(value);
  //   }

  //   setInternalError(err || "");
  // }, [value, touched, submitAttempted, required, minLength, maxLength, pattern, validator, label]);
  const internalError = (() => {
    if (!touched && !submitAttempted) return "";

    if (required && !value) {
      return `${label} is required`;
    }

    if (minLength && String(value)?.length < minLength) {
      return `Minimum ${minLength} characters required`;
    }

    if (maxLength && String(value)?.length > maxLength) {
      return `Maximum ${maxLength} characters allowed`;
    }

    if (pattern && value && !pattern.test(String(value))) {
      return `Invalid ${label}`;
    }

    if (validator) {
      return validator(value);
    }

    return "";
  })();


  const showError =
    (touched || submitAttempted) &&
    (internalError || error);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-1 text-sm font-medium">
          {label}
          {required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
      )}

      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          name={name}
          value={value}
          min={type === "number" ? 0 : undefined}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTouched(true);
            onChange?.(e);
          }}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (type !== "number") return;

            const blocked = ["ArrowUp", "ArrowDown", "e", "E", "+", "-"];
            if (blocked.includes(e.key)) {
              e.preventDefault();
            }
          }}
          onWheel={(e: WheelEvent<HTMLInputElement>) => {
            if (type !== "number") return;

            e.preventDefault();
            e.currentTarget.blur();
          }}
          onBlur={() => setTouched(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-3 py-2 border rounded-lg outline-none transition
            pr-10
            ${showError
              ? "border-red-500 focus:ring-2 focus:ring-red-400"
              : "border-gray-300 focus:ring-2 focus:ring-blue-400"
            }
            ${inputClassName}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {showError && (
        <p className="text-red-500 text-xs mt-1">
          {internalError || error}
        </p>
      )}
    </div>
  );
}