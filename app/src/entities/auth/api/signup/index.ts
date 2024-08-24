import apiClient from "@/shared/api";
import { SignupPayload } from "./types";

export default async function Signup(credentials: SignupPayload) {
  return await apiClient.post("/auth/signup", credentials);
}

export * from "./types";
