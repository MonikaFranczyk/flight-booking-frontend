import axiosInstance from "./axios";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string | null;
}

export const login = async (
    request: LoginRequest
): Promise<LoginResponse> => {

    const response = await axiosInstance.post(
        "/auth/login",
        request
    );

    return response.data;
};

export const register = async (
    request: RegisterRequest
) => {

    const response = await axiosInstance.post(
        "/auth/register",
        request
    );

    return response.data;
};