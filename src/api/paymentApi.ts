import axiosInstance from "./axios";

import type { Payment } from "../types/Payment";

export const createPayment = async (
    reservationId: number
): Promise<Payment> => {

    const response = await axiosInstance.post(
        `/payments/${reservationId}`
    );

    return response.data;
};

export const getPayment = async (
    id: number
): Promise<Payment> => {

    const response = await axiosInstance.get(
        `/payments/${id}`
    );

    return response.data;
};

export const confirmPayment = async (
    id: number
): Promise<Payment> => {

    const response = await axiosInstance.post(
        `/payments/${id}/confirm`
    );

    return response.data;
};