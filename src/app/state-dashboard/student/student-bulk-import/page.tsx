
"use client";

import { useState } from "react";
import { FaUpload, FaDownload } from "react-icons/fa";
import axiosInstance from "@/services/axiosInstance";

export default function BulkUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- FILE CHANGE ---------------- */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  /* ---------------- DOWNLOAD SAMPLE ---------------- */
  const handleDownload = () => {
    window.open("/sample-students.xlsx"); // change API if needed
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      await axiosInstance.post("/students/bulk-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Upload successful");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef3f9] ">

      {/* CARD */}
      <div className=" w-full max-w-4xl bg-white rounded-[30px] shadow-xl relative overflow-hidden p-10">

        {/* TOP GRADIENT BORDER */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

        {/* TITLE */}
        <h2 className="text-3xl font-extrabold text-center text-[#243f5c] mb-8">
          Bulk Student Upload
        </h2>

        {/* INSTRUCTIONS */}
        <div className="bg-[#f4f7fb] border border-dashed border-[#c9d6e4] rounded-xl p-5 text-[14px] text-[#4a6278] space-y-2 mb-6">
          <p>1. Click <b>Download Sample File</b> to get Excel format.</p>
          <p>2. Fill student data as per columns. Remove sample rows.</p>
          <p>3. Upload the file and click Submit.</p>
          <p>4. Fix errors if any record is rejected.</p>
          <p>5. Re-upload only rejected records.</p>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#17395c] to-[#2c5b84] shadow hover:scale-105 transition"
          >
            <FaDownload />
            Download Sample File
          </button>

          <label className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#17395c] to-[#2c5b84] shadow cursor-pointer hover:scale-105 transition">
            <FaUpload />
            Upload Excel File
            <input
              type="file"
              accept=".xlsx,.csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* FILE NAME */}
        {file && (
          <p className="text-sm text-[#4a6278] mb-4">
            Selected File: <b>{file.name}</b>
          </p>
        )}

        {/* SUBMIT */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-10 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#17395c] to-[#2c5b84] shadow-lg hover:scale-105 transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>

      </div>
    </div>
  );
}