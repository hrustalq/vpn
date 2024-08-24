import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useLocalStorage } from "./use-local-storage";
import { User } from "@/entities/user";

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (user: User) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setItem("user", "");
  };

  return { user, addUser, removeUser, setUser };
};
