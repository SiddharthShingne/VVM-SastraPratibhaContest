
"use client";

import { useState, useEffect, useRef } from "react";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  name: string;
  options: Option[];
  value?: string;
  onChange?: (e: { target: { name: string; value: string } }) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  error?: string;
  validator?: (value?: string) => string;
}

export default function Dropdown({
  label,
  name,
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  required = false,
  disabled = false,
  className = "",
  inputClassName = "",
  error,
  validator,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [touched, setTouched] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Outside Click Close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        if (open) setTouched(true);
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleToggle = () => {
    if (disabled) return;

    if (open) setTouched(true);
    setOpen((prev) => !prev);
  };

  const handleSelect = (option: Option) => {
    setTouched(true);

    onChange?.({
      target: {
        name,
        value: option.value,
      },
    });

    setOpen(false);
    setSearch("");
  };

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || "";

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Proper Computed Validation (NO useEffect)
  let computedError = "";

  if (touched) {
    if (required && !value) {
      computedError = `${label || name} is required`;
    }

    if (!computedError && validator) {
      computedError = validator(value);
    }
  }

  const showError = touched && (computedError || error);

  return (
    <div className={`w-full relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block mb-1 text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Box */}
      <div
        onClick={handleToggle}
        className={`w-full px-3 py-2 border rounded-lg cursor-pointer
          ${
            disabled
              ? "bg-gray-100 cursor-not-allowed border-gray-300"
              : showError
              ? "border-red-500 bg-red-50"
              : "border-gray-300 bg-white"
          }
          ${inputClassName}
        `}
      >
        {selectedLabel || placeholder}
      </div>

      {/* Dropdown */}
      {open && !disabled && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border-b outline-none"
          />

          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length ? (
              filteredOptions.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => handleSelect(opt)}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {opt.label}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-400">
                No results found
              </div>
            )}
          </div>
        </div>
      )}

      {showError && (
        <p className="text-red-500 text-xs mt-1">
          {computedError || error}
        </p>
      )}
    </div>
  );
}