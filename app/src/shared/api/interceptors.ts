import { AxiosError, AxiosInstance } from "axios";

export const refreshTokenInterceptor =
  (_instance: AxiosInstance) => async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      try {
        const newToken = await _instance.get<string>("/auth/refresh");
        _instance.defaults.headers["Authorization"] = `Bearer ${newToken}`;

        if (originalRequest) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return _instance(originalRequest);
        } else return originalRequest;
      } catch (error) {
        console.error("Token refresh failed:", error);
        return Promise.reject(error);
      }
    }
  };
