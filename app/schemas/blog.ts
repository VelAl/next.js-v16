import { z } from 'zod';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const createBlogSchema = z.object({
  title: z.string().min(3).max(50),
  body: z.string().min(100),
  image: z
    .instanceof(File)
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
      message: 'Choose a PNG, JPG, or WEBP image.',
    })
    .refine((file) => file.size <= MAX_IMAGE_SIZE, {
      message: 'Image must be less than 5MB.',
    })
    .optional(),
});

export type CreateBlogFormValues = z.infer<typeof createBlogSchema>;

export const postSchema = z.object({
  _id: z.string(),
  _creationTime: z.number(),
  title: z.string().min(3).max(50),
  body: z.string().min(100),
  authorId: z.string(),
  imgUrl: z.string().optional(),
});

export type Post = z.infer<typeof postSchema>;
