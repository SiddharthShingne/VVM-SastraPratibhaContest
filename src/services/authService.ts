/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import api from "./axiosInstance";
import { ApertureIcon } from "lucide-react";
import axiosInstance from "./axiosInstance";

/* ================= LOGIN ================= */

interface RawLoginApiResponse {
  status: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: number;
      username: string;
      role_id?: string;
      [key: string]: unknown;
      
    };
  };
}

export interface LoginResponse {
  username: string;
  role_id: string;
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

    const response = await api.post<RawLoginApiResponse>("/login-new", body, {
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
      role_id: data.data.user?.role_id || "",
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
  const res = await api.post("/student/complete-profile-sif", payload, {
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
// In your authService.ts file
export const forgotPassword = async (username: string, frontendUrl?: string) => {
  const resetUrl = frontendUrl || `${window.location.origin}/reset-password`;
  
  const res = await api.post(
    "/forgot-password",
    {
      username,
      frontend_url: resetUrl,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return res.data;
};

// ================= RESET PASSWORD ========== //
export const resetPassword = async (data: {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
}) => {
  const res = await api.post(
    "/reset-password",
    {
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      token: data.token,
      username: data.username,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return res.data;
};
// NEW API
// src/services/schoolApi.ts


// Types
export interface State {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
  state_id: number;
}

export interface City {
  id: number;
  name: string;
  district_id: number;
}

export interface SubBoard {
  id: number;
  name: string;
  board_id: number;
}

export interface SchoolFormData {
  state_id: string;
  district_id: string;
  sub_district_id?: string;
  sub_board_id?: string;
  school_board_id: string;
  name: string;
  address: string;
  pincode: string;
  principal_salutation: string;
  principal_name: string;
  exam_coordinator_salutation: string;
  exam_coordinator_name: string;
  phone_number: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
}

export interface BulkUploadResponse {
  status: boolean;
  invalid_count?: number;
  error_file?: string;
  message?: string;
}

// Get all states
export const getStates = async (): Promise<State[]> => {
  try {
    const response = await api.get("/states/filter");
    return response.data?.data || [];
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Failed to fetch states");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Unexpected error");
    }
  }
};

// Get districts by state ID
export const getDistricts = async (stateId: string): Promise<District[]> => {
  try {
    const response = await api.get("/districts", {
      params: { state_id: stateId }
    });
    return response.data?.data || [];
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Failed to fetch districts");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Unexpected error");
    }
  }
};

// Get cities by district ID
export const getCities = async (districtId: string): Promise<City[]> => {
  try {
    const response = await api.get("/cities", {
      params: { dist_id: districtId }
    });
    return response.data?.data || [];
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Failed to fetch cities");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Unexpected error");
    }
  }
};

// Get sub-boards by board ID
export const getSubBoards = async (boardId: string): Promise<SubBoard[]> => {
  try {
    const response = await api.get("/sub-boards", {
      params: { board_id: boardId }
    });
    return response.data?.data || [];
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Failed to fetch sub boards");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Unexpected error");
    }
  }
};

// Check username availability
export const checkUsername = async (username: string): Promise<string> => {
  try {
    const response = await api.post("/check-username", { username });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Username check failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Unexpected error");
    }
  }
};

// Create single school
export const createSchool = async (formData: FormData): Promise<any> => {
  try {
    const response = await api.post("/schools/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "School creation failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Unexpected error");
    }
  }
};

// Bulk upload schools
export const uploadBulkSchool = async (formData: FormData): Promise<BulkUploadResponse> => {
  try {
    const response = await api.post("/schools/bulk-upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Return error response with potential error_file
      return error.response.data;
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Unexpected error");
    }
  }
};

// Calculate amount for payment
export const calculateAmount = async (data: {
  quantity: number;
  type: string;
}): Promise<{ total_amount: number }> => {
  try {
    const response = await api.post("/calculate-amount", data);
    return response.data?.data || { total_amount: 0 };
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Amount calculation failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Unexpected error");
    }
  }
};

// Get school list (for admin)
export const getSchoolList = async (
  page: number = 1,
  pageSize: number = 10,
  searchText: string = ""
): Promise<any> => {
  try {
    const response = await api.get("/schools", {
      params: {
        page,
        page_size: pageSize,
        search: searchText,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Failed to fetch schools");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Unexpected error");
    }
  }
};

// Get single school by ID
export const getSchool = async (id: number): Promise<any> => {
  try {
    const response = await api.get(`/schools/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Failed to fetch school");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Unexpected error");
    }
  }
};

// Update school
export const updateSchool = async (id: number, formData: FormData): Promise<any> => {
  try {
    const response = await api.post(`/schools/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "School update failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Unexpected error");
    }
  }
};

// Delete school
export const deleteSchool = async (id: number): Promise<any> => {
  try {
    const response = await api.delete(`/schools/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "School deletion failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Unexpected error");
    }
  }
};

// Create school for institute (role 17 specific)
export const createSchoolForInstitute = async (schoolData: any): Promise<any> => {
  try {
    const response = await api.post("/institute/schools/create", schoolData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "School creation failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Unexpected error");
    }
  }
};


// payment
export const makePayment = async (data: any): Promise<any> => {
  try {
    const isFormData = data instanceof FormData;

    const response = await api.post("/payment-new", data, {
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : undefined,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Payment failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Unexpected error");
    }
  }
};

export const makePaymentTwo = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      "https://vvm.org.in/backend/api/payment-new",
      data
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Payment failed");
  }
};