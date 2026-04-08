/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axiosInstance from "@/services/axiosInstance";
import { fetchStates, fetchDistricts, sendEmailOtp, verifyEmailOtp, sendMobileOtpWhileUpdating, verifyMobileOtpWhileUpdating, completeStudentProfile} from "@/services/authService";
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
  district: string;
  city: string;
  pinCode: string;
  aadharNumber: string;
  examLanguage: string;
}
type OtpTarget = "parentMobile" | "parentEmail";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-9 w-112.5 h-50 text-center shadow-xl">
        <h3
          className={`text-xl font-bold mb-3 ${dialog.type === "success" ? "text-green-600" : "text-red-600"
            }`}
        >
          {dialog.type === "success" ? "✓ Success" : "✗ Error"}
        </h3>
        <p className="text-md text-gray-600 mb-6">{dialog.message}</p>
        <button
          onClick={() => setDialog((prev) => ({ ...prev, open: false }))}
          className="px-5 py-3 rounded-lg bg-[#17395c] text-white font-semibold hover:bg-[#0f2742] transition-colors"
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

/* ─── main component ─── */

export default function EditProfile() {
  const { register, handleSubmit, watch, reset, setValue } = useForm<FormData>();

  const [states, setStates] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const [verifyParentMobileOtp, setVerifyParentMobileOtp] = useState("");
  const [verifyParentEmailOtp, setVerifyParentEmailOtp] = useState("");
  const [parentMobileOtpSent, setParentMobileOtpSent] = useState(false);
  const [parentEmailOtpSent, setParentEmailOtpSent] = useState(false);
  const [parentMobileVerified, setParentMobileVerified] = useState(false);
  const [parentEmailVerified, setParentEmailVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState<Partial<Record<OtpTarget, boolean>>>({});
  const [verifyLoading, setVerifyLoading] = useState<Partial<Record<OtpTarget, boolean>>>({});
  const [otpErrors, setOtpErrors] = useState<Partial<Record<OtpTarget, string>>>({});

  /* ✅ FIX 1b: dialog state lives in EditProfile, passed down as props to DialogBox */
  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    type: "success",
    message: "",
  });

  /* ✅ Optional upgrade: centralised helper — shows dialog and auto-closes after 2.5s */
  const showDialog = (type: "success" | "error", message: string) => {
    setDialog({ open: true, type, message });
    setTimeout(() => setDialog((prev) => ({ ...prev, open: false })), 2500);
  };

  useEffect(() => {
    fetchStates().then(setStates);
  }, []);

  useEffect(() => {
    const init = async () => {
      const raw = localStorage.getItem("user");
      if (!raw) return;
      const user = JSON.parse(raw);
      const d = user?.user_detail || user?.data?.user_detail;
      if (!d) return;

      reset({
        name: d.name || "",
        schoolName: d.school_name || "",
        schoolBoard: String(d.school_board_id || ""),
        studentMobile: d.student_mobile_number || "",
        studentEmail: d.student_email || "",
        dob: d.date_of_birth || "",
        parentName: d.parent_name || "",
        parentMobile: d.parent_phone_number || "",
        parentEmail: d.parent_email || "",
        address: d.address || "",
        gender: String(d.gender || ""),
        grade: String(d.class_id || ""),
        howDidYouGetToKnowAboutVVM: String(d.know_about_vvm_id || ""),
        state: String(d.state_id || ""),
        district: String(d.district_id || ""),
        city: String(d.city_id || ""),
        pinCode: d.pin_code || "",
        aadharNumber: d.aadhar_number || "",
        examLanguage: String(d.exam_language_id || ""),
      });

      setParentMobileVerified(!!d.parent_mobile_verified);
      setParentEmailVerified(!!d.parent_email_verified);

      if (d.state_id) {
        const districtData = await fetchDistricts(String(d.state_id));
        setDistricts(districtData);
      }
    };
    init();
  }, [reset]);

  
  /// new handle functions

  const handleSendOtp = async (target: OtpTarget) => {
    setOtpErrors((prev) => ({ ...prev, [target]: "" }));
    setOtpLoading((prev) => ({ ...prev, [target]: true }));

    try {
      if (target === "parentEmail") {
        await sendEmailOtp(watch("parentEmail"));
        setParentEmailOtpSent(true);
        showDialog("success", "OTP sent successfully to email.");
      } else {
        await sendMobileOtpWhileUpdating(watch("parentMobile")); // ✅ FIXED
        setParentMobileOtpSent(true);
        showDialog("success", "OTP sent successfully to mobile.");
      }
    } catch (err: any) {
      const message =
        err?.message || err?.response?.data?.message || "Failed to send OTP.";

      setOtpErrors((prev) => ({ ...prev, [target]: message }));
      showDialog("error", message);
    } finally {
      setOtpLoading((prev) => ({ ...prev, [target]: false }));
    }
  };

  const handleVerifyOtp = async (target: OtpTarget) => {
    setOtpErrors((prev) => ({ ...prev, [target]: "" }));
    setVerifyLoading((prev) => ({ ...prev, [target]: true }));

    try {
      const otp =
        target === "parentMobile"
          ? verifyParentMobileOtp
          : verifyParentEmailOtp;

      if (target === "parentEmail") {
        await verifyEmailOtp(watch("parentEmail"), otp);
        setParentEmailVerified(true);
        showDialog("success", "Email verified successfully.");
      } else {
        await verifyMobileOtpWhileUpdating(
          watch("parentMobile"),
          otp
        ); // ✅ FIXED
        setParentMobileVerified(true);
        showDialog("success", "Mobile verified successfully.");
      }
    } catch (err: any) {
      const message =
        err?.message || err?.response?.data?.message || "OTP verification failed.";

      setOtpErrors((prev) => ({ ...prev, [target]: message }));
      showDialog("error", message);
    } finally {
      setVerifyLoading((prev) => ({ ...prev, [target]: false }));
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Pull stored user to get fields we don't collect in the form
      const raw = localStorage.getItem("user");
      const user = raw ? JSON.parse(raw) : {};
      const d = user?.user_detail ?? {};
      const GRADE_MAP: Record<string, number> = {
        "1": 6, "2": 7, "3": 8, "4": 9, "5": 10, "6": 11,
      };

      const payload = {
        // ── Identity ────────────────────────────────────────────
        user_id: user?.id ?? user?.user_id ?? "",

        // ── Personal ────────────────────────────────────────────
        fullName: data.name,
        dob: data.dob,
        gender: data.gender ? Number(data.gender) : "",
        aadhar_number: data.aadharNumber || "",               // optional, can be empty

        // ── Parent / Contact ────────────────────────────────────
        parent_salutation: d.parent_salutation || "",             // preserved from localStorage
        parent_name: data.parentName || "",
        parent_mobile: data.parentMobile || "",
        parent_email: data.parentEmail || "",

        // ── Student contact (optional) ──────────────────────────
        student_mobile: data.studentMobile || "",
        student_email: data.studentEmail || "",

        // ── Academic ────────────────────────────────────────────
        grade: data.grade
          ? String(GRADE_MAP[data.grade] ?? Number(data.grade))
          : "",        school_board_id: data.schoolBoard ? Number(data.schoolBoard) : "",
        sch_name: data.schoolName || "",
        school_id: d.school_id || "",               // preserved, can be empty

        // ── Address ─────────────────────────────────────────────
        address: data.address || "",
        state_id: data.state ? Number(data.state) : "",
        dist_id: data.district ? Number(data.district) : "",
        city_name_2: data.city || "",    // ✅ text input — e.g. "Nagpur (Urban)"
        // ✅ city_id NOT sent — backend uses city_name_2
        pincode: data.pinCode || "",

        // ── VVM ─────────────────────────────────────────────────
        exam_lang_id: data.examLanguage ? Number(data.examLanguage) : "",
        know_about_vvm_id: data.howDidYouGetToKnowAboutVVM
          ? Number(data.howDidYouGetToKnowAboutVVM)
          : "",
      };


      await completeStudentProfile(payload);

        if (raw) {
        const user = JSON.parse(raw);

        // ✅ handle both structures
        const existing = user?.user_detail || user?.data?.user_detail || {};

        const updatedUserDetail = {
          ...existing,

          name: data.name,
          date_of_birth: data.dob,
          gender: data.gender,
          aadhar_number: data.aadharNumber,

          parent_name: data.parentName,
          parent_phone_number: data.parentMobile,
          parent_email: data.parentEmail,

          // ✅ VERY IMPORTANT
          parent_mobile_verified: parentMobileVerified ? 1 : 0,
          parent_email_verified: parentEmailVerified ? 1 : 0,

          student_mobile_number: data.studentMobile,
          student_email: data.studentEmail,

          class_id: data.grade,
          school_board_id: data.schoolBoard,
          school_name: data.schoolName,

          address: data.address,
          state_id: data.state,
          district_id: data.district,
          city_id: data.city,

          pin_code: data.pinCode,
          exam_language_id: data.examLanguage,
          know_about_vvm_id: data.howDidYouGetToKnowAboutVVM,
        };

        // ✅ preserve original structure
        if (user.user_detail) {
          user.user_detail = updatedUserDetail;
        } else if (user.data?.user_detail) {
          user.data.user_detail = updatedUserDetail;
        }

        localStorage.setItem("user", JSON.stringify(user));
      }

      showDialog("success", "Profile updated successfully.");
    } catch (error: any) {
      console.error("Profile update failed:", error);
      showDialog(
        "error",
        error?.response?.data?.message || "Profile update failed. Please try again.",
      );
    }
  };

  return (
    <>
      <style>{CSS}</style>

      {/* ✅ FIX 2: DialogBox is now RENDERED in the tree, props passed correctly */}
      <DialogBox dialog={dialog} setDialog={setDialog} />

      <div className="vvm-edit-card">
        <div className="vvm-edit-inner">
          <h1 className="vvm-edit-title">EDIT STUDENT PROFILE</h1>

          <div className="vvm-grid">

            {/* ── Personal ── */}
            <div className="vvm-section-label">Personal Information</div>

            <VvmInput label="Full Name" required>
              <VvmTextInput placeholder="Enter full name" {...register("name")} />
            </VvmInput>

            <VvmInput label="Date Of Birth" required>
              <VvmTextInput type="date" {...register("dob")} />
            </VvmInput>

            <VvmInput label="Aadhar Number">
              <VvmTextInput
                placeholder="Enter 12-digit Aadhar Number"
                maxLength={12}
                {...register("aadharNumber")}
              />
            </VvmInput>

            <VvmInput label="Select Gender">
              <VvmSelect
                value={watch("gender") || ""}
                onChange={(e) => setValue("gender", e.target.value)}
                options={[
                  { label: "Male", value: "1" },
                  { label: "Female", value: "2" },
                  { label: "Other", value: "3" },
                ]}
              />
            </VvmInput>

            {/* ── Parent / Contact ── */}
            <div className="vvm-section-label">Parent / Contact Details</div>

            <VvmInput label="Parent Mobile No." required>
              <div className="vvm-otp-row">
                <VvmTextInput placeholder="Enter mobile number" {...register("parentMobile")} />
                <button
                  type="button"
                  className="vvm-btn vvm-btn--success"
                  onClick={() => handleSendOtp("parentMobile")}
                  disabled={otpLoading.parentMobile || parentMobileVerified}
                >
                  {otpLoading.parentMobile ? "Sending…" : "Send OTP"}
                </button>
              </div>
              {parentMobileVerified ? (
                <p className="vvm-status vvm-status--ok">✓ Mobile Verified</p>
              ) : (
                <p className="vvm-status vvm-status--err">Mobile Number Not Verified</p>
              )}
            </VvmInput>

            <VvmInput label="Verify Mobile No." error={otpErrors.parentMobile}>
              <div className="vvm-otp-row">
                <VvmTextInput
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  value={verifyParentMobileOtp}
                  onChange={(e) => setVerifyParentMobileOtp(e.target.value)}
                  disabled={!parentMobileOtpSent || parentMobileVerified}
                />
                <button
                  type="button"
                  className="vvm-btn vvm-btn--success"
                  onClick={() => handleVerifyOtp("parentMobile")}
                  disabled={
                    !parentMobileOtpSent ||
                    verifyLoading.parentMobile ||
                    parentMobileVerified ||
                    verifyParentMobileOtp.length < 6
                  }
                >
                  {verifyLoading.parentMobile ? "Verifying…" : "Verify OTP"}
                </button>
              </div>
              {!parentMobileOtpSent && !parentMobileVerified && (
                <p className="vvm-status vvm-status--warn">OTP required or Not Verified</p>
              )}
            </VvmInput>

            <VvmInput label="Parent Email">
              <div className="vvm-otp-row">
                <VvmTextInput
                  type="email"
                  placeholder="Enter parent email"
                  {...register("parentEmail")}
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

            <VvmInput label="Parent / Guardian Full Name">
              <VvmTextInput placeholder="Enter parent name" {...register("parentName")} />
            </VvmInput>

            {/* ── Academic ── */}
            <div className="vvm-section-label">Academic Details</div>

            <VvmInput label="Select Grade">
              <VvmSelect
                value={watch("grade") || ""}
                onChange={(e) => setValue("grade", e.target.value)}
                options={[
                  { label: "6", value: "1" },
                  { label: "7", value: "2" },
                  { label: "8", value: "3" },
                  { label: "9", value: "4" },
                  { label: "10", value: "5" },
                  { label: "11", value: "6" },
                ]}
              />
            </VvmInput>

            <VvmInput label="School Name" required>
              <VvmTextInput placeholder="Enter school name" {...register("schoolName")} />
            </VvmInput>

            <VvmInput label="School Board">
              <VvmSelect
                value={watch("schoolBoard") || ""}
                onChange={(e) => setValue("schoolBoard", e.target.value)}
                options={[
                  { label: "CBSE (Central Board of Secondary Education)", value: "1" },
                  { label: "ICSE (Indian Certificate of Secondary Education)", value: "2" },
                  { label: "State Board", value: "3" },
                  { label: "IB (International Baccalaureate)", value: "4" },
                  { label: "IGCSE (Cambridge)", value: "5" },
                  { label: "Other", value: "6" },
                ]}
              />
            </VvmInput>

            <VvmInput label="Exam Language">
              <VvmSelect
                value={watch("examLanguage") || ""}
                onChange={(e) => setValue("examLanguage", e.target.value)}
                options={[
                  { label: "English", value: "1" },
                  { label: "Hindi", value: "2" },
                  { label: "Marathi", value: "3" },
                  { label: "Gujarati", value: "4" },
                  { label: "Bengali", value: "5" },
                  { label: "Tamil", value: "6" },
                  { label: "Telugu", value: "7" },
                  { label: "Kannada", value: "8" },
                  { label: "Malayalam", value: "9" },
                  { label: "Punjabi", value: "10" },
                ]}
              />
            </VvmInput>

            {/* ── Address ── */}
            <div className="vvm-section-label">Address</div>

            <VvmInput label="Address" required>
              <VvmTextInput placeholder="Enter address" {...register("address")} />
            </VvmInput>

            <VvmInput label="State">
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
            </VvmInput>

            <VvmInput label="District">
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
            </VvmInput>

            <VvmInput label="City">
              <VvmTextInput
                placeholder="Enter city name"
                {...register("city")}
              />
            </VvmInput>

            <VvmInput label="Pin Code" required>
              <VvmTextInput
                placeholder="Enter Pin Code"
                maxLength={6}
                {...register("pinCode")}
              />
            </VvmInput>

            {/* ── VVM ── */}
            <div className="vvm-section-label">About VVM</div>

            <VvmInput label="How Did You Get To Know About VVM?">
              <VvmSelect
                value={watch("howDidYouGetToKnowAboutVVM") || ""}
                onChange={(e) => setValue("howDidYouGetToKnowAboutVVM", e.target.value)}
                options={[
                  { label: "Website", value: "1" },
                  { label: "School Circular/Teacher", value: "2" },
                  { label: "State Coordinator", value: "3" },
                  { label: "News / Print Media", value: "4" },
                  { label: "NCSM", value: "5" },
                  { label: "Social Media", value: "6" },
                  { label: "Friend/Family", value: "7" },
                ]}
              />
            </VvmInput>

          </div>

          <div className="vvm-submit-row">
            <button
              type="button"
              className="vvm-btn vvm-btn--submit"
              onClick={handleSubmit(onSubmit)}
            >
              Submit Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}