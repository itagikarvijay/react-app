import axios from "axios";
import type {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { refreshAccessToken } from "./authApi";

const api = axios.create();

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig;
    console.log("Interceptor caught an error:", error.response?.status, error.response?.data);
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        return Promise.reject(error);
      }

      const tokenResponse = await refreshAccessToken(refreshToken);
      console.log("New access token:", tokenResponse.access_token);
      localStorage.setItem(
        "access_token",
        tokenResponse.access_token
      );

      if (tokenResponse.refresh_token) {
        localStorage.setItem(
          "refresh_token",
          tokenResponse.refresh_token
        );
      }

      originalRequest.headers.Authorization =
        `Bearer ${tokenResponse.access_token}`;

      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;