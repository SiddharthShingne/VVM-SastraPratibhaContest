"use client";

import UAEForm from "./UAEForm";
import Image from "next/image";

export default function SaudiForm() {
  return (
    <div>
      <div className="max-w-6xl mx-auto mb-10 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-[#2f5f8f]">
            Student Registration – Saudi Arabia
          </h1>
          <Image
            src="/gcc/saudi.webp"
            alt="Saudi Arabia"
            width={120}
            height={80}
          />
        </div>
      </div>
      <UAEForm />
    </div>
  );
}