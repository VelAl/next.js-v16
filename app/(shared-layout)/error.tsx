'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

type SharedLayoutErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function SharedLayoutError({
  error,
  reset,
}: SharedLayoutErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex min-h-[calc(100svh-7rem)] items-center justify-center py-16'>
      <div className='relative w-full max-w-2xl overflow-hidden rounded-2xl border bg-card p-8 text-center shadow-sm'>
        <div
          aria-hidden
          className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--destructive),transparent_35%)] opacity-10'
        />

        <div className='mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive ring-1 ring-destructive/20'>
          <AlertTriangle className='size-7' />
        </div>

        <p className='mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground'>
          Something went wrong
        </p>
        <h1 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
          We could not load this page
        </h1>
        <p className='mx-auto mt-4 max-w-lg text-base leading-7 text-muted-foreground'>
          Try again in a moment. If the problem continues, go back home and
          reopen the page.
        </p>

        {error.message ? (
          <pre className='mt-6 overflow-x-auto rounded-lg bg-muted p-4 text-left text-xs text-muted-foreground'>
            {error.message}
          </pre>
        ) : null}

        <div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row'>
          <Button onClick={reset}>
            <RotateCcw />
            Try again
          </Button>
          <Link
            href='/'
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            <Home />
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
