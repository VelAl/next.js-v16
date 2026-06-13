'use client';

import { CreateBlogFormValues } from '@/app/schemas';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

export const useUploadImageFile = () => {
  const generateImgUploadURL = useMutation(api.posts.generateImgUploadURL);

  return async (file: File) => {
    const uploadUrl = await generateImgUploadURL();

    const result = await fetch(uploadUrl, {
      method: 'POST',
      body: file,
    });

    if (!result.ok) {
      throw new Error('Failed to upload image.');
    }

    const { storageId } = (await result.json()) as {
      storageId: Id<'_storage'>;
    };

    return storageId;
  };
};

export const useCreatePost = () => {
  const router = useRouter();
  const createPostMutation = useMutation(api.posts.createPost);
  const deleteImgByStorageId = useMutation(api.posts.deleteImgByStorageId);
  const uploadImageFile = useUploadImageFile();
  const [pending, startTransition] = useTransition();

  const createPost = (data: CreateBlogFormValues) => {
    startTransition(async () => {
      let imgStorageId: Id<'_storage'> | undefined;

      try {
        if (data.image) {
          imgStorageId = await uploadImageFile(data.image);
        }

        await createPostMutation({
          title: data.title,
          body: data.body,
          imgStorageId,
        });

        toast.success('Post created successfully.');
        router.push(`/blog`);
      } catch (error) {
        if (imgStorageId) {
          try {
            await deleteImgByStorageId({ storageId: imgStorageId });
          } catch (deleteError) {
            console.error('Failed to delete uploaded image.', deleteError);
          }
        }

        toast.error('Failed to create post.', {
          description:
            error instanceof Error ? error.message : 'Something went wrong.',
        });
      }
    });
  };

  return [pending, createPost] as const;
};
