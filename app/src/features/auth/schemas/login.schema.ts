import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(30),
});

export default LoginSchema;
