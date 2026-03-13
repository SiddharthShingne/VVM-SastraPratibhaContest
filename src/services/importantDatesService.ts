import axiosInstance from "./axiosInstance";

export const getImportantDates = async (page: number = 1) => {
  const response = await axiosInstance.get(`/important-dates?page=${page}`);
  return response.data;
};