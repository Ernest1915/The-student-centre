import { z } from "zod";

export const SignUpValidation = z.object({
  name: z.string().min(2, { message: "Too short" }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Provide 8 or more characters" }),
});

export const LoginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Provide 8 or more characters" }),
});

export const PostValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(8).max(100),
  tags: z.string(),
});

export const DepositValidation = z.object({
  phonenumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" }),
  amount: z.string(),
});

export const PayPalValidation = z.object({
  email: z.string().email(),
  amount: z.string(),
});
