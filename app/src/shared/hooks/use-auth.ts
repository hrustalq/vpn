import { useEffect } from "react";
import { useUser } from "./use-user";
import { useLocalStorage } from "./use-local-storage";
import { LoginPaylpad, SignupPayload } from "@/features/auth/model";

import { authApi } from "@/entities/auth";

export const useAuth = () => {
  // we can re export the user methods or object from this hook
  const { user, removeUser, setUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, [setUser, getItem]);

  const login = async (credentials: LoginPaylpad) => {
    try {
      const [user] = await Promise.all([
        authApi.login(credentials),
        authApi.tokenParsed(),
      ]);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (credentials: SignupPayload) => {
    try {
      await authApi.signup(credentials);
      const user = await authApi.tokenParsed();
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    removeUser();
  };

  return { user, signup, login, logout, setUser };
};
