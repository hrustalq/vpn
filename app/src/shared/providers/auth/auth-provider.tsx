import React, { ReactNode, type FC } from "react";
import { AuthContext } from "../../context/auth-context";
import { useAuth } from "../../hooks";

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { user, setUser } = useAuth();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
