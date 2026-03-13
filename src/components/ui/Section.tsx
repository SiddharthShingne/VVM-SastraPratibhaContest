"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between bg-gradient-to-r from-[#2f5f8f] to-[#4a7ba7] px-4 py-3 text-white">
        <h2 className="text-sm font-semibold sm:text-base">{title}</h2>
        <button type="button" onClick={() => setOpen(!open)}>
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </button>
      </div>

      {open && (
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 sm:p-5">
          {children}
        </div>
      )}
    </div>
  );
}