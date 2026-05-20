'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { getAuthRouteMeta } from './auth-route-meta';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const meta = getAuthRouteMeta(pathname);

  return (
    <div
      className={cn(
        'relative flex flex-1 flex-col',
        'min-h-[calc(100svh-1rem)]'
      )}
    >
      {/* Decorative background: blurred color blobs + fade to page background */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
      >
        <div className='absolute -top-32 left-1/2 h-112 w-md -translate-x-1/2 rounded-full bg-primary/20 blur-3xl dark:bg-primary/10' />
        <div className='absolute right-0 bottom-0 h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full bg-chart-2/15 blur-3xl' />
        <div className='absolute top-1/3 -left-16 h-56 w-56 rounded-full bg-chart-1/10 blur-3xl' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--background)_70%)]' />
      </div>

      <div className='absolute top-0 right-0 p-2 sm:p-4'>
        <ThemeToggle />
      </div>

      <div className='mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-1 py-10 sm:py-16'>
        <div className='mb-8 flex flex-col items-center gap-2 text-center'>
          <Link
            href='/'
            className='font-heading text-2xl font-semibold tracking-tight transition-colors hover:text-primary'
          >
            Next.js<span className='text-primary'>16</span>
          </Link>
          <p className='max-w-xs text-sm text-muted-foreground'>
            {meta.subtitle}
          </p>
        </div>

        {children}

        <p className='mt-8 text-center text-sm text-muted-foreground'>
          {meta.footer.prompt}{' '}
          <Link
            href={meta.footer.href}
            className='font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline'
          >
            {meta.footer.label}
          </Link>
        </p>
      </div>
    </div>
  );
}
