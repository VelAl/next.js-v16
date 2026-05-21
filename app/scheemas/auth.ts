import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.email(),
  password: z.string().min(8).max(50),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(50),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
