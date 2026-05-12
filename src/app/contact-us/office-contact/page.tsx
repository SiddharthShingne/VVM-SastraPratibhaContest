"use client";
import Link from "next/link";
import React from "react";
import ContactsPage from "../../../components/contactUs/countrycordinator";
export default function ContactPage() {

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[#162a4a] py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white text-2xl font-medium mb-1">Contact Us</h1>
          <nav className="flex items-center gap-2 text-xs text-white/70">
            <Link href="/" className="hover:text-[#f4df17]">Home</Link>
            <span>›</span>
            <span className="text-white">Contact Us</span>
          </nav>
        </div>
      </div>

      {/* Main Card */}
      <ContactsPage />
    </div>
  );
}