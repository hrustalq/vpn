import apiClient from "@/shared/api";
import { TokenParsedResponse } from "./types";

export default async function tokenParsed() {
  return await apiClient.get<TokenParsedResponse>("/auth/tokenParsed");
}

export * from "./types";
