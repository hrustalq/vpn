import apiClient from "@/shared/api";
import { LoginPayload } from "./types";

export default async function login(credentials: LoginPayload) {
  return await apiClient.post<string>("/auth/login", credentials);
}

export * from "./types";
