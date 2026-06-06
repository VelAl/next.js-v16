'use client';

import { createBlogSchema } from '@/app/schemas';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { defaultValues, useCreatePost } from './utils';

const CreatePage = () => {
  const [pending, createPost] = useCreatePost();
  const form = useForm({
    resolver: zodResolver(createBlogSchema),
    defaultValues,
  });

  return (
    <div className='py-12'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl'>
          Create Post
        </h1>
        <p className='text-xl text-muted-foreground pt-4'>
          Create your own bloog article...
        </p>
      </div>

      <Card className='w-full max-w-xl mx-auto'>
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>Create a new blog article.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(createPost)}>
            <FieldGroup className='flex flex-col gap-y-4'>
              <Controller
                control={form.control}
                name='title'
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      type='text'
                      placeholder='Title'
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name='body'
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea
                      aria-invalid={fieldState.invalid}
                      placeholder='Content'
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button type='submit' isLoading={pending}>
                Create
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePage;
