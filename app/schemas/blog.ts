import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string().min(3).max(50),
  body: z.string().min(100),
  image: z.instanceof(File),
});

export type CreateBlogFormValues = z.infer<typeof createBlogSchema>;

export const postSchema = z.object({
  _id: z.string(),
  _creationTime: z.number(),
  title: z.string().min(3).max(50),
  body: z.string().min(100),
  authorId: z.string(),
  imgStorageId: z.string().optional(),
});

export type Post = z.infer<typeof postSchema>;
