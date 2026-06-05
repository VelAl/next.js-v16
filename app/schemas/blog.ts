import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string().min(3).max(50),
  content: z.string().min(100),
});

export type CreateBlogFormValues = z.infer<typeof createBlogSchema>;
