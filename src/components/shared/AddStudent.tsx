/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axiosInstance from "@/services/axiosInstance";
import {
    fetchSchoolsByRegion,
    fetchRegionsWithCities,
    addGccStudent,
} from "@/services/importantDatesService";

// ─── Shared types ─────────────────────────────────────────────────────────
export type StudentEditData = {
    id?: number;
    name?: string;
    nationalId?: string;
    school?: string;
    classId?: number;
    dob?: string;
    gender?: string;
    examLanguage?: string;
    parentName?: string;
    parentMobile?: string;
    parentEmail?: string;
    region?: string;
    city?: string;
};

// ─── Class map (backend key → label) ─────────────────────────────────────
export const CLASS_MAP: Record<number, string> = {
    1: " 6",
    2: " 7",
    3: " 8",
    4: " 9",
    5: " 10",
    6: " 11",
};

// ─── Country helpers ──────────────────────────────────────────────────────
export const getCountryCode = (): string => {
    try {
        if (typeof window === "undefined") return "";
        const raw = localStorage.getItem("user");
        if (!raw) return "";
        const parsed = JSON.parse(raw);
        return parsed?.user?.country_code || parsed?.country_code || "";
    } catch {
        return "";
    }
};

export const COUNTRY_NAME_MAP: Record<string, string> = {
    SA: "Saudi Arabia",
    AE: "UAE",
    OM: "Oman",
    KW: "Kuwait",
    BH: "Bahrain",
    QA: "Qatar",
};

export const COUNTRY_NATIONAL_ID_LENGTH: Record<string, number> = {
    AE: 15,
    SA: 10,
    KW: 12,
    BH: 9,
    QA: 11,
    OM: 8,
};

export const COUNTRY_MOBILE_LENGTH: Record<string, number> = {
    AE: 9,
    SA: 9,
    KW: 8,
    BH: 8,
    QA: 8,
    OM: 8,
};

// ─── Shared styles ─────────────────────────────────────────────────────────
export const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 13,
    color: "#111827",
    background: "#f9fafb",
    outline: "none",
    boxSizing: "border-box",
};

export const Field = ({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) => (
    <div style={{ display: "flex", flexDirection: "column" }}>
        <label
            style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#374151",
                marginBottom: 6,
                display: "block",
            }}
        >
            {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
        </label>
        {children}
    </div>
);

// ─── Reusable centered Modal ────────────────────────────────────────────────
export function Modal({
    children,
    onClose,
    width = 500,
}: {
    children: React.ReactNode;
    onClose: () => void;
    width?: number;
}) {
    return (
        <div
            onClick={(e) => e.target === e.currentTarget && onClose()}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    background: "#fff",
                    borderRadius: 16,
                    padding: "32px 36px",
                    width,
                    maxWidth: "95vw",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
                    position: "relative",
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        background: "none",
                        border: "none",
                        fontSize: 20,
                        cursor: "pointer",
                        color: "#666",
                        lineHeight: 1,
                    }}
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
}

// ─── Portal wrapper (used by pages that want their own trigger) ────────────
export function ModalWrapper({
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
                background: "rgba(0, 0, 0, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 999999,
                backdropFilter: "blur(2px)",
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget && onClose) onClose();
            }}
        >
            <div
                style={{
                    background: "#fff",
                    borderRadius: 16,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    position: "relative",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {onClose && (
                    <button
                        onClick={onClose}
                        style={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            background: "none",
                            border: "none",
                            fontSize: 18,
                            cursor: "pointer",
                            color: "#94a3b8",
                            zIndex: 1,
                        }}
                    >
                        ✕
                    </button>
                )}
                {children}
            </div>
        </div>,
        document.body
    );
}

// ─── The Add/Edit Student Dialog (exported for direct use, e.g. edit flow) ──
export function AddStudentDialog({
    onClose,
    editData,
    onSuccess,
}: {
    onClose: () => void;
    editData?: StudentEditData | null;
    onSuccess?: () => void;
}) {
    const [countryCode, setCountryCode] = useState(getCountryCode());

    useEffect(() => {
        setCountryCode(getCountryCode());
    }, []);

    type RegionData = {
        code: string;
        name: string;
        district_id: number;
        cities: { id: number; name: string; district_id: number }[];
    };
    const [regions, setRegions] = useState<RegionData[]>([]);
    const [cities, setCities] = useState<{ id: number; name: string }[]>([]);

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
        setForm((prev) => ({
            ...prev,
            country: COUNTRY_NAME_MAP[countryCode] || "Saudi Arabia",
        }));
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
                examLanguage: editData.examLanguage || "English",
                parentSalutation: "",
                parentName: editData.parentName || "",
                parentEmail: editData.parentEmail || "",
                parentMobile: editData.parentMobile || "",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editData]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [apiErrorDetail, setApiErrorDetail] = useState<any>(null);
    const [schools, setSchools] = useState<{ id: number; school_name: string }[]>([]);
    const [schoolsLoading, setSchoolsLoading] = useState(false);

    const [fieldErrors, setFieldErrors] = useState({
        fullName: "",
        parentName: "",
        parentMobile: "",
        parentEmail: "",
        dob: "",
    });
    useEffect(() => {
        if (!form.region) {
            setCities([]);
            return;
        }
        const selectedRegion = regions.find(
            (r) => String(r.district_id) === String(form.region)
        );
        setCities(selectedRegion?.cities || []);
        setForm((prev) => ({ ...prev, city: "", school: "" }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.region, regions]);

    const raw = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const parsed = raw ? JSON.parse(raw) : null;
    const assignments = parsed?.user?.user_detail?.assignments || [];
    const stateAssignment = assignments.find(
        (a: any) => a.coordinatable_type === "State"
    );
    const stateId = stateAssignment?.coordinatable_id || "";

    useEffect(() => {
        const loadSchools = async () => {
            if (!form.region) {
                setSchools([]);
                return;
            }
            const selectedRegion = regions.find(
                (r) => String(r.district_id) === String(form.region)
            );
            const regionCode = selectedRegion?.code;
            if (!regionCode) return;

            setSchoolsLoading(true);
            try {
                const data = await fetchSchoolsByRegion(countryCode, regionCode, 1, 100);
                setSchools(data?.data?.data || []);
            } catch {
                setSchools([]);
            } finally {
                setSchoolsLoading(false);
            }
        };
        loadSchools();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.region, regions]);

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
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
        return ok
            ? { isValid: true, message: "" }
            : { isValid: false, message: "Enter a valid email (e.g. name@example.com)" };
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

    // DOB dropdown range: 2008–2017 only
    const DOB_YEARS = Array.from({ length: 2017 - 2008 + 1 }, (_, i) => 2008 + i);
    const DOB_MONTHS = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const [dobDay, setDobDay] = useState("");
    const [dobMonth, setDobMonth] = useState("");
    const [dobYear, setDobYear] = useState("");

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
            setFieldErrors((prev) => ({ ...prev, dob: "" }));
        }
    };

    const handleSubmit = async () => {
        let finalCountryCode = countryCode;
        if (!finalCountryCode) {
            finalCountryCode = getCountryCode();
            if (!finalCountryCode) {
                setError("Country code not found. Please refresh the page or log in again.");
                return;
            }
        }
        const required = editData
            ? ["nationalId", "fullName", "dob", "gender", "classGrade", "parentSalutation", "parentName", "parentMobile", "parentEmail"]
            : ["nationalId", "region", "city", "school", "fullName", "dob", "gender", "classGrade", "parentSalutation", "parentName", "parentMobile", "parentEmail"];

        const missing = required.filter((k) => !(form as any)[k]);
        if (missing.length) {
            setError("Please fill all required fields.");
            return;
        }
        if (!validateName(form.fullName)) {
            setError("Student name: letters, spaces, hyphens or dots only (2–50 chars).");
            return;
        }
        const dobCheck = validateDOB(form.dob);
        if (!dobCheck.isValid) {
            setError(dobCheck.message);
            return;
        }
        if (!validateName(form.parentName)) {
            setError("Parent name: letters, spaces, hyphens or dots only (2–50 chars).");
            return;
        }
        const mobileCheck = validateMobile(form.parentMobile);
        if (!mobileCheck.isValid) {
            setError(mobileCheck.message);
            return;
        }
        const emailCheck = validateEmail(form.parentEmail);
        if (!emailCheck.isValid) {
            setError(emailCheck.message);
            return;
        }
        if (!editData) {
            const idCheck = validateNationalId(form.nationalId);
            if (!idCheck.isValid) {
                setError(idCheck.message);
                return;
            }
        }
        setFieldErrors({ fullName: "", parentName: "", parentMobile: "", parentEmail: "", dob: "" });
        setLoading(true);
        setError("");
        try {
            if (editData?.id) {
                const editPayload = {
                    national_id: form.nationalId,
                    nationality: form.nationality,
                    division: form.division || "N",
                    fullName: form.fullName,
                    dob: form.dob,
                    gender: form.gender === "Male" ? 1 : 2,
                    grade: Number(form.classGrade),
                    name_1: form.parentSalutation,
                    parent_full_name: form.parentName,
                    student_email: form.parentEmail,
                    school_name: form.school,
                    address: "",
                };
                await axiosInstance.post(`/students/update/${editData.id}`, editPayload);
            } else {
                console.log("DEBUG school payload:", form.school, form);
                await addGccStudent({
                    country_code: finalCountryCode,
                    emirate_id: form.nationalId,
                    nationality: form.nationality,
                    dist_id: form.region ? parseInt(form.region, 10) : undefined,
                    // school_name: form.school,
                    sch_name: form.school,
                    division: form.division || "A",
                    fullName: form.fullName,
                    dob: form.dob,
                    gender: form.gender === "Male" ? 1 : 2,
                    grade: parseInt(CLASS_MAP[parseInt(form.classGrade, 10)]?.trim() || "0", 10),
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
                setSuccessMsg("Student added successfully!");
            }
            onSuccess?.();
        } catch (err: any) {
            const errData = err?.response?.data;
            if (errData?.action === "LOGIN_REQUIRED") {
                setError(
                    `Student already registered. Username: ${errData?.data?.username || "-"} | Parent Email: ${errData?.data?.parent_email || "-"}`
                );
                return;
            }
            const msg = errData?.message || err?.message || "Failed to save student.";
            setError(msg);
            setApiErrorDetail(errData || null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal onClose={onClose} width={860}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 28 }}>
                {editData ? "Edit Student" : "Add Student"}
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px 24px" }}>
                <Field label="Student Country" required>
                    <input
                        type="text"
                        value={form.country || "Not available"}
                        disabled
                        style={{ ...inputStyle, opacity: form.country ? 1 : 0.5, cursor: "not-allowed" }}
                    />
                </Field>

                <Field label="Student's National Id" required>
                    <input
                        type="text"
                        placeholder="Student's National Id"
                        value={form.nationalId}
                        maxLength={
                            countryCode === "AE" ? 15 :
                                countryCode === "SA" ? 10 :
                                    countryCode === "KW" ? 12 :
                                        countryCode === "BH" ? 9 :
                                            countryCode === "QA" ? 11 :
                                                countryCode === "OM" ? 8 : 20
                        }
                        onChange={(e) => handleChange("nationalId", e.target.value)}
                        style={inputStyle}
                    />
                    <span style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
                        {countryCode === "AE" ? "Max 15 digits" :
                            countryCode === "SA" ? "Max 10 digits" :
                                countryCode === "KW" ? "Max 12 digits" :
                                    countryCode === "BH" ? "Max 9 digits" :
                                        countryCode === "QA" ? "Max 11 digits" :
                                            countryCode === "OM" ? "Max 8 digits" : ""}
                    </span>
                </Field>

                <Field label="Student's Nationality">
                    <input
                        type="text"
                        value={form.nationality}
                        onChange={(e) => handleChange("nationality", e.target.value)}
                        style={inputStyle}
                    />
                </Field>

                <Field label="Student Region" required>
                    <select value={form.region} onChange={(e) => handleChange("region", e.target.value)} style={inputStyle}>
                        <option value="">Select Region</option>
                        {regions.map((r) => (
                            <option key={r.district_id} value={String(r.district_id)}>{r.name}</option>
                        ))}
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
                        <input type="text" placeholder="Enter city name" value={form.city} onChange={(e) => handleChange("city", e.target.value)} style={inputStyle} />
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
                            {schools.map((sc) => <option key={sc.id} value={sc.school_name}>{sc.school_name}</option>)}
                        </select>
                    ) : (
                        <input type="text" placeholder="Enter school name" value={form.school} onChange={(e) => handleChange("school", e.target.value)} style={inputStyle} />
                    )}
                </Field>

                <Field label="Student's Division">
                    <select value={form.division} onChange={(e) => handleChange("division", e.target.value)} style={inputStyle}>
                        <option value="">Select Option</option>
                        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                </Field>

                <Field label="Student's Full Name" required>
                    <input
                        type="text"
                        placeholder="Student's Full Name"
                        value={form.fullName}
                        onChange={(e) => { handleChange("fullName", e.target.value); setFieldErrors((prev) => ({ ...prev, fullName: "" })); }}
                        onBlur={() => { if (form.fullName && !validateName(form.fullName)) setFieldErrors((prev) => ({ ...prev, fullName: "Only alphabetical characters are allowed" })); }}
                        style={{ ...inputStyle, borderColor: fieldErrors.fullName ? "#ef4444" : "#e5e7eb" }}
                    />
                    {fieldErrors.fullName && <span style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{fieldErrors.fullName}</span>}
                </Field>

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
                        {Object.entries(CLASS_MAP).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
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
                        <option value="Mr">Mr.</option>
                        <option value="Mrs">Mrs.</option>
                        <option value="Ms">Ms.</option>
                        <option value="Dr">Dr.</option>
                        <option value="Prof">Prof.</option>
                    </select>
                </Field>

                <Field label="Parent Full Name" required>
                    <input
                        type="text"
                        placeholder="Parent full name"
                        value={form.parentName}
                        onChange={(e) => { handleChange("parentName", e.target.value); setFieldErrors((prev) => ({ ...prev, parentName: "" })); }}
                        onBlur={() => { if (form.parentName && !validateName(form.parentName)) setFieldErrors((prev) => ({ ...prev, parentName: "Only alphabetical characters are allowed" })); }}
                        style={{ ...inputStyle, borderColor: fieldErrors.parentName ? "#ef4444" : "#e5e7eb" }}
                    />
                    {fieldErrors.parentName && <span style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{fieldErrors.parentName}</span>}
                </Field>

                <Field label="Parent Email-id" required>
                    <input
                        type="email"
                        placeholder="Parent Email-id"
                        value={form.parentEmail}
                        onChange={(e) => { handleChange("parentEmail", e.target.value); setFieldErrors((prev) => ({ ...prev, parentEmail: "" })); }}
                        onBlur={() => { if (form.parentEmail && !validateEmail(form.parentEmail).isValid) setFieldErrors((prev) => ({ ...prev, parentEmail: "Enter a valid email (e.g. name@example.com)" })); }}
                        style={{ ...inputStyle, borderColor: fieldErrors.parentEmail ? "#ef4444" : "#e5e7eb" }}
                    />
                    {fieldErrors.parentEmail && <span style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{fieldErrors.parentEmail}</span>}
                </Field>

                <Field label="Parent Mobile" required>
                    <input
                        type="text"
                        placeholder={`Parent Mobile (${COUNTRY_MOBILE_LENGTH[countryCode] || 10} digits)`}
                        value={form.parentMobile}
                        maxLength={COUNTRY_MOBILE_LENGTH[countryCode] || 10}
                        onChange={(e) => { const val = e.target.value.replace(/\D/g, ""); handleChange("parentMobile", val); setFieldErrors((prev) => ({ ...prev, parentMobile: "" })); }}
                        onBlur={() => { if (form.parentMobile && !validateMobile(form.parentMobile).isValid) setFieldErrors((prev) => ({ ...prev, parentMobile: validateMobile(form.parentMobile).message })); }}
                        style={{ ...inputStyle, borderColor: fieldErrors.parentMobile ? "#ef4444" : "#e5e7eb" }}
                    />
                    {fieldErrors.parentMobile ? (
                        <span style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{fieldErrors.parentMobile}</span>
                    ) : (
                        <span style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
                            {COUNTRY_MOBILE_LENGTH[countryCode] ? `Must be ${COUNTRY_MOBILE_LENGTH[countryCode]} digits` : ""}
                        </span>
                    )}
                </Field>
            </div>

            {successMsg && (
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "14px 18px", marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                    <p style={{ color: "#15803d", fontWeight: 700, fontSize: 14, margin: 0 }}>✅ Student added successfully!</p>
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
                <button onClick={onClose} style={{ padding: "10px 28px", border: "1px solid #d1d5db", borderRadius: 8, background: "#fff", color: "#374151", fontSize: 14, cursor: "pointer", fontWeight: 500 }}>
                    Discard
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{ padding: "10px 28px", border: "none", borderRadius: 8, background: loading ? "#93c5fd" : "#3b82f6", color: "#fff", fontSize: 14, cursor: loading ? "not-allowed" : "pointer", fontWeight: 600 }}
                >
                    {loading ? "Submitting..." : editData ? "Update" : "Submit"}
                </button>
            </div>
        </Modal>
    );
}

// ─── Drop-in button — self-contained, use anywhere ──────────────────────────
export function AddStudentButton({ onSuccess }: { onSuccess?: () => void }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                style={{
                    padding: "10px 22px",
                    borderRadius: 10,
                    border: "none",
                    background: "#3B82F6",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#2563EB")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#3B82F6")}
                onClick={() => setOpen(true)}
            >
                Add Student
            </button>

            {open && (
                <ModalWrapper>
                    <AddStudentDialog
                        onClose={() => setOpen(false)}
                        onSuccess={() => {
                            onSuccess?.();
                        }}
                    />
                </ModalWrapper>
            )}
        </>
    );
}