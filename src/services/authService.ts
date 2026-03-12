import axios, { AxiosError } from "axios"; // ← import from "axios" directly, not your instance
import api from "@/lib/axios";
import { useApi } from "@/hooks/useApi";
/* ================= LOGIN API ================= */

export interface LoginResponse {
  token: string;
  username: string;
}

interface ApiResponse {
  success: boolean;
  token?: string;
  username?: string;
  message?: string;
}

export const loginUser = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await api.post<ApiResponse>("/login", {
      username,
      password,
    });

    const data = response.data;

    if (!data.success || !data.token) {
      throw new Error(data.message || "Login failed");
    }

    return {
      token: data.token,
      username: data.username || "",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // ✅ now works — axios library, not instance
      const axiosError = error as AxiosError<ApiResponse>;
      throw new Error(axiosError.response?.data?.message || "Login API error");
    }

    throw new Error("Login failed");
  }
};

// interface RawLoginApiResponse {
//   status: boolean;
//   message: string;
//   data: {
//     token: string;
//     user: {
//       id: number;
//       username: string;
//       [key: string]: unknown;
//     };
//   };
// }

// export interface LoginResponse {
//   token: string;
//   username: string;
// }

// export const loginUser = async (
//   username: string,
//   password: string,
// ): Promise<LoginResponse> => {
//   try {
//     const response = await axios.post<RawLoginApiResponse>("/login", {
//       username,
//       password,
//     });

//     const data = response.data;

//     if (!data?.status || !data?.data?.token) {
//       throw new Error(data?.message || "Login failed");
//     }

//     return {
//       token: data.data.token,
//       username: data.data.user.username,
//     };
//   } catch (error: unknown) {
//     const axiosError = error as AxiosError<{ message?: string }>;
//     throw new Error(axiosError?.response?.data?.message || "Login API error");
//   }
// };

/* ================= AUTH STORAGE ================= */

export const saveAuth = (token: string, username: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  }
};

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const logoutUser = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }
};

/* ================= REGISTRATION API ================= */

export interface RegistrationForm {
  fullName: string;
  dob: string;
  emiratesId: string;
  gender: string;
  studentMobile: string;
  studentEmail: string;
  grade: string;
  password: string;
  schoolName: string;
  board: string;
  country: string;
  city: string;
  pincode: string;
  schoolAddress: string;
  parentName: string;
  parentMobile: string;
  parentEmail: string;
}

interface RawRegisterApiResponse {
  status: boolean;
  message: string;
  data?: unknown;
}

export const registerUser = async (
  payload: RegistrationForm,
): Promise<RawRegisterApiResponse> => {
  try {
    const response = await axios.post<RawRegisterApiResponse>(
      "/register",
      payload,
    );

    const data = response.data;

    if (!data?.status) {
      throw new Error(data?.message || "Registration failed");
    }

    return data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(
      axiosError?.response?.data?.message || "Registration API error",
    );
  }
};

/* ================= LOGOUT API ================= */

export function useAuthService() {
  const { request, loading, error } = useApi();

  const logout = async () => {
    const payload = {};

    const response = await request("/logout", "POST", payload);

    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    }

    return response;
  };

  return {
    logout,
    loading,
    error,
  };
}

/* ================= IMPORTANT DATES API ================= */

export interface ImportantDate {
  id: number;
  name: string;
  detail: string;
}

interface ImportantDatesResponse {
  status: boolean;
  message: string;
  data: ImportantDate[];
}

export const getImportantDates = async (page = 1): Promise<ImportantDate[]> => {
  try {
    const response = await axios.get<ImportantDatesResponse>(
      `/important-dates?page=${page}`,
    );

    const data = response.data;

    if (!data?.status) {
      throw new Error(data?.message || "Failed to fetch important dates");
    }

    return data.data;
  } catch (error: unknown) {
    console.error("Important Dates API Error:", error);

    const axiosError = error as AxiosError<{ message?: string }>;

    throw new Error(
      axiosError?.response?.data?.message || "Important Dates API error",
    );
  }
};
