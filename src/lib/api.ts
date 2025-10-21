import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true
})

interface DecodedToken {
    exp: number;
    [key: string]: unknown;
}

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown = null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token!);
        }
    });
    failedQueue = [];
};

const isTokenExpiringSoon = (token: string): boolean => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        const expiresIn = decoded.exp * 1000 - Date.now();
        return expiresIn < 5000;
    } catch {
        return true;
    }
};

const refreshTokenProactively = async (): Promise<string | null> => {
    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
        });
    }
    
    isRefreshing = true;
    
    try {
        const refreshApi = axios.create({
            baseURL: "http://localhost:3001",
            withCredentials: true
        });
        
        const { data } = await refreshApi.post("/auth/refresh-token");
        const newToken = data.accessToken;
        
        localStorage.setItem("accessToken", newToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        
        processQueue(null, newToken);
        
        return newToken;
    } catch (error) {
        processQueue(error, null);
        localStorage.removeItem("accessToken");
        return null;
    } finally {
        isRefreshing = false;
    }
};

api.interceptors.request.use(async (config) => {
    if (config.url?.includes("/auth/refresh-token")) {
        return config;
    }
    
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
        return config;
    }
    
    if (isTokenExpiringSoon(token)) {
        const newToken = await refreshTokenProactively();
        if (newToken) {
            config.headers.Authorization = `Bearer ${newToken}`;
        }
    } else {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (originalRequest?.url?.includes("/auth/refresh-token")) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                .then(token => {
                    originalRequest.headers["Authorization"] = `Bearer ${token}`;
                    return api(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshApi = axios.create({
                    baseURL: "http://localhost:3001",
                    withCredentials: true
                });
                
                const { data } = await refreshApi.post("/auth/refresh-token");
                
                const newToken = data.accessToken;
                localStorage.setItem("accessToken", newToken);
                api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

                processQueue(null, newToken);
                return api(originalRequest);

            } catch (refreshError) {
                processQueue(refreshError, null);
                localStorage.removeItem("accessToken");
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;