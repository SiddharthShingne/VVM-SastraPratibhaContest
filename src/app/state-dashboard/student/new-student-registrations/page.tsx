/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getNewRegistrations } from "@/services/uaeService"; // adjust if needed
import { FaEdit , FaTrash} from "react-icons/fa";
import { createPortal } from "react-dom";
import axiosInstance from "@/services/axiosInstance";
import { fetchSchoolsByRegion, fetchRegionsWithCities, addGccStudent } from "@/services/importantDatesService";
import { AddStudentButton } from "@/components/shared/AddStudent";
import { exportStudents } from "@/services/importantDatesService";
import { markKuwaitStudentsPaid } from "@/services/authService";
import { deleteStudent } from "@/services/uaeService";
// ─── Types ────────────────────────────────────────────────────────────────────
const COUNTRY_NAME_MAP: Record<string, string> = {
    SA: "Saudi Arabia", AE: "UAE", OM: "Oman",
    KW: "Kuwait", BH: "Bahrain", QA: "Qatar",
};
const COUNTRY_NATIONAL_ID_LENGTH: Record<string, number> = {
    AE: 15, SA: 10, KW: 12, BH: 9, QA: 11, OM: 8,
};
const COUNTRY_MOBILE_LENGTH: Record<string, number> = {
    AE: 9, SA: 9, KW: 8, BH: 8, QA: 8, OM: 8,
};
const getCountryCode = (): string => {
    try {
        if (typeof window === "undefined") return "";
        const raw = localStorage.getItem("user");
        if (!raw) return "";
        const parsed = JSON.parse(raw);
        return parsed?.user?.country_code || parsed?.country_code || "";
    } catch { return ""; }
};
// const getStateId = (): number | null => {
//     try {
//         if (typeof window === "undefined") return null;
//         const raw = localStorage.getItem("user");
//         if (!raw) return null;
//         const parsed = JSON.parse(raw);
//         const assignments = parsed?.user?.user_detail?.assignments || [];
//         const stateAssignment = assignments.find((a: any) => a.coordinatable_type === "State");
//         return stateAssignment?.coordinatable_id ?? null;
//     } catch { return null; }
// };

const getStateId = (): number | null => {
    try {
        if (typeof window === "undefined") return null;
        const raw = localStorage.getItem("user");
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        const assignments = parsed?.user?.user_detail?.assignments || [];
        const stateAssignment = assignments.find((a: any) => a.coordinatable_type === "State");
        return stateAssignment?.coordinatable_id ?? null;
    } catch { return null; }
};

const ZONAL_COORDINATOR_ROLE_ID = 8;
// TODO: confirm exact state_id for each country — KW confirmed, baaki placeholder hai
const STATE_COUNTRY_MAP: Record<string, number> = {
    SA: 38, AE: 39, KW: 40, BH: 41, QA: 42, OM: 43,
};
const GCC_STATE_IDS = Object.values(STATE_COUNTRY_MAP);

const getStateIds = (): number[] => {
    try {
        if (typeof window === "undefined") return [];
        const raw = localStorage.getItem("user");
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        const roleId = parsed?.user?.role_id ?? parsed?.role_id;
        if (roleId === ZONAL_COORDINATOR_ROLE_ID) return GCC_STATE_IDS;
        const assignments = parsed?.user?.user_detail?.assignments || [];
        const stateAssignment = assignments.find((a: any) => a.coordinatable_type === "State");
        return stateAssignment?.coordinatable_id ? [stateAssignment.coordinatable_id] : [];
    } catch { return []; }
};

const isZonalCoordinator = (): boolean => {
    try {
        if (typeof window === "undefined") return false;
        const raw = localStorage.getItem("user");
        if (!raw) return false;
        const parsed = JSON.parse(raw);
        const roleId = parsed?.user?.role_id ?? parsed?.role_id;
        return roleId === ZONAL_COORDINATOR_ROLE_ID;
    } catch { return false; }
};


const TODAY = new Date().toISOString().split("T")[0];
const MIN_DATE = "2016-01-01";

const inputStyle: React.CSSProperties = {
    width: "100%", border: "1px solid #e5e7eb", borderRadius: 8,
    padding: "10px 12px", fontSize: 13, color: "#111827",
    background: "#f9fafb", outline: "none", boxSizing: "border-box",
};

const Field = ({ label, required, children }: {
    label: string; required?: boolean; children: React.ReactNode;
}) => (
    <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block" }}>
            {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
        </label>
        {children}
    </div>
);

function Modal({ children, onClose, width = 500 }: {
    children: React.ReactNode; onClose: () => void; width?: number;
}) {
    return (
        <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
        }}>
            <div style={{
                background: "#fff", borderRadius: 16, padding: "32px 36px", width,
                maxWidth: "95vw", maxHeight: "90vh", overflowY: "auto",
                boxShadow: "0 20px 60px rgba(0,0,0,0.25)", position: "relative",
            }}>
                <button onClick={onClose} style={{
                    position: "absolute", top: 16, right: 16, background: "none",
                    border: "none", fontSize: 20, cursor: "pointer", color: "#666", lineHeight: 1,
                }}>✕</button>
                {children}
            </div>
        </div>
    );
}
type Student = {
    id: number;
    name: string;
    username?: string;
    password?: string;
    nationalId?: string;
    school?: string;
    classId?: number;
    dob?: string;
    gender?: string;
    address?: string;
    parentName?: string;
    parentMobile?: string;
    parentEmail?: string;
    studentMobile?: string;
    studentEmail?: string;
    nationality?: string;
    division?: string;
    isPaid?: boolean;
    lastLogin?: string;
    createdAt?: string;
    region?: string;   
    city?: string; 
};

// ─── Class map: class_id → Grade label ───────────────────────────────────────
const CLASS_MAP: Record<number, string> = {
    1: "Grade 6",
    2: "Grade 7",
    3: "Grade 8",
    4: "Grade 9",
    5: "Grade 10",
    6: "Grade 11",
};


// ─── Date formatter ───────────────────────────────────────────────────────────
const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
};

const formatDOB = (dateStr: string | null | undefined) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

// ─── Add Student Dialog ───────────────────────────────────────────────────────
function AddStudentDialog({ onClose, editData }: { onClose: () => void; editData?: Student | null }) {
    const [countryCode, setCountryCode] = useState(getCountryCode());

    useEffect(() => {
        const cc = getCountryCode();
        setCountryCode(cc);
    }, []);

    useEffect(() => {
        const loadRegions = async () => {
            try {
                const data = await fetchRegionsWithCities(countryCode);
                setRegions(data?.data || []);
            } catch {
                setRegions([]);
            }
        };
        if (countryCode) loadRegions();
    }, [countryCode]);

    const [form, setForm] = useState({
        country: COUNTRY_NAME_MAP[countryCode] || " ",
        nationalId: "",
        nationality: "Indian",
        region: editData?.region || "",
        city: editData?.city || "",
        school: "",
        division: "",
        fullName: "",
        dob: "",
        gender: "",
        classGrade: "",
        examLanguage: "English",
        parentSalutation: "",
        parentName: "",
        parentEmail: "",
        parentMobile: "",
    });

    useEffect(() => {
        setForm((prev) => ({ ...prev, country: COUNTRY_NAME_MAP[countryCode] || "Saudi Arabia" }));
    }, [countryCode]);

    useEffect(() => {
        if (editData) {
            setForm({
                country: COUNTRY_NAME_MAP[countryCode] || "Saudi Arabia",
                nationalId: editData.nationalId || "",
                nationality: "Indian",
                region: "",
                city: "",
                school: editData.school || "",
                division: "",
                fullName: editData.name || "",
                dob: editData.dob || "",
                gender: editData.gender || "",
                classGrade: String(editData.classId || ""),
                examLanguage: "English",
                parentSalutation: "",
                parentName: editData.parentName || "",
                parentEmail: editData.parentEmail || "",
                parentMobile: editData.parentMobile || "",
            });
        }
    }, [editData]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [apiErrorDetail, setApiErrorDetail] = useState<any>(null);
    const [schools, setSchools] = useState<{ id: number; school_name: string }[]>([]);
    const [schoolsLoading, setSchoolsLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({ fullName: "", parentName: "", parentMobile: "", parentEmail: "", dob: "" });
    type RegionData = {
        code: string; name: string; district_id: number;
        cities: { id: number; name: string; district_id: number }[];
    };
    const [regions, setRegions] = useState<RegionData[]>([]);
    const [cities, setCities] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        if (!form.region) { setCities([]); return; }
        const selectedRegion = regions.find((r) => String(r.district_id) === String(form.region));
        setCities(selectedRegion?.cities || []);
        setForm((prev) => ({ ...prev, city: "", school: "" }));
    }, [form.region, regions]);

    const raw = localStorage.getItem("user");
    const parsed = raw ? JSON.parse(raw) : null;
    const assignments = parsed?.user?.user_detail?.assignments || [];
    const stateAssignment = assignments.find((a: any) => a.coordinatable_type === "State");
    const stateId = stateAssignment?.coordinatable_id || "";

    useEffect(() => {
        const loadSchools = async () => {
            if (!form.region) { setSchools([]); return; }
            const selectedRegion = regions.find((r) => String(r.district_id) === String(form.region));
            const regionCode = selectedRegion?.code;
            if (!regionCode) return;
            setSchoolsLoading(true);
            try {
                const data = await fetchSchoolsByRegion(countryCode, regionCode, 1, 100);
                setSchools(data?.data?.data || []);
            } catch { setSchools([]); }
            finally { setSchoolsLoading(false); }
        };
        loadSchools();
    }, [form.region, regions]);

    const handleChange = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));
    const validateName = (name: string) => /^[A-Za-z\s\.\-']{2,50}$/.test(name.trim());
    const validateMobile = (mobile: string) => {
        const required = COUNTRY_MOBILE_LENGTH[countryCode] || 10;
        return mobile.replace(/\D/g, "").length === required
            ? { isValid: true, message: "" }
            : { isValid: false, message: `Mobile must be exactly ${required} digits` };
    };
    const validateEmail = (email: string) => {
        const ok = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email) && !email.includes("..");
        return ok ? { isValid: true, message: "" } : { isValid: false, message: "Enter a valid email (e.g. name@example.com)" };
    };
    const validateNationalId = (id: string) => {
        const required = COUNTRY_NATIONAL_ID_LENGTH[countryCode];
        if (!required) return { isValid: true, message: "" };
        return id.replace(/\D/g, "").length === required
            ? { isValid: true, message: "" }
            : { isValid: false, message: `National ID must be exactly ${required} digits` };
    };
    const validateDOB = (dob: string) => {
        if (!dob) return { isValid: false, message: "Date of birth is required" };
        const year = Number(dob.slice(0, 4));
        if (year < 2008 || year > 2017) {
            return { isValid: false, message: "Date of birth must be between 2008 and 2017" };
        }
        return { isValid: true, message: "" };
    };

    const CLASS_MAP_LOCAL: Record<number, string> = { 1: " 6", 2: " 7", 3: " 8", 4: " 9", 5: " 10", 6: " 11" };

    // DOB dropdown range: 2008–2017 only
    const DOB_YEARS = Array.from({ length: 2017 - 2008 + 1 }, (_, i) => 2008 + i);
    const DOB_MONTHS = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const [dobDay, setDobDay] = useState("");
    const [dobMonth, setDobMonth] = useState("");
    const [dobYear, setDobYear] = useState("");

    // Sync dropdowns when editing an existing student
    useEffect(() => {
        if (form.dob) {
            const [y, m, d] = form.dob.split("-");
            if (y) setDobYear(y);
            if (m) setDobMonth(m);
            if (d) setDobDay(d);
        }
    }, [form.dob]);

    const daysInMonth = (year: string, month: string) => {
        if (!year || !month) return 31;
        return new Date(Number(year), Number(month), 0).getDate();
    };

    const handleDobPartChange = (part: "day" | "month" | "year", value: string) => {
        let day = dobDay, month = dobMonth, year = dobYear;
        if (part === "day") { day = value; setDobDay(value); }
        if (part === "month") { month = value; setDobMonth(value); }
        if (part === "year") { year = value; setDobYear(value); }

        if (day && month && year) {
            const maxDay = daysInMonth(year, month);
            const safeDay = Number(day) > maxDay ? String(maxDay).padStart(2, "0") : day;
            if (safeDay !== day) setDobDay(safeDay);
            handleChange("dob", `${year}-${month}-${safeDay}`);
            setFieldErrors((p) => ({ ...p, dob: "" }));
        }
    };

    function DateRangePicker({
        startDate,
        endDate,
        onStartChange,
        onEndChange,
    }: {
        startDate: string;
        endDate: string;
        onStartChange: (v: string) => void;
        onEndChange: (v: string) => void;
    }) {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    border: "1px solid #d1d5db",
                    borderRadius: 10,
                    padding: "10px 14px",
                    background: "#f9fafb",
                }}
            >
                <span style={{ fontSize: 13, color: "#9ca3af" }}>📅</span>
                <input
                    type="date"
                    value={startDate}
                    min={MIN_DATE}
                    max={endDate || TODAY}
                    onChange={(e) => onStartChange(e.target.value)}
                    style={{
                        border: "none",
                        background: "transparent",
                        outline: "none",
                        fontSize: 13,
                        color: startDate ? "#111827" : "#9ca3af",
                        cursor: "pointer",
                    }}
                />
                <span style={{ color: "#d1d5db" }}>—</span>
                <input
                    type="date"
                    value={endDate}
                    min={startDate || MIN_DATE}
                    max={TODAY}
                    onChange={(e) => onEndChange(e.target.value)}
                    style={{
                        border: "none",
                        background: "transparent",
                        outline: "none",
                        fontSize: 13,
                        color: endDate ? "#111827" : "#9ca3af",
                        cursor: "pointer",
                    }}
                />
            </div>
        );
    }

    const handleSubmit = async () => {
        let finalCountryCode = countryCode;
        if (!finalCountryCode) {
            finalCountryCode = getCountryCode();
            if (!finalCountryCode) { setError("Country code not found. Please refresh the page or log in again."); return; }
        }
        const required = editData
            ? ["nationalId", "fullName", "dob", "gender", "classGrade", "parentSalutation", "parentName", "parentMobile", "parentEmail"]
            : ["nationalId", "region", "city", "school", "fullName", "dob", "gender", "classGrade", "parentSalutation", "parentName", "parentMobile", "parentEmail"];
        const missing = required.filter((k) => !(form as any)[k]);
        if (missing.length) { setError("Please fill all required fields."); return; }
        // if (!validateName(form.fullName)) { setError("Student name: letters, spaces, hyphens or dots only (2–50 chars)."); return; }
        // if (!validateName(form.parentName)) { setError("Parent name: letters, spaces, hyphens or dots only (2–50 chars)."); return; }
        if (!validateName(form.fullName)) { setError("Student name: letters, spaces, hyphens or dots only (2–50 chars)."); return; }
        const dobCheck = validateDOB(form.dob);
        if (!dobCheck.isValid) { setError(dobCheck.message); return; }
        if (!validateName(form.parentName)) { setError("Parent name: letters, spaces, hyphens or dots only (2–50 chars)."); return; }
       
       
        const mobileCheck = validateMobile(form.parentMobile);
        if (!mobileCheck.isValid) { setError(mobileCheck.message); return; }
        const emailCheck = validateEmail(form.parentEmail);
        if (!emailCheck.isValid) { setError(emailCheck.message); return; }
        if (!editData) {
            const idCheck = validateNationalId(form.nationalId);
            if (!idCheck.isValid) { setError(idCheck.message); return; }
        }
        setFieldErrors({ fullName: "", parentName: "", parentMobile: "", parentEmail: "", dob: "" });
        setLoading(true);
        setError("");
        try {
            if (editData?.id) {
                const editPayload = {
                    national_id: form.nationalId, nationality: form.nationality,
                    division: form.division || "N", fullName: form.fullName, dob: form.dob,
                    gender: form.gender === "Male" ? 1 : 2, grade: Number(form.classGrade),
                    name_1: form.parentSalutation, parent_full_name: form.parentName,
                    student_email: form.parentEmail, school_name: form.school, address: "",
                };
                await axiosInstance.post(`/students/update/${editData.id}`, editPayload);
            } else {
                await addGccStudent({
                    country_code: finalCountryCode,
                    emirate_id: form.nationalId,
                    nationality: form.nationality,
                    dist_id: form.region ? parseInt(form.region, 10) : undefined,
                    school_name: form.school,
                    division: form.division || "A",
                    fullName: form.fullName,
                    dob: form.dob,
                    gender: form.gender === "Male" ? 1 : 2,
                    grade: parseInt(CLASS_MAP_LOCAL[parseInt(form.classGrade, 10)]?.trim() || "0", 10),
                    class_id: parseInt(form.classGrade, 10),
                    exam_language: form.examLanguage,
                    state_id: String(stateId),
                    hear: "1",
                    parent_full_name: form.parentName,
                    parent_mobile: form.parentMobile || "",
                    parent_salutation: form.parentSalutation,
                    parent_email: form.parentEmail,
                    password: "vvm2026",
                    password_confirmation: "vvm2026",
                    city_id: form.city ? parseInt(form.city, 10) : undefined,
                });
            }
            setSuccessMsg("Student saved successfully!");
        } catch (err: any) {
            const msg = err?.message || err?.response?.data?.message || "Failed to save student.";
            setError(msg);
            setApiErrorDetail(err?.response?.data || null);
        } finally { setLoading(false); }
    };

    return (
        <Modal onClose={onClose} width={860}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 28 }}>
                {editData ? "Edit Student" : "Add Student"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px 24px" }}>
                <Field label="Student Country" required>
                    <input type="text" value={form.country || "Not available"} disabled
                        style={{ ...inputStyle, opacity: form.country ? 1 : 0.5, cursor: "not-allowed" }} />
                </Field>
                <Field label="Student's National Id" required>
                    <input type="text" placeholder="Student's National Id" value={form.nationalId}
                        maxLength={COUNTRY_NATIONAL_ID_LENGTH[countryCode] || 20}
                        onChange={(e) => handleChange("nationalId", e.target.value)} style={inputStyle} />
                </Field>
                <Field label="Student's Nationality">
                    <input type="text" value={form.nationality}
                        onChange={(e) => handleChange("nationality", e.target.value)} style={inputStyle} />
                </Field>
                <Field label="Student Region" required>
                    <select value={form.region} onChange={(e) => handleChange("region", e.target.value)} style={inputStyle}>
                        <option value="">Select Region</option>
                        {regions.map((r) => <option key={r.district_id} value={String(r.district_id)}>{r.name}</option>)}
                    </select>
                </Field>
                <Field label="Student City" required>
                    {!form.region ? (
                        <input type="text" placeholder="Select Region first" disabled style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }} />
                    ) : cities.length > 0 ? (
                        <select value={form.city} onChange={(e) => handleChange("city", e.target.value)} style={inputStyle}>
                            <option value="">Select City</option>
                            {cities.map((c) => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
                        </select>
                    ) : (
                        <input type="text" placeholder="Enter city name" value={form.city}
                            onChange={(e) => handleChange("city", e.target.value)} style={inputStyle} />
                    )}
                </Field>
                <Field label="School Name" required>
                    {!form.region ? (
                        <input type="text" placeholder="Select Region first" disabled style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }} />
                    ) : schoolsLoading ? (
                        <input type="text" placeholder="Loading schools..." disabled style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }} />
                    ) : schools.length > 0 ? (
                        <select value={form.school} onChange={(e) => handleChange("school", e.target.value)} style={inputStyle}>
                            <option value="">Select School</option>
                            {schools.map((s) => <option key={s.id} value={s.school_name}>{s.school_name}</option>)}
                        </select>
                    ) : (
                        <input type="text" placeholder="Enter school name" value={form.school}
                            onChange={(e) => handleChange("school", e.target.value)} style={inputStyle} />
                    )}
                </Field>
                <Field label="Student's Division">
                    <select value={form.division} onChange={(e) => handleChange("division", e.target.value)} style={inputStyle}>
                        <option value="">Select Option</option>
                        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                </Field>
                <Field label="Student's Full Name" required>
                    <input type="text" placeholder="Student's Full Name" value={form.fullName}
                        onChange={(e) => { handleChange("fullName", e.target.value); setFieldErrors((p) => ({ ...p, fullName: "" })); }}
                        onBlur={() => { if (form.fullName && !validateName(form.fullName)) setFieldErrors((p) => ({ ...p, fullName: "Only alphabetical characters are allowed" })); }}
                        style={{ ...inputStyle, borderColor: fieldErrors.fullName ? "#ef4444" : "#e5e7eb" }} />
                    {fieldErrors.fullName && <span style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{fieldErrors.fullName}</span>}
                </Field>
                {/* <Field label="DOB" required>
                    <input type="date" value={form.dob} min="2008-01-01" max="2017-12-31"
                        onChange={(e) => handleChange("dob", e.target.value)} style={inputStyle} />
                </Field> */}
                <Field label="DOB" required>
                    <div style={{ display: "flex", gap: 6 }}>
                        <select
                            value={dobDay}
                            onChange={(e) => handleDobPartChange("day", e.target.value)}
                            style={{ ...inputStyle, borderColor: fieldErrors.dob ? "#ef4444" : "#e5e7eb" }}
                        >
                            <option value="">DD</option>
                            {Array.from({ length: daysInMonth(dobYear, dobMonth) }, (_, i) => i + 1).map((d) => (
                                <option key={d} value={String(d).padStart(2, "0")}>{String(d).padStart(2, "0")}</option>
                            ))}
                        </select>
                        <select
                            value={dobMonth}
                            onChange={(e) => handleDobPartChange("month", e.target.value)}
                            style={{ ...inputStyle, borderColor: fieldErrors.dob ? "#ef4444" : "#e5e7eb" }}
                        >
                            <option value="">MM</option>
                            {DOB_MONTHS.map((m, i) => (
                                <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>
                            ))}
                        </select>
                        <select
                            value={dobYear}
                            onChange={(e) => handleDobPartChange("year", e.target.value)}
                            style={{ ...inputStyle, borderColor: fieldErrors.dob ? "#ef4444" : "#e5e7eb" }}
                        >
                            <option value="">YYYY</option>
                            {DOB_YEARS.map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                    {fieldErrors.dob && <span style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{fieldErrors.dob}</span>}
                </Field>
              
                <Field label="Student's Gender" required>
                    <select value={form.gender} onChange={(e) => handleChange("gender", e.target.value)} style={inputStyle}>
                        <option value="">Select Option</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </Field>
                <Field label="Class/Grade" required>
                    <select value={form.classGrade} onChange={(e) => handleChange("classGrade", e.target.value)} style={inputStyle}>
                        <option value="">Select Option</option>
                            {Object.entries(CLASS_MAP_LOCAL).map(([key, label]) => (
                        <option key={key} value={key}>{label.trim()}</option>
                        ))}
                    </select>
                </Field>
                <Field label="Language of Exam" required>
                    <select value={form.examLanguage} onChange={(e) => handleChange("examLanguage", e.target.value)} style={inputStyle}>
                        <option value="English">English</option>
                    </select>
                </Field>
                <Field label="Parent Salutation" required>
                    <select value={form.parentSalutation} onChange={(e) => handleChange("parentSalutation", e.target.value)} style={inputStyle}>
                        <option value="">Select Salutation</option>
                            <option value="Mr">Mr.</option><option value="Mrs">Mrs.</option>
                        <option value="Ms">Ms.</option><option value="Dr">Dr.</option><option value="Prof">Prof.</option>
                    </select>
                </Field>
                <Field label="Parent Full Name" required>
                    <input type="text" placeholder="Parent full name" value={form.parentName}
                        onChange={(e) => { handleChange("parentName", e.target.value); setFieldErrors((p) => ({ ...p, parentName: "" })); }}
                            onBlur={() => { if (form.parentName && !validateName(form.parentName)) setFieldErrors((p) => ({ ...p, parentName: "Only alphabetical characters are allowed" })); }}
                        style={{ ...inputStyle, borderColor: fieldErrors.parentName ? "#ef4444" : "#e5e7eb" }} />
                    {fieldErrors.parentName && <span style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{fieldErrors.parentName}</span>}
                </Field>
                <Field label="Parent Email-id" required>
                    <input type="email" placeholder="Parent Email-id" value={form.parentEmail}
                        onChange={(e) => { handleChange("parentEmail", e.target.value); setFieldErrors((p) => ({ ...p, parentEmail: "" })); }}
                            onBlur={() => { if (form.parentEmail && !validateEmail(form.parentEmail).isValid) setFieldErrors((p) => ({ ...p, parentEmail: "Enter a valid email (e.g. name@example.com)" })); }}
                        style={{ ...inputStyle, borderColor: fieldErrors.parentEmail ? "#ef4444" : "#e5e7eb" }} />
                    {fieldErrors.parentEmail && <span style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{fieldErrors.parentEmail}</span>}
                </Field>
                <Field label="Parent Mobile" required>
                    <input type="text" placeholder={`Parent Mobile (${COUNTRY_MOBILE_LENGTH[countryCode] || 10} digits)`}
                        value={form.parentMobile} maxLength={COUNTRY_MOBILE_LENGTH[countryCode] || 10}
                        onChange={(e) => { const val = e.target.value.replace(/\D/g, ""); handleChange("parentMobile", val); setFieldErrors((p) => ({ ...p, parentMobile: "" })); }}
                        onBlur={() => { if (form.parentMobile && !validateMobile(form.parentMobile).isValid) setFieldErrors((p) => ({ ...p, parentMobile: validateMobile(form.parentMobile).message })); }}
                        style={{ ...inputStyle, borderColor: fieldErrors.parentMobile ? "#ef4444" : "#e5e7eb" }} />
                    {fieldErrors.parentMobile
                        ? <span style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{fieldErrors.parentMobile}</span>
                        : <span style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>{COUNTRY_MOBILE_LENGTH[countryCode] ? `Must be ${COUNTRY_MOBILE_LENGTH[countryCode]} digits` : ""}</span>}
                </Field>
            </div>

            {successMsg && (
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "14px 18px", marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                    <p style={{ color: "#15803d", fontWeight: 700, fontSize: 14, margin: 0 }}>✅ {successMsg}</p>
                    <button onClick={onClose} style={{ alignSelf: "flex-end", padding: "6px 20px", borderRadius: 8, border: "none", background: "#15803d", color: "#fff", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>OK</button>
                </div>
            )}
            {error && (
                <div style={{ background: "#fff1f2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 16px", marginTop: 16 }}>
                    <p style={{ color: "#dc2626", fontWeight: 600, fontSize: 13, margin: "0 0 4px 0" }}>❌ {error}</p>
                    {apiErrorDetail?.errors && (
                        <ul style={{ margin: 0, paddingLeft: 16 }}>
                            {Object.entries(apiErrorDetail.errors).map(([field, msgs]: any) => (
                                <li key={field} style={{ fontSize: 11, color: "#ef4444", marginBottom: 2 }}>
                                    <strong>{field}:</strong> {Array.isArray(msgs) ? msgs[0] : msgs}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 20 }}>
                <button onClick={onClose} style={{ padding: "10px 28px", border: "1px solid #d1d5db", borderRadius: 8, background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer", fontWeight: 500 }}>Discard</button>
                <button onClick={handleSubmit} disabled={loading} style={{ padding: "10px 28px", border: "none", borderRadius: 8, background: loading ? "#93c5fd" : "#3b82f6", color: "#fff", fontSize: 14, cursor: loading ? "not-allowed" : "pointer", fontWeight: 600 }}>
                    {loading ? "Submitting..." : editData ? "Update" : "Submit"}
                </button>
            </div>
        </Modal>
    );
}

function ExportDateRangePicker({
    startDate,
    endDate,
    onStartChange,
    onEndChange,
}: {
    startDate: string;
    endDate: string;
    onStartChange: (v: string) => void;
    onEndChange: (v: string) => void;
}) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid #d1d5db",
                borderRadius: 10,
                padding: "10px 14px",
                background: "#f9fafb",
            }}
        >
            <span style={{ fontSize: 13, color: "#9ca3af" }}>📅</span>
            <input
                type="date"
                value={startDate}
                min={MIN_DATE}
                max={endDate || TODAY}
                onChange={(e) => onStartChange(e.target.value)}
                style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: startDate ? "#111827" : "#9ca3af", cursor: "pointer" }}
            />
            <span style={{ color: "#d1d5db" }}>—</span>
            <input
                type="date"
                value={endDate}
                min={startDate || MIN_DATE}
                max={TODAY}
                onChange={(e) => onEndChange(e.target.value)}
                style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: endDate ? "#111827" : "#9ca3af", cursor: "pointer" }}
            />
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NewRegistrationsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [classFilter, setClassFilter] = useState("");
    const [countryFilter, setCountryFilter] = useState("");
    const [isZonal] = useState(isZonalCoordinator());
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [editStudent, setEditStudent] = useState<Student | null>(null);
    // const [dialog, setDialog] = useState<"edit" | null>(null);
    const [exportStartDate, setExportStartDate] = useState("");
    const [exportEndDate, setExportEndDate] = useState("");
    const [exportLoading, setExportLoading] = useState(false);


    type DialogState =
        | "edit"
        | { type: "export" }
        | { type: "success"; message: string; title?: string }
        | { type: "delete-confirm"; student: Student }
        | { type: "error"; message: string }
        | null;

    const [dialog, setDialog] = useState<DialogState>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [markingPaid, setMarkingPaid] = useState(false);
    const [countryCode] = useState(getCountryCode());

    const handleEdit = (student: Student) => {
        setEditStudent(student);
        setDialog("edit");
    };

      const handleDeleteClick = (student: Student) => {
        setDialog({ type: "delete-confirm", student });
    };

    const handleDeleteConfirm = async (student: Student) => {
        setDeletingId(student.id);
        try {
            const res: any = await deleteStudent(student.id);
            fetchStudents();
            setDialog({
                type: "success",
                title: "Student Deleted",
                message: res?.message || `"${student.name}" was deleted successfully.`,
            });
        } catch (err: any) {
            setDialog({ type: "error", message: err?.message || "Failed to delete student." });
        } finally {
            setDeletingId(null);
        }
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === students.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(students.map((s) => s.id));
        }
    };

    const toggleSelectOne = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    // const handleMarkAsPaid = async () => {
    //     if (!selectedIds.length) return;
    //     const stateId = getStateId();
    //     if (!stateId) {
    //         setDialog({ type: "error", message: "State ID not found. Please refresh the page or log in again." });
    //         return;
    //     }
    //     setMarkingPaid(true);
    //     try {
    //         if (countryCode === "KW") {
    //             await markKuwaitStudentsPaid(selectedIds, stateId);
    //         }
    //         // future countries: else if (countryCode === "XX") { await markXxStudentsPaid(selectedIds, stateId); }
    //         setSelectedIds([]);
    //         fetchStudents();
    //     } catch (err: any) {
    //         setDialog({ type: "error", message: err?.message || "Failed to mark students as paid." });
    //     } finally {
    //         setMarkingPaid(false);
    //     }
    // };


    const handleMarkAsPaid = async () => {
        if (!selectedIds.length) return;
        const stateId = getStateId();
        if (!stateId) {
            setDialog({ type: "error", message: "State ID not found. Please refresh the page or log in again." });
            return;
        }
        setMarkingPaid(true);
        try {
            let res: any = null;
            if (countryCode === "KW") {
                res = await markKuwaitStudentsPaid(selectedIds, stateId);
            }
            // future countries: else if (countryCode === "XX") { res = await markXxStudentsPaid(selectedIds, stateId); }
            const updatedCount = res?.updated_count ?? selectedIds.length;
            setSelectedIds([]);
            fetchStudents();
            setDialog({
                type: "success",
                title: "Payment Status Updated",
                message: res?.message
                    ? `${res.message} (${updatedCount} student${updatedCount === 1 ? "" : "s"} updated)`
                    : `${updatedCount} student${updatedCount === 1 ? "" : "s"} marked as paid successfully.`,
            });
        } catch (err: any) {
            setDialog({ type: "error", message: err?.message || "Failed to mark students as paid." });
        } finally {
            setMarkingPaid(false);
        }
    };

    const handleExportSubmit = async () => {
        if (!exportStartDate || !exportEndDate) return;
        setExportLoading(true);
        try {
            const raw = localStorage.getItem("user");
            const parsed = raw ? JSON.parse(raw) : null;
            const assignments = parsed?.user?.user_detail?.assignments || [];
            const stateAssignment = assignments.find((a: any) => a.coordinatable_type === "State");
            const stateId = stateAssignment?.coordinatable_id;
            const prantId = stateAssignment?.extras?.prant_id;
            const userEmail = parsed?.user?.user_detail?.email || "";

            await exportStudents({
                zone_id: [],
                state_id: stateId ? [stateId] : [],
                prant_id: prantId ? [prantId] : [],
                district_id: [],
                class_id: [],
                school_id: [],
                school_student: true,
                email: userEmail,
                created_at_from: exportStartDate,
                created_at_to: exportEndDate,
            });

            setDialog({ type: "success", title: "Export Successful", message: "Export started! You will receive an email once completed." });
        } catch (err: any) {
            setDialog({ type: "error", message: err?.message || "Export failed. Please try again." });
        } finally {
            setExportLoading(false);
        }
    };

    function ModalWrapper({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) {
        if (typeof window === "undefined") return null;
        return createPortal(
            <div
                style={{
                    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
                    background: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center",
                    justifyContent: "center", zIndex: 999999, backdropFilter: "blur(2px)",
                }}
                onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}
            >
                <div
                    style={{
                        background: "#fff", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                        maxHeight: "90vh", overflowY: "auto", position: "relative",
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {onClose && (
                        <button onClick={onClose} style={{
                            position: "absolute", top: 12, right: 12, background: "none",
                            border: "none", fontSize: 18, cursor: "pointer", color: "#94a3b8", zIndex: 1,
                        }}>✕</button>
                    )}
                    {children}
                </div>
            </div>,
            document.body
        );
    }
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search), 500);
        return () => clearTimeout(t);
    }, [search]);

    // ─── Fetch ──────────────────────────────────────────────────────────────────
    const fetchStudents = async () => {
        setLoading(true);
        setStudents([]);
        setTotalRecords(0);
        try {
            // const res = await getNewRegistrations(currentPage, perPage);
            // const res = await getNewRegistrations(currentPage,perPage,classFilter ? Number(classFilter) : undefined
            // );

            const stateIdsToSend = countryFilter
                ? [STATE_COUNTRY_MAP[countryFilter]]
                : getStateIds();
            const res = await getNewRegistrations(
                currentPage,
                perPage,
                classFilter ? Number(classFilter) : undefined,
                stateIdsToSend,
            );
            // API shape: res.data.students.data[]
            const raw: any[] = res?.data?.students?.data || [];
            const total: number = res?.data?.students?.total || 0;

            const formatted: Student[] = raw.map((s: any) => ({
                id: s.id,
                name: s.name || "-",
                username: s.user?.username || "-",
                password: s.user?.temp_password || "-",
                nationalId: s.national_id || "-",
                school: s.school_name || "-",
                classId: s.class_id,
                dob: s.date_of_birth,
                // gender: 1 = Male, 2 = Female
                gender: s.gender === 1 ? "Male" : s.gender === 2 ? "Female" : "-",
                address: s.address || "-",
                parentName: s.parent_name || "-",
                parentMobile: s.parent_phone_number || "-",
                parentEmail: s.parent_email || "-",
                studentMobile: s.student_mobile_number || "-",
                studentEmail: s.student_email || "-",
                nationality: s.nationality || "-",
                division: s.division || "-",
                // payment_status: 1 = Paid, 0 = Pending
                isPaid: s.payment_status === 1,
                lastLogin: s.user?.last_login_at ? formatDate(s.user.last_login_at) : "-",
                createdAt: s.created_at,
            }));

            // Client-side search filter
            const filtered = debouncedSearch
                ? formatted.filter(
                    (s) =>
                        s.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                        s.username?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                        s.nationalId?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                        s.school?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                        s.parentName?.toLowerCase().includes(debouncedSearch.toLowerCase())
                )
                : formatted;

            setStudents(filtered);
            setTotalRecords(total);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     fetchStudents();
    // }, [debouncedSearch, currentPage, perPage]);

    useEffect(() => {
        fetchStudents();
    }, [debouncedSearch, classFilter, countryFilter, currentPage, perPage]);
    
    // ─── Styles ─────────────────────────────────────────────────────────────────
    const s = {
        page: {
            minHeight: "100vh",
            padding: "24px",
            fontFamily: "'Segoe UI', sans-serif",
        } as React.CSSProperties,

        card: {
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            marginBottom: 20,
        } as React.CSSProperties,

        filterCard: { padding: "20px 24px" } as React.CSSProperties,

        searchInput: {
            width: "100%",
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            padding: "10px 14px 10px 36px",
            fontSize: 13,
            color: "#374151",
            background: "#f9fafb",
            outline: "none",
            boxSizing: "border-box",
        } as React.CSSProperties,

        tableHeader: {
            padding: "14px 24px",
            borderBottom: "1px solid #f3f4f6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        } as React.CSSProperties,

        // th: {
        //     padding: "10px 12px",
        //     textAlign: "left" as const,
        //     fontSize: 11,
        //     fontWeight: 700,
        //     color: "#6b7280",
        //     textTransform: "uppercase" as const,
        //     whiteSpace: "nowrap" as const,
        //     background: "#f9fafb",
        // },

        th: {
            padding: "10px 12px",
            textAlign: "left" as const,
            fontSize: 11,
            fontWeight: 700,
            color: "#6b7280",
            textTransform: "uppercase" as const,
            whiteSpace: "nowrap" as const,
            background: "#f9fafb",
            position: "sticky" as const,
            top: 0,
            zIndex: 2,
            boxShadow: "inset 0 -1px 0 #e5e7eb",
        },

        td: {
            padding: "10px 12px",
            fontSize: 13,
            color: "#374151",
            whiteSpace: "nowrap" as const,
            borderBottom: "1px dashed #f3f4f6",
        },
    };

    const columns = [
        ...(countryCode === "KW" ? ["SELECT"] : []),
        "SR. NO.", "NAME", "USERNAME", "PASSWORD",
        "NATIONAL ID", "SCHOOL NAME", "CLASS", "DIVISION",
        "DOB", "GENDER", "NATIONALITY", "ADDRESS",
        "PARENT NAME", "PARENT MOBILE", "PARENT EMAIL",
        "STUDENT MOBILE", "STUDENT EMAIL",
        "LAST LOGIN", "CREATED AT", "PAYMENT STATUS", "EDIT","DELETE"
    ];

    return (
        <div style={s.page}>

            {/* ── Filter Card ───────────────────────────────────────────────────── */}
            <div style={{ ...s.card, ...s.filterCard }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    flexWrap: "wrap",
                }}>

                    {/* Search */}
                    <div style={{ position: "relative", display: "inline-block", width: "50%" }}>
                        <Search
                            size={18}
                            style={{
                                position: "absolute", left: 12, top: "50%",
                                transform: "translateY(-50%)", color: "#999", pointerEvents: "none",
                            }}
                        />
                        {/* <input
                            type="text"
                            placeholder="Search by name, username, national ID, school..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                            style={s.searchInput}
                        />
                        
                        
                    </div> */}

                        <input
                            type="text"
                            placeholder="Search by name, username, national ID, school..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                            style={s.searchInput}
                        />

                    </div>

                    {/* Class Filter */}
                    <select
                        value={classFilter}
                        onChange={(e) => { setClassFilter(e.target.value); setCurrentPage(1); }}
                        style={{
                            border: "1px solid #e5e7eb",
                            borderRadius: 10,
                            padding: "10px 14px",
                            fontSize: 13,
                            color: "#374151",
                            background: "#f9fafb",
                            outline: "none",
                            cursor: "pointer",
                            width: 160,
                        }}
                    >
                        <option value="">All Classes</option>
                        {Object.entries(CLASS_MAP).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>

                    {isZonal && (
                        <select
                            value={countryFilter}
                            onChange={(e) => { setCountryFilter(e.target.value); setCurrentPage(1); }}
                            style={{
                                border: "1px solid #e5e7eb",
                                borderRadius: 10,
                                padding: "10px 14px",
                                fontSize: 13,
                                color: "#374151",
                                background: "#f9fafb",
                                outline: "none",
                                cursor: "pointer",
                                width: 160,
                            }}
                        >
                            <option value="">All Countries</option>
                            {Object.entries(COUNTRY_NAME_MAP).map(([code, label]) => (
                                <option key={code} value={code}>{label}</option>
                            ))}
                        </select>
                    )}
                    
                  {/* Legend */}
                    {/* <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <AddStudentButton onSuccesyyys={fetchStudents} />
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}> */}
                    {/* <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <AddStudentButton onSuccess={fetchStudents} />
                        <button
                            onClick={() => setDialog({ type: "export" })} */}
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <AddStudentButton onSuccess={fetchStudents} />
                        {countryCode === "KW" && selectedIds.length > 0 && (
                            <button
                                onClick={handleMarkAsPaid}
                                disabled={markingPaid}
                                style={{ padding: "10px 22px", borderRadius: 10, border: "none", background: markingPaid ? "#86efac" : "#22c55e", color: "#fff", fontWeight: 600, fontSize: 13, cursor: markingPaid ? "not-allowed" : "pointer" }}
                            >
                                {markingPaid ? "Marking..." : `Mark as Paid (${selectedIds.length})`}
                            </button>
                        )}
                        <button
                            onClick={() => setDialog({ type: "export" })}
                            style={{ padding: "10px 22px", borderRadius: 10, border: "none", background: "#3B82F6", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#2563EB")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "#3B82F6")}
                        >
                            Export
                        </button>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 14, height: 14, background: "#bbf7d0", borderRadius: 3 }} />
                            <span style={{ fontSize: 12, color: "#374151" }}>Paid</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 14, height: 14, background: "#fecaca", borderRadius: 3 }} />
                            <span style={{ fontSize: 12, color: "#374151" }}>Unpaid</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Table Card ────────────────────────────────────────────────────── */}
            <div style={s.card}>
                <div style={s.tableHeader}>
                    <h2 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: 0 }}>
                        New Registrations
                    </h2>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>
                        Total: {totalRecords}
                    </span>
                </div>

                {/* <div style={{ overflowX: "auto" }}> */}
                    {/* <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1400 }}> */}
                        {/* <thead>
                            <tr>
                                {columns.map((h) => <th key={h} style={s.th}>{h}</th>)}
                            </tr>
                        </thead> */}
                <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "70vh" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1400 }}>
                        <thead>
                            <tr>
                                {columns.map((h) =>
                                    h === "SELECT" ? (
                                        <th key={h} style={s.th}>
                                            <input
                                                type="checkbox"
                                                checked={students.length > 0 && selectedIds.length === students.length}
                                                onChange={toggleSelectAll}
                                            />
                                        </th>
                                    ) : (
                                        <th key={h} style={s.th}>{h}</th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={columns.length} style={{ ...s.td, textAlign: "center", padding: 40 }}>
                                        Loading...
                                    </td>
                                </tr>
                            ) : students.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} style={{ ...s.td, textAlign: "center", padding: 40 }}>
                                        No data found
                                    </td>
                                </tr>
                            ) : (
                                students.map((row, i) => (
                                    <tr key={row.id} style={{ background: row.isPaid ? "#f0fdf4" : "#fff1f2" }}>
                                        {countryCode === "KW" && (
                                            <td style={s.td}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(row.id)}
                                                    onChange={() => toggleSelectOne(row.id)}
                                                />
                                            </td>
                                        )}
                                        <td style={{ ...s.td, color: "#94a3b8", fontSize: 12 }}>
                                            {(currentPage - 1) * perPage + i + 1}
                                        </td>
                                        <td style={{ ...s.td, color: "#2563eb", fontWeight: 600 }}>{row.name}</td>
                                        <td style={s.td}>{row.username}</td>
                                        <td style={s.td}>{row.password}</td>
                                        <td style={s.td}>{row.nationalId}</td>
                                        <td style={{ ...s.td, maxWidth: 200, whiteSpace: "normal" }}>{row.school}</td>
                                        <td style={s.td}>
                                            {row.classId ? CLASS_MAP[row.classId] || `ID ${row.classId}` : "-"}
                                        </td>
                                        <td style={s.td}>{row.division}</td>
                                        <td style={s.td}>{formatDOB(row.dob)}</td>
                                        <td style={s.td}>{row.gender}</td>
                                        <td style={s.td}>{row.nationality}</td>
                                        <td style={{ ...s.td, maxWidth: 200, whiteSpace: "normal" }}>{row.address}</td>
                                        <td style={s.td}>{row.parentName}</td>
                                        <td style={s.td}>{row.parentMobile}</td>
                                        <td style={s.td}>{row.parentEmail}</td>
                                        <td style={s.td}>{row.studentMobile}</td>
                                        <td style={s.td}>{row.studentEmail}</td>
                                        <td style={s.td}>{row.lastLogin}</td>
                                        <td style={s.td}>{formatDate(row.createdAt)}</td>
                                        <td style={s.td}><span style={{  padding: "3px 10px",                                               borderRadius: 12,                                                fontSize: 11,
                                                fontWeight: 600,
                                                background: row.isPaid ? "#bbf7d0" : "#fecaca",
                                                color: row.isPaid ? "#15803d" : "#dc2626",
                                            }}>
                                                {row.isPaid ? "Paid" : "Pending"}
                                            </span>
                                        </td>
                                        <td style={s.td}>
                                            <FaEdit
                                                style={{ cursor: "pointer", color: "#2563eb", fontSize: 14 }}
                                                onClick={() => handleEdit(row)}
                                                title="Edit"
                                            /> 
                                            <br />
                                            {/* <FaTrash
                                                style={{ cursor: deletingId === row.id ? "not-allowed" : "pointer", color: "#dc2626", fontSize: 14, opacity: deletingId === row.id ? 0.5 : 1 }}
                                                onClick={() => deletingId !== row.id && handleDeleteClick(row)}
                                                title="Delete"
                                            /> */}
                                        </td>
                                        <td style={s.td}>
                                                                                    <FaTrash
                                                style={{ cursor: deletingId === row.id ? "not-allowed" : "pointer", color: "#dc2626", fontSize: 14, opacity: deletingId === row.id ? 0.5 : 1 }}
                                                onClick={() => deletingId !== row.id && handleDeleteClick(row)}
                                                title="Delete"
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Pagination ────────────────────────────────────────────────────── */}
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 20px", borderTop: "1px solid #f3f4f6",
                fontSize: 13, color: "#6b7280",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span>Items per page:</span>
                    <select
                        value={perPage}
                        onChange={(e) => { setPerPage(Number(e.target.value)); setCurrentPage(1); }}
                        style={{
                            border: "1px solid #e5e7eb", borderRadius: 6, padding: "4px 8px",
                            fontSize: 13, color: "#374151", background: "#fff",
                            cursor: "pointer", outline: "none",
                        }}
                    >
                        {[10, 50, 100, 250].map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span>
                        {students.length === 0
                            ? "0 – 0 of 0"
                            : `${(currentPage - 1) * perPage + 1} – ${Math.min(currentPage * perPage, totalRecords)} of ${totalRecords}`}
                    </span>
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        style={{
                            padding: "4px 10px", borderRadius: 6, border: "1px solid #e5e7eb",
                            background: currentPage === 1 ? "#f9fafb" : "#fff",
                            cursor: currentPage === 1 ? "not-allowed" : "pointer",
                            color: currentPage === 1 ? "#d1d5db" : "#374151",
                        }}
                    >‹</button>
                    <button
                        onClick={() => setCurrentPage((p) => p + 1)}
                        disabled={currentPage * perPage >= totalRecords}
                        style={{
                            padding: "4px 10px", borderRadius: 6, border: "1px solid #e5e7eb",
                            background: currentPage * perPage >= totalRecords ? "#f9fafb" : "#fff",
                            cursor: currentPage * perPage >= totalRecords ? "not-allowed" : "pointer",
                            color: currentPage * perPage >= totalRecords ? "#d1d5db" : "#374151",
                        }}
                    >›</button>
                </div>
            </div>
            
       


            {dialog === "edit" && (
                <ModalWrapper onClose={() => { setDialog(null); setEditStudent(null); fetchStudents(); }}>
                    <AddStudentDialog
                        onClose={() => { setDialog(null); setEditStudent(null); fetchStudents(); }}
                        editData={editStudent}
                    />
                </ModalWrapper>
            )}

            {dialog !== null && typeof dialog === "object" && dialog.type === "export" && (
                <ModalWrapper onClose={() => setDialog(null)}>
                    <Modal onClose={() => setDialog(null)} width={500}>
                        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 8 }}>
                            Export Student
                        </h2>
                        <p style={{ fontSize: 13, color: "#6b7280", textAlign: "center", marginBottom: 20 }}>
                            Please select start date and end date for export
                        </p>

                        <ExportDateRangePicker
                            startDate={exportStartDate}
                            endDate={exportEndDate}
                            onStartChange={setExportStartDate}
                            onEndChange={setExportEndDate}
                        />

                        <p style={{ fontSize: 12, color: "#6b7280", textAlign: "center", marginTop: 16, marginBottom: 28 }}>
                            Exported File will be sent to this Email:{" "}
                            <strong style={{ color: "#111827" }}>
                                {(() => {
                                    try {
                                        const parsed = JSON.parse(localStorage.getItem("user") || "{}");
                                        return parsed?.user?.user_detail?.email || " ";
                                    } catch { return " "; }
                                })()}
                            </strong>
                        </p>

                        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                            <button onClick={() => setDialog(null)} style={{ padding: "10px 28px", border: "1px solid #d1d5db", borderRadius: 8, background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer" }}>
                                Discard
                            </button>
                            <button
                                onClick={handleExportSubmit}
                                disabled={exportLoading || !exportStartDate || !exportEndDate}
                                style={{
                                    padding: "10px 28px", border: "none", borderRadius: 8,
                                    background: exportLoading || !exportStartDate || !exportEndDate ? "#93c5fd" : "#3b82f6",
                                    color: "#fff", fontSize: 14,
                                    cursor: exportLoading || !exportStartDate || !exportEndDate ? "not-allowed" : "pointer",
                                    fontWeight: 600,
                                }}
                            >
                                {exportLoading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </Modal>
                </ModalWrapper>
            )}

            {dialog !== null && typeof dialog === "object" && dialog.type === "delete-confirm" && (
                <ModalWrapper onClose={() => setDialog(null)}>
                    <Modal onClose={() => setDialog(null)} width={380}>
                        <div style={{ textAlign: "center", padding: "12px 0" }}>
                            <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 8 }}>
                                Delete Student?
                            </h3>
                            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 24 }}>
                                Are you sure you want to delete <strong>{dialog.student.name}</strong>? This action cannot be undone.
                            </p>
                            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                                <button
                                    onClick={() => setDialog(null)}
                                    style={{ padding: "10px 28px", border: "1px solid #d1d5db", borderRadius: 8, background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer" }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDeleteConfirm(dialog.student)}
                                    disabled={deletingId === dialog.student.id}
                                    style={{
                                        padding: "10px 28px", border: "none", borderRadius: 8,
                                        background: "#dc2626", color: "#fff", fontSize: 14, fontWeight: 600,
                                        cursor: deletingId === dialog.student.id ? "not-allowed" : "pointer",
                                        opacity: deletingId === dialog.student.id ? 0.6 : 1,
                                    }}
                                >
                                    {deletingId === dialog.student.id ? "Deleting..." : "Yes, Delete"}
                                </button>
                            </div>
                        </div>
                    </Modal>
                </ModalWrapper>
            )}

            {dialog !== null && typeof dialog === "object" && dialog.type === "success" && (
                <ModalWrapper onClose={() => setDialog(null)}>
                    <Modal onClose={() => setDialog(null)} width={380}>
                        <div style={{ textAlign: "center", padding: "12px 0" }}>
                            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#15803d", marginBottom: 8 }}>
                                {dialog.title || "Export Successful"}
                            </h3>
                            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 24 }}>{dialog.message}</p>
                            <button onClick={() => setDialog(null)} style={{ padding: "10px 32px", border: "none", borderRadius: 8, background: "#15803d", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                                OK
                            </button>
                        </div>
                    </Modal>
                </ModalWrapper>
            )}

            {dialog !== null && typeof dialog === "object" && dialog.type === "error" && (
                <ModalWrapper onClose={() => setDialog(null)}>
                    <Modal onClose={() => setDialog(null)} width={380}>
                        <div style={{ textAlign: "center", padding: "12px 0" }}>
                            <div style={{ fontSize: 48, marginBottom: 12 }}>❌</div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#dc2626", marginBottom: 8 }}>Export Failed</h3>
                            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 24 }}>{dialog.message}</p>
                            <button onClick={() => setDialog(null)} style={{ padding: "10px 32px", border: "none", borderRadius: 8, background: "#dc2626", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                                Close
                            </button>
                        </div>
                    </Modal>
                </ModalWrapper>
            )}
        </div>
    );
}