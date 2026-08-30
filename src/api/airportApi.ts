import axiosInstance from "./axios";
import type { Airport } from "../types/Airport";

export const getAirports = async (): Promise<Airport[]> => {
    const response = await axiosInstance.get("/airports");
    return response.data;
};