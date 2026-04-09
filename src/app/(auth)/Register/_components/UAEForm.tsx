"use client";
import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import TextAreaField from "@/components/ui/TextAreaField";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { sendEmailOtp, verifyEmailOtp } from "@/services/authService";

type RegistrationForm = RegistrationFormPayload;

const genders = [
  { label: "Male", value: "1" },
  { label: "Female", value: "2" },
  { label: "Others", value: "3" },
];

const grades = [
  { label: "6", value: "1" },
  { label: "7", value: "2" },
  { label: "8", value: "3" },
  { label: "9", value: "4" },
  { label: "10", value: "5" },
  { label: "11", value: "6" },
];

const boards = [
  { label: "CBSE", value: "CBSE" },
  { label: "ICSE", value: "ICSE" },
  { label: "IB", value: "IB" },
  { label: "IGCSE", value: "IGCSE" },
];

type DialogType = {
  type: "success" | "error" | "info" | "otp-sent";
  message: string;
  title?: string;
};

type Props = {
  countries: {
    value: string;
    label: string;
    code: string;
  }[];
};

// ─── Styled Modal Dialog ───────────────────────────────────────────────────────
function StyledDialog({
  dialog,
  onClose,
}: {
  dialog: DialogType;
  onClose: () => void;
}) {
  const config = {
    success: {
      bg: "from-green-50 to-emerald-50",
      border: "border-green-200",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      titleColor: "text-green-700",
      btnBg: "bg-green-600 hover:bg-green-700",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    error: {
      bg: "from-red-50 to-rose-50",
      border: "border-red-200",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      titleColor: "text-red-700",
      btnBg: "bg-red-600 hover:bg-red-700",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    info: {
      bg: "from-blue-50 to-indigo-50",
      border: "border-blue-200",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      titleColor: "text-blue-700",
      btnBg: "bg-blue-600 hover:bg-blue-700",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    "otp-sent": {
      bg: "from-purple-50 to-violet-50",
      border: "border-purple-200",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      titleColor: "text-purple-700",
      btnBg: "bg-purple-600 hover:bg-purple-700",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  };

  const c = config[dialog.type];

  const titles: Record<string, string> = {
    success: "Success!",
    error: "Oops!",
    info: "Info",
    "otp-sent": "OTP Sent!",
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`bg-gradient-to-br ${c.bg} border ${c.border} rounded-2xl shadow-2xl w-full max-w-md p-8 text-center animate-in fade-in zoom-in duration-200`}
      >
        {/* Icon */}
        <div className={`mx-auto mb-5 w-20 h-20 rounded-full ${c.iconBg} ${c.iconColor} flex items-center justify-center shadow-inner`}>
          {c.icon}
        </div>

        {/* Title */}
        <h2 className={`text-2xl font-bold mb-3 ${c.titleColor}`}>
          {dialog.title || titles[dialog.type]}
        </h2>

        {/* Message */}
        <p className="text-base text-gray-600 mb-7 leading-relaxed">{dialog.message}</p>

        {/* Button */}
        <button
          onClick={onClose}
          className={`w-20 py-3 px-6 ${c.btnBg} text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 text-lg`}
        >
          OK
        </button>
      </div>
    </div>
  );
}

// ─── Debounce hook ────────────────────────────────────────────────────────────
function useDebounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  return useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => fn(...args), delay);
    },
    [fn, delay]
  ) as T;
}

export default function UAEForm({ countries }: Props) {
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailOtpValue, setEmailOtpValue] = useState("");
  const [dialog, setDialog] = useState<DialogType | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useState({ email: "", username: "" });
  const [otpSent, setOtpSent] = useState(false);

  // ── Cooldown timer state ──────────────────────────────────────────────────
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCooldown = () => {
    setCooldown(60);
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const [form, setForm] = useState<RegistrationForm>({
    fullName: "",
    dob: "",
    emiratesId: "",
    gender: "",
    studentMobile: "",
    studentEmail: "",
    grade: "",
    password: "",
    confirmPassword: "",
    schoolName: "",
    board: "",
    country: countries.find((c) => c.value === "uae")?.code || "",
    city: "",
    pincode: "",
    schoolAddress: "",
    parentName: "",
    parentMobile: "",
    parentEmail: "",
  });

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, touchedFields },
  } = useForm<RegistrationForm>({ mode: "all" });

  // ── Send OTP (debounced) ──────────────────────────────────────────────────
  const _sendOtp = async () => {
    const email = getValues("parentEmail");
    if (!email) {
      setError("parentEmail", { type: "manual", message: "Enter parent email first" });
      return;
    }
    try {
      setOtpLoading(true);
      await sendEmailOtp(email);
      setOtpModalOpen(true);
      setOtpSent(true);
      startCooldown();
      setDialog({
        type: "otp-sent",
        message: `A 6-digit OTP has been sent to ${email}. Please check your inbox.`,
      });
    } catch (err: any) {
      setDialog({ type: "error", message: "Failed to send OTP. Please try again." });
    } finally {
      setOtpLoading(false);
    }
  };

  const sendOtp = useDebounce(_sendOtp, 300);

  // ── Verify OTP ────────────────────────────────────────────────────────────
  const verifyOtp = async () => {
    const email = getValues("parentEmail");
    if (!emailOtpValue || emailOtpValue.length < 6) {
      setDialog({ type: "error", message: "Please enter the 6-digit OTP." });
      return;
    }
    try {
      setVerifyLoading(true);
      const res = await verifyEmailOtp(email, emailOtpValue);
      if (res?.status) {
        setEmailVerified(true);
        setOtpModalOpen(false);
        setDialog({ type: "success", message: "Email verified successfully! You can now submit the form." });
      } else {
        throw new Error(res?.message || "Invalid OTP");
      }
    } catch (err: any) {
      setDialog({
        type: "error",
        title: "Invalid OTP",
        message: err.message || "The OTP you entered is incorrect or has expired. Please try again.",
      });
    } finally {
      setVerifyLoading(false);
    }
  };

  const submitFormData = async (formData: any) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setUserData({ email: formData.studentEmail, username: data.username });
        setShowPopup(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: RegistrationForm) => {
    if (!emailVerified) {
      setDialog({
        type: "error",
        message: "Please verify your parent email OTP before submitting.",
      });
      return;
    }

    try {
      setLoading(true);

      const payload = {
        fullName: data.fullName,
        dob: data.dob,
        gender: Number(data.gender),
        grade: Number(data.grade),

        // ✅ NEW REQUIRED FIELDS
        student_mobile: data.studentMobile,
        student_email: data.studentEmail,
        emirates_id: data.emiratesId || null,

        // ✅ SCHOOL
        sch_name: data.schoolName,
        school_board_id: Number(data.board),
        pincode: data.pincode,
        address: data.schoolAddress,

        // ❌ REMOVE state_id, dist_id

        // ✅ PARENT
        parent_name: data.parentName,
        parent_mobile: data.parentMobile,
        parent_email: data.parentEmail,

        // ✅ AUTH
        password: data.password,
        password_confirmation: data.confirmPassword,

        // ✅ COUNTRY CODE FIX
        country_code: "2", // UAE
      };

      await submitFormData(payload);

      setDialog({
        type: "success",
        message: "Registration completed successfully!",
      });

    } catch (error: any) {
      setDialog({
        type: "error",
        message: error?.message || "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 md:py-10">
      {/* Styled Dialog */}
      {dialog && <StyledDialog dialog={dialog} onClose={() => setDialog(null)} />}

      <div className="mx-auto max-w-7xl px-4 sm:px-5">
        <div className="mb-6 flex items-center justify-between md:mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#2f5f8f] sm:text-2xl md:text-4xl">
            Student Registration – UAE
          </h1>
          <Image
            src="/gcc/uae.webp"
            alt="UAE"
            width={120}
            height={90}
            className="h-auto w-12 object-contain sm:w-14 md:w-16"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* ── Primary Details ── */}
          <Section title="Primary Details">
            <InputField label="Student Full Name" required placeholder="Enter full name"
              registration={register("fullName", {
                required: "Student Full Name is required",
                pattern: { value: /^[A-Za-z\s]+$/, message: "Only alphabetical characters are allowed" },
              })}
              error={errors.fullName}
            />
            <InputField label="Date of Birth" type="date" required
              registration={register("dob", {
                required: "Date of Birth is required",
                pattern: { value: /^\d{4}-\d{2}-\d{2}$/, message: "Date must be in YYYY-MM-DD format" },
              })}
              error={errors.dob}
            />
            <InputField label="Emirates ID" required maxLength={15} placeholder="Enter Emirates ID"
              registration={register("emiratesId", {
                required: "Emirates ID is required",
                minLength: { value: 15, message: "Emirates ID must be 15 characters" },
                maxLength: { value: 15, message: "Emirates ID must be 15 characters" },
              })}
              error={touchedFields?.emiratesId && errors?.emiratesId ? errors.emiratesId : undefined}
            />
            <SelectField label="Gender" required options={genders}
              registration={register("gender", { required: "Gender is required" })}
              error={touchedFields?.gender && errors?.gender ? errors.gender : undefined}
            />
            <InputField label="Student Mobile" placeholder="Enter mobile"
              registration={register("studentMobile", {
                required: "Student Mobile is required",
                pattern: {
                  value: /^[0-9]{9}$/,
                  message: "Mobile number must be 9 digits",
                }
              })}
              error={touchedFields?.studentMobile && errors?.studentMobile ? errors.studentMobile : undefined}
            />
            <InputField label="Student Email" type="email" placeholder="Enter email"
              registration={register("studentEmail", {
                required: "Email address is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address (e.g. name@example.com)" },
              })}
              error={errors.studentEmail}
            />
            <SelectField label="Class / Grade" required options={grades}
              registration={register("grade", { required: "Grade is required" })}
              error={touchedFields?.grade && errors?.grade ? errors.grade : undefined}
            />
          </Section>

          {/* ── Login Details ── */}
          <Section title="Login Details">
            <InputField label="Password" type="password" required placeholder="Enter password"
              registration={register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message: "Password must be at least 6 characters, include uppercase, lowercase, number and special character",
                },
              })}
              error={errors.password}
            />
            <InputField label="Confirm Password" type="password" required placeholder="Confirm password"
              registration={register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => value === getValues("password") || "Passwords do not match",
              })}
              error={errors.confirmPassword}
            />
          </Section>

          {/* ── School Details ── */}
          <Section title="School Details">
            <InputField label="School Name" required placeholder="Enter school name"
              registration={register("schoolName", {
                required: "School Name is required",
                pattern: { value: /^[A-Za-z\s]+$/, message: "Only alphabetical characters are allowed" },
              })}
              error={errors.schoolName}
            />
            <SelectField label="Board" required options={boards}
              registration={register("board", { required: "Board is required" })}
              error={touchedFields?.board && errors?.board ? errors.board : undefined}

            />
            <InputField label="Country" disabled registration={register("country")}
              value={countries.find((c) => c.value === "uae")?.label || ""}
            />
            <InputField label="Pincode" required placeholder="Enter pincode"
              registration={register("pincode", {
                required: "Pincode is required",
                pattern: { value: /^[0-9]{5,6}$/, message: "Pincode must be 5 or 6 digits" },
              })}
              error={touchedFields?.pincode && errors?.pincode ? errors.pincode : undefined}
            />
            <div className="md:col-span-2">
              <TextAreaField label="School Address" rows={3} required placeholder="Enter school address"
                registration={register("schoolAddress", { required: "School Address is required" })}
                error={errors.schoolAddress}
              />
            </div>
          </Section>

          {/* ── Parent Details ── */}
          <Section title="Parent Details">
            <InputField label="Parent Name" required placeholder="Enter parent name"
              registration={register("parentName", {
                required: "Parent Name is required",
                pattern: { value: /^[A-Za-z\s]+$/, message: "Only alphabetical characters are allowed" },
              })}
              error={errors.parentName}
            />
            <InputField label="Parent Mobile" required placeholder="Enter parent mobile"
              registration={register("parentMobile", {
                required: "Parent Mobile is required",
                pattern: { value: /^[0-9]{9}$/, message: "Mobile number must be 9 digits", }
              })}
              error={errors.parentMobile}
            />

            {/* ── Parent Email + OTP row ── */}
            {/* Full-width email row */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 items-end">

              {/* LEFT SIDE → EMAIL + SEND OTP */}
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <InputField
                    label="Parent Primary Email"
                    type="email"
                    required
                    placeholder="Parent email"
                    registration={register("parentEmail", {
                      required: "Parent email is required",
                    })}
                    error={errors.parentEmail}
                    className={`transition-all ${emailVerified
                      ? "border-green-400 bg-green-50 ring-2 ring-green-200"
                      : ""
                      }`}
                  />
                </div>

                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={otpLoading || cooldown > 0}
                  className={`h-10.5 px-5 rounded-lg text-sm font-semibold transition-all duration-200
flex items-center gap-2 shadow-sm border
${cooldown > 0
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent hover:from-blue-700 hover:to-indigo-700 hover:shadow-md active:scale-95"
                    }`}
                >
                  {otpLoading
                    ? "Sending..."
                    : cooldown > 0
                      ? `${cooldown}s`
                      : "Send OTP"}
                </button>
              </div>

              {/* RIGHT SIDE → OTP INPUT + VERIFY */}
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600 mb-1 block">
                    OTP Verification Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={emailOtpValue}
                    onChange={(e) =>
                      setEmailOtpValue(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Enter OTP sent to email"
                    className="w-full h-[42px] border border-gray-300 px-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={verifyOtp}
                  disabled={verifyLoading}
                  className="h-[42px] px-5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-sm shadow-sm border
                  border-transparent hover:from-green-600 hover:to-emerald-700 hover:shadow-md transition-all active:scale-95 disabled:opacity-50"             >
                  {verifyLoading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </div>
          </Section>

          {/* ── Terms ── */}
          <Section title="Terms & Conditions">
            <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2">
              <div className="h-64 overflow-y-auto bg-gray-100 p-4 rounded-md text-sm text-gray-700 space-y-3">
                <h3 className="font-semibold text-gray-800">Definitions</h3>
                <p>License – shall mean the terms and conditions for use, reproduction, and distribution...</p>
                <h3 className="font-semibold text-gray-800">Grant of Copyright License</h3>
                <p>Subject to the terms and conditions of this License, each Contributor hereby grants...</p>
                <h3 className="font-semibold text-gray-800">Disclaimer of Warranty</h3>
                <p>Unless required by applicable law, Licensor provides the Work on an &#34;AS IS&#34; BASIS...</p>
                <h3 className="font-semibold text-gray-800">Limitation of Liability</h3>
                <p>In no event shall any Contributor be liable for damages including loss of goodwill...</p>
                <h3 className="font-semibold text-gray-800">Dispute Resolution</h3>
                <p>The decision made by the VVM Core Committee shall be final and binding.</p>
                <p className="text-center font-semibold text-gray-800">END OF TERMS AND CONDITIONS</p>
              </div>
              <div className="mt-4 flex items-start gap-2">
                <input type="checkbox"
                  {...register("termsAccepted", { required: "You must accept the terms" })}
                  className="mt-1"
                />
                <label className="text-sm text-gray-700">
                  I have read the terms and conditions mentioned above and accept them.
                </label>
              </div>
              {errors.termsAccepted && (
                <p className="text-red-500 text-sm mt-1">{errors.termsAccepted.message}</p>
              )}
              <p className="text-red-500 text-sm mt-2">
                After registration, please login and update your profile and proceed with payment to avoid any future disruptions.
              </p>
            </div>
          </Section>

          <div className="pt-4 text-center">
            <Button
              type="submit"
              loading={loading}
              loadingText="Submitting..."
              className="px-10 py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-[24px] shadow-md hover:shadow-lg 
              hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 active:scale-95 disabled:opacity-60"
            >
              Submit Registration
            </Button>
          </div>
        </form>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-full max-w-sm">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full border-4 border-green-400 bg-green-50 flex items-center justify-center">
                <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">You&#39;re Registered! 🎉</h2>
            <p className="text-sm text-gray-600 mb-3">Registration for VVM 2026-27 Completed Successfully</p>
            <p className="text-sm text-gray-600 mb-1">
              Login credentials are emailed to <span className="font-semibold text-gray-800">{userData.email}</span>.
            </p>
            <p className="text-sm font-medium mb-3 text-gray-700">Username: {userData.username}</p>
            <p className="text-xs text-gray-500 mb-5">
              If the credentials email is not in your INBOX, please check your Spam folder.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all duration-200 active:scale-95"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}