"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import InputField from "@/components/ui/InputField";
import Image from "next/image";
/* ===================== TYPES ===================== */

interface RegistrationForm {
  fullName: string;
  dob: string;
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

/* ===================== CONSTANTS ===================== */

const genders = ["Male", "Female","Others"];
const boards = ["CBSE", "ICSE", "IB", "IGCSE"];
const grades = [ "6", "7", "8", "9", "10", "11"];

/* ===================== COMPONENT ===================== */
// C: \Users\lenovo\Desktop\frontend - next\vvm - frontend - next\public\gcc\uae.webp
export default function UAEForm() {
  const [submitAttempted, setSubmitAttempted] = useState(false);

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
    country: "UAE",
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

  /* ===================== HANDLERS ===================== */

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
      console.log("Submitting to backend:", payload);
      alert("Registration Successful");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  /* ===================== JSX ===================== */

  return (
    <div className="min-h-screen py-12">
      <div className="text-center mb-10">
        <div className="max-w-6xl mx-auto mb-10 px-6">
          <div className="flex items-center justify-between">

            <h1 className="text-4xl font-bold text-[#2f5f8f]">
              Student Registration – UAE
            </h1>

            <Image
              src="/gcc/uae.webp"
              alt="UAE"
              width={120}
              height={80}
              className="object-contain"
            />

          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-10 px-6">

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
            label="Emirates ID"
            name="emiratesId"
            value={form.emiratesId}
            onChange={handleChange}
            required
            minLength={15}
            maxLength={15}
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
            label="Student Mobile (Optional)"
            name="studentMobile"
            value={form.studentMobile}
            onChange={handleChange}
            /* pattern must be a string when passing through the extended
               React.InputHTMLAttributes because the intersection makes
               the type "RegExp & string".  Use the string version instead. */
            pattern="^[0-9]{10}$"
            submitAttempted={submitAttempted}
          />

          <InputField
            type="email"
            label="Student Email (Optional)"
            name="studentEmail"
            value={form.studentEmail}
            onChange={handleChange}
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

        <Section title="Login Details">
          <InputField
            type="password"
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            submitAttempted={submitAttempted}
          />

          <InputField
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            /* validator signature must match InputFieldProps: the value can be
               string | number | undefined.  We'll coerce to string when
               comparing. */
            validator={(val: string | number | undefined) =>
              String(val) !== form.password ? "Passwords do not match" : ""
            }
            submitAttempted={submitAttempted}
          />
        </Section>

        <Section title="School Details">
          <InputField
            label="School Name"
            name="schoolName"
            value={form.schoolName}
            onChange={handleChange}
            required
            placeholder="Search school"
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

          <InputField label="Country" name="country" value={form.country} disabled />

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
          />
        </Section>

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

          <div className="flex gap-4">
            <button type="button" onClick={sendOtp} className="btn-blue">
              Send OTP
            </button>

            {otpSent && (
              <button type="button" onClick={verifyOtp} className="btn-green">
                Verify OTP
              </button>
            )}
          </div>
        </Section>

        <div className="text-center pt-6">
          <button type="submit" className="btn-submit">
            Submit Registration
          </button>
        </div>

      </form>
    </div>
  );
}

/* ===================== SECTION ===================== */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 bg-linear-to-r from-[#2f5f8f] to-[#4a7ba7] text-white">
        <h2 className="font-semibold">{title}</h2>
        <button type="button" onClick={() => setOpen(!open)}>
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </button>
      </div>
      {open && (
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children}
        </div>
      )}
    </div>
  );
}

/* ===================== SELECT FIELD ===================== */

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  required?: boolean;
}

function SelectField({
  label,
  name,
  value,
  options,
  onChange,
  required,
}: SelectFieldProps) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-lg"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

/* ===================== TEXTAREA FIELD ===================== */

interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

function TextAreaField({ label, ...props }: TextAreaFieldProps) {
  return (
    <div className="md:col-span-3">
      <label className="block mb-1 text-sm font-medium">
        {label}
      </label>
      <textarea
        rows={3}
        {...props}
        className="w-full px-3 py-2 border rounded-lg"
      />
    </div>
  );
}