/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import TextAreaField from "@/components/ui/TextAreaField";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { sendEmailOtp, verifyEmailOtp } from "@/services/authService";
import { registerStudentV2, fetchDistricts } from "@/services/authService"; // ← import your API

type RegistrationForm = {
    fullName: string;
    dob: string;
    gender: string;
    grade: number;
    studentMobile: string;
    studentEmail: string;
    emiratesId: string;
    schoolName: string;
    board: string;
    pincode: string;
    schoolAddress: string;
    parentName: string;
    parentMobile: string;
    parentEmail: string;
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
    hear: string;
    emirate_id: string;
    dist_id: string;
    district: string;
};
const genders = [
    { label: "Male", value: "1" },
    { label: "Female", value: "2" },
    { label: "Others", value: "3" },
];

const grades = [
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
];

const boards = [
    { label: "CBSE", value: "CBSE" },
    { label: "ICSE", value: "ICSE" },
    { label: "IB", value: "IB" },
    { label: "IGCSE", value: "IGCSE" },
];

const hearOptions = [
    { label: "School", value: "1" },
    { label: "Friend", value: "2" },
    { label: "Social Media", value: "3" },
    { label: "Newspaper", value: "4" },
    { label: "Others", value: "5" },
];

type DialogType = {
    type: "success" | "error" | "info" | "otp-sent";
    message: string;
    title?: string;
};

type Props = {
    countries: { value: string; label: string; code: string }[];
};

// ─── Styled Modal Dialog ──────────────────────────────────────────────────────
function StyledDialog({ dialog, onClose }: { dialog: DialogType; onClose: () => void }) {
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
        <div className="fixed inset-0 bg-black/50 flex items-center pb-[5vh] justify-center z-9999 p-4">
            <div className={`bg-linear-to-br ${c.bg} border ${c.border} rounded-2xl shadow-2xl w-full max-w-md p-8 text-center overflow-hidden`}>
                <div className={`mx-auto mb-5 w-20 h-20 rounded-full ${c.iconBg} ${c.iconColor} flex items-center justify-center shadow-inner`}>
                    {c.icon}
                </div>
                <h2 className={`text-2xl font-bold mb-3 ${c.titleColor}`}>
                    {dialog.title || titles[dialog.type]}
                </h2>
                <p className="text-base text-gray-600 mb-7 leading-relaxed wrap-break-word overflow-hidden max-h-40 overflow-y-auto">{dialog.message}</p>
                <button
                    onClick={onClose}
                    className={`w-24 py-3 px-6 ${c.btnBg} text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 text-lg`}
                >
                    OK
                </button>
            </div>
        </div>
    );
}

// ─── Success Registration Popup (matches screenshot) ─────────────────────────
function RegistrationSuccessPopup({
    email,
    username,
    onClose,
}: {
    email: string;
    username: string;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl text-center w-full max-w-md p-10">
                {/* Animated checkmark circle */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full border-4 border-green-400 bg-white flex items-center justify-center shadow-md">
                        <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    You&#39;re Registered! 🎉
                </h2>

                {/* Subtitle */}
                <p className="text-gray-500 text-sm mb-6">
                    Registration for VVM 2026-27 Completed Successfully
                </p>

                {/* Divider */}
                <div className="border-t border-gray-100 mb-6" />

                {/* Email info */}
                <p className="text-sm text-gray-600 mb-2">
                    Login credentials are emailed to
                </p>
                <p className="text-base font-bold text-gray-800 mb-4">{email}</p>

                {/* Username */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-3 inline-block mb-4">
                    <span className="text-sm text-gray-500 mr-2">Username:</span>
                    <span className="text-base font-bold text-gray-800 tracking-wide">{username}</span>
                </div>

                {/* Spam note */}
                <p className="text-xs text-gray-400 mb-7">
                    If the credentials email is not in your INBOX,<br />please check your Spam folder.
                </p>

                {/* Go to Login button */}
                <button
                    onClick={onClose}
                    className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold text-base rounded-xl transition-all duration-200 active:scale-95 shadow-md"
                >
                    Go to Login
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

// ─── Main Form ────────────────────────────────────────────────────────────────
export default function OmanForm({ countries }: Props) {
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [otpModalOpen, setOtpModalOpen] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [emailOtpValue, setEmailOtpValue] = useState("");
    const [dialog, setDialog] = useState<DialogType | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [userData, setUserData] = useState({ email: "", username: "" });
    const [districts, setDistricts] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        fetchDistricts("43").then((data) => {
            setDistricts(data.map((d: any) => ({ value: String(d.id), label: d.name })));
        });
    }, []);

    // Cooldown
    const [cooldown, setCooldown] = useState(0);
    const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startCooldown = () => {
        setCooldown(60);
        if (cooldownRef.current) clearInterval(cooldownRef.current);
        cooldownRef.current = setInterval(() => {
            setCooldown((prev) => {
                if (prev <= 1) { clearInterval(cooldownRef.current!); return 0; }
                return prev - 1;
            });
        }, 1000);
    };

    const {
        register,
        handleSubmit,
        getValues,
        setError,
        reset,
        formState: { errors, touchedFields },
    } = useForm<RegistrationForm>({ mode: "all" });

    // ── Send OTP ──────────────────────────────────────────────────────────────
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
            startCooldown();
            setDialog({
                type: "otp-sent",
                message: `A 6-digit OTP has been sent to ${email}. Please check your inbox.`,
            });
        } catch {
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
            if (res && res.status === true) {
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

    // ── Submit ────────────────────────────────────────────────────────────────
    const onSubmit = async (data: RegistrationForm) => {
        if (!data.termsAccepted) {
            setDialog({
                type: "error",
                message: "You must accept Terms & Conditions"
            });
            return;
        }
        if (!emailVerified) {
            setDialog({
                type: "error",
                title: "Email Not Verified",
                message: "Please verify parent email OTP before submitting the form."
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

                student_mobile: data.studentMobile,
                student_email: data.studentEmail,

                emirate_id: data.emiratesId || null,

                sch_name: data.schoolName,
                school_board_id: data.board,

                pincode: data.pincode,
                address: data.schoolAddress,
                dist_id: data.district,

                parent_full_name: data.parentName,
                parent_mobile: data.parentMobile,
                parent_email: data.parentEmail,

                password: data.password,
                password_confirmation: data.confirmPassword,
                country_code: "SAU", // ⚠️ confirm with backend
                state_id: "43",      // ⚠️ must match backend DB
                hear: Number(data.hear),
            };

            // ✅ Call registerStudentV2 — response: { status: true, message: "...", data: { username: "MH0458718" } }
            const res = await registerStudentV2(payload);
            console.log("REGISTER RESPONSE:", res);
            if (res && res.status === true) {
                setUserData({
                    email: data.parentEmail,            // from form
                    username: res?.data?.username || "", // from API response
                });
                setShowPopup(true);
                reset(); // Clear form after successful registration
            } else {
                throw new Error(res?.message || "Registration failed");
            }
        } catch (error: any) {
            setDialog({
                type: "error",
                message: error?.response?.data?.message || error?.message || "Registration failed"
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen py-8 md:py-10">
            {dialog && <StyledDialog dialog={dialog} onClose={() => setDialog(null)} />}

            <div className="mx-auto max-w-7xl px-4 sm:px-5">
                <div className="mb-6 flex items-center justify-between md:mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-[#2f5f8f] sm:text-2xl md:text-4xl">
                        Student Registration – SAUDI-ARABIA
                    </h1>
                    <Image src="/gcc/saudi-arabia.webp" alt="SAUDI-ARABIA" width={120} height={90} className="h-auto w-12 object-contain sm:w-14 md:w-16" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Primary Details */}
                    <Section title="Primary Details">
                        <InputField label="Student Full Name" required placeholder="Enter full name"
                            registration={register("fullName", { required: "Student Full Name is required", pattern: { value: /^[A-Za-z\s]+$/, message: "Only alphabetical characters are allowed" } })}
                            error={errors.fullName}
                        />
                        <InputField label="Date of Birth" type="date" required
                            min="2008-01-01"
                            max="2015-12-31"
                            registration={register("dob", {
                                required: "Date of Birth is required",
                                validate: (value) => {
                                    const year = new Date(value).getFullYear();
                                    if (year < 2008) return "Date of Birth must be after 2008";
                                    if (year > 2015) return "Date of Birth must be before 2015";
                                    return true;
                                }
                            })}
                            error={errors.dob}
                        />
                        {/* <InputField label="Emirates ID" required maxLength={15} placeholder="Enter Emirates ID"
                            registration={register("emiratesId", { required: "Emirates ID is required", minLength: { value: 15, message: "Emirates ID must be 15 characters" }, maxLength: { value: 15, message: "Emirates ID must be 15 characters" } })}
                            error={touchedFields?.emiratesId && errors?.emiratesId ? errors.emiratesId : undefined}
                        /> */}



                        <InputField
                            label="National ID / Iqama"
                            required
                            maxLength={10}
                            placeholder="Enter ID"
                            registration={register("emiratesId", {
                                required: "ID is required",
                                pattern: {
                                    value: /^[12][0-9]{9}$/,
                                    message: "ID must be 10 digits and start with 1 or 2"
                                }
                            })}
                            error={
                                touchedFields?.emiratesId && errors?.emiratesId
                                    ? errors.emiratesId
                                    : undefined
                            }
                        />
                        <SelectField label="Gender" required options={genders}
                            registration={register("gender", { required: "Gender is required" })}
                            error={touchedFields?.gender && errors?.gender ? errors.gender : undefined}
                        />








                        <InputField
                            label="Student Mobile"
                            placeholder="Enter mobile"
                            registration={register("studentMobile", {
                                required: "Student Mobile is required",
                                pattern: {
                                    value: /^5[0-9]{8}$/,
                                    message: "Mobile number must be 9 digits and start with 5"
                                }
                            })}
                            error={
                                touchedFields?.studentMobile && errors?.studentMobile
                                    ? errors.studentMobile
                                    : undefined
                            }
                        />
                        <InputField label="Student Email" type="email" placeholder="Enter email"
                            registration={register("studentEmail", { required: "Email address is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" } })}
                            error={errors.studentEmail}
                        />
                        <SelectField label="Class / Grade" required options={grades}
                            registration={register("grade", { required: "Grade is required" })}
                            error={touchedFields?.grade && errors?.grade ? errors.grade : undefined}
                        />
                        <SelectField
                            label="How did you hear about VVM?" required options={hearOptions}
                            registration={register("hear", { required: "This field is required" })} error={touchedFields?.hear && errors?.hear ? errors.hear : undefined}
                        />
                    </Section>

                    {/* Login Details */}
                    <Section title="Login Details">
                        <InputField label="Password" type="password" required placeholder="Enter password"
                            registration={register("password", { required: "Password is required", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, message: "Password must be at least 6 characters, include uppercase, lowercase, number and special character" } })}
                            error={errors.password}
                        />
                        <InputField label="Confirm Password" type="password" required placeholder="Confirm password"
                            registration={register("confirmPassword", { required: "Confirm Password is required", validate: (value) => value === getValues("password") || "Passwords do not match" })}
                            error={errors.confirmPassword}
                        />
                    </Section>

                    {/* School Details */}
                    <Section title="School Details">
                        <InputField label="School Name" required placeholder="Enter school name"
                            registration={register("schoolName", { required: "School Name is required", pattern: { value: /^[A-Za-z\s]+$/, message: "Only alphabetical characters are allowed" } })}
                            error={errors.schoolName}
                        />
                        <SelectField label="Board" required options={boards}
                            registration={register("board", { required: "Board is required" })}
                            error={touchedFields?.board && errors?.board ? errors.board : undefined}
                        />
                        {/* <InputField label="Country" disabled
                            value={countries.find((c) => c.value === "oman")?.label || ""}
                        /> */}

                        <InputField
                            label="Country"
                            disabled
                            value={countries?.find((c) => c.value === "saudi-arabia")?.label || "SAUDI ARABIA"}
                        />
                        <InputField label="Pincode" required placeholder="Enter pincode"
                            registration={register("pincode", { required: "Pincode is required", pattern: { value: /^[0-9]{5,6}$/, message: "Pincode must be 5 or 6 digits" } })}
                            error={touchedFields?.pincode && errors?.pincode ? errors.pincode : undefined}
                        />
                        <SelectField
                            label="City / District"
                            required
                            options={districts}
                            registration={register("district", { required: "District is required" })}
                            error={touchedFields?.district && errors?.district ? errors.district : undefined}
                        />
                        <div className="md:col-span-2">
                            <TextAreaField label="School Address" rows={3} required placeholder="Enter school address"
                                registration={register("schoolAddress", { required: "School Address is required" })}
                                error={errors.schoolAddress}
                            />
                        </div>

                    </Section>

                    {/* Parent Details */}
                    <Section title="Parent Details">
                        <InputField label="Parent Name" required placeholder="Enter parent name"
                            registration={register("parentName", { required: "Parent Name is required", pattern: { value: /^[A-Za-z\s]+$/, message: "Only alphabetical characters are allowed" } })}
                            error={errors.parentName}
                        />






                        <InputField
                            label="Parent Mobile"
                            required
                            placeholder="Enter parent mobile"
                            registration={register("parentMobile", {
                                required: "Parent Mobile is required",
                                pattern: {
                                    value: /^5[0-9]{8}$/,
                                    message: "Mobile number must be 9 digits and start with 5"
                                }
                            })}
                            error={errors.parentMobile}
                        />

                        {/* Email + OTP row */}
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                            {/* LEFT: Email + Send OTP */}
                            <div className="flex gap-2 items-end">
                                <div className="flex-1">
                                    <InputField
                                        label="Parent Primary Email"
                                        type="email"
                                        required
                                        placeholder="Parent email"
                                        registration={register("parentEmail", { required: "Parent email is required" })}
                                        error={errors.parentEmail}
                                        className={`transition-all ${emailVerified ? "border-green-400 bg-green-50 ring-2 ring-green-200" : ""}`}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={sendOtp}
                                    disabled={otpLoading || cooldown > 0}
                                    className={`h-10.5 px-5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm border
                    ${cooldown > 0
                                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                            : "bg-linear-to-r from-blue-600 to-indigo-600 text-white border-transparent hover:from-blue-700 hover:to-indigo-700 hover:shadow-md active:scale-95"
                                        }`}
                                >
                                    {otpLoading ? "Sending..." : cooldown > 0 ? `${cooldown}s` : "Send OTP"}
                                </button>
                            </div>

                            {/* RIGHT: OTP input + Verify + Verified badge */}
                            <div className="flex gap-2 items-end">
                                <div className="flex-1">
                                    <label className="text-sm font-medium text-gray-600 mb-1 block">OTP Verification Code</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={6}
                                        value={emailOtpValue}
                                        onChange={(e) => setEmailOtpValue(e.target.value.replace(/\D/g, ""))}
                                        placeholder="Enter 6-digit OTP"
                                        disabled={emailVerified}
                                        className={`w-full h-10.5 border px-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all
                      ${emailVerified ? "border-green-400 bg-green-50 text-green-700" : "border-gray-300"}`}
                                    />
                                </div>

                                {emailVerified ? (
                                    <span className="h-10.5 flex items-center gap-1.5 px-4 bg-green-50 border border-green-300 text-green-700 font-semibold text-sm rounded-lg">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Verified
                                    </span>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={verifyOtp}
                                        disabled={verifyLoading || !otpModalOpen}
                                        className="h-10.5 px-5 rounded-lg bg-linear-to-r from-green-500 to-emerald-600 text-white font-semibold text-sm shadow-sm border-transparent hover:from-green-600 hover:to-emerald-700 hover:shadow-md transition-all active:scale-95 disabled:opacity-40"
                                    >
                                        {verifyLoading ? "Verifying..." : "Verify OTP"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </Section>

                    {/* Terms */}
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
                            {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted.message}</p>}
                            <p className="text-red-500 text-sm mt-2">
                                After registration, please login and update your profile and proceed with payment to avoid any future disruptions.
                            </p>
                        </div>
                    </Section>

                    <div className="pt-4 text-center">
                        <Button type="submit" loading={loading} loadingText="Submitting..."
                            className="px-10 py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-xl shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 active:scale-95"
                        >
                            Submit Registration
                        </Button>
                    </div>
                </form>
            </div>

            {/* ✅ Registration Success Popup */}
            {showPopup && (
                <RegistrationSuccessPopup
                    email={userData.email}
                    username={userData.username}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </div>
    );
}
