'use client';

import { createBlogSchema, type CreateBlogFormValues } from '@/app/schemas';
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
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePlus } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useCreatePost } from './utils';

const CreatePage = () => {
  const [pending, createPost] = useCreatePost();
  const form = useForm<CreateBlogFormValues>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: '',
      body: '',
      image: undefined,
    },
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

              <Controller
                control={form.control}
                name='image'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Image</FieldLabel>
                    <FieldLabel
                      htmlFor='image'
                      className={cn(
                        'flex min-h-36 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-input bg-muted/30 px-4 py-6 text-center transition-colors hover:bg-muted/50',
                        fieldState.invalid &&
                          'border-destructive ring-3 ring-destructive/20'
                      )}
                    >
                      <ImagePlus className='mb-3 size-8 text-muted-foreground' />
                      <span className='text-sm font-medium'>
                        {field.value?.name ?? 'Upload an image'}
                      </span>
                      <span className='mt-1 text-xs text-muted-foreground'>
                        Choose a PNG, JPG, GIF, or WEBP file.
                      </span>
                    </FieldLabel>
                    <Input
                      id='image'
                      aria-invalid={fieldState.invalid}
                      type='file'
                      accept='image/*'
                      className='sr-only'
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
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
