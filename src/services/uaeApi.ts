import axiosInstance from "@/lib/axios";

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

export const uaeApi = {
  async sendOtp(email: string) {
    const res = await axiosInstance.post("/uae/send-otp", { email });
    return res.data;
  },

  async verifyOtp(email: string, otp: string) {
    const res = await axiosInstance.post("/uae/verify-otp", { email, otp });
    return res.data;
  },

  async register(payload: RegistrationFormPayload) {
    const res = await axiosInstance.post("/uae/register", payload);
    return res.data;
  },
};