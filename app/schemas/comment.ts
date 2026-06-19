import { Id } from '@/convex/_generated/dataModel';
import { z } from 'zod';

export const createCommentSchema = z.object({
  postId: z.custom<Id<'posts'>>(),
  body: z.string().min(3),
});

export type CreateCommentFormValues = z.infer<typeof createCommentSchema>;

export const commentSchema = z.object({
  _id: z.string(),
  _creationTime: z.number(),
  postId: z.string(),
  authorId: z.string(),
  authorName: z.string(),
  body: z.string(),
});

export type Comment = z.infer<typeof commentSchema>;
