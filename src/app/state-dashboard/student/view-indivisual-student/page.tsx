/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useMemo } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axiosInstance from "@/services/axiosInstance";
import { createPortal } from "react-dom";
import { fetchSchoolsByRegion, fetchRegionsWithCities, exportStudents } from "@/services/importantDatesService";

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

const ITEMS_PER_PAGE_OPTIONS = [10, 50, 100, 250];

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
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);

  const [filterRegions, setFilterRegions] = useState<{ district_id: number; name: string }[]>([]);

  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [editForm, setEditForm] = useState({
    nationalId: "", nationality: "Indian", school: "", division: "",
    fullName: "", dob: "", gender: "", classGrade: "",
    examLanguage: "English", parentSalutation: "", parentName: "",
    parentEmail: "", parentMobile: "",
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");
  const [editApiErrors, setEditApiErrors] = useState<any>(null);
  const [editFieldErrors, setEditFieldErrors] = useState({
    fullName: "", parentName: "", parentMobile: "", parentEmail: "",
  });

  // Edit modal — region/city/school
  const [editRegions, setEditRegions] = useState<{ district_id: number; name: string; code: string; cities: { id: number; name: string }[] }[]>([]);
  const [editCities, setEditCities] = useState<{ id: number; name: string }[]>([]);
  const [editSchools, setEditSchools] = useState<{ id: number; school_name: string }[]>([]);
  const [editSchoolsLoading, setEditSchoolsLoading] = useState(false);
  const [editRegion, setEditRegion] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editSchool, setEditSchool] = useState("");

  useEffect(() => {
    const cc = (() => {
      try {
        const raw = localStorage.getItem("user");
        const parsed = JSON.parse(raw || "{}");
        return parsed?.user?.country_code || "";
      } catch { return ""; }
    })();

    import("@/services/importantDatesService").then(({ fetchRegionsWithCities }) => {
      fetchRegionsWithCities(cc)
        .then((data: any) => setFilterRegions(data?.data || []))
        .catch(() => setFilterRegions([]));
    });
  }, []);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchText), 500);
    return () => clearTimeout(t);
  }, [searchText]);

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


  const COUNTRY_MOBILE_LENGTH: Record<string, number> = {
    AE: 9, SA: 9, KW: 8, BH: 8, QA: 8, OM: 8,
  };
  const countryCode = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      const parsed = JSON.parse(raw || "{}");
      return parsed?.user?.country_code || "";
    } catch { return ""; }
  }, []);

  const COUNTRY_NAME_MAP: Record<string, string> = {
    SA: "Saudi Arabia", AE: "UAE", OM: "Oman", KW: "Kuwait", BH: "Bahrain", QA: "Qatar",
  };
  const CLASS_MAP: Record<number, string> = {
    1: "6", 2: "7", 3: "8", 4: "9", 5: "10", 6: "11",
  };

  const validateName = (name: string) => /^[A-Za-z\s.\-']{2,50}$/.test(name.trim());
  const validateMobile = (mobile: string) => {
    const required = COUNTRY_MOBILE_LENGTH[countryCode] || 10;
    return mobile.replace(/\D/g, "").length === required
      ? { isValid: true, message: "" }
      : { isValid: false, message: `Mobile must be exactly ${required} digits` };
  };
  const validateEmail = (email: string) => {
    const ok = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email) && !email.includes("..");
    return ok ? { isValid: true, message: "" } : { isValid: false, message: "Enter a valid email" };
  };

  const openEdit = (s: Student) => {
    setEditStudent(s);
    setEditError("");
    setEditSuccess("");
    setEditApiErrors(null);
    setEditFieldErrors({ fullName: "", parentName: "", parentMobile: "", parentEmail: "" });
    // reset region/city/school
    setEditRegion("");
    setEditCity("");
    setEditSchool("");
    setEditRegions([]);
    setEditCities([]);
    setEditSchools([]);
    setEditForm({
      nationalId: s.national_id || "",
      nationality: "Indian",
      school: s.school_name || "",
      division: "",
      fullName: s.name || "",
      dob: s.date_of_birth || "",
      gender: s.gender === 1 ? "Male" : s.gender === 2 ? "Female" : "",
      classGrade: String(s.class_id || ""),
      examLanguage: s.exam_language || "English",
      parentSalutation: "",
      parentName: s.parent_name || "",
      parentEmail: s.parent_email || "",
      parentMobile: s.parent_phone_number || "",
    });
  };

  const handleEditSubmit = async () => {
    const required = [
      "nationalId", "fullName", "dob", "gender", "classGrade",
      "parentSalutation", "parentName", "parentMobile", "parentEmail",
    ];
    const missing = required.filter((k) => !(editForm as any)[k]);
    if (missing.length) { setEditError("Please fill all required fields."); return; }
    if (!validateName(editForm.fullName)) { setEditError("Student name: letters/spaces/hyphens only (2–50 chars)."); return; }
    if (!validateName(editForm.parentName)) { setEditError("Parent name: letters/spaces/hyphens only (2–50 chars)."); return; }
    const mCheck = validateMobile(editForm.parentMobile);
    if (!mCheck.isValid) { setEditError(mCheck.message); return; }
    const eCheck = validateEmail(editForm.parentEmail);
    if (!eCheck.isValid) { setEditError(eCheck.message); return; }

    setEditLoading(true);
    setEditError("");
    try {
      await axiosInstance.post(`/students/update/${editStudent!.id}`, {
        national_id: editForm.nationalId,
        nationality: editForm.nationality,
        division: editForm.division || "N",
        fullName: editForm.fullName,
        dob: editForm.dob,
        gender: editForm.gender === "Male" ? 1 : 2,
        grade: Number(editForm.classGrade),
        name_1: editForm.parentSalutation,
        parent_full_name: editForm.parentName,
        student_email: editForm.parentEmail,
        school_name: editSchool || editForm.school,   // ← use selected school, fallback to pre-filled
        dist_id: editRegion ? parseInt(editRegion, 10) : undefined,
        city_id: editCity ? parseInt(editCity, 10) : undefined,
        address: "",
      });
      setEditSuccess("Student updated successfully!");
    } catch (err: any) {
      setEditError(err?.response?.data?.message || "Failed to update student.");
      setEditApiErrors(err?.response?.data || null);
    } finally {
      setEditLoading(false);
    }
  };


  // Load regions once when edit modal opens
  useEffect(() => {
    if (!editStudent) return;
    fetchRegionsWithCities(countryCode)
      .then((data: any) => setEditRegions(data?.data || []))
      .catch(() => setEditRegions([]));
  }, [editStudent]);

  // When editRegion changes — update cities & load schools
  useEffect(() => {
    if (!editRegion) {
      setEditCities([]);
      setEditSchools([]);
      setEditCity("");
      setEditSchool("");
      return;
    }
    const selected = editRegions.find((r) => String(r.district_id) === String(editRegion));
    setEditCities(selected?.cities || []);
    setEditCity("");
    setEditSchool("");

    if (!selected?.code) return;
    setEditSchoolsLoading(true);
    fetchSchoolsByRegion(countryCode, selected.code, 1, 100)
      .then((data: any) => setEditSchools(data?.data?.data || []))
      .catch(() => setEditSchools([]))
      .finally(() => setEditSchoolsLoading(false));
  }, [editRegion, editRegions]);

  // useEffect(() => {
  //   const fetchStudents = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await axiosInstance.post("/admin/students", {
  //         page,
  //         per_page: perPage,
  //       });
  //       const response = res.data?.data;
  //       setStudents(response?.data || []);
  //       setTotalPages(response?.last_page || 1);
  //     } catch (err) {
  //       console.error("API Error:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchStudents();
  // }, [page, perPage]);


  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setStudents([]);
      setTotalRecords(0);
      try {
        const res = await axiosInstance.post("/admin/students", {
          page,
          per_page: perPage,
          district_id: regionFilter ? Number(regionFilter) : undefined,
          class_id: classFilter ? Number(classFilter) : undefined,
          search: debouncedSearch || undefined,
          created_at_from: filterStartDate || undefined,
          created_at_to: filterEndDate || undefined,
        });
        const response = res.data?.data;
        const raw = response?.data || [];

        // Map user fields from nested objects
        const mapped = raw.map((s: any) => ({
          ...s,
          username: s.user?.username,
          password: s.user?.temp_password,
          exam_language: s.exam_lang_id === 14 ? "English" : "Hindi",
        }));

        setStudents(mapped);
        setTotalPages(response?.last_page || 1);
        setTotalRecords(response?.total || 0);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [page, perPage, regionFilter, classFilter, debouncedSearch, filterStartDate, filterEndDate]);


  // const CLASS_MAP: Record<number, string> = {
  //   1: "6",
  //   2: "7",
  //   3: "8",
  //   4: "9",
  //   5: "10",
  //   6: "11",

  // };
  // ── Client-side filtering ─────────────────────────────────────────────────
  // const filtered = useMemo(() => {
  //   return students.filter((s) => {
  //     const matchRegion = regionFilter
  //       ? s.address?.toLowerCase().includes(regionFilter.toLowerCase())
  //       : true;
  //     const matchClass = classFilter
  //       ? String(s.class_id) === classFilter
  //       : true;
  //     const matchSearch = searchText
  //       ? [s.name, s.username, s.school_name, s.parent_name, s.national_id]
  //         .some((f) => f?.toLowerCase().includes(searchText.toLowerCase()))
  //       : true;
  //     return matchRegion && matchClass && matchSearch;
  //   });
  // }, [students, regionFilter, classFilter, searchText]);

  // ── Export handler ────────────────────────────────────────────────────────
  const handleExportSubmit = async () => {
    if (!exportStart || !exportEnd) return;
    setExporting(true);
    try {
      const raw = localStorage.getItem("user");
      const parsed = raw ? JSON.parse(raw) : null;
      const assignments = parsed?.user?.user_detail?.assignments || [];
      const stateAssignment = assignments.find((a: any) => a.coordinatable_type === "State");
      const stateId = stateAssignment?.coordinatable_id;
      const prantId = stateAssignment?.extras?.prant_id;

      await exportStudents({
        zone_id: [],
        state_id: stateId ? [stateId] : [],
        prant_id: prantId ? [prantId] : [],
        district_id: [],
        class_id: [],
        school_id: [],
        // individual_student: true, 
        school_student: true,
        // email: userEmail || "shingnesid@gmail.com", // ✅ uses userEmail from useMemo above
        email: userEmail || "shingnesid@gmail.com", // ✅ uses userEmail from useMemo above

        created_at_from: exportStart,
        created_at_to: exportEnd,
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
    <div style={{ minHeight: "100vh", padding: "28px 24px", fontFamily: "'Segoe UI', sans-serif" }}>

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

      {/* ── Filter Row 1: Region + Date range ── */}
      <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
        {/* Select Region */}
        {/* <div style={{ position: "relative", width: 280 }}>
          <select
            value={regionFilter}
            onChange={(e) => { setRegionFilter(e.target.value); setPage(1); }}
            style={{ ...inputStyle, appearance: "none", paddingRight: 36, cursor: "pointer" }}
          >
            <option value="">Select Region</option>
            {filterRegions.map((r) => (
              <option key={r.district_id} value={String(r.district_id)}>
                {r.name}
              </option>
            ))}
          </select>
          <svg style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div> */}

        {/* Date range — matches image exactly */}
        {/* <div style={{
          display: "flex", alignItems: "center", gap: 8,
          border: "1.5px solid #E2E8F0", borderRadius: 10,
          padding: "8px 14px", background: "#F8FAFC", flex: 1, maxWidth: 420,
        }}>
          <input
            type="date"
            value={filterStartDate}
            onChange={(e) => { setFilterStartDate(e.target.value); setPage(1); }}
            min="2016-01-01"
            max={filterEndDate || new Date().toISOString().split("T")[0]}
            style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: "#334155", flex: 1 }}
          />
          <span style={{ color: "#94A3B8", fontSize: 12 }}>–</span>
          <input
            type="date"
            value={filterEndDate}
            onChange={(e) => { setFilterEndDate(e.target.value); setPage(1); }}
            min={filterStartDate || "2016-01-01"}
            max={new Date().toISOString().split("T")[0]}
            style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: "#334155", flex: 1 }}
          />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div> */}
      </div>

      {/* ── Filter Row 2: Class + Search + Export ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        {/* Select Class */}
        {/* <div style={{ position: "relative", width: 280 }}>
          <select
            value={classFilter}
            onChange={(e) => { setClassFilter(e.target.value); setPage(1); }}
            style={{ ...inputStyle, appearance: "none", paddingRight: 36, cursor: "pointer" }}
          >
            <option value="">Select Class</option>
            {[
              { id: 1, label: "Class 6" },
              { id: 2, label: "Class 7" },
              { id: 3, label: "Class 8" },
              { id: 4, label: "Class 9" },
              { id: 5, label: "Class 10" },
              { id: 6, label: "Class 11" },
                    ].map((c) => (
              <option key={c.id} value={String(c.id)}>{c.label}</option>
            ))}
          </select>
          <svg style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div> */}

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
        {/* <button
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
        </button> */}
      </div>

      {/* ── Table Card ── */}
      <div style={{
        background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden",
      }}>



        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {[
                  "SR. NO.", "NAME", "USERNAME", "PASSWORD", "NATIONAL ID",
                  "SCHOOL NAME", "CLASS", "DOB", "GENDER", "EXAM LANGUAGE",
                  "ADDRESS", "PINCODE", "PARENT NAME", "PARENT MOBILE NO.",
                  "PARENT EMAIL", "STUDENT MOBILE", "STUDENT EMAIL",
                  // "MOCK EXAM", "FINAL EXAM", "PAYMENT",
                  "ACTION",
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
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={21} style={{ ...tdStyle, textAlign: "center", padding: "48px 0", color: "#94A3B8" }}>
                    No records found
                  </td>
                </tr>
              ) : (
                students.map((s: Student, index: number) => (
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
                    <td style={tdStyle}>
                      {(() => {
                        const classMap: Record<number, string> = {
                          1: " 6",
                          2: " 7",
                          3: " 8",
                          4: " 9",
                          5: " 10",
                          6: " 11",
                        };
                        return classMap[s.class_id] || s.class_id || "-";
                      })()}
                    </td>                    <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
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
                    {/* <td style={tdStyle}>
                      <span style={{
                        padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600,
                        background: s.is_mock ? "#D1FAE5" : "#FEE2E2",
                        color: s.is_mock ? "#059669" : "#DC2626",
                      }}>
                        {s.is_mock ? "Yes" : "No"}
                      </span>
                    </td> */}

                    {/* Final Exam */}
                    {/* <td style={tdStyle}>
                      <span style={{
                        padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600,
                        background: s.is_final ? "#D1FAE5" : "#FEE2E2",
                        color: s.is_final ? "#059669" : "#DC2626",
                      }}>
                        {s.is_final ? "Yes" : "No"}
                      </span>
                    </td> */}

                    {/* Payment */}
                    {/* <td style={tdStyle}>
                      <span style={{
                        padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600,
                        background: s.payment_status === 1 ? "#D1FAE5" : "#FEE2E2",
                        color: s.payment_status === 1 ? "#059669" : "#DC2626",
                      }}>
                        {s.payment_status === 1 ? "Paid" : "Pending"}
                      </span>
                    </td> */}


                    {/* Action */}
                    <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <FaEdit
                          style={{ cursor: "pointer", color: "#2563EB", fontSize: 15 }}
                          title="Edit"
                          onClick={() => openEdit(s)}
                        />
                        {/* <FaTrash
                          style={{ cursor: "pointer", color: "#EF4444", fontSize: 14 }}
                          title="Delete" 
                        /> */}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
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

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "flex-end",
          padding: "14px 20px", borderTop: "1px solid #F1F5F9", gap: 8,
          fontSize: 13, color: "#64748B",
        }}>
          <span>
            {totalRecords === 0
              ? "0 – 0 of 0"
              : `${(page - 1) * perPage + 1} – ${Math.min(page * perPage, totalRecords)} of ${totalRecords}`}
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
      {/* ── Edit Student Modal ── */}
      {editStudent && (
        <ModalWrapper onClose={() => setEditStudent(null)}>
          <div style={{
            background: "#fff", borderRadius: 16, padding: "32px 36px",
            width: 860, maxWidth: "95vw", position: "relative",
          }}>
            {/* Close button */}
            <button
              onClick={() => setEditStudent(null)}
              style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#94A3B8" }}
            >✕</button>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 28 }}>
              Edit Student
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px 24px" }}>

              {/* Country */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Student Country</label>
                <input value={COUNTRY_NAME_MAP[countryCode] || "Not available"} disabled style={{ ...inputStyle, opacity: 0.6, cursor: "not-allowed" }} />
              </div>

              {/* National ID */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>National ID <span style={{ color: "#ef4444" }}>*</span></label>
                <input value={editForm.nationalId} onChange={(e) => setEditForm((p) => ({ ...p, nationalId: e.target.value }))} style={inputStyle} />
              </div>

              {/* Nationality */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Nationality</label>
                <input value={editForm.nationality} onChange={(e) => setEditForm((p) => ({ ...p, nationality: e.target.value }))} style={inputStyle} />
              </div>

              {/* Region */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Student Region <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <select
                  value={editRegion}
                  onChange={(e) => setEditRegion(e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Select Region</option>
                  {editRegions.map((r) => (
                    <option key={r.district_id} value={String(r.district_id)}>{r.name}</option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  Student City <span style={{ color: "#ef4444" }}>*</span>
                </label>
                {!editRegion ? (
                  <input disabled placeholder="Select Region first" style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }} />
                ) : editCities.length > 0 ? (
                  <select value={editCity} onChange={(e) => setEditCity(e.target.value)} style={inputStyle}>
                    <option value="">Select City</option>
                    {editCities.map((c) => (
                      <option key={c.id} value={String(c.id)}>{c.name}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    placeholder="Enter city name"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    style={inputStyle}
                  />
                )}
              </div>

              {/* School */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                  School Name <span style={{ color: "#ef4444" }}>*</span>
                </label>
                {!editRegion ? (
                  <input disabled placeholder="Select Region first" style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }} />
                ) : editSchoolsLoading ? (
                  <input disabled placeholder="Loading schools..." style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }} />
                ) : editSchools.length > 0 ? (
                  <select value={editSchool} onChange={(e) => setEditSchool(e.target.value)} style={inputStyle}>
                    <option value="">Select School</option>
                    {editSchools.map((s) => (
                      <option key={s.id} value={s.school_name}>{s.school_name}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    placeholder="Enter school name"
                    value={editSchool}
                    onChange={(e) => setEditSchool(e.target.value)}
                    style={inputStyle}
                  />
                )}
              </div>

              {/* Division */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Division</label>
                <select value={editForm.division} onChange={(e) => setEditForm((p) => ({ ...p, division: e.target.value }))} style={inputStyle}>
                  <option value="">Select</option>
                  {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              {/* Full Name */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Full Name <span style={{ color: "#ef4444" }}>*</span></label>
                <input
                  value={editForm.fullName}
                  onChange={(e) => { setEditForm((p) => ({ ...p, fullName: e.target.value })); setEditFieldErrors((p) => ({ ...p, fullName: "" })); }}
                  onBlur={() => { if (editForm.fullName && !validateName(editForm.fullName)) setEditFieldErrors((p) => ({ ...p, fullName: "Only alphabetical characters allowed" })); }}
                  style={{ ...inputStyle, borderColor: editFieldErrors.fullName ? "#ef4444" : "#E2E8F0" }}
                />
                {editFieldErrors.fullName && <span style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{editFieldErrors.fullName}</span>}
              </div>

              {/* DOB */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>DOB <span style={{ color: "#ef4444" }}>*</span></label>
                <input type="date" value={editForm.dob} min="2008-01-01" max="2016-12-31" onChange={(e) => setEditForm((p) => ({ ...p, dob: e.target.value }))} style={inputStyle} />
              </div>

              {/* Gender */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Gender <span style={{ color: "#ef4444" }}>*</span></label>
                <select value={editForm.gender} onChange={(e) => setEditForm((p) => ({ ...p, gender: e.target.value }))} style={inputStyle}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Class */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Class/Grade <span style={{ color: "#ef4444" }}>*</span></label>
                <select value={editForm.classGrade} onChange={(e) => setEditForm((p) => ({ ...p, classGrade: e.target.value }))} style={inputStyle}>
                  <option value="">Select</option>
                  {Object.entries(CLASS_MAP).map(([key, label]) => <option key={key} value={key}>Class {label}</option>)}
                </select>
              </div>

              {/* Exam Language */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Exam Language <span style={{ color: "#ef4444" }}>*</span></label>
                <select value={editForm.examLanguage} onChange={(e) => setEditForm((p) => ({ ...p, examLanguage: e.target.value }))} style={inputStyle}>
                  <option value="English">English</option>
                </select>
              </div>

              {/* Parent Salutation */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Parent Salutation <span style={{ color: "#ef4444" }}>*</span></label>
                <select value={editForm.parentSalutation} onChange={(e) => setEditForm((p) => ({ ...p, parentSalutation: e.target.value }))} style={inputStyle}>
                  <option value="">Select</option>
                  <option value="Mr">Mr.</option>
                  <option value="Mrs">Mrs.</option>
                  <option value="Ms">Ms.</option>
                  <option value="Dr">Dr.</option>
                  <option value="Prof">Prof.</option>
                </select>
              </div>

              {/* Parent Name */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Parent Full Name <span style={{ color: "#ef4444" }}>*</span></label>
                <input
                  value={editForm.parentName}
                  onChange={(e) => { setEditForm((p) => ({ ...p, parentName: e.target.value })); setEditFieldErrors((p) => ({ ...p, parentName: "" })); }}
                  onBlur={() => { if (editForm.parentName && !validateName(editForm.parentName)) setEditFieldErrors((p) => ({ ...p, parentName: "Only alphabetical characters allowed" })); }}
                  style={{ ...inputStyle, borderColor: editFieldErrors.parentName ? "#ef4444" : "#E2E8F0" }}
                />
                {editFieldErrors.parentName && <span style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{editFieldErrors.parentName}</span>}
              </div>

              {/* Parent Email */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Parent Email <span style={{ color: "#ef4444" }}>*</span></label>
                <input
                  type="email"
                  value={editForm.parentEmail}
                  onChange={(e) => { setEditForm((p) => ({ ...p, parentEmail: e.target.value })); setEditFieldErrors((p) => ({ ...p, parentEmail: "" })); }}
                  onBlur={() => { if (editForm.parentEmail && !validateEmail(editForm.parentEmail).isValid) setEditFieldErrors((p) => ({ ...p, parentEmail: "Enter a valid email" })); }}
                  style={{ ...inputStyle, borderColor: editFieldErrors.parentEmail ? "#ef4444" : "#E2E8F0" }}
                />
                {editFieldErrors.parentEmail && <span style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{editFieldErrors.parentEmail}</span>}
              </div>

              {/* Parent Mobile */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Parent Mobile <span style={{ color: "#ef4444" }}>*</span></label>
                <input
                  type="text"
                  value={editForm.parentMobile}
                  maxLength={COUNTRY_MOBILE_LENGTH[countryCode] || 10}
                  onChange={(e) => { const v = e.target.value.replace(/\D/g, ""); setEditForm((p) => ({ ...p, parentMobile: v })); setEditFieldErrors((p) => ({ ...p, parentMobile: "" })); }}
                  onBlur={() => { if (editForm.parentMobile && !validateMobile(editForm.parentMobile).isValid) setEditFieldErrors((p) => ({ ...p, parentMobile: validateMobile(editForm.parentMobile).message })); }}
                  style={{ ...inputStyle, borderColor: editFieldErrors.parentMobile ? "#ef4444" : "#E2E8F0" }}
                />
                {editFieldErrors.parentMobile
                  ? <span style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{editFieldErrors.parentMobile}</span>
                  : <span style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>{COUNTRY_MOBILE_LENGTH[countryCode] ? `Must be ${COUNTRY_MOBILE_LENGTH[countryCode]} digits` : ""}</span>
                }
              </div>

            </div>

            {/* Success */}
            {editSuccess && (
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "14px 18px", marginTop: 20 }}>
                <p style={{ color: "#15803d", fontWeight: 700, fontSize: 14, margin: 0 }}> {editSuccess}</p>
                <button onClick={() => { setEditStudent(null); setPage(1); }}
                  style={{ marginTop: 8, padding: "6px 20px", borderRadius: 8, border: "none", background: "#15803d", color: "#fff", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
                  OK
                </button>
              </div>
            )}

            {/* Error */}
            {editError && (
              <div style={{ background: "#fff1f2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 16px", marginTop: 16 }}>
                <p style={{ color: "#dc2626", fontWeight: 600, fontSize: 13, margin: "0 0 4px 0" }}>❌ {editError}</p>
                {editApiErrors?.errors && (
                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    {Object.entries(editApiErrors.errors).map(([field, msgs]: any) => (
                      <li key={field} style={{ fontSize: 11, color: "#ef4444" }}>
                        <strong>{field}:</strong> {Array.isArray(msgs) ? msgs[0] : msgs}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Buttons */}
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 24 }}>
              <button onClick={() => setEditStudent(null)}
                style={{ padding: "10px 28px", border: "1px solid #d1d5db", borderRadius: 8, background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer", fontWeight: 500 }}>
                Discard
              </button>
              <button onClick={handleEditSubmit} disabled={editLoading}
                style={{ padding: "10px 28px", border: "none", borderRadius: 8, background: editLoading ? "#93c5fd" : "#3b82f6", color: "#fff", fontSize: 14, cursor: editLoading ? "not-allowed" : "pointer", fontWeight: 600 }}>
                {editLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
}