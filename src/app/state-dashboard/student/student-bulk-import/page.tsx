/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { FaUpload, FaDownload, FaCheckCircle, FaTimesCircle, FaFileExcel } from "react-icons/fa";
import { importStudents } from "@/services/importantDatesService";

/* ─── Dialog types ─── */
type DialogState =
  | { open: false }
  | { open: true; type: "success"; message: string }
  | { open: true; type: "error"; message: string; errorFileUrl?: string };

export default function BulkUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState<DialogState>({ open: false });

  /* ── helpers ── */
  const closeDialog = () => setDialog({ open: false });

  /* ── file change ── */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  /* ── download sample ── */
  const handleDownload = () => window.open("/gcc/sif_student_sample_file.xlsx");

  /* ── submit ── */
  const handleSubmit = async () => {
    if (!file) {
      setDialog({ open: true, type: "error", message: "Please select a file before submitting." });
      return;
    }

    try {
      setLoading(true);
      const data = await importStudents(file);

      // Success block — only reached when status:true
      setDialog({
        open: true,
        type: "success",
        message: data?.message || `Upload successful! ${data?.inserted ?? ""} record(s) imported.`.trim(),
      });
      setFile(null);
    }
    catch (err: any) {
      console.log("FULL ERR:", err);           // ← ADD
      console.log("error_file:", err?.error_file); // ← ADD

      const errorFileUrl: string | undefined = err?.error_file ?? undefined;
      const invalidCount: number | undefined = err?.invalid_count ?? undefined;

      setDialog({
        open: true,
        type: "error",
        message: invalidCount
          ? `⚠️ Bulk upload completed with errors. ${invalidCount} invalid record(s) found — please download the error report, fix the issues, and re-upload.`
          : err?.message || "Upload failed. Please check the file and try again.",
        errorFileUrl,
      });
    }
    finally {
      setLoading(false);
    }
  };

  /* ── download error sheet ── */
  const handleErrorSheetDownload = (url: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = "error-report.xlsx";
    a.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      {/* ── CARD ── */}
      <div className="w-full max-w-4xl bg-white rounded-[30px] shadow-xl relative overflow-hidden p-10">

        {/* TOP GRADIENT BORDER */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#17395c] via-[#f4df17] to-[#17395c]" />

        {/* TITLE */}
        <h2 className="text-3xl font-extrabold text-center text-[#243f5c] mb-8">
          Bulk Student Upload
        </h2>

        {/* INSTRUCTIONS */}
        <div className="bg-[#f4f7fb] border border-dashed border-[#c9d6e4] rounded-xl p-5 text-[14px] text-[#4a6278] space-y-2 mb-6">
          <p>1. Click the "Download Sample File" button below to download the sample Excel (.xlsx) file.</p>
          <p>2.Add student details according to the column headers in the downloaded Excel file. Remove the sample data, as it is for reference only.</p>
          <p>3. To upload the Excel file, click the "Upload Excel File" button below and select your file. After uploading, click Submit to add the students.</p>
          <p>4. After the upload, a message will appear if any records are rejected due to an invalid format.</p>
          <p>5. Download the rejected records file, correct the errors mentioned in the "Remarks" column, and re-upload only the rejected records.</p>
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
      {/* ALLOWED FORMATS NOTE */}
      <div className="flex flex-col items-end">
        <p className="text-[12px] text-red-500 ">
          * Only Excel (.xlsx) &amp; (.csv) files are allowed.
        </p>
        {file && (
          <p className="text-sm text-[#4a6278] mb-4">
            Selected File: <b>{file.name}</b>
          </p>
        )}
      </div>

      {/* SUBMIT */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-10 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#17395c] to-[#2c5b84] shadow-lg hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Submitting…
            </span>
          ) : "Submit"}
        </button>
      </div>
    </div>

      {/* ════════════════ DIALOG ════════════════ */ }
  {/* ════════════════ DIALOG ════════════════ */ }
  {
    dialog.open && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={closeDialog}
      >
        <div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top accent */}
          <div
            className={`h-1.5 w-full ${dialog.type === "success"
              ? "bg-gradient-to-r from-emerald-400 to-teal-500"
              : "bg-gradient-to-r from-orange-400 to-amber-500"
              }`}
          />

          <div className="p-8">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              {dialog.type === "success" ? (
                <div className="rounded-full bg-emerald-50 p-4">
                  <FaCheckCircle className="text-4xl text-emerald-500" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full border-4 border-amber-400 flex items-center justify-center">
                  <span className="text-3xl font-black text-amber-400">!</span>
                </div>
              )}
            </div>

            {/* Heading */}
            <h3 className="text-xl font-extrabold text-center text-[#243f5c] mb-2">
              {dialog.type === "success"
                ? "Upload Successful"
                : "Bulk upload errors."}
            </h3>

            {/* Message */}
            <p className="text-sm text-center text-[#4a6278] leading-relaxed mb-6">
              {dialog.message}
            </p>

            {/* Buttons row */}
            <div className={`flex gap-3 ${dialog.type === "error" && dialog.errorFileUrl ? "flex-col sm:flex-row" : ""}`}>
              {/* Error sheet download */}
              {dialog.type === "error" && dialog.errorFileUrl && (
                <button
                  onClick={() => handleErrorSheetDownload((dialog as any).errorFileUrl)}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-500 to-amber-500 shadow hover:scale-105 transition text-sm"
                >
                  <FaFileExcel className="text-lg" />
                  Download Error Report
                </button>
              )}

              {/* Close */}
              <button
                onClick={closeDialog}
                className="flex-1 px-5 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#17395c] to-[#2c5b84] shadow hover:scale-105 transition text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
    </div >
  );
}