import axios from "axios";
import api from "./axiosInstance";

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
  username: string;
}

export const loginUser = async (
  username: string,
  password: string
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
      username: data.data.user.username,
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