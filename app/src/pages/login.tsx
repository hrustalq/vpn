import React, { type FC } from "react";

import { LoginForm, SsoLinks } from "@/features/auth";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui";
import { Link } from "react-router-dom";

const LoginPage: FC = () => {
  return (
    <Card className="w-full max-w-screen-sm">
      <CardHeader>
        <h1 className="text-lg text-center font-medium">Войти</h1>
      </CardHeader>
      <CardContent>
        <LoginForm className="size-full flex flex-col gap-y-4" />
        <Link className="block mt-3 text-center text-sm" to="/auth/signup">
          Нет аккаунта? <u className="font-medium">зарегистрироваться</u>
        </Link>
      </CardContent>
      <CardFooter className="flex-wrap gap-y-5">
        <SsoLinks />
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
