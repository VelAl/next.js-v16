'use client';

import { CreateBlogFormValues } from '@/app/schemas';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

export const useCreatePost = () => {
  const router = useRouter();
  const createPostMutation = useMutation(api.posts.createPost);
  const generateImgUploadURL = useMutation(api.posts.generateImgUploadURL);
  const [pending, startTransition] = useTransition();

  const createPost = (data: CreateBlogFormValues) => {
    startTransition(async () => {
      try {
        const uploadUrl = await generateImgUploadURL();

        const result = await fetch(uploadUrl, {
          method: 'POST',
          headers: { 'Content-Type': data.image.type },
          body: data.image,
        });

        if (!result.ok) {
          throw new Error('Failed to upload image.');
        }

        const { storageId } = await result.json();

        await createPostMutation({
          title: data.title,
          body: data.body,
          imgStorageId: storageId,
        });

        toast.success('Post created successfully.');
        router.push('/blog');
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
