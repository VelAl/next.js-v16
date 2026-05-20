'use client';

import { signUpSchema } from '@/app/scheemas';
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

export default function SignUpPage() {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  });

  return (
    <Card className='w-full shadow-lg ring-foreground/5'>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>

      <CardContent>
        <form>
          <FieldGroup>
            <Controller
              control={form.control}
              name='name'
              render={({ field }) => (
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input placeholder='John Doe' type='text' {...field} />
                  {form.formState.errors.name && (
                    <FieldError>
                      {form.formState.errors.name.message}
                    </FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name='email'
              render={({ field }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input placeholder='Email' type='email' {...field} />
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
              render={({ field }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input placeholder='Password' type='password' {...field} />
                  {form.formState.errors.password && (
                    <FieldError>
                      {form.formState.errors.password.message}
                    </FieldError>
                  )}
                </Field>
              )}
            />

            <Button type='submit'>Sign Up</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
