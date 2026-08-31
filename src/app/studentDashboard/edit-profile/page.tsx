/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect, useCallback, useMemo } from "react";
import axiosInstance from "@/services/axiosInstance";
import { fetchStates, sendEmailOtpDashboard, verifyEmailOtp, completeStudentProfile } from "@/services/authService";
import { fetchRegionsWithCities } from "@/services/importantDatesService";

interface FormData {
  name: string;
  schoolName: string;
  schoolBoard: string;
  studentMobile: string;
  studentEmail: string;
  dob: string;
  parentName: string;
  parentMobile: string;
  parentEmail: string;
  address: string;
  grade: string;
  gender: string;
  howDidYouGetToKnowAboutVVM: string;
  state: string;
  region: string;
  city: string;
  pinCode: string;
  aadharNumber: string;
  examLanguage: string;
  parentSalutation: string;
}
type OtpTarget = "parentEmail";

interface DialogState {
  open: boolean;
  type: "success" | "error";
  message: string;
}
/* ───────FIX 1: DialogBox now receives dialog + setDialog as props(previously tried to close over state from EditProfile scope)───── */
const DialogBox = ({
  dialog,
  setDialog,
}: {
  dialog: DialogState;
  setDialog: React.Dispatch<React.SetStateAction<DialogState>>;
}) => {
  if (!dialog.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl p-7 w-full max-w-lg min-h-[220px] text-center shadow-xl flex flex-col items-center justify-center">

        <h3
          className={`text-xl font-bold mb-4 ${dialog.type === "success"
              ? "text-green-600"
              : "text-red-600"
            }`}
        >
          {dialog.type === "success" ? "✓ Success" : "✗ Error"}
        </h3>

        <p className="text-md text-gray-600 mb-6 leading-7 wrap-break-word whitespace-normal max-w-md">
          {dialog.message}
        </p>

        <button
          onClick={() =>
            setDialog((prev) => ({ ...prev, open: false }))
          }
          className="px-6 py-3 rounded-lg bg-[#17395c] text-white font-semibold hover:bg-[#0f2742] transition-colors"
        >
          OK
        </button>

      </div>
    </div>
  );
};

/* ─── reusable sub-components ─── */

function VvmInput({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="vvm-field">
      <label className="vvm-label">
        {label}
        {required && <span className="vvm-required"> *</span>}
      </label>
      {children}
      {error && <p className="vvm-field-error">{error}</p>}
    </div>
  );
}

function VvmTextInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }
) {
  const { hasError, className, ...rest } = props;
  return (
    <input
      {...rest}
      className={[
        "vvm-input",
        hasError ? "vvm-input--error" : "",
        props.disabled ? "vvm-input--disabled" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

function VvmSelect({
  value,
  onChange,
  options,
  placeholder = "— Select —",
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
}) {
  return (
    <select className="vvm-select" value={value} onChange={onChange}>
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

/* ─── styles ─── */
const CSS = `
  .vvm-edit-card {
    position: relative;
    max-width: 1100px;
    margin: 0 auto 40px;
    border-radius: 28px;
    overflow: hidden;
    background: rgba(255,255,255,.82);
    border: 1px solid rgba(255,255,255,.62);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 22px 50px rgba(23,57,92,.11), inset 0 1px 0 rgba(255,255,255,.72);
  }
  .vvm-edit-card::before {
    content: "";
    position: absolute;
    top: 0; left: 0;
    height: 5px; width: 100%;
    background: linear-gradient(90deg, #17395c 0%, #f4df17 50%, #17395c 100%);
  }
  .vvm-edit-inner { padding: 36px 40px 44px; }

  .vvm-edit-title {
    font-size: 21px;
    font-weight: 900;
    color: #17395c;
    letter-spacing: 0.04em;
    padding-bottom: 18px;
    margin-bottom: 30px;
    border-bottom: 1px solid rgba(23,57,92,.13);
    text-align: center;
  }

  .vvm-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px 28px;
  }
  @media (max-width: 700px) {
    .vvm-grid { grid-template-columns: 1fr; }
    .vvm-edit-inner { padding: 28px 20px 32px; }
  }

  .vvm-section-label {
    grid-column: 1 / -1;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #9fb0c2;
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(23,57,92,.10);
    margin-top: 10px;
  }

  .vvm-field { display: flex; flex-direction: column; gap: 6px; }
  .vvm-label { font-size: 13px; font-weight: 700; color: #17395c; letter-spacing: 0.01em; }
  .vvm-required { color: #d13b2f; }
  .vvm-field-error { font-size: 12px; color: #d13b2f; font-weight: 600; }

  .vvm-input {
    width: 100%;
    padding: 10px 14px;
    font-size: 14px;
    color: #17395c;
    border: 1.5px solid rgba(23,57,92,.20);
    border-radius: 12px;
    background: rgba(255,255,255,.80);
    transition: border-color .2s, box-shadow .2s;
    outline: none;
    font-family: inherit;
  }
  .vvm-input::placeholder { color: #9fb0c2; }
  .vvm-input:focus {
    border-color: #17395c;
    box-shadow: 0 0 0 3px rgba(23,57,92,.10);
  }
  .vvm-input--error { border-color: #d13b2f; }
  .vvm-input--disabled { background: rgba(23,57,92,.05); color: #9fb0c2; cursor: not-allowed; }

  .vvm-select {
    width: 100%;
    padding: 10px 36px 10px 14px;
    font-size: 14px;
    color: #17395c;
    border: 1.5px solid rgba(23,57,92,.20);
    border-radius: 12px;
    background: rgba(255,255,255,.80)
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2317395c' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")
      no-repeat right 12px center;
    appearance: none;
    cursor: pointer;
    transition: border-color .2s, box-shadow .2s;
    outline: none;
    font-family: inherit;
  }
  .vvm-select:focus {
    border-color: #17395c;
    box-shadow: 0 0 0 3px rgba(23,57,92,.10);
  }

  .vvm-otp-row { display: flex; gap: 8px; align-items: stretch; }
  .vvm-otp-row .vvm-input { flex: 1; }

  .vvm-status { font-size: 12px; font-weight: 600; margin-top: 2px; }
  .vvm-status--ok   { color: #1a6b4a; }
  .vvm-status--warn { color: #c27b00; }
  .vvm-status--err  { color: #d13b2f; }

  .vvm-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 18px;
    font-size: 13px;
    font-weight: 800;
    line-height: 1.4;
    border-radius: 12px;
    border: 1.5px solid transparent;
    cursor: pointer;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    transition: all .22s ease;
    font-family: inherit;
    letter-spacing: .02em;
  }
  .vvm-btn::after {
    content: '';
    position: absolute;
    top: 0; left: -75%;
    width: 50%; height: 100%;
    background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.30) 50%, transparent 100%);
    transform: skewX(-20deg);
    transition: left .42s ease;
    pointer-events: none;
  }
  .vvm-btn:hover::after { left: 130%; }

  .vvm-btn--success {
    background: linear-gradient(135deg, #1a6b4a 0%, #145c3d 100%);
    border-color: rgba(255,255,255,.15);
    color: #fff;
    box-shadow: 0 6px 20px rgba(26,107,74,.28), inset 0 1px 0 rgba(255,255,255,.18);
  }
  .vvm-btn--success:hover {
    background: linear-gradient(135deg, #1e7d56 0%, #1a6b4a 100%);
    box-shadow: 0 10px 28px rgba(26,107,74,.38);
    transform: translateY(-2px);
    color: #f4df17;
  }
  .vvm-btn--success:active { transform: translateY(0) scale(.97); }

  .vvm-btn:disabled {
    background: rgba(23,57,92,.08) !important;
    border-color: rgba(23,57,92,.14) !important;
    color: #9fb0c2 !important;
    cursor: not-allowed;
    box-shadow: none !important;
    transform: none !important;
  }
  .vvm-btn:disabled::after { display: none; }

  .vvm-submit-row { margin-top: 36px; display: flex; justify-content: flex-start; }
  .vvm-btn--submit {
    padding: 13px 40px;
    font-size: 15px;
    border-radius: 14px;
    background: linear-gradient(135deg, #17395c 0%, #1f4e7a 100%);
    border-color: rgba(255,255,255,.15);
    color: #fff;
    box-shadow: 0 8px 24px rgba(23,57,92,.30), inset 0 1px 0 rgba(255,255,255,.18);
  }
  .vvm-btn--submit:hover {
    background: linear-gradient(135deg, #f4df17 0%, #e8cc00 100%);
    color: #17395c;
    box-shadow: 0 12px 32px rgba(244,223,23,.40);
    transform: translateY(-2px);
  }
  .vvm-btn--submit:active { transform: translateY(0) scale(.98); }
`;
// ── Outside component — never recreated on re-render ──
const COUNTRY_PHONE_RULES: Record<string, { digits: number; label: string }> = {
  "2": { digits: 9, label: "UAE" },
  "3": { digits: 8, label: "Oman" },
  "4": { digits: 8, label: "Qatar" },
  "5": { digits: 9, label: "Saudi Arabia" },
  "6": { digits: 8, label: "Bahrain" },
  "7": { digits: 8, label: "Kuwait" },
};

const COUNTRY_MAP: Record<string, string> = {
  "2": "UAE", "3": "Oman", "4": "Qatar",
  "5": "Saudi Arabia", "6": "Bahrain", "7": "Kuwait",
};

const COUNTRY_ID_TO_ALPHA3: Record<string, string> = {
  "2": "ARE",
  "3": "OMN",
  "4": "QAT",
  "5": "SAU",
  "6": "BHR",
  "7": "KWT",
};

const GRADE_MAP: Record<string, number> = {
  "1": 6, "2": 7, "3": 8, "4": 9, "5": 10, "6": 11,
};
/* ─── main component ─── */

export default function EditProfile() {
  const { register, handleSubmit, watch, reset, setValue, control, formState: { errors } } = useForm<FormData>(); const [states, setStates] = useState<any[]>([]);
  const [regions, setRegions] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [verifyParentMobileOtp, setVerifyParentMobileOtp] = useState("");
  const [verifyParentEmailOtp, setVerifyParentEmailOtp] = useState("");
  const [parentEmailOtpSent, setParentEmailOtpSent] = useState(false);
  const [parentEmailVerified, setParentEmailVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState<Partial<Record<OtpTarget, boolean>>>({});
  const [verifyLoading, setVerifyLoading] = useState<Partial<Record<OtpTarget, boolean>>>({});
  const [otpErrors, setOtpErrors] = useState<Partial<Record<OtpTarget, string>>>({});
  const [countryName, setCountryName] = useState("");
  const [nationalId, setNationalId] = useState("");

  const [dialog, setDialog] = useState<DialogState>({ open: false, type: "success", message: "", });
  const genderOptions = useMemo(() => [
    { label: "Male", value: "1" },
    { label: "Female", value: "2" },
    { label: "Other", value: "3" },
  ], []);

  const gradeOptions = useMemo(() => [
    { label: "6", value: "1" }, { label: "7", value: "2" },
    { label: "8", value: "3" }, { label: "9", value: "4" },
    { label: "10", value: "5" }, { label: "11", value: "6" },
  ], []);

  const boardOptions = useMemo(() => [
    { label: "ICSE (Indian Certificate of Secondary Education)", value: "1" },
    { label: "CBSE (Central Board of Secondary Education)", value: "2" },
    { label: "State Board", value: "3" },
    { label: "IGCSE (International General Certificate of Secondary Education)", value: "5" },
    { label: "IB (International Baccalaureate)", value: "6" },
  ], []);

  const howDidYouOptions = useMemo(() => [
    { label: "Website", value: "1" },
    { label: "School Circular/Teacher", value: "2" },
    { label: "State Coordinator", value: "3" },
    { label: "News / Print Media", value: "4" },
    { label: "NCSM", value: "5" },
    { label: "Social Media", value: "6" },
    { label: "Friend/Family", value: "7" },
  ], []);
  const [countryId, setCountryId] = useState<string>("");


  const showDialog = useCallback((type: "success" | "error", message: string) => {
    setDialog({ open: true, type, message });

    if (type === "success") {
      const timer = setTimeout(
        () => setDialog((prev) => ({ ...prev, open: false })),
        2500
      );
      return () => clearTimeout(timer);
    }
    // error dialogs auto-close nahi honge — sirf OK button click pe band honge
  }, []);


  /* ✅ Optional upgrade: centralised helper — shows dialog and auto-closes after 2.5s */
  // const showDialog = useCallback((type: "success" | "error", message: string) => {
  //   setDialog({ open: true, type, message });
  //   const timer = setTimeout(
  //     () => setDialog((prev) => ({ ...prev, open: false })),
  //     2500
  //   );
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    fetchStates().then(setStates);
  }, []);

  // useEffect(() => {
  //   if (!countryId) return;

  //   const alpha3Code = COUNTRY_ID_TO_ALPHA3[countryId];
  //   if (!alpha3Code) return;

  //   fetchRegionsWithCities(alpha3Code)
  //     .then((res: any) => {
  //       console.log("RAW regions response:", JSON.stringify(res?.data, null, 2));
  //       const regionList = res?.data || [];
  //       setRegions(regionList);

  //       // Try to match the stored district/region name against the new list
  //       // (old district_id won't match new region IDs, so match by name instead)
  //       const raw = localStorage.getItem("user");
  //       const user = raw ? JSON.parse(raw) : null;
  //       const d = user?.user_detail || user?.user?.user_detail || user?.data?.user_detail;
  //       const storedDistrictName = d?.district?.name;

  //       const matchedRegion = storedDistrictName
  //         ? regionList.find(
  //           (r: any) => r.name?.toLowerCase() === storedDistrictName.toLowerCase()
  //         )
  //         : null;

  //       if (matchedRegion) {
  //         setValue("region", String(matchedRegion.district_id));
  //         setCities(matchedRegion.cities || []);
  //       }


  //     })
  //     .catch(() => setRegions([]));
  // }, [countryId, setValue]);

  useEffect(() => {
    if (!countryId) return;

    const alpha3Code = COUNTRY_ID_TO_ALPHA3[countryId];
    if (!alpha3Code) return;

    fetchRegionsWithCities(alpha3Code)
      .then((res: any) => {
        const regionList = res?.data || [];
        setRegions(regionList);

        const raw = localStorage.getItem("user");
        const user = raw ? JSON.parse(raw) : null;
        const d = user?.user_detail || user?.user?.user_detail || user?.data?.user_detail;
        const storedDistrictName = d?.district?.name;
        const storedSubDistrictName = d?.sub_district?.name; // NEW

        const matchedRegion = storedDistrictName
          ? regionList.find(
            (r: any) => r.name?.toLowerCase() === storedDistrictName.toLowerCase()
          )
          : null;

        if (matchedRegion) {
          setValue("region", String(matchedRegion.district_id));
          const cityList = matchedRegion.cities || [];
          setCities(cityList);

          // NEW — sub_district ko city dropdown me match karo
          if (storedSubDistrictName) {
            const matchedCity = cityList.find(
              (c: any) => c.name?.toLowerCase() === storedSubDistrictName.toLowerCase()
            );
            if (matchedCity) {
              setValue("city", String(matchedCity.id));
            }
          }
        }
      })
      .catch(() => setRegions([]));
  }, [countryId, setValue]);

  useEffect(() => {

    const init = async () => {
      const raw = localStorage.getItem("user");
      if (!raw) return;
      const user = JSON.parse(raw);
      const d = user?.user_detail || user?.user?.user_detail || user?.data?.user_detail;
      if (!d) return;

      reset({
        name: d.name || "",
        schoolName: d.school_name || "",
        schoolBoard: String(d.school_board_id || ""),
        studentMobile: (d.student_mobile_number || "").replace(/\D/g, "").replace(/^0+/, ""),
        parentMobile: (d.parent_phone_number || "").replace(/\D/g, "").replace(/^0+/, ""),
        studentEmail: d.student_email || "",
        dob: d.date_of_birth || "",
        parentName: d.parent_name || "",
        parentEmail: d.parent_email || "",
        address: d.address || "",
        gender: String(d.gender || ""),
        grade: String(d.class_id || ""),
        howDidYouGetToKnowAboutVVM: String(d.know_about_vvm_id || ""),
        state: String(d.state_id || ""),
        region: String(d.region_id || d.district_id || ""),
        city: String(d.city_id || ""),
        pinCode: d.pin_code || d.pincode || "",  // ← your data uses "pincode" not "pin_code"
        aadharNumber: d.aadhar_number || "",
        examLanguage: String(d.exam_language_id || d.exam_lang_id || ""), // ← your data uses exam_lang_id
        parentSalutation: d.parent_salutation || "",
      });

      // ✅ country_id is on ROOT user, not user_detail
      const countryId = String(user?.user?.country_id || user?.country_id || "");
      setCountryId(countryId);
      setCountryName(COUNTRY_MAP[countryId] || "");
      setParentEmailVerified(!!user?.user?.onboarding?.is_parent_email_verified || !!d.is_parent_email_verified);
      setNationalId(d.national_id || "");
      // setParentEmailVerified(!!user?.onboarding?.is_parent_email_verified || !!d.is_parent_email_verified);

      // if (d.state_id) {
      //   const districtData = await fetchDistricts({
      //     state_ids: [Number(d.state_id)],
      //     prant_ids: []
      //   });
      //   setDistricts(districtData);
      //   setValue("district", String(d.district_id || ""));
      // }
    };
    init();
  }, [reset, setValue]);


  /// new handle functions

  // const handleSendOtp = useCallback(async (target: OtpTarget) => {
  //   setOtpErrors((prev) => ({ ...prev, [target]: "" }));
  //   setOtpLoading((prev) => ({ ...prev, [target]: true }));

  //   try {
  //     if (target === "parentEmail") {
  //       await sendEmailOtpDashboard(watch("parentEmail"), "IN"); // ✅ FIXED
  //       setParentEmailOtpSent(true);
  //       showDialog("success", "OTP sent successfully to email.");
  //     } else {
  //       await sendMobileOtpWhileUpdating(watch("parentMobile")); // ✅ FIXED  
  //       setParentMobileOtpSent(true);
  //       showDialog("success", "OTP sent successfully to mobile.");
  //     }
  //   } catch (err: any) {
  //     const message =
  //       err?.message || err?.response?.data?.message || "Failed to send OTP.";

  //     setOtpErrors((prev) => ({ ...prev, [target]: message }));
  //     showDialog("error", message);
  //   } finally {
  //     setOtpLoading((prev) => ({ ...prev, [target]: false }));
  //   }
  // }, [watch, showDialog]);

  // const handleVerifyOtp = useCallback(async (target: OtpTarget) => {
  //   setOtpErrors((prev) => ({ ...prev, [target]: "" }));
  //   setVerifyLoading((prev) => ({ ...prev, [target]: true }));

  //   try {
  //     const otp =
  //       target === "parentMobile"
  //         ? verifyParentMobileOtp
  //         : verifyParentEmailOtp;

  //     if (target === "parentEmail") {
  //       await verifyEmailOtp(watch("parentEmail"), otp);
  //       setParentEmailVerified(true);
  //       showDialog("success", "Email verified successfully.");
  //     } else {
  //       await verifyMobileOtpWhileUpdating(
  //         watch("parentMobile"),
  //         otp
  //       ); // ✅ FIXED
  //       setParentMobileVerified(true);
  //       showDialog("success", "Mobile verified successfully.");
  //     }
  //   } catch (err: any) {
  //     const message =
  //       err?.message || err?.response?.data?.message || "OTP verification failed.";

  //     setOtpErrors((prev) => ({ ...prev, [target]: message }));
  //     showDialog("error", message);
  //   } finally {
  //     setVerifyLoading((prev) => ({ ...prev, [target]: false }));
  //   }
  // }, [verifyParentMobileOtp, verifyParentEmailOtp, watch, showDialog]);


  const handleSendOtp = useCallback(async (target: OtpTarget) => {
    setOtpErrors((prev) => ({ ...prev, [target]: "" }));
    setOtpLoading((prev) => ({ ...prev, [target]: true }));

    try {
      await sendEmailOtpDashboard(watch("parentEmail"), "IN");
      setParentEmailOtpSent(true);
      showDialog("success", "OTP sent successfully to email.");
    } catch (err: any) {
      const message =
        err?.message || err?.response?.data?.message || "Failed to send OTP.";

      setOtpErrors((prev) => ({ ...prev, [target]: message }));
      showDialog("error", message);
    } finally {
      setOtpLoading((prev) => ({ ...prev, [target]: false }));
    }
  }, [watch, showDialog]);


  const handleVerifyOtp = useCallback(async (target: OtpTarget) => {
    setOtpErrors((prev) => ({ ...prev, [target]: "" }));
    setVerifyLoading((prev) => ({ ...prev, [target]: true }));

    try {
      await verifyEmailOtp(watch("parentEmail"), verifyParentEmailOtp);
      setParentEmailVerified(true);
      showDialog("success", "Email verified successfully.");
    } catch (err: any) {
      const message =
        err?.message || err?.response?.data?.message || "OTP verification failed.";

      setOtpErrors((prev) => ({ ...prev, [target]: message }));
      showDialog("error", message);
    } finally {
      setVerifyLoading((prev) => ({ ...prev, [target]: false }));
    }
  // }, [verifyParentEmailOtp, watch, showDialog]);


  }, [verifyParentEmailOtp, watch, showDialog]);

  const handleRequestProfileUpdate = useCallback(() => {
    setParentEmailVerified(false);
    setParentEmailOtpSent(false);
    setVerifyParentEmailOtp("");
    setOtpErrors((prev) => ({ ...prev, parentEmail: "" }));
    showDialog("success", "You can now edit your email and request a new OTP.");
  }, [showDialog]);

  // const onSubmit = useCallback(async (data: FormData) => {

    
  const onSubmit = useCallback(async (data: FormData) => {
    console.log("🟢 onSubmit FIRED with data:", data);
    try {
      // Pull stored user to get fields we don't collect in the form
      // console.log("Selected region value:", data.region);
      // console.log("Selected city value:", data.city);
      const raw = localStorage.getItem("user");
      const user = raw ? JSON.parse(raw) : {};
      const d = user?.user_detail ?? user?.user?.user_detail ?? {};
      const cleanMobile = (num: string) => {
        if (!num) return "";
        return num.replace(/\D/g, "").replace(/^0+/, "");
      };
      console.log("d.parent_phone_number from localStorage:", d.parent_phone_number);
      console.log("data.parentMobile from form:", data.parentMobile);
      console.log("cleanMobile result:", cleanMobile(data.parentMobile || d.parent_phone_number || ""));
      const payload = {
        // ── Identity ────────────────────────────────────────────
        // user_id: user?.id ?? user?.user_id ?? "",
        user_id: user?.user?.id ?? user?.id ?? "",
        // ── Personal ────────────────────────────────────────────
        fullName: data.name,
        dob: data.dob,
        gender: data.gender ? Number(data.gender) : "",
        aadhar_number: data.aadharNumber || "",               // optional, can be empty




        parent_salutation: data.parentSalutation || d.parent_salutation || "Mr",
        parent_name: data.parentName || d.parent_name || "",
        parent_phone_number: cleanMobile(data.parentMobile || d.parent_phone_number || ""),
        parent_email: data.parentEmail || d.parent_email || "",
        // parent_salutation: data.parentSalutation || d.parent_salutation || "Mr",
        // parent_name: data.parentName || d.parent_name || "",
        // parent_phone_number: cleanMobile(data.parentMobile || d.parent_phone_number || ""),
        // CORRECT_KEY_NAME: cleanMobile(data.parentMobile || d.parent_phone_number || ""),
        // ── Student contact (optional) ──────────────────────────
        student_mobile_number: cleanMobile(data.studentMobile || d.student_mobile_number || ""),
        student_email: data.studentEmail || d.student_email || "",

        // ── Academic ────────────────────────────────────────────
        grade: data.grade
          ? String(GRADE_MAP[data.grade] ?? Number(data.grade))
          : "", school_board_id: data.schoolBoard ? Number(data.schoolBoard) : (d.school_board_id ? Number(d.school_board_id) : ""),
        sch_name: data.schoolName || "",
        school_id: d.school_id || "",               // preserved, can be empty

        // ── Address ─────────────────────────────────────────────
        address: data.address || d.address || "",
        dist_id: data.region ? Number(data.region) : "",
        city_id: data.city ? Number(data.city) : "",
        pincode: data.pinCode || d.pincode || d.pin_code || "",
        state_id: d.state_id ? Number(d.state_id) : (d.state?.id ? Number(d.state.id) : ""),

        // ── VVM ─────────────────────────────────────────────────
        exam_lang_id: data.examLanguage ? Number(data.examLanguage) : 14,
        know_about_vvm_id: data.howDidYouGetToKnowAboutVVM
          ? Number(data.howDidYouGetToKnowAboutVVM)
          : "",
      };

      console.log("🔵 FINAL PAYLOAD:", JSON.stringify(payload, null, 2));
      await completeStudentProfile(payload);

      // if (raw) {
      //   const user = JSON.parse(raw);

      //   // ✅ handle both structures
      //   const existing = user?.user_detail || user?.data?.user_detail || {};

      //   const updatedUserDetail = {
      //     ...existing,

      //     name: data.name,
      //     date_of_birth: data.dob,
      //     gender: data.gender,
      //     aadhar_number: data.aadharNumber,

      //     parent_salutation: data.parentSalutation || d.parent_salutation || "Mr",
      //     parent_name: data.parentName,
      //     parent_phone_number: data.parentMobile,
      //     parent_email: data.parentEmail,


      //     parent_email_verified: parentEmailVerified ? 1 : 0,

      //     student_mobile_number: data.studentMobile,
      //     student_email: data.studentEmail,

      //     class_id: data.grade,
      //     school_board_id: data.schoolBoard,
      //     school_name: data.schoolName,

      //     address: data.address,
      //     region_id: data.region,
      //     city_id: data.city,
      //     pin_code: data.pinCode,
      //     exam_language_id: data.examLanguage,
      //     know_about_vvm_id: data.howDidYouGetToKnowAboutVVM,
      //   };

      //   // ✅ preserve original structure
      //   if (user.user_detail) {
      //     user.user_detail = updatedUserDetail;
      //   } else if (user.data?.user_detail) {
      //     user.data.user_detail = updatedUserDetail;
      //   }

      //   localStorage.setItem("user", JSON.stringify(user));
      //   window.dispatchEvent(new Event("user-updated"));
      // }

      if (raw) {
        const user = JSON.parse(raw);

        // ✅ real shape: user.user.user_detail (confirmed from console dump)
        const existing =
          user?.user?.user_detail ||
          user?.user_detail ||
          user?.data?.user_detail ||
          {};

        const updatedUserDetail = {
          ...existing,

          name: data.name,
          date_of_birth: data.dob,
          gender: data.gender,
          aadhar_number: data.aadharNumber,

          parent_salutation: data.parentSalutation || d.parent_salutation || "Mr",
          parent_name: data.parentName,
          parent_phone_number: data.parentMobile,
          parent_email: data.parentEmail,

          is_parent_email_verified: parentEmailVerified ? 1 : 0,

          student_mobile_number: data.studentMobile,
          student_email: data.studentEmail,

          class_id: data.grade,
          school_board_id: data.schoolBoard,
          school_name: data.schoolName,

          address: data.address,
          region_id: data.region,
          city_id: data.city,
          pin_code: data.pinCode,
          exam_language_id: data.examLanguage,
          know_about_vvm_id: data.howDidYouGetToKnowAboutVVM,
        };

        // ✅ write back into whichever shape actually exists, real shape gets priority
        if (user?.user?.user_detail !== undefined) {
          user.user.user_detail = updatedUserDetail;
          if (user.user.onboarding) {
            user.user.onboarding.is_parent_email_verified = parentEmailVerified ? 1 : 0;
          }
        } else if (user.user_detail) {
          user.user_detail = updatedUserDetail;
        } else if (user.data?.user_detail) {
          user.data.user_detail = updatedUserDetail;
        } else {
          user.user = user.user || {};
          user.user.user_detail = updatedUserDetail;
        }

        localStorage.setItem("user", JSON.stringify(user));
        window.dispatchEvent(new Event("user-updated"));
      }


      showDialog("success", "Profile updated successfully.");
    } catch (error: any) {
      console.error("Profile update failed:", error);
      showDialog(
        "error",
        error?.response?.data?.message || "Profile update failed. Please try again.",
      );
    }
  }, [parentEmailVerified, showDialog]);
  return (
    <>
      <style>{CSS}</style>

      {/* ✅ FIX 2: DialogBox is now RENDERED in the tree, props passed correctly */}
      {/* <DialogBox dialog={dialog} setDialog={setDialog} />

      <div className="vvm-edit-card"> */}

      {/* ✅ FIX 2: DialogBox is now RENDERED in the tree, props passed correctly */}
      <DialogBox dialog={dialog} setDialog={setDialog} />

      {parentEmailVerified && (
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto 20px",
            padding: "14px 22px",
            borderRadius: 16,
            background: "rgba(26,107,74,.08)",
            border: "1px solid rgba(26,107,74,.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span className="vvm-status vvm-status--ok" style={{ fontSize: 14 }}>
            ✓ Profile is updated
          </span>
          <button
            type="button"
            className="vvm-btn vvm-btn--success"
            onClick={handleRequestProfileUpdate}
          >
            Update Profile Again
          </button>
        </div>
      )}

      <div className="vvm-edit-card">

        <div className="vvm-edit-inner">
          <h1 className="vvm-edit-title">EDIT STUDENT PROFILE</h1>

          <div className="vvm-grid">

            {/* ── Personal ── */}
            <div className="vvm-section-label">Personal Information</div>
            <VvmInput label="Full Name" required error={errors.name?.message}>
              <VvmTextInput placeholder="Enter full name"
                onKeyPress={(e) => { if (!/[a-zA-Z\s.'-]/.test(e.key)) e.preventDefault(); }}
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[a-zA-Z\s.'-]+$/,
                    message: "Name can only contain letters, spaces, dots, hyphens"
                  },
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })} />
            </VvmInput>

            <VvmInput label="Date Of Birth" required error={errors.dob?.message}>
              <VvmTextInput
                type="date"
                min="2008-01-01"
                max="2017-12-31"
                {...register("dob", {
                  required: "Date of Birth is required",
                  validate: (value) => {
                    if (!value) return "Date of Birth is required";

                    const date = new Date(value);
                    const min = new Date("2008-01-01");
                    const max = new Date("2017-12-31");

                    if (date < min) return "DOB must be after 1 Jan 2008";
                    if (date > max) return "DOB must be before 31 Dec 2017";

                    return true;
                  },
                })}
              />
            </VvmInput>

            {/* <VvmInput label="Aadhar Number">
              <VvmTextInput
                placeholder="Enter 12-digit Aadhar Number"
                maxLength={12}
                {...register("aadharNumber")}
              />
            </VvmInput> */}

            <VvmInput label={countryId === "4" ? "Qatar National ID" : "National ID"}>
              <VvmTextInput value={nationalId} readOnly disabled />
            </VvmInput>
            
            <VvmInput label="Select Gender">
              <VvmSelect
                value={watch("gender") || ""}
                onChange={(e) => setValue("gender", e.target.value)}
                options={genderOptions}
              />
            </VvmInput>

            {/* <VvmInput label="Student Mobile No." error={errors.studentMobile?.message}>
              <VvmTextInput
                placeholder="Student mobile number"
                {...register("studentMobile", {
                  validate: (value) => {
                    if (!value) return true;
                    if (!/^\d+$/.test(value)) return "Only digits allowed";
                    if (value.length < 7 || value.length > 10) return "Enter 7-10 digit number";
                    return true;
                  }
                })}
                onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
              />
            </VvmInput> */}

            {/* <VvmInput label="Student Mobile No." error={errors.studentMobile?.message}>
              <VvmTextInput
                placeholder="Student mobile number"
                maxLength={10}
                {...register("studentMobile", {
                  validate: (value) => {
                    if (!value) return true;
                    if (!/^\d+$/.test(value)) return "Only digits allowed";
                    if (value.length < 7 || value.length > 10) return "Enter 7-10 digit number";
                    return true;
                  }
                })}
                onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
              />
            </VvmInput>
            <VvmInput label="Student Email" error={errors.studentEmail?.message}>
              <VvmTextInput
                type="email"
                placeholder="Student email address"
                {...register("studentEmail", {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address"
                  }
                })} />
            </VvmInput> */}

            {countryId !== "4" && (
              <>
                <VvmInput label="Student Mobile No." error={errors.studentMobile?.message}>
                  <VvmTextInput
                    placeholder="Student mobile number"
                    maxLength={10}
                    {...register("studentMobile", {
                      validate: (value) => {
                        if (!value) return true;
                        if (!/^\d+$/.test(value)) return "Only digits allowed";
                        if (value.length < 7 || value.length > 10) return "Enter 7-10 digit number";
                        return true;
                      }
                    })}
                    onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                  />
                </VvmInput>
                <VvmInput label="Student Email" error={errors.studentEmail?.message}>
                  <VvmTextInput
                    type="email"
                    placeholder="Student email address"
                    {...register("studentEmail", {
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address"
                      }
                    })} />
                </VvmInput>
              </>
            )}

            {/* ── Parent / Contact ── */}
            <div className="vvm-section-label">Parent / Contact Details</div>

            {countryId !== "4" && (
              <VvmInput label="Parent Salutation" required>
                <VvmSelect
                  value={watch("parentSalutation") || ""}
                  onChange={(e) => setValue("parentSalutation", e.target.value)}
                  options={[
                    { label: "Mr.", value: "Mr" },
                    { label: "Mrs.", value: "Mrs" },
                    { label: "Dr.", value: "Dr" },
                  ]}
                />
              </VvmInput>
            )}
            
            {/* <VvmInput label="Parent Salutation" required>
              <VvmSelect
                value={watch("parentSalutation") || ""}
                onChange={(e) => setValue("parentSalutation", e.target.value)}
                options={[
                  { label: "Mr.", value: "Mr" },
                  { label: "Mrs.", value: "Mrs" },
                  { label: "Dr.", value: "Dr" },
                ]}
              />
            </VvmInput> */}

            <VvmInput label={countryId === "4" ? "Parent Name" : "Parent/Guardian Name"} error={errors.parentName?.message}>
              <VvmTextInput placeholder="Enter parent name"
                onKeyPress={(e) => { if (!/[a-zA-Z\s.'-]/.test(e.key)) e.preventDefault(); }}
                {...register("parentName", {
                  required: "Parent name is required",
                  pattern: {
                    value: /^[a-zA-Z\s.'-]+$/,
                    message: "Name can only contain letters, spaces, dots, hyphens"
                  },
                  minLength: { value: 2, message: "Minimum 2 characters" }
                })} />
            </VvmInput>




            <VvmInput label="Parent Email" error={errors.parentEmail?.message}>
              <div className="vvm-otp-row">
                <VvmTextInput
                  type="email"
                  placeholder="Enter parent email"
                  {...register("parentEmail", {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address"
                    }
                  })}
                />
                <button
                  type="button"
                  className="vvm-btn vvm-btn--success"
                  onClick={() => handleSendOtp("parentEmail")}
                  disabled={
                    otpLoading.parentEmail ||
                    parentEmailVerified ||
                    !watch("parentEmail")
                  }
                >
                  {otpLoading.parentEmail ? "Sending…" : "Send OTP"}
                </button>
              </div>
              {parentEmailVerified ? (
                <p className="vvm-status vvm-status--ok">✓ Email Verified</p>
              ) : (
                <p className="vvm-status vvm-status--err">Email not verified</p>
              )}
            </VvmInput>

            <VvmInput label="Verify Email" error={otpErrors.parentEmail}>
              <div className="vvm-otp-row">
                <VvmTextInput
                  placeholder="Enter 6-digit Email OTP"
                  maxLength={6}
                  value={verifyParentEmailOtp}
                  onChange={(e) => setVerifyParentEmailOtp(e.target.value)}
                  onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                  disabled={!parentEmailOtpSent || parentEmailVerified}
                />
                <button
                  type="button"
                  className="vvm-btn vvm-btn--success"
                  onClick={() => handleVerifyOtp("parentEmail")}
                  disabled={
                    !parentEmailOtpSent ||
                    verifyLoading.parentEmail ||
                    parentEmailVerified ||
                    verifyParentEmailOtp.length < 6
                  }
                >
                  {verifyLoading.parentEmail ? "Verifying…" : "Verify OTP"}
                </button>
              </div>
              {!parentEmailOtpSent && !parentEmailVerified && (
                <p className="vvm-status vvm-status--warn">Email OTP required or not verified</p>
              )}
            </VvmInput>


            <VvmInput label="Parent Mobile No." required error={errors.parentMobile?.message}>
              <VvmTextInput
                maxLength={10}
                {...register("parentMobile", {
                  required: "Parent mobile number is required",
                  validate: (value) => {
                    if (!/^\d+$/.test(value)) return "Only digits allowed";
                    if (value.length < 7 || value.length > 10) return "Enter 7-10 digit number";
                    return true;
                  }
                })}
                onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
              />
            </VvmInput>


            {/* ── Academic ── */}
            <div className="vvm-section-label">Academic Details</div>

            <VvmInput label="Select Grade">
              <VvmSelect
                value={watch("grade") || ""}
                onChange={(e) => setValue("grade", e.target.value)}
                options={gradeOptions}
              />
            </VvmInput>

            <VvmInput label="School Name" required error={errors.schoolName?.message}>
              <VvmTextInput placeholder="Enter school name"{...register("schoolName", {
                required: "School name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                pattern: {
                  value: /^[a-zA-Z0-9\s.,'()&-]+$/,
                  message: "School name contains invalid characters"
                }
              })}
              />
            </VvmInput>

            {/* <VvmInput label="School Board" required error={errors.schoolBoard?.message}>
              <Controller
                name="schoolBoard"
                control={control}
                defaultValue=""
                rules={{ required: "School Board is required" }}
                render={({ field }) => (
                  <VvmSelect
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    options={boardOptions}
                  />
                )}
              />
            </VvmInput> */}

            {countryId !== "4" && (
              <VvmInput label="School Board" required error={errors.schoolBoard?.message}>
                <Controller
                  name="schoolBoard"
                  control={control}
                  defaultValue=""
                  rules={{ required: "School Board is required" }}
                  render={({ field }) => (
                    <VvmSelect
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      options={boardOptions}
                    />
                  )}
                />
              </VvmInput>
            )}

            <VvmInput label="Exam Language">
              <VvmTextInput
                value="English"

                readOnly
              />
            </VvmInput>

            {countryId !== "4" && (
              <>
            {/* ── Address ── */}
            <div className="vvm-section-label">Address</div>

            {/* <VvmInput label="Address" required error={errors.address?.message}>              <VvmTextInput placeholder="Enter address" {...register("address", {
              required: "Address is required",
              minLength: { value: 10, message: "Address too short (min 10 chars)" },
              maxLength: { value: 200, message: "Address too long (max 200 chars)" }
            })} />
            </VvmInput> */}

            {/* <VvmInput label="State">
              <VvmSelect
                value={watch("state") || ""}
                onChange={async (e) => {
                  const value = e.target.value;
                  setValue("state", value);
                  setValue("district", "");
                  setValue("city", "");
                  setDistricts([]);
                  setCities([]);
                  const res = await fetchDistricts(value);
                  setDistricts(res);
                }}
                options={states.map((s: any) => ({ label: s.name, value: String(s.id) }))}
              />
            </VvmInput> */}

            {/* ADD THIS — Country: read-only */}
            <VvmInput label="Country">
              <VvmTextInput
                value={countryName}
                readOnly
              />
            </VvmInput>

            {/* <VvmInput label="City/Region">
              <VvmSelect
                value={watch("district") || ""}
                onChange={(e) => {
                  setValue("district", e.target.value);
                  setValue("city", "");
                  setCities([]);
                  // hook fetchCities(e.target.value) here when available
                }}
                options={districts.map((d: any) => ({ label: d.name, value: String(d.id) }))}
              />
            </VvmInput> */}


            <VvmInput label="Region">
              <Controller
                name="region"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <VvmSelect
                    value={field.value || ""}
                    onChange={(e) => {
                      const regionId = e.target.value;
                      field.onChange(regionId);
                      setValue("city", "");

                      const selectedRegion = regions.find(
                        (r: any) => String(r.district_id) === regionId
                      );
                      setCities(selectedRegion?.cities || []);
                    }}
                    options={regions.map((r: any) => ({ label: r.name, value: String(r.district_id) }))}
                  />
                )}
              />
            </VvmInput>

            <VvmInput label="City">
              <Controller
                name="city"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <VvmSelect
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    options={cities.map((c: any) => ({ label: c.name, value: String(c.id) }))}
                  />
                )}
              />
                </VvmInput>
              </>
            )}


            {/* <VvmInput label="Pin Code" required error={errors.pinCode?.message}>
              <VvmTextInput
                placeholder="Enter Pin Code"
                maxLength={6}
                onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                {...register("pinCode", {
                  required: "Pin code is required",
                  pattern: {
                    value: /^\d{4,10}$/,
                    message: "Pin code must be 4-10 digits only"
                  }
                })} />
            </VvmInput> */}

            {/* ── VVM ── */}
            <div className="vvm-section-label">About VVM</div>

            <VvmInput label="How Did You Get To Know About VVM?">
              <VvmSelect
                value={watch("howDidYouGetToKnowAboutVVM") || ""}
                onChange={(e) => setValue("howDidYouGetToKnowAboutVVM", e.target.value)}
                options={howDidYouOptions}
              />
            </VvmInput>

          </div>

          <div className="vvm-submit-row">
            <button
              type="button"
              className="vvm-btn vvm-btn--submit"
              onClick={handleSubmit(onSubmit, (validationErrors) => {
                console.log("🔴 VALIDATION BLOCKED SUBMIT:", validationErrors);
              })}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}