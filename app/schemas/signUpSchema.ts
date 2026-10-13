import { z } from "zod";

export const usernameValidation = z // yaha ek hi value thi to kis sence anhi banta object banay ka
  .string()
  .min(2, { message: "username must be atleast 2 characters" })
  .max(20, { message: "username must be no longer then 20 characters" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "username must be no contain special characters",
  });

export const signupSchema = z.object({
  //ya object is leyea q k yaha hm ny 3 4 cheezy check krni h
  username: usernameValidation,
  email: z.string().email({ message: `invalide email address` }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});
