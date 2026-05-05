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
      `/verify-email-otp-new?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`,
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to verify OTP");
    }
    throw new Error("Failed to verify OTP");
  }
};

export const registerUaeStudent = async (payload: RegistrationFormPayload) => {
  try {
    const res = await axiosInstance.post("/sif/Register/student", payload);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
    throw new Error("Registration failed");
  }
};





export const getSchools = async (page = 1, perPage = 10) => {
  try {
    const countryCode =
      typeof window !== "undefined"
        ? localStorage.getItem("countryCode") || "AE"
        : "AE";

    const res = await axiosInstance.get(
      `/sif/list/schools/${countryCode}`,
      {
        params: {
          page,
          per_page: perPage,
          students: 1,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("School API Error:", error);
    throw error;
  }
};

export const getStudents = async () => {
  try {
    const response = await axiosInstance.get("/admin/students", {
      params: {
        page: 1,
        per_page: 10,
        status: 1,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// total students API
export const fetchStudents = async (page = 1, perPage = 10) => {
  try {
    const res = await axiosInstance.post("/api/admin/students", {
      page,
      per_page: perPage,
      status: 1,
    });

    // 🔥 direct usable data return kar rahe hai
    return {
      students: res?.data?.data?.data || [],
      currentPage: res?.data?.data?.current_page || 1,
    };
  } catch (error) {
    console.error("Student API Error:", error);
    throw error;
  }
};