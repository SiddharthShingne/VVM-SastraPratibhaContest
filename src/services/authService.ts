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
