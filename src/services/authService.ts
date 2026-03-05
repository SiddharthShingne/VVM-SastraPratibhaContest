// src/services/authService.ts
// 🔹 Raw API response from backend
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

// 🔹 Clean response that UI will consume
export interface LoginResponse {
  token: string;
  username: string;
}

// 🔹 Login service
export const loginUser = async (
  request: (
    endpoint: string,
    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: unknown,
  ) => Promise<RawLoginApiResponse>,
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await request("/login", "POST", {
    username,
    password,
  });

  // 🔐 Validate backend response
  if (!response.status || !response.data?.token) {
    throw new Error(response.message || "Login failed");
  }

  // 🔄 Normalize response for frontend
  return {
    token: response.data.token,
    username: response.data.user.username,
  };
};

/* ==================== REGISTRATION ==================== */

// shape should mirror the form used in UAEForm component
export interface RegistrationForm {
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
}

// backend doesn't really care about `confirmPassword` or `emailOtp` maybe,
// but we send whatever the form produces and let the server validate.

interface RawRegisterApiResponse {
  status: boolean;
  message: string;
  data?: any;
}

export const registerUser = async (
  request: (
    endpoint: string,
    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: unknown,
  ) => Promise<RawRegisterApiResponse>,
  payload: RegistrationForm,
): Promise<RawRegisterApiResponse> => {
  const response = await request("/register", "POST", payload);

  if (!response.status) {
    throw new Error(response.message || "Registration failed");
  }

  return response;
};
