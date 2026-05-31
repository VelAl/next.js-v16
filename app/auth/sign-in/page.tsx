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

export default function SignInPage() {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues,
  });

  const onSubmit = async (data: SignInFormValues) => {
    await authClient.signIn.email({
      email: data.email,
      password: data.password,
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

            <Button type='submit'>Sign In</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
