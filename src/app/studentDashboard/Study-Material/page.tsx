"use client";

import { useEffect, useState } from "react";

// class name (as stored in localStorage) -> book filename
const CLASS_TO_BOOK: Record<string, string> = {
  "6": "Anna Mani Book.pdf",
  "7": "Anna Mani Book.pdf",
  "8": "Ashima Chatterjee Book.pdf",
  "9": "Ashima Chatterjee Book.pdf",
  "10": "Rohini Godbole Book.pdf",
  "11": "Rohini Godbole Book.pdf",
};

export default function StudyMaterial() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfLabel, setPdfLabel] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user"); // <-- change key here if different
      if (!raw) {
        setLoading(false);
        return;
      }

      const parsed = JSON.parse(raw);
      const className: string | undefined =
        parsed?.user?.user_detail?.class?.name ??
        parsed?.user_detail?.class?.name;

      if (!className) {
        setLoading(false);
        return;
      }

      const bookFile = CLASS_TO_BOOK[className];
      if (!bookFile) {
        setLoading(false);
        return;
      }

      setPdfUrl(`/pdf/syllabus/${encodeURIComponent(bookFile)}`);
      setPdfLabel(bookFile.replace(".pdf", ""));
    } catch (e) {
      console.error("Failed to read class from localStorage", e);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-sm text-gray-500">Loading study material...</p>
      </div>
    );
  }

  if (!pdfUrl) {
    return (
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 p-12 text-center shadow-xl transition-all duration-500 hover:shadow-2xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        <div className="absolute inset-[1px] rounded-2xl bg-white group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50 transition-all duration-500" />

        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#17395c] to-[#244d79] shadow-lg group-hover:scale-110 transition-transform duration-500">
          <svg className="h-10 w-10 text-[#f4df17]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h2 className="relative mb-2 text-3xl font-black tracking-tight text-[#17395c]">
          Coming Soon
        </h2>

        <div className="relative mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c] group-hover:w-24 transition-all duration-500" />

        <p className="relative mt-4 text-sm text-gray-500">
          Study material not available for your class yet.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 p-12 text-center shadow-xl">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c] opacity-10 -z-10" />

      <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#17395c] to-[#244d79] shadow-lg">
        <svg className="h-10 w-10 text-[#f4df17]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>

      <h2 className="relative mb-2 text-3xl font-black tracking-tight text-[#17395c]">
        {pdfLabel}
      </h2>

      <div className="relative mx-auto mb-6 h-1 w-16 rounded-full bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

      <p className="relative mb-8 text-sm text-gray-500">
        Your study material is ready — click below to download.
      </p>

      <a
        href={pdfUrl}
        download
        className="relative inline-flex items-center gap-2 rounded-xl bg-[#17395c] px-8 py-3.5 text-sm font-bold text-[#f4df17] shadow-lg transition-all duration-300 hover:bg-[#244d79] hover:shadow-xl hover:scale-105"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Study Material
      </a>
    </div >
  );
}