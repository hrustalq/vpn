import React, { type FC } from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout: FC = () => {
  return <Outlet />;
};

export default DefaultLayout;
