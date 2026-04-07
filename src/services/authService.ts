/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import api from "./axiosInstance";
import { ApertureIcon } from "lucide-react";

/* ================= LOGIN ================= */

interface RawLoginApiResponse {
  status: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: number;
      username: string;
      [key: string]: unknown;
    };
  };
}

export interface LoginResponse {
  token: string;
  user: any;
}

export const loginUser = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const body = new URLSearchParams();
    body.append("username", username);
    body.append("password", password);

    const response = await api.post<RawLoginApiResponse>("/login", body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = response.data;

    if (!data?.status || !data?.data?.token) {
      throw new Error(data?.message || "Login failed");
    }

    return {
      token: data.data.token,
      user: data.data.user,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login API error");
    }
    throw new Error("Login failed");
  }
};

/* ================= LOGOUT ================= */

interface LogoutApiResponse {
  status: boolean;
  message: string;
}

export const logoutUser = async (): Promise<LogoutApiResponse> => {
  try {
    const response = await api.post<LogoutApiResponse>("/logout", {});

    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Logout API error");
    }
    throw new Error("Logout failed");
  }
};

// ========== FETCH STATES=============//
export const fetchStates = async () => {
  try {
    const res = await api.get("/get-state");

    console.log("RAW RESPONSE:", res); // 👈 add this
    console.log("RESPONSE DATA:", res.data); // 👈 add this

    return res.data?.data || [];
  } catch (error) {
    console.error("fetchStates error:", error);
    return [];
  }
};

//===============FETCH DISTRICTS============//
export const fetchDistricts = async (state_id: string) => {
  try {
    const res = await api.post("/fetchDistrict", {
      state_id,
    });
    return res.data?.data || [];
  } catch (error) {
    console.error("fetchDistricts error:", error);
    return [];
  }
};

// =========EMAIL OTP==========//
export const sendEmailOtp = async (email: string) => {
  try {
    const res = await api.post(
      `/send-email-otp-new?email=${encodeURIComponent(email)}`,
    );

    return res.data;
  } catch (error: any) {
    console.error("sendEmailOtp error:", error?.response || error);
    throw error?.response?.data || { message: "Failed to send OTP" };
  }
};

// ========= VERIFY EMAIL OTP ==========//
export const verifyEmailOtp = async (email: string, otp: string) => {
  try {
    const res = await api.post(
      `/verify-email-otp-new?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`,
    );

    return res.data;
  } catch (error: any) {
    console.error("verifyEmailOtp error:", error?.response || error);
    throw error?.response?.data || { message: "Failed to verify OTP" };
  }
};

// ─── MOBILE OTP (UPDATE PROFILE) ─── */

// SEND OTP
export const sendMobileOtpWhileUpdating = async (mobile: string) => {
  const token = localStorage.getItem("token");

  const res = await api.post(
    "/send-mobile-otp-while-updating",
    {
      mobile,
      type: "student", // ⚠️ REQUIRED based on your payload
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

// VERIFY OTP
export const verifyMobileOtpWhileUpdating = async (
  mobile: string,
  otp: string,
) => {
  const token = localStorage.getItem("token");

  const res = await api.post(
    "/verify-mobile-otp-while-updating",
    {
      mobile,
      otp,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};
// ================ COMPLETE STUDENT PROFILE ========== //
export const completeStudentProfile = async (payload: Record<string, any>) => {
  const token = localStorage.getItem("token");
  const res = await api.post("/student/complete-profile", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};