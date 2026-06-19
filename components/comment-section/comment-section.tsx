'use client';

import {
  createCommentSchema,
  type CreateCommentFormValues,
} from '@/app/schemas/comment';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { zodResolver } from '@hookform/resolvers/zod';
import { type Preloaded, useMutation, usePreloadedQuery } from 'convex/react';
import { MessageSquareIcon } from 'lucide-react';
import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { Comment } from './comment';

type CommentSectionProps = {
  postId: Id<'posts'>;
  preloadedComments: Preloaded<typeof api.comments.getCommentsByPostId>;
};

export const CommentSection = ({
  postId,
  preloadedComments,
}: CommentSectionProps) => {
  const createComment = useMutation(api.comments.createComment);
  const comments = usePreloadedQuery(preloadedComments);

  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateCommentFormValues>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      postId,
      body: '',
    },
  });

  const onSubmit = (values: CreateCommentFormValues) => {
    startTransition(async () => {
      try {
        await createComment({
          postId: values.postId,
          body: values.body,
        });

        form.reset({ postId, body: '' });
        toast.success('Comment added.');
      } catch (error) {
        toast.error('Failed to add comment.', {
          description: error instanceof Error ? error.message : undefined,
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center gap-2 border-b pb-4'>
        <MessageSquareIcon className='size-5' />
        <CardTitle>Comments</CardTitle>
      </CardHeader>

      <CardContent className='space-y-6'>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name='body'
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Comment</FieldLabel>
                  <Textarea
                    aria-invalid={fieldState.invalid}
                    placeholder='Write a comment...'
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className='flex justify-end'>
              <Button type='submit' className='min-w-28' isLoading={isPending}>
                Send
              </Button>
            </div>
          </FieldGroup>
        </form>

        {comments && comments.length > 0 && (
          <>
            <Separator />
            <div className='space-y-5'>
              {comments.map((comment) => (
                <Comment
                  key={comment._id}
                  authorName={comment.authorName}
                  body={comment.body}
                  createdAt={comment._creationTime}
                />
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
