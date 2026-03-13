"use client";

import { useEffect, useRef, useState } from "react";
import { FieldError, UseFormSetValue } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface SearchableDropdownProps {
  label: string;
  name: string;
  options: Option[];
  value?: string;
  setValue: UseFormSetValue<any>;
  error?: FieldError;
  required?: boolean;
  placeholder?: string;
}

export default function SearchableDropdown({
  label,
  name,
  options,
  value,
  setValue,
  error,
  required,
  placeholder = "Search and select",
}: SearchableDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const selectedLabel =
    options.find((item) => item.value === value)?.label || "";

  const filteredOptions = options.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full relative" ref={ref}>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm cursor-pointer ${
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-300"
            : "border-gray-300"
        }`}
      >
        {selectedLabel || placeholder}
      </div>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full border-b px-3 py-2 text-sm outline-none"
          />

          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item) => (
                <div
                  key={item.value}
                  onClick={() => {
                    setValue(name, item.value, { shouldValidate: true });
                    setOpen(false);
                    setSearch("");
                  }}
                  className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
                >
                  {item.label}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-400">
                No results found
              </div>
            )}
          </div>
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  );
}