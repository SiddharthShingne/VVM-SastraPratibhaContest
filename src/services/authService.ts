// src/services/authService.ts

// 🔹 Backend API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://core.vvmstage.cloud/api";

// 🔹 Raw response from backend
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

// 🔹 Clean response used by frontend
export interface LoginResponse {
  token: string;
  username: string;
}

// 🔹 Login API
export const loginUser = async (
  username: string,
  password: string
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

  // 🔐 Validate API response
  if (!response.ok || !data?.status || !data?.data?.token) {
    throw new Error(data?.message || "Login failed");
  }

  return {
    token: data.data.token,
    username: data.data.user.username,
  };
};


// 🔹 Save login data
export const saveAuth = (token: string, username: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  }
};


// 🔹 Get stored token
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};


// 🔹 Logout
export const logoutUser = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }
};