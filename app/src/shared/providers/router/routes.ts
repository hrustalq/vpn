import { RouteObject } from "react-router-dom";
import { DefaultLayout, UnauthorizedLayout } from "@/shared/layouts";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";

export default [
  {
    path: "/",
    Component: DefaultLayout,
  },
  {
    path: "/auth",
    Component: UnauthorizedLayout,
    children: [
      {
        path: "/auth/login",
        Component: LoginPage,
      },
      {
        path: "/auth/signup",
        Component: SignupPage,
      },
    ],
  },
] satisfies RouteObject[];
