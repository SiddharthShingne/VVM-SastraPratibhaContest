"use client";

import { useState } from "react";
import { RegistrationFormPayload, uaeApi } from "@/services/uaeApi";

export function useUAERegistration() {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOtp = async (email: string) => {
    try {
      setOtpLoading(true);

      const res = await uaeApi.sendOtp(email);

      if (res.success) {
        setOtpSent(true);
        setOtpVerified(false);
      }

      return res;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    try {
      setVerifyLoading(true);

      const res = await uaeApi.verifyOtp(email, otp);

      if (res.success) {
        setOtpVerified(true);
      } else {
        setOtpVerified(false);
      }

      return res;
    } catch (error: any) {
      setOtpVerified(false);
      throw new Error(error?.response?.data?.message || "Failed to verify OTP");
    } finally {
      setVerifyLoading(false);
    }
  };

  const submitRegistration = async (payload: RegistrationFormPayload) => {
    try {
      setLoading(true);

      const res = await uaeApi.register(payload);
      return res;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    otpSent,
    otpVerified,
    otpLoading,
    verifyLoading,
    loading,
    sendOtp,
    verifyOtp,
    submitRegistration,
  };
}