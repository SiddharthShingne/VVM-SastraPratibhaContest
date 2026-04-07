/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "./axiosInstance";
import axios from "axios";
import api from "./axiosInstance";

// get important dates api call
export const getImportantDates = async (page: number = 1) => {
  const response = await api.get(`/important-dates?page=${page}`);
  return response.data;
};

// get instruction document api call
export const getInstractionDocument = async (type: string) => {
  const response = await api.get(
    `/get-instraction-document?type=${type}`,
  );
  return response.data;
};

// get gcc qualified students api call
export const getGccQualifiedStudents = async () => {
  const response = await api.get(`/get-gcc-qualified-student`);
  return response.data;
};

// get slc marks api call
export const getSlcMarks = async () => {
  const response = await api.get(`/get-slc-marks`);
  return response.data;
};

//  get auth certificate api call
export const getAuthCertificate = async () => {
  const response = await api.get(`/get-auth-certificate`);
  return response.data;
};

//  https://vvm.org.in/backend/api/change-password
//  change password api call
export const changePassword = async (
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
) => {
  try {
    const response = await api.post("/change-password", {
      old_password: oldPassword,
      new_password: newPassword,
      retypenewpassword: confirmPassword,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Password update failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Unexpected error");
    }
  }
};
  
// logout api call
export const logoutUser = async () => {
  try {
    const response = await api.post("/logout", {});
    return response.data;
  } catch (error: any) {
    // Even if API fails, we still force logout locally
    if (error.response) {
      throw new Error(error.response.data?.message || "Logout failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Unexpected error");
    }
  }
};