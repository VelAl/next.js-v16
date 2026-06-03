'use client';

import { SignInFormValues, signInSchema } from '@/app/schemas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultValues } from './helpers';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

export default function SignInPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues,
  });

  const onSubmit = (data: SignInFormValues) => {
    startTransition(async () => {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed in successfully.');
            router.push('/');
          },
          onError: (err) => {
            toast.error('Failed to sign in.', {
              description: err.error?.message,
            });
          },
        },
      });
    });
  };

  return (
    <Card className='w-full shadow-lg ring-foreground/5'>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name='email'
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder='Email'
                    type='email'
                    {...field}
                  />
                  {form.formState.errors.email && (
                    <FieldError>
                      {form.formState.errors.email.message}
                    </FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='password'
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder='Password'
                    type='password'
                    {...field}
                  />
                  {form.formState.errors.password && (
                    <FieldError>
                      {form.formState.errors.password.message}
                    </FieldError>
                  )}
                </Field>
              )}
            />

            <Button type='submit' isLoading={isPending}>
              Sign In
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
