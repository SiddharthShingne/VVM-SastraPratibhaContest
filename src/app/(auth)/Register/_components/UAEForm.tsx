
"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

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
const initialForm: RegistrationForm = {
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
};

export default function UAEForm() {
  const genders = ["Male", "Female"];
  // const boards = ["CBSE", "ICSE", "IB", "IGCSE", "STATE"];
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
    country: "UAE",
    city: "",
    pincode: "",
    schoolAddress: "",
    parentName: "",
    parentMobile: "",
    parentEmail: "",
    emailOtp: "",
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    validateField(name, value);

  };
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    validateField(name, value);
  };

  /* ================= VALIDATION ================= */

  const validateField = (name: string, value: string) => {
    let message = "";

    switch (name) {

      case "fullName":
        if (!value) message = "Full name is required";
        else if (!/^[A-Za-z ]{3,50}$/.test(value))
          message = "Name must contain only alphabets (3-50 characters)";
        break;

      case "dob":
        if (!value) {
          message = "Date of birth is required";
        } else {
          const dob = new Date(value);
          const minDate = new Date("2009-01-01");
          const maxDate = new Date("2014-03-31");

          if (dob < minDate || dob > maxDate) {
            message = "DOB must be between 01 Jan 2009 and 31 Mar 2014";
          }
        }
        break;

      case "gender":
        if (!value) message = "Please select gender";
        break;

      case "grade":
        if (!value) message = "Please select grade";
        break;

      case "studentMobile":
        if (!value) message = "Mobile number is required";
        else if (!/^[7-9][0-9]{9}$/.test(value))
          message = "Enter valid 10 digit mobile number starting with 7, 8, or 9";
        break;



      case "parentMobile":
        if (!value) message = "Parent mobile is required";
        else if (!/^[7-9][0-9]{9}$/.test(value))
          message = "Enter valid  10 digit mobile number starting with 7, 8, or 9";
        break;

      case "studentEmail":
        if (!value) message = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(value))
          message = "Enter valid email address";
        break;

      case "password":
        if (!value) message = "Password is required";
        else if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(value))
          message = "Enter strong password (6+ chars, Ex: Aa1#)";
        break;

      case "confirmPassword":
        if (!value) message = "Confirm password is required";
        else if (value !== form.password)
          message = "Passwords do not match";
        break;

      case "pincode":
        if (value && !/^[0-9]{5,6}$/.test(value))
          message = "Invalid pincode";
        break;

      case "schoolName":
        if (!value) message = "School Name is required";
        else if (value.length < 5)
          message = "Enter at least 5 characters";
        break;

      case "parentName":
        if (!value) message = "Parent name is required";
        else if (!/^[A-Za-z ]{3,50}$/.test(value))
          message = "Only alphabets allowed";
        break;

      case "parentEmail":
        if (!value) message = "Parent email is required";
        else if (!/^\S+@\S+\.\S+$/.test(value))
          message = "Enter valid email";
        break;
    }

    setErrors((prev: Record<string, string | null>) => ({
      ...prev,
      [name]: message,
    }));
  };

  /* ================= OTP ================= */

  const sendOtp = () => {
    if (!form.parentEmail) {
      setErrors((prev: Record<string, string | null>) => ({
        ...prev,
        parentEmail: "Enter parent email first",
      }));
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    setGeneratedOtp(otp);
    setOtpSent(true);
    setOtpVerified(false);

    console.log("OTP:", otp);
    alert("OTP sent (check console)");
  };

  const verifyOtp = () => {
    if (form.emailOtp === generatedOtp) {
      setOtpVerified(true);
    } else {
      setErrors((prev: Record<string, string | null>) => ({
        ...prev,
        emailOtp: "Invalid OTP",
      }));
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpVerified) {
      alert("Please verify parent email");
      return;
    }

    console.log("FINAL DATA", form);

    alert("Registration Successful");
    // RESET FORM
    setForm(initialForm);
    setErrors({});
    setOtpSent(false);
    setOtpVerified(false);
  };

  return (
    <div className="min-h-screen py-12 w-full">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#2f5f8f]">
          Student Registration – UAE
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-[1500px] mx-auto space-y-10 px-6"
      >

        {/* ================= PRIMARY ================= */}

        <Section title="Primary Details">

          <Input
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            error={errors.fullName}
            onBlur={handleBlur}
            required
          />

          <Input

            type="date"
            label="Date of Birth"
            name="dob"
            min="2009-01-01"
            max="2014-03-31"
            value={form.dob}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.dob}
            required
          />

          <Input
            label="Student Mobile"
            name="studentMobile"
            value={form.studentMobile}
            onChange={handleChange}
            error={errors.studentMobile}
            onBlur={handleBlur}
            required
          />

          <Select
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            options={genders}
            error={errors.gender}
            onBlur={handleBlur}
            required
          />

          <Select
            label="Class / Grade"
            name="grade"
            value={form.grade}
            onChange={handleChange}
            options={grades}
            onBlur={handleBlur}
            error={errors.grade}
            required
          />

        </Section>

        {/* ================= LOGIN ================= */}

        <Section title="Login Details">

          <Input
            type="password"
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password} required
            onBlur={handleBlur}
          />

          <Input
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            onBlur={handleBlur}
            required
          />

        </Section>

        {/* ================= PARENT ================= */}

        <Section title="Parent Details">



          <Input
            label="Parent Name"
            name="parentName"
            value={form.parentName}
            onChange={handleChange}
            error={errors.parentName}
            onBlur={handleBlur}
            required
          />

          <Input
            label="Parent Mobile"
            name="parentMobile"
            value={form.parentMobile}
            onChange={handleChange}
            error={errors.parentMobile} required
            onBlur={handleBlur}
          />


          <div className="md:col-span-3">

            <label className="input-label">Parent Email</label>

            <div className="flex gap-3">

              <input
                type="email"
                name="parentEmail"
                value={form.parentEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`input-field flex-1 ${errors.parentEmail
                    ? "!border-red-500 !focus:ring-red-500 !focus:border-red-500"
                    : ""
                  }`}
              />

              <button
                type="button"
                onClick={sendOtp}
                className="btn-blue"
              >
                Send OTP
              </button>

            </div>

            {errors.parentEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.parentEmail}
              </p>
            )}

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
                  onBlur={handleBlur}
                  required
                />

                <button type="button" onClick={verifyOtp} className="btn-green">
                  Verify OTP
                </button>

              </div>

              {errors.emailOtp && (
                <p className="text-red-500 text-sm">{errors.emailOtp}</p>
              )}

              {otpVerified && (
                <p className="text-green-600 text-sm">OTP Verified ✓</p>
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

/* ================= SECTION ================= */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {

  const [open, setOpen] = useState(true);

  return (

    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

      <div className="flex justify-between items-center px-6 py-4 bg-linear-to-r from-[#17b9f0] to-[#4a7ba7] text-white">

        <h2>{title}</h2>

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

/* ================= INPUT ================= */

function Input({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string | null }) {

  return (

    <div>

      <label className="input-label">{label}</label>

      <input
        {...props}
        // className={`input-field ${error ? "!border-red-500 !focus:ring-red-500 !focus:border-red-500" : ""}`}
        className={`input-field ${error
          ? "!border-red-500 !focus:ring-red-500 !focus:border-red-500 !ring-red-500"
          : ""
          }`}
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}

    </div>

  );
}

/* ================= SELECT ================= */




function Select({
  label,
  options,
  error,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: string[];
  error?: string | null;
}) {
  return (

    <div>

      <label className="input-label">{label}</label>

      <select
        {...props}

        className={`input-field ${error ? "!border-red-500 !focus:ring-red-500 !focus:border-red-500" : ""}`}
      >
        <option value="">Select</option>

        {options.map((o: string) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}

      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>

  );
}