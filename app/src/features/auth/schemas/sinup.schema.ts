import { z } from "zod";

const SignupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(30),
    confirmPassword: z.string().min(6).max(30),
  })
  .superRefine((values) => {
    if (values.password !== values.confirmPassword) {
      throw new z.ZodError([
        {
          path: ["confirmPassword"],
          message: "Passwords do not match",
          code: z.ZodIssueCode.custom,
        },
      ]);
    }
  });

export default SignupSchema;
