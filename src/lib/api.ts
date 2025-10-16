import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem("accessToken");

    console.log(token)

    if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
});

api.interceptors.response.use(
    response => response,
    async error => {
    const originalRequest = error.config;

    if (originalRequest.url.includes("/auth/refresh-token")) {
        return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const { data } = await api.post("/auth/refresh-token", {}, { withCredentials: true });
            localStorage.setItem("accessToken", data.accessToken);

            api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;

            originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

            return api(originalRequest);

        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }

        return Promise.reject(error);
    }
);


export default api;