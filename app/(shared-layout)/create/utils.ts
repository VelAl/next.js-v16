'use client';

import { CreateBlogFormValues } from '@/app/schemas';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

export const defaultValues: CreateBlogFormValues = {
  title: '',
  body: '',
};

export const useCreatePost = () => {
  const router = useRouter();
  const createPostMutation = useMutation(api.posts.createPost);
  const [pending, startTransition] = useTransition();

  const createPost = (data: CreateBlogFormValues) => {
    startTransition(async () => {
      try {
        await createPostMutation(data);

        toast.success('Post created successfully.');
        router.push('/');
      } catch (error) {
        toast.error('Failed to create post.', {
          description:
            error instanceof Error ? error.message : 'Something went wrong.',
        });
      }
    });
  };

  return [pending, createPost] as const;
};
