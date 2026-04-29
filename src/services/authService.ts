/* eslint-disable @typescript-eslint/no-unused-vars */
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
      role_name?: string;
      [key: string]: unknown;
    };
  };
}

export interface LoginResponse {
  username: string;
  role_name: string;
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
      username: data.data.user?.username || "",
      role_name: data.data.user?.role_name || "",
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
      localStorage.removeItem("role");
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
/* eslint-disable @typescript-eslint/no-explicit-any */

interface FetchDistrictPayload {
  state_ids: number[];
  prant_ids: number[];
}

export const fetchDistricts = async (
  payload: FetchDistrictPayload
) => {
  try {
    const res = await api.post("/fetchDistrict", payload);

    // API already returns array in data
    return res.data?.data || [];
  } catch (error: any) {
    console.error("fetchDistricts error:", error);

    if (error.response) {
      throw new Error(
        error.response.data?.message || "Failed to fetch districts"
      );
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Unexpected error");
    }
  }
};

// export const fetchDistricts = async (state_id: string) => {
//   try {
//     const res = await api.post("/fetchDistrict", {
//       state_id: Number(state_id),
//     });
//     return res.data?.data || [];
//   } catch (error) {
//     console.error("fetchDistricts error:", error);
//     return [];
//   }
// };
// =========EMAIL OTP==========//
/*
https://core.vvmstage.cloud/api/send-email-otp-new?email=shingnesid@gmail.com
*/

// export const sendEmailOtp = async (email: string, p0: string) => {
//   try {
//     const res = await api.post(
//       `/send-email-otp-new?email=${encodeURIComponent(email)}`,
//     );

//     return res.data;
//   } catch (error: any) {
//     console.error("sendEmailOtp error:", error?.response || error);
//     throw error?.response?.data || { message: "Failed to send OTP" };
//   }
// };

export const sendEmailOtp = async (email: string, country: string) => {
  try {
    const res = await api.post("/send-email-otp-new", {
      email,
      country, // ✅ added
      type: "student", // optional but consistent
    });

    return res.data;
  } catch (error: any) {
    console.error("sendEmailOtp error:", error?.response || error);
    throw error?.response?.data || { message: "Failed to send OTP" };
  }
};

export const sendEmailOtpDashboard = async (email: string, country: string) => {
  try {
    const res = await api.post("/send-email-otp-new", {
      email,
      country, // ✅ added
    });

    return res.data;
  } catch (error: any) {
    console.error("sendEmailOtp error:", error?.response || error);
    throw error?.response?.data || { message: "Failed to send OTP" };
  }
};

/*
https://core.vvmstage.cloud/api/verify-email-otp-new?email=shingnesid@gmail.com&otp=555555
*/

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

// ================= GET SCHOOL BOARD ========== //
export const getSchoolBoard = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/get-school-board", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// ================= REGISTER STUDENT V2 (FOR SAUDI) ========== //
export const registerStudentV2 = async (formData: Record<string, unknown>) => {
  const res = await api.post("/sif/register/student", formData, {
    headers: {
      "Content-Type": "application/json",
      // No Authorization header needed for registration (user isn't logged in yet)
    },
  });
  return res.data;
};

// ================= FORGOT PASSWORD ========== //
// export const forgotPassword = async (payload: {
//   username: string;
//   frontend_url: string;
// }) => {
//   const res = await api.post(
//     "https://core.vvmstage.cloud/api/forgot-password",
//     payload,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         // No token required
//       },
//     },
//   );

//   return res.data;
// };
export const forgotPassword = async (username: string) => {
  const res = await api.post(
    "/forgot-password",
    {
      username,
      frontend_url: window.location.origin, // dynamic like a real app
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return res.data;
};
