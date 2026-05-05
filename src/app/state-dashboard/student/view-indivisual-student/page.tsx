/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useMemo } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axiosInstance from "@/services/axiosInstance";
import { exportStateSummary } from "@/services/importantDatesService";
import { createPortal } from "react-dom";
interface Student {
  id: number;
  name: string;
  username?: string;
  password?: string;
  national_id?: string;
  date_of_birth: string;
  gender: number;
  school_name: string;
  class_id: number;
  address: string;
  pincode: string;
  parent_name: string;
  parent_phone_number: string;
  parent_email: string;
  student_mobile_number: string;
  student_email: string;
  created_at: string;
  payment_status: number;
  is_mock: number;
  is_final: number;
  exam_language?: string;
}

// ── Dialog types ──────────────────────────────────────────────────────────────
type DialogState =
  | { type: "export" }
  | { type: "success"; email: string }
  | { type: "error"; message: string }
  | null;

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 50];

export default function ViewStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // ── Filters ───────────────────────────────────────────────────────────────
  const [regionFilter, setRegionFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  // ── Export dialog ─────────────────────────────────────────────────────────
  const [dialog, setDialog] = useState<DialogState>(null);
  const [exportStart, setExportStart] = useState("");
  const [exportEnd, setExportEnd] = useState("");
  const [exporting, setExporting] = useState(false);

  // Email from localStorage
  const userEmail = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return "";
      const parsed = JSON.parse(raw);
      return (
        parsed?.user?.user_detail?.email ||
        parsed?.user_detail?.email ||
        parsed?.email ||
        ""
      );
    } catch {
      return "";
    }
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.post("/admin/students", {
          page,
          per_page: perPage,
        });
        const response = res.data?.data;
        setStudents(response?.data || []);
        setTotalPages(response?.last_page || 1);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [page, perPage]);

  // ── Client-side filtering ─────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchRegion = regionFilter
        ? s.address?.toLowerCase().includes(regionFilter.toLowerCase())
        : true;
      const matchClass = classFilter
        ? String(s.class_id) === classFilter
        : true;
      const matchSearch = searchText
        ? [s.name, s.username, s.school_name, s.parent_name, s.national_id]
          .some((f) => f?.toLowerCase().includes(searchText.toLowerCase()))
        : true;
      return matchRegion && matchClass && matchSearch;
    });
  }, [students, regionFilter, classFilter, searchText]);

  // ── Export handler ────────────────────────────────────────────────────────
  const handleExportSubmit = async () => {
    if (!exportStart || !exportEnd) return;
    setExporting(true);
    try {
      await exportStateSummary({
        search: "",
        filters: {
          start_date: exportStart,
          end_date: exportEnd,
        },
      });
      setDialog({ type: "success", email: userEmail });
    } catch (err: any) {
      setDialog({
        type: "error",
        message: err?.message || "Export failed. Please try again.",
      });
    } finally {
      setExporting(false);
    }
  };

  function ModalWrapper({
    children,
    onClose,
  }: {
    children: React.ReactNode;
    onClose?: () => void;
  }) {
    if (typeof window === "undefined") return null;

    return createPortal(
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999999, // high rakho
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget && onClose) onClose();
        }}
      >
        <div
          style={{
            maxHeight: "90vh",
            overflowY: "auto",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>,
      document.body // 🔥 THIS LINE FIXES EVERYTHING
    );
  }

  // function ModalWrapper({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) {
  //   return (
  //     <div
  //       style={{
  //         position: "fixed",
  //         top: 0,
  //         left: 0,
  //         right: 0,
  //         bottom: 0,
  //         background: "rgba(0, 0, 0, 0.5)",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         zIndex: 9999,
  //         overflow: "auto",
  //       }}
  //       onClick={(e) => {
  //         if (e.target === e.currentTarget && onClose) onClose();
  //       }}
  //     >
  //       <div
  //         style={{
  //           position: "relative",
  //           maxHeight: "90vh",
  //           overflowY: "auto",
  //         }}
  //         onClick={(e) => e.stopPropagation()}
  //       >
  //         {children}
  //       </div>
  //     </div>
  //   );
  // }
  // ── Shared styles ─────────────────────────────────────────────────────────
  const thStyle: React.CSSProperties = {
    padding: "12px 14px",
    textAlign: "left",
    fontSize: "11px",
    fontWeight: 700,
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    whiteSpace: "nowrap",
    background: "#F8FAFC",
    borderBottom: "1px solid #E2E8F0",
  };

  const tdStyle: React.CSSProperties = {
    padding: "14px 14px",
    fontSize: "13px",
    color: "#334155",
    borderBottom: "1px solid #F1F5F9",
    verticalAlign: "top",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1.5px solid #E2E8F0",
    borderRadius: 10,
    padding: "9px 14px",
    fontSize: "13px",
    color: "#334155",
    background: "#F8FAFC",
    outline: "none",
    transition: "border 0.15s",
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh",  padding: "28px 24px", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* ── Export Dialog ── */}
      {dialog?.type === "export" && (
        <ModalWrapper onClose={() => setDialog(null)}>
          <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
        }}>
          <div style={{
            background: "#fff", borderRadius: 16, padding: "36px 40px", width: 480,
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)", position: "relative",
          }}>
            {/* Close */}
            <button
              onClick={() => setDialog(null)}
              style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#94A3B8" }}
            >
              ✕
            </button>

            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1E293B", marginBottom: 24 }}>
              Export Student
            </h2>

            <p style={{ fontSize: 13, color: "#64748B", textAlign: "center", marginBottom: 18 }}>
              Please select start date and end date for export
            </p>

            {/* Date range picker */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              border: "1.5px solid #E2E8F0", borderRadius: 10,
              padding: "8px 14px", background: "#F8FAFC", marginBottom: 16,
            }}>
              <input
                type="date"
                value={exportStart}
                onChange={(e) => setExportStart(e.target.value)}
                  min="2016-01-01"
                  max={new Date().toISOString().split("T")[0]}
                  style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: "#334155", flex: 1 }}
                placeholder="Start date"
              />
              <span style={{ color: "#94A3B8", fontSize: 12 }}>–</span>
              <input
                type="date"
                value={exportEnd}
                  min={exportStart || "2016-01-01"}
                  max={new Date().toISOString().split("T")[0]}
                onChange={(e) => setExportEnd(e.target.value)}
                style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: "#334155", flex: 1 }}
                placeholder="End date"
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>

            {userEmail && (
              <p style={{ fontSize: 12, color: "#334155", fontWeight: 600, textAlign: "center", marginBottom: 28 }}>
                Exported File will be sent to this Email:{" "}
                <span style={{ color: "#2563EB" }}>{userEmail}</span>
              </p>
            )}

            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
              <button
                onClick={() => setDialog(null)}
                style={{
                  padding: "10px 28px", borderRadius: 10, border: "1.5px solid #E2E8F0",
                  background: "#fff", color: "#64748B", fontSize: 14, fontWeight: 600, cursor: "pointer",
                }}
              >
                Discard
              </button>
              <button
                onClick={handleExportSubmit}
                disabled={exporting || !exportStart || !exportEnd}
                style={{
                  padding: "10px 28px", borderRadius: 10, border: "none",
                  background: exporting || !exportStart || !exportEnd ? "#93C5FD" : "#3B82F6",
                  color: "#fff", fontSize: 14, fontWeight: 600, cursor: exporting ? "not-allowed" : "pointer",
                }}
              >
                {exporting ? "Submitting…" : "Submit"}
              </button>
            </div>
          </div>
        </div>
        </ModalWrapper>
      )}

      {/* ── Success Dialog ── */}
      {dialog?.type === "success" && (
            <ModalWrapper onClose={() => setDialog(null)}>
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
        }}>
          <div style={{
            background: "#fff", borderRadius: 16, padding: "40px", width: 420,
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)", textAlign: "center",
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%", background: "#D1FAE5",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px", fontSize: 28, color: "#10B981",
            }}>✓</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1E293B", marginBottom: 10 }}>
              Export Successful!
            </h3>
            <p style={{ fontSize: 13, color: "#64748B", marginBottom: 8 }}>
              Your export has been submitted successfully.
            </p>
            {dialog.email && (
              <p style={{ fontSize: 12, color: "#64748B", marginBottom: 28 }}>
                File will be sent to: <strong style={{ color: "#2563EB" }}>{dialog.email}</strong>
              </p>
            )}
            <button
              onClick={() => setDialog(null)}
              style={{
                padding: "10px 32px", borderRadius: 10, border: "none",
                background: "#3B82F6", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer",
              }}
            >
              OK
            </button>
          </div>
        </div>  
        </ModalWrapper>
      )}

      {/* ── Error Dialog ── */}
      {dialog?.type === "error" && (
        <ModalWrapper onClose={() => setDialog(null)}>
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
        }}>
          <div style={{
            background: "#fff", borderRadius: 16, padding: "40px", width: 420,
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)", textAlign: "center",
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%", background: "#FEE2E2",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px", fontSize: 28, color: "#EF4444",
            }}>✕</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1E293B", marginBottom: 10 }}>
              Export Failed
            </h3>
            <p style={{ fontSize: 13, color: "#64748B", marginBottom: 28 }}>
              {dialog.message}
            </p>
            <button
              onClick={() => setDialog(null)}
              style={{
                padding: "10px 32px", borderRadius: 10, border: "none",
                background: "#EF4444", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer",
              }}
            >
              OK
            </button>
          </div>
        </div>
        </ModalWrapper>
      )}

      {/* ── Page Title ── */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: "#1E293F", margin: 0 }}>
          View Individual Students
        </h1>
        <p style={{ fontSize: 16, color: "#94A3B8", marginTop: 4 }}>
          Browse, filter and export student records
        </p>
      </div>

      {/* ── Filter Row 1: Region + Date range ── */}
      <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
        {/* Select Region */}
        <div style={{ position: "relative", width: 280 }}>
          <select
            value={regionFilter}
            onChange={(e) => { setRegionFilter(e.target.value); setPage(1); }}
            style={{ ...inputStyle, appearance: "none", paddingRight: 36, cursor: "pointer" }}
          >
            <option value="">Select Region</option>
            <option value="central-region">Central Region</option>
            <option value="eastern-region">Eastern Region</option>
            <option value="western-region">Western Region</option>
          </select>
          <svg style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        {/* Date range — matches image exactly */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          border: "1.5px solid #E2E8F0", borderRadius: 10,
          padding: "8px 14px", background: "#F8FAFC", flex: 1, maxWidth: 420,
        }}>
          <input
            type="date"
            style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: "#334155", flex: 1 }}
            min="2016-01-01"
            max={new Date().toISOString().split("T")[0]}
            placeholder="Start date"
          />
          <span style={{ color: "#94A3B8", fontSize: 12 }}>–</span>
          <input
            type="date"
            style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: "#334155", flex: 1 }}
            min="2016-01-01"
            max={new Date().toISOString().split("T")[0]}
            placeholder="End date"
          />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
      </div>

      {/* ── Filter Row 2: Class + Search + Export ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        {/* Select Class */}
        <div style={{ position: "relative", width: 280 }}>
          <select
            value={classFilter}
            onChange={(e) => { setClassFilter(e.target.value); setPage(1); }}
            style={{ ...inputStyle, appearance: "none", paddingRight: 36, cursor: "pointer" }}
          >
            <option value="">Select Class</option>
            {[6, 7, 8, 9, 10, 11].map((c) => (
              <option key={c} value={String(c)}>Class {c}</option>
            ))}
          </select>
          <svg style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        {/* Search box */}
        <div style={{ position: "relative", flex: 1, maxWidth: 420 }}>
          <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
            width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search Records"
            value={searchText}
            onChange={(e) => { setSearchText(e.target.value); setPage(1); }}
            style={{ ...inputStyle, paddingLeft: 38 }}
          />
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Export button */}
        <button
          onClick={() => { setExportStart(""); setExportEnd(""); setDialog({ type: "export" }); }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 24px", background: "#3B82F6", color: "#fff",
            fontWeight: 700, fontSize: 14, borderRadius: 10, border: "none",
            cursor: "pointer", boxShadow: "0 2px 8px rgba(59,130,246,0.3)",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2563EB")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#3B82F6")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export
        </button>
      </div>

      {/* ── Table Card ── */}
      <div style={{
        background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden",
      }}>

        {/* Items per page inside card top-right */}
        <div style={{
          display: "flex", justifyContent: "flex-end", alignItems: "center",
          padding: "12px 20px", borderBottom: "1px solid #F1F5F9", gap: 8,
        }}>
          <span style={{ fontSize: 12, color: "#94A3B8" }}>Items per page:</span>
          <select
            value={perPage}
            onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
            style={{
              border: "1.5px solid #E2E8F0", borderRadius: 8, padding: "4px 10px",
              fontSize: 12, color: "#334155", background: "#fff", cursor: "pointer", outline: "none",
            }}
          >
            {ITEMS_PER_PAGE_OPTIONS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {[
                  "SR. NO.", "NAME", "USERNAME", "PASSWORD", "NATIONAL ID",
                  "SCHOOL NAME", "CLASS", "DOB", "GENDER", "EXAM LANGUAGE",
                  "ADDRESS", "PINCODE", "PARENT NAME", "PARENT MOBILE NO.",
                  "PARENT EMAIL", "STUDENT MOBILE", "STUDENT EMAIL",
                  "MOCK EXAM", "FINAL EXAM", "PAYMENT", "ACTION",
                ].map((h) => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 21 }).map((__, j) => (
                      <td key={j} style={tdStyle}>
                        <div style={{ height: 12, background: "#F1F5F9", borderRadius: 6, width: 60, animation: "pulse 1.5s infinite" }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={21} style={{ ...tdStyle, textAlign: "center", padding: "48px 0", color: "#94A3B8" }}>
                    No records found
                  </td>
                </tr>
              ) : (
                filtered.map((s, index) => (
                  <tr
                    key={s.id}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAFC")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    style={{ transition: "background 0.1s" }}
                  >
                    <td style={{ ...tdStyle, color: "#94A3B8", fontSize: 12 }}>
                      {(page - 1) * perPage + index + 1}
                    </td>

                    {/* Name — blue like image */}
                    <td style={{ ...tdStyle, color: "#2563EB", fontWeight: 600, whiteSpace: "nowrap" }}>
                      {s.name || "-"}
                    </td>

                    <td style={tdStyle}>{s.username || "-"}</td>
                    <td style={tdStyle}>{s.password || "-"}</td>
                    <td style={tdStyle}>{s.national_id || "-"}</td>

                    <td style={{ ...tdStyle, maxWidth: 160 }}>{s.school_name || "-"}</td>
                    <td style={tdStyle}>{s.class_id || "-"}</td>
                    <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
                      {s.date_of_birth
                        ? new Date(s.date_of_birth).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                        : "-"}
                    </td>
                    <td style={tdStyle}>
                      {s.gender === 1 ? "Male" : s.gender === 2 ? "Female" : "-"}
                    </td>
                    <td style={tdStyle}>{s.exam_language || "English"}</td>
                    <td style={{ ...tdStyle, maxWidth: 180 }}>{s.address || "-"}</td>
                    <td style={tdStyle}>{s.pincode || "-"}</td>
                    <td style={{ ...tdStyle, fontWeight: 600, whiteSpace: "nowrap" }}>{s.parent_name || "-"}</td>
                    <td style={tdStyle}>{s.parent_phone_number || "-"}</td>
                    <td style={tdStyle}>{s.parent_email || "-"}</td>
                    <td style={tdStyle}>{s.student_mobile_number || "-"}</td>
                    <td style={tdStyle}>{s.student_email || "-"}</td>

                    {/* Mock Exam */}
                    <td style={tdStyle}>
                      <span style={{
                        padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600,
                        background: s.is_mock ? "#D1FAE5" : "#FEE2E2",
                        color: s.is_mock ? "#059669" : "#DC2626",
                      }}>
                        {s.is_mock ? "Yes" : "No"}
                      </span>
                    </td>

                    {/* Final Exam */}
                    <td style={tdStyle}>
                      <span style={{
                        padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600,
                        background: s.is_final ? "#D1FAE5" : "#FEE2E2",
                        color: s.is_final ? "#059669" : "#DC2626",
                      }}>
                        {s.is_final ? "Yes" : "No"}
                      </span>
                    </td>

                    {/* Payment */}
                    <td style={tdStyle}>
                      <span style={{
                        padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600,
                        background: s.payment_status === 1 ? "#D1FAE5" : "#FEE2E2",
                        color: s.payment_status === 1 ? "#059669" : "#DC2626",
                      }}>
                        {s.payment_status === 1 ? "Paid" : "Pending"}
                      </span>
                    </td>

                    {/* Action */}
                    <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <FaEdit
                          style={{ cursor: "pointer", color: "#2563EB", fontSize: 15 }}
                          title="Edit"
                        />
                        <FaTrash
                          style={{ cursor: "pointer", color: "#EF4444", fontSize: 14 }}
                          title="Delete"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "flex-end",
          padding: "14px 20px", borderTop: "1px solid #F1F5F9", gap: 8,
          fontSize: 13, color: "#64748B",
        }}>
          <span>
            {filtered.length === 0
              ? "0 – 0 of 0"
              : `${(page - 1) * perPage + 1} – ${Math.min(page * perPage, filtered.length)} of ${filtered.length}`}
          </span>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              padding: "5px 8px", borderRadius: 8, border: "1.5px solid #E2E8F0",
              background: page === 1 ? "#F8FAFC" : "#fff",
              cursor: page === 1 ? "not-allowed" : "pointer",
              color: page === 1 ? "#CBD5E1" : "#334155", lineHeight: 1,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              padding: "5px 8px", borderRadius: 8, border: "1.5px solid #E2E8F0",
              background: page === totalPages ? "#F8FAFC" : "#fff",
              cursor: page === totalPages ? "not-allowed" : "pointer",
              color: page === totalPages ? "#CBD5E1" : "#334155", lineHeight: 1,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}