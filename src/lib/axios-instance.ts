import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import {
  getDataFromCookies,
  removeDataFromCookies,
  setDataInCookies,
} from "@/utils/cookie-util";
import { refreshAccessToken } from "../api/auth";
import { routes } from "./routes";

interface QueueItem {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getDataFromCookies("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // If the error is not 401 or the request has already been retried, reject
    if (error.response?.status !== 401 || (originalRequest as any)._retry) {
      return Promise.reject(error);
    }

    const refreshToken = getDataFromCookies("refresh_token");
    const userEmail = getDataFromCookies("email");

    // If no refresh token or email, clear auth and redirect to LOGIN
    if (!refreshToken || !userEmail) {
      removeDataFromCookies("access_token");
      removeDataFromCookies("refresh_token");
      if (
        typeof window !== "undefined" &&
        window.location.pathname !== routes.LOGIN
      ) {
        window.location.href = routes.LOGIN;
      }
      return Promise.reject(error);
    }

    (originalRequest as any)._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    try {
      isRefreshing = true;
      const newAccessToken = await refreshAccessToken(userEmail, refreshToken);

      setDataInCookies("access_token", newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      processQueue(null, newAccessToken);

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      removeDataFromCookies("access_token");
      removeDataFromCookies("refresh_token");

      if (
        typeof window !== "undefined" &&
        window.location.pathname !== routes.LOGIN
      ) {
        window.location.href = routes.LOGIN;
      }

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default axiosInstance;
