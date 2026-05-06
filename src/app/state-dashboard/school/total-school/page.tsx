/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import { getSchools } from "@/services/uaeService";
import { fetchRegionsWithCities } from "@/services/importantDatesService";

// ─── Types ────────────────────────────────────────────────────────────────────
type School = {
  id: number;
  school_name: string;
  region_code: string;
  school_code: string;
  students_count: number;
  paid_students_count: number;
  unpaid_students_count: number;
};

type RegionData = {
  code: string;
  name: string;
  district_id: number;
};

// ─── Get user data from localStorage ─────────────────────────────────────────
const getUserData = () => {
  try {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const getCountryCode = (): string => {
  const parsed = getUserData();
  return parsed?.user?.country_code || parsed?.country_code || "AE";
};

const COUNTRY_NAME_MAP: Record<string, string> = {
  SA: "Saudi Arabia",
  AE: "UAE",
  OM: "Oman",
  KW: "Kuwait",
  BH: "Bahrain",
  QA: "Qatar",
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [regions, setRegions] = useState<RegionData[]>([]);
  const [regionsLoading, setRegionsLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Country from localStorage
  const [countryCode] = useState(getCountryCode);
  const countryName = COUNTRY_NAME_MAP[countryCode] || countryCode;

  // ── Debounce search ──────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(t);
  }, [search]);

  // ── Load regions ─────────────────────────────────────────────────────────
  useEffect(() => {
    const loadRegions = async () => {
      setRegionsLoading(true);
      try {
        const data = await fetchRegionsWithCities(countryCode);
        setRegions(data?.data || []);
      } catch {
        setRegions([]);
      } finally {
        setRegionsLoading(false);
      }
    };
    if (countryCode) loadRegions();
  }, [countryCode]);

  // ── Fetch schools ─────────────────────────────────────────────────────────
  const fetchSchools = async () => {
    setLoading(true);
    try {
      const res = await getSchools(page, perPage, {
        search: debouncedSearch || undefined,
        region_code: regionFilter || undefined,
      });

      const data = res?.data;
      setSchools(data?.data || []);
      setTotalRecords(data?.total || 0);
      setTotalPages(data?.last_page || 1);
    } catch (err) {
      console.error("Schools fetch error:", err);
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, [page, perPage, debouncedSearch, regionFilter]);

  // ── Styles ───────────────────────────────────────────────────────────────
  const s = {
    page: {
      minHeight: "100vh",
      padding: "24px",
      fontFamily: "'Segoe UI', sans-serif",
      // background: "#f0f4f8",
    } as React.CSSProperties,

    card: {
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
      marginBottom: 20,
      overflow: "hidden",
    } as React.CSSProperties,

    filterRow: {
      padding: "16px 24px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap" as const,
      borderBottom: "1px solid #f3f4f6",
    } as React.CSSProperties,

    input: {
      border: "1px solid #e5e7eb",
      borderRadius: 10,
      padding: "9px 14px",
      fontSize: 13,
      color: "#374151",
      background: "#f9fafb",
      outline: "none",
      minWidth: 200,
    } as React.CSSProperties,

    select: {
      border: "1px solid #e5e7eb",
      borderRadius: 10,
      padding: "9px 14px",
      fontSize: 13,
      color: "#374151",
      background: "#f9fafb",
      outline: "none",
      cursor: "pointer",
      minWidth: 180,
    } as React.CSSProperties,

    countryBadge: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "8px 14px",
      background: "#eff6ff",
      border: "1px solid #bfdbfe",
      borderRadius: 10,
      fontSize: 13,
      fontWeight: 600,
      color: "#1d4ed8",
      whiteSpace: "nowrap" as const,
    } as React.CSSProperties,

    tableHeader: {
      padding: "14px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    } as React.CSSProperties,

    th: {
      padding: "10px 16px",
      textAlign: "left" as const,
      fontSize: 11,
      fontWeight: 700,
      color: "#6b7280",
      textTransform: "uppercase" as const,
      whiteSpace: "nowrap" as const,
      background: "#f9fafb",
      borderBottom: "1px solid #f3f4f6",
    },

    td: {
      padding: "12px 16px",
      fontSize: 13,
      color: "#374151",
      borderBottom: "1px dashed #f3f4f6",
      whiteSpace: "nowrap" as const,
    },

    badge: (color: "blue" | "green" | "red") => ({
      padding: "3px 10px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 600,
      background: color === "blue" ? "#dbeafe" : color === "green" ? "#dcfce7" : "#fee2e2",
      color: color === "blue" ? "#1d4ed8" : color === "green" ? "#15803d" : "#dc2626",
    } as React.CSSProperties),

    pagination: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 24px",
      borderTop: "1px solid #f3f4f6",
      fontSize: 13,
      color: "#6b7280",
      flexWrap: "wrap" as const,
      gap: 12,
    } as React.CSSProperties,

    pageBtn: (disabled: boolean) => ({
      padding: "5px 12px",
      borderRadius: 6,
      border: "1px solid #e5e7eb",
      background: disabled ? "#f9fafb" : "#fff",
      cursor: disabled ? "not-allowed" : "pointer",
      color: disabled ? "#d1d5db" : "#374151",
      fontSize: 13,
      fontWeight: 500,
    } as React.CSSProperties),
  };

  const startRecord = schools.length === 0 ? 0 : (page - 1) * perPage + 1;
  const endRecord = Math.min(page * perPage, totalRecords);

  return (
    <div style={s.page}>

      {/* ── Filter Card ──────────────────────────────────────────────────── */}
      <div style={s.card}>
        <div style={s.filterRow}>

          {/* Country — read only from localStorage */}
          <div style={s.countryBadge}>
            {countryName}
          </div>

          {/* Region filter */}
          <select
            value={regionFilter}
            onChange={(e) => { setRegionFilter(e.target.value); setPage(1); }}
            style={s.select}
            disabled={regionsLoading}
          >
            <option value="">
              {regionsLoading ? "Loading regions..." : "All Regions"}
            </option>
            {regions.map((r) => (
              <option key={r.district_id} value={r.code}>
                {r.name}
              </option>
            ))}
          </select>

          {/* Search */}
          {/* <input
            type="text"
            placeholder="Search school name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...s.input, flex: "1 1 220px", maxWidth: 360 }}
          /> */}

          {/* Clear filters */}
          {(search || regionFilter) && (
            <button
              onClick={() => { setSearch(""); setRegionFilter(""); setPage(1); }}
              style={{
                padding: "9px 16px",
                borderRadius: 10,
                border: "1px solid #e5e7eb",
                background: "#fff",
                color: "#6b7280",
                fontSize: 13,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Table Card ───────────────────────────────────────────────────── */}
      <div style={s.card}>

        {/* Table header */}
        <div style={s.tableHeader}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: 0 }}>
            Schools
          </h2>
          <span style={{ fontSize: 12, color: "#6b7280" }}>
            Total: {totalRecords}
          </span>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
            <thead>
              <tr>
                {["SR. NO.", "SCHOOL NAME", "REGION CODE", "SCHOOL CODE", "TOTAL STUDENTS", "PAID", "UNPAID"].map((h) => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ ...s.td, textAlign: "center", padding: 40, color: "#9ca3af" }}>
                    Loading...
                  </td>
                </tr>
              ) : schools.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ ...s.td, textAlign: "center", padding: 40, color: "#9ca3af" }}>
                    No schools found
                  </td>
                </tr>
              ) : (
                schools.map((school, index) => (
                  <tr
                    key={school.id}
                    style={{ background: index % 2 === 0 ? "#fff" : "#fafafa" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f7ff")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = index % 2 === 0 ? "#fff" : "#fafafa")}
                  >
                    <td style={{ ...s.td, color: "#9ca3af", fontSize: 12 }}>
                      {startRecord + index}
                    </td>
                    <td style={{ ...s.td, fontWeight: 600, color: "#111827", maxWidth: 320, whiteSpace: "normal" }}>
                      {school.school_name}
                    </td>
                    <td style={s.td}>
                      <span style={{
                        padding: "2px 8px", borderRadius: 6, fontSize: 11,
                        background: "#f3f4f6", color: "#374151", fontWeight: 500,
                      }}>
                        {school.region_code || "-"}
                      </span>
                    </td>
                    <td style={{ ...s.td, fontFamily: "monospace", fontSize: 12 }}>
                      {school.school_code || "-"}
                    </td>
                    <td style={s.td}>
                      <span style={s.badge("blue")}>{school.students_count ?? 0}</span>
                    </td>
                    <td style={s.td}>
                      <span style={s.badge("green")}>{school.paid_students_count ?? 0}</span>
                    </td>
                    <td style={s.td}>
                      <span style={s.badge("red")}>{school.unpaid_students_count ?? 0}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ─────────────────────────────────────────────────── */}
        <div style={s.pagination}>

          {/* Items per page */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>Items per page:</span>
            <select
              value={perPage}
              onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
              style={{
                border: "1px solid #e5e7eb", borderRadius: 6,
                padding: "4px 8px", fontSize: 13, color: "#374151",
                background: "#fff", cursor: "pointer", outline: "none",
              }}
            >
              {[10, 20, 30, 50].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          {/* Page info + nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span>
              {totalRecords === 0 ? "0 – 0 of 0" : `${startRecord} – ${endRecord} of ${totalRecords}`}
            </span>

            {/* First */}
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              style={s.pageBtn(page === 1)}
              title="First page"
            >
              «
            </button>

            {/* Prev */}
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={s.pageBtn(page === 1)}
            >
              ‹
            </button>

            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: 6,
                    border: "1px solid",
                    borderColor: page === pageNum ? "#3b82f6" : "#e5e7eb",
                    background: page === pageNum ? "#3b82f6" : "#fff",
                    color: page === pageNum ? "#fff" : "#374151",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: page === pageNum ? 700 : 400,
                    minWidth: 32,
                  }}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next */}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={s.pageBtn(page === totalPages)}
            >
              ›
            </button>

            {/* Last */}
            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              style={s.pageBtn(page === totalPages)}
              title="Last page"
            >
              »
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}