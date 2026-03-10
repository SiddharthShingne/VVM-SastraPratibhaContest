import { API_BASE_URL } from "@/lib/config";
import { useApi } from "@/hooks/useApi";
/* ================= LOGIN  API ================= */
interface RawLoginApiResponse {
  status: boolean;
  message: string;
  data: {
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
  username: string;
}

export const loginUser = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data: RawLoginApiResponse = await response.json();

  if (!response.ok || !data?.status || !data?.data?.token) {
    throw new Error(data?.message || "Login failed");
  }

  return {
    token: data.data.token,
    username: data.data.user.username,
  };
};

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

/* ================= REGISTRATION SIF API ================= */

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
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data: RawRegisterApiResponse = await response.json();

  if (!response.ok || !data?.status) {
    throw new Error(data?.message || "Registration failed");
  }

  return data;
};

/* ================= LOGOUT API ================= */
export function useAuthService() {
  const { request, loading, error } = useApi();

  const logout = async () => {
    const payload = {}; // blank object

    const response = await request("/logout", "POST", payload);

    localStorage.removeItem("token");

    return response;
  };

  return {
    logout,
    loading,
    error,
  };
}

/* ================= GET IMPORTANT DATES ================= */
export async function getImportantDates(page = 1) {
  try {
    const res = await fetch(`/important-dates?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch important dates");
    }

    return await res.json();
  } catch (error) {
    console.error("Important Dates API Error:", error);
    throw error;
  }
}