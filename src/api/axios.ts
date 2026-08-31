import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://d13hn80jis774u.cloudfront.net/api",
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    const isAuthRequest =
        config.url?.includes("/auth/login") ||
        config.url?.includes("/auth/register");

    if (token && !isAuthRequest) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosInstance;