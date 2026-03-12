import axios from "axios";
import axiosInstance from "./axiosInstance";

export type RegistrationFormPayload = {
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
};

export const sendUaeOtp = async (email: string) => {
  try {
    const res = await axiosInstance.post("/send-email-otp-new", {
      email: email,
    });

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to send OTP");
    }
    throw new Error("Failed to send OTP");
  }
};

export const verifyUaeOtp = async (email: string, otp: string) => {
  try {
    const res = await axiosInstance.post(
      `/verify-email-otp-new?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to verify OTP");
    }
    throw new Error("Failed to verify OTP");
  }
};

export const registerUaeStudent = async (
  payload: RegistrationFormPayload
) => {
  try {
    const res = await axiosInstance.post("/sif/register/student", payload);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
    throw new Error("Registration failed");
  }
};