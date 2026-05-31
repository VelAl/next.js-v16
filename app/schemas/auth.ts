import { z } from 'zod';

const emailSchema = z.email('Please enter a valid email address').trim();

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(50, 'Password must be at most 50 characters');

const nameSchema = z
  .string()
  .trim()
  .min(3, 'Name must be at least 3 characters')
  .max(50, 'Name must be at most 50 characters');

export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignInFormValues = z.infer<typeof signInSchema>;
