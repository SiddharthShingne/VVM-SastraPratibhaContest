
"use client";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import TextAreaField from "@/components/ui/TextAreaField";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import {
  registerUaeStudent,
  sendUaeOtp,
  verifyUaeOtp,
  RegistrationFormPayload,
} from "@/services/uaeService";

type RegistrationForm = RegistrationFormPayload;

const genders = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Others", value: "Others" },
];

const boards = [
  { label: "CBSE", value: "CBSE" },
  { label: "ICSE", value: "ICSE" },
  { label: "IB", value: "IB" },
  { label: "IGCSE", value: "IGCSE" },
];

const grades = [
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
];

export default function UAEForm() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<RegistrationForm>();

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  // const [errors, setErrors] = useState<Record<string, string | null>>({});

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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const sendOtp = () => {
    if (!getValues("parentEmail")) {
      setError("parentEmail", {
        type: "manual",
        message: "Enter parent email first",
      });
      return;
    }

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
    } else {
      setError("emailOtp", {
        type: "manual",
        message: "Invalid OTP",
      });
    }
  };

  const onSubmit = async (data: RegistrationForm) => {
    if (!otpVerified) {
      alert("Please verify OTP before submitting");
      return;
    }

    try {
      setLoading(true);

      const res = await registerUaeStudent({
        ...data,
        country: "UAE",
      });

      alert(res.message || "Registration successful");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-5">
        <div className="mb-6 flex items-center justify-between md:mb-8">
          <h1 className="text-xl font-bold tracking-tight text-[#2f5f8f] sm:text-2xl md:text-3xl">
            Student Registration – UAE
          </h1>

          <Image
            src="/gcc/uae.webp"
            alt="UAE"
            width={70}
            height={70}
            className="h-auto w-12 object-contain sm:w-14 md:w-16"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Section title="Primary Details">
            <InputField
              label="Student Full Name"
              required
              placeholder="Enter full name"
              registration={register("fullName", {
                required: "Student Full Name is required",
              })}
              error={errors.fullName}
            />

            <InputField
              label="Date of Birth"
              type="date"
              required
              registration={register("dob", {
                required: "Date of Birth is required",
              })}
              error={errors.dob}
            />

            <InputField
              label="Emirates ID"
              required
              maxLength={15}
              placeholder="Enter Emirates ID"
              registration={register("emiratesId", {
                required: "Emirates ID is required",
                minLength: {
                  value: 15,
                  message: "Emirates ID must be 15 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Emirates ID must be 15 characters",
                },
              })}
              error={errors.emiratesId}
            />

            <SelectField
              label="Gender"
              required
              options={genders}
              registration={register("gender", {
                required: "Gender is required",
              })}
              error={errors.gender}
            />

            <InputField
              label="Student Mobile"
              placeholder="Enter mobile"
              registration={register("studentMobile", {
                pattern: {
                  value: /^[0-9]{9,10}$/,
                  message: "Student Mobile must be 9 or 10 digits",
                },
              })}
              error={errors.studentMobile}
            />

            <InputField
              label="Student Email"
              type="email"
              placeholder="Enter email"
              registration={register("studentEmail", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              error={errors.studentEmail}
            />

            <SelectField
              label="Class / Grade"
              required
              options={grades}
              registration={register("grade", {
                required: "Grade is required",
              })}
              error={errors.grade}
            />
          </Section>

          <Section title="Login Details">
            <InputField
              label="Password"
              type="password"
              required
              placeholder="Enter password"
              registration={register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={errors.password}
            />

            <InputField
              label="Confirm Password"
              type="password"
              required
              placeholder="Confirm password"
              registration={register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              error={errors.confirmPassword}
            />
          </Section>

          <Section title="School Details">
            <InputField
              label="School Name"
              required
              placeholder="Enter school name"
              registration={register("schoolName", {
                required: "School Name is required",
              })}
              error={errors.schoolName}
            />

            <SelectField
              label="Board"
              required
              options={boards}
              registration={register("board", {
                required: "Board is required",
              })}
              error={errors.board}
            />

            <InputField
              label="Country"
              disabled
              registration={register("country")}
              error={errors.country}
              value={"UAE"}
            />

            <InputField
              label="City"
              required
              placeholder="Enter city"
              registration={register("city", {
                required: "City is required",
              })}
              error={errors.city}
            />

            <InputField
              label="Pincode"
              required
              placeholder="Enter pincode"
              registration={register("pincode", {
                required: "Pincode is required",
              })}
              error={errors.pincode}
            />

            <div className="md:col-span-2">
              <TextAreaField
                label="School Address"
                rows={3}
                required
                placeholder="Enter school address"
                registration={register("schoolAddress", {
                  required: "School Address is required",
                })}
                error={errors.schoolAddress}
              />
            </div>
          </Section>

          <Section title="Parent Details">
            <InputField
              label="Parent Name"
              required
              placeholder="Enter parent name"
              registration={register("parentName", {
                required: "Parent Name is required",
              })}
              error={errors.parentName}
            />

            <InputField
              label="Parent Mobile"
              required
              placeholder="Enter parent mobile"
              registration={register("parentMobile", {
                required: "Parent Mobile is required",
                pattern: {
                  value: /^[0-9]{9,10}$/,
                  message: "Parent Mobile must be 9 or 10 digits",
                },
              })}
              error={errors.parentMobile}

            />

            <InputField
              label="Parent Email"
              type="email"
              required
              placeholder="Enter parent email"
              registration={register("parentEmail", {
                required: "Parent Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              error={errors.parentEmail}
            />

            {otpSent && (
              <InputField
                label="Email OTP"
                required
                placeholder="Enter OTP"
                registration={register("emailOtp", {
                  required: "OTP is required",
                })}
                error={errors.emailOtp}
              />
            )}

            <div className="flex flex-col gap-2 pt-2 md:col-span-2 sm:flex-row">
              <Button
                type="button"
                variant="primary"
                onClick={sendOtp}
                loading={otpLoading}
                loadingText="Sending OTP..."
              >
                Send OTP
              </Button>

              {otpSent && (
                <Button
                  type="button"
                  variant="success"
                  onClick={verifyOtp}
                  loading={verifyLoading}
                  loadingText="Verifying..."
                >
                  Verify OTP
                </Button>
              )}

            </div>
          </Section>

          <div className="pt-4 text-center">
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              loadingText="Submitting..."
              className="px-8 py-3"
            >
              Submit Registration
            </Button>
          </div>
        </form>
      </div>
    </div>

  );
}
