import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Home',
  description: siteConfig.description,
};

const flowSteps = [
  {
    title: 'Sign in',
    description: 'Create an account or log in to get started.',
  },
  {
    title: 'Create a post',
    description: 'Write an article, add a cover image, and publish it.',
  },
  {
    title: 'Read & comment',
    description: 'Browse the blog, open posts, and leave comments.',
  },
] as const;

export default function Home() {
  return (
    <div className='py-12'>
      <section className='text-center mb-16'>
        <h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl'>
          Welcome to {siteConfig.name}
        </h1>
        <p className='text-xl text-muted-foreground pt-4 max-w-2xl mx-auto'>
          {siteConfig.description}
        </p>
        <div className='flex flex-wrap items-center justify-center gap-3 pt-8'>
          <Link className={buttonVariants()} href='/auth/sign-up'>
            Get started
          </Link>
          <Link
            className={buttonVariants({ variant: 'secondary' })}
            href='/auth/sign-in'
          >
            Sign in
          </Link>
        </div>
      </section>

      <section className='max-w-3xl mx-auto'>
        <h2 className='text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4'>
          How it works
        </h2>
        <ol className='grid gap-4 sm:grid-cols-3'>
          {flowSteps.map((step, index) => (
            <li key={step.title}>
              <Card size='sm' className='h-full'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <span
                      className={cn(
                        'flex size-6 shrink-0 items-center justify-center rounded-full',
                        'bg-primary text-primary-foreground text-xs font-semibold'
                      )}
                    >
                      {index + 1}
                    </span>
                    {step.title}
                  </CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
