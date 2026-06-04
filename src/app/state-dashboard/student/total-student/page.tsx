/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "@/services/axiosInstance";
import { exportStateSummary } from "@/services/importantDatesService";
import { FaEdit, FaTrash } from "react-icons/fa";
import { createPortal } from "react-dom";
import { fetchSchoolsByRegion, fetchRegionsWithCities, exportStudents, addGccStudent } from "@/services/importantDatesService";
// ─── Types ────────────────────────────────────────────────────────────────────
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
  examLanguage?: string;
  address?: string;
  pincode?: string;
  parentName?: string;
  parentMobile?: string;
  parentEmail?: string;           // ✅ Add
  studentMobile?: string;         // ✅ Add
  studentEmail?: string;          // ✅ Add
  isPaid?: boolean;
  isMock?: boolean;               // ✅ Add
  isFinal?: boolean;              // ✅ Add
  paymentStatus?: string;         // ✅ Add
  lastLogin?: string;             // ✅ Add
  createdAt?: string;      
  region?: string;        // ✅ ADD
  city?: string;         // ✅ Add
};

type DialogState =
  | null
  | { type: "export" }
  | { type: "add" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

// ─── Class map (backend key → label) ─────────────────────────────────────────
const CLASS_MAP: Record<number, string> = {
  1: " 6",
  2: " 7",
  3: " 8",
  4: " 9",
  5: " 10",
  6: " 11",
};

// ─── Date helpers ─────────────────────────────────────────────────────────────
const TODAY = new Date().toISOString().split("T")[0];
const MIN_DATE = "2016-01-01";

// ─── Reusable Modal (always fixed-center, never scrolls page) ─────────────────
function Modal({
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
        {/* Close X */}
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

// ─── Date Range Picker (calendar style, 2016 → today) ────────────────────────
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
// ─── Get country code from localStorage ──────────────────────────────────────
// Add this OUTSIDE AddStudentDialog, above it
// ✅ No hardcoded fallback — return empty string if not found
const getCountryCode = (): string => {
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

const COUNTRY_NAME_MAP: Record<string, string> = {
  SA: "Saudi Arabia",
  AE: "UAE",
  OM: "Oman",
  KW: "Kuwait",
  BH: "Bahrain",
  QA: "Qatar",
};

const COUNTRY_NATIONAL_ID_LENGTH: Record<string, number> = {
  AE: 15,  // UAE
  SA: 10,  // Saudi Arabia
  KW: 12,  // Kuwait
  BH: 9,   // Bahrain
  QA: 11,  // Qatar
  OM: 8,   // Oman
};
const COUNTRY_MOBILE_LENGTH: Record<string, number> = {
  AE: 9,   // UAE
  SA: 9,  // Saudi Arabia
  KW: 8,   // Kuwait
  BH: 8,   // Bahrain
  QA: 8,   // Qatar
  OM: 8,   // Oman
};

// ✅ Move this ABOVE AddStudentDialog, at module level
const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label style={{
      fontSize: 12,
      fontWeight: 600,
      color: "#374151",
      marginBottom: 6,
      display: "block",
    }}>
      {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
    </label>
    {children}
  </div>
);

// ✅ Also move labelStyle and inputStyle out as constants at module level
const inputStyle: React.CSSProperties = {
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


// ─── Add Student Dialog ───────────────────────────────────────────────────────
function AddStudentDialog({ onClose, editData }: { onClose: () => void; editData?: Student | null }) {


  // const [form, setForm] = useState({
  //   country: "Saudi Arabia",
  //   nationalId: "",
  //   nationality: "Indian",
  //   region: "",
  //   city: "",
  //   school: "",
  //   division: "",
  //   fullName: "",
  //   dob: "",
  //   gender: "",
  //   classGrade: "",
  //   examLanguage: "English",
  //   parentSalutation: "",
  //   parentName: "",
  //   parentEmail: "",
  // });

 
  const [countryCode, setCountryCode] = useState(getCountryCode());

  useEffect(() => {
    const cc = getCountryCode();
    setCountryCode(cc);
  }, []);

  useEffect(() => {
    const loadRegions = async () => {
      try {
               const data = await fetchRegionsWithCities(countryCode);
console.log("COUNTRY:", countryCode);
console.log("REGIONS API:", data);
        setRegions(data?.data || []);
      } catch {
        setRegions([]);
      }
    };

    if (countryCode) loadRegions();
  }, [countryCode]); // ✅ FIX

  // ✅ Fix 5: Safe null check — editData may be null
  const [form, setForm] = useState({
    country: COUNTRY_NAME_MAP[countryCode] || " ",
    nationalId: "",
    nationality: "Indian",
    region: editData?.region || "",   // was editData.region (crash if null)
    city: editData?.city || "",       // same
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
  // ─── Get country code from localStorage ──────────────────────────────────────
  // Pre-fill form if editing
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
  }, [editData]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");        // ✅ moved inside
  const [apiErrorDetail, setApiErrorDetail] = useState<any>(null);  // ✅ moved inside
  const [schools, setSchools] = useState<{ id: number; school_name: string }[]>([]);
  const [schoolsLoading, setSchoolsLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    fullName: "",
    parentName: "",
    parentMobile: "",
    parentEmail: "",
  });
  type RegionData = {
    code: string;
    name: string;
    district_id: number;
    cities: { id: number; name: string; district_id: number }[];
  };

  const [regions, setRegions] = useState<RegionData[]>([]);
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);

  // Load regions once on mount
  // Update cities when region changes
  // ✅ Fix 4: Batch update instead of two handleChange calls
  useEffect(() => {
    if (!form.region) {
      setCities([]);
      return;
    }
    const selectedRegion = regions.find(
      (r) => String(r.district_id) === String(form.region)
    );
    setCities(selectedRegion?.cities || []);
    setForm((prev) => ({ ...prev, city: "", school: "" })); // ✅ single update
  }, [form.region, regions]);

  const raw = localStorage.getItem("user");
  const parsed = raw ? JSON.parse(raw) : null;
  const assignments = parsed?.user?.user_detail?.assignments || [];
  const stateAssignment = assignments.find((a: any) => a.coordinatable_type === "State");
  const stateId = stateAssignment?.coordinatable_id || "";
  useEffect(() => {
    const loadSchools = async () => {
      if (!form.region) { setSchools([]); return; }

      // Find the region code from already-loaded regions array
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
  }, [form.region, regions]); // ✅ add regions as dependency

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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

  const handleSubmit = async () => {

    console.log("ALL ASSIGNMENTS:", assignments);       // 👈 yahan
    console.log("STATE ASSIGNMENT:", stateAssignment);  // 👈 yahan  
    console.log("STATE ID:", stateId);  
    let finalCountryCode = countryCode;
    console.log("countryCode state:", countryCode);           // check this
    console.log("getCountryCode() fresh:", getCountryCode()); // check this
    if (!finalCountryCode) {
      finalCountryCode = getCountryCode(); // Try to get it again
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
    if (!validateName(form.parentName)) {
      setError("Parent name: letters, spaces, hyphens or dots only (2–50 chars).");
      return;
    }
    const mobileCheck = validateMobile(form.parentMobile);
    if (!mobileCheck.isValid) { setError(mobileCheck.message); return; }

    const emailCheck = validateEmail(form.parentEmail);
    if (!emailCheck.isValid) { setError(emailCheck.message); return; }

    if (!editData) {
      const idCheck = validateNationalId(form.nationalId);
      if (!idCheck.isValid) { setError(idCheck.message); return; }
    }
    setFieldErrors({ fullName: "", parentName: "", parentMobile: "", parentEmail: "" });
    setLoading(true);
    setError("");
    try {
      const payload = {
        country_code: finalCountryCode,
        national_id: form.nationalId,
        nationality: form.nationality,
        region: form.region,
        city: form.city,
        school_name: form.school,
        division: form.division,
        name: form.fullName,
        date_of_birth: form.dob,
        gender: form.gender === "Male" ? 1 : 2,
        class: form.classGrade,
        exam_language: form.examLanguage,
        parent_salutation: form.parentSalutation,
        parent_name: form.parentName,
        parent_email: form.parentEmail,
      };

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
        await addGccStudent({
          country_code: finalCountryCode,
          emirate_id: form.nationalId,       // ✅ was national_id
          nationality: form.nationality,
          dist_id: form.region ? parseInt(form.region, 10) : undefined,  
          school_name: form.school,
           division: form.division || "A",  
          fullName: form.fullName,           // ✅ was name
          dob: form.dob,                     // ✅ was date_of_birth
          gender: form.gender === "Male" ? 1 : 2,
          grade: parseInt(CLASS_MAP[parseInt(form.classGrade, 10)]?.trim() || "0", 10),
          class_id: parseInt(form.classGrade, 10),
          exam_language: form.examLanguage,
          state_id: String(stateId),   // ✅ from localStorage
          hear: "1",                         // ✅ required by backend, hardcode for now
          parent_full_name: form.parentName, // ✅ was parent_name
          parent_mobile: form.parentMobile || "", // ✅ required by backend
          parent_salutation: form.parentSalutation,
          parent_email: form.parentEmail,
          password: "vvm2026",
          password_confirmation: "vvm2026",
          city_id: form.city ? parseInt(form.city, 10) : undefined,      
        });
        console.log("FINAL PAYLOAD:", payload);  
      }
      
      setSuccessMsg("Student added successfully!");
    } catch (err: any) {
      const msg = err?.message || err?.response?.data?.message || "Failed to save student.";
      setError(msg);
      setApiErrorDetail(err?.response?.data || null);
    } finally {
      setLoading(false);
    }
  };


  const inputStyle: React.CSSProperties = {
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

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 6,
    display: "block",
  };

  // const Field = ({
  //   label,
  //   required,
  //   children,
  // }: {
  //   label: string;
  //   required?: boolean;
  //   children: React.ReactNode;
  // }) => (
  //   <div style={{ display: "flex", flexDirection: "column" }}>
  //     <label style={labelStyle}>
  //       {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
  //     </label>
  //     {children}
  //   </div>
  // );

  return (
    <Modal onClose={onClose} width={860}>
      <h2
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "#111827",
          marginBottom: 28,
        }}
      >
        {editData ? "Edit Student" : "Add Student"}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px 24px",
        }}
      >
        {/* Row 1 */}
      {/*  Country field — read-only, driven purely by localStorage */}
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

        {/* Row 2 */}
        <Field label="Student Region" required>
          <select
            value={form.region}
            onChange={(e) => handleChange("region", e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Region</option>
            {regions.map((r) => (
              <option key={r.district_id} value={String(r.district_id)}>
                {r.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Student City" required>
          {!form.region ? (
            // No region selected — show disabled input
            <input
              type="text"
              placeholder="Select Region first"
              disabled
              style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }}
            />
          ) : cities.length > 0 ? (
            // Cities available — show dropdown
            <select
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              style={inputStyle}
            >
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {c.name}
                </option>
              ))}
            </select>
          ) : (
            // No cities from API — show free text input
            <input
              type="text"
              placeholder="Enter city name"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              style={inputStyle}
            />
          )}
        </Field>

        <Field label="School Name" required>
          {!form.region ? (
            // No region selected — show disabled input
            <input
              type="text"
              placeholder="Select Region first"
              disabled
              style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }}
            />
          ) : schoolsLoading ? (
            // Loading — show disabled input
            <input
              type="text"
              placeholder="Loading schools..."
              disabled
              style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }}
            />
          ) : schools.length > 0 ? (
            // Schools available — show dropdown
            <select
              value={form.school}
              onChange={(e) => handleChange("school", e.target.value)}
              style={inputStyle}
            >
              <option value="">Select School</option>
              {schools.map((s) => (
                <option key={s.id} value={s.school_name}>
                  {s.school_name}
                </option>
              ))}
            </select>
          ) : (
            // No schools from API — show free text input
            <input
              type="text"
              placeholder="Enter school name"
              value={form.school}
              onChange={(e) => handleChange("school", e.target.value)}
              style={inputStyle}
            />
          )}
        </Field>

        {/* Row 3 */}
        <Field label="Student's Division">
          <select
            value={form.division}
            onChange={(e) => handleChange("division", e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Option</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
            <option value="H">H</option>
            <option value="I">I</option>
            <option value="J">J</option>
            <option value="K">K</option>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="N">N</option>
            <option value="O">O</option>
            <option value="P">P</option>
            <option value="Q">Q</option>
            <option value="R">R</option>
            <option value="S">S</option>
            <option value="T">T</option>
            <option value="U">U</option>
            <option value="V">V</option>
            <option value="W">W</option>
            <option value="X">X</option>
            <option value="Y">Y</option>
            <option value="Z">Z</option>
          
          </select>
        </Field>

        <Field label="Student's Full Name" required>
          <input
            type="text"
            placeholder="Student's Full Name"
            value={form.fullName}
            onChange={(e) => {
              handleChange("fullName", e.target.value);
              setFieldErrors((prev) => ({ ...prev, fullName: "" }));
            }}
            onBlur={() => {
              if (form.fullName && !validateName(form.fullName))
                setFieldErrors((prev) => ({ ...prev, fullName: "Only alphabetical characters are allowed" }));
            }}
            style={{ ...inputStyle, borderColor: fieldErrors.fullName ? "#ef4444" : "#e5e7eb" }}
          />
          {fieldErrors.fullName && (
            <span style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{fieldErrors.fullName}</span>
          )}
        </Field>

        <Field label="DOB" required>
          <input
            type="date"
            value={form.dob}
            min="2008-01-01"
            max="2016-12-31"
            onChange={(e) => handleChange("dob", e.target.value)}
            style={inputStyle}
          />
        </Field>

        {/* Row 4 */}
        <Field label="Student's Gender" required>
          <select
            value={form.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Option</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
             <option value="Other">Other</option>
          </select>
        </Field>

        <Field label="Class/Grade" required>
          <select
            value={form.classGrade}
            onChange={(e) => handleChange("classGrade", e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Option</option>
            {Object.entries(CLASS_MAP).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Language of Exam" required>
          <select
            value={form.examLanguage}
            onChange={(e) => handleChange("examLanguage", e.target.value)}
            style={inputStyle}
          >
            <option value="English">English</option>
                      </select>
        </Field>

        {/* Row 5 */}
        <Field label="Parent Salutation" required>
          <select
            value={form.parentSalutation}
            onChange={(e) => handleChange("parentSalutation", e.target.value)}
            style={inputStyle}
          >
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
              onChange={(e) => {
                handleChange("parentName", e.target.value);
                setFieldErrors((prev) => ({ ...prev, parentName: "" }));
              }}
              onBlur={() => {
                if (form.parentName && !validateName(form.parentName))
                  setFieldErrors((prev) => ({ ...prev, parentName: "Only alphabetical characters are allowed" }));
              }}
              style={{ ...inputStyle, borderColor: fieldErrors.parentName ? "#ef4444" : "#e5e7eb" }}
            />
            {fieldErrors.parentName && (
              <span style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{fieldErrors.parentName}</span>
            )}
        </Field>

        <Field label="Parent Email-id" required>
          <input
            type="email"
            placeholder="Parent Email-id"
            value={form.parentEmail}
            onChange={(e) => {
              handleChange("parentEmail", e.target.value);
              setFieldErrors((prev) => ({ ...prev, parentEmail: "" }));
            }}
            onBlur={() => {
              if (form.parentEmail && !validateEmail(form.parentEmail).isValid)
                setFieldErrors((prev) => ({ ...prev, parentEmail: "Enter a valid email (e.g. name@example.com)" }));
            }}
            style={{ ...inputStyle, borderColor: fieldErrors.parentEmail ? "#ef4444" : "#e5e7eb" }}
          />
          {fieldErrors.parentEmail && (
            <span style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>{fieldErrors.parentEmail}</span>
          )}
        </Field>

        <Field label="Parent Mobile" required>
        <input
    type="text"
    placeholder={`Parent Mobile (${COUNTRY_MOBILE_LENGTH[countryCode] || 10} digits)`}
    value={form.parentMobile}
    maxLength={COUNTRY_MOBILE_LENGTH[countryCode] || 10}
    onChange={(e) => {
      const val = e.target.value.replace(/\D/g, "");
      handleChange("parentMobile", val);
      setFieldErrors((prev) => ({ ...prev, parentMobile: "" }));
    }}
    onBlur={() => {
      if (form.parentMobile && !validateMobile(form.parentMobile).isValid)
        setFieldErrors((prev) => ({ ...prev, parentMobile: validateMobile(form.parentMobile).message }));
    }}
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

      {/* {error && (
        <p
          style={{
            color: "#ef4444",
            fontSize: 13,
            marginTop: 16,
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )} */}

      {/* ── Success banner — OUTSIDE flex ── */}
      {successMsg && (
        <div style={{
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: 10,
          padding: "14px 18px",
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}>
          <p style={{ color: "#15803d", fontWeight: 700, fontSize: 14, margin: 0 }}>
            ✅ Student added successfully!
          </p>
          <button
            onClick={onClose}
            style={{
              alignSelf: "flex-end",
              padding: "6px 20px",
              borderRadius: 8,
              border: "none",
              background: "#15803d",
              color: "#fff",
              fontSize: 13,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            OK
          </button>
        </div>
      )}

      {/* ── Error banner — OUTSIDE flex ── */}
      {error && (
        <div style={{
          background: "#fff1f2",
          border: "1px solid #fecaca",
          borderRadius: 10,
          padding: "12px 16px",
          marginTop: 16,
        }}>
          <p style={{ color: "#dc2626", fontWeight: 600, fontSize: 13, margin: "0 0 4px 0" }}>
            ❌ {error}
          </p>
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

      {/* ── Buttons only in flex ── */}
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 20 }}>
        <button
          onClick={onClose}
          style={{
            padding: "10px 28px",
            border: "1px solid #d1d5db",
            borderRadius: 8,
            background: "#fff",
            color: "#374151",
            fontSize: 14,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Discard
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: "10px 28px",
            border: "none",
            borderRadius: 8,
            background: loading ? "#93c5fd" : "#3b82f6",
            color: "#fff",
            fontSize: 14,
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 600,
          }}
        >
          {loading ? "Submitting..." : editData ? "Update" : "Submit"}
        </button>
      </div>
    </Modal>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TotalStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
 
  // Filters
  const [region, setRegion] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");


  const [nameSearch, setNameSearch] = useState("");           // ✅ ADD
  const [debouncedNameSearch, setDebouncedNameSearch] = useState("");  // ✅ ADD

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(t);
  }, [search]);

  // ✅ ADD — Debounce name search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedNameSearch(nameSearch), 500);
    return () => clearTimeout(t);
  }, [nameSearch]);  

  // Date range (for filter bar)
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  // Export date range (inside dialog)
  const [exportStartDate, setExportStartDate] = useState("");
  const [exportEndDate, setExportEndDate] = useState("");
  const [exportLoading, setExportLoading] = useState(false);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  // Dialogs
  const [dialog, setDialog] = useState<DialogState>(null);
  const [filterRegions, setFilterRegions] = useState<{ district_id: number; name: string }[]>([]);

  // Load regions for filter bar
  useEffect(() => {
    const cc = getCountryCode();
    fetchRegionsWithCities(cc)
      .then((data) => setFilterRegions(data?.data || []))
      .catch(() => setFilterRegions([]));
  }, []);
  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(t);
  }, [search]);

  const formatDate = (dateStr: string) => {
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

  // Fetch students
  const fetchStudents = async () => {
    setLoading(true);
    setStudents([]);        // ← ADD THIS
    setTotalRecords(0); 
    try {
      const res = await axiosInstance.post("/admin/students", {
        page: currentPage,
        per_page: perPage,
        status: 1,
        district_id: region ? Number(region) : undefined,
        class: classFilter || undefined,
        search: debouncedSearch,
        name: debouncedNameSearch || undefined,   // 
        created_at_from: filterStartDate || undefined,
        created_at_to: filterEndDate || undefined,
      });

      const raw = res.data?.data?.data || [];

      const formatted: Student[] = raw.map((s: any) => ({
        id: s.id,
        name: s.name,
        username: s.user?.username,
        password: s.user?.temp_password,
        nationalId: s.national_id,
        school: s.school_name,
        classId: s.class_id,
        dob: s.date_of_birth,
        gender: s.gender === 1 ? "Male" : s.gender === 2 ? "Female" : "-",
        examLanguage: s.exam_language || "English",
        address: s.address || "-",
        pincode: s.pincode || "-",
        parentName: s.parent_name,
        parentMobile: s.parent_phone_number,
        parentEmail: s.parent_email,
        studentMobile: s.student_mobile_number,
        studentEmail: s.student_email,
        isPaid: s.payment_status === 1,
        isMock: !!s.is_mock,
        isFinal: !!s.is_final,
        paymentStatus: s.payment_status === 1 ? "Paid" : "Pending",
        lastLogin: s.last_login_at ? formatDate(s.last_login_at) : "-",
        createdAt: s.created_at ? formatDate(s.created_at) : "-",
      }));

            // ... (formatted mapping same as before)

      setStudents(formatted);
      setTotal(res?.data?.data?.total || 0);
      setTotalRecords(res?.data?.data?.total || 0);  // ✅ Add
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [region, classFilter, debouncedSearch, debouncedNameSearch, filterStartDate, filterEndDate, currentPage, perPage]); // ✅ Add currentPage, perPage

  // Export submit
  // const handleExportSubmit = async () => {
  //   if (!exportStartDate || !exportEndDate) return;
  //   setExportLoading(true);
  //   try {
  //     await exportStateSummary({
  //       search: "",
  //       filters: { start_date: exportStartDate, end_date: exportEndDate },
  //     });
  //     setDialog({ type: "success", message: "Export successful! File will be sent to your email." });
  //   } catch (err: any) {
  //     setDialog({ type: "error", message: err?.message || "Export failed. Please try again." });
  //   } finally {
  //     setExportLoading(false);
  //   }
  // };

  // ── Delete handler ───────────────────────────────────────────────────────
  
  
  const handleExportSubmit = async () => {
    if (!exportStartDate || !exportEndDate) return;
    setExportLoading(true);
    try {
      const raw = localStorage.getItem("user");
      const parsed = raw ? JSON.parse(raw) : null;
      const assignments = parsed?.user?.user_detail?.assignments || [];
      console.log("ALL ASSIGNMENTS:", assignments);  // 👈 see what's actually there
      const stateAssignment = assignments.find((a: any) => a.coordinatable_type === "State");
      const stateId = stateAssignment?.coordinatable_id;
      console.log("STATE ID:", stateId);  // 👈 if this is "" that's the problem
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
        email: userEmail, // 🔴 HARDCODED — change later
        created_at_from: exportStartDate,
        created_at_to: exportEndDate,
      });

      setDialog({ type: "success", message: "Export started! You will receive an email once completed." });
    } catch (err: any) {
      setDialog({ type: "error", message: err?.message || "Export failed. Please try again." });
    } finally {
      setExportLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      await axiosInstance.delete(`/admin/student/${id}`);
      fetchStudents(); // Refresh list
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to delete student.");
    }
  };

  // ── Edit state ──────────────────────────────────────────────────────────
  const [editStudent, setEditStudent] = useState<Student | null>(null);

  const handleEdit = (student: Student) => {
    setEditStudent(student);
    setDialog({ type: "add" }); // Reuse add dialog
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
          background: "rgba(0, 0, 0, 0.15)",  // ✅ Lighter - was 0.5
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999999,
          backdropFilter: "blur(2px)",         // ✅ Optional: slight blur
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
          {/* Close button */}
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

  // ── Styles ──────────────────────────────────────────────────────────────────
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

    filterCard: {
      padding: "20px 24px",
    } as React.CSSProperties,

    filterGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: 12,
      marginBottom: 16,
    } as React.CSSProperties,

    select: {
      width: "100%",
      border: "1px solid #e5e7eb",
      borderRadius: 10,
      padding: "10px 14px",
      fontSize: 13,
      color: "#374151",
      background: "#f9fafb",
      outline: "none",
      cursor: "pointer",
    } as React.CSSProperties,

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

    btnPrimary: {
      padding: "10px 22px",
      borderRadius: 10,
      border: "none",
      background: "#1e40af",
      color: "#fff",
      fontWeight: 600,
      fontSize: 13,
      cursor: "pointer",
    } as React.CSSProperties,

    btnYellow: {
      padding: "10px 22px",
      borderRadius: 10,
      border: "none",
      background: "#f59e0b",
      color: "#fff",
      fontWeight: 600,
      fontSize: 13,
      cursor: "pointer",
    } as React.CSSProperties,

    tableHeader: {
      padding: "14px 24px",
      borderBottom: "1px solid #f3f4f6",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    } as React.CSSProperties,

    th: {
      padding: "10px 12px",
      textAlign: "left" as const,
      fontSize: 11,
      fontWeight: 700,
      color: "#6b7280",
      textTransform: "uppercase" as const,
      whiteSpace: "nowrap" as const,
      background: "#f9fafb",
    },

    td: {
      padding: "10px 12px",
      fontSize: 13,
      color: "#374151",
      whiteSpace: "nowrap" as const,
      borderBottom: "1px dashed #f3f4f6",
    },
  };

  return (
    <div style={s.page}>

      {/* ── Filter Card ──────────────────────────────────────────────────────── */}
      <div style={{ ...s.card, ...s.filterCard }}>

        {/* Row 1: Region + Class */}
        <div style={s.filterGrid}>
          {/* <select
            value={region}
            onChange={(e) => { setRegion(e.target.value); setCurrentPage(1); }}
            style={s.select}
          >
            <option value="">Select Region</option>
            {filterRegions.map((r) => (
              <option key={r.district_id} value={String(r.district_id)}>
                {r.name}
              </option>
            ))}
          </select> */}

          {/* <select
            value={classFilter}
            onChange={(e) => { setClassFilter(e.target.value); setCurrentPage(1); }}
            style={s.select}
          >
            <option value="">Select Class</option>
            {Object.entries(CLASS_MAP).map(([key, label]) => (
              <option key={key} value={label.trim()}>{label.trim()}</option>
            ))}
          </select> */}

          {/* Date Range Picker */}
          {/* <div style={{ gridColumn: "span 2" }}>
            <DateRangePicker
              startDate={filterStartDate}
              endDate={filterEndDate}
              onStartChange={(v) => { setFilterStartDate(v); setCurrentPage(1); }}
              onEndChange={(v) => { setFilterEndDate(v); setCurrentPage(1); }}
            />
          </div> */}
        </div>

        {/* Row 2: Search + Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {/* Search */}
            <div style={{ position: "relative", display: "inline-block", width: "50%" }}>
              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#999",
                  pointerEvents: "none"
                }}
              />
            <input
              type="text"
              placeholder="Search Records"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={s.searchInput}
            />
          </div>
{/* // 5. Add input in the filter card, next to your existing search */}
          {/* <div style={{ position: "relative", flex: "1 1 240px", maxWidth: 320 }}>
            <input
              type="text"
              placeholder="Search by Name"
              value={nameSearch}
              onChange={(e) => {
                setNameSearch(e.target.value);
                setCurrentPage(1);
              }}
              style={s.searchInput}
            />
          </div> */}
          {/* Legend + Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 14, height: 14, background: "#bbf7d0", borderRadius: 3 }} />
              <span style={{ fontSize: 12, color: "#374151" }}>Paid Students</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 14, height: 14, background: "#fecaca", borderRadius: 3 }} />
              <span style={{ fontSize: 12, color: "#374151" }}>Unpaid Students</span>
            </div>

            <button
              style={{
                ...s.btnPrimary,
                background: "#3B82F6",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#2563EB")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#3B82F6")}
              onClick={() => setDialog({ type: "add" })} >
              Add Student
            </button>

            <button
              style={{
                ...s.btnPrimary,
                background: "#3B82F6",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#2563EB")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#3B82F6")}
              onClick={() => setDialog({ type: "export" })}
            >
              Export
            </button>
          </div>
        </div>
      </div>

      {/* ── Table Card ───────────────────────────────────────────────────────── */}
      <div style={s.card}>
        <div style={s.tableHeader}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: 0 }}>
            Students
          </h2>
          <span style={{ fontSize: 12, color: "#6b7280" }}>
            Total: {totalRecords}
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1100 }}>
            <thead>
              <tr>
                {[
                  "SR. NO.", "NAME", "USERNAME", "PASSWORD",
                  "NATIONAL ID", "SCHOOL NAME", "CLASS", "DOB",
                  "GENDER", "EXAM LANGUAGE", "ADDRESS", "PINCODE",
                  "PARENT NAME", "PARENT MOBILE NO.", "PARENT EMAIL",
                  "STUDENT MOBILE NO.", "STUDENT EMAIL", "LAST LOGIN AT",
                  // "MOCK EXAM", "FINAL EXAM", 
                  "CREATED AT",
                  // "PAYMENT STATUS",
                  "ACTION",
                ].map((h) => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={21} style={{ ...s.td, textAlign: "center", padding: 32 }}>
                    Loading...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={21} style={{ ...s.td, textAlign: "center", padding: 32 }}>
                    No data found
                  </td>
                </tr>
              ) : (
                students.map((s_row, i) => (
                  <tr
                    key={s_row.id}
                    style={{
                      background: s_row.isPaid ? "#f0fdf4" : "#fff1f2",
                    }}
                  >
                    <td style={{ ...s.td, color: "#94a3b8", fontSize: 12 }}>
                      {(currentPage - 1) * perPage + i + 1}
                    </td>
                    <td style={{ ...s.td, color: "#2563eb", fontWeight: 600, cursor: "pointer" }}>
                      {s_row.name}
                    </td>
                    <td style={s.td}>{s_row.username || "-"}</td>
                    <td style={s.td}>{s_row.password || "-"}</td>
                    <td style={s.td}>{s_row.nationalId || "-"}</td>
                    <td style={{ ...s.td, maxWidth: 180, whiteSpace: "normal" }}>
                      {s_row.school || "-"}
                    </td>
                    <td style={s.td}>{CLASS_MAP[s_row.classId!] || "-"}</td>
                    <td style={s.td}>{s_row.dob || "-"}</td>
                    <td style={s.td}>{s_row.gender || "-"}</td>
                    <td style={s.td}>{s_row.examLanguage || "-"}</td>
                    <td style={{ ...s.td, maxWidth: 200, whiteSpace: "normal" }}>
                      {s_row.address || "-"}
                    </td>
                    <td style={s.td}>{s_row.pincode || "-"}</td>
                    <td style={s.td}>{s_row.parentName || "-"}</td>
                    <td style={s.td}>{s_row.parentMobile || "-"}</td>
                    <td style={s.td}>{s_row.parentEmail || "-"}</td>                    {/* ✅ Add */}
                    <td style={s.td}>{s_row.studentMobile || "-"}</td>                  {/* ✅ Add */}
                    <td style={s.td}>{s_row.studentEmail || "-"}</td>                   {/* ✅ Add */}
                    <td style={s.td}>{s_row.lastLogin || "-"}</td>                      {/* ✅ Add */}
                    {/* Mock Exam */}
                    {/* <td style={s.td}>
                      <span style={{
                        padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600,
                        background: s_row.isMock ? "#bbf7d0" : "#fecaca",
                        color: s_row.isMock ? "#15803d" : "#dc2626",
                      }}>
                        {s_row.isMock ? "Yes" : "No"}
                      </span>
                    </td> */}

                    {/* Final Exam */}
                    {/* <td style={s.td}>
                      <span style={{
                        padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600,
                        background: s_row.isFinal ? "#bbf7d0" : "#fecaca",
                        color: s_row.isFinal ? "#15803d" : "#dc2626",
                      }}>
                        {s_row.isFinal ? "Yes" : "No"}
                      </span>
                    </td> */}

                    <td style={s.td}>{formatDate(s_row.createdAt || "")}</td>
                    {/* Payment Status */}
                    {/* <td style={s.td}>
                      <span style={{
                        padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600,
                        background: s_row.isPaid ? "#bbf7d0" : "#fecaca",
                        color: s_row.isPaid ? "#15803d" : "#dc2626",
                      }}>
                        {s_row.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td> */}

                    {/* Action Buttons */}
                    <td style={s.td}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <FaEdit
                          style={{ cursor: "pointer", color: "#2563eb", fontSize: 14 }}
                          onClick={() => handleEdit(s_row)}
                          title="Edit"
                        />
                        {/* <FaTrash
                          style={{ cursor: "pointer", color: "#ef4444", fontSize: 13 }}
                          onClick={() => handleDelete(s_row.id)}
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
      </div>
      {/* ── Pagination ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 20px",
        borderTop: "1px solid #f3f4f6",
        fontSize: 13,
        color: "#6b7280",
      }}>
        {/* Items per page */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>Items per page:</span>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 6,
              padding: "4px 8px",
              fontSize: 13,
              color: "#374151",
              background: "#fff",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {[10,50,100,250].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* Page info + navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span>
            {students.length === 0
              ? "0 – 0 of 0"
              : `${(currentPage - 1) * perPage + 1} – ${Math.min(currentPage * perPage, totalRecords)} of ${totalRecords}`
            }
          </span>

          {/* Previous button */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{
              padding: "4px 8px",
              borderRadius: 6,
              border: "1px solid #e5e7eb",
              background: currentPage === 1 ? "#f9fafb" : "#fff",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              color: currentPage === 1 ? "#d1d5db" : "#374151",
              lineHeight: 1,
            }}
          >
            ‹
          </button>

          {/* Next button */}
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage * perPage >= totalRecords}
            style={{
              padding: "4px 8px",
              borderRadius: 6,
              border: "1px solid #e5e7eb",
              background: currentPage * perPage >= totalRecords ? "#f9fafb" : "#fff",
              cursor: currentPage * perPage >= totalRecords ? "not-allowed" : "pointer",
              color: currentPage * perPage >= totalRecords ? "#d1d5db" : "#374151",
              lineHeight: 1,
            }}
          >
            ›
          </button>
        </div>
      </div>
      {/* ── Add Student Dialog ───────────────────────────────────────────────── */}
      {dialog?.type === "add" && (
        <ModalWrapper>
        <AddStudentDialog
          onClose={() => {
            setDialog(null);
            setEditStudent(null);  // Clear edit data
            fetchStudents();
          }}
          editData={editStudent}
        />
        </ModalWrapper>
      )}
      {/* ── Export Dialog ────────────────────────────────────────────────────── */}
      {dialog?.type === "export" && (
        <ModalWrapper>
          <Modal onClose={() => setDialog(null)} width={500}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 8 }}>
              Export Student
            </h2>
            <p style={{ fontSize: 13, color: "#6b7280", textAlign: "center", marginBottom: 20 }}>
              Please select start date and end date for export
            </p>

            <DateRangePicker
              startDate={exportStartDate}
              endDate={exportEndDate}
              onStartChange={setExportStartDate}
              onEndChange={setExportEndDate}
            />

            {/* In the export dialog, replace the static text */}
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
              <button
                onClick={() => setDialog(null)}
                style={{
                  padding: "10px 28px",
                  border: "1px solid #d1d5db",
                  borderRadius: 8,
                  background: "#fff",
                  color: "#374151",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Discard
              </button>
              <button
                onClick={handleExportSubmit}
                disabled={exportLoading || !exportStartDate || !exportEndDate}
                style={{
                  padding: "10px 28px",
                  border: "none",
                  borderRadius: 8,
                  background:
                    exportLoading || !exportStartDate || !exportEndDate
                      ? "#93c5fd"
                      : "#3b82f6",
                  color: "#fff",
                  fontSize: 14,
                  cursor:
                    exportLoading || !exportStartDate || !exportEndDate
                      ? "not-allowed"
                      : "pointer",
                  fontWeight: 600,
                }}
              >
                {exportLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Modal>
        </ModalWrapper>
      )}

      {/* ── Success Dialog ───────────────────────────────────────────────────── */}
      {dialog?.type === "success" && (
        <ModalWrapper>
          <Modal onClose={() => setDialog(null)} width={380}>
            <div style={{ textAlign: "center", padding: "12px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#15803d", marginBottom: 8 }}>
                Export Successful
              </h3>
              <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 24 }}>
                {(dialog as any).message}
              </p>
              <button
                onClick={() => setDialog(null)}
                style={{
                  padding: "10px 32px",
                  border: "none",
                  borderRadius: 8,
                  background: "#15803d",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                OK
              </button>
            </div>
          </Modal>
        </ModalWrapper>
      )}

      {/* ── Error Dialog ─────────────────────────────────────────────────────── */}
      {dialog?.type === "error" && (
        <ModalWrapper>
          <Modal onClose={() => setDialog(null)} width={380}>
            <div style={{ textAlign: "center", padding: "12px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>❌</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#dc2626", marginBottom: 8 }}>
                Export Failed
              </h3>
              <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 24 }}>
                {(dialog as any).message}
              </p>
              <button
                onClick={() => setDialog(null)}
                style={{
                  padding: "10px 32px",
                  border: "none",
                  borderRadius: 8,
                  background: "#dc2626",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </Modal>
        </ModalWrapper>
      )}
    </div>
  );
}