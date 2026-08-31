import axiosInstance from "./axios";
import type { Reservation, ReservationRequest } from "../types/Reservation";

export const createReservation = async (
    request: ReservationRequest
) => {

    const response = await axiosInstance.post(
        "/reservations",
        request
    );

    return response.data;

};

export const getReservation = async (id: number) => {

    const response = await axiosInstance.get(
        `/reservations/${id}`
    );

    return response.data;
};

export const getMyReservations = async (): Promise<Reservation[]> => {

    const response = await axiosInstance.get(
        "/reservations/my"
    );

    return response.data;

};

export const cancelReservation = async (
    reservationId: number
): Promise<void> => {

    await axiosInstance.put(
        `/reservations/${reservationId}/cancel`
    );
};