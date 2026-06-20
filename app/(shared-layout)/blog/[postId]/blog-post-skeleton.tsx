import { Skeleton } from '@/components/ui/skeleton';

export function BlogPostSkeleton() {
  return (
    <div className='mx-auto flex h-[calc(100dvh-5.5rem)] max-w-4xl flex-col overflow-hidden py-8'>
      <article className='flex min-h-0 flex-1 flex-col'>
        <div className='mb-6 shrink-0'>
          <Skeleton className='h-9 w-40' />
        </div>

        <header className='mb-6 shrink-0 space-y-3'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-10 w-full max-w-2xl sm:h-12' />
          <Skeleton className='h-10 w-4/5 max-w-xl sm:h-12' />
        </header>

        <Skeleton className='mb-4 h-36 w-full shrink-0 rounded-xl sm:h-44' />

        <div className='mb-6 flex shrink-0 flex-col gap-2 sm:flex-row sm:gap-6'>
          <Skeleton className='h-4 w-40' />
          <Skeleton className='h-4 w-36' />
        </div>

        <div className='flex min-h-0 flex-1 flex-col gap-3 border-t pt-6'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-11/12' />
          <Skeleton className='h-4 w-4/5' />
          <Skeleton className='min-h-4 flex-1 w-full' />
        </div>
      </article>

      <section className='mt-6 shrink-0 space-y-3'>
        <Skeleton className='h-6 w-28' />
        <Skeleton className='h-20 w-full rounded-xl' />
      </section>
    </div>
  );
}
