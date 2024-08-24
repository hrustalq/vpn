import axios, { AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (originalRequest?.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest?.url?.includes("/auth/refresh")
    ) {
      try {
        const newToken = await apiClient.get<string>("/auth/refresh");
        apiClient.defaults.headers["Authorization"] = `Bearer ${newToken}`;

        if (originalRequest) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        } else return originalRequest;
      } catch (error) {
        console.error("Token refresh failed:", error);
        return Promise.reject(error);
      }
    }
  },
);

apiClient.interceptors.response.use(
  (error) => error,
  async (response) => {
    const { config, data } = response;

    // Check if the request was to /signup or /login
    if (
      config.url?.includes("/auth/signup") ||
      config.url?.includes("/auth/login")
    ) {
      const token = data; // Assuming the token is in the response under `data.token`

      if (token) {
        // Set the token to the default headers of the provided Axios instance
        apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
        // Optionally, you can store the token in localStorage or cookies
        localStorage.setItem("accessToken", token);
      }
    }
    return response;
  },
);

export default apiClient;
