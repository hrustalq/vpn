import React, { type FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/shared/hooks";

const DefaultLayout: FC = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/auth/login" />;

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default DefaultLayout;
