import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://flight-booking-system-env.eba-eedyr4xa.eu-north-1.elasticbeanstalk.com",
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {

        config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

});

export default axiosInstance;