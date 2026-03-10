"use client";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import InputField from "@/components/ui/InputField";
import Image from "next/image";
import { registerUser } from "@/services/authService";

interface RegistrationForm {
  fullName: string;
  dob: string;
  cprNumber: string;
  emiratesId: string;
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

export default function BahrainForm() {

  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [form, setForm] = useState<RegistrationForm>({
    fullName: "",
    dob: "",
    cprNumber: "",
    emiratesId: "",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendOtp = () => {
    if (!form.parentEmail) return alert("Enter parent email first");
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSent(true);
    setOtpVerified(false);
    console.log("Generated OTP:", otp);
    alert("OTP sent (check console for demo)");
  };

  const verifyOtp = () => {
    if (form.emailOtp === generatedOtp) {
      setOtpVerified(true);
      alert("OTP Verified");
    } else {
      alert("Invalid OTP");
    }
  };

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
      const payload = { ...form };
      await registerUser(payload);
      alert("Registration Successful");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2f5f8f]">
            Student Registration – Bahrain
          </h1>
          <Image
            src="/gcc/bahrain.webp"
            alt="Bahrain"
            width={70}
            height={70}
            className="object-contain w-12 sm:w-14 md:w-16"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">

          {/* PRIMARY DETAILS */}
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
              label="CPR Number"
              name="cprNumber"
              value={form.cprNumber}
              onChange={handleChange}
              required
              pattern="^[0-9]{9}$"
              submitAttempted={submitAttempted}
            />
            <SelectField
              label="Gender"
              name="gender"
              value={form.gender}
              options={genders}
              onChange={handleChange}
              required
            />
            <InputField
              label="Student Mobile"
              name="studentMobile"
              value={form.studentMobile}
              onChange={handleChange}
              pattern="^[0-9]{10}$"
              placeholder="10 digit mobile number"
              submitAttempted={submitAttempted}
            />
            <InputField
              type="email"
              label="Student Email"
              name="studentEmail"
              value={form.studentEmail}
              onChange={handleChange}
              pattern="^[^\s@]+@[^\s@]+\.com$"
              placeholder="example@gmail.com"
              submitAttempted={submitAttempted}
            />
            <SelectField
              label="Class / Grade"
              name="grade"
              value={form.grade}
              options={grades}
              onChange={handleChange}
              required
            />
          </Section>

          {/* LOGIN DETAILS */}
          <Section title="Login Details">
            <InputField
              type="password"
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$"
              placeholder="Min 8 char, 1 Uppercase, 1 number, 1 special"
              submitAttempted={submitAttempted}
            />
            <InputField
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              validator={(val: string | number | undefined) =>
                String(val) !== form.password ? "Passwords do not match" : ""
              }
              submitAttempted={submitAttempted}
            />
          </Section>

          {/* SCHOOL DETAILS */}
          <Section title="School Details">
            <InputField
              label="School Name"
              name="schoolName"
              value={form.schoolName}
              onChange={handleChange}
              required
              submitAttempted={submitAttempted}
            />
            <SelectField
              label="Board"
              name="board"
              value={form.board}
              options={boards}
              onChange={handleChange}
              required
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
              required
              submitAttempted={submitAttempted}
            />
            <InputField
              label="Pincode"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              required
              submitAttempted={submitAttempted}
            />
            <TextAreaField
              label="School Address"
              name="schoolAddress"
              value={form.schoolAddress}
              onChange={handleChange}
              required
              className="col-span-full"
            />
          </Section>

          {/* PARENT DETAILS */}
          <Section title="Parent Details">
            <InputField
              label="Parent Name"
              name="parentName"
              value={form.parentName}
              onChange={handleChange}
              required
              submitAttempted={submitAttempted}
            />
            <InputField
              label="Parent Mobile"
              name="parentMobile"
              value={form.parentMobile}
              onChange={handleChange}
              required
              pattern="^[0-9]{10}$"
              submitAttempted={submitAttempted}
            />
            <InputField
              type="email"
              label="Parent Email"
              name="parentEmail"
              value={form.parentEmail}
              onChange={handleChange}
              required
              pattern="^[^\s@]+@[^\s@]+\.com$"
              submitAttempted={submitAttempted}
            />
            {otpSent && (
              <InputField
                label="Email OTP"
                name="emailOtp"
                value={form.emailOtp}
                onChange={handleChange}
                required
                submitAttempted={submitAttempted}
              />
            )}
            <div className="flex flex-col sm:flex-row gap-2 pt-2 col-span-full">
              <button
                type="button"
                onClick={sendOtp}
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white"
              >
                Send OTP
              </button>
              {otpSent && (
                <button
                  type="button"
                  onClick={verifyOtp}
                  className="px-5 py-2.5 rounded-lg bg-green-600 text-white"
                >
                  Verify OTP
                </button>
              )}
            </div>
          </Section>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="px-8 py-3 rounded-lg bg-[#2f5f8f] text-white font-semibold"
            >
              Submit Registration
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}


/* ─── SECTION ─────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 bg-linear-to-r from-[#2f5f8f] to-[#4a7ba7] text-white">
        <h2 className="font-semibold text-base">{title}</h2>
        <button type="button" onClick={() => setOpen(!open)}>
          {open ? <Minus size={18} /> : <Plus size={18} />}
        </button>
      </div>
      {open && (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {children}
        </div>
      )}
    </div>
  );
}


/* ─── SELECT FIELD ────────────────────────────────────────── */

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
}

function SelectField({ label, name, value, options, onChange, required }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}


/* ─── TEXTAREA FIELD ──────────────────────────────────────── */

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

function TextAreaField({ label, className = "", ...props }: TextAreaFieldProps) {
  return (
    <div className={className}>
      <label className="block mb-1 text-xs font-medium text-gray-700">
        {label}
      </label>
      <textarea
        rows={3}
        {...props}
        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y"
      />
    </div>
  );
}