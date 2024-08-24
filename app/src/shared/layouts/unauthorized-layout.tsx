import React, { type FC } from "react";
import { Outlet } from "react-router-dom";

const UnauthorizedLayout: FC = () => {
  return (
    <main className="w-screen h-screen overflow-hidden p-3 flex flex-col gap-y-4 justify-center items-center">
      <Outlet />
    </main>
  );
};

export default UnauthorizedLayout;
