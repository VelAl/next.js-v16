import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PostsSectionSkeleton() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className='gap-0 py-0'>
          <Skeleton className='h-36 w-full rounded-none' />

          <CardContent className='flex flex-col py-4'>
            <Skeleton className='h-7 w-3/4' />

            <div className='space-y-3'>
              <Skeleton className='h-4' />
              <Skeleton className='h-4' />
              <Skeleton className='h-4 w-5/6' />
            </div>

            <CardFooter className='mt-4 px-0'>
              <Skeleton className='h-10 w-full' />
            </CardFooter>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
