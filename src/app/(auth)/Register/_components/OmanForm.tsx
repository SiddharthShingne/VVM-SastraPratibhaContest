"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

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

/* ===================== COMPONENT ===================== */

export default function OmanForm() {
  const genders = ["Male", "Female"];
  const boards = ["CBSE", "ICSE", "IB", "IGCSE", "STATE"];
  const grades = ["6", "7", "8", "9", "10", "11"];

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
    country: "Oman",
    city: "",
    pincode: "",
    schoolAddress: "",
    parentName: "",
    parentMobile: "",
    parentEmail: "",
    emailOtp: "",
  });

  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendOtp = () => {
    if (!form.parentEmail) return alert("Enter parent email first");
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSent(true);
    setOtpVerified(false);
    console.log("OTP:", otp);
    alert("OTP sent (check console for demo)");
  };

  const verifyOtp = () => {
    if (!generatedOtp) return alert("Send OTP first");
    if (form.emailOtp === generatedOtp) {
      setOtpVerified(true);
      alert("OTP Verified");
    } else {
      alert("Invalid OTP");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpVerified) return alert("Verify OTP first");
    if (form.password !== form.confirmPassword)
      return alert("Passwords do not match");

    console.log("Final Data:", form);
    alert("Registration Successful");
  };

  return (
    <div className="min-h-screen  py-12 w-full">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#2f5f8f]">
          Student Registration – <span className="font-extrabold">Oman</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-[1500px] mx-auto space-y-10 px-6">

        <Section title="Primary Details">
          <Input label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} />
          <Input type="date" label="Date of Birth" name="dob" value={form.dob} onChange={handleChange} />
          <Input label="Emirates ID" name="emiratesId" value={form.emiratesId} onChange={handleChange} />
          <Select label="Gender" name="gender" value={form.gender} onChange={handleChange} options={genders} />
          <Input label="Student Mobile" name="studentMobile" value={form.studentMobile} onChange={handleChange} />
          <Input label="Student Email" name="studentEmail" value={form.studentEmail} onChange={handleChange} />
          <Select label="Class / Grade" name="grade" value={form.grade} onChange={handleChange} options={grades} />
        </Section>

        <Section title="Login Details">
          <Input type="password" label="Password" name="password" value={form.password} onChange={handleChange} />
          <Input type="password" label="Confirm Password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
        </Section>

        <Section title="School Details">
          <Input label="School Name" name="schoolName" value={form.schoolName} onChange={handleChange} />
          <Select label="Board" name="board" value={form.board} onChange={handleChange} options={boards} />
          <Input label="Country" name="country" value={form.country} disabled />
          <Input label="City" name="city" value={form.city} onChange={handleChange} />
          <Input label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} />
          <TextArea label="School Address" name="schoolAddress" value={form.schoolAddress} onChange={handleChange} />
        </Section>

        <Section title="Parent Details">
          <Input label="Parent Name" name="parentName" value={form.parentName} onChange={handleChange} />
          <Input label="Parent Mobile" name="parentMobile" value={form.parentMobile} onChange={handleChange} />

          <div className="md:col-span-3">
            <label className="input-label">Parent Email</label>
            <div className="flex gap-3">
              <input
                type="email"
                name="parentEmail"
                value={form.parentEmail}
                onChange={handleChange}
                className="input-field flex-1"
              />
              <button type="button" onClick={sendOtp} className="btn-blue">
                Send OTP
              </button>
            </div>
          </div>

          {otpSent && (
            <div className="md:col-span-3">
              <label className="input-label">Enter OTP</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="emailOtp"
                  value={form.emailOtp}
                  onChange={handleChange}
                  className="input-field flex-1"
                />
                <button type="button" onClick={verifyOtp} className="btn-green">
                  Verify OTP
                </button>
              </div>
              {otpVerified && (
                <p className="text-green-600 text-sm mt-2 font-medium">
                  ✓ OTP Verified
                </p>
              )}
            </div>
          )}
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

/* ===================== SECTION CARD ===================== */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden ">
      <div className="flex justify-between items-center px-6 py-4 bg-linear-to-r from-[#17b9f0] to-[#4a7ba7] text-white">
        <h2 className="font-semibold">{title}</h2>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="bg-white text-[#2f5f8f] rounded-md p-1"
        >
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </button>
      </div>
      {open && (
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {children}
        </div>
      )}
    </div>
  );
}

/* ===================== INPUTS ===================== */

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="input-label">{label}</label>
      <input {...props} className="input-field" />
    </div>
  );
}

function Select({ label, options, ...props }: { label: string; options: string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="input-label">{label}</label>
      <select {...props} className="input-field bg-white">
        <option value="">Select</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function TextArea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="md:col-span-3">
      <label className="input-label">{label}</label>
      <textarea {...props} rows={3} className="input-field" />
    </div>
  );
}