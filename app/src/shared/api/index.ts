import axios from "axios";
import { refreshTokenInterceptor } from "./interceptors";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => refreshTokenInterceptor(error),
);

export * from "./interceptors";
export default apiClient;
