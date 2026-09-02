/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaEdit} from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { fetchRegionsWithCities } from "@/services/importantDatesService";
import AddSchoolModal from "@/app/state-dashboard/school/total-school/add-school/AddSchoolModal";
import { getSchoolList, updateSchool, toggleSchoolStatus } from "@/services/uaeService"; // your new function
// ─── Types ────────────────────────────────────────────────────────────────────
type School = {
  id: number;
  school_name: string;
  region_code: string;
  school_code: string;
  students_count: number; status?: number; // 1 = active, 0 = inactive
  // paid_students_count: number;
  // unpaid_students_count: number;
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


const ZONAL_COORDINATOR_ROLE_ID = 8;
const GCC_COUNTRY_CODES = Object.keys(COUNTRY_NAME_MAP);

const isZonalCoordinator = (): boolean => {
  const parsed = getUserData();
  const roleId = parsed?.user?.role_id ?? parsed?.role_id;
  return roleId === ZONAL_COORDINATOR_ROLE_ID;
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
  const [addSchoolOpen, setAddSchoolOpen] = useState(false);


  //  [addSchoolOpen, setAddSchoolOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editSchool, setEditSchool] = useState<School | null>(null);
  const [editName, setEditName] = useState("");
  const [editRegion, setEditRegion] = useState("");
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editErrors, setEditErrors] = useState<{ schoolName?: string; region?: string }>({});
  const [togglingId, setTogglingId] = useState<number | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Country from localStorage
  const [isZonal] = useState(isZonalCoordinator);
  const [countryCode] = useState(getCountryCode);
  const [countryFilter, setCountryFilter] = useState<string>(""); // "" = All Countries (zonal only)
  const activeCountryCode = isZonal ? countryFilter : countryCode;
  const countryName = isZonal
    ? (countryFilter ? (COUNTRY_NAME_MAP[countryFilter] || countryFilter) : "All Countries (GCC)")
    : (COUNTRY_NAME_MAP[countryCode] || countryCode);

  // ── Debounce search ──────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(t);
  }, [search]);

  // ── Load regions ─────────────────────────────────────────────────────────
  // useEffect(() => {
  //   const loadRegions = async () => {
  //     setRegionsLoading(true);
  //     try {
  //       const data = await fetchRegionsWithCities(countryCode);
  //       setRegions(data?.data || []);
  //     } catch {
  //       setRegions([]);
  //     } finally {
  //       setRegionsLoading(false);
  //     }
  //   };
  //   if (countryCode) loadRegions();
  // }, [countryCode]);


  useEffect(() => {
    const loadRegions = async () => {
      if (!activeCountryCode) { setRegions([]); return; }
      setRegionsLoading(true);
      try {
        const data = await fetchRegionsWithCities(activeCountryCode);
        setRegions(data?.data || []);
      } catch {
        setRegions([]);
      } finally {
        setRegionsLoading(false);
      }
    };
    loadRegions();
  }, [activeCountryCode]);

  // ── Fetch schools ─────────────────────────────────────────────────────────
 
  // const fetchSchools = async () => {
  //   setLoading(true);
  //   try {
  //     console.log("▶️ countryCode:", countryCode);
  //     console.log("▶️ regionFilter:", regionFilter);
  //     const res = await getSchoolList(
  //       countryCode,
  //       regionFilter || undefined,
  //       page,     // ← sends ?page=1, ?page=2 etc.
  //       perPage
  //     );
  //     // const res = await getSchoolList(countryCode, regionFilter || undefined);
  //     console.log("▶️ Full res:", JSON.stringify(res));

  //     const paginated = res?.data;
  //     const schoolList = Array.isArray(paginated?.data) ? paginated.data : [];

  //     console.log("▶️ schoolList:", schoolList);
  //     console.log("▶️ total:", paginated?.total);

  //     setSchools(schoolList);
  //     setTotalRecords(paginated?.total ?? schoolList.length);
  //     setTotalPages(paginated?.last_page ?? 1);
  //   } catch (err) {
  //     console.error("Schools fetch error:", err);
  //     setSchools([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchSchools = async () => {
    setLoading(true);
    try {
      if (isZonal && !countryFilter) {
        // All Countries — fetch all 6 GCC countries in parallel, merge, paginate client-side
        const results = await Promise.all(
          GCC_COUNTRY_CODES.map((code) =>
            getSchoolList(code, undefined, 1, 1000).catch(() => null)
          )
        );
        const merged: School[] = [];
        results.forEach((res) => {
          const paginated = res?.data;
          const list = Array.isArray(paginated?.data) ? paginated.data : [];
          merged.push(...list);
        });
        const start = (page - 1) * perPage;
        setSchools(merged.slice(start, start + perPage));
        setTotalRecords(merged.length);
        setTotalPages(Math.max(1, Math.ceil(merged.length / perPage)));
      } else {
        const res = await getSchoolList(
          activeCountryCode || undefined,
          regionFilter || undefined,
          page,
          perPage
        );
        const paginated = res?.data;
        const schoolList = Array.isArray(paginated?.data) ? paginated.data : [];
        setSchools(schoolList);
        setTotalRecords(paginated?.total ?? schoolList.length);
        setTotalPages(paginated?.last_page ?? 1);
      }
    } catch (err) {
      console.error("Schools fetch error:", err);
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSchools();
  }, [page, perPage, debouncedSearch, regionFilter, countryFilter]);

  useEffect(() => {
    fetchSchools();
  }, [page, perPage, debouncedSearch, regionFilter]);

  //  ADD before return (
  const handleEditOpen = (school: School) => {
    setEditSchool(school);
    setEditName(school.school_name);
    setEditRegion(school.region_code);
    setEditErrors({});
    setEditOpen(true);
  };

  const handleEditSubmit = async () => {
    const e: { schoolName?: string; region?: string } = {};
    if (!editName.trim()) e.schoolName = "School name is required";
    if (!editRegion) e.region = "Please select a region";
    if (Object.keys(e).length > 0) { setEditErrors(e); return; }

    if (!editSchool) return;
    setEditSubmitting(true);
    try {
      await updateSchool(editSchool.id, {
        state_id: getStateId(),
        school_name: editName.trim(),
        region_code: editRegion,
      });
      setEditOpen(false);
      fetchSchools();
    } catch {
      alert("Failed to update school. Please try again.");
    } finally {
      setEditSubmitting(false);
    }
  };

  const handleToggleStatus = async (school: School) => {
    if (!confirm(`${school.status === 1 ? "Deactivate" : "Activate"} "${school.school_name}"?`)) return;
    setTogglingId(school.id);
    try {
      await toggleSchoolStatus(school.id);
      fetchSchools();
    } catch {
      alert("Failed to update status.");
    } finally {
      setTogglingId(null);
    }
  };
  // ✅ Add this helper in both AddSchoolModal.tsx and page.tsx
  const getStateId = (): number => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return 0;
      const parsed = JSON.parse(raw);
      const assignments = parsed?.user?.user_detail?.assignments;
      if (Array.isArray(assignments) && assignments.length > 0) {
        return assignments[0]?.coordinatable_id || 0;
      }
      return 0;
    } catch {
      return 0;
    }
  };
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


          {/* Country — dropdown filter for zonal coordinator, read-only badge otherwise */}
          {isZonal ? (
            <select
              value={countryFilter}
              onChange={(e) => { setCountryFilter(e.target.value); setRegionFilter(""); setPage(1); }}
              style={s.select}
            >
              <option value="">All Countries (GCC)</option>
              {GCC_COUNTRY_CODES.map((code) => (
                <option key={code} value={code}>{COUNTRY_NAME_MAP[code]}</option>
              ))}
            </select>
          ) : (
            <div style={s.countryBadge}>
              {countryName}
            </div>
          )}

          {/* Region filter — hidden for zonal when "All Countries" selected, regions belong to one country */}
          {(!isZonal || countryFilter) && (
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
          )}
         
          {/* <div style={s.countryBadge}>
            {countryName}
          </div>

         
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
          </select> */}

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
          {/* ✅ ADD — Add School button at end of filter row */}
          <button
            onClick={() => setAddSchoolOpen(true)}
            style={{
              marginLeft: "auto",
              padding: "9px 20px",
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(135deg,#17395c,#1f4e7a)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap" as const,
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 8px 24px rgba(23,57,92,0.12)",
            }}
          >
            + Add School
          </button>
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
            <thead style={{position: "sticky", top: 0, background: "#fff", zIndex: 10}}>
              <tr>
                {["SR. NO.", "SCHOOL NAME", "REGION CODE", "SCHOOL CODE",
                  // "TOTAL STUDENTS",
                  "ACTIONS"
                  // "PAID", "UNPAID"
                ].map((h) => (
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
                    {/* <td style={s.td}>
                      <span style={s.badge("blue")}>{school.students_count ?? 0}</span>
                    </td> */}
                    {/* <td style={s.td}>
                      <span style={s.badge("green")}>{school.paid_students_count ?? 0}</span>
                    </td>
                    <td style={s.td}>
                      <span style={s.badge("red")}>{school.unpaid_students_count ?? 0}</span>
                    </td> */}
                    {/* ADD after the students_count <td> */}
                      <td style={{ ...s.td, whiteSpace: "nowrap" }}>
                        {/* Edit */}
                        <button
                          onClick={() => handleEditOpen(school)}
                          title="Edit"
                          style={{
                            marginRight: 8, padding: "4px 10px", borderRadius: 6, fontSize: 12,
                            border: "1px solid #d1d5db", background: "#f9fafb",
                            color: "#374151", cursor: "pointer", fontWeight: 500,
                          }}
                        >
                          ✏️ Edit
                        </button>

                        {/* Activate / Deactivate */}
                        {/* <button
                          onClick={() => handleToggleStatus(school)}
                          disabled={togglingId === school.id}
                          title={school.status === 1 ? "Deactivate" : "Activate"}
                          style={{
                            padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500,
                            border: "none", cursor: togglingId === school.id ? "not-allowed" : "pointer",
                            background: school.status === 1 ? "#fee2e2" : "#dcfce7",
                            color: school.status === 1 ? "#dc2626" : "#15803d",
                            opacity: togglingId === school.id ? 0.6 : 1,
                          }}
                        >
                          {togglingId === school.id ? "..." : school.status === 1 ? "Deactivate" : "Activate"}
                        </button> */}
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
              {[10, 20, 30, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          {/* Page info + nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span>
              {totalRecords === 0 ? "0 – 0 of 0" : `${startRecord} – ${endRecord} of ${totalRecords}`}
            </span>

            {/* First */}
            {/* <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              style={s.pageBtn(page === 1)}
              title="First page"
            >
              «
            </button> */}

            {/* Prev */}
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={s.pageBtn(page === 1)}
            >
              ‹
            </button>

            {/* Page numbers */}
            {/* {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
            })} */}

            {/* Next */}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={s.pageBtn(page === totalPages)}
            >
              ›
            </button>

            {/* Last */}
            {/* <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              style={s.pageBtn(page === totalPages)}
              title="Last page"
            >
              »
            </button> */}
          </div>
        </div>

      </div>
      {/* ✅ ADD — Add School Modal */}
      <AddSchoolModal
        open={addSchoolOpen}
        setOpen={setAddSchoolOpen}
        // onSuccess={() => {
        //   fetchSchools(); // refresh the list after adding
        // }}
        onSuccess={() => {
          setPage(1);       // ← go to page 1 to see the new school
          fetchSchools();
        }}
      />
      {/* ── Edit School Modal ─────────────────────────────────────── */}
      {editOpen && editSchool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-white shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-[#0B1B4D]">Edit School</h2>
                <p className="text-xs text-gray-400 mt-0.5">Update school name or region</p>
              </div>
              <button
                onClick={() => setEditOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4">

              {/* School Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  School Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Enter School Name"
                  style={{
                    height: 40, width: "100%", borderRadius: 8, border: editErrors.schoolName ? "1px solid #f87171" : "1px solid #d1d5db",
                    padding: "0 12px", fontSize: 13, outline: "none", background: editErrors.schoolName ? "#fef2f2" : "#f9fafb",
                  }}
                />
                {editErrors.schoolName && <p style={{ fontSize: 12, color: "#dc2626" }}>{editErrors.schoolName}</p>}
              </div>

              {/* Region */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Region <span className="text-red-500">*</span>
                </label>
                <select
                  value={editRegion}
                  onChange={(e) => setEditRegion(e.target.value)}
                  style={{
                    height: 40, width: "100%", borderRadius: 8, border: editErrors.region ? "1px solid #f87171" : "1px solid #d1d5db",
                    padding: "0 12px", fontSize: 13, outline: "none", background: editErrors.region ? "#fef2f2" : "#f9fafb", cursor: "pointer",
                  }}
                >
                  <option value="">Select Region</option>
                  {regions.map((r) => (
                    <option key={r.district_id} value={r.code}>{r.name}</option>
                  ))}
                </select>
                {editErrors.region && <p style={{ fontSize: 12, color: "#dc2626" }}>{editErrors.region}</p>}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-center gap-4 border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={() => setEditOpen(false)}
                disabled={editSubmitting}
                style={{
                  padding: "8px 28px", borderRadius: 8, border: "1px solid #d1d5db",
                  background: "#fff", color: "#6b7280", fontSize: 13, cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                disabled={editSubmitting}
                style={{
                  padding: "8px 28px", borderRadius: 8, border: "none",
                  background: "#2563eb", color: "#fff", fontSize: 13,
                  fontWeight: 600, cursor: editSubmitting ? "not-allowed" : "pointer",
                  opacity: editSubmitting ? 0.6 : 1,
                }}
              >
                {editSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}