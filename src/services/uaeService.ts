import axios from "axios";
import axiosInstance from "./axiosInstance";
import api from "./axiosInstance";

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

export const getSchools = async (
  page = 1,
  perPage = 10,
  filters?: { search?: string; region_code?: string },
  countryCode?: string, // ← ADD THIS PARAMETER
) => {
  try {
    const resolvedCode =
      countryCode ||
      (() => {
        try {
          if (typeof window === "undefined") return "AE";
          const raw = localStorage.getItem("user");
          if (!raw) return "AE";
          const parsed = JSON.parse(raw);
          return parsed?.user?.country_code || parsed?.country_code || "AE";
        } catch {
          return "AE";
        }
      })();

    const res = await axiosInstance.get(`/sif/list/schools/${resolvedCode}`, {
      params: {
        page,
        per_page: perPage,
        students: 1,
        search: filters?.search || undefined,
        region_code: filters?.region_code || undefined,
      },
    });

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

// username check API for school add button in total schools
export const checkUsername = async (username: string) => {
  try {
    const res = await api.post("/check-username", { username });
    return res.data;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      const err = error as { response?: { data?: unknown } };
      return err.response?.data || "Error checking username";
    }
    return "Error checking username";
  }
};

// School register for State cordiantor
export const registerSchool = async (payload: {
  sch_name: string;
  name_1: string;
  principal: string;
  name_2: string;
  exam_cordinator: string;
  school_type: number;
  board_id: number;
  sub_board_id: number | null;
  username: string;
  password: string;
  email: string;
  parent_mobile: string;
  hear: number;
  state_id: number;
  dist_id: number;
  city_id: number;
  address: string;
  pincode: string;
  exam_coordinator_designation: string;
  country_id: string;
}) => {
  try {
    const res = await api.post("/schools/school-register", payload);

    return res.data;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      const err = error as {
        response?: {
          data?: unknown;
        };
      };

      return err.response?.data || "School registration failed";
    }

    return "School registration failed";
  }
};