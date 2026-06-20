'use client';

import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';
import { ThemeToggle } from '../theme-toggle';
import { useConvexAuth } from 'convex/react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export const NavBar = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed out successfully.');
            router.push('/auth/sign-in');
          },
          onError: (err) => {
            toast.error('Failed to sign out.', {
              description: err.error?.message,
            });
          },
        },
      });
    });
  };

  return (
    <nav className='w-full p-5 flex items-center justify-between'>
      <div className='flex items-center gap-8'>
        <Link href={'/'} className='text-3xl font-bold'>
          Next.js<span className='text-primary'>16</span>
        </Link>

        <div className='flex items-center gap-2'>
          <Link className={buttonVariants({ variant: 'ghost' })} href={'/'}>
            Home
          </Link>
          {!isLoading && isAuthenticated ? (
            <>
              <Link
                className={buttonVariants({ variant: 'ghost' })}
                href={'/blog'}
              >
                Blog
              </Link>
              <Link
                className={buttonVariants({ variant: 'ghost' })}
                href={'/create'}
              >
                Create
              </Link>
            </>
          ) : null}
        </div>
      </div>

      <div className='flex items-center gap-2 ml-auto'>
        {isAuthenticated ? (
          <Button
            className='min-w-20'
            onClick={handleSignOut}
            isLoading={isPending}
          >
            Log Out
          </Button>
        ) : (
          <>
            <Link className={buttonVariants()} href={'/auth/sign-up'}>
              Sign Up
            </Link>
            <Link
              className={buttonVariants({ variant: 'secondary' })}
              href={'/auth/sign-in'}
            >
              Sign In
            </Link>
          </>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
};
