import axiosInstance from "./axios";
import type { Flight } from "../types/Flight";

export interface FlightSearchRequest {
    departureAirportId: number;
    arrivalAirportId: number;
    departureDate: string;
    passengers: number;
}

export const searchFlights = async (
    request: FlightSearchRequest
): Promise<Flight[]> => {

    const response = await axiosInstance.post(
        "/flights/search",
        request
    );

    return response.data;
};

export const getFlight = async (
    id: number
): Promise<Flight> => {

    const response = await axiosInstance.get(
        `/flights/${id}`
    );

    return response.data;
};