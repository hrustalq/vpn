import React, {
  type FC,
  type ComponentProps,
  useCallback,
  useState,
} from "react";

import { useAuth } from "@/shared/hooks";

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/components/ui";

import { ImSpinner2 } from "react-icons/im";

import { cn } from "@/shared/utils";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm: FC<ComponentProps<"div">> = ({ className }) => {
  const { login } = useAuth();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof LoginSchema>) => {
      try {
        setIsSubmiting(true);
        await login(values);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmiting(false);
      }
    },
    [login],
  );

  return (
    <Form {...form}>
      <form className={cn(className)} onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="user@example.com"
                  type="email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>Введите Email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input
                  placeholder="****"
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormDescription>Введите пароль</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmiting} type="submit">
          {isSubmiting ? (
            <ImSpinner2 className="animate-spin size-4" />
          ) : (
            "Войти"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
