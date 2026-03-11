"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import InputField from "@/components/ui/InputField";
import Image from "next/image";
import { registerUser } from "@/services/authService";

/* ================= TYPES ================= */

interface RegistrationForm {
    fullName: string;
    dob: string;
    nationalId: string;
    gender: string;
    studentMobile: string;
    studentEmail: string;
    grade: string;
    password: string;
    confirmPassword: string;
    schoolName: string;
    board: string;
    country: string;
    city: string;
    pincode: string;
    schoolAddress: string;
    parentName: string;
    parentMobile: string;
    parentEmail: string;
    emailOtp: string;
}

const genders = ["Male", "Female", "Others"];
const boards = ["CBSE", "ICSE", "IB", "IGCSE"];
const grades = ["6", "7", "8", "9", "10", "11"];

/* ================= MAIN COMPONENT ================= */

export default function BahrainForm() {
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const [form, setForm] = useState<RegistrationForm>({
        fullName: "",
        dob: "",
        nationalId: "",
        gender: "",
        studentMobile: "",
        studentEmail: "",
        grade: "",
        password: "",
        confirmPassword: "",
        schoolName: "",
        board: "",
        country: "Bahrain",
        city: "",
        pincode: "",
        schoolAddress: "",
        parentName: "",
        parentMobile: "",
        parentEmail: "",
        emailOtp: "",
    });

    const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    /* ================= OTP ================= */

    const sendOtp = () => {
        if (!form.parentEmail) return alert("Enter parent email first");

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        setGeneratedOtp(otp);
        setOtpSent(true);
        setOtpVerified(false);

        console.log("Generated OTP:", otp);
        alert("OTP sent (check console)");
    };

    const verifyOtp = () => {
        if (form.emailOtp === generatedOtp) {
            setOtpVerified(true);
            alert("OTP Verified");
        } else {
            alert("Invalid OTP");
        }
    };

    /* ================= SUBMIT ================= */

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitAttempted(true);

        if (!otpVerified) {
            alert("Verify OTP before submitting");
            return;
        }

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const payload = {
                ...form,
                emiratesId: form.nationalId,
            };

            await registerUser(payload);
            alert("Registration Successful");
        } catch (err) {
            console.error(err);
            alert("Registration failed");
        }
    };

    return (
        <div className="min-h-screen py-12">

            <div className="max-w-5xl mx-auto px-6 lg:px-4">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-10">

                    <h1 className="text-3xl lg:text-4xl font-bold text-[#2f5f8f]">
                        Student Registration – Bahrain
                    </h1>

                    <Image
                        src="/gcc/bahrain.webp"
                        alt="Bahrain"
                        width={70}
                        height={70}
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">

                    {/* PRIMARY */}
                    <Section title="Primary Details">

                        <InputField
                            label="Student Full Name"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                            submitAttempted={submitAttempted}
                        />

                        <InputField
                            type="date"
                            label="Date of Birth"
                            name="dob"
                            value={form.dob}
                            onChange={handleChange}
                            required
                            submitAttempted={submitAttempted}
                        />

                        <InputField
                            label="National ID"
                            name="nationalId"
                            value={form.nationalId}
                            onChange={handleChange}
                            required
                            submitAttempted={submitAttempted}
                        />

                        <SelectField
                            label="Gender"
                            name="gender"
                            value={form.gender}
                            options={genders}
                            onChange={handleChange}
                        />

                        <InputField
                            label="Student Mobile"
                            name="studentMobile"
                            value={form.studentMobile}
                            onChange={handleChange}
                        />

                        <InputField
                            type="email"
                            label="Student Email"
                            name="studentEmail"
                            value={form.studentEmail}
                            onChange={handleChange}
                        />

                        <SelectField
                            label="Class / Grade"
                            name="grade"
                            value={form.grade}
                            options={grades}
                            onChange={handleChange}
                        />

                    </Section>

                    {/* LOGIN */}
                    <Section title="Login Details">

                        <InputField
                            type="password"
                            label="Password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            submitAttempted={submitAttempted}
                        />

                        <InputField
                            type="password"
                            label="Confirm Password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            submitAttempted={submitAttempted}
                        />

                    </Section>

                    {/* SCHOOL */}
                    <Section title="School Details">

                        <InputField
                            label="School Name"
                            name="schoolName"
                            value={form.schoolName}
                            onChange={handleChange}
                            required
                        />

                        <SelectField
                            label="Board"
                            name="board"
                            value={form.board}
                            options={boards}
                            onChange={handleChange}
                        />

                        <InputField
                            label="Country"
                            name="country"
                            value={form.country}
                            disabled
                        />

                        <InputField
                            label="City"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                        />

                        <InputField
                            label="Pincode"
                            name="pincode"
                            value={form.pincode}
                            onChange={handleChange}
                        />

                        <TextAreaField
                            label="School Address"
                            name="schoolAddress"
                            value={form.schoolAddress}
                            onChange={handleChange}
                            className="col-span-full"
                        />

                    </Section>

                    {/* PARENT */}
                    <Section title="Parent Details">

                        <InputField
                            label="Parent Name"
                            name="parentName"
                            value={form.parentName}
                            onChange={handleChange}
                        />

                        <InputField
                            label="Parent Mobile"
                            name="parentMobile"
                            value={form.parentMobile}
                            onChange={handleChange}
                        />

                        <InputField
                            type="email"
                            label="Parent Email"
                            name="parentEmail"
                            value={form.parentEmail}
                            onChange={handleChange}
                        />

                        {otpSent && (
                            <InputField
                                label="Email OTP"
                                name="emailOtp"
                                value={form.emailOtp}
                                onChange={handleChange}
                            />
                        )}

                        <div className="flex flex-wrap gap-3 col-span-full pt-2">

                            <button
                                type="button"
                                onClick={sendOtp}
                                className="px-5 py-2.5 rounded-lg bg-[#2f5f8f] text-white text-sm font-medium hover:bg-[#244c73] transition"
                            >
                                Send OTP
                            </button>

                            {otpSent && (
                                <button
                                    type="button"
                                    onClick={verifyOtp}
                                    className="px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
                                >
                                    Verify OTP
                                </button>
                            )}

                        </div>

                    </Section>

                    <div className="text-center pt-6">
                        <button
                            type="submit"
                            className="px-12 py-3 rounded-lg bg-[#2f5f8f] text-white text-sm font-semibold hover:bg-[#244c73] transition shadow-sm"
                        >
                            Submit Registration
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

/* ================= SECTION ================= */

function Section({ title, children }: { title: string; children: React.ReactNode }) {

    const [open, setOpen] = useState(true);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            <div className="flex justify-between items-center px-6 py-3 bg-linear-to-r from-[#2f5f8f] to-[#4a7ba7] text-white rounded-t-xl">

                <h2 className="font-semibold text-lg">{title}</h2>

                <button type="button" onClick={() => setOpen(!open)}>
                    {open ? <Minus size={18} /> : <Plus size={18} />}
                </button>

            </div>

            {open && (
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {children}
                </div>
            )}

        </div>
    );
}

/* ================= SELECT ================= */

interface SelectFieldProps {
    label: string;
    name: string;
    value: string;
    options: string[];
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

function SelectField({
    label,
    name,
    value,
    options,
    onChange,
}: SelectFieldProps) {

    return (
        <div className="flex flex-col gap-1">

            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>

            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2f5f8f] focus:border-transparent"
            >
                <option value="">Select</option>

                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}

            </select>

        </div>
    );
}

/* ================= TEXTAREA ================= */

interface TextAreaFieldProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    className?: string;
}

function TextAreaField({
    label,
    className = "",
    ...props
}: TextAreaFieldProps) {

    return (
        <div className={className}>

            <label className="block mb-1 text-sm font-medium text-gray-700">
                {label}
            </label>

            <textarea
                rows={4}
                {...props}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#2f5f8f]"
            />

        </div>
    );
}